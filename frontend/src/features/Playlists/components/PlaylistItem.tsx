import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { IPlaylist } from "../../../app/models/playlist";
import { BiEdit, BiTrash, BiRightArrowAlt } from "react-icons/bi";
import { BsCollectionPlay } from "react-icons/bs";
import { Button } from "../../../ui";
import EditPlaylistModal from "./EditPlaylistModal";
import DeletePlaylistModal from "./DeletePlaylistModal";

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
  min-height: 200px;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
  }
`;

const PlaylistIcon = styled(BsCollectionPlay)`
  font-size: 3rem;
  color: var(--text-color-secondary);
  margin-bottom: 1rem;
`;

const Name = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const SongCount = styled.p`
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

const ViewButton = styled(Button)`
  margin-bottom: 1rem;
`;

interface PlaylistItemProps {
  playlist: IPlaylist;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ playlist }) => {
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleViewPlaylist = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/playlists/${playlist._id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditModalOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
  };

  return (
    <>
      <Card onClick={handleViewPlaylist}>
        <PlaylistIcon />
        <Name>{playlist.name}</Name>
        <SongCount>{playlist.songs?.length || 0} songs</SongCount>

        <ViewButton variant="primary" size="sm" onClick={handleViewPlaylist}>
          <BiRightArrowAlt /> View Playlist
        </ViewButton>

        <ButtonGroup>
          <ActionButton variant="ghost" size="sm" onClick={handleEditClick}>
            <BiEdit />
          </ActionButton>
          <ActionButton variant="ghost" size="sm" onClick={handleDeleteClick}>
            <BiTrash />
          </ActionButton>
        </ButtonGroup>
      </Card>

      <EditPlaylistModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        playlist={playlist}
      />
      <DeletePlaylistModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        playlist={playlist}
      />
    </>
  );
};

export default PlaylistItem;
