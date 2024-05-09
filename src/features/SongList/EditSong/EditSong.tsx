import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSongStart } from "../../../redux/slices/slice";
import styled from "@emotion/styled";

interface EditSongProps {
  songId: string;
  onUpdate: (id: string | null) => void;
}

const EditSongContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h3`
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const EditSong: React.FC<EditSongProps> = ({ songId, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim() === "" || body.trim() === "") return;
    dispatch(updateSongStart({ id: songId, title, body }));
    setTitle("");
    setBody("");
    onUpdate(null);
  }

  return (
    <EditSongContainer>
      <Title>Edit Song</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter the Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Enter the Artist"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <Button type="submit">Update Song</Button>
        <Button onClick={() => onUpdate(null)}>Cancel</Button>
      </Form>
    </EditSongContainer>
  );
};

export default EditSong;
