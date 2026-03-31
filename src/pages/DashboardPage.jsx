import { Panel } from "../components/shared/Panel.jsx";
import { WorkspaceHero } from "../components/dashboard/WorkspaceHero.jsx";
import { SpotlightCard } from "../components/dashboard/SpotlightCard.jsx";
import { ActionTile } from "../components/dashboard/ActionTile.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { getProfileRole } from "../state/appState.js";
import { formatDate } from "../utils/formatters.js";
import { getNextPeriodDate, getProfileReadiness } from "../utils/profile.js";

const ROLE_METRICS = {
  user: [
    { eyebrow: "Profile readiness", icon: "user", tone: "default" },
    { eyebrow: "Wellness memory", icon: "heart", tone: "warm" },
    { eyebrow: "Support mode", icon: "spark", tone: "default" },
  ],
  mentor: [
    { eyebrow: "Verification", icon: "shield", tone: "default" },
    { eyebrow: "Session readiness", icon: "calendar", tone: "warm" },
    { eyebrow: "Guidance boundaries", icon: "users", tone: "default" },
  ],
  admin: [
    { eyebrow: "Trust score", icon: "shield", tone: "default" },
    { eyebrow: "Review pressure", icon: "chart", tone: "alert" },
    { eyebrow: "AI oversight", icon: "spark", tone: "default" },
  ],
};

const ROLE_ACTIONS = {
  user: [
    { to: "/app/assistant", title: "Talk to Broom", copy: "Get reflective support, next-step planning, and AI guidance built around your saved context.", icon: "spark" },
    { to: "/app/tracker", title: "View cycle calendar", copy: "See phase colors, timeline signals, and calmer planning cues across the month.", icon: "calendar" },
    { to: "/app/mentorship", title: "Explore mentorship", copy: "Connect with mentors, plan sessions, and grow with guided support tailored to your goals.", icon: "spark" },
  ],
  mentor: [
    { to: "/app/tracker", title: "Open support queue", copy: "Review upcoming sessions, learner context, and safer follow-up moments before you respond.", icon: "calendar" },
    { to: "/app/assistant", title: "Draft with mentor AI", copy: "Shape answers with clearer boundaries, calmer tone, and safer wording for guidance.", icon: "spark" },
    { to: "/app/community", title: "Manage community space", copy: "Help keep discussion threads safe, supportive, and aligned with mentorship goals.", icon: "users" },
  ],
  admin: [
    { to: "/app/tracker", title: "Review moderation flow", copy: "See flagged posts, temporary hides, and escalation states in one operational view.", icon: "shield" },
    { to: "/app/assistant", title: "Inspect AI safeguards", copy: "Monitor guardrail quality, flagged responses, and crisis handling behavior.", icon: "spark" },
    { to: "/app/community", title: "Review community safety", copy: "Monitor community posts and crisis pathways to keep the platform secure.", icon: "users" },
  ],
};

