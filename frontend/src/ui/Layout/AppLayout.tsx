import React, { useState } from "react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface ContainerProps {
  isCollapsed: boolean;
}

const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: ${(props) =>
      props.isCollapsed ? "80px" : "280px"} 1fr;
  height: 100vh;
  background-color: #121212;
  transition: grid-template-columns 0.3s ease-in-out;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--accent-color) transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--accent-color);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--primary-color);
  }
`;

const AppLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Container isCollapsed={isCollapsed}>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <MainContent>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </MainContent>
    </Container>
  );
};

export default AppLayout;
