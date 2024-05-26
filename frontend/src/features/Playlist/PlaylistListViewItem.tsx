import React from "react";
import styled from "@emotion/styled";
import { PlaylistLogo, StyledPlaylistItem } from "./PlaylistItem";
import { TypePlaylist } from "../../redux/types";
import { useDispatch } from "react-redux";
import { addSongToPlaylistStart } from "../../redux/slices/playlistSlice";

const Title = styled.h3`
  font-size: 20px;
`;

interface Props {
  playlist: TypePlaylist;
  songId: string;
}

const PlaylistListViewItem: React.FC<Props> = ({ playlist, songId }) => {
  const dispatch = useDispatch();

  function handleAddSongToPlaylist() {
    dispatch(addSongToPlaylistStart({ playlistId: playlist._id, songId }));
  }
  return (
    <StyledPlaylistItem onClick={handleAddSongToPlaylist}>
      <PlaylistLogo />
      <Title>{playlist.name}</Title>
    </StyledPlaylistItem>
  );
};

export default PlaylistListViewItem;
