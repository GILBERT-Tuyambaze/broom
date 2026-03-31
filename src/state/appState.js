export const DEFAULT_PROFILE = {
  role: "user",
  displayName: "",
  location: "",
  ageRange: "18-24",
  cycleLength: 28,
  lastPeriodStart: "",
  primaryGoal: "",
  focusAreas: "",
  supportNeeds: "",
  aiTone: "supportive",
  consentToPersonalization: true,
};

export const USER_ROLES = [
  {
    value: "user",
    label: "User",
    title: "Growth member",
    description: "Track health, emotions, AI support, community, and mentorship in a calm personal workspace.",
    accent: "lavender",
  },
  {
    value: "mentor",
    label: "Mentor",
    title: "Verified mentor",
    description: "Guide users safely through structured sessions, answers, and shared learning resources.",
    accent: "peach",
  },
  {
    value: "admin",
    label: "Admin",
    title: "Platform admin",
    description: "Protect trust, review risk, manage mentors, and monitor system health across the platform.",
    accent: "violet",
  },
];

const ROUTE_META = {
  "/app/dashboard": {
    user: {
      eyebrow: "Personal Support",
      title: "Dashboard",
      copy: "A calm overview of your health signals, emotional check-ins, goals, and AI-guided support.",
    },
    mentor: {
      eyebrow: "Mentor Studio",
      title: "Mentor Dashboard",
      copy: "Track learner needs, session priorities, and safer support opportunities across the community.",
    },
    admin: {
      eyebrow: "Control Center",
      title: "Admin Dashboard",
      copy: "Monitor platform safety, moderation workload, mentor quality, and trust signals from one place.",
    },
  },
  "/app/assistant": {
    user: {
      eyebrow: "AI Companion",
      title: "Assistant",
      copy: "A personalized, non-diagnostic AI space for reflection, planning, and emotionally aware guidance.",
    },
    mentor: {
      eyebrow: "Mentor Copilot",
      title: "Mentor Assistant",
      copy: "Draft safer replies, structure sessions, and keep guidance clear, bounded, and supportive.",
    },
    admin: {
      eyebrow: "AI Oversight",
      title: "AI Monitor",
      copy: "Review flagged assistant behavior, guardrails, and crisis pathways with clear operational context.",
    },
  },
  "/app/tracker": {
    user: {
      eyebrow: "Cycle Signals",
      title: "Tracker",
      copy: "See phase-aware health patterns, recent check-ins, and support cues in one clearer timeline.",
    },
    mentor: {
      eyebrow: "Session Planning",
      title: "Mentorship Tracker",
      copy: "Review upcoming sessions, learner energy patterns, and safer follow-up checkpoints.",
    },
    admin: {
      eyebrow: "Operations Queue",
      title: "Safety Tracker",
      copy: "Follow moderation flow, escalation status, and platform risks requiring timely review.",
    },
  },
  "/app/vault": {
    user: {
      eyebrow: "Growth Library",
      title: "Resources",
      copy: "Trusted content for body literacy, emotional awareness, community safety, and growth.",
    },
    mentor: {
      eyebrow: "Mentor Library",
      title: "Resources",
      copy: "Training notes, support frameworks, and safe facilitation playbooks for mentors.",
    },
    admin: {
      eyebrow: "Policy Vault",
      title: "Resources",
      copy: "Moderation standards, mentor policy, AI guardrails, and governance references for the platform.",
    },
  },
  "/app/profile": {
    user: {
      eyebrow: "Identity Layer",
      title: "Profile",
      copy: "Control what Broom knows, how it responds, and how the experience adapts to you.",
    },
    mentor: {
      eyebrow: "Mentor Identity",
      title: "Profile",
      copy: "Manage your verified presence, support style, and mentorship focus across the platform.",
    },
    admin: {
      eyebrow: "Admin Identity",
      title: "Profile",
      copy: "Set platform-facing preferences, review access scope, and keep oversight settings aligned.",
    },
  },
};

