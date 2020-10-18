import Axios from "axios";
import { useCallback } from "react";

import {
  RouteListXml,
  RouteConfigXml,
  PredictionsParameters,
  PredictionsXml,
  PredictionsForMultiStops,
  ScheduleXml,
  VehicleLocationsXml,
  VehicleLocationXml,
} from "ttc";
import urlcat from "urlcat";

export const useTtcXml = () => {
  const getRouteListXml = useCallback(() => {
    return Axios.get<RouteListXml>("/api/routeList");
  }, []);

  const getRouteConfigXml = useCallback((routeTag: string) => {
    return Axios.get<RouteConfigXml>(`/api/routeConfig?r=${routeTag}`);
  }, []);

  const getPredictions = useCallback(
    ({
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
    (stops: [stopTag: string, routeId: string][]) => {
      const stopsQuery = stops.map((stop) => stop.join("|")).join("&stops=");

      // NOTE Do NOT use axios params
      return Axios.get<PredictionsForMultiStops>(
        `/api/predictionsForMultiStops?stops=${stopsQuery}`
      );
    },
    []
  );

  const getSchedule = useCallback((routeTag: string) => {
    return Axios.get<ScheduleXml>(`/api/schedule?r=${routeTag}`);
  }, []);

  const getVehicleLocations = useCallback(
    (epochTimeInMs: string, routeTag?: string) => {
      Axios.get<VehicleLocationsXml>(
        `/api/vehicleLocations?r=${routeTag}&t=${epochTimeInMs}`
      );

      return () =>
        Axios.get<VehicleLocationsXml>(
          `/api/vehicleLocations?r=${routeTag}&t=${epochTimeInMs}`
        );
    },
    []
  );

  const getVehicleLocation = useCallback((vehicleId: string) => {
    return Axios.get<VehicleLocationXml>(`/api/vehicleLocation?v=${vehicleId}`);
  }, []);

  return {
    getVehicleLocation,
    getRouteConfigXml,
    getRouteListXml,
    getPredictions,
    getPredictionsForMultiStops,
    getSchedule,
    getVehicleLocations,
  };
};
