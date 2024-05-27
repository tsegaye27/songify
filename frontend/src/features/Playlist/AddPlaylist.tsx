import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlaylistStart } from "../../redux/slices/playlistSlice";
import styled from "@emotion/styled";

const AddPlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 4px;
  border: none;
  background-color: #0073e6;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5;
  }

  &:nth-of-type(2) {
    background-color: #e6e6e6;
    color: black;

    &:hover {
      background-color: #ccc;
    }
  }
`;

interface AddPlaylistProps {
  onAdd: () => void;
}

const AddPlaylist: React.FC<AddPlaylistProps> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") return;
    dispatch(addPlaylistStart({ name }));
    onAdd();
  };

  return (
    <AddPlaylistContainer>
      <Title>Add Playlist</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter the Playlist Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <ButtonContainer>
          <Button type="submit">Add Playlist</Button>
          <Button type="button" onClick={() => onAdd()}>
            Cancel
          </Button>
        </ButtonContainer>
      </Form>
    </AddPlaylistContainer>
  );
};

export default AddPlaylist;
