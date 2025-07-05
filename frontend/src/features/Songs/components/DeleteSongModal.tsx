import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "../../../ui";
import { deleteSongStart } from "../../../redux/slices/songSlice";
import { ISong } from "../../../app/models/song";
import styled from "@emotion/styled";

const Content = styled.div`
  text-align: center;
  color: var(--text-color-secondary);
`;

const SongTitle = styled.strong`
  color: var(--text-color);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

interface DeleteSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: ISong;
}

const DeleteSongModal: React.FC<DeleteSongModalProps> = ({
  isOpen,
  onClose,
  song,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteSongStart(song._id));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Song">
      <Content>
        Are you sure you want to delete <SongTitle>{song.title}</SongTitle>?
        This action cannot be undone.
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

export default DeleteSongModal;
