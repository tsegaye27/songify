import React, { useEffect } from "react";
import { StyledPlaylists } from "./Playlist";
import PlaylistListViewItem from "./PlaylistListViewItem";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { fetchPlaylistsStart } from "../../redux/slices/playlistSlice";

interface Props {
  songId: string;
}

const PlaylistListView: React.FC<Props> = ({ songId }) => {
  const playlists = useSelector((state: RootState) => state.playlists.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaylistsStart());
  }, [dispatch]);

  return (
    <StyledPlaylists>
      <>
        {playlists.map((playlist) => (
          <PlaylistListViewItem
            key={playlist._id}
            playlist={playlist}
            songId={songId}
          />
        ))}
      </>
    </StyledPlaylists>
  );
};

export default PlaylistListView;
