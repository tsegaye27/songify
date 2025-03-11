import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { BiMusic, BiHeart } from "react-icons/bi";
import { BsCollectionPlay } from "react-icons/bs";
import logo from "../../public/logo.png";

const StyledNav = styled.nav`
  width: 240px;
  background-color: var(--second-background-color);
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: var(--text-color);
  text-decoration: none;
  border-radius: 6px;
  transition:
    background 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: #333;
    color: var(--text-color);
  }

  &.active {
    background-color: #222;
    color: var(--text-color);
    font-weight: bold;
  }

  svg {
    margin-right: 12px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 15rem;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--tertiary-color);
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 5rem;
  border-radius: 50%; /* Circular logo */
`;

const H1 = styled.h1`
  color: var(--text-color);
  font-size: 20px;
  text-align: center;
  margin-bottom: 1rem;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const links = [
  { to: "/songs", icon: <BiMusic />, text: "Songs" },
  { to: "/favorites", icon: <BiHeart />, text: "Favorites" },
  { to: "/playlists", icon: <BsCollectionPlay />, text: "Playlists" },
];

const SideNav: React.FC = () => {
  const location = useLocation();

  return (
    <StyledNav>
      <LogoContainer>
        <ImageContainer>
          <Logo src={logo} alt="Logo" />
        </ImageContainer>
        <H1>Songify</H1>
      </LogoContainer>
      {links.map(({ to, icon, text }) => (
        <StyledNavLink
          key={to}
          to={to}
          className={location.pathname === to ? "active" : ""}
        >
          {icon} {text}
        </StyledNavLink>
      ))}
    </StyledNav>
  );
};

export default SideNav;
