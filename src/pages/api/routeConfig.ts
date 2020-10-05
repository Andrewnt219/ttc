import { Options, xml2js } from "xml-js";
import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { RouteConfigXml } from "ttc";
import { ErrorResponse } from "api";

const XML2JS_CONFIG: Options.XML2JS = {
  compact: true,
};
const parser = (xml: string) => xml2js(xml, XML2JS_CONFIG);

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | RouteConfigXml>
): Promise<void> => {
  if (req.method === "GET") {
    try {
      const { r } = req.query;
      const { data } = await Axios.get<string>(
        `http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=${r}`
      );

      const parsedData = parser(data) as RouteConfigXml;

      return res.status(200).json(parsedData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Error!" });
    }
  }
};
