import { USER_ROLES } from "../../state/appState.js";

const AGE_RANGES = ["13-17", "18-24", "25-34", "35-44", "45+"];
const AI_TONES = [
  { value: "supportive", label: "Supportive" },
  { value: "direct", label: "Direct" },
  { value: "coach", label: "Coach style" },
  { value: "calm", label: "Calm and gentle" },
];

export function OnboardingModal({ open, profile, onClose, onSubmit }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-xl" onClick={onClose}>
      <div className="glass-panel-strong max-h-[90vh] w-full max-w-5xl overflow-y-auto p-6 md:p-8" onClick={(event) => event.stopPropagation()}>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Onboarding</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-white">Teach Broom how to support this user</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              These details power the dashboard, assistant, tracker, and future product decisions for a more personal experience.
            </p>
          </div>
          <button type="button" onClick={onClose} className="chip-btn">
            Close
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
          <label className="field-label">
            <span>Workspace role</span>
            <select name="role" defaultValue={profile.role || "user"} className="field-input">
              {USER_ROLES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <Field label="Display name" name="displayName" defaultValue={profile.displayName} placeholder="Amina" />
          <Field label="Location" name="location" defaultValue={profile.location} placeholder="Johannesburg, South Africa" />

          <label className="field-label">
            <span>Age range</span>
            <select name="ageRange" defaultValue={profile.ageRange} className="field-input">
              {AGE_RANGES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <Field label="Cycle length" name="cycleLength" type="number" min="20" max="40" defaultValue={profile.cycleLength} />
          <Field label="Last period start" name="lastPeriodStart" type="date" defaultValue={profile.lastPeriodStart} />

          <label className="field-label">
            <span>Preferred AI tone</span>
            <select name="aiTone" defaultValue={profile.aiTone} className="field-input">
              {AI_TONES.map((tone) => (
                <option key={tone.value} value={tone.value}>
                  {tone.label}
                </option>
              ))}
            </select>
          </label>

          <Field className="md:col-span-2" label="Main goal" name="primaryGoal" defaultValue={profile.primaryGoal} placeholder="Reduce stress, understand symptoms, stay productive" />
          <Field className="md:col-span-2" label="Focus areas" name="focusAreas" defaultValue={profile.focusAreas} placeholder="Cycle tracking, energy planning, nutrition, work rhythm, study routines" textarea />
          <Field className="md:col-span-2" label="Support needs" name="supportNeeds" defaultValue={profile.supportNeeds} placeholder="What should the app and AI pay attention to?" textarea />

          <label className="md:col-span-2 flex items-start gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            <input type="checkbox" name="consentToPersonalization" defaultChecked={profile.consentToPersonalization !== false} className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-cyan-300" />
            <span>Use my profile and wellness logs to personalize dashboard insights and AI replies.</span>
          </label>

          <div className="md:col-span-2 flex flex-wrap justify-end gap-3">
            <button type="button" onClick={onClose} className="chip-btn">
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              Save profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, textarea = false, className = "", ...props }) {
  return (
    <label className={`field-label ${className}`}>
      <span>{label}</span>
      {textarea ? (
        <textarea name={name} className="field-input min-h-32 resize-y" {...props} />
      ) : (
        <input name={name} className="field-input" {...props} />
      )}
    </label>
  );
}
