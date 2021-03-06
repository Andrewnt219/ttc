import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { VehicleLocationsParameters, VehicleLocationsXml } from "ttc";
import { ErrorResponse } from "api";
import { createNextBusApi, xml2jsParser } from "@src/utils";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | VehicleLocationsXml>
): Promise<void> => {
  if (req.method === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
      const { r, t } = (req.query as unknown) as VehicleLocationsParameters;

      const fetchUrl = createNextBusApi<VehicleLocationsParameters>({
        command: "vehicleLocations",
        a: "ttc",
        r,
        t,
      });

      const { data } = await Axios.get<string>(fetchUrl);

      const parsedData = xml2jsParser(data) as VehicleLocationsXml;

      if (!parsedData.body.vehicle) {
        return res.status(200).json({
          message:
            "Getting all vehicles' locations. Please send the SAME request again after 10 seconds",
        });
      }

      return res.status(200).json(parsedData);
    } catch (error) {
      // console.error(error);
      return res.status(500).json({ message: "Cannot get schedule!" });
    }
  }
};
