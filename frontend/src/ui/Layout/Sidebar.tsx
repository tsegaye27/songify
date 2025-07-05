import React from "react";
import styled from "@emotion/styled";
import { NavLink, useLocation } from "react-router-dom";
import {
  BiMusic,
  BiHeart,
  BiLogOut,
  BiChevronLeft,
  BiMenu,
  BiBarChart,
} from "react-icons/bi";
import { BsCollectionPlay } from "react-icons/bs";
import { useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import LogoutModal from "../../features/Auth/LogoutModal/LogoutModal";

interface CollapsibleProps {
  isCollapsed: boolean;
}

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const Container = styled.aside<CollapsibleProps>`
  background-color: #000000;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  border-right: 1px solid #282828;
  transition: width 0.3s ease-in-out;
  width: ${(props) => (props.isCollapsed ? "80px" : "280px")};
`;

const ToggleButton = styled.button<CollapsibleProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  outline: none;
  background-color: transparent;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-bottom: 1rem;
  align-self: ${(props) => (props.isCollapsed ? "center" : "flex-end")};
  margin-right: ${(props) => (props.isCollapsed ? "0" : "1rem")};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const LogoSection = styled.div<CollapsibleProps>`
  padding: 0 1.5rem 1.5rem;
  margin-bottom: 1rem;
  opacity: ${(props) => (props.isCollapsed ? 0 : 1)};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

const LogoText = styled.h1<CollapsibleProps>`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
  white-space: nowrap;
  opacity: ${(props) => (props.isCollapsed ? 0 : 1)};
  transition: opacity 0.2s ease-in-out;
`;

const Navigation = styled.nav`
  flex: 1;
  padding: 0 1rem;
`;

const NavItem = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== "isCollapsed",
})<CollapsibleProps>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.isCollapsed ? "0" : "1rem")};
  padding: ${(props) => (props.isCollapsed ? "1rem 0" : "1rem")};
  margin-bottom: 0.5rem;
  border-radius: 8px;
  color: var(--text-color-secondary);
  text-decoration: none;
  border: none;
  outline: none;
  transition: all 0.3s ease;
  font-weight: 500;
  justify-content: ${(props) => (props.isCollapsed ? "center" : "flex-start")};

  span {
    display: ${(props) => (props.isCollapsed ? "none" : "inline")};
    transition: opacity 0.2s ease-in-out;
    white-space: nowrap;
  }

  svg {
    font-size: 1.5rem;
    min-width: 24px;
  }

  &:hover {
    background-color: #282828;
    color: var(--text-color);
  }

  &.active {
    background-color: var(--primary-color);
    color: #000000;
    font-weight: 700;
  }
`;

const UserSection = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #282828;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserEmail = styled.span<CollapsibleProps>`
  color: var(--text-color-secondary);
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: ${(props) => (props.isCollapsed ? 0 : 1)};
  transition: opacity 0.2s ease-in-out;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  outline: none;
  color: var(--text-color-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: color 0.3s ease;

  &:hover {
    color: var(--red-primary);
  }
`;

interface NavItemData {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const navigationItems: NavItemData[] = [
  { to: "/", icon: <BiBarChart />, label: "Dashboard" },
  { to: "/songs", icon: <BiMusic />, label: "Songs" },
  { to: "/favorites", icon: <BiHeart />, label: "Favorites" },
  { to: "/playlists", icon: <BsCollectionPlay />, label: "Playlists" },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  return (
    <>
      <Container isCollapsed={isCollapsed}>
        <ToggleButton
          isCollapsed={isCollapsed}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <BiMenu size={20} /> : <BiChevronLeft size={20} />}
        </ToggleButton>

        <LogoSection isCollapsed={isCollapsed}>
          <Logo>
            <LogoImage src="/logo.webp" alt="Songify" />
            <LogoText isCollapsed={isCollapsed}>Songify</LogoText>
          </Logo>
        </LogoSection>

        <Navigation>
          {navigationItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              className={location.pathname === item.to ? "active" : ""}
              isCollapsed={isCollapsed}
              title={item.label}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavItem>
          ))}
        </Navigation>

        <UserSection>
          <UserInfo>
            <UserEmail isCollapsed={isCollapsed}>{user?.email}</UserEmail>
            <LogoutButton
              onClick={() => setShowLogoutModal(true)}
              title="Sign Out"
            >
              <BiLogOut size={20} />
            </LogoutButton>
          </UserInfo>
        </UserSection>
      </Container>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </>
  );
};

export default Sidebar;