export function getProfileRole(profile) {
  const role = profile?.role || "user";
  return USER_ROLES.some((item) => item.value === role) ? role : "user";
}

export function getRoleConfig(role) {
  return USER_ROLES.find((item) => item.value === role) || USER_ROLES[0];
}

export function getRouteMeta(pathname, role = "user") {
  const route = ROUTE_META[pathname] || ROUTE_META["/app/dashboard"];
  return route[role] || route.user;
}

export function getNavigationItems(role = "user") {
  const roleLabel =
    role === "mentor" ? "Mentor" : role === "admin" ? "Admin" : "My";

  return [
    { to: "/app/dashboard", label: "Dashboard", short: "Home", icon: "home" },
    {
      to: "/app/assistant",
      label: role === "admin" ? "AI Monitor" : role === "mentor" ? "Mentor AI" : "AI Companion",
      short: "AI",
      icon: "spark",
    },
    {
      to: "/app/tracker",
      label: role === "admin" ? "Safety Tracker" : role === "mentor" ? "Sessions" : "Cycle Tracker",
      short: "Track",
      icon: role === "admin" ? "shield" : "calendar",
    },
    {
      to: "/app/vault",
      label: role === "admin" ? "Policy Vault" : role === "mentor" ? "Mentor Vault" : "Growth Vault",
      short: "Vault",
      icon: "library",
    },
    { to: "/app/profile", label: `${roleLabel} Profile`, short: "Profile", icon: "user" },
  ];
}

export const RESOURCE_ITEMS = [
  {
    title: "Cycle Intelligence Playbook",
    description: "Teach users how to pair symptom logging, cycle rhythm, and focus planning without overwhelming them.",
    tag: "Guide",
  },
  {
    title: "Energy-Aware Work Blocks",
    description: "A lightweight system for planning difficult work around high-energy days and recovery windows.",
    tag: "Workflow",
  },
  {
    title: "AI Prompt Recipes",
    description: "Starter prompts for stress coaching, study planning, symptom reflection, and habit consistency.",
    tag: "Prompt pack",
  },
  {
    title: "Data Confidence Checklist",
    description: "Simple steps for deciding which personal details to collect, how to store them, and how to use them responsibly.",
    tag: "Checklist",
  },
  {
    title: "Community Safety Blueprint",
    description: "A trust-first model for anonymous posting, reporting, temporary hiding, and admin moderation review.",
    tag: "Safety",
  },
  {
    title: "Mentorship Access Model",
    description: "A framework for verified paid mentorship with scholarships, training, and stronger safeguarding boundaries.",
    tag: "Program",
  },
  {
    title: "AI Guardrail Playbook",
    description: "Rules for non-diagnostic language, crisis escalation, reporting misleading answers, and safer support prompts.",
    tag: "Trust",
  },
];

export function createInitialState() {
  return {
    previewMode: false,
    firebaseConfigured: false,
    firebaseReady: false,
    auth: null,
    db: null,
    aiModel: null,
    user: null,
    profile: { ...DEFAULT_PROFILE },
    logs: [],
    messages: [],
    communityPosts: [],
    communityGuidelines: [],
    moderationQueue: [],
    mentors: [],
    mentorshipAccess: [],
    aiGuardrails: [],
    crisisProtocol: [],
    flashNotice: null,
    assistantPending: false,
  };
}

export function createPreviewProfile() {
  return {
    ...DEFAULT_PROFILE,
    displayName: "Preview User",
    location: "Johannesburg",
    ageRange: "18-24",
    cycleLength: 29,
    primaryGoal: "Reduce stress while keeping study and work plans realistic.",
    focusAreas: "Cycle tracking, habit consistency, study planning, sleep",
    supportNeeds: "Keep the guidance calm, practical, and specific.",
    aiTone: "supportive",
  };
}
