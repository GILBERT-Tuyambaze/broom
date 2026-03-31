import PptxGenJS from "pptxgenjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outputPath = path.join(rootDir, "presentations", "Broom_Project_Presentation.pptx");

const COLORS = {
  bg: "06111D",
  bgAlt: "0C1727",
  panel: "132338",
  panelAlt: "111C2E",
  cyan: "5DE7FF",
  orange: "FF8F6B",
  white: "F6FBFF",
  muted: "8DA3BF",
  green: "3EDBA0",
  rose: "F87171",
  amber: "FBBF24",
  purple: "C4B5FD",
};

const DECK = [
  {
    eyebrow: "PROJECT PRESENTATION",
    title: "Broom",
    subtitle: "A personalized health, rhythm, and AI support platform",
    body:
      "Broom combines cycle awareness, emotional reflection, personalized guidance, and a modern web experience to support healthier routines and stronger self-understanding.",
    rightCard: {
      title: "At a glance",
      body:
        "Current build includes a landing page, Firebase auth, AI chat, profile memory, a phase-colored cycle calendar, theme modes, a responsive dashboard, and seeded trust-system content.",
      accent: COLORS.orange,
    },
  },
  {
    eyebrow: "OPPORTUNITY",
    title: "Why Broom matters",
    subtitle:
      "Many users need support that connects physical health, emotional patterns, and practical daily guidance.",
    cards: [
      {
        title: "Fragmented tools",
        body:
          "Most products treat cycle tracking, journaling, and guidance as separate experiences, forcing users to piece together insights alone.",
        accent: COLORS.cyan,
      },
      {
        title: "Low personalization",
        body:
          "Generic advice often misses context such as cycle phase, mood, stress, goals, and preferred communication style.",
        accent: COLORS.green,
      },
      {
        title: "Trust gap",
        body:
          "Sensitive wellness data needs clearer consent, safer design, moderation logic, and a product language that feels supportive instead of intrusive.",
        accent: COLORS.orange,
      },
    ],
    bullets: [
      "Broom addresses this by turning scattered signals into one connected and understandable workspace.",
      "The experience is designed to be calm, user-friendly, and clear about what is already built versus what belongs in the roadmap.",
    ],
  },
  {
    eyebrow: "SOLUTION",
    title: "What Broom is",
    subtitle: "A modern web app built as a connected support system, not just a tracker.",
    cards: [
      {
        title: "Body intelligence",
        body:
          "Cycle tracking, symptom logging, and a phase-colored calendar make body patterns easier to understand.",
        accent: COLORS.cyan,
      },
      {
        title: "Mind intelligence",
        body:
          "Mood logs, profile context, and reflective check-ins help connect emotional patterns with daily experience.",
        accent: COLORS.purple,
      },
      {
        title: "Adaptive guidance",
        body:
          "An AI copilot uses saved profile and check-in context to respond in a more personal and practical way while staying inside guardrails.",
        accent: COLORS.orange,
      },
    ],
  },
  {
    eyebrow: "LIVE MVP",
    title: "What is already built today",
    splitCards: [
      {
        title: "Implemented product features",
        accent: COLORS.cyan,
        bullets: [
          "Public landing page with clear entry points into sign in, account creation, and preview mode.",
          "Firebase email authentication and a saved user profile structure.",
          "Dashboard, assistant, tracker, resources, and profile pages with React Router.",
          "Theme modes and responsive high-tech UI built with Vite, React, and Tailwind CSS.",
          "Seeded resource vault content for community safety, verified mentorship, and AI trust guidance.",
        ],
      },
      {
        title: "Implemented intelligence layer",
        accent: COLORS.orange,
        bullets: [
          "AI copilot chat with saved context and a fallback assistant mode.",
          "Profile-driven personalization using goals, support needs, and tone preferences.",
          "Phase-colored cycle calendar for menstrual, follicular, fertile, ovulation, and luteal stages.",
          "Expanded preview seed data for community posts, moderation flow, mentorship access, and crisis-response rules.",
        ],
      },
    ],
  },
  {
    eyebrow: "STRENGTHS",
    title: "What makes the project strong",
    cards: [
      {
        title: "Strong user experience",
        body:
          "The app now has a proper landing page, routed navigation, responsive layouts, theme switching, and a cleaner onboarding-to-action flow.",
        accent: COLORS.cyan,
      },
      {
        title: "Personalization foundation",
        body:
          "Broom already stores profile context, wellness logs, and assistant conversations in a reusable structure that can grow with the product.",
        accent: COLORS.green,
      },
      {
        title: "Credible technical base",
        body:
          "Modern frontend architecture with Vite, React Router, Tailwind CSS, Firebase Auth, Firestore-ready data flow, and reusable components.",
        accent: COLORS.orange,
      },
    ],
  },
  {
    eyebrow: "TRUST MODEL",
    title: "How Broom stays safer as it grows",
    subtitle: "The platform now presents community, mentorship, and AI safety as structured systems rather than loose ideas.",
    cards: [
      {
        title: "Anonymous community",
        body:
          "Posts can stay anonymous, reports can temporarily hide content, and admins make final moderation decisions instead of auto-bans from crowd disagreement.",
        accent: COLORS.cyan,
      },
      {
        title: "Verified mentorship",
        body:
          "Mentors apply, are verified, receive boundaries training, and can operate in paid programs with scholarship or sponsored access paths.",
        accent: COLORS.green,
      },
      {
        title: "AI guardrails",
        body:
          "The assistant avoids diagnosis, supports reporting of misleading answers, and escalates alarming language into a crisis-response flow.",
        accent: COLORS.orange,
      },
    ],
  },
  {
    eyebrow: "BEST FEATURES",
    title: "The standout experience areas",
    featureGrid: [
      ["Landing page", "A clearer product story and better first impression before users enter auth.", COLORS.cyan],
      ["AI chatbox", "Personalized support shaped by profile, logs, and saved context.", COLORS.green],
      ["Cycle calendar", "Phase colors make monthly rhythm easier to scan and understand.", COLORS.rose],
      ["Theme modes", "Aurora, Eclipse, and Sunrise give users control over the visual feel.", COLORS.amber],
      ["Preview mode", "Users can experience the product immediately with seeded data.", COLORS.purple],
    ],
  },
  {
    eyebrow: "UNIQUENESS",
    title: "Why Broom stands out",
    bullets: [
      "Broom does not frame health tracking and AI as separate tools. It treats them as one connected support experience.",
      "The product aims to link body awareness, emotional awareness, and practical action in a single user journey.",
      "The app is designed to be both technically modern and mission-driven, making it easier to evolve into a wider empowerment platform.",
      "Its preview data and resource design now model trust systems like moderation, mentorship verification, and AI safety instead of leaving them abstract.",
      "Its architecture already supports future layers like community interaction, role-model stories, and guided growth content.",
    ],
    rightCard: {
      title: "Core differentiator",
      body: "Integrated rhythm + reflection + AI",
      accent: COLORS.orange,
    },
  },
  {
    eyebrow: "AUDIENCE",
    title: "Who Broom is built for",
    cards: [
      {
        title: "Primary users",
        body:
          "Girls and women who want a more understandable way to track health patterns, reflect on emotions, and receive contextual support.",
        accent: COLORS.cyan,
      },
      {
        title: "Everyday use cases",
        body:
          "Planning around cycle phases, understanding mood shifts, building routines, reducing stress, and getting next-step guidance.",
        accent: COLORS.green,
      },
      {
        title: "Impact potential",
        body:
          "The concept is especially meaningful in communities where accessible wellness education, guidance, and confidence-building tools are limited.",
        accent: COLORS.orange,
      },
    ],
  },
  {
    eyebrow: "ROADMAP",
    title: "Where the platform can grow next",
    subtitle:
      "This slide separates future expansion from the features that already exist today.",
    cards: [
      {
        title: "Human support layer",
        body:
          "Full community posting flows, mentorship matching, and safer ways for users to learn from trusted role models.",
        accent: COLORS.cyan,
      },
      {
        title: "Smarter guidance",
        body:
          "Deeper insights that connect sleep, stress, symptoms, and routine data without crossing into overconfident advice.",
        accent: COLORS.purple,
      },
      {
        title: "Growth ecosystem",
        body:
          "Role-model stories, digital skills content, entrepreneurship pathways, and life development tools beyond wellness tracking.",
        accent: COLORS.orange,
      },
    ],
  },
  {
    eyebrow: "CLOSING",
    title: "Broom is more than a tracker.",
    subtitle: "It is the foundation of a personalized support ecosystem.",
    body:
      "With a stronger MVP, expanded seed data, and a mission-centered trust model, Broom is positioned to grow into a trusted platform for health understanding, emotional intelligence, and empowerment.",
    rightCard: {
      title: "Presentation focus",
      body: "Strengths\nBest features\nTrust model\nCurrent MVP\nFuture roadmap",
      accent: COLORS.cyan,
    },
  },
];

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "Broom";
pptx.subject = "Broom project presentation";
pptx.title = "Broom Project Presentation";
pptx.lang = "en-US";

