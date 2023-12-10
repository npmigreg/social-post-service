import OpenAI from "openai";
import { promptComponents } from "../constants.js";

const openai = new OpenAI();

export const sendPrompt = async (articleText) => {
  const fullPrompt = promptComponents.articlePrefix + articleText;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: fullPrompt }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0];
};
