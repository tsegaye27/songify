import React, { useState } from "react";
import styled from "@emotion/styled";
import { ISong } from "../../../app/models/song";
import {
  BiEdit,
  BiTrash,
  BiPlus,
  BiHeart,
  BiSolidHeart,
  BiMusic,
} from "react-icons/bi";
import { Button } from "../../../ui";
import { useFavorites } from "../hooks/useFavorites";
import AddToPlaylistModal from "./AddToPlaylistModal";
import EditSongModal from "./EditSongModal";
import DeleteSongModal from "./DeleteSongModal";

const Card = styled.div`
  background-color: var(--second-background-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--accent-color);
  transition: all var(--transition-base);
  position: relative;
  text-align: center;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
  }
`;

const MusicIcon = styled(BiMusic)`
  font-size: 3rem;
  color: var(--text-color-secondary);
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
const Artist = styled.p`
  font-size: 0.875rem;
  color: var(--text-color-secondary);
  margin: 0 0 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
  justify-content: center;
`;

const ActionButton = styled(Button)`
  padding: 0.75rem;

  svg {
    font-size: 1.25rem;
  }
`;

//const IconWrapper = styled.div`
//  position: absolute;
//  top: 1rem;
//  left: 1rem;
//  color: var(--text-color-secondary);
//`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-color-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);

  &:hover {
    color: var(--red-primary);
    background-color: rgba(226, 33, 52, 0.1);
  }

  &:focus {
    outline: none;
  }
`;

interface SongItemProps {
  song: ISong;
}

const SongItem: React.FC<SongItemProps> = ({ song }) => {
  const { isFavorite, toggleFavorite } = useFavorites(song._id);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);

  return (
    <>
      <Card>
        <FavoriteButton onClick={() => toggleFavorite(song)} title="Favorite">
          {isFavorite ? (
            <BiSolidHeart size={20} color="var(--red-primary)" />
          ) : (
            <BiHeart size={20} />
          )}
        </FavoriteButton>
        <MusicIcon />
        <Title>{song.title}</Title>
        <Artist>{song.artist}</Artist>
        <ButtonGroup>
          <ActionButton
            variant="ghost"
            size="sm"
            onClick={() => setPlaylistModalOpen(true)}
          >
            <BiPlus />
          </ActionButton>
          <ActionButton
            variant="ghost"
            size="sm"
            onClick={() => setEditModalOpen(true)}
          >
            <BiEdit />
          </ActionButton>
          <ActionButton
            variant="ghost"
            size="sm"
            onClick={() => setDeleteModalOpen(true)}
          >
            <BiTrash />
          </ActionButton>
        </ButtonGroup>
      </Card>

      <EditSongModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        song={song}
      />
      <DeleteSongModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        song={song}
      />
      <AddToPlaylistModal
        isOpen={playlistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        songId={song._id}
      />
    </>
  );
};

export default SongItem;
