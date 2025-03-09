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
  background-color: var(--primary-color);
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
  }
`;

const SongLogo = styled(BsMusicNote)`
  font-size: 32px;
  color: var(--text-color-secondary);
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 100%;
  background-color: black;
`;

const Title = styled.h3`
  font-size: 20px;
  color: var(--text-color-secondary);
  margin: 0;
  text-align: center;
`;

const Body = styled.p`
  font-size: 16px;
  color: var(--tertiary-color);
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
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  `;
export const DeleteButton = styled.button`
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  &:hover {
    animation: ${shakeAnimation} 0.5s linear;
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
                data-tooltip-content="remove song from playlist"
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
