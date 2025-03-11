import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSongStart } from "../../redux/slices/slice";
import styled from "@emotion/styled";
import { BiCheck, BiX } from "react-icons/bi";
import { Song } from "../../redux/types";
import { Button } from "../../ui/Button";

type EditSongProps = {
  song: Song;
  onUpdate: (songId: string | null) => void;
};

export const EditSongContainer = styled.div`
  background-color: transparent; /* Dark background for a modern look */
  border-radius: 8px; /* Reduced border radius */
  padding: 20px;
  height: auto; /* Allow height to adjust based on content */
  max-width: 400px; /* Limit the width for better aesthetics */
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
  background-color: #444;
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

export const UpdateButton = styled(BiCheck)`
  color: #5dfe3c; /* Green for the update action */
  font-size: 24px; /* Larger icon size for better visibility */
  transition: color 0.3s;

  &:hover {
    color: #4caf50; /* Darker green on hover */
  }
`;

export const CancelButton = styled(BiX)`
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

const EditSong: React.FC<EditSongProps> = ({ song, onUpdate }) => {
  const [title, setTitle] = useState(song.title);
  const [artist, setArtist] = useState(song.artist);
  const dispatch = useDispatch();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim() === "" || artist.trim() === "") return;
    dispatch(updateSongStart({ _id: song._id, title, artist }));
    onUpdate(null);
  }

  return (
    <EditSongContainer>
      <Title>Edit Song</Title>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
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
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </InputContainer>
        <ButtonContainer>
          <Button type="submit">
            <UpdateButton />
          </Button>
          <Button type="button" onClick={() => onUpdate(null)}>
            <CancelButton />
          </Button>
        </ButtonContainer>
      </Form>
    </EditSongContainer>
  );
};

export default EditSong;
