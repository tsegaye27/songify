import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "../../../ui";
import { addSongStart } from "../../../redux/slices/songSlice";
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

interface AddSongModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSongModal: React.FC<AddSongModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.artist) return;

    const songData = {
      title: formData.title,
      artist: formData.artist,
      ...(formData.album && { album: formData.album }),
      ...(formData.genre && { genre: formData.genre }),
    };

    dispatch(addSongStart(songData));
    onClose();
    setFormData({ title: "", artist: "", album: "", genre: "" });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add a New Song">
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Song Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="artist"
          placeholder="Artist Name"
          value={formData.artist}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="album"
          placeholder="Album"
          value={formData.album}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
        />
        <Button type="submit" variant="primary" fullWidth>
          Add Song
        </Button>
      </Form>
    </Modal>
  );
};

export default AddSongModal;
