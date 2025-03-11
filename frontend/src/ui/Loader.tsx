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
  align-items: flex-start; /* Align items to the top */
  height: full; /* Full viewport height */
  position: relative; /* Or absolute */
  padding-top: 20px; /* Add padding to offset from the top */
`;

const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top: 8px solid #09d371;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation: ${css`
    ${spin} 1s linear infinite
  `}; /* Smoother spin */
`;

const Loader: React.FC = () => (
  <LoaderContainer>
    <Spinner />
  </LoaderContainer>
);

export default Loader;
