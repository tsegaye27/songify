import React from "react";
import styled from "@emotion/styled";
import { StyledDeleteSong as StyledDeletePlaylist } from "../SongList/DeleteSong";
import { BiCheck, BiX } from "react-icons/bi";
import { TypePlaylist } from "../../redux/types";
import { useDispatch } from "react-redux";
import { deletePlaylistStart } from "../../redux/slices/playlistSlice";

const Title = styled.h3`
  color: var(--text-color);
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  align-items: flex-end;
`;

const DeleteButton = styled(BiCheck)`
  color: var(--green-primary);
  font-size: 20px;
  &:hover {
  }
`;

const CancelButton = styled(BiX)`
  color: var(--red-primary);
  font-size: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--primary-color);
  border: 1px solid #007bff;
  color: var(--text-color);
  border-radius: 5px;
  cursor: pointer;
`;

type DeletePlaylistProps = {
  playlist: TypePlaylist;
  onDelete: () => void;
};

const DeletePlaylist: React.FC<DeletePlaylistProps> = ({
  playlist,
  onDelete,
}) => {
  const dispatch = useDispatch();
  function handleDelete(playlistId: string) {
    dispatch(deletePlaylistStart(playlistId));
    onDelete();
  }
  return (
    <StyledDeletePlaylist>
      <Title>{`Delete ${playlist.name}?`}</Title>
      <ButtonContainer>
        <Button>
          <DeleteButton onClick={() => handleDelete(playlist._id)} />
        </Button>
        <Button>
          <CancelButton onClick={onDelete} />
        </Button>
      </ButtonContainer>
    </StyledDeletePlaylist>
  );
};

export default DeletePlaylist;
