import { createQueryString } from '@src/utils';
import Axios from "axios";
import { useCallback } from "react";
import { RouteListXml, RouteConfigXml, PredictionsParameters } from "ttc";

export const useTtcXml = () => {



  const getRouteListXml = useCallback(async () => {
    return Axios.get<RouteListXml>("/api/routeList");
  }, []);

  const getRouteConfigXml = useCallback(async (routeTag: string) => {
    return Axios.get<RouteConfigXml>(`/api/routeConfig?r=${routeTag}`);
  }, []);

  const getPredictions = useCallback(async ({stopId, routeTag,r,useShortTitles} : Omit<PredictionsParameters, "command" | "a">) => {
    return Axios.get<RouteListXml>(`/api/predictions${createQueryString(stopId, routeTag,r, ''+useShortTitles)}`);
  }, []);

  return { getRouteConfigXml, getRouteListXml, getPredictions };
};
