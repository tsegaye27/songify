import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { fetchPlaylistsStart } from "../../redux/slices/playlistSlice";
import {
  EmptyListContainer,
  Title,
  AddSongButton as AddPlaylistButton,
  AddNewSongContainer as AddNewPlaylistContainer,
} from "../SongList/SongList";
import { BiPlus } from "react-icons/bi";
import Modal from "../../ui/Modal";
import AddPlaylist from "./AddPlaylist";
import styled from "@emotion/styled";
import PlaylistItem from "./PlaylistItem";
import PlaylistItemDetails from "./PlaylistItemDetails";
import { TypePlaylist } from "../../redux/types";

const H2 = styled.h2`
  align-self: center;
  color: white;
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
                {playlists.map((playlist) => (
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
        <Modal onClose={handleCloseModal}>
          <AddPlaylist onAdd={handleAdd} />
        </Modal>
      )}
    </div>
  );
};

export default Playlist;