export function DashboardPage() {
  const { appState, saveLogAction } = useAppContext();
  const role = getProfileRole(appState.profile);
  const readiness = getProfileReadiness(appState.profile);
  const nextPeriod = getNextPeriodDate(appState.profile);
  const latestLog = appState.logs[0];

  const metricCards =
    role === "mentor"
      ? [
          {
            title: appState.mentors.length ? "Verified" : "Pending setup",
            copy: appState.mentors.length ? "Mentor seeds, training flow, and access patterns are available in this workspace." : "Mentor verification details should be completed before going live.",
          },
          {
            title: `${appState.communityPosts.length || 3} active threads`,
            copy: "Use structured spaces and moderated group support instead of unrestricted private messaging.",
          },
          {
            title: "Guide, not diagnose",
            copy: "Keep support educational and encouraging while escalating medical or mental health concerns when needed.",
          },
        ]
      : role === "admin"
        ? [
            {
              title: `${appState.communityPosts.length || 3} flagged surfaces`,
              copy: "Community, mentorship, and AI should all route through clear trust and review systems.",
            },
            {
              title: `${appState.moderationQueue.length || 3} active policies`,
              copy: "Hidden content should be reviewed by admins before restore, warning, or stronger action.",
            },
            {
              title: `${appState.aiGuardrails.length || 3} AI guardrails`,
              copy: "The assistant should stay suggestive, non-diagnostic, and crisis-aware across all flows.",
            },
          ]
        : [
            {
              title: `${readiness}% ready`,
              copy: readiness >= 80 ? "Your profile has enough detail for stronger personalization." : "Add more context to unlock better suggestions and calmer guidance.",
            },
            {
              title: `${appState.logs.length} saved check-ins`,
              copy: appState.logs.length ? "Recent logs give Broom better rhythm awareness and planning support." : "Save a first check-in to start building your support memory.",
            },
            {
              title: nextPeriod ? formatDate(nextPeriod) : "No estimate yet",
              copy: nextPeriod ? "Your next cycle estimate is available because your last period start is saved." : "Add cycle settings to unlock phase-based previews and support cues.",
            },
          ];

  return (
    <div className="space-y-5">
      <WorkspaceHero role={role} profile={appState.profile} />

      <section className="grid gap-4 xl:grid-cols-3">
        {metricCards.map((card, index) => {
          const meta = ROLE_METRICS[role][index];
          return (
            <SpotlightCard
              key={meta.eyebrow}
              eyebrow={meta.eyebrow}
              title={card.title}
              copy={card.copy}
              icon={meta.icon}
              tone={meta.tone}
            />
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        {role === "user" ? (
          <Panel compact eyebrow="Daily intake" title="Capture the signals Broom should use">
            <form
              className="space-y-4"
              onSubmit={async (event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                await saveLogAction({
                  mood: String(data.get("mood") || ""),
                  energy: Number(data.get("energy") || 0),
                  focus: String(data.get("focus") || ""),
                  symptoms: String(data.get("symptoms") || ""),
                });
                event.currentTarget.reset();
              }}
            >
              <FieldSelect label="Mood" name="mood" options={["steady", "energized", "anxious", "low", "focused"]} />
              <label className="field-label">
                <span>Energy level</span>
                <input className="field-input px-0" name="energy" type="range" min="1" max="10" defaultValue="6" />
              </label>
              <FieldInput label="Main focus today" name="focus" placeholder="Work sprint, exam prep, rest, exercise" />
              <FieldTextarea label="Symptoms or blockers" name="symptoms" placeholder="Cramps, brain fog, bloating, headache, or none" />
              <button type="submit" className="primary-btn justify-center">
                Save check-in
              </button>
            </form>
          </Panel>
        ) : (
          <Panel eyebrow={role === "mentor" ? "Mentor commitments" : "Operations guardrails"} title={role === "mentor" ? "How support should be delivered" : "How trust should be enforced"}>
            <div className="grid gap-4">
              {(role === "mentor"
                ? [
                    "Sessions should stay structured and monitored rather than open-ended private chat.",
                    "Mentors guide, encourage, and educate, but they should not act like therapists or clinicians.",
                    "Escalate distress, abuse, or crisis signals into the proper help pathway instead of trying to resolve them alone.",
                  ]
                : [
                    "Community reports should hide risky content for review without crowd-led auto-bans.",
                    "Mentor approval should include verification, training, and ongoing quality monitoring.",
                    "AI responses should be reviewed when users report unsafe or misleading guidance repeatedly.",
                  ]).map((item) => (
                <article key={item} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300">
                  {item}
                </article>
              ))}
            </div>
          </Panel>
        )}

        <Panel compact eyebrow="Quick actions" title="Use the right workspace tools next">
          <div className="grid gap-4">
            {ROLE_ACTIONS[role].map((item) => (
              <ActionTile key={item.title} {...item} />
            ))}
          </div>
        </Panel>
      </section>

      <Panel compact eyebrow={role === "admin" ? "Live oversight" : role === "mentor" ? "Support snapshot" : "Personalization"} title={role === "admin" ? "What needs attention now" : role === "mentor" ? "Current mentorship picture" : "How Broom is shaping the experience"}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {(role === "admin"
            ? [
                { title: "Community review", copy: `${appState.communityPosts.length || 3} seeded posts are available to model moderation and trust review.` },
                { title: "Mentor governance", copy: `${appState.mentors.length || 3} mentor records show verification, training, and access patterns.` },
                { title: "AI safety", copy: `${appState.aiGuardrails.length || 3} guardrail themes define how the assistant should stay safe and bounded.` },
                { title: "Crisis pathway", copy: `${appState.crisisProtocol.length || 3} crisis rules support escalation instead of unsafe AI overreach.` },
              ]
            : role === "mentor"
              ? [
                  { title: "Mentor status", copy: "Verified mentor seeds and training notes are available to shape this dashboard." },
                  { title: "Community pulse", copy: `${appState.communityPosts.length || 3} discussion threads can guide group support themes and Q&A topics.` },
                  { title: "Boundaries", copy: "Support must stay educational, respectful, and clearly separated from diagnosis or therapy." },
                  { title: "Access model", copy: "Paid mentorship can still include scholarships, group sessions, and safer trial experiences." },
                ]
              : [
                  { title: "Profile status", copy: appState.profile.displayName ? `${appState.profile.displayName} is set up for ${appState.profile.primaryGoal || "personalized support"}.` : "Your profile is still incomplete." },
                  { title: "Cycle estimate", copy: nextPeriod ? `Expected next period around ${formatDate(nextPeriod)} based on your saved cycle length.` : "Add cycle length and last period start date to unlock predictions." },
                  { title: "Latest signal", copy: latestLog ? `${latestLog.mood} mood, ${latestLog.energy}/10 energy, focus on ${latestLog.focus || "general wellbeing"}.` : "No check-ins saved yet." },
                  { title: "Support mode", copy: appState.profile.consentToPersonalization ? "Broom can use your saved profile data and check-ins to personalize the assistant." : "Personalization consent is off, so the assistant stays more generic." },
                ]).map((item) => (
            <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function FieldInput({ label, name, placeholder }) {
  return (
    <label className="field-label">
      <span>{label}</span>
      <input className="field-input" name={name} placeholder={placeholder} />
    </label>
  );
}

function FieldTextarea({ label, name, placeholder }) {
  return (
    <label className="field-label">
      <span>{label}</span>
      <textarea className="field-input min-h-32 resize-y" name={name} placeholder={placeholder} />
    </label>
  );
}

function FieldSelect({ label, name, options }) {
  return (
    <label className="field-label">
      <span>{label}</span>
      <select className="field-input" name={name} defaultValue={options[0]}>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}
