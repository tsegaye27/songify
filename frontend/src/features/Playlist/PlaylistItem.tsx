import React, { useState } from "react";
import { TypePlaylist } from "../../redux/types";
import { CgPlayList } from "react-icons/cg";
import styled from "@emotion/styled";
import { BiEdit, BiTrash } from "react-icons/bi";
import { DeleteButton, EditButton } from "../SongList/SongItem";
import DeletePlaylist from "./DeletePlaylist";
import Modal from "../../ui/Modal";
import EditPlaylist from "./EditPlaylist";

interface Props {
  playlist: TypePlaylist;
  onSelected: () => void;
}

const Title = styled.h3`
  font-size: 20px;
  margin: 0;
  text-align: center;
`;

export const StyledPlaylistItem = styled.div`
  margin: 0;
  padding: 0;
  color: white;
  display: flex;
  background-color: var(--accent-color);
  align-items: center;
  border-radius: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const PlaylistLogo = styled(CgPlayList)`
  font-size: 3rem;
  color: white;
  margin: 0;
  padding: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: flex-end;
`;

const Icon = styled.span`
  font-size: 24px;
`;

const PlaylistDetailContainer = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: first baseline;
  align-items: center;
  width: 50%;
`;

const PlaylistItem: React.FC<Props> = ({ playlist, onSelected }) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  function handleSelected() {
    console.log(playlist);
    onSelected();
  }

  function handleDelete() {
    setShowDelete((prev) => !prev);
  }

  function handleClose() {
    setShowDelete(false);
    setShowEdit(false);
  }

  function handleEdit() {
    setShowEdit((prev) => !prev);
  }
  return (
    <>
      <StyledPlaylistItem>
        <PlaylistDetailContainer onClick={handleSelected}>
          <PlaylistLogo />
          <Title>{playlist.name}</Title>
        </PlaylistDetailContainer>
        <ButtonContainer>
          <DeleteButton
            background-color={`var(--accent-color)`}
            margin-right={"5px"}
          >
            <Icon onClick={handleDelete}>
              <BiTrash />
            </Icon>
          </DeleteButton>
          <EditButton
            background-color={`var(--accent-color)`}
            margin-right={"5px"}
          >
            <Icon onClick={handleEdit}>
              <BiEdit />
            </Icon>
          </EditButton>
        </ButtonContainer>
      </StyledPlaylistItem>
      {showDelete && (
        <Modal onClose={handleClose}>
          <DeletePlaylist playlist={playlist} onDelete={handleDelete} />
        </Modal>
      )}
      {showEdit && (
        <Modal onClose={handleClose}>
          <EditPlaylist playlist={playlist} onEdit={handleEdit} />
        </Modal>
      )}
    </>
  );
};

export default PlaylistItem;
