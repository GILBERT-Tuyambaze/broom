import { Outlet, useNavigate } from "react-router-dom";
import { OnboardingModal } from "../components/modals/OnboardingModal.jsx";
import { AppBackdrop } from "../components/layout/AppBackdrop.jsx";
import { Sidebar } from "../components/layout/Sidebar.jsx";
import { Topbar } from "../components/layout/Topbar.jsx";
import { useAppContext } from "../context/AppContext.jsx";

export function AppLayout() {
  const navigate = useNavigate();
  const {
    appState,
    onboardingOpen,
    setOnboardingOpen,
    signOut,
    saveProfileAction,
  } = useAppContext();

  const notices = [];
  if (appState.flashNotice) notices.push(appState.flashNotice);
  if (appState.previewMode) notices.push({ id: "preview", type: "info", text: "Preview mode is active. Data is not written to Firebase." });
  if (!appState.firebaseConfigured) notices.push({ id: "config", type: "info", text: "Edit public/config.js to enable live Firebase auth, Firestore, and AI." });
  if (appState.firebaseConfigured && !appState.aiModel) notices.push({ id: "ai", type: "info", text: "Auth and Firestore are live, but AI is using local fallback mode until Firebase AI Logic is available." });

  return (
    <div className="min-h-screen">
      <AppBackdrop />
      <OnboardingModal
        open={onboardingOpen}
        profile={appState.profile}
        onClose={() => setOnboardingOpen(false)}
        onSubmit={async (event) => {
          event.preventDefault();
          await saveProfileAction(new FormData(event.currentTarget));
          setOnboardingOpen(false);
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] gap-6 px-4 py-6 md:px-6">
        <Sidebar profile={appState.profile} messagesCount={appState.messages.length} logsCount={appState.logs.length} />

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <Topbar
            profile={appState.profile}
            onOpenOnboarding={() => setOnboardingOpen(true)}
            onSignOut={async () => {
              await signOut();
              navigate("/auth", { replace: true });
            }}
          />

          <div className="space-y-3">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className={`glass-panel px-5 py-4 text-sm ${
                  notice.type === "error" ? "text-rose-200" : notice.type === "success" ? "text-emerald-200" : "text-slate-200"
                }`}
              >
                {notice.text}
              </div>
            ))}
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
