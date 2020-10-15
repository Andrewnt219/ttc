import {
  NEXT_BUS_API,
  NEXT_BUS_URL,
  QUERY_AGENCY_TAG,
} from "@src/assets/constants/api.constant";
import { Commands } from "ttc";
import urlcat from "urlcat";
import { Options, xml2js } from "xml-js";

const XML2JS_CONFIG: Options.XML2JS = {
  compact: true,
};

export const xml2jsParser = (xml: string) => xml2js(xml, XML2JS_CONFIG);

/* -------------------------------------------------------------------------- */

type NextBusQueryObject = {
  command: Commands;
  a?: never;
  [queryName: string]: any;
};

export const createNextBusApi = (queryObject: NextBusQueryObject): string => {
  return urlcat(NEXT_BUS_URL, NEXT_BUS_API, {
    ...queryObject,
    a: QUERY_AGENCY_TAG,
  });
};
