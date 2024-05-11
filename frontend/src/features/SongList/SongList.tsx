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

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #3e3a3a;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  font-family: monospace;
  color: #ccc;
  margin: 1rem;
  width: 100%;
`;

const EmptyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const AddSongButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: #222;
  background-color: #5fe4a4;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #bbf1dd;
  }
`;

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.list);
  const [isAddSongClicked, setIsAddSongClicked] = useState<boolean>(false);

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
          <AddSongButton onClick={handleAdd}>
            <BiPlus />
          </AddSongButton>
          <StyledSongList>
            {songs.map((song) => (
              <SongItem key={song._id} song_Id={song._id} song={song} />
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
