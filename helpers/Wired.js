import * as cheerio from "cheerio";
import axios from "axios";
import { entryPoints } from "../constants.js";

// Helper function for retrieving trending article link from home page
export const scrapeWiredTrendingLink = async (trendPosition) => {
  const response = await axios.get(entryPoints.wired);
  const html = response.data;

  const $ = cheerio.load(html);

  const $trendingArticle = $(
    `[data-section-title='trending ${trendPosition}'] a`
  )["0"];
  const $trendingHref = $trendingArticle.attribs?.href;

  return $trendingHref;
};

// Helper function for scraping article page and returning article text
export const scrapeWiredArticle = async (articleUrl) => {
  let articleText = "";
  try {
    const response = await axios.get(articleUrl);
    const html = response.data;

    const $ = cheerio.load(html);
    const $articleBodyContent = $(".article-body__content p");

    articleText = $articleBodyContent.text();

    if (articleText.length > 4000) {
      articleText = articleText.substr(0, 4000);
    }
  } catch (error) {
    console.log(error);
  }
  return articleText;
};
