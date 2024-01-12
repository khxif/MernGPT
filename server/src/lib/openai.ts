import OpenAI from "openai";

const API_KEY = String(process.env.OPENAI_API_KEY);

export const openai = new OpenAI({
  apiKey: "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",
});
