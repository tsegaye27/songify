import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSongStart } from "../../redux/slices/slice";
import { BiCheck, BiX } from "react-icons/bi";
import styled from "@emotion/styled";
import { Button } from "../../ui/Button";

// Styled Components
export const AddSongContainer = styled.div`
  background-color: transparent; /* Dark background for a modern look */
  border-radius: 8px; /* Reduced border radius */
  padding: 20px;
  height: auto; /* Allow height to adjust based on content */
  max-width: 400px; /* Limit width for better aesthetics */
  margin: 0 auto; /* Center the container */
`;

const Title = styled.h3`
  color: #ffffff; /* White for contrast */
  margin-bottom: 15px; /* Reduced margin */
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 10px;
  background-color: #444; /* Dark background for contrast */
  color: #ffffff; /* White text for contrast */
  text-align: center;
  border: none;
  border-radius: 4px; /* Reduced border radius */
  outline: none;
  margin-bottom: 5px; /* Space between fields */
  transition: border-color 0.3s;

  &:focus {
    border-color: #4caf50; /* Darker green on focus */
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px; /* Space above buttons */
`;

const AddButton = styled(BiCheck)`
  color: #5dfe3c; /* Green for the add action */
  font-size: 24px; /* Larger icon size for better visibility */
  transition: color 0.3s;

  &:hover {
    color: #4caf50; /* Darker green on hover */
  }
`;

const CancelButton = styled(BiX)`
  color: #ff4d4d; /* Red for the cancel action */
  font-size: 24px; /* Larger icon size for better visibility */
  transition: color 0.3s;

  &:hover {
    color: #ff1a1a; /* Darker red on hover */
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px; /* Space between input fields */
  margin-bottom: 10px;
`;

const AddSong: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "" || artist.trim() === "") return;
    dispatch(addSongStart({ title, artist }));
    onAdd();
  };

  return (
    <AddSongContainer>
      <Title>Add Song</Title>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            placeholder="Enter the Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Enter the Artist"
            value={artist}
            required
            onChange={(e) => setArtist(e.target.value)}
          />
        </InputContainer>
        <ButtonContainer>
          <Button type="submit">
            <AddButton />
          </Button>
          <Button type="button" onClick={onAdd}>
            <CancelButton />
          </Button>
        </ButtonContainer>
      </Form>
    </AddSongContainer>
  );
};

export default AddSong;
