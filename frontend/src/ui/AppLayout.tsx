import React from "react";
import SideNav from "./SideNav";
import { NavLink, Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "./Header";

const StyledAppLayout = styled.div`
  display: flex;
  height: 100vh;
`;

const StyledMain = styled.main`
  padding: 2rem;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    background-color: var(--app-layout-color-hover);
    border-radius: 10px;
  }
`;

const MiniContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--app-layout-color);
`;

const Footer = styled(NavLink)`
  background-color: var(--second-background-color);
  color: var(--tertiary-color);
  text-align: center;
  padding: 10px;
  text-decoration: none;
`;

const AppLayout: React.FC = () => {
  return (
    <StyledAppLayout>
      <SideNav />
      <MiniContainer>
        <Header />
        <StyledMain>
          <Outlet />
        </StyledMain>
        <Footer to="/">Songify | All Rights Reserved</Footer>
      </MiniContainer>
    </StyledAppLayout>
  );
};

export default AppLayout;
