import { Options, xml2js } from "xml-js";
import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { PredictionsXml, PredictionsParameters } from "ttc";
import { ErrorResponse } from "api";
import { createQueryString } from "@src/utils";

const XML2JS_CONFIG: Options.XML2JS = {
  compact: true,
};
const parser = (xml: string) => xml2js(xml, XML2JS_CONFIG);

// TODO fix createQueryString
export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | PredictionsXml>
): Promise<void> => {
  if (req.method === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
      const command = "predictions";
      const a = "ttc";
      const {
        stopId,
        r,
        routeTag,
        useShortTitles,
      } = (req.query as unknown) as PredictionsParameters;

      const { data } = await Axios.get<string>(
        `http://webservices.nextbus.com/service/publicXMLFeed${createQueryString(
          command,
          a,
          stopId,
          r,
          routeTag,
          "" + useShortTitles
        )}`
      );

      const parsedData = parser(data) as PredictionsXml;

      return res.status(200).json(parsedData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Cannot get predictions!" });
    }
  }
};
