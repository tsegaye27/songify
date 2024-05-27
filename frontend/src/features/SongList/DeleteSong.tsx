import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { deleteSongStart } from "../../redux/slices/slice";
import styled from "@emotion/styled";
import { BiCheck, BiX } from "react-icons/bi";
import { removeFromFavorites } from "../../redux/slices/favoriteSlice";

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
  justify-content: space-around;
  height: 100%;
  align-items: flex-end;
`;

const DeleteButton = styled(BiCheck)`
  color: #00ff00;
  font-size: 20px;
  &:hover {
  }
`;
const CancelButton = styled(BiX)`
  color: red;
  font-size: 20px;
`;

export const StyledDeleteSong = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 90%;
  height: 70%;
`;

const Title = styled.h3`
  color: white;
  margin-bottom: 20px;
  text-align: center;
`;
type DeleteSongProps = {
  onDelete: () => void;
  song_Id: string;
};

const DeleteSong: React.FC<DeleteSongProps> = ({ onDelete, song_Id }) => {
  const songs = useSelector((state: RootState) => state.songs.list);
  const filteredSong = songs.filter((song) => song._id === song_Id);
  const dispatch = useDispatch();

  function handleDelete(songId: string) {
    dispatch(removeFromFavorites(song_Id));
    dispatch(deleteSongStart(songId));
    onDelete();
  }
  return (
    <StyledDeleteSong>
      <Title>{`Delete ${filteredSong[0].title}?`}</Title>
      <ButtonContainer>
        <Button>
          <DeleteButton onClick={() => handleDelete(filteredSong[0]._id)} />
        </Button>
        <Button>
          <CancelButton onClick={onDelete} />
        </Button>
      </ButtonContainer>
    </StyledDeleteSong>
  );
};

export default DeleteSong;
