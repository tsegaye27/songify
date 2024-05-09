import React from "react";
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
  overflow-y: auto;
`;

const MiniContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #494949;
`;

const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
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
        <Footer>Songify | All Rights Reserved</Footer>
      </MiniContainer>
    </StyledAppLayout>
  );
};

export default AppLayout;
