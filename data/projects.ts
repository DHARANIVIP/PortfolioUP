export type ArchNode = {
  label: string;
  type: "client" | "api" | "engine" | "data" | "output";
  x: number;
  y: number;
};

export type ArchEdge = {
  from: number;
  to: number;
};

export type Feature = {
  title: string;
  desc: string;
};

export type Capability = {
  name: string;
  detail: string;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  description: string;
  briefLong: string;
  cardColor: string;
  cardColorHex: string;
  tags: string[];
  liveUrl: string | null;
  githubUrl: string;
  role: string;
  focus: string;
  archNodes: ArchNode[];
  archEdges: ArchEdge[];
  features: Feature[];
  capabilities: Capability[];
};

export const projects: Project[] = [
  {
    slug: "mastermind",
    index: "01",
    title: "MASTERMIND",
    category: "AI CAREER GUIDANCE SYSTEM",
    description:
      "An AI guidance platform that parses resumes, identifies skill gaps, and generates interactive learning roadmaps using Gemini 2.5 Flash.",
    briefLong:
      "Built an AI guidance platform using Next.js 16 and Gemini 2.5 Flash to parse resumes, identify skill gaps, and generate interactive learning roadmaps. Integrated a dual-database architecture with MongoDB Atlas and Supabase PostgreSQL to handle JWT authentication, user metrics, and course suggestions — shipped in a 2-week sprint as Technical Team Lead.",
    cardColor: "bg-sky-light",
    cardColorHex: "#DBEFFB",
    tags: ["Next.js 16", "Express.js", "Gemini 2.5 Flash", "Supabase", "MongoDB Atlas", "JWT"],
    liveUrl: "https://team-8-95a3.vercel.app",
    githubUrl: "https://github.com/DHARANIVIP",
    role: "Full-Stack Developer (Frontend + Backend)",
    focus: "Product + AI Integration",
    archNodes: [
      { label: "Client\n(Next.js 16)", type: "client", x: 60, y: 120 },
      { label: "API Layer\n(Express.js)", type: "api", x: 220, y: 120 },
      { label: "LLM Engine\n(Gemini 2.5 Flash)", type: "engine", x: 380, y: 120 },
      { label: "MongoDB Atlas\n(Auth + Metrics)", type: "data", x: 300, y: 240 },
      { label: "Supabase\n(PostgreSQL)", type: "data", x: 460, y: 240 },
      { label: "Live Output\n(Roadmap)", type: "output", x: 540, y: 120 },
    ],
    archEdges: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ],
    features: [
      { title: "Resume Parsing Pipeline", desc: "Extracts structured skill data from uploaded resumes using LLM-powered analysis." },
      { title: "Dual-Database Architecture", desc: "MongoDB for auth and metrics; Supabase PostgreSQL for relational course data." },
      { title: "Interactive Roadmap Generation", desc: "Personalized learning roadmaps generated dynamically per skill-gap profile." },
      { title: "Real-Time Skill-Gap Analysis", desc: "Compares user skills against target roles and surfaces precise learning gaps." },
    ],
    capabilities: [
      { name: "Resume Upload & Parsing", detail: "PDF/DOCX resume ingested and parsed via Gemini 2.5 Flash structured output." },
      { name: "Skill Gap Detection", detail: "Automated comparison of extracted skills against role-specific requirements." },
      { name: "Learning Roadmap Engine", detail: "LLM generates a prioritised, step-by-step learning path." },
      { name: "JWT Authentication", detail: "Stateless auth flow with access/refresh tokens stored in Supabase." },
      { name: "User Dashboard", detail: "Real-time metrics display: skills completed, gap score, course progress." },
    ],
  },
  {
    slug: "sentinel-ai",
    index: "02",
    title: "SENTINEL AI",
    category: "DEEPFAKE DETECTION SYSTEM",
    description:
      "A real-time security system using CNNs to detect deepfake videos, streaming threat probabilities to a live dashboard.",
    briefLong:
      "Engineered a real-time security system using deep learning (CNNs) to detect deepfake videos, integrating a Python inference engine with a React frontend for immediate analysis. Designed an end-to-end pipeline that captures video frames, evaluates temporal features, and streams threat probabilities directly to the dashboard — with sub-second latency on modern hardware.",
    cardColor: "bg-lime",
    cardColorHex: "#E5FF1F",
    tags: ["Python", "PyTorch", "CNNs", "React.js"],
    liveUrl: "https://deep-detection.vercel.app",
    githubUrl: "https://github.com/DHARANIVIP",
    role: "Deep Learning Engineer + Frontend Developer",
    focus: "AI/ML + Real-Time Systems",
    archNodes: [
      { label: "Client\n(React.js)", type: "client", x: 60, y: 120 },
      { label: "Video Frame\nCapture", type: "api", x: 220, y: 120 },
      { label: "CNN Inference\n(Python/PyTorch)", type: "engine", x: 380, y: 120 },
      { label: "Temporal Feature\nAnalysis", type: "data", x: 380, y: 240 },
      { label: "Live Threat\nDashboard", type: "output", x: 540, y: 120 },
    ],
    archEdges: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 2, to: 4 },
    ],
    features: [
      { title: "Frame Capture Pipeline", desc: "Frame-by-frame video capture at configurable intervals for real-time analysis." },
      { title: "CNN Temporal Evaluation", desc: "CNN model evaluates temporal features across frame sequences to detect manipulation artifacts." },
      { title: "Threat Probability Streaming", desc: "Real-time threat-probability scores streamed to the dashboard without page refresh." },
      { title: "Low-Latency Results", desc: "Sub-second inference pipeline delivering immediate deepfake detection results." },
    ],
    capabilities: [
      { name: "Video Frame Extraction", detail: "Splits uploaded or streamed video into analysable frame sequences." },
      { name: "CNN-Based Classification", detail: "PyTorch model classifies each frame as real or manipulated." },
      { name: "Temporal Feature Analysis", detail: "Cross-frame temporal inconsistency detection improves accuracy over single-frame models." },
      { name: "Real-Time Dashboard", detail: "React frontend displays live probability scores and highlights flagged frames." },
      { name: "Threat Reporting", detail: "Exportable per-video threat report with timestamped detections." },
    ],
  },
  {
    slug: "hr-innovix",
    index: "03",
    title: "HR-INNOVIX",
    category: "AI RECRUITMENT AGENT",
    description:
      "An autonomous recruitment agent that parses resumes and matches candidates to job descriptions in real time with low latency.",
    briefLong:
      "Engineered an autonomous AI recruitment agent with the Gemini API and Tailwind CSS, automating complex candidate parsing while delivering a low-latency UI for real-time workflows. Streamlined candidate evaluation by parsing structured resume data and matching profiles against job descriptions — reducing manual screening time significantly.",
    cardColor: "bg-card-pink",
    cardColorHex: "#E79AA6",
    tags: ["React.js", "Gemini API", "Node.js", "Tailwind CSS"],
    liveUrl: "https://hr-innovix-agent.vercel.app",
    githubUrl: "https://github.com/DHARANIVIP",
    role: "Full-Stack Developer",
    focus: "AI Agents + Automation",
    archNodes: [
      { label: "Client\n(React + Tailwind)", type: "client", x: 60, y: 120 },
      { label: "Node.js\nAPI", type: "api", x: 220, y: 120 },
      { label: "Gemini API\n(Parse + Match)", type: "engine", x: 380, y: 120 },
      { label: "Candidate\nRanking Output", type: "output", x: 540, y: 120 },
    ],
    archEdges: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
    ],
    features: [
      { title: "Structured Resume Parsing", desc: "Gemini API extracts skills, experience, and education into structured candidate profiles at scale." },
      { title: "Job-Description Matching", desc: "Automatic semantic matching of candidate profiles against uploaded job descriptions." },
      { title: "Low-Latency Pipeline", desc: "Optimised API calls and caching deliver evaluation results with minimal wait time." },
      { title: "Real-Time Recruiter UI", desc: "Live, searchable recruiter-facing dashboard with ranked candidate cards." },
    ],
    capabilities: [
      { name: "Resume Bulk Upload", detail: "Supports batch upload of PDF/DOCX resumes for simultaneous processing." },
      { name: "Semantic Profile Matching", detail: "Gemini compares candidate skills against job requirements with nuanced understanding." },
      { name: "Candidate Ranking", detail: "Outputs a scored, ranked shortlist with match-percentage per candidate." },
      { name: "JD Management", detail: "Recruiters can upload, manage, and switch between multiple job descriptions." },
      { name: "Export & Share", detail: "Shortlists exportable as CSV or shareable via unique link." },
    ],
  },
  {
    slug: "krishi-sakhi",
    index: "04",
    title: "KRISHI SAKHI",
    category: "AI FARMING ASSISTANT",
    description:
      "A RAG-powered agricultural assistant automating real-time crop health and weather insights for farmers, orchestrated with n8n.",
    briefLong:
      "Built an AI-powered agricultural assistant using Retrieval-Augmented Generation (RAG) and n8n workflows to automate real-time crop health and weather insights for farmers. The system retrieves domain-specific agricultural knowledge from a vector store and combines it with live weather API data to provide accurate, contextual guidance — designed to be accessible and reliable in low-bandwidth conditions.",
    cardColor: "bg-card-lavender",
    cardColorHex: "#C5BAEE",
    tags: ["n8n", "RAG", "Node.js", "VectorDB"],
    liveUrl: "https://krishi-sakhi-smoky.vercel.app",
    githubUrl: "https://github.com/DHARANIVIP",
    role: "AI/Automation Engineer",
    focus: "RAG + Workflow Automation",
    archNodes: [
      { label: "Farmer Query\n(Client)", type: "client", x: 60, y: 120 },
      { label: "n8n Workflow\nOrchestrator", type: "api", x: 220, y: 120 },
      { label: "RAG Retrieval\nLayer", type: "engine", x: 380, y: 80 },
      { label: "Node.js\nBackend", type: "api", x: 380, y: 180 },
      { label: "Crop Health +\nWeather Output", type: "output", x: 540, y: 120 },
    ],
    archEdges: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 3, to: 4 },
    ],
    features: [
      { title: "RAG Knowledge Retrieval", desc: "Retrieves accurate agri-knowledge from a vector store for context-aware responses." },
      { title: "n8n Workflow Automation", desc: "n8n orchestrates multi-step data flows — query intake, retrieval, enrichment, and delivery." },
      { title: "Real-Time Weather + Crop Insights", desc: "Integrates live weather API data with RAG output for situation-specific guidance." },
      { title: "Reliable Node.js Backend", desc: "Node.js backend handles request routing, API calls, and response aggregation." },
    ],
    capabilities: [
      { name: "Natural Language Queries", detail: "Farmers ask questions in plain language; system handles intent extraction." },
      { name: "Vector Store Retrieval", detail: "Agricultural knowledge base queried via semantic similarity search." },
      { name: "Live Weather Integration", detail: "Real-time weather data enriches every crop-health recommendation." },
      { name: "n8n Orchestration", detail: "Visual workflow automation handles the full data pipeline without custom glue code." },
      { name: "Low-Bandwidth Optimised", detail: "Lightweight responses designed for reliable delivery in rural connectivity conditions." },
    ],
  },
];

