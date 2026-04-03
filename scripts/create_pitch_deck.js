const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'EzoraAI';
pres.title = 'EzoraAI Investor Pitch Deck';

// Brand colors
const colors = {
  navy: "0B1224",
  darkSurface: "131D3B",
  teal: "00C9A7",
  purple: "7C3AED",
  gold: "F5A623",
  white: "F4F6FA",
  gray: "94A3B8",
  darkGray: "64748B"
};

const fonts = {
  title: "Arial Black",
  body: "Arial"
};

// Slide 1: Title Slide
let slide1 = pres.addSlide();
slide1.background = { color: colors.navy };
slide1.addText("EzoraAI", {
  x: 0.5, y: 1.5, w: 9, h: 0.8,
  fontSize: 60, bold: true, color: colors.white, fontFace: fonts.title, align: "center"
});
slide1.addText("The Professional Network & Marketplace for the AI Economy", {
  x: 0.5, y: 2.4, w: 9, h: 0.6,
  fontSize: 28, color: colors.teal, fontFace: fonts.body, align: "center"
});
slide1.addText("LinkedIn + Fiverr for AI\nFor businesses and everyday people alike.", {
  x: 0.5, y: 3.2, w: 9, h: 0.8,
  fontSize: 18, color: colors.white, fontFace: fonts.body, align: "center"
});
slide1.addText("Investor Pitch Deck  |  Pre-Seed  |  2026", {
  x: 0.5, y: 4.8, w: 9, h: 0.4,
  fontSize: 12, color: colors.gray, fontFace: fonts.body, align: "center"
});

// Slide 2: The Problem
let slide2 = pres.addSlide();
slide2.background = { color: colors.navy };
slide2.addText("The Problem", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 44, bold: true, color: colors.white, fontFace: fonts.title
});
slide2.addText("AI is transforming everything — but most people and businesses can't access the help they need.", {
  x: 0.5, y: 1.0, w: 9, h: 0.6,
  fontSize: 16, color: colors.gray, fontFace: fonts.body
});

// Problem grid (2x2)
const problems = [
  { title: "Fragmented AI Talent", subtitle: "For Businesses", color: colors.teal, desc: "Experts scattered across platforms. No central discovery or vetting." },
  { title: "AI Literacy Gap", subtitle: "For Everyday People", color: colors.purple, desc: "Millions know they need AI skills but have no personalized way to learn." },
  { title: "No Verifiable Proof", subtitle: "For Businesses", color: colors.teal, desc: "Resumes can be faked. No tamper-proof way to verify real AI capabilities or project outcomes." },
  { title: "Generic Resources", subtitle: "For Everyday People", color: colors.purple, desc: "YouTube and courses are impersonal. People need 1-on-1 guidance tailored to their life or business." }
];

const startY = 1.8;
const cardW = 4.3;
const cardH = 1.8;
const gapX = 0.4;
const gapY = 0.3;

problems.forEach((prob, idx) => {
  const row = Math.floor(idx / 2);
  const col = idx % 2;
  const x = 0.5 + col * (cardW + gapX);
  const y = startY + row * (cardH + gapY);

  slide2.addShape(pres.shapes.RECTANGLE, {
    x, y, w: cardW, h: cardH,
    fill: { color: colors.darkSurface }
  });

  slide2.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.08, h: cardH,
    fill: { color: prob.color }
  });

  slide2.addText(prob.title, {
    x: x + 0.15, y: y + 0.15, w: cardW - 0.3, h: 0.35,
    fontSize: 14, bold: true, color: prob.color, fontFace: fonts.title
  });

  slide2.addText(prob.subtitle, {
    x: x + 0.15, y: y + 0.5, w: cardW - 0.3, h: 0.25,
    fontSize: 10, color: colors.gray, fontFace: fonts.body
  });

  slide2.addText(prob.desc, {
    x: x + 0.15, y: y + 0.8, w: cardW - 0.3, h: 0.95,
    fontSize: 11, color: colors.white, fontFace: fonts.body
  });
});

slide2.addText("Adapt or be left behind. Both audiences need trusted AI experts — no platform connects them.", {
  x: 0.5, y: 5.0, w: 9, h: 0.4,
  fontSize: 13, italic: true, color: colors.teal, fontFace: fonts.body, align: "center"
});

// Slide 3: The Solution
let slide3 = pres.addSlide();
slide3.background = { color: colors.navy };
slide3.addText("The Solution", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 44, bold: true, color: colors.white, fontFace: fonts.title
});
slide3.addText("One platform for businesses to source AI talent — and for anyone to learn AI from a real expert.", {
  x: 0.5, y: 1.0, w: 9, h: 0.5,
  fontSize: 16, color: colors.gray, fontFace: fonts.body
});

