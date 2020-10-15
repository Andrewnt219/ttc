import { Options, xml2js } from "xml-js";
import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { PredictionsXml, PredictionsParameters } from "ttc";
import { ErrorResponse } from "api";
import urlcat from "urlcat";
import {
  QUERY_AGENCY_TAG,
  NEXT_BUS_URL,
  NEXT_BUS_API,
} from "@src/assets/constants/api.constant";

const XML2JS_CONFIG: Options.XML2JS = {
  compact: true,
};
const parser = (xml: string) => xml2js(xml, XML2JS_CONFIG);

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | PredictionsXml>
): Promise<void> => {
  if (req.method === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
      const COMMAND = "predictions";

      const {
        stopId,
        r,
        routeTag,
        useShortTitles,
      } = (req.query as unknown) as PredictionsParameters;

      const url = urlcat(NEXT_BUS_URL, NEXT_BUS_API, {
        command: COMMAND,
        a: QUERY_AGENCY_TAG,
        stopId,
        r,
        routeTag,
        useShortTitles,
      });

      const { data } = await Axios.get<string>(url);

      const parsedData = parser(data) as PredictionsXml;

      return res.status(200).json(parsedData);
    } catch (error) {
      // console.error(error);
      return res.status(500).json({ message: "Cannot get predictions!" });
    }
  }
};
