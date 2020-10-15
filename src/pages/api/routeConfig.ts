import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { RouteConfigXml } from "ttc";
import { ErrorResponse } from "api";
import { xml2jsParser } from "@src/utils";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | RouteConfigXml>
): Promise<void> => {
  if (req.method === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
      const { r } = req.query;
      const { data } = await Axios.get<string>(
        `http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=${r}`
      );

      const parsedData = xml2jsParser(data) as RouteConfigXml;

      return res.status(200).json(parsedData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Cannot get route config!" });
    }
  }
};