const solutions = [
  {
    title: "Identity Layer",
    subtitle: "(LinkedIn + Blockchain)",
    items: ["Blockchain-verified proof-of-work", "Real-time portfolio of all completed work", "Immutable credentials & ratings"]
  },
  {
    title: "Marketplace Layer",
    subtitle: "(Fiverr)",
    items: ["AI agents & services for sale", "1-on-1 coaching sessions", "Subscription + usage pricing"]
  },
  {
    title: "Execution Layer",
    subtitle: "(Differentiator)",
    items: ["Interact with AI instantly", "Real output, not just listings", "Personalized, user-focused"]
  }
];

const solutionStartY = 1.7;
const solutionW = 2.8;
const solutionH = 3.5;
const solutionGapX = 0.35;

solutions.forEach((sol, idx) => {
  const x = 0.5 + idx * (solutionW + solutionGapX);

  slide3.addShape(pres.shapes.RECTANGLE, {
    x, y: solutionStartY, w: solutionW, h: solutionH,
    fill: { color: colors.darkSurface }
  });

  slide3.addText(sol.title, {
    x: x + 0.15, y: solutionStartY + 0.15, w: solutionW - 0.3, h: 0.3,
    fontSize: 13, bold: true, color: colors.teal, fontFace: fonts.title
  });

  slide3.addText(sol.subtitle, {
    x: x + 0.15, y: solutionStartY + 0.45, w: solutionW - 0.3, h: 0.25,
    fontSize: 10, color: colors.gray, fontFace: fonts.body
  });

  const bulletItems = sol.items.map((item, i) => ({
    text: item,
    options: { bullet: true, breakLine: i < sol.items.length - 1 }
  }));

  slide3.addText(bulletItems, {
    x: x + 0.15, y: solutionStartY + 0.75, w: solutionW - 0.3, h: 2.6,
    fontSize: 10, color: colors.white, fontFace: fonts.body
  });
});

// Slide 4: Blockchain POW
let slide4 = pres.addSlide();
slide4.background = { color: colors.navy };
slide4.addText("Blockchain Proof-of-Work", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 44, bold: true, color: colors.white, fontFace: fonts.title
});
slide4.addText("Every expert's track record is immutable, transparent, and verified on-chain.", {
  x: 0.5, y: 1.0, w: 9, h: 0.5,
  fontSize: 16, color: colors.gray, fontFace: fonts.body
});

const powItems = [
  { num: "1", title: "Expert completes work", desc: "Project, coaching session, or agent deployment on EzoraAI" },
  { num: "2", title: "Outcome is verified", desc: "Client rating, deliverable confirmation, completion status" },
  { num: "3", title: "Record is written", desc: "Blockchain ledger — timestamped, tamper-proof, permanent" },
  { num: "4", title: "Profile displays proof", desc: "Real-time, verifiable proof of every engagement" }
];

const flowStartY = 1.7;
const flowItemH = 0.8;
const flowGapY = 0.25;

powItems.forEach((item, idx) => {
  const y = flowStartY + idx * (flowItemH + flowGapY);

  slide4.addShape(pres.shapes.OVAL, {
    x: 0.5, y: y + 0.05, w: 0.35, h: 0.35,
    fill: { color: colors.teal }
  });

  slide4.addText(item.num, {
    x: 0.5, y: y + 0.05, w: 0.35, h: 0.35,
    fontSize: 16, bold: true, color: colors.navy, fontFace: fonts.title, align: "center", valign: "middle"
  });

  slide4.addText(item.title, {
    x: 1.0, y: y, w: 8.5, h: 0.3,
    fontSize: 12, bold: true, color: colors.teal, fontFace: fonts.title
  });

  slide4.addText(item.desc, {
    x: 1.0, y: y + 0.35, w: 8.5, h: 0.45,
    fontSize: 11, color: colors.gray, fontFace: fonts.body
  });
});

slide4.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 1.7, w: 4.3, h: 3.9,
  fill: { color: colors.darkSurface }
});

slide4.addText("Why It Matters", {
  x: 5.4, y: 1.9, w: 3.9, h: 0.3,
  fontSize: 13, bold: true, color: colors.teal, fontFace: fonts.title
});

const whyItems = [
  { title: "For Experts", items: ["Your track record is permanent and portable", "Every completed project, coaching session, and client rating builds your on-chain reputation", "No one can fake it"] },
  { title: "For Clients", items: ["See verified, real-time proof of an expert's capabilities", "No inflated resumes. No guesswork", "Trust built on transparency"] },
  { title: "For EzoraAI", items: ["Creates a defensible moat", "Expert reputation lives on-chain", "Switching costs increase as track records grow"] }
];

let whyY = 2.25;
whyItems.forEach((section, idx) => {
  slide4.addText(section.title, {
    x: 5.4, y: whyY, w: 3.9, h: 0.25,
    fontSize: 11, bold: true, color: colors.white, fontFace: fonts.title
  });

  const bulletItems = section.items.map((item, i) => ({
    text: item,
    options: { bullet: true, breakLine: i < section.items.length - 1 }
  }));

  slide4.addText(bulletItems, {
    x: 5.4, y: whyY + 0.3, w: 3.9, h: 0.85,
    fontSize: 9, color: colors.gray, fontFace: fonts.body
  });

  whyY += 1.2;
});

