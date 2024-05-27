import React, { useState } from "react";
import styled from "@emotion/styled";
import { TypePlaylist } from "../../redux/types";
import { EditSongContainer } from "../SongList/EditSong/EditSong";
import { BiCheck, BiX } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { updatePlaylistStart } from "../../redux/slices/playlistSlice";

type EditPlaylistProps = {
  playlist: TypePlaylist;
  onEdit: () => void;
};

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
  border: 1px solid #5dfe3c;
  border-radius: 1rem;
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

const EditPlaylist: React.FC<EditPlaylistProps> = ({ playlist, onEdit }) => {
  const [name, setName] = useState(playlist.name);
  const dispatch = useDispatch();
  function handleSubmit() {
    dispatch(updatePlaylistStart({ ...playlist, name }));
    onEdit();
  }
  return (
    <EditSongContainer>
      <Title>Edit {playlist.name}</Title>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <WrapperField>
            <Input
              type="text"
              placeholder="Enter the Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </WrapperField>
        </InputContainer>
        <ButtonContainer>
          <Button type="submit">
            <UpdateButton />
          </Button>
          <Button onClick={onEdit}>
            <CancelButton />
          </Button>
        </ButtonContainer>
      </Form>
    </EditSongContainer>
  );
};

export default EditPlaylist;
