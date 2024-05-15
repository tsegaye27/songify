import React, { useEffect } from "react";
import {
  AddSongButton as AddPlaylistButton,
  Title,
} from "../SongList/SongList";
import { BiPlus } from "react-icons/bi";
import styled from "@emotion/styled";

const StyledPlaylist = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const Playlist: React.FC = () => {
  useEffect(() => {
    document.title = "Playlist";
  }, []);
  return (
    <StyledPlaylist>
      <Title>No Playlist yet, Start by creating a new one</Title>
      <AddPlaylistButton onClick={() => console.log("add playlist")}>
        <BiPlus />
      </AddPlaylistButton>
    </StyledPlaylist>
  );
};

export default Playlist;
