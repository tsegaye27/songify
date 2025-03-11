import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { fetchPlaylistsStart } from "../../redux/slices/playlistSlice";
import {
  EmptyListContainer,
  AddSongButton as AddPlaylistButton,
  AddNewSongContainer as AddNewPlaylistContainer,
} from "../SongList/SongList";
import { BiPlus } from "react-icons/bi";
import Modal, { Title } from "../../ui/Modal";
import styled from "@emotion/styled";
import { TypePlaylist } from "../../redux/types";
import Loader from "../../ui/Loader";

const PlaylistItem = React.lazy(() => import("./PlaylistItem"));
const PlaylistItemDetails = React.lazy(() => import("./PlaylistItemDetails"));
const AddPlaylist = React.lazy(() => import("./AddPlaylist"));

const H2 = styled.h2`
  align-self: center;
  color: var(--text-color);
`;

export const StyledPlaylists = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const Playlist: React.FC = () => {
  const playlists = useSelector((state: RootState) => state.playlists.list);
  const { loading } = useSelector((state: RootState) => state.playlists);
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const filteredPlaylist = searchQuery
    ? playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : playlists;
  const [isAddPlaylistClicked, setIsAddPlaylistClicked] =
    useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<TypePlaylist>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaylistsStart());
  }, [dispatch]);

  function handleAdd() {
    setIsAddPlaylistClicked((a) => !a);
  }

  function handleCloseModal() {
    setIsAddPlaylistClicked(false);
  }

  function handleSelected(playlist: TypePlaylist | null) {
    setIsSelected((prev) => !prev);
    if (playlist === null) return;
    setSelectedPlaylist(playlist);
  }

  if (loading) return <Loader />;

  return (
    <>
      {playlists.length === 0 ? (
        <EmptyListContainer>
          <AddPlaylistButton title="Add Playlist" onClick={handleAdd}>
            <BiPlus />
          </AddPlaylistButton>
          <br />
          <Title>No Playlists yet...</Title>
        </EmptyListContainer>
      ) : (
        <>
          {isSelected ? (
            <PlaylistItemDetails
              playlist={selectedPlaylist!}
              onReturn={() => handleSelected(null)}
            />
          ) : (
            <>
              <AddNewPlaylistContainer>
                <AddPlaylistButton onClick={handleAdd}>
                  <BiPlus />
                </AddPlaylistButton>
                <H2>Create a Playlist</H2>
              </AddNewPlaylistContainer>
              <StyledPlaylists>
                {filteredPlaylist.map((playlist) => (
                  <PlaylistItem
                    key={playlist._id}
                    playlist={playlist}
                    onSelected={() => handleSelected(playlist)}
                  />
                ))}
              </StyledPlaylists>
            </>
          )}
        </>
      )}
      {isAddPlaylistClicked && (
        <Modal isOpen={true} onClose={handleCloseModal}>
          <AddPlaylist onAdd={handleAdd} />
        </Modal>
      )}
    </>
  );
};

export default Playlist;
