import { Options, xml2js } from "xml-js";
import Axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { RouteListXml } from "ttc";
import { ErrorResponse } from "api";

const XML2JS_CONFIG: Options.XML2JS = {
  compact: true,
};
const parser = (xml: string) => xml2js(xml, XML2JS_CONFIG);

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | RouteListXml>
): Promise<void> => {
  if (req.method === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
      const { data } = await Axios.get<string>(
        "http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc"
      );

      const parsedData = parser(data) as RouteListXml;

      return res.status(200).json(parsedData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Cannot get route list!" });
    }
  }
};
