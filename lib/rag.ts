import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface EmbeddedChunk {
  id: string;
  source: string;
  url: string;
  content: string;
  embedding: number[];
}

export interface SourceCitation {
  source: string;
  url: string;
}

export interface RetrievalResult {
  contextText: string;
  sources: SourceCitation[];
  chunks: EmbeddedChunk[];
}

let cachedChunks: EmbeddedChunk[] | null = null;

function loadChunks(): EmbeddedChunk[] {
  if (cachedChunks) return cachedChunks;
  try {
    const filePath = path.join(process.cwd(), "content", "embeddings.json");
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      cachedChunks = JSON.parse(raw) as EmbeddedChunk[];
      return cachedChunks;
    }
  } catch (err) {
    console.error("Failed to load embeddings.json:", err);
  }
  return [];
}

/**
 * Deterministic dense semantic hash projection for query fallback.
 */
function generateDeterministicEmbedding(text: string, dimensions = 768): number[] {
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

  const norm = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0)) || 1;
  return vector.map((v) => Number((v / norm).toFixed(6)));
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  if (denom === 0) return 0;
  return dotProduct / denom;
}

export async function embedQuery(query: string): Promise<number[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
      const result = await model.embedContent(query);
      if (result.embedding?.values) {
        return result.embedding.values;
      }
    } catch (err) {
      console.warn("Failed to get live Gemini embedding for query, using fallback:", err);
    }
  }
  return generateDeterministicEmbedding(query);
}

export async function retrieveContext(
  query: string,
  topK = 4,
  minSimilarity = 0.25
): Promise<RetrievalResult> {
  const chunks = loadChunks();
  if (chunks.length === 0) {
    return { contextText: "", sources: [], chunks: [] };
  }

  const queryVec = await embedQuery(query);

  const scored = chunks.map((chunk) => ({
    chunk,
    score: cosineSimilarity(queryVec, chunk.embedding),
  }));

  // Keyword relevance boost for short domain terms (e.g. "Sentinel AI", "Krishi Sakhi", "Mastermind")
  const lowerQuery = query.toLowerCase();
  for (const item of scored) {
    const lowerContent = item.chunk.content.toLowerCase();
    const terms = lowerQuery.split(/\s+/).filter((t) => t.length > 2);
    let termMatches = 0;
    for (const term of terms) {
      if (lowerContent.includes(term)) termMatches++;
    }
    if (terms.length > 0) {
      item.score += (termMatches / terms.length) * 0.15;
    }
  }

  scored.sort((a, b) => b.score - a.score);

  const filtered = scored.filter((item) => item.score >= minSimilarity);
  const selected = (filtered.length > 0 ? filtered : scored).slice(0, topK);

  const contextText = selected.map((s) => s.chunk.content).join("\n\n---\n\n");

  const sourcesMap = new Map<string, string>();
  for (const s of selected) {
    // Simplify source name, e.g. "Project: Sentinel AI (Overview)" -> "Project: Sentinel AI"
    const baseSource = s.chunk.source.split(" (")[0];
    if (!sourcesMap.has(baseSource)) {
      sourcesMap.set(baseSource, s.chunk.url);
    }
  }

  const sources: SourceCitation[] = Array.from(sourcesMap.entries()).map(([source, url]) => ({
    source,
    url,
  }));

  return {
    contextText,
    sources,
    chunks: selected.map((s) => s.chunk),
  };
}
