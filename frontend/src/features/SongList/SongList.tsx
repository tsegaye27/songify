import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import RootState from "../../redux/RootState";
import SongItem from "./SongItem";

const StyledSongList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
`;

const SongList: React.FC = () => {
  const songs = useSelector((state: RootState) => state.songs.list);

  const memoizedSongs = useMemo(() => songs, [songs]);

  return (
    <StyledSongList>
      {memoizedSongs.length > 0 ? (
        memoizedSongs.map((song) => <SongItem key={song._id} song={song} />)
      ) : (
        <p>No songs found.</p>
      )}
    </StyledSongList>
  );
};

export default SongList;
