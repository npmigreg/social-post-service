import * as cheerio from "cheerio";
import axios from "axios";
import { entryPoints } from "./constants.js";

const wiredScrapeHandler = async () => {
  // Use axios to fetch the entry point html
  const response = await axios.get(entryPoints.wired);
  const html = response.data;

  // Use cheerio to parse the entry point html
  const $ = cheerio.load(html);

  // Fetch href for first trending article
  const $trendingArticle = $("[data-section-title='trending 1'] a")["0"];
  const $trendingHref = $trendingArticle.attribs?.href;

  // If trending article href found, use axios to fetch html on article page
  if ($trendingHref) {
    const articleText = await scrapeWiredArticle($trendingHref);
    console.log(articleText);
  }
};

const scrapeWiredArticle = async (articleUrl) => {
  const response = await axios.get(articleUrl);
  const html = response.data;

  const $ = cheerio.load(html);
  const $articleBodyContent = $(".article-body__content p");

  return $articleBodyContent.text();
};

wiredScrapeHandler();
