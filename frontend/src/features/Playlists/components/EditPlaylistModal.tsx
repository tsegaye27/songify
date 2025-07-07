import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "../../../ui";
import { updatePlaylistStart } from "../../../redux/slices/playlistSlice";
import { IPlaylist } from "../../../app/models/playlist";
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

interface EditPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlist: IPlaylist;
}

const EditPlaylistModal: React.FC<EditPlaylistModalProps> = ({
  isOpen,
  onClose,
  playlist,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: playlist.name,
    description: playlist.description || "",
    isPublic: playlist.isPublic || false,
    tags: playlist.tags?.join(", ") || "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: playlist.name,
        description: playlist.description || "",
        isPublic: playlist.isPublic || false,
        tags: playlist.tags?.join(", ") || "",
      });
    }
  }, [isOpen, playlist]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    // Only send updateable fields
    const updateData = {
      _id: playlist._id, // Keep the ID for identification
      name: formData.name,
      description: formData.description,
      isPublic: formData.isPublic,
      tags: formData.tags
        ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : [],
    };

    dispatch(updatePlaylistStart(updateData));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Playlist">
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Playlist Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="primary" fullWidth>
          Save Changes
        </Button>
      </Form>
    </Modal>
  );
};

export default EditPlaylistModal;
