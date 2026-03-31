import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { getRuntimeConfig, isFirebaseConfigured } from "../config/runtimeConfig.js";
import { signInUser, signOutUser, signUpUser, listenToAuth } from "../services/authService.js";
import { createChatMessage, createLocalLog, ensureDefaultMessages, getAssistantReply } from "../services/assistantService.js";
import { loadLogs, loadMessages, loadProfile, saveLog, saveMessage, saveProfile } from "../services/dataService.js";
import { createFirebaseServices } from "../services/firebaseClient.js";
import { createInitialState, DEFAULT_PROFILE } from "../state/appState.js";
import { createPreviewSeedData } from "../state/seedData.js";
import { extractProfileFromFormData } from "../utils/profile.js";

const AppContext = createContext(null);
const SIGNED_OUT_MESSAGES = ensureDefaultMessages({ messages: [] });

function createCollectionSignature(items, pickFields) {
  return JSON.stringify(items.map((item) => pickFields.map((field) => item?.[field] ?? null)));
}

function isSignedOutSnapshot(state) {
  return (
    !state.previewMode &&
    !state.user &&
    state.logs.length === 0 &&
    state.communityPosts.length === 0 &&
    state.communityGuidelines.length === 0 &&
    state.moderationQueue.length === 0 &&
    state.mentors.length === 0 &&
    state.mentorshipAccess.length === 0 &&
    state.aiGuardrails.length === 0 &&
    state.crisisProtocol.length === 0 &&
    !state.assistantPending &&
    state.messages.length === SIGNED_OUT_MESSAGES.length &&
    state.messages[0]?.role === SIGNED_OUT_MESSAGES[0]?.role
  );
}

function hasSameHydratedState(prev, user, profile, logs, messages) {
  if (prev.previewMode || prev.user?.uid !== user?.uid) {
    return false;
  }

  const sameProfile =
    prev.profile.role === profile.role &&
    prev.profile.displayName === profile.displayName &&
    prev.profile.location === profile.location &&
    prev.profile.ageRange === profile.ageRange &&
    prev.profile.cycleLength === profile.cycleLength &&
    prev.profile.lastPeriodStart === profile.lastPeriodStart &&
    prev.profile.primaryGoal === profile.primaryGoal &&
    prev.profile.focusAreas === profile.focusAreas &&
    prev.profile.supportNeeds === profile.supportNeeds &&
    prev.profile.aiTone === profile.aiTone &&
    prev.profile.consentToPersonalization === profile.consentToPersonalization;

  if (!sameProfile) {
    return false;
  }

  const prevLogsSignature = createCollectionSignature(prev.logs, ["id", "createdAtMs", "mood", "energy", "focus", "symptoms"]);
  const nextLogsSignature = createCollectionSignature(logs, ["id", "createdAtMs", "mood", "energy", "focus", "symptoms"]);
  if (prevLogsSignature !== nextLogsSignature) {
    return false;
  }

  const prevMessagesSignature = createCollectionSignature(prev.messages, ["id", "createdAtMs", "role", "text"]);
  const nextMessagesSignature = createCollectionSignature(messages, ["id", "createdAtMs", "role", "text"]);

  return prevMessagesSignature === nextMessagesSignature;
}