// Slide 5: Two Audiences
let slide5 = pres.addSlide();
slide5.background = { color: colors.navy };
slide5.addText("Two Audiences, One Platform", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 44, bold: true, color: colors.white, fontFace: fonts.title
});

const audiences = [
  {
    title: "Businesses & Companies",
    color: colors.teal,
    items: ["Source vetted AI experts for projects", "Replace costly SaaS with custom-built tools", "Access AI agents and automation workflows", "Enterprise licensing for internal AI hubs"],
    profile: "Higher ticket  |  Project-based  |  B2B SaaS model",
    avg: "Avg. engagement: $1K–$50K+"
  },
  {
    title: "Everyday People",
    color: colors.purple,
    items: ["1-on-1 AI coaching with a vetted expert", "Learn AI tailored to your job, business, or life", "Choose an expert that fits your style and goals", "No coding needed — human-first experience"],
    profile: "High volume  |  Session-based  |  Consumer model",
    avg: "Avg. session: $50–$500"
  }
];

audiences.forEach((aud, idx) => {
  const x = idx === 0 ? 0.5 : 5.2;
  const cardW = 4.3;

  slide5.addShape(pres.shapes.RECTANGLE, {
    x, y: 1.2, w: cardW, h: 4.0,
    fill: { color: colors.darkSurface }
  });

  slide5.addShape(pres.shapes.RECTANGLE, {
    x, y: 1.2, w: 0.08, h: 4.0,
    fill: { color: aud.color }
  });

  slide5.addText(aud.title, {
    x: x + 0.15, y: 1.35, w: cardW - 0.3, h: 0.35,
    fontSize: 14, bold: true, color: aud.color, fontFace: fonts.title
  });

  const bulletItems = aud.items.map((item, i) => ({
    text: item,
    options: { bullet: true, breakLine: i < aud.items.length - 1 }
  }));

  slide5.addText(bulletItems, {
    x: x + 0.15, y: 1.8, w: cardW - 0.3, h: 1.6,
    fontSize: 10, color: colors.white, fontFace: fonts.body
  });

  slide5.addText(aud.profile, {
    x: x + 0.15, y: 3.5, w: cardW - 0.3, h: 0.3,
    fontSize: 9, bold: true, color: aud.color, fontFace: fonts.body
  });

  slide5.addText(aud.avg, {
    x: x + 0.15, y: 3.85, w: cardW - 0.3, h: 0.3,
    fontSize: 9, italic: true, color: colors.gray, fontFace: fonts.body
  });
});

// Slide 6: Market Opportunity
let slide6 = pres.addSlide();
slide6.background = { color: colors.navy };
slide6.addText("Market Opportunity", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 44, bold: true, color: colors.white, fontFace: fonts.title
});

const markets = [
  { stat: "$100B+", label: "Global AI Market", desc: "Growing 35%+ CAGR" },
  { stat: "$250B+", label: "Creator Economy", desc: "Rapidly shifting to AI" },
  { stat: "$618B", label: "Dev Outsourcing", desc: "AI experts in highest demand" }
];

const marketStartY = 1.2;
const marketItemW = 2.8;
const marketGapX = 0.3;

markets.forEach((market, idx) => {
  const x = 0.5 + idx * (marketItemW + marketGapX);

  slide6.addShape(pres.shapes.RECTANGLE, {
    x, y: marketStartY, w: marketItemW, h: 1.2,
    fill: { color: colors.darkSurface }
  });

  slide6.addText(market.stat, {
    x: x + 0.1, y: marketStartY + 0.15, w: marketItemW - 0.2, h: 0.4,
    fontSize: 28, bold: true, color: colors.teal, fontFace: fonts.title, align: "center"
  });

  slide6.addText(market.label, {
    x: x + 0.1, y: marketStartY + 0.55, w: marketItemW - 0.2, h: 0.25,
    fontSize: 11, bold: true, color: colors.white, fontFace: fonts.body, align: "center"
  });

  slide6.addText(market.desc, {
    x: x + 0.1, y: marketStartY + 0.8, w: marketItemW - 0.2, h: 0.3,
    fontSize: 9, color: colors.gray, fontFace: fonts.body, align: "center"
  });
});

slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 2.7, w: 9, h: 0.08,
  fill: { color: colors.teal }
});

slide6.addText("The Paradigm Shift", {
  x: 0.5, y: 3.0, w: 9, h: 0.4,
  fontSize: 18, bold: true, color: colors.teal, fontFace: fonts.title, align: "center"
});

const paradigmStart = 3.6;
const paradigmBoxW = 4.3;

// Old World
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: paradigmStart, w: paradigmBoxW, h: 1.6,
  fill: { color: colors.darkSurface }
});

slide6.addText("OLD WORLD", {
  x: 0.7, y: paradigmStart + 0.15, w: paradigmBoxW - 0.4, h: 0.25,
  fontSize: 12, bold: true, color: colors.gray, fontFace: fonts.title
});

slide6.addText("Companies hire consultants. Individuals watch YouTube.", {
  x: 0.7, y: paradigmStart + 0.45, w: paradigmBoxW - 0.4, h: 0.4,
  fontSize: 11, color: colors.white, fontFace: fonts.body
});