function addGlow(slide) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x: -0.35,
    y: -0.15,
    w: 2.2,
    h: 2.2,
    fill: { color: COLORS.cyan, transparency: 82 },
    line: { color: COLORS.cyan, transparency: 100 },
  });

  slide.addShape(pptx.ShapeType.ellipse, {
    x: 10.6,
    y: 0.3,
    w: 2.0,
    h: 2.0,
    fill: { color: COLORS.orange, transparency: 85 },
    line: { color: COLORS.orange, transparency: 100 },
  });

  slide.addShape(pptx.ShapeType.ellipse, {
    x: 4.8,
    y: 6.05,
    w: 2.6,
    h: 1.8,
    fill: { color: COLORS.purple, transparency: 92 },
    line: { color: COLORS.purple, transparency: 100 },
  });
}

function addFooter(slide, page) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.7,
    y: 6.95,
    w: 11.92,
    h: 0.02,
    fill: { color: COLORS.panelAlt },
    line: { color: COLORS.panelAlt, transparency: 100 },
  });

  slide.addText("Broom", {
    x: 0.76,
    y: 7.02,
    w: 1.2,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 10,
    bold: true,
    color: COLORS.muted,
    margin: 0,
  });

  slide.addText(String(page), {
    x: 12.0,
    y: 7.0,
    w: 0.25,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 10,
    align: "right",
    color: COLORS.muted,
    margin: 0,
  });
}

