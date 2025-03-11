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
    width: 8px; /* Customize scrollbar width */
    background-color: var(--second-background-color);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--accent-color);
    border-radius: 10px;
  }
`;

const Footer = styled.footer`
  background-color: var(--second-background-color);
  color: var(--text-color);
  text-align: center;
  padding: 10px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
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
        <Footer>Songify 2025 | &copy; All Rights Reserved</Footer>
      </div>
    </StyledAppLayout>
  );
};

export default AppLayout;
