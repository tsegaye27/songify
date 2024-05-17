import React from "react";
import {
  Title,
  AddSongButton as AddPlaylistButton,
  EmptyListContainer,
} from "../SongList/SongList";

const PlaylistItem: React.FC = () => {
  return (
    <EmptyListContainer>
      <Title>Add a Playlist</Title>
      <AddPlaylistButton />
    </EmptyListContainer>
  );
};

export default PlaylistItem;
