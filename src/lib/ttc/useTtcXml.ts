import Axios, { AxiosError } from "axios";
import { useCallback } from "react";
import { RouteListXml, RouteConfigXml } from "ttc";
import { xml2js, Options } from "xml-js";

const XML2JS_CONFIG: Options.XML2JS = {
  compact: true,
};
const parser = (xml: string) => xml2js(xml, XML2JS_CONFIG);

export const useTtcXml = () => {
  const getRouteListXml = useCallback(async () => {
    try {
      const { data } = await Axios.get<string>(
        "http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc"
      );

      return parser(data) as RouteListXml;
    } catch (error) {
      console.error((error as AxiosError).message);
    }
  }, []);

  const getRouteConfigXml = useCallback(async (routeTag: string) => {
    try {
      const { data } = await Axios.get<string>(
        `http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=${routeTag}`
      );

      return parser(data) as RouteConfigXml;
    } catch (error) {
      console.error((error as AxiosError).message);
    }
  }, []);

  return { getRouteConfigXml, getRouteListXml };
};
