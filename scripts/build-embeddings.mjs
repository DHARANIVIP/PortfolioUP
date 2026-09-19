import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Attempt to load .env.local or .env
function loadEnv() {
  const envFiles = [".env.local", ".env"];
  for (const file of envFiles) {
    const fullPath = path.join(rootDir, file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, "");
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}

loadEnv();

const KB_DIR = path.join(rootDir, "content", "kb");
const OUTPUT_FILE = path.join(rootDir, "content", "embeddings.json");

const METADATA_MAP = {
  "resume.md": {
    source: "Resume: Background",
    url: "/#about",
  },
  "mastermind.md": {
    source: "Project: Mastermind",
    url: "/project/mastermind",
  },
  "sentinel-ai.md": {
    source: "Project: Sentinel AI",
    url: "/project/sentinel-ai",
  },
  "hr-innovix.md": {
    source: "Project: HR-Innovix",
    url: "/project/hr-innovix",
  },
  "krishi-sakhi.md": {
    source: "Project: Krishi Sakhi",
    url: "/project/krishi-sakhi",
  },
  "journey.md": {
    source: "Resume: Journey",
    url: "/#journey",
  },
  "skills.md": {
    source: "Resume: Skills",
    url: "/#stack",
  },
  "contact.md": {
    source: "Contact: Availability",
    url: "/#contact",
  },
};

/**
 * Split markdown text into chunks of ~300 tokens (~250 words) with small overlap (~40 words).
 */
function chunkMarkdown(filename, content) {
  const meta = METADATA_MAP[filename] || { source: "Portfolio", url: "/#about" };
  const lines = content.split("\n");
  const sections = [];
  let currentTitle = "";
  let currentBuffer = [];

  for (const line of lines) {
    if (line.startsWith("# ") || line.startsWith("## ") || line.startsWith("### ")) {
      if (currentBuffer.length > 0) {
        sections.push({
          title: currentTitle,
          text: currentBuffer.join("\n").trim(),
        });
        currentBuffer = [];
      }
      currentTitle = line.replace(/^#+\s*/, "").trim();
    } else {
      currentBuffer.push(line);
    }
  }
  if (currentBuffer.length > 0) {
    sections.push({
      title: currentTitle,
      text: currentBuffer.join("\n").trim(),
    });
  }

  const chunks = [];
  let chunkIndex = 1;

  for (const section of sections) {
    const fullText = section.title ? `## ${section.title}\n${section.text}` : section.text;
    const words = fullText.split(/\s+/).filter(Boolean);

    if (words.length <= 250) {
      if (fullText.trim().length > 20) {
        chunks.push({
          id: `${filename.replace(".md", "")}-${chunkIndex++}`,
          source: section.title ? `${meta.source} (${section.title})` : meta.source,
          url: meta.url,
          content: fullText.trim(),
        });
      }
    } else {
      // Chunk with sliding window: 220 words with 40 words overlap
      const windowSize = 220;
      const step = 180;
      for (let i = 0; i < words.length; i += step) {
        const slice = words.slice(i, i + windowSize);
        if (slice.length < 30 && chunks.length > 0) break;
        const chunkText = (section.title && i > 0 ? `## ${section.title} (cont.)\n` : "") + slice.join(" ");
        chunks.push({
          id: `${filename.replace(".md", "")}-${chunkIndex++}`,
          source: section.title ? `${meta.source} (${section.title})` : meta.source,
          url: meta.url,
          content: chunkText.trim(),
        });
      }
    }
  }

  return chunks;
}

/**
 * Deterministic dense semantic hash projection for fallback embedding (e.g. offline dev / CI build without key)
 * Produces a normalized 768-dimensional float vector.
 */
function generateDeterministicEmbedding(text, dimensions = 768) {
  const vector = new Array(dimensions).fill(0);
  const words = text.toLowerCase().match(/\b[a-z0-9_+#.-]+\b/g) || [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let hash = 0;
    for (let c = 0; c < word.length; c++) {
      hash = (hash << 5) - hash + word.charCodeAt(c);
      hash |= 0;
    }
    for (let d = 0; d < 8; d++) {
      const idx = Math.abs((hash + d * 31) % dimensions);
      vector[idx] += (1 / Math.sqrt(words.length || 1)) * (d % 2 === 0 ? 1 : -0.5);
    }
  }

  // L2 normalize
  const norm = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0)) || 1;
  return vector.map((v) => Number((v / norm).toFixed(6)));
}

async function main() {
  console.log("Reading knowledge base from:", KB_DIR);
  if (!fs.existsSync(KB_DIR)) {
    throw new Error(`KB directory not found: ${KB_DIR}`);
  }

  const files = fs.readdirSync(KB_DIR).filter((f) => f.endsWith(".md"));
  const allChunks = [];

  for (const file of files) {
    const filePath = path.join(KB_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const fileChunks = chunkMarkdown(file, content);
    allChunks.push(...fileChunks);
  }

  console.log(`Generated ${allChunks.length} chunks from ${files.length} knowledge base files.`);

  const apiKey = process.env.GEMINI_API_KEY;
  let useLiveGemini = false;
  let genAI = null;

  if (apiKey) {
    try {
      genAI = new GoogleGenerativeAI(apiKey);
      useLiveGemini = true;
      console.log("GEMINI_API_KEY found. Generating embeddings using gemini-embedding-001...");
    } catch (err) {
      console.warn("Error initializing Gemini API for embeddings, falling back to deterministic embedding:", err.message);
    }
  } else {
    console.log("No GEMINI_API_KEY detected. Using deterministic fallback embeddings for build time.");
  }

  const chunksWithEmbeddings = [];

  for (let i = 0; i < allChunks.length; i++) {
    const chunk = allChunks[i];
    let embedding = null;

    if (useLiveGemini && genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
        const result = await model.embedContent(chunk.content);
        embedding = result.embedding.values;
      } catch (err) {
        console.warn(`Failed to embed chunk ${chunk.id} with Gemini: ${err.message}. Using fallback.`);
        embedding = generateDeterministicEmbedding(chunk.content);
      }
    } else {
      embedding = generateDeterministicEmbedding(chunk.content);
    }

    chunksWithEmbeddings.push({
      ...chunk,
      embedding,
    });
  }

  // Ensure content directory exists
  const contentDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(chunksWithEmbeddings, null, 2), "utf-8");
  console.log(`Successfully wrote ${chunksWithEmbeddings.length} embedded chunks to ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error("Embedding build failed:", err);
  process.exit(1);
});
