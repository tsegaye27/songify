import React from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "./Modal";
import styled from "@emotion/styled";
import { Button } from "../features/SongList/EditSong";

const StyledError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Error: React.FC = () => {
  const navigate = useNavigate();
  return (
    <StyledError>
      <Title>404 Not Found</Title>
      <h3>The page you're looking for does not exist.</h3>
      <Button onClick={() => navigate(-1)}>Go back</Button>
    </StyledError>
  );
};

export default Error;
