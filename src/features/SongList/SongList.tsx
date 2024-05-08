import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { fetchSongsStart } from "../../redux/slices/slice";
import SongItem from "./SongItem";
import styled from "@emotion/styled";

const StyledSongList = styled.ul`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.list);
  console.log(songs);

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  return (
    <div>
      <StyledSongList>
        {songs.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
        {
          // Offline mode
        }
        {/* <div>
          <li>Sample Title</li>
          <li>Sample Artist</li>
          <button>Edit</button>
        </div>
        <div>
          <li>Sample Title</li>
          <li>Sample Artist</li>
          <button>Edit</button>
        </div>
        <div>
          <li>Sample Title</li>
          <li>Sample Artist</li>
          <button>Edit</button>
        </div> */}
      </StyledSongList>
    </div>
  );
};

export default SongList;
