import React from "react";
import styled from "@emotion/styled";
import { StyledDeleteSong as StyledDeletePlaylist } from "../SongList/DeleteSong";
import { BiCheck } from "react-icons/bi";

const Title = styled.h3`
  color: white;
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  align-items: flex-end;
`;

const DeleteButton = styled(BiCheck)`
  color: #00ff00;
  font-size: 20px;
  &:hover {
  }
`;

const CancelButton = styled(BiCheck)`
  color: red;
  font-size: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #222;
  border: 1px solid #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const DeletePlaylist: React.FC = () => {
  return (
    <StyledDeletePlaylist>
      <Title>{`Delete playlist?`}</Title>
      <ButtonContainer>
        <Button>
          <DeleteButton />
        </Button>
        <Button>
          <CancelButton />
        </Button>
      </ButtonContainer>
    </StyledDeletePlaylist>
  );
};

export default DeletePlaylist;