export const journeyChapters = [
  {
    year: "2022",
    chapter: "CHAPTER 01",
    title: "DISCOVER",
    description:
      "Started exploring programming fundamentals — Python, C, and the logic of problem-solving — while finishing school.",
  },
  {
    year: "2024",
    chapter: "CHAPTER 02",
    title: "FOUNDATION",
    description:
      "Began B.E. Computer Science at KSR College of Engineering. Built first web pages, learned HTML/CSS/JS, and got hooked on building things that live on the internet.",
  },
  {
    year: "2025",
    chapter: "CHAPTER 03",
    title: "BUILD",
    description:
      "Full Stack Developer Intern at Codetech IT Solutions — shipped scalable MERN applications with real REST APIs in an agile team.",
  },
  {
    year: "2025",
    chapter: "CHAPTER 04",
    title: "EXPAND",
    description:
      "Went deep on AI/ML — PyTorch, CNNs, Generative AI, RAG architectures. Built Sentinel AI, a real-time deepfake detector.",
  },
  {
    year: "2026",
    chapter: "CHAPTER 05",
    title: "LEAD",
    description:
      "Full Stack & AIML Engineer Intern + Technical Team Lead at Touchmark Descience — architected a Career Guidance Portal in a 2-week sprint, won 1st place.",
  },
  {
    year: "2026",
    chapter: "CHAPTER 06",
    title: "ENGINEER",
    description:
      "Building autonomous AI agents (HR-Innovix), RAG-powered assistants (Krishi Sakhi), and dual-database platforms (Mastermind) — engineering for real-world deployment.",
  },
];

export const stackCategories = [
  {
    index: "01",
    eyebrow: "FRONTEND",
    title: "Interfaces & Interaction",
    icon: "monitor",
    tags: ["React.js", "Next.js", "React Native", "Three.js", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "TypeScript"],
  },
  {
    index: "02",
    eyebrow: "BACKEND",
    title: "Services & Business Logic",
    icon: "server",
    tags: ["Node.js", "Express.js", "Python", "Java", "REST APIs"],
  },
  {
    index: "03",
    eyebrow: "AI / ML",
    title: "Intelligence Layer",
    icon: "brain",
    tags: ["PyTorch", "Generative AI", "RAG Architectures", "Gemini API", "Pinecone", "VectorDB", "n8n Automation"],
  },
  {
    index: "04",
    eyebrow: "DATA",
    title: "Storage & Persistence",
    icon: "database",
    tags: ["MongoDB Atlas", "PostgreSQL", "Supabase", "Firebase"],
  },
  {
    index: "05",
    eyebrow: "CLOUD & TOOLS",
    title: "Delivery & Reliability",
    icon: "cloud",
    tags: ["Git", "GitHub", "Vercel", "Render", "Netlify", "Postman", "Figma", "VS Code", "Cursor"],
  },
];
