import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { deleteSongStart } from "../../redux/slices/slice";
import styled from "@emotion/styled";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  padding: 15px;
  background-color: #222;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  cursor: pointer;
`;

const StyledDeleteSong = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 15rem;
  width: 20rem;
`;

const H2 = styled.h2`
  text-align: center;
`;

interface DeleteSongProps {
  onDelete: () => void;
  song_Id: string;
}

const DeleteSong: React.FC<DeleteSongProps> = ({ onDelete, song_Id }) => {
  const songs = useSelector((state: RootState) => state.songs.list);
  const filteredSong = songs.filter((song) => song._id === song_Id);
  const dispatch = useDispatch();

  function handleDelete(songId: string) {
    dispatch(deleteSongStart(songId));
    onDelete();
  }
  return (
    <StyledDeleteSong>
      <H2>{`Delete ${filteredSong[0].title} ?`}</H2>
      <ButtonContainer>
        <Button onClick={() => handleDelete(filteredSong[0]._id)}>Yes</Button>
        <Button onClick={onDelete}>No</Button>
      </ButtonContainer>
    </StyledDeleteSong>
  );
};

export default DeleteSong;
