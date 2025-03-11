import React, { useState } from "react";
import { Song, TypePlaylist } from "../../redux/types";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { BsMusicNote } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import Modal from "../../ui/Modal";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import RemoveFromPlaylist from "../Playlist/RemoveFromPlaylist";

export const StyledSongItem = styled.div`
  background-color: #1e1e1e; /* Dark background for a modern look */
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(255, 255, 255, 0.1);
  padding: 20px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  transition: transform 0.4s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const SongLogo = styled(BsMusicNote)`
  font-size: 32px;
  color: var(--green-primary); /* Set to your desired primary color */
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 50%;
  background-color: #333; /* Dark background for contrast */
`;

const Title = styled.h3`
  font-size: 20px;
  color: #ffffff; /* White for better readability */
  margin: 0;
  text-align: center;
`;

const Body = styled.p`
  font-size: 16px;
  color: #cccccc; /* Softer secondary text color */
  margin: 10px 0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const shakeAnimation = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  /* ... (rest of the shake animation) ... */
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

export const DeleteButton = styled.button`
  background-color: #ff4d4d; /* Soft red for delete action */
  color: #ffffff; /* White text for contrast */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    animation: ${shakeAnimation} 0.5s linear;
    background-color: #ff1a1a; /* Darker red on hover */
  }
`;

export const Icon = styled.span`
  font-size: 20px;
`;

type Props = {
  song: Song;
  playlist: TypePlaylist;
  onDelete: (song: Song) => void;
};

const SongItemInPlaylist: React.FC<Props> = ({ song, playlist, onDelete }) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);

  function handleRemoveFromPlaylist() {
    setShowDelete((show) => !show);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setShowDelete(false);
  }

  return (
    <>
      <StyledSongItem>
        <SongLogo className="song-logo" />
        <Title>{song.title}</Title>
        <Body>{song.artist}</Body>
        <ButtonContainer>
          <DeleteButton onClick={handleRemoveFromPlaylist}>
            <Icon>
              <BiTrash
                data-tooltip-id="removeFromPlaylist"
                data-tooltip-place="bottom"
                data-tooltip-content="Remove song from playlist"
              />
              <ReactTooltip id="removeFromPlaylist" />
            </Icon>
          </DeleteButton>
        </ButtonContainer>
      </StyledSongItem>

      {showDelete && showModal && (
        <Modal isOpen={true} onClose={handleCloseModal}>
          <RemoveFromPlaylist
            onClose={handleRemoveFromPlaylist}
            onUpdateList={() => onDelete(song)}
            song={song}
            playlist={playlist}
          />
        </Modal>
      )}
    </>
  );
};

export default SongItemInPlaylist;
