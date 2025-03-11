import React, { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { TypePlaylist } from "../../redux/types";
import { CgPlayList } from "react-icons/cg";
import styled from "@emotion/styled";
import { BiEdit, BiTrash } from "react-icons/bi";
import { DeleteButton, EditButton } from "../SongList/SongItem";
import DeletePlaylist from "./DeletePlaylist";
import Modal from "../../ui/Modal";
import EditPlaylist from "./EditPlaylist";

type Props = {
  playlist: TypePlaylist;
  onSelected: () => void;
};

const Title = styled.h3`
  font-size: 18px; /* Slightly smaller font size for better readability */
  margin: 0; /* Remove margin for better alignment */
  color: var(--text-color);
`;

const SongCount = styled.p`
  font-size: 14px; /* Smaller font size for song count */
  margin: 0; /* Remove margin for better alignment */
  color: var(--text-color);
  opacity: 0.7; /* Slightly faded for subtlety */
`;

const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column; /* Stack title and song count vertically */
  margin-left: 12px; /* Space between logo and info */
`;

const StyledPlaylistItem = styled.div`
  display: flex;
  align-items: center; /* Align items in the center */
  background-color: var(--second-background-color);
  color: var(--text-color);
  padding: 10px; /* Increased padding for better touch targets */
  margin: 2px 0; /* Space between playlist items */
  border-radius: 10px; /* More pronounced rounding for modern look */
  cursor: pointer;
  transition:
    transform 0.2s ease,
    color 0.3s ease;

  &:hover {
    color: #222; /* Change background on hover */
  }
`;

export const PlaylistLogo = styled(CgPlayList)`
  font-size: 3rem;
  color: var(--text-color);
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
          <PlaylistInfo>
            <Title>{playlist.name}</Title>
            <SongCount>{playlist.songs?.length} Songs</SongCount>
          </PlaylistInfo>
        </PlaylistDetailContainer>
        <ButtonContainer>
          <DeleteButton
            data-tooltip-id="deletePlaylist"
            data-tooltip-content="Delete Playlist"
            data-tooltip-place="bottom"
            bgColor={`transparent`}
            marginRight={"5px"}
            onClick={handleDelete}
          >
            <Icon>
              <BiTrash />
            </Icon>
          </DeleteButton>
          <ReactTooltip id="deletePlaylist" />
          <EditButton
            data-tooltip-id="editPlaylist"
            data-tooltip-content="Edit Playlist"
            data-tooltip-place="bottom"
            bgColor={`transparent`}
            marginRight={"5px"}
            onClick={handleEdit}
          >
            <Icon>
              <BiEdit />
            </Icon>
          </EditButton>
          <ReactTooltip id="editPlaylist" />
        </ButtonContainer>
      </StyledPlaylistItem>
      {showDelete && (
        <Modal isOpen={true} onClose={handleClose}>
          <DeletePlaylist playlist={playlist} onDelete={handleDelete} />
        </Modal>
      )}
      {showEdit && (
        <Modal isOpen={true} onClose={handleClose}>
          <EditPlaylist playlist={playlist} onEdit={handleEdit} />
        </Modal>
      )}
    </>
  );
};

export default PlaylistItem;