slide6.addText("Slow, generic, expensive, impersonal", {
  x: 0.7, y: paradigmStart + 0.9, w: paradigmBoxW - 0.4, h: 0.6,
  fontSize: 10, italic: true, color: colors.gray, fontFace: fonts.body
});

// New World
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: paradigmStart, w: paradigmBoxW, h: 1.6,
  fill: { color: colors.darkSurface }
});

slide6.addText("NEW WORLD", {
  x: 5.4, y: paradigmStart + 0.15, w: paradigmBoxW - 0.4, h: 0.25,
  fontSize: 12, bold: true, color: colors.teal, fontFace: fonts.title
});

slide6.addText("Anyone connects with a vetted AI expert instantly.", {
  x: 5.4, y: paradigmStart + 0.45, w: paradigmBoxW - 0.4, h: 0.4,
  fontSize: 11, color: colors.white, fontFace: fonts.body
});

slide6.addText("Personalized, scalable, accessible, results-driven", {
  x: 5.4, y: paradigmStart + 0.9, w: paradigmBoxW - 0.4, h: 0.6,
  fontSize: 10, italic: true, color: colors.teal, fontFace: fonts.body
});

slide6.addText("EzoraAI sits at the center of this transition — for businesses and everyday people alike.", {
  x: 0.5, y: 5.35, w: 9, h: 0.2,
  fontSize: 12, italic: true, color: colors.teal, fontFace: fonts.body, align: "center"
});

// Slide 7: Why Now
let slide7 = pres.addSlide();
slide7.background = { color: colors.navy };
slide7.addText("Why Now", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 44, bold: true, color: colors.white, fontFace: fonts.title
});

const whyNow = [
  {
    title: "AI Capabilities Exploding",
    desc: "Vibe coding, AI agents, and low-code tools make building 10x faster. 93% of builders use LLMs; 51% have shipped production AI."
  },
  {
    title: "SaaS-to-Custom Migration",
    desc: "35% of companies have already replaced a SaaS tool. 78% plan more in 2026. Companies need expert help to make the switch."
  },
  {
    title: "AI Literacy Is Urgent",
    desc: "People who don't learn AI will be left behind. But no platform offers personalized, 1-on-1 AI education from real experts."
  },
  {
    title: "Experts Need a Platform",
    desc: "AI builders have powerful workflows but no unified place to showcase, teach, and monetize. EzoraAI is that platform."
  }
];

const whyNowStart = 1.2;
const whyNowItemH = 0.95;
const whyNowGapY = 0.15;

whyNow.forEach((item, idx) => {
  const y = whyNowStart + idx * (whyNowItemH + whyNowGapY);

  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y, w: 0.04, h: whyNowItemH,
    fill: { color: colors.teal }
  });

  slide7.addText(item.title, {
    x: 0.7, y, w: 8.8, h: 0.3,
    fontSize: 12, bold: true, color: colors.teal, fontFace: fonts.title
  });

  slide7.addText(item.desc, {
    x: 0.7, y: y + 0.35, w: 8.8, h: 0.55,
    fontSize: 11, color: colors.white, fontFace: fonts.body
  });
});

// Slide 8: REVENUE MODEL (UPDATED)
let slide8 = pres.addSlide();
slide8.background = { color: colors.navy };
slide8.addText("Revenue Model", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 44, bold: true, color: colors.white, fontFace: fonts.title
});
slide8.addText("Three revenue layers, monetizing from day one.", {
  x: 0.5, y: 1.0, w: 9, h: 0.4,
  fontSize: 14, color: colors.gray, fontFace: fonts.body
});

const revenueStart = 1.6;
const revenueItemH = 1.3;
const revenueGapY = 0.2;

// Layer 1: Take Rate (PRIMARY)
slide8.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: revenueStart, w: 9, h: revenueItemH,
  fill: { color: colors.darkSurface }
});

slide8.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: revenueStart, w: 0.08, h: revenueItemH,
  fill: { color: colors.teal }
});

slide8.addText("Layer 1: Platform Take Rate (PRIMARY)", {
  x: 0.7, y: revenueStart + 0.1, w: 8.5, h: 0.25,
  fontSize: 12, bold: true, color: colors.teal, fontFace: fonts.title
});

const layer1Items = [
  "15-20% of every session booked through the platform",
  "Experts set rates: $40-100/session typical",
  "Average transaction: $75 → $11-15 platform revenue",
  "We monetize every transaction from day one"
];

const l1Bullets = layer1Items.map((item, i) => ({
  text: item,
  options: { bullet: true, breakLine: i < layer1Items.length - 1 }
}));

slide8.addText(l1Bullets, {
  x: 0.7, y: revenueStart + 0.4, w: 8.5, h: 0.85,
  fontSize: 10, color: colors.white, fontFace: fonts.body
});

// Layer 2: Premium Memberships
slide8.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: revenueStart + revenueItemH + revenueGapY, w: 9, h: revenueItemH,
  fill: { color: colors.darkSurface }
});

