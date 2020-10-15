import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import {
  PredictionsForMultiStops,
  PredictionsForMultiStopsParameters,
} from "ttc";
import { ErrorResponse } from "api";
import { xml2jsParser } from "@src/utils/helpers/api.helper";
import { NEXT_BUS_API, NEXT_BUS_URL } from "@src/assets/constants/api.constant";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | PredictionsForMultiStops>
): Promise<void> => {
  if (req.method === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
      const {
        stops,
      } = (req.query as unknown) as PredictionsForMultiStopsParameters;

      const fetchUrl =
        NEXT_BUS_URL +
        NEXT_BUS_API +
        "?command=predictionsForMultiStops&a=ttc&stops=" +
        stops.join("&stops=");

      const { data } = await Axios.get<string>(fetchUrl);

      const parsedData = xml2jsParser(data) as PredictionsForMultiStops;

      return res.status(200).json(parsedData);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Cannot get predictions for Multi Stops!" });
    }
  }
};

function test(stopsQuery: string): string[] {
  stopsQuery.split(",");
}
