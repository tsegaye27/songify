import React from "react";
import styled from "@emotion/styled";
import { PlaylistLogo } from "./PlaylistItem";
import { TypePlaylist } from "../../redux/types";
import { useDispatch } from "react-redux";
import { addSongToPlaylistStart } from "../../redux/slices/playlistSlice";

// Styled Components
const Title = styled.h3`
  font-size: 18px; /* Slightly smaller font size for better readability */
  margin: 0; /* Remove margin for better alignment */
  color: var(--text-color);
`;

const SongCount = styled.p`
  font-size: 14px; /* Smaller font size for song count */
  margin: 0; /* Remove margin for better alignment */
  color: var(--text-color);
  opacity: 0.7; /* Slightly faded for subtlety */
`;

const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column; /* Stack title and song count vertically */
  margin-left: 12px; /* Space between logo and info */
`;

const StyledPlaylistItem = styled.div`
  display: flex;
  align-items: center; /* Align items in the center */
  background-color: #333;
  color: var(--text-color);
  padding: 10px; /* Increased padding for better touch targets */
  margin: 2px 0; /* Space between playlist items */
  border-radius: 10px; /* More pronounced rounding for modern look */
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.3s ease;

  &:hover {
    background-color: #444; /* Change background on hover */
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
    if (songToBeAdded) {
      onClose();
    } else {
      dispatch(addSongToPlaylistStart({ playlistId: playlist._id, songId }));
      onClose();
    }
  }

  return (
    <StyledPlaylistItem onClick={handleAddSongToPlaylist}>
      <PlaylistLogo />
      <PlaylistInfo>
        <Title>{playlist.name}</Title>
        <SongCount>{playlist.songs?.length} Songs</SongCount>
      </PlaylistInfo>
    </StyledPlaylistItem>
  );
};

export default PlaylistListViewItem;
