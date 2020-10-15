import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { PredictionsXml, PredictionsParameters } from "ttc";
import { ErrorResponse } from "api";
import { createNextBusApi, xml2jsParser } from "@src/utils";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | PredictionsXml>
): Promise<void> => {
  if (req.method === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
      const {
        stopId,
        r,
        routeTag,
        useShortTitles,
      } = (req.query as unknown) as PredictionsParameters;

      const fetchUrl = createNextBusApi<PredictionsParameters>({
        command: "predictions",
        stopId,
        r,
        routeTag,
        useShortTitles,
        a: "ttc",
      });

      const { data } = await Axios.get<string>(fetchUrl);

      const parsedData = xml2jsParser(data) as PredictionsXml;

      return res.status(200).json(parsedData);
    } catch (error) {
      // console.error(error);
      return res.status(500).json({ message: "Cannot get predictions!" });
    }
  }
};
