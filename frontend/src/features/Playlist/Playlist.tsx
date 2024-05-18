import React, { useEffect, useState } from "react";
import {
  AddSongButton as AddPlaylistButton,
  Title,
} from "../SongList/SongList";
import { BiPlus } from "react-icons/bi";
import styled from "@emotion/styled";
import Modal from "../../ui/Modal";
import AddPlaylist from "./AddPlaylist";
import { useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import PlaylistItem from "./PlaylistItem";

const StyledPlaylist = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const Playlist: React.FC = () => {
  const [isAddPlaylistClicked, setIsAddPlaylistClicked] =
    useState<boolean>(false);
  const list = useSelector((state: RootState) => state.playlist.listOfPlaylist);
  useEffect(() => {
    document.title = "Playlist";
  }, []);
  function handleAddPlaylist() {
    setIsAddPlaylistClicked((b) => !b);
  }
  return (
    <div>
      {list.length === 0 ? (
        <StyledPlaylist>
          <Title>No Playlist yet, Start by creating a new one</Title>
          <AddPlaylistButton onClick={handleAddPlaylist}>
            <BiPlus />
          </AddPlaylistButton>
        </StyledPlaylist>
      ) : (
        <>
          {list.map((item) => (
            <PlaylistItem key={item.name} item={item} />
          ))}
        </>
      )}
      {isAddPlaylistClicked && (
        <Modal>
          <AddPlaylist />
        </Modal>
      )}
    </div>
  );
};

export default Playlist;
