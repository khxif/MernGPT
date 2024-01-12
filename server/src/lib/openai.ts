import OpenAI from "openai";
import dotenv from 'dotenv'
dotenv.config()

const API_KEY = String(process.env.OPENAI_API_KEY);
export const openai = new OpenAI({
  apiKey: API_KEY!,
});
