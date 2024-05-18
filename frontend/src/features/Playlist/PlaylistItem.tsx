import React from "react";
import {
  Title,
  AddSongButton as AddPlaylistButton,
  EmptyListContainer,
} from "../SongList/SongList";
import { SongsList } from "../../redux/types";

interface PlaylistItemProp {
  item: SongsList;
}

const PlaylistItem: React.FC<PlaylistItemProp> = ({ item }) => {
  return (
    <EmptyListContainer>
      <Title>{item.name}</Title>
      <AddPlaylistButton />
    </EmptyListContainer>
  );
};

export default PlaylistItem;
