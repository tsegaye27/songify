import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlaylistStart } from "../../redux/slices/playlistSlice";
import styled from "@emotion/styled";
import {
  Button,
  ButtonContainer,
  CancelButton,
  Form,
  Input,
  InputContainer,
  UpdateButton,
  WrapperField,
} from "../SongList/EditSong";

const AddPlaylistContainer = styled.div`
  padding: 20px;
  width: 90%;
  height: 70%;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

type AddPlaylistProps = {
  onAdd: () => void;
};

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
        <InputContainer>
          <WrapperField>
            <Input
              type="text"
              placeholder="Enter the Playlist Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </WrapperField>
        </InputContainer>
        <ButtonContainer>
          <Button type="submit">
            <UpdateButton />
          </Button>
          <Button>
            <CancelButton type="button" onClick={() => onAdd()} />
          </Button>
        </ButtonContainer>
      </Form>
    </AddPlaylistContainer>
  );
};

export default AddPlaylist;
