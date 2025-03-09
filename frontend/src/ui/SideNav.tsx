import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { BiHome, BiMusic, BiCog } from "react-icons/bi";

const StyledNav = styled.nav`
  width: 240px;
  background-color: var(--sidebar-bg);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: var(--text-color);
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.3s ease;

  &:hover {
    background-color: var(--hover-bg);
  }

  &.active {
    background-color: var(--active-bg);
    font-weight: bold;
  }

  svg {
    margin-right: 12px;
  }
`;

const links = [
  { to: "/", icon: <BiHome />, text: "Home" },
  { to: "/songs", icon: <BiMusic />, text: "Songs" },
  { to: "/settings", icon: <BiCog />, text: "Settings" },
];

const SideNav: React.FC = () => {
  const location = useLocation();

  return (
    <StyledNav>
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
