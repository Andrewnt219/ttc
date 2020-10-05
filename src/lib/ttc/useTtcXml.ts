import { ErrorResponse } from "api";
import Axios, { AxiosError } from "axios";
import { useCallback } from "react";
import { RouteListXml, RouteConfigXml } from "ttc";

export const useTtcXml = () => {
  const getRouteListXml = useCallback(async () => {
    try {
      const { data } = await Axios.get<RouteListXml>("/api/routeList");

      return { data, errorMessage: undefined };
    } catch (error) {
      const errorMessage = (error as AxiosError<ErrorResponse>).response?.data
        .message;
      return { data: null, errorMessage };
    }
  }, []);

  const getRouteConfigXml = useCallback(async (routeTag: string) => {
    try {
      const { data } = await Axios.get<RouteConfigXml>(
        `/api/routeConfig?r=${routeTag}`
      );

      return { data, errorMessage: undefined };
    } catch (error) {
      const errorMessage = (error as AxiosError<ErrorResponse>).response?.data
        .message;
      return { data: null, errorMessage };
    }
  }, []);

  return { getRouteConfigXml, getRouteListXml };
};
