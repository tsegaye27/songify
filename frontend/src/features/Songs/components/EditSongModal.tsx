import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "../../../ui";
import { updateSongStart } from "../../../redux/slices/songSlice";
import { ISong } from "../../../app/models/song";
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

interface EditSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: ISong;
}

const EditSongModal: React.FC<EditSongModalProps> = ({
  isOpen,
  onClose,
  song,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: song.title,
    artist: song.artist,
    genre: song.genre || "",
    album: song.album || "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: song.title,
        artist: song.artist,
        genre: song.genre || "",
        album: song.album || "",
      });
    }
  }, [isOpen, song]);

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

    const updateData = {
      _id: song._id,
      title: formData.title,
      artist: formData.artist,
      ...(formData.genre && { genre: formData.genre }),
      ...(formData.album && { album: formData.album }),
    };

    dispatch(updateSongStart(updateData));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Song">
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
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="album"
          placeholder="Album"
          value={formData.album}
          onChange={handleChange}
        />
        <Button type="submit" variant="primary" fullWidth>
          Save Changes
        </Button>
      </Form>
    </Modal>
  );
};

export default EditSongModal;
