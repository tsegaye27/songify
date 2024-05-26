import React, { useState } from "react";
import { TypePlaylist } from "../../redux/types";
import { useDispatch } from "react-redux";
import { CgPlayList } from "react-icons/cg";
import styled from "@emotion/styled";
import { BiEdit, BiTrash } from "react-icons/bi";
import { DeleteButton, EditButton } from "../SongList/SongItem";

interface Props {
  playlist: TypePlaylist;
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
  cursor: pointer;
  transition: transform 0.4s ease;

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
  justify-content: first baseline;
  align-items: center;
  width: 50%;
`;

const PlaylistItem: React.FC<Props> = ({ playlist }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const songsInsidePlaylist = playlist.songs;
  const dispatch = useDispatch();

  function handleSelected() {
    console.log(playlist);
  }
  return (
    <StyledPlaylistItem onClick={handleSelected}>
      <PlaylistDetailContainer>
        <PlaylistLogo />
        <Title>{playlist.name}</Title>
      </PlaylistDetailContainer>
      <ButtonContainer>
        <DeleteButton
          background-color={`var(--accent-color)`}
          margin-right={"5px"}
        >
          <Icon>
            <BiTrash />
          </Icon>
        </DeleteButton>
        <EditButton
          background-color={`var(--accent-color)`}
          margin-right={"5px"}
        >
          <Icon>
            <BiEdit />
          </Icon>
        </EditButton>
      </ButtonContainer>
    </StyledPlaylistItem>
  );
};

export default PlaylistItem;
