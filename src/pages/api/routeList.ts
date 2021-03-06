import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { RouteListXml } from "ttc";
import { ErrorResponse } from "api";
import { xml2jsParser } from "@src/utils";

// TODO add RouteListParameters to type and api helper
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

      const parsedData = xml2jsParser(data) as RouteListXml;

      return res.status(200).json(parsedData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Cannot get route list!" });
    }
  }
};