export function AppProvider({ children }) {
  const [appState, setAppState] = useState(createInitialState);
  const [authView, setAuthView] = useState("signin");
  const [authFeedback, setAuthFeedback] = useState(null);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [firebaseServices, setFirebaseServices] = useState({
    auth: null,
    db: null,
    aiModel: null,
  });

  const addNotice = useEffectEvent((text, type = "info") => {
    const notice = { text, type, id: `${Date.now()}-${Math.random()}` };
    setAppState((prev) => ({ ...prev, flashNotice: notice }));
    window.setTimeout(() => {
      setAppState((prev) => (prev.flashNotice?.id === notice.id ? { ...prev, flashNotice: null } : prev));
    }, 3200);
  });

  const resetSession = useEffectEvent(() => {
    setAppState((prev) => ({
      ...prev,
      previewMode: false,
      user: null,
      profile: { ...DEFAULT_PROFILE },
      logs: [],
      messages: SIGNED_OUT_MESSAGES,
      communityPosts: [],
      communityGuidelines: [],
      moderationQueue: [],
      mentors: [],
      mentorshipAccess: [],
      aiGuardrails: [],
      crisisProtocol: [],
      assistantPending: false,
    }));
    setOnboardingOpen(false);
  });

  const hydrateSignedInState = useEffectEvent(async (user, db) => {
    const [profile, logs, messages] = await Promise.all([
      loadProfile(db, user.uid, user),
      loadLogs(db, user.uid),
      loadMessages(db, user.uid),
    ]);
    const hydratedMessages = ensureDefaultMessages({ messages });

    setAppState((prev) => {
      if (hasSameHydratedState(prev, user, profile, logs, hydratedMessages)) {
        return prev;
      }

      return {
        ...prev,
        previewMode: false,
        user,
        profile,
        logs,
        messages: hydratedMessages,
        communityPosts: [],
        communityGuidelines: [],
        moderationQueue: [],
        mentors: [],
        mentorshipAccess: [],
        aiGuardrails: [],
        crisisProtocol: [],
      };
    });
  });

  useEffect(() => {
    const runtimeConfig = getRuntimeConfig();
    const configured = isFirebaseConfigured(runtimeConfig.firebase);

    setAppState((prev) => (
      prev.firebaseConfigured === configured
        ? prev
        : { ...prev, firebaseConfigured: configured }
    ));

    if (!configured) {
      setAuthFeedback({
        type: "info",
        message: "Firebase is not configured yet. You can still use Preview mode.",
      });
      return undefined;
    }

    let unsubscribe = () => {};
    let active = true;

    (async () => {
      try {
        const services = await createFirebaseServices(runtimeConfig);
        if (!active) {
          return;
        }

        setFirebaseServices(services);
        setAppState((prev) => ({
          ...prev,
          firebaseReady: true,
          auth: services.auth,
          db: services.db,
          aiModel: services.aiModel,
        }));

        unsubscribe = listenToAuth(services.auth, async (user) => {
          if (!user) {
            setAppState((prev) => {
              if (prev.previewMode) {
                return prev;
              }
              if (isSignedOutSnapshot(prev)) {
                return prev;
              }
              return {
                ...prev,
                user: null,
                profile: { ...DEFAULT_PROFILE },
                logs: [],
                messages: SIGNED_OUT_MESSAGES,
                communityPosts: [],
                communityGuidelines: [],
                moderationQueue: [],
                mentors: [],
                mentorshipAccess: [],
                aiGuardrails: [],
                crisisProtocol: [],
                assistantPending: false,
              };
            });
            return;
          }

          await hydrateSignedInState(user, services.db);
        });
      } catch (error) {
        console.error(error);
        addNotice("Firebase services could not start. Preview mode is still available.", "error");
      }
    })();

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const startPreviewMode = () => {
    const seed = createPreviewSeedData();

    startTransition(() => {
      setAppState((prev) => ({
        ...prev,
        previewMode: true,
        user: seed.user,
        profile: seed.profile,
        logs: seed.logs,
        messages: ensureDefaultMessages({ messages: seed.messages }),
        communityPosts: seed.communityPosts,
        communityGuidelines: seed.communityGuidelines,
        moderationQueue: seed.moderationQueue,
        mentors: seed.mentors,
        mentorshipAccess: seed.mentorshipAccess,
        aiGuardrails: seed.aiGuardrails,
        crisisProtocol: seed.crisisProtocol,
      }));
    });
  };

  const signIn = async (email, password) => {
    if (!appState.firebaseConfigured || !firebaseServices.auth) {
      setAuthFeedback({ type: "error", message: "Firebase keys are missing. Update public/config.js first." });
      return false;
    }

    try {
      await signInUser(firebaseServices.auth, email, password);
      setAuthFeedback({ type: "success", message: "Signed in successfully." });
      return true;
    } catch (error) {
      setAuthFeedback({ type: "error", message: error.message });
      return false;
    }
  };

  const signUp = async (displayName, email, password) => {
    if (!appState.firebaseConfigured || !firebaseServices.auth || !firebaseServices.db) {
      setAuthFeedback({ type: "error", message: "Firebase keys are missing. Update public/config.js first." });
      return false;
    }

    try {
      const credential = await signUpUser(firebaseServices.auth, email, password, displayName);
      const initialProfile = {
        ...DEFAULT_PROFILE,
        displayName,
      };
      await saveProfile(firebaseServices.db, credential.user.uid, credential.user.email, initialProfile);
      setAppState((prev) => ({
        ...prev,
        user: credential.user,
        profile: initialProfile,
      }));
      setOnboardingOpen(true);
      setAuthFeedback({ type: "success", message: "Account created. Finish onboarding to personalize the app." });
      return true;
    } catch (error) {
      setAuthFeedback({ type: "error", message: error.message });
      return false;
    }
  };

  const signOut = async () => {
    if (appState.previewMode) {
      resetSession();
      setAuthFeedback({ type: "success", message: "Preview mode ended." });
      return;
    }

    if (!firebaseServices.auth) {
      return;
    }

    await signOutUser(firebaseServices.auth);
    resetSession();
    setAuthFeedback({ type: "success", message: "Signed out." });
  };

  const saveProfileAction = async (formData) => {
    const nextProfile = extractProfileFromFormData(formData, appState.profile);
    setAppState((prev) => ({ ...prev, profile: nextProfile }));

    if (appState.previewMode) {
      addNotice("Preview profile updated locally.", "success");
      return;
    }

    if (appState.user && firebaseServices.db) {
      await saveProfile(firebaseServices.db, appState.user.uid, appState.user.email, nextProfile);
      addNotice("Profile saved to Firestore.", "success");
    }
  };

  const saveLogAction = async (payload) => {
    const log = createLocalLog(payload);
    setAppState((prev) => ({ ...prev, logs: [log, ...prev.logs] }));

    if (appState.previewMode) {
      addNotice("Preview check-in saved.", "success");
      return;
    }

    if (!appState.user || !firebaseServices.db) {
      addNotice("Please sign in before saving a check-in.", "error");
      return;
    }

    await saveLog(firebaseServices.db, appState.user.uid, log);
    addNotice("Check-in saved to Firestore.", "success");
  };

  const sendChatMessage = async (prompt) => {
    const userMessage = createChatMessage("user", prompt);
    setAppState((prev) => ({
      ...prev,
      assistantPending: true,
      messages: [...prev.messages, userMessage],
    }));

    if (!appState.previewMode && appState.user && firebaseServices.db) {
      await saveMessage(firebaseServices.db, appState.user.uid, userMessage);
    }

    try {
      const tempState = {
        ...appState,
        aiModel: firebaseServices.aiModel,
        messages: [...appState.messages, userMessage],
      };
      const replyText = await getAssistantReply(tempState, prompt);
      const assistantMessage = createChatMessage("assistant", replyText);

      setAppState((prev) => ({
        ...prev,
        assistantPending: false,
        messages: [...prev.messages, assistantMessage],
      }));

      if (!appState.previewMode && appState.user && firebaseServices.db) {
        await saveMessage(firebaseServices.db, appState.user.uid, assistantMessage);
      }
    } catch (error) {
      setAppState((prev) => ({
        ...prev,
        assistantPending: false,
        messages: [
          ...prev.messages,
          createChatMessage(
            "assistant",
            `I hit a setup problem while generating a live reply. ${error.message}\n\nI switched back to local personalization mode so the experience still works.`,
          ),
        ],
      }));
    }
  };

  const value = {
    appState,
    authView,
    authFeedback,
    onboardingOpen,
    setAuthView,
    setOnboardingOpen,
    startPreviewMode,
    signIn,
    signUp,
    signOut,
    saveProfileAction,
    saveLogAction,
    sendChatMessage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}