function addHeader(slide, eyebrow, title, subtitle) {
  slide.addText(eyebrow.toUpperCase(), {
    x: 0.75,
    y: 0.48,
    w: 3.2,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 10,
    bold: true,
    color: COLORS.cyan,
    charSpace: 1.4,
    margin: 0,
  });

  slide.addText(title, {
    x: 0.75,
    y: 0.86,
    w: 9.2,
    h: 0.55,
    fontFace: "Aptos Display",
    fontSize: 28,
    bold: true,
    color: COLORS.white,
    margin: 0,
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.77,
      y: 1.63,
      w: 9.2,
      h: 0.45,
      fontFace: "Aptos",
      fontSize: 13,
      color: COLORS.muted,
      margin: 0,
    });
  }
}

function addCard(slide, { x, y, w, h, title, body, accent = COLORS.cyan, bodySize = 11.5 }) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: COLORS.panel },
    line: { color: accent, transparency: 55, pt: 1.25 },
  });

  slide.addText(title, {
    x: x + 0.2,
    y: y + 0.15,
    w: w - 0.35,
    h: 0.28,
    fontFace: "Aptos Display",
    fontSize: 15,
    bold: true,
    color: COLORS.white,
    margin: 0,
  });

  slide.addText(body, {
    x: x + 0.2,
    y: y + 0.56,
    w: w - 0.35,
    h: h - 0.72,
    fontFace: "Aptos",
    fontSize: bodySize,
    color: COLORS.muted,
    breakLine: false,
    valign: "top",
    margin: 0,
  });
}

function addBulletList(slide, items, { x, y, w, h, fontSize = 17, color = COLORS.white }) {
  slide.addText(
    items.map((text) => ({
      text,
      options: { bullet: { indent: 18 } },
    })),
    {
      x,
      y,
      w,
      h,
      fontFace: "Aptos",
      fontSize,
      color,
      paraSpaceAfterPt: 10,
      breakLine: false,
      valign: "top",
      margin: 0,
    },
  );
}

