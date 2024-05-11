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
  overflow-y: auto;
  &::-webkit-scrollbar {
    background-color: #949494;
    border-radius: 10px;
  }
`;

const MiniContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #494949;
`;

const Footer = styled(NavLink)`
  background-color: #333;
  color: #aaaaaacc;
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
