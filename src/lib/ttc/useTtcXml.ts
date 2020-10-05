import Axios from "axios";
import { useCallback } from "react";
import { RouteListXml, RouteConfigXml } from "ttc";

export const useTtcXml = () => {
  const getRouteListXml = useCallback(async () => {
    return Axios.get<RouteListXml>("/api/routeList");
  }, []);

  const getRouteConfigXml = useCallback(async (routeTag: string) => {
    return Axios.get<RouteConfigXml>(`/api/routeConfig?r=${routeTag}`);
  }, []);

  return { getRouteConfigXml, getRouteListXml };
};
