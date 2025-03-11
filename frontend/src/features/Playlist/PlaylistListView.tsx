import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { StyledPlaylists } from "./Playlist";
import PlaylistListViewItem from "./PlaylistListViewItem";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { fetchPlaylistsStart } from "../../redux/slices/playlistSlice";
import { AddNewSongContainer as AddNewPlaylistContainer } from "../../ui/CommonComponents";
import { BiPlus } from "react-icons/bi";
import AddPlaylist from "./AddPlaylist";
import Modal from "../../ui/Modal";
import Loader from "../../ui/Loader";

type Props = {
  songId: string;
  onClose: () => void;
};

const H2 = styled.h2`
  align-self: center;
  color: var(--text-color);
`;

const AddSongButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: #000; /* Text color */
  background-color: var(--green-primary); /* Set to the green color */
  width: clamp(2.5rem, 5vw, 3rem);
  height: clamp(2.5rem, 5vw, 3rem);
  border-radius: 50%;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.3s;

  &:hover {
    transform: scale(1.1); /* Slight scaling effect */
  }
`;

const PlaylistListView: React.FC<Props> = ({ songId, onClose }) => {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const playlists = useSelector((state: RootState) => state.playlists.list);
  const isLoading = useSelector((state: RootState) => state.playlists.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaylistsStart());
  }, [dispatch]);

  function handleAdd() {
    setShowAdd((a) => !a);
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <AddNewPlaylistContainer>
        <AddSongButton onClick={handleAdd}>
          <BiPlus />
        </AddSongButton>
        <H2>Create a Playlist</H2>
      </AddNewPlaylistContainer>
      <StyledPlaylists>
        {playlists.map((playlist) => (
          <PlaylistListViewItem
            key={playlist._id}
            playlist={playlist}
            songId={songId}
            onClose={onClose}
          />
        ))}
      </StyledPlaylists>
      {showAdd && (
        <Modal isOpen={true} onClose={handleAdd}>
          <AddPlaylist onAdd={handleAdd} />
        </Modal>
      )}
    </>
  );
};

export default PlaylistListView;
