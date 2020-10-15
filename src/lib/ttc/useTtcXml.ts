import Axios from "axios";
import { useCallback } from "react";
import {
  RouteListXml,
  RouteConfigXml,
  PredictionsParameters,
  PredictionsXml,
  PredictionsForMultiStops,
  ScheduleXml,
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

  const getPredictionsForMultiStops = useCallback(
    async (stops: [stopTag: string, routeId: string][]) => {
      const stopsQuery = stops.map((stop) => stop.join("|")).join("&stops=");

      // NOTE Do NOT use axios params
      return Axios.get<PredictionsForMultiStops>(
        `/api/predictionsForMultiStops?stops=${stopsQuery}`
      );
    },
    []
  );

  const getSchedule = useCallback(async (routeTag: string) => {
    return Axios.get<ScheduleXml>(`/api/schedule?r=${routeTag}`);
  }, []);

  return {
    getRouteConfigXml,
    getRouteListXml,
    getPredictions,
    getPredictionsForMultiStops,
    getSchedule,
  };
};
