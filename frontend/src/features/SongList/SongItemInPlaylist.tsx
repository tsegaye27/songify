import React, { useState } from "react";
import { Song, TypePlaylist } from "../../redux/types";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import EditSong from "./EditSong/EditSong";
import { BsMusicNote } from "react-icons/bs";
import { BiEdit, BiTrash } from "react-icons/bi";
import Modal from "../../ui/Modal";

import RemoveFromPlaylist from "../Playlist/RemoveFromPlaylist";

export const StyledSongItem = styled.div`
  background-color: #222;
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
  color: #ccc;
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 100%;
  background-color: black;
`;

const Title = styled.h3`
  font-size: 20px;
  color: #ccc;
  margin: 0;
  text-align: center;
`;

const Body = styled.p`
  font-size: 16px;
  color: #aaa;
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
  background-color: #222;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  &:hover {
    animation: ${shakeAnimation} 0.5s linear;
  }
`;

export const EditButton = styled.button`
  background-color: #222;
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #006eff;
  }
`;

export const Icon = styled.span`
  font-size: 20px;
`;

interface Props {
  song: Song;
  playlist: TypePlaylist;
  onDelete: (song: Song) => void;
}

const SongItemInPlaylist: React.FC<Props> = ({ song, playlist, onDelete }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);

  function handleEdit(songId: string | null) {
    if (songId === null) setIsSelected(false);
    else {
      setTimeout(() => {
        setIsSelected(true);
        setShowModal(true);
      }, 300);
    }
  }

  function handleRemoveFromPlaylist() {
    setShowDelete((show) => !show);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setShowDelete(false);
    setIsSelected(false);
  }

  return (
    <>
      <StyledSongItem>
        <SongLogo className="song-logo" />
        <Title>{song.title}</Title>
        <Body>{song.artist}</Body>
        <ButtonContainer>
          <EditButton onClick={() => handleEdit(song._id)}>
            <Icon>
              <BiEdit />
            </Icon>
          </EditButton>
          <DeleteButton onClick={handleRemoveFromPlaylist}>
            <Icon>
              <BiTrash />
            </Icon>
          </DeleteButton>
        </ButtonContainer>
      </StyledSongItem>
      {isSelected && showModal && (
        <Modal onClose={handleCloseModal}>
          <EditSong onUpdate={handleEdit} song_Id={song._id} />
        </Modal>
      )}
      {showDelete && showModal && (
        <Modal onClose={handleCloseModal}>
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
