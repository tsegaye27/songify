import React from "react";
import styled from "@emotion/styled";
import { BiCheck, BiX } from "react-icons/bi";
import { TypePlaylist } from "../../redux/types";
import { useDispatch } from "react-redux";
import { deletePlaylistStart } from "../../redux/slices/playlistSlice";

// Styled Components
const StyledDeletePlaylist = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 90%;
  max-width: 400px; /* Limit width for better aesthetics */
  background-color: transparent; /* Dark background for contrast */
  margin: 0 auto; /* Center the container */
`;

const Title = styled.h3`
  color: var(--text-color); /* Use the same color */
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Space buttons evenly */
  align-items: center; /* Center align buttons */
  margin-top: 20px; /* Space above buttons */
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #333; /* Dark background */
  border: none; /* No border for a cleaner look */
  color: #ffffff; /* White text for contrast */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #222; /* Darker background on hover */
  }
`;

const DeleteButton = styled(BiCheck)`
  color: var(--green-primary); /* Green for delete action */
  font-size: 24px; /* Increased size for visibility */
`;

const CancelButton = styled(BiX)`
  color: var(--red-primary); /* Red for cancel action */
  font-size: 24px; /* Increased size for visibility */
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
        <Button onClick={() => handleDelete(playlist._id)}>
          <DeleteButton />
        </Button>
        <Button onClick={onDelete}>
          <CancelButton />
        </Button>
      </ButtonContainer>
    </StyledDeletePlaylist>
  );
};

export default DeletePlaylist;
