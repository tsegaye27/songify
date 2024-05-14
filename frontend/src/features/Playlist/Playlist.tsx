import React, { useEffect } from "react";
import {
  AddSongButton as AddPlaylistButton,
  Title,
} from "../SongList/SongList";
import { BiPlus } from "react-icons/bi";

const Playlist: React.FC = () => {
  useEffect(() => {
    document.title = "Playlist";
  }, []);
  return (
    <Styled>
      <Title>No Playlist yet, Start by creating a new one</Title>
      <AddPlaylistButton>
        <BiPlus />
      </AddPlaylistButton>
    </Styled>
  );
};

export default Playlist;
