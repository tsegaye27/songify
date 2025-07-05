import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "../../../ui";
import { addPlaylistStart } from "../../../redux/slices/playlistSlice";
import styled from "@emotion/styled";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--accent-color);
  border-radius: var(--radius-md);
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

interface AddPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPlaylistModal: React.FC<AddPlaylistModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    dispatch(addPlaylistStart({ name }));
    onClose();
    setName("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a New Playlist">
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Playlist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button type="submit" variant="primary" fullWidth>
          Create Playlist
        </Button>
      </Form>
    </Modal>
  );
};

export default AddPlaylistModal;
