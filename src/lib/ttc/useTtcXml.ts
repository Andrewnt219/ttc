import Axios from "axios";
import { useCallback } from "react";
import {
  RouteListXml,
  RouteConfigXml,
  PredictionsParameters,
  PredictionsXml,
} from "ttc";
import urlcat from "urlcat";

export const useTtcXml = () => {
  const getRouteListXml = useCallback(async () => {
    return Axios.get<RouteListXml>("/api/routeList");
  }, []);

  const getRouteConfigXml = useCallback(async (routeTag: string) => {
    return Axios.get<RouteConfigXml>(`/api/routeConfig?r=${routeTag}`);
  }, []);

  const getPredictions = useCallback(
    async ({
      stopId,
      routeTag,
      r,
      useShortTitles,
    }: Omit<PredictionsParameters, "command" | "a">) => {
      const url = urlcat("", "/api/predictions", {
        stopId,
        routeTag,
        r,
        useShortTitles,
      });

      return Axios.get<PredictionsXml>(url);
    },
    []
  );

  return { getRouteConfigXml, getRouteListXml, getPredictions };
};
