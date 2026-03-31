import { buildContextSummary } from "../utils/profile.js";

export function createChatMessage(role, text) {
  return {
    role,
    text,
    createdAtMs: Date.now(),
  };
}

export function createLocalLog(log) {
  return {
    ...log,
    createdAtMs: log.createdAtMs || Date.now(),
  };
}

export function ensureDefaultMessages(state) {
  if (state.messages.length) {
    return state.messages;
  }

  return [
    createChatMessage(
      "assistant",
      "I am Broom's AI copilot. I can summarize the profile, turn check-ins into recommendations, and personalize the app around the signed-in user.",
    ),
  ];
}

export async function getAssistantReply(state, prompt) {
  if (state.aiModel && state.profile.consentToPersonalization) {
    try {
      const chat = state.aiModel.startChat({
        history: buildAiHistory(state),
        generationConfig: {
          maxOutputTokens: 280,
        },
      });
      const result = await chat.sendMessage(prompt);
      const text = result.response.text();
      if (text) {
        return text;
      }
    } catch (error) {
      console.warn("Falling back to local assistant.", error);
    }
  }

  return buildFallbackReply(state, prompt);
}

function buildAiHistory(state) {
  const context = buildContextSummary(state.profile, state.user, state.logs);
  const history = [
    {
      role: "user",
      parts: [{ text: `Use this user profile and app context to personalize all support.\n${context}` }],
    },
    {
      role: "model",
      parts: [{ text: "I will personalize the reply using the user's goals, cycle settings, recent check-ins, and preferred tone." }],
    },
  ];

  state.messages.slice(0, -1).slice(-6).forEach((message) => {
    history.push({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.text }],
    });
  });

  return history;
}

function buildFallbackReply(state, prompt) {
  const latestLog = state.logs[0];
  const tone = state.profile.aiTone || "supportive";
  const goal = state.profile.primaryGoal || "build a more personalized routine";
  const currentSignal = latestLog
    ? `Latest signal: mood ${latestLog.mood}, energy ${latestLog.energy}/10, focus "${latestLog.focus || "not set"}".`
    : "No daily check-in is saved yet, so the advice should stay lightweight.";

  const toneMap = {
    supportive: "I will keep this warm and encouraging.",
    direct: "I will keep this concise and action oriented.",
    coach: "I will answer like a coach with specific next steps.",
    calm: "I will keep this calm and low-pressure.",
  };

  return [
    `${toneMap[tone] || toneMap.supportive}`,
    `Your current Broom goal is to ${goal}.`,
    currentSignal,
    `Based on your message "${prompt}", I would use the profile, cycle settings, and recent logs to shape the next step.`,
    buildSuggestedActions(prompt, latestLog),
  ].join("\n\n");
}

function buildSuggestedActions(prompt, latestLog) {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes("plan") || lowerPrompt.includes("schedule")) {
    return "Suggested next step: block one high-focus task into your strongest energy window, add one recovery break, and log how the day felt afterward.";
  }

  if (lowerPrompt.includes("stress") || lowerPrompt.includes("anx")) {
    return "Suggested next step: keep the day simpler, reduce one optional commitment, hydrate early, and note whether symptoms improve after rest.";
  }

  if (lowerPrompt.includes("track") || lowerPrompt.includes("log")) {
    return "Suggested next step: track mood, energy, one symptom, and one productivity outcome for the next 5 days so the assistant has stronger patterns to work from.";
  }

  if (latestLog?.energy && latestLog.energy <= 4) {
    return "Suggested next step: choose recovery over intensity today, then ask the assistant to build a lighter routine for the next 24 hours.";
  }

  return "Suggested next step: ask for either a 3-day plan, a symptom summary, or a focus routine so the AI can turn this context into something more concrete.";
}
