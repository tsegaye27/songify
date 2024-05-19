import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPlaylist } from "../../redux/slices/playlistSlice";
import styled from "@emotion/styled";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddPlaylist: React.FC = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(createPlaylist({ list: [], name: title }));
      setTitle("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Playlist Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit">Add Playlist</Button>
    </Form>
  );
};

export default AddPlaylist;
