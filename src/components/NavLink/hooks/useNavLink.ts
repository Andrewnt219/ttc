import { useRouteMatch, UseRouteMatchProps } from "./useRouteMatch";

export const useNavLink = (routeMatchProps: UseRouteMatchProps): boolean => {
  const isActive = useRouteMatch(routeMatchProps);

  return isActive;
};