slide8.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: revenueStart + revenueItemH + revenueGapY, w: 0.08, h: revenueItemH,
  fill: { color: colors.purple }
});

slide8.addText("Layer 2: Premium Memberships (RECURRING FLOOR)", {
  x: 0.7, y: revenueStart + revenueItemH + revenueGapY + 0.1, w: 8.5, h: 0.25,
  fontSize: 12, bold: true, color: colors.purple, fontFace: fonts.title
});

const layer2Items = [
  "$24.99/mo for power users after 2-3 sessions",
  "Benefits: discounted rates, priority booking, exclusive content",
  "Target: 20-30% of active users convert within 60 days"
];

const l2Bullets = layer2Items.map((item, i) => ({
  text: item,
  options: { bullet: true, breakLine: i < layer2Items.length - 1 }
}));

slide8.addText(l2Bullets, {
  x: 0.7, y: revenueStart + revenueItemH + revenueGapY + 0.4, w: 8.5, h: 0.8,
  fontSize: 10, color: colors.white, fontFace: fonts.body
});

// Layer 3: Premium Expert Features
const layer3Y = revenueStart + 2 * (revenueItemH + revenueGapY);
slide8.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: layer3Y, w: 9, h: revenueItemH,
  fill: { color: colors.darkSurface }
});

slide8.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: layer3Y, w: 0.08, h: revenueItemH,
  fill: { color: colors.gold }
});

slide8.addText("Layer 3: Premium Expert Features (FUTURE)", {
  x: 0.7, y: layer3Y + 0.1, w: 8.5, h: 0.25,
  fontSize: 12, bold: true, color: colors.gold, fontFace: fonts.title
});

const layer3Items = [
  "$29.99-49.99/mo (Phase 2)",
  "Featured placement, analytics, promoted profiles",
  "Introduced when volume justifies visibility premium"
];

const l3Bullets = layer3Items.map((item, i) => ({
  text: item,
  options: { bullet: true, breakLine: i < layer3Items.length - 1 }
}));

slide8.addText(l3Bullets, {
  x: 0.7, y: layer3Y + 0.4, w: 8.5, h: 0.8,
  fontSize: 10, color: colors.white, fontFace: fonts.body
});

// Key message
slide8.addText("Free to join. Pay per session. Subscribe when you love it.", {
  x: 0.5, y: 5.3, w: 9, h: 0.25,
  fontSize: 13, bold: true, italic: true, color: colors.teal, fontFace: fonts.body, align: "center"
});

// Slide 9: Go-to-Market Strategy
let slide9 = pres.addSlide();
slide9.background = { color: colors.navy };
slide9.addText("Go-to-Market Strategy", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 44, bold: true, color: colors.white, fontFace: fonts.title
});

const gtmItems = [
  {
    num: "01",
    title: "Seed Supply",
    desc: "Recruit top AI builders and educators in high-value niches. Offer favorable early terms. Target 100+ experts who can serve both businesses and individuals."
  },
  {
    num: "02",
    title: "Content Engine",
    desc: "Viral AI demos: \"Watch this AI do X.\" LinkedIn for B2B. TikTok/IG for B2C. Experts become your distribution. Every demo links to the platform."
  },
  {
    num: "03",
    title: "Demand Flywheel",
    desc: "Experts bring audiences. Individuals become repeat learners. Companies become recurring clients. Both sides drive network effects and organic growth."
  }
];

const gtmStartY = 1.2;
const gtmItemW = 2.9;
const gtmGapX = 0.35;

gtmItems.forEach((item, idx) => {
  const x = 0.5 + idx * (gtmItemW + gtmGapX);

  slide9.addShape(pres.shapes.RECTANGLE, {
    x, y: gtmStartY, w: gtmItemW, h: 3.9,
    fill: { color: colors.darkSurface }
  });

  slide9.addText(item.num, {
    x: x + 0.15, y: gtmStartY + 0.15, w: gtmItemW - 0.3, h: 0.35,
    fontSize: 24, bold: true, color: colors.teal, fontFace: fonts.title
  });

  slide9.addText(item.title, {
    x: x + 0.15, y: gtmStartY + 0.55, w: gtmItemW - 0.3, h: 0.3,
    fontSize: 12, bold: true, color: colors.white, fontFace: fonts.title
  });

  slide9.addText(item.desc, {
    x: x + 0.15, y: gtmStartY + 0.9, w: gtmItemW - 0.3, h: 2.85,
    fontSize: 10, color: colors.gray, fontFace: fonts.body
  });
});

// Slide 10: Competitive Positioning
let slide10 = pres.addSlide();
slide10.background = { color: colors.navy };
slide10.addText("Competitive Positioning", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 44, bold: true, color: colors.white, fontFace: fonts.title
});

