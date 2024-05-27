import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSongStart } from "../../../redux/slices/slice";
import styled from "@emotion/styled";
import { BiCheck, BiX } from "react-icons/bi";
import { Song } from "../../../redux/types";

type EditSongProps = {
  song: Song;
  onUpdate: (id: string | null) => void;
};

export const EditSongContainer = styled.div`
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  height: 70%;
`;

const Title = styled.h3`
  color: white;
  margin-bottom: 20px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 70%;
  margin: 3rem 0;
`;

export const Input = styled.input`
  padding: 10px 16px;
  text-align: center;
  border: 1px solid #5dfe3c;
  border-radius: 1rem;
  outline: none;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #222;
  border: 1px solid #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: flex-end;
`;

export const UpdateButton = styled(BiCheck)`
  color: #00ff00;
  font-size: 20px;
  &:hover {
  }
`;
export const CancelButton = styled(BiX)`
  color: red;
  font-size: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 10px;
`;

export const WrapperField = styled.div`
  display: flex;
  flex-direction: column;
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
          <WrapperField>
            <Input
              type="text"
              placeholder="Enter the Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </WrapperField>
          <WrapperField>
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
