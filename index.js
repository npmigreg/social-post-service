import "dotenv/config";
import {
  scrapeWiredTrendingLink,
  scrapeWiredArticle,
} from "./helpers/Wired.js";
import { sendPrompt } from "./helpers/ChatGPT.js";

const wiredScrapeHandler = async () => {
  const trendingLink = await scrapeWiredTrendingLink(1);
  const articleText = await scrapeWiredArticle(trendingLink);
  const { message: promptResponse } = await sendPrompt(articleText);

  return promptResponse.content;
};

const wiredOutput = await wiredScrapeHandler();
console.log(wiredOutput);
