export function getProfileReadiness(profile) {
  const checks = [
    Boolean(profile.role),
    Boolean(profile.displayName),
    Boolean(profile.location),
    Boolean(profile.primaryGoal),
    Boolean(profile.focusAreas),
    Boolean(profile.supportNeeds),
    Boolean(profile.lastPeriodStart),
  ];

  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

function normalizeDate(value) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getCycleDay(profile) {
  if (!profile.lastPeriodStart) {
    return null;
  }

  const start = normalizeDate(profile.lastPeriodStart);
  if (Number.isNaN(start.getTime())) {
    return null;
  }

  const today = normalizeDate(Date.now());
  const diffDays = Math.floor((today.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
  const cycleLength = Math.max(Number(profile.cycleLength) || 28, 1);
  return (diffDays % cycleLength) + 1;
}

export function getNextPeriodDate(profile) {
  const cycleDay = getCycleDay(profile);
  if (!cycleDay) {
    return null;
  }

  const next = new Date();
  next.setDate(next.getDate() + ((Number(profile.cycleLength) || 28) - cycleDay));
  return next;
}

export function buildContextSummary(profile, user, logs) {
  const parts = [];

  parts.push(`Role: ${profile.role || "user"}`);
  parts.push(`Name: ${profile.displayName || user?.displayName || "not set"}`);
  parts.push(`Goal: ${profile.primaryGoal || "not set"}`);
  parts.push(`Focus areas: ${profile.focusAreas || "not set"}`);
  parts.push(`Support needs: ${profile.supportNeeds || "not set"}`);
  parts.push(`Cycle length: ${profile.cycleLength || "not set"} days`);
  parts.push(`AI tone: ${profile.aiTone || "supportive"}`);

  if (logs[0]) {
    const latest = logs[0];
    parts.push(`Latest log: ${latest.mood} mood, ${latest.energy}/10 energy, focus ${latest.focus || "not set"}, symptoms ${latest.symptoms || "none"}`);
  } else {
    parts.push("Latest log: none saved");
  }

  return parts.join(" | ");
}

export function getPhaseForCycleDay(cycleDay, cycleLength) {
  if (!cycleDay || !cycleLength) {
    return "unknown";
  }

  const menstrualLength = Math.min(5, cycleLength);
  const ovulationDay = Math.max(14, cycleLength - 14);
  const fertileStart = Math.max(menstrualLength + 1, ovulationDay - 3);
  const fertileEnd = Math.min(cycleLength, ovulationDay + 1);

  if (cycleDay <= menstrualLength) {
    return "menstrual";
  }

  if (cycleDay === ovulationDay) {
    return "ovulation";
  }

  if (cycleDay >= fertileStart && cycleDay <= fertileEnd) {
    return "fertile";
  }

  if (cycleDay < fertileStart) {
    return "follicular";
  }

  return "luteal";
}

export function getCurrentPhase(profile) {
  const cycleDay = getCycleDay(profile);
  const cycleLength = Number(profile.cycleLength) || 28;
  const phase = getPhaseForCycleDay(cycleDay, cycleLength);

  return {
    cycleDay,
    cycleLength,
    phase,
  };
}

export function getCycleDayForDate(profile, dateValue) {
  if (!profile.lastPeriodStart) {
    return null;
  }

  const start = normalizeDate(profile.lastPeriodStart);
  const date = normalizeDate(dateValue);
  if (Number.isNaN(start.getTime()) || Number.isNaN(date.getTime())) {
    return null;
  }

  const diffDays = Math.floor((date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
  if (diffDays < 0) {
    return null;
  }

  const cycleLength = Math.max(Number(profile.cycleLength) || 28, 1);
  return (diffDays % cycleLength) + 1;
}

export function getPhaseForDate(profile, dateValue) {
  const cycleDay = getCycleDayForDate(profile, dateValue);
  if (!cycleDay) {
    return "unknown";
  }

  return getPhaseForCycleDay(cycleDay, Number(profile.cycleLength) || 28);
}

export function buildCycleCalendar(profile, monthDate = new Date()) {
  const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
  const startOffset = monthStart.getDay();
  const totalDays = monthEnd.getDate();
  const today = normalizeDate(Date.now()).getTime();
  const entries = [];

  for (let i = 0; i < startOffset; i += 1) {
    entries.push({ key: `empty-${i}`, type: "empty" });
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
    const cycleDay = getCycleDayForDate(profile, date);
    const phase = getPhaseForDate(profile, date);

    entries.push({
      key: date.toISOString(),
      type: "day",
      day,
      date,
      cycleDay,
      phase,
      isToday: normalizeDate(date).getTime() === today,
    });
  }

  return {
    monthLabel: monthStart.toLocaleDateString(undefined, { month: "long", year: "numeric" }),
    weekdayLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    entries,
  };
}

export function extractProfileFromFormData(formData, existingProfile) {
  return {
    ...existingProfile,
    role: String(formData.get("role") || existingProfile.role || "user"),
    displayName: String(formData.get("displayName") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    ageRange: String(formData.get("ageRange") || "18-24"),
    cycleLength: Number(formData.get("cycleLength") || 28),
    lastPeriodStart: String(formData.get("lastPeriodStart") || ""),
    primaryGoal: String(formData.get("primaryGoal") || "").trim(),
    focusAreas: String(formData.get("focusAreas") || "").trim(),
    supportNeeds: String(formData.get("supportNeeds") || "").trim(),
    aiTone: String(formData.get("aiTone") || "supportive"),
    consentToPersonalization: Boolean(formData.get("consentToPersonalization")),
  };
}
