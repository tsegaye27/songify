import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { fetchSongsStart } from "../../redux/slices/slice";
import SongItem from "./SongItem";
import styled from "@emotion/styled";

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
    background: #f1f1f1;
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

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.list);

  useEffect(() => {
    document.title = "Songs";
    dispatch(fetchSongsStart());
  }, [dispatch]);

  return (
    <div>
      {songs.length === 0 ? (
        <EmptyListContainer>
          <Title>No Songs yet...</Title>
          <Title>Try adding some!</Title>
        </EmptyListContainer>
      ) : (
        <StyledSongList>
          {songs.map((song) => (
            <SongItem key={song._id} song_Id={song._id} song={song} />
          ))}
        </StyledSongList>
      )}
    </div>
  );
};

export default SongList;
