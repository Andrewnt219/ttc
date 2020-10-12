import { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";

const parser = new Parser();

// TODO catch error
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const feed = await parser.parseURL(
      "http://www.ttc.ca/RSS/subway_closures.rss"
    );
    return res.status(200).json(feed.items);
  }
};
