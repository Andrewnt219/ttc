import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { VehicleLocationParameters, VehicleLocationXml } from "ttc";
import { ErrorResponse } from "api";
import { createNextBusApi, xml2jsParser } from "@src/utils";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | VehicleLocationXml>
): Promise<void> => {
  if (req.method === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
      const { v } = (req.query as unknown) as VehicleLocationParameters;

      const fetchUrl = createNextBusApi<VehicleLocationParameters>({
        command: "vehicleLocation",
        a: "ttc",
        v,
      });

      const { data } = await Axios.get<string>(fetchUrl);

      const parsedData = xml2jsParser(data) as VehicleLocationXml;

      return res.status(200).json(parsedData);
    } catch (error) {
      // console.error(error);
      return res.status(500).json({ message: "Cannot get schedule!" });
    }
  }
};
