import { createChatMessage, createLocalLog } from "../services/assistantService.js";
import { DEFAULT_PROFILE } from "./appState.js";
import { getDateString } from "../utils/formatters.js";

function daysAgo(days) {
  return Date.now() - days * 24 * 60 * 60 * 1000;
}

function createCommunityPost({
  id,
  alias,
  topic,
  body,
  replies,
  hearts,
  reports,
  status = "published",
  createdAtMs,
}) {
  return {
    id,
    alias,
    topic,
    body,
    replies,
    hearts,
    reports,
    status,
    createdAtMs,
  };
}

export const PREVIEW_COMMUNITY_GUIDELINES = [
  {
    title: "Protect anonymity",
    copy: "Use aliases, avoid sharing direct contact details, and keep private medical or personal identifiers out of public threads.",
  },
  {
    title: "Report first, ban later",
    copy: "One or two reports should temporarily hide a post for review. Final action belongs to an admin, not crowd voting alone.",
  },
  {
    title: "No harmful advice",
    copy: "Medical misinformation, harassment, sexual content, and pressure tactics should trigger fast review and repeat-offender escalation.",
  },
  {
    title: "Nudge positive behavior",
    copy: "Posting prompts should remind users to be respectful, avoid diagnosis, and support others without attacking them.",
  },
];

export const PREVIEW_COMMUNITY_POSTS = [
  createCommunityPost({
    id: "post-1",
    alias: "QuietOrbit12",
    topic: "Energy planning",
    body: "I noticed I study better a few days after my period. Does anyone else plan difficult work around that window?",
    replies: 14,
    hearts: 38,
    reports: 0,
    createdAtMs: daysAgo(0),
  }),
  createCommunityPost({
    id: "post-2",
    alias: "NovaLeaf",
    topic: "Stress support",
    body: "When cramps and deadline pressure happen together, what small habits help you stay calm without overloading yourself?",
    replies: 9,
    hearts: 22,
    reports: 0,
    createdAtMs: daysAgo(1),
  }),
  createCommunityPost({
    id: "post-3",
    alias: "MangoSky",
    topic: "Moderation example",
    body: "This sample post has been temporarily hidden after two reports so an admin can review it before any stronger action is taken.",
    replies: 2,
    hearts: 1,
    reports: 2,
    status: "under_review",
    createdAtMs: daysAgo(2),
  }),
];

export const PREVIEW_MODERATION_QUEUE = [
  {
    title: "Temporary hide threshold",
    copy: "One to two credible reports can hide content from the main feed while admins review context and user history.",
  },
  {
    title: "Human decision",
    copy: "Admins can restore, warn, mute, suspend, or ban depending on severity and repeat behavior patterns.",
  },
  {
    title: "Repeat offender policy",
    copy: "Accounts with repeated harmful posts move from warnings to stronger restrictions instead of instant permanent bans.",
  },
];

export const PREVIEW_MENTORS = [
  {
    name: "Arielle N.",
    role: "Frontend engineer",
    focus: "Career confidence, coding routines, interview prep",
    status: "Verified and trained",
    pricing: "Paid sessions with scholarship spots",
  },
  {
    name: "Dr. Teta U.",
    role: "Public health educator",
    focus: "Cycle education, wellbeing habits, health literacy",
    status: "Identity verified with boundaries training",
    pricing: "Paid sessions plus free group Q&A",
  },
  {
    name: "Lina M.",
    role: "Startup operator",
    focus: "Product thinking, entrepreneurship, growth planning",
    status: "Verified and admin-approved",
    pricing: "Hybrid access model",
  },
];

export const PREVIEW_MENTORSHIP_ACCESS = [
  {
    title: "Mentor verification",
    copy: "Mentors apply, complete identity checks, and are approved by admins before they can guide users.",
  },
  {
    title: "Training and boundaries",
    copy: "Training covers communication skills, safeguarding, privacy, and how to avoid acting like a therapist or clinician.",
  },
  {
    title: "Accessibility model",
    copy: "Mentorship can be paid while still offering trials, sponsored sessions, or scholarship access for users who cannot pay.",
  },
];

