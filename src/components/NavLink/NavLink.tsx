import React, { ReactElement } from "react";
import NextLink from "next/link";
import { RouteProps } from "@src/assets/data/routes.data";
import { useNavLink } from "./hooks";
import tw, { styled } from "twin.macro";

type Props = {
  data: RouteProps;
};

function NavLink({ data }: Props): ReactElement {
  /* ANCHOR active nav link */
  const { text, exact, ...linkProps } = data;
  const href = linkProps.href.toString();

  const isActive = useNavLink({ href, exact });

  return (
    <NextLink {...linkProps}>
      <StyledAnchor isActive={isActive}>{text}</StyledAnchor>
    </NextLink>
  );
}

type StyledAnchorProps = { isActive: boolean };
export const StyledAnchor = styled.a<StyledAnchorProps>`
  ${(p) => p.isActive && tw`font-bBold`}
`;

export default NavLink;
