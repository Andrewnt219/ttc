import { useRouter } from "next/router";

export type UseRouteMatchProps = {
  href: string;
  exact?: boolean;
};

/**
 * @param href the href of the link
 * @param exact on = matches exactly / off = matches subpath also
 */
export const useRouteMatch = ({ href, exact }: UseRouteMatchProps): boolean => {
  const { pathname } = useRouter();
  let isActive = false;

  if (exact) {
    isActive = pathname === href;
  } else {
    isActive = pathname.startsWith(href);
  }

  return isActive;
};
