import styled from "@emotion/styled";
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../public/logo.png";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100svh;
  margin-top: 3rem;
`;

const Logo = styled.img`
  width: 8rem;
  height: 8rem;
  margin: auto;
`;

const StyledSideNav = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #312f2f;
  width: 20rem;
  height: 100svh;
  margin-right: 1rem;
`;
const LogoContainer = styled.div`
  height: 30%;
  padding: 1rem 1rem;
  background-color: #cff0d1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const H1 = styled.h1`
  margin: auto;
  color: black;
  font-family: monospace;
`;

const SideNav: React.FC = () => {
  return (
    <StyledSideNav>
      <LogoContainer>
        <Logo src={logo} />
        <H1>Songify</H1>
      </LogoContainer>
      <Nav>
        <NavLink className="nav-links" to="/">
          Home
        </NavLink>
        <NavLink className="nav-links" to="/songs">
          Songs
        </NavLink>
        <NavLink className="nav-links" to="/playlists">
          Playlists
        </NavLink>
      </Nav>
    </StyledSideNav>
  );
};

export default SideNav;
