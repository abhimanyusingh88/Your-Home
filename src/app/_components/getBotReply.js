import { knowledgeBase } from "./ChatCodeBase";
import { smallBrain } from "./smallBrain";

export function getBotReply(text) {
  const lower = text.toLowerCase();
  for (const key in knowledgeBase) {
    if (lower.includes(key)) return knowledgeBase[key];
  }
  return smallBrain(text);
}
