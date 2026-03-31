import { Panel } from "../components/shared/Panel.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { USER_ROLES, getProfileRole, getRoleConfig } from "../state/appState.js";
import { capitalize } from "../utils/formatters.js";

export function ProfilePage() {
  const { appState, saveProfileAction } = useAppContext();
  const profile = appState.profile;
  const role = getProfileRole(profile);
  const roleConfig = getRoleConfig(role);

  const snapshot = [
    { title: "Role", copy: roleConfig.label },
    { title: "Name", copy: profile.displayName || "Not set" },
    { title: "Location", copy: profile.location || "Not set" },
    { title: "Goal", copy: profile.primaryGoal || "Not set" },
    { title: "Focus areas", copy: profile.focusAreas || "Not set" },
    { title: "AI tone", copy: capitalize(profile.aiTone || "supportive") },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Panel eyebrow="Profile editor" title="Update personalization settings">
        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={async (event) => {
            event.preventDefault();
            await saveProfileAction(new FormData(event.currentTarget));
          }}
        >
          <SelectField
            label="Workspace role"
            name="role"
            defaultValue={profile.role || "user"}
            options={USER_ROLES.map((item) => ({ value: item.value, label: item.label }))}
          />
          <Field label="Display name" name="displayName" defaultValue={profile.displayName} />
          <Field label="Location" name="location" defaultValue={profile.location} />
          <SelectField label="Age range" name="ageRange" defaultValue={profile.ageRange} options={["13-17", "18-24", "25-34", "35-44", "45+"]} />
          <Field label="Cycle length" name="cycleLength" type="number" min="20" max="40" defaultValue={profile.cycleLength} />
          <Field label="Last period start" name="lastPeriodStart" type="date" defaultValue={profile.lastPeriodStart} />
          <SelectField
            label="Preferred AI tone"
            name="aiTone"
            defaultValue={profile.aiTone}
            options={[
              { value: "supportive", label: "Supportive" },
              { value: "direct", label: "Direct" },
              { value: "coach", label: "Coach style" },
              { value: "calm", label: "Calm and gentle" },
            ]}
          />
          <Field className="md:col-span-2" label="Main goal" name="primaryGoal" defaultValue={profile.primaryGoal} />
          <Field className="md:col-span-2" label="Focus areas" name="focusAreas" defaultValue={profile.focusAreas} textarea />
          <Field className="md:col-span-2" label="Support needs" name="supportNeeds" defaultValue={profile.supportNeeds} textarea />
          <label className="md:col-span-2 flex items-start gap-3 rounded-[1.75rem] border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            <input type="checkbox" name="consentToPersonalization" defaultChecked={profile.consentToPersonalization !== false} className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-cyan-300" />
            <span>Use my profile and saved logs for personalization.</span>
          </label>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="primary-btn justify-center">
              Save profile
            </button>
          </div>
        </form>
      </Panel>

      <Panel eyebrow="Snapshot" title="Workspace profile summary">
        <div className="space-y-4">
          <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <h3 className="font-display text-xl font-semibold text-white">{roleConfig.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{roleConfig.description}</p>
          </article>
          {snapshot.map((item) => (
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

function Field({ label, name, type = "text", textarea = false, className = "", ...props }) {
  return (
    <label className={`field-label ${className}`}>
      <span>{label}</span>
      {textarea ? <textarea className="field-input min-h-32 resize-y" name={name} {...props} /> : <input className="field-input" name={name} type={type} {...props} />}
    </label>
  );
}

function SelectField({ label, name, options, defaultValue }) {
  return (
    <label className="field-label">
      <span>{label}</span>
      <select className="field-input" name={name} defaultValue={defaultValue}>
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const labelText = typeof option === "string" ? option : option.label;
          return (
            <option key={value} value={value}>
              {labelText}
            </option>
          );
        })}
      </select>
    </label>
  );
}
