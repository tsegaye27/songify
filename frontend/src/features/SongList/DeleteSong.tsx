import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { deleteSongStart } from "../../redux/slices/slice";
import styled from "@emotion/styled";
import { BiCheck, BiX } from "react-icons/bi";
import { removeFromFavorites } from "../../redux/slices/favoriteSlice";

// Styled Components
export const Button = styled.button`
  padding: 10px 20px;
  background-color: #333; /* Green background */
  border: none; /* No border for a cleaner look */
  color: #ffffff; /* White text for contrast */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #222; /* Darker green on hover */
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Space buttons evenly */
  align-items: center; /* Center align buttons */
  margin-top: 20px; /* Space above buttons */
`;

export const DeleteButton = styled(BiCheck)`
  color: var(--green-primary); /* Green for delete action */
  font-size: 24px; /* Increased size for visibility */
`;

export const CancelButton = styled(BiX)`
  color: var(--red-primary); /* Red for cancel action */
  font-size: 24px; /* Increased size for visibility */
`;

export const StyledDeleteSong = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 90%;
  max-width: 400px; /* Limit width for better aesthetics */
  background-color: transparent; /* Dark background for contrast */
  margin: 0 auto; /* Center the container */
`;

export const Title = styled.h3`
  color: var(--text-color);
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
      <Title>{`Delete ${filteredSong[0]?.title}?`}</Title>
      <ButtonContainer>
        <Button onClick={() => handleDelete(filteredSong[0]._id)}>
          <DeleteButton />
        </Button>
        <Button onClick={onDelete}>
          <CancelButton />
        </Button>
      </ButtonContainer>
    </StyledDeleteSong>
  );
};

export default DeleteSong;
