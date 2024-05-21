import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RootState from "../../redux/RootState";
import { addPlaylist } from "../../redux/slices/playlistSlice";
import PlaylistItem from "./PlaylistItem";
import Modal from "../../ui/Modal";
import AddPlaylist from "./AddPlaylist";

const Playlist: React.FC = () => {
  const playlists = useSelector((state: RootState) => state.playlist.list);
  const dispatch = useDispatch();
  const [showAddPlaylist, setShowAddPlaylist] = useState(false);

  const hasPlaylists = playlists.length > 0;
  const addButtonPosition = hasPlaylists ? "flex-start" : "center";

  useEffect(() => {
    // Load playlists from local storage (if implemented)
  }, []);

  const handleAddPlaylist = () => {
    setShowAddPlaylist(true);
  };

  // const handleAddPlaylistSubmit = (newPlaylistName: string) => {
  //   dispatch(addPlaylist({}));
  //   setShowAddPlaylist(false);
  // };

  return (
    <div className="playlist-container">
      {hasPlaylists ? (
        <>
          <button
            style={{ justifyContent: addButtonPosition }}
            onClick={handleAddPlaylist}
          >
            Add Playlist
          </button>
          <div className="playlist-grid">
            {playlists.map((playlist) => (
              <PlaylistItem key={playlist.name} playlist={playlist} />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-playlist">
          <button onClick={handleAddPlaylist}>Add Playlist</button>
        </div>
      )}
      {showAddPlaylist && (
        <Modal>
          <AddPlaylist />
        </Modal>
      )}
    </div>
  );
};

export default Playlist;