const tableData = [
  ["Platform", "Identity", "Market", "Execution", "B2C", "Verified POW"],
  ["LinkedIn", "✓", "✗", "✗", "✗", "✗"],
  ["Fiverr / Upwork", "~", "✓", "✗", "✗", "✗"],
  ["OpenAI / Claude", "✗", "✗", "✓", "✗", "✗"],
  ["Toptal", "~", "✓", "✗", "✗", "✗"],
  ["Udemy / Coursera", "✗", "✗", "✗", "~", "✗"],
  ["EzoraAI", "✓", "✓", "✓", "✓", "✓"]
];

const tableStart = 1.1;
slide10.addTable(tableData, {
  x: 0.5, y: tableStart, w: 9, h: 2.8,
  border: { pt: 1, color: colors.gray },
  fill: { color: colors.darkSurface },
  rowH: [0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35],
  align: "center",
  valign: "middle",
  fontSize: 10,
  fontFace: fonts.body,
  color: colors.white,
  colW: [1.4, 1.2, 1.2, 1.2, 1.2, 1.2]
});

// Highlight EzoraAI row
const tableConfig = {
  x: 0.5, y: tableStart + 2.45, w: 9, h: 0.35,
  border: { pt: 1, color: colors.teal },
  fill: { color: colors.teal }
};

slide10.addText("EzoraAI = Identity + Marketplace + Execution + Coaching + Verified Proof-of-Work.", {
  x: 0.5, y: 4.2, w: 9, h: 0.4,
  fontSize: 12, bold: true, color: colors.teal, fontFace: fonts.body, align: "center"
});

slide10.addText("No competitor serves both businesses AND everyday people with vetted, personalized AI expertise.", {
  x: 0.5, y: 4.65, w: 9, h: 0.4,
  fontSize: 12, italic: true, color: colors.gray, fontFace: fonts.body, align: "center"
});

// Slide 11: FINANCIAL PROJECTIONS (UPDATED)
let slide11 = pres.addSlide();
slide11.background = { color: colors.navy };
slide11.addText("Financial Projections", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 44, bold: true, color: colors.white, fontFace: fonts.title
});

const projections = [
  {
    year: "Year 1",
    sessions: "500-1,000/mo",
    revenue: "$75K-150K",
    desc: "MVP, expert seeding, initial B2B & B2C traction"
  },
  {
    year: "Year 2",
    sessions: "2,000-5,000/mo",
    revenue: "$500K-1.5M",
    desc: "B2C viral growth, enterprise pilots, marketplace flywheel"
  },
  {
    year: "Year 3",
    sessions: "10,000-25,000/mo",
    revenue: "$3M-8M",
    desc: "Network effects, international, execution layer, B2C at scale"
  }
];

const projStartY = 1.2;
const projItemW = 2.9;
const projGapX = 0.35;

projections.forEach((proj, idx) => {
  const x = 0.5 + idx * (projItemW + projGapX);

  slide11.addShape(pres.shapes.RECTANGLE, {
    x, y: projStartY, w: projItemW, h: 3.9,
    fill: { color: colors.darkSurface }
  });

  slide11.addText(proj.year, {
    x: x + 0.15, y: projStartY + 0.15, w: projItemW - 0.3, h: 0.3,
    fontSize: 13, bold: true, color: colors.teal, fontFace: fonts.title
  });

  slide11.addText(proj.sessions, {
    x: x + 0.15, y: projStartY + 0.5, w: projItemW - 0.3, h: 0.4,
    fontSize: 11, color: colors.white, fontFace: fonts.body
  });

  slide11.addText(proj.revenue, {
    x: x + 0.15, y: projStartY + 0.95, w: projItemW - 0.3, h: 0.4,
    fontSize: 16, bold: true, color: colors.gold, fontFace: fonts.title
  });

  slide11.addText(proj.desc, {
    x: x + 0.15, y: projStartY + 1.4, w: projItemW - 0.3, h: 2.4,
    fontSize: 9, color: colors.gray, fontFace: fonts.body
  });
});

// Key metrics
slide11.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 5.2, w: 9, h: 0.35,
  fill: { color: colors.darkSurface }
});

const metricsText = [
  { text: "Blended ARPU: $20-30/active user/month  |  ", options: { breakLine: false } },
  { text: "Premium conversion: 20-30%  |  ", options: { breakLine: false } },
  { text: "Session repeat rate: 40%+", options: { breakLine: false } }
];

slide11.addText(metricsText, {
  x: 0.65, y: 5.27, w: 8.7, h: 0.2,
  fontSize: 9, color: colors.teal, fontFace: fonts.body, align: "center", valign: "middle"
});

// Slide 12: The Team
let slide12 = pres.addSlide();
slide12.background = { color: colors.navy };
slide12.addText("The Team", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 44, bold: true, color: colors.white, fontFace: fonts.title
});
slide12.addText("Complementary founders with a shared mission.", {
  x: 0.5, y: 1.0, w: 9, h: 0.4,
  fontSize: 14, color: colors.gray, fontFace: fonts.body
});

