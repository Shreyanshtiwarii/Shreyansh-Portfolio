import knowledgeBase from '../content/assistantKnowledgeBase.json';

// ─────────────────────────────────────────────────────────────────────────────
// AI Assistant Engine
// ─────────────────────────────────────────────────────────────────────────────
// This file is intentionally the ONLY place that decides how a reply is
// generated. Right now `getAssistantReply()` matches against the local JSON
// knowledge base. To plug in a real model later (Gemini / OpenAI / Claude),
// you only need to:
//
//   1. Set MODE = 'api' below (or drive it from an env var).
//   2. Fill in `fetchFromApi()` with your provider's request/response shape.
//   3. Everything else (the widget UI, chips, typing animation, history)
//      stays exactly the same, because it only ever calls getAssistantReply().
// ─────────────────────────────────────────────────────────────────────────────

// 'local' -> answers purely from assistantKnowledgeBase.json (default, no network calls)
// 'api'   -> sends the question to an external AI endpoint (see fetchFromApi below)
const MODE = 'local';

/**
 * Normalizes text for matching: lowercase, strip punctuation, collapse spaces.
 */
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Scores a topic against the user's message by counting how many words of
 * each intent phrase appear in the message. Simple, dependency-free, and
 * good enough for a fixed, small knowledge base.
 */
function scoreTopic(topic, normalizedMessage) {
  let best = 0;
  for (const intent of topic.intents) {
    const intentWords = normalize(intent).split(' ');
    const matchedWords = intentWords.filter((w) => w.length > 2 && normalizedMessage.includes(w));
    const score = matchedWords.length / intentWords.length;

    // Exact phrase match gets a strong boost
    const exactBoost = normalizedMessage.includes(normalize(intent)) ? 1 : 0;

    best = Math.max(best, score + exactBoost);
  }
  return best;
}

/**
 * Matches a free-text question against the local knowledge base and returns
 * the best-fitting topic, or null if nothing scores highly enough.
 */
function matchLocalTopic(message) {
  const normalizedMessage = normalize(message);
  if (!normalizedMessage) return null;

  let bestTopic = null;
  let bestScore = 0;

  for (const topic of knowledgeBase.topics) {
    const score = scoreTopic(topic, normalizedMessage);
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  // Require at least a partial match so unrelated questions fall back
  // gracefully instead of guessing.
  return bestScore >= 0.4 ? bestTopic : null;
}

/**
 * Maps a suggestion chip label (e.g. "About Me") to the matching topic id,
 * so clicking a chip is equivalent to asking the matching question.
 */
const CHIP_TO_TOPIC_ID = {
  'About Me': 'about',
  Projects: 'projects',
  Skills: 'skills',
  Resume: 'resume',
  Contact: 'contact',
  Experience: 'experience',
  Technologies: 'technologies',
};

function getReplyFromLocalKnowledgeBase(message) {
  const directTopicId = CHIP_TO_TOPIC_ID[message.trim()];
  const topic = directTopicId
    ? knowledgeBase.topics.find((t) => t.id === directTopicId)
    : matchLocalTopic(message);

  if (topic) {
    return { text: topic.response, chips: topic.chips };
  }

  return { text: knowledgeBase.fallback.response, chips: knowledgeBase.fallback.chips };
}

/**
 * Placeholder for a real AI API call (Gemini, OpenAI, etc).
 *
 * Example shape for later:
 *
 *   async function fetchFromApi(message, history) {
 *     const res = await fetch('/api/assistant', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify({ message, history, knowledgeBase }),
 *     });
 *     const data = await res.json();
 *     return { text: data.reply, chips: data.suggestedChips ?? knowledgeBase.suggestionChips };
 *   }
 *
 * Keeping the same return shape ({ text, chips }) means the UI layer never
 * has to change when you switch MODE from 'local' to 'api'.
 */
async function fetchFromApi(message, _history) {
  throw new Error(
    'API mode is not configured yet. Set MODE to "local" or implement fetchFromApi() in assistantEngine.js.'
  );
}

/**
 * Public entry point used by the AIAssistant widget.
 * Returns a Promise<{ text: string, chips: string[] }> regardless of MODE.
 */
export async function getAssistantReply(message, history = []) {
  if (MODE === 'api') {
    return fetchFromApi(message, history);
  }
  return getReplyFromLocalKnowledgeBase(message);
}

export const defaultSuggestionChips = knowledgeBase.suggestionChips;
export const assistantProfile = knowledgeBase.profile;
