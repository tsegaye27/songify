import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { StyledPlaylists } from "./Playlist";
import PlaylistListViewItem from "./PlaylistListViewItem";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { fetchPlaylistsStart } from "../../redux/slices/playlistSlice";
import {
  AddNewSongContainer as AddNewPlaylistContainer,
  AddSongButton as AddPlaylistButton,
} from "../SongList/SongList";
import { BiPlus } from "react-icons/bi";
import AddPlaylist from "./AddPlaylist";
import Modal from "../../ui/Modal";

interface Props {
  songId: string;
}

const H2 = styled.h2`
  align-self: center;
  color: white;
`;

const PlaylistListView: React.FC<Props> = ({ songId }) => {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const playlists = useSelector((state: RootState) => state.playlists.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaylistsStart());
  }, [dispatch]);

  function handleAdd() {
    setShowAdd((a) => !a);
  }

  return (
    <>
      <AddNewPlaylistContainer>
        <AddPlaylistButton onClick={handleAdd}>
          <BiPlus />
        </AddPlaylistButton>
        <H2>Create a Playlist</H2>
      </AddNewPlaylistContainer>
      <StyledPlaylists>
        {playlists.map((playlist) => (
          <PlaylistListViewItem
            key={playlist._id}
            playlist={playlist}
            songId={songId}
          />
        ))}
      </StyledPlaylists>
      {showAdd && (
        <Modal onClose={handleAdd}>
          <AddPlaylist onAdd={handleAdd} />
        </Modal>
      )}
    </>
  );
};

export default PlaylistListView;
