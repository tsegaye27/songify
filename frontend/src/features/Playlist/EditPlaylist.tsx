import React, { useState } from "react";
import styled from "@emotion/styled";
import { TypePlaylist } from "../../redux/types";
import { EditSongContainer } from "../SongList/EditSong"; // Reusing the styled container
import { BiCheck, BiX } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { updatePlaylistStart } from "../../redux/slices/playlistSlice";
import { Button } from "../../ui/Button"; // Assuming Button is styled similarly

type EditPlaylistProps = {
  playlist: TypePlaylist;
  onEdit: () => void;
};

const Title = styled.h3`
  color: #ffffff; /* White for contrast */
  margin-bottom: 15px; /* Reduced margin */
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  text-align: center;
  background-color: #444;
  color: #ffffff; /* White text for contrast */
  border: none;
  border-radius: 4px; /* Reduced border radius */
  outline: none;
  margin-bottom: 5px; /* Space between fields */
  transition: border-color 0.3s;

  &:focus {
    border-color: #4caf50; /* Darker green on focus */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px; /* Space above buttons */
`;

const UpdateButton = styled(BiCheck)`
  color: #5dfe3c; /* Green for the update action */
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px; /* Space between input fields */
  margin-bottom: 10px;
`;

const EditPlaylist: React.FC<EditPlaylistProps> = ({ playlist, onEdit }) => {
  const [name, setName] = useState(playlist.name);
  const dispatch = useDispatch();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(updatePlaylistStart({ ...playlist, name }));
    onEdit();
  }

  return (
    <EditSongContainer>
      <Title>Edit {playlist.name}</Title>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            placeholder="Enter the Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </InputContainer>
        <ButtonContainer>
          <Button type="submit">
            <UpdateButton />
          </Button>
          <Button type="button" onClick={onEdit}>
            <CancelButton />
          </Button>
        </ButtonContainer>
      </Form>
    </EditSongContainer>
  );
};

export default EditPlaylist;
