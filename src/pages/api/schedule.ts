import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { ScheduleXml, ScheduleParameters } from "ttc";
import { ErrorResponse } from "api";
import { createNextBusApi, xml2jsParser } from "@src/utils";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | ScheduleXml>
): Promise<void> => {
  if (req.method === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
      const { r } = (req.query as unknown) as ScheduleParameters;

      const fetchUrl = createNextBusApi<ScheduleParameters>({
        command: "schedule",
        a: "ttc",
        r,
      });

      const { data } = await Axios.get<string>(fetchUrl);

      const parsedData = xml2jsParser(data) as ScheduleXml;

      return res.status(200).json(parsedData);
    } catch (error) {
      // console.error(error);
      return res.status(500).json({ message: "Cannot get schedule!" });
    }
  }
};