const teamMembers = [
  {
    role: "CEO / Sales & Growth",
    experience: [
      "Built & scaled 5-year tech business (outsourced dev)",
      "PE/VC fundraising track record",
      "Elite sales, speaking & team leadership"
    ]
  },
  {
    role: "COO / Finance & Ops",
    experience: [
      "Expert at uniting diverse teams around a mission",
      "FinOps operator — cloud cost infrastructure",
      "Deep SaaS economics & unit economics modeling",
      "Connects technical infrastructure with commercial strategy"
    ]
  }
];

teamMembers.forEach((member, idx) => {
  const x = idx === 0 ? 0.5 : 5.2;
  const cardW = 4.3;

  slide12.addShape(pres.shapes.RECTANGLE, {
    x, y: 1.6, w: cardW, h: 3.8,
    fill: { color: colors.darkSurface }
  });

  const accentColor = idx === 0 ? colors.teal : colors.purple;
  slide12.addShape(pres.shapes.RECTANGLE, {
    x, y: 1.6, w: 0.08, h: 3.8,
    fill: { color: accentColor }
  });

  slide12.addText(member.role, {
    x: x + 0.15, y: 1.75, w: cardW - 0.3, h: 0.35,
    fontSize: 12, bold: true, color: accentColor, fontFace: fonts.title
  });

  const bulletItems = member.experience.map((item, i) => ({
    text: item,
    options: { bullet: true, breakLine: i < member.experience.length - 1 }
  }));

  slide12.addText(bulletItems, {
    x: x + 0.15, y: 2.15, w: cardW - 0.3, h: 3.2,
    fontSize: 10, color: colors.white, fontFace: fonts.body
  });
});

// Slide 13: The Ask
let slide13 = pres.addSlide();
slide13.background = { color: colors.navy };
slide13.addText("The Ask", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 44, bold: true, color: colors.white, fontFace: fonts.title
});

slide13.addText("Pre-Seed Round", {
  x: 0.5, y: 1.1, w: 9, h: 0.3,
  fontSize: 16, bold: true, color: colors.white, fontFace: fonts.body
});

slide13.addText("$[X] Raise  |  SAFE / Convertible Note  |  [Valuation Cap TBD]", {
  x: 0.5, y: 1.45, w: 9, h: 0.35,
  fontSize: 13, bold: true, color: colors.teal, fontFace: fonts.title
});

slide13.addText("Use of Funds", {
  x: 0.5, y: 2.0, w: 9, h: 0.3,
  fontSize: 14, bold: true, color: colors.white, fontFace: fonts.body
});

const fundAllocation = [
  { pct: "40%", title: "Product Development", desc: "Platform build, AI integrations, coaching tools" },
  { pct: "25%", title: "Creator Acquisition", desc: "Expert & educator recruitment, onboarding" },
  { pct: "25%", title: "Growth & Marketing", desc: "B2B outreach + B2C content (TikTok, IG, LinkedIn)" },
  { pct: "10%", title: "Operations", desc: "Legal, compliance, infrastructure" }
];

const fundStartY = 2.45;
const fundItemH = 0.7;
const fundGapY = 0.1;

fundAllocation.forEach((fund, idx) => {
  const y = fundStartY + idx * (fundItemH + fundGapY);

  slide13.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y, w: 9, h: fundItemH,
    fill: { color: colors.darkSurface }
  });

  slide13.addText(fund.pct, {
    x: 0.65, y: y + 0.08, w: 0.6, h: 0.2,
    fontSize: 16, bold: true, color: colors.teal, fontFace: fonts.title
  });

  slide13.addText(fund.title, {
    x: 1.35, y: y + 0.05, w: 7.65, h: 0.25,
    fontSize: 11, bold: true, color: colors.white, fontFace: fonts.body
  });

  slide13.addText(fund.desc, {
    x: 1.35, y: y + 0.33, w: 7.65, h: 0.32,
    fontSize: 10, color: colors.gray, fontFace: fonts.body
  });
});

// Slide 14: The Workforce Shift
let slide14 = pres.addSlide();
slide14.background = { color: colors.navy };
slide14.addText("The Workforce Shift", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 44, bold: true, color: colors.white, fontFace: fonts.title
});
slide14.addText("AI will displace millions of white-collar jobs. EzoraAI is the infrastructure for what comes next.", {
  x: 0.5, y: 1.0, w: 9, h: 0.45,
  fontSize: 14, color: colors.gray, fontFace: fonts.body
});

const workforceStart = 1.6;
const workforceBoxW = 4.3;
const workforceBoxH = 3.5;

// The Displacement
slide14.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: workforceStart, w: workforceBoxW, h: workforceBoxH,
  fill: { color: colors.darkSurface }
});

slide14.addText("The Displacement", {
  x: 0.65, y: workforceStart + 0.15, w: workforceBoxW - 0.3, h: 0.25,
  fontSize: 12, bold: true, color: colors.teal, fontFace: fonts.title
});

const displacementItems = [
  "300M+ jobs exposed to AI automation globally",
  "Law, accounting, marketing, finance, engineering — all restructuring now",
  "Junior white-collar roles hit hardest and fastest",
  "Companies cutting headcount while increasing AI spend",
  "Workers who don't reskill face permanent displacement"
];

