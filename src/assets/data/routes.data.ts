import { LinkProps } from "next/link";

export type RouteProps = LinkProps & {
  text: string;
  exact?: boolean;
};

export const routesData: RouteProps[] = [
  {
    href: "/",
    text: "Home",
    exact: true,
  },
];
