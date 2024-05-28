import React from "react";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top: 8px solid #09d371;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation: ${css`
    ${spin} 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite
  `};
`;

const Loader: React.FC = () => (
  <LoaderContainer>
    <Spinner />
  </LoaderContainer>
);

export default Loader;