const dispBullets = displacementItems.map((item, i) => ({
  text: item,
  options: { bullet: true, breakLine: i < displacementItems.length - 1 }
}));

slide14.addText(dispBullets, {
  x: 0.65, y: workforceStart + 0.45, w: workforceBoxW - 0.3, h: 2.95,
  fontSize: 10, color: colors.white, fontFace: fonts.body
});

// EzoraAI is the Answer
slide14.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: workforceStart, w: workforceBoxW, h: workforceBoxH,
  fill: { color: colors.darkSurface }
});

slide14.addText("EzoraAI is the Answer", {
  x: 5.35, y: workforceStart + 0.15, w: workforceBoxW - 0.3, h: 0.25,
  fontSize: 12, bold: true, color: colors.teal, fontFace: fonts.title
});

const answerItems = [
  "Displaced professionals find vetted AI experts who reskill them 1-on-1",
  "AI experts monetize exploding demand for coaching and solutions",
  "Businesses source AI talent to replace costly SaaS and manual processes",
  "Blockchain POW creates verified credentials for the new economy",
  "Not a nice-to-have — survival infrastructure for the workforce transition"
];

const ansBullets = answerItems.map((item, i) => ({
  text: item,
  options: { bullet: true, breakLine: i < answerItems.length - 1 }
}));

slide14.addText(ansBullets, {
  x: 5.35, y: workforceStart + 0.45, w: workforceBoxW - 0.3, h: 2.95,
  fontSize: 10, color: colors.white, fontFace: fonts.body
});

slide14.addText("Adapt or be left behind. EzoraAI ensures no one gets left behind.", {
  x: 0.5, y: 5.25, w: 9, h: 0.25,
  fontSize: 13, italic: true, bold: true, color: colors.teal, fontFace: fonts.body, align: "center"
});

// Slide 15: EzoraAI vs Toptal
let slide15 = pres.addSlide();
slide15.background = { color: colors.navy };
slide15.addText("EzoraAI vs. Toptal", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 44, bold: true, color: colors.white, fontFace: fonts.title
});
slide15.addText("Same trust promise. Fundamentally different model.", {
  x: 0.5, y: 1.0, w: 9, h: 0.3,
  fontSize: 14, color: colors.gray, fontFace: fonts.body
});

const comparisonData = [
  ["Aspect", "Toptal", "EzoraAI"],
  ["Audience", "Enterprise only", "B2B + B2C (everyone)"],
  ["Pricing transparency", "Opaque (40–60% markup)", "Published (15–25%)"],
  ["User cost to start", "$500 deposit + $79/mo", "$8.99/mo (no deposit)"],
  ["Expert cost", "Free (loses 40–60% markup)", "$17.99–$49.99/mo"],
  ["Hourly rates", "$60–$200+/hr", "$50–$500 per session"],
  ["Credential verification", "One-time screening", "Blockchain POW (continuous)"],
  ["AI coaching (B2C)", "Not offered", "Core feature"],
  ["Focus", "Generalist", "AI-native only"]
];

slide15.addTable(comparisonData, {
  x: 0.5, y: 1.45, w: 9, h: 3.6,
  border: { pt: 1, color: colors.gray },
  fill: { color: colors.darkSurface },
  rowH: [0.35, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
  align: "left",
  valign: "middle",
  fontSize: 9,
  fontFace: fonts.body,
  color: colors.white,
  colW: [2.5, 3.25, 3.25]
});

slide15.addText("Toptal proved that vetting creates a premium brand. EzoraAI builds the next evolution — continuous verification, accessible pricing, and AI expertise for everyone.", {
  x: 0.5, y: 5.15, w: 9, h: 0.4,
  fontSize: 11, italic: true, color: colors.gray, fontFace: fonts.body, align: "center"
});

// Slide 16: Closing Slide
let slide16 = pres.addSlide();
slide16.background = { color: colors.navy };
slide16.addText("EzoraAI", {
  x: 0.5, y: 1.2, w: 9, h: 0.5,
  fontSize: 48, bold: true, color: colors.white, fontFace: fonts.title, align: "center"
});
slide16.addText("Critical infrastructure for the largest workforce transition in modern history.", {
  x: 0.5, y: 1.8, w: 9, h: 0.4,
  fontSize: 14, color: colors.teal, fontFace: fonts.body, align: "center"
});
slide16.addText("Where displaced professionals reskill with real AI experts.\nWhere businesses source AI solutions instantly.\nWhere every expert's work is blockchain-verified and permanent.", {
  x: 0.5, y: 2.35, w: 9, h: 1.2,
  fontSize: 12, color: colors.gray, fontFace: fonts.body, align: "center"
});
slide16.addText("Let's Talk  →  [your-email@email.com]", {
  x: 0.5, y: 4.8, w: 9, h: 0.4,
  fontSize: 14, bold: true, color: colors.teal, fontFace: fonts.body, align: "center"
});

pres.writeFile({ fileName: "EzoraAI_Pitch_Deck.pptx" });
console.log("Presentation created: EzoraAI_Pitch_Deck.pptx");
