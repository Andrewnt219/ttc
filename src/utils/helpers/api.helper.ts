import {
  NEXT_BUS_API,
  NEXT_BUS_URL,
  QUERY_AGENCY_TAG,
} from "@src/assets/constants/api.constant";
import {
  Commands,
  PredictionsForMultiStopsParameters,
  PredictionsParameters,
  ScheduleParameters,
} from "ttc";
import urlcat from "urlcat";
import { Options, xml2js } from "xml-js";

const XML2JS_CONFIG: Options.XML2JS = {
  compact: true,
};

export const xml2jsParser = (xml: string) => xml2js(xml, XML2JS_CONFIG);

/* -------------------------------------------------------------------------- */

type ApiParameters =
  | PredictionsParameters
  | PredictionsForMultiStopsParameters
  | ScheduleParameters;

type NextBusQueryObject<T extends ApiParameters> = T & {
  command: Commands;
};

export const createNextBusApi = <T extends ApiParameters>(
  queryObject: NextBusQueryObject<T>
): string => {
  return urlcat(NEXT_BUS_URL, NEXT_BUS_API, {
    ...queryObject,
  });
};
