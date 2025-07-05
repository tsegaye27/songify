import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "../../../ui";
import { deletePlaylistStart } from "../../../redux/slices/playlistSlice";
import { IPlaylist } from "../../../app/models/playlist";
import styled from "@emotion/styled";

const Content = styled.div`
  text-align: center;
  color: var(--text-color-secondary);
`;

const PlaylistName = styled.strong`
  color: var(--text-color);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

interface DeletePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlist: IPlaylist;
}

const DeletePlaylistModal: React.FC<DeletePlaylistModalProps> = ({
  isOpen,
  onClose,
  playlist,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePlaylistStart(playlist._id));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Playlist">
      <Content>
        Are you sure you want to delete the playlist{" "}
        <PlaylistName>{playlist.name}</PlaylistName>? This action cannot be
        undone.
      </Content>
      <ButtonGroup>
        <Button variant="secondary" onClick={onClose} fullWidth>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} fullWidth>
          Delete
        </Button>
      </ButtonGroup>
    </Modal>
  );
};

export default DeletePlaylistModal;
