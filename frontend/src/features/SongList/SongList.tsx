import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { fetchSongsStart } from "../../redux/slices/slice";
import SongItem from "./SongItem";
import styled from "@emotion/styled";
import { BiPlus } from "react-icons/bi";
import AddSong from "./AddSong/AddSong";
import Modal from "../../ui/Modal";

const StyledSongList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const Title = styled.h3`
  font-size: 20px;
  font-family: monospace;
  color: #ccc;
  margin: 1rem;
  width: 100%;
  text-align: center;
`;

export const EmptyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const AddSongButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: #222;
  background-color: #09d371;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #5fe4a4;
  }
`;

const H2 = styled.h2`
  align-self: center;
  color: white;
`;

export const AddNewSongContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const SongList: React.FC = () => {
  const dispatch = useDispatch();
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

  console.log(searchQuery);
  useEffect(() => {
    document.title = "Songs";
    dispatch(fetchSongsStart());
  }, [dispatch]);

  function handleAdd() {
    setIsAddSongClicked((a) => !a);
  }

  return (
    <div>
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
        <Modal>
          <AddSong onAdd={handleAdd} />
        </Modal>
      )}
    </div>
  );
};

export default SongList;
