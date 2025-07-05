import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #121212;
  align-items: center;
  padding: 2rem;
  min-height: 200px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid var(--accent-color);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const FullScreen = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9999;
  background-color: #121212;
`;

const Message = styled.p`
  color: gray;
  margin-top: 1rem;
  font-size: 0.875rem;
`;

interface LoaderProps {
  message?: string;
  isFullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  message = "Loading...",
  isFullScreen = false,
}) => {
  const Content = (
    <>
      <Spinner />
      <Message>{message}</Message>
    </>
  );

  return isFullScreen ? (
    <FullScreen>{Content}</FullScreen>
  ) : (
    <Container>{Content}</Container>
  );
};

export default Loader;
