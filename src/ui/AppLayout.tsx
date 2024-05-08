import React from "react";
import SideNav from "./SideNav";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";

const StyledAppLayout = styled.div`
  font-weight: bold;
  display: flex;
`;

const MiniContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppLayout: React.FC = () => {
  return (
    <StyledAppLayout>
      <SideNav />
      <MiniContainer>
        <header>Header</header>
        <main>
          <Outlet />
        </main>
        <footer>Footer</footer>
      </MiniContainer>
    </StyledAppLayout>
  );
};

export default AppLayout;
