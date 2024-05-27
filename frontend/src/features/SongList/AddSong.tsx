import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSongStart } from "../../redux/slices/slice";
import { BiCheck, BiX } from "react-icons/bi";
import styled from "@emotion/styled";

export const AddSongContainer = styled.div`
  border-radius: 10px;
  width: 90%;
  height: 70%;
  padding: 20px;
`;
const Title = styled.h3`
  color: var(--text-color);
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
  border: none;
  border-radius: 1rem;
  padding: 10px 16px;
  border: 1px solid #5dfe3c;
  text-align: center;
  outline: none;
`;

const Button = styled.button`
  border: 1px solid #007bff;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: var(--text-color);
  cursor: pointer;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: flex-end;
`;

const AddButton = styled(BiCheck)`
  color: var(--green-primary);
  font-size: 20px;
  &:hover {
  }
`;
const CancelButton = styled(BiX)`
  color: var(--red-primary);
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

type AddSongFProps = {
  onAdd: () => void;
};

const AddSong: React.FC<AddSongFProps> = ({ onAdd }) => {
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
          <WrapperField>
            <Input
              type="text"
              placeholder="Enter the Title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </WrapperField>
          <WrapperField>
            <Input
              type="text"
              placeholder="Enter the Artist"
              required
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </WrapperField>
        </InputContainer>
        <ButtonContainer>
          <Button type="submit">
            <AddButton />
          </Button>
          <Button onClick={() => onAdd()}>
            <CancelButton />
          </Button>
        </ButtonContainer>
      </Form>
    </AddSongContainer>
  );
};

export default AddSong;
