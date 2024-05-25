import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { fetchPlaylistsStart } from "../../redux/slices/playlistSlice";
import {
  EmptyListContainer,
  Title,
  AddSongButton as AddPlaylistButton,
  AddNewSongContainer as AddNewPlaylistContainer,
  StyledSongList as StyledPlaylists,
} from "../SongList/SongList";
import { BiPlus } from "react-icons/bi";
import Modal from "../../ui/Modal";
import AddPlaylist from "./AddPlaylist";
import styled from "@emotion/styled";

const H2 = styled.h2`
  align-self: center;
  color: white;
`;

const Playlist: React.FC = () => {
  const playlists = useSelector((state: RootState) => state.playlists.list);
  const [isAddPlaylistClicked, setIsAddPlaylistClicked] =
    useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaylistsStart());
  }, [dispatch]);

  function handleAdd() {
    setIsAddPlaylistClicked((a) => !a);
  }

  return (
    <div>
      {playlists.length === 0 ? (
        <EmptyListContainer>
          <Title>No Playlists yet...</Title>
          <Title>Try adding some!</Title>
          <AddPlaylistButton onClick={handleAdd}>
            <BiPlus />
          </AddPlaylistButton>
        </EmptyListContainer>
      ) : (
        <>
          <AddNewPlaylistContainer>
            <AddPlaylistButton onClick={handleAdd}>
              <BiPlus />
            </AddPlaylistButton>
            <H2>Create a Playlist</H2>
          </AddNewPlaylistContainer>
          <StyledPlaylists>
            {playlists.map((playlist) => (
              <div key={playlist._id}>{playlist.name}</div>
            ))}
          </StyledPlaylists>
        </>
      )}
      {isAddPlaylistClicked && (
        <Modal>
          <AddPlaylist onAdd={handleAdd} />
        </Modal>
      )}
    </div>
  );
};

export default Playlist;