export const PREVIEW_AI_GUARDRAILS = [
  {
    title: "No diagnosis",
    copy: "The assistant should never make absolute clinical claims. It uses language like may, might, and could be linked to.",
  },
  {
    title: "Feedback and review",
    copy: "Users can flag misleading answers, and repeated reports should trigger prompt updates or human review of assistant behavior.",
  },
  {
    title: "Context-aware caution",
    copy: "The model can personalize using goals, cycle signals, and habits, but it should stay advisory rather than authoritative.",
  },
];

export const PREVIEW_CRISIS_PROTOCOL = [
  {
    title: "Detect alarming language",
    copy: "Messages about self-harm, abuse, or severe distress should stop normal coaching and switch to a safer response mode.",
  },
  {
    title: "Respond with care",
    copy: "The assistant should acknowledge distress, avoid judgment, and encourage immediate support rather than trying to solve the crisis alone.",
  },
  {
    title: "Show help resources",
    copy: "The experience should surface relevant support contacts, trusted adults, or local crisis resources when available.",
  },
];

export function createPreviewSeedData() {
  const previewUser = {
    uid: "preview-user",
    email: "preview@broom.local",
    displayName: "Preview User",
  };

  const profile = {
    ...DEFAULT_PROFILE,
    role: "user",
    displayName: "Preview User",
    location: "Kigali, Rwanda",
    ageRange: "18-24",
    cycleLength: 29,
    lastPeriodStart: getDateString(new Date(daysAgo(11))),
    primaryGoal: "Reduce stress while staying productive and more aware of my body.",
    focusAreas: "Cycle tracking, habit consistency, study planning, sleep, emotional awareness",
    supportNeeds: "Keep guidance calm, practical, and specific. Suggest realistic next steps instead of too much at once.",
    aiTone: "supportive",
    consentToPersonalization: true,
  };

  const logs = [
    createLocalLog({
      mood: "focused",
      energy: 7,
      focus: "Prepare for presentation and review class notes",
      symptoms: "Mild bloating, manageable",
      createdAtMs: daysAgo(0),
    }),
    createLocalLog({
      mood: "steady",
      energy: 6,
      focus: "Deep work and hydration",
      symptoms: "Light cramps in the morning",
      createdAtMs: daysAgo(1),
    }),
    createLocalLog({
      mood: "energized",
      energy: 8,
      focus: "Workout and finish coding task",
      symptoms: "Low symptoms, high motivation",
      createdAtMs: daysAgo(3),
    }),
    createLocalLog({
      mood: "anxious",
      energy: 4,
      focus: "Rest more and avoid overload",
      symptoms: "Headache and low concentration",
      createdAtMs: daysAgo(6),
    }),
    createLocalLog({
      mood: "low",
      energy: 3,
      focus: "Recovery day and journaling",
      symptoms: "Cramps, fatigue, low motivation",
      createdAtMs: daysAgo(10),
    }),
  ];

  const messages = [
    createChatMessage(
      "assistant",
      "I am Broom's AI copilot. I can summarize your profile, connect mood with cycle patterns, and turn your logs into realistic next steps.",
    ),
    createChatMessage(
      "user",
      "What do you notice from my recent check-ins?",
    ),
    createChatMessage(
      "assistant",
      "Your recent logs suggest stronger focus and energy in the last few days compared with the beginning of the cycle. You also seem to benefit from calmer planning on lower-energy days.",
    ),
    createChatMessage(
      "user",
      "How would community support and mentorship fit into my experience?",
    ),
    createChatMessage(
      "assistant",
      "Broom can pair your personal tracking with a safer anonymous community, verified mentors, and stronger AI guardrails so support feels more human and trustworthy.",
    ),
  ];

  return {
    user: previewUser,
    profile,
    logs,
    messages,
    communityPosts: PREVIEW_COMMUNITY_POSTS,
    communityGuidelines: PREVIEW_COMMUNITY_GUIDELINES,
    moderationQueue: PREVIEW_MODERATION_QUEUE,
    mentors: PREVIEW_MENTORS,
    mentorshipAccess: PREVIEW_MENTORSHIP_ACCESS,
    aiGuardrails: PREVIEW_AI_GUARDRAILS,
    crisisProtocol: PREVIEW_CRISIS_PROTOCOL,
  };
}
