import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Loader, EmptyState } from "../../../ui";
import {
  fetchPlaylistsStart,
  addSongToPlaylistStart,
} from "../../../redux/slices/playlistSlice";
import RootState from "../../../redux/RootState";
import styled from "@emotion/styled";
import { BiPlus } from "react-icons/bi";

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
`;

const ListItem = styled.li`
  padding: 1rem;
  color: var(--text-color-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--accent-color);
    color: var(--text-color);
  }
`;

interface AddToPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  songId: string;
}

const AddToPlaylistModal: React.FC<AddToPlaylistModalProps> = ({
  isOpen,
  onClose,
  songId,
}) => {
  const dispatch = useDispatch();
  const { list: playlists, loading } = useSelector(
    (state: RootState) => state.playlists,
  );

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchPlaylistsStart());
    }
  }, [isOpen, dispatch]);

  const handleSelectPlaylist = (playlistId: string) => {
    dispatch(addSongToPlaylistStart({ playlistId, songId }));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add to Playlist">
      {loading ? (
        <Loader />
      ) : playlists.length === 0 ? (
        <EmptyState
          icon={<BiPlus />}
          title="No Playlists"
          description="Create a playlist first to add songs to it."
        />
      ) : (
        <List>
          {playlists.map((playlist) => (
            <ListItem
              key={playlist._id}
              onClick={() => handleSelectPlaylist(playlist._id)}
            >
              {playlist.name}
            </ListItem>
          ))}
        </List>
      )}
    </Modal>
  );
};

export default AddToPlaylistModal;
