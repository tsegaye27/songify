import React, { memo } from "react";
import SideNav from "./SideNav";
import { Outlet } from "react-router-dom";
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
  scrollbar-width: thin; /* Firefox support */
  scrollbar-color: var(--app-layout-color-hover) transparent;

  &::-webkit-scrollbar {
    background-color: var(--app-layout-color-hover);
    border-radius: 10px;
  }
`;

const Footer = styled.footer`
  background-color: var(--second-background-color);
  color: var(--tertiary-color);
  text-align: center;
  padding: 10px;
`;

const MemoizedSideNav = memo(SideNav);
const MemoizedHeader = memo(Header);

const AppLayout: React.FC = () => {
  return (
    <StyledAppLayout>
      <MemoizedSideNav />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--app-layout-color)",
        }}
      >
        <MemoizedHeader />
        <StyledMain>
          <Outlet />
        </StyledMain>
        <Footer>Songify | All Rights Reserved</Footer>
      </div>
    </StyledAppLayout>
  );
};

export default AppLayout;
