import React, { ReactElement } from "react";
import Hamburger from "./components/Hamburger";
import tw, { styled } from "twin.macro";
import NavLink from "../NavLink";
import { routesData } from "@src/assets/data/routes.data";

export default function Appbar(): ReactElement {
  return (
    <Header>
      <Nav>
        <NavLink data={routesData[0]} />
      </Nav>
      <Hamburger />
    </Header>
  );
}

export const Header = styled.header``;

export const Nav = styled.nav`
  ${tw`bg-red-500`}
`;
