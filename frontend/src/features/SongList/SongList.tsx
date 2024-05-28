import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { fetchSongsStart } from "../../redux/slices/slice";
import SongItem from "./SongItem";
import styled from "@emotion/styled";
import { BiPlus } from "react-icons/bi";
import AddSong from "./AddSong";
import Modal from "../../ui/Modal";

export const StyledSongList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: clamp(0.5rem, 1vw, 1rem);
  padding: clamp(0.5rem, 1vw, 1rem);
  justify-content: center;
  align-items: center;
  margin-top: clamp(0.5rem, 1vw, 1rem);

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }
`;
export const Title = styled.h3`
  font-size: clamp(16px, 2vw, 20px);
  font-family: monospace;
  color: var(--text-color-secondary);
  margin: 1rem;
  width: 100%;
  text-align: center;
`;

const H2 = styled.h2`
  align-self: center;
  color: var(--text-color);
  font-size: clamp(18px, 2.5vw, 24px);
`;

export const EmptyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const AddSongButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--primary-color);
  background-color: #09d371;
  width: clamp(2.5rem, 5vw, 3rem);
  height: clamp(2.5rem, 5vw, 3rem);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #5fe4a4;
  }
`;

export const AddNewSongContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.songs.loading);
  const songs = useSelector((state: RootState) => state.songs.list);
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const filteredSongs = searchQuery
    ? songs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : songs;
  const [isAddSongClicked, setIsAddSongClicked] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Songs";
    dispatch(fetchSongsStart());
  }, [dispatch]);

  function handleAdd() {
    setIsAddSongClicked((a) => !a);
  }

  function handleClose() {
    setIsAddSongClicked(false);
  }

  if (isLoading) return <Title>Loading...</Title>;

  return (
    <>
      {songs.length === 0 ? (
        <EmptyListContainer>
          <Title>No Songs yet...</Title>
          <Title>Try adding some!</Title>
          <AddSongButton onClick={handleAdd}>
            <BiPlus />
          </AddSongButton>
        </EmptyListContainer>
      ) : (
        <>
          <AddNewSongContainer>
            <AddSongButton onClick={handleAdd}>
              <BiPlus />
            </AddSongButton>
            <H2>Add a Song</H2>
          </AddNewSongContainer>
          <StyledSongList>
            {filteredSongs.map((song) => (
              <SongItem key={song._id} song={song} />
            ))}
          </StyledSongList>
        </>
      )}
      {isAddSongClicked && (
        <Modal onClose={handleClose}>
          <AddSong onAdd={handleAdd} />
        </Modal>
      )}
    </>
  );
};

export default SongList;