function addTitleSlide(slide, content) {
  slide.addText(content.eyebrow, {
    x: 0.96,
    y: 0.82,
    w: 2.5,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 10,
    bold: true,
    color: COLORS.cyan,
    margin: 0,
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.78,
    y: 0.7,
    w: 2.55,
    h: 0.42,
    rectRadius: 0.06,
    fill: { color: COLORS.panel },
    line: { color: COLORS.panel, transparency: 100 },
  });

  slide.addText(content.title, {
    x: 0.82,
    y: 1.5,
    w: 5.0,
    h: 0.55,
    fontFace: "Aptos Display",
    fontSize: 32,
    bold: true,
    color: COLORS.white,
    margin: 0,
  });

  slide.addText(content.subtitle, {
    x: 0.85,
    y: 2.2,
    w: 7.0,
    h: 0.6,
    fontFace: "Aptos Display",
    fontSize: 24,
    bold: true,
    color: COLORS.white,
    margin: 0,
  });

  slide.addText(content.body, {
    x: 0.85,
    y: 3.35,
    w: 6.4,
    h: 1.0,
    fontFace: "Aptos",
    fontSize: 16,
    color: COLORS.muted,
    margin: 0,
  });

  addCard(slide, {
    x: 8.28,
    y: 1.35,
    w: 3.3,
    h: 4.6,
    title: content.rightCard.title,
    body: content.rightCard.body,
    accent: content.rightCard.accent,
    bodySize: 13,
  });
}

function addThreeCards(slide, content, top = 2.05, height = 3.95) {
  const positions = [0.75, 4.45, 8.15];
  content.cards.forEach((card, index) => {
    addCard(slide, {
      x: positions[index],
      y: top,
      w: 3.55,
      h: height,
      title: card.title,
      body: card.body,
      accent: card.accent,
    });
  });
}

function addFeatureGrid(slide, content) {
  const specs = [
    { x: 0.75, w: 2.2 },
    { x: 3.1, w: 2.2 },
    { x: 5.45, w: 2.2 },
    { x: 7.8, w: 2.2 },
    { x: 10.15, w: 1.6 },
  ];

  content.featureGrid.forEach(([title, body, accent], index) => {
    addCard(slide, {
      x: specs[index].x,
      y: 2.0,
      w: specs[index].w,
      h: 3.95,
      title,
      body,
      accent,
      bodySize: 10.5,
    });
  });
}

function addSplitCards(slide, content) {
  content.splitCards.forEach((card, index) => {
    const x = index === 0 ? 0.75 : 6.45;
    const w = index === 0 ? 5.45 : 5.3;
    addCard(slide, {
      x,
      y: 2.05,
      w,
      h: 3.9,
      title: card.title,
      body: "",
      accent: card.accent,
    });

    addBulletList(slide, card.bullets, {
      x: x + 0.22,
      y: 2.62,
      w: w - 0.45,
      h: 3.0,
      fontSize: 15,
    });
  });
}

for (const [index, content] of DECK.entries()) {
  const slide = pptx.addSlide();
  slide.background = { color: index % 2 === 0 ? COLORS.bg : COLORS.bgAlt };
  addGlow(slide);

  if (index === 0) {
    addTitleSlide(slide, content);
    addFooter(slide, index + 1);
    continue;
  }

  addHeader(slide, content.eyebrow, content.title, content.subtitle);

  if (content.cards) {
    addThreeCards(slide, content, content.eyebrow === "ROADMAP" ? 2.05 : 2.0, content.eyebrow === "ROADMAP" ? 3.9 : 4.0);
  }

  if (content.splitCards) {
    addSplitCards(slide, content);
  }

  if (content.featureGrid) {
    addFeatureGrid(slide, content);
  }

  if (content.bullets && !content.splitCards) {
    addBulletList(slide, content.bullets, {
      x: 0.95,
      y: content.cards ? 6.15 : 2.05,
      w: content.rightCard ? 7.25 : 10.8,
      h: content.cards ? 0.7 : 3.9,
      fontSize: content.eyebrow === "UNIQUENESS" ? 18 : 16,
    });
  }

  if (content.rightCard) {
    addCard(slide, {
      x: content.eyebrow === "UNIQUENESS" ? 8.65 : 8.35,
      y: content.eyebrow === "UNIQUENESS" ? 4.7 : 1.75,
      w: content.eyebrow === "UNIQUENESS" ? 3.05 : 3.1,
      h: content.eyebrow === "UNIQUENESS" ? 1.2 : 3.2,
      title: content.rightCard.title,
      body: content.rightCard.body,
      accent: content.rightCard.accent,
      bodySize: content.eyebrow === "UNIQUENESS" ? 13 : 12.5,
    });
  }

  if (content.body && index !== 0) {
    slide.addText(content.body, {
      x: 0.88,
      y: 3.3,
      w: 7.15,
      h: 1.2,
      fontFace: "Aptos",
      fontSize: 16,
      color: COLORS.muted,
      margin: 0,
    });
  }

  addFooter(slide, index + 1);
}

await pptx.writeFile({ fileName: outputPath });
console.log(`Created ${outputPath}`);
