import React from "react";
import styled from "@emotion/styled";
import { PlaylistLogo } from "./PlaylistItem";
import { TypePlaylist } from "../../redux/types";
import { useDispatch } from "react-redux";
import { addSongToPlaylistStart } from "../../redux/slices/playlistSlice";

const Title = styled.h3`
  font-size: 20px;
`;

const StyledPlaylistItem = styled.div`
  margin: 0;
  padding: 0;
  color: var(--text-color);
  display: flex;
  background-color: var(--secondary-color);
  align-items: center;
  cursor: pointer;
  border-radius: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

type Props = {
  playlist: TypePlaylist;
  songId: string;
  onClose: () => void;
};

const PlaylistListViewItem: React.FC<Props> = ({
  playlist,
  songId,
  onClose,
}) => {
  const dispatch = useDispatch();

  function handleAddSongToPlaylist() {
    const songToBeAdded = playlist.songs.find((song) => song._id === songId);
    songToBeAdded
      ? onClose()
      : dispatch(addSongToPlaylistStart({ playlistId: playlist._id, songId }));
    onClose();
  }
  return (
    <StyledPlaylistItem onClick={handleAddSongToPlaylist}>
      <PlaylistLogo />
      <Title>{playlist.name}</Title>
    </StyledPlaylistItem>
  );
};

export default PlaylistListViewItem;
