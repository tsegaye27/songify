import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSongStart } from "../../../redux/slices/slice";
import styled from "@emotion/styled";
import RootState from "../../../redux/RootState";
import { BiCheck, BiX } from "react-icons/bi";

interface EditSongProps {
  song_Id: string;
  onUpdate: (id: string | null) => void;
}

const EditSongContainer = styled.div`
  border-radius: 10px;
  padding: 20px;
  width: 20rem;
  height: 20rem;
`;

const Title = styled.h3`
  color: white;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 70%;
  margin: 3rem 0;
`;

const Input = styled.input`
  padding: 10px 16px;
  text-align: center;
  border: 1px solid #74d3ff;
  border-radius: 1rem;
  background-color: #d7d7d7e9;
  outline: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #222;
  border: 1px solid #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: flex-end;
`;

const UpdateButton = styled(BiCheck)`
  color: #00ff00;
  font-size: 20px;
  &:hover {
  }
`;
const CancelButton = styled(BiX)`
  color: red;
  font-size: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 10px;
`;

const WrapperField = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditSong: React.FC<EditSongProps> = ({ song_Id, onUpdate }) => {
  const songs = useSelector((state: RootState) => state.songs.list);
  const filteredSong = songs.filter((song) => song._id === song_Id);
  const { title: filteredTitle, artist: filteredArtist } = filteredSong[0];
  const [title, setTitle] = useState(filteredTitle);
  const [artist, setArtist] = useState(filteredArtist);
  const dispatch = useDispatch();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim() === "" || artist.trim() === "") return;
    dispatch(updateSongStart({ _id: song_Id, title, artist }));
    onUpdate(null);
  }

  return (
    <EditSongContainer>
      <Title>Edit Song</Title>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <WrapperField>
            {/* <Label>Title:</Label> */}
            <Input
              type="text"
              placeholder="Enter the Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </WrapperField>
          <WrapperField>
            {/* <Label>Artist:</Label> */}
            <Input
              type="text"
              placeholder="Enter the Artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </WrapperField>
        </InputContainer>
        <ButtonContainer>
          <Button type="submit">
            <UpdateButton />
          </Button>
          <Button onClick={() => onUpdate(null)}>
            <CancelButton />
          </Button>
        </ButtonContainer>
      </Form>
    </EditSongContainer>
  );
};

export default EditSong;
