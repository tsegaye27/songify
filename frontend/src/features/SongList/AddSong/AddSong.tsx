import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSongStart } from "../../../redux/slices/slice";
import { BiCheck, BiX } from "react-icons/bi";
import styled from "@emotion/styled";

const AddSongContainer = styled.div`
  border-radius: 10px;
  width: 20rem;
  height: 20rem;
  padding: 20px;
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
  border: none;
  border-radius: 1rem;
  padding: 10px 16px;
  border: 1px solid #5dfe3c;
  text-align: center;
  background-color: #d7d7d7e9;
  outline: none;
`;

const Button = styled.button`
  border: 1px solid #007bff;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: #222;
  color: white;
  cursor: pointer;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: flex-end;
`;

const AddButton = styled(BiCheck)`
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

// const FormContainer = styled.div`
//   padding: 2rem;
//   border-radius: 10px;
// `;
const WrapperField = styled.div`
  display: flex;
  flex-direction: column;
`;

interface AddSongFProps {
  onAdd: () => void;
}

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
      {/* <FormContainer> */}
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <WrapperField>
            <Input
              type="text"
              placeholder="Enter the Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </WrapperField>
          <WrapperField>
            <Input
              type="text"
              placeholder="Enter the Artist"
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
      {/* </FormContainer> */}
    </AddSongContainer>
  );
};

export default AddSong;
