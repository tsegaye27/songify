import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Loader, EmptyState } from "../../../ui";
import { fetchSongsStart } from "../../../redux/slices/songSlice";
import { addSongToPlaylistStart } from "../../../redux/slices/playlistSlice";
import RootState from "../../../redux/RootState";
import styled from "@emotion/styled";
import { BiPlus } from "react-icons/bi";

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow-y: auto;
`;

const ListItem = styled.li`
  padding: 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  border-bottom: 1px solid var(--accent-color);

  &:hover {
    background-color: var(--accent-color);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const SongInfo = styled.div``;

const SongTitle = styled.div`
  color: var(--text-color);
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const SongMeta = styled.div`
  color: var(--text-color-secondary);
  font-size: 0.875rem;
`;

interface AddSongsToPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlistId: string;
}

const AddSongsToPlaylistModal: React.FC<AddSongsToPlaylistModalProps> = ({
  isOpen,
  onClose,
  playlistId,
}) => {
  const dispatch = useDispatch();
  const { songs, loading } = useSelector((state: RootState) => state.songs);
  const { list: playlists } = useSelector(
    (state: RootState) => state.playlists,
  );

  const playlist = playlists.find((p) => p._id === playlistId);
  const playlistSongIds =
    playlist?.songs.map((song) =>
      typeof song === "string" ? song : song._id,
    ) || [];

  // Filter out songs that are already in the playlist
  const availableSongs = songs.filter(
    (song) => !playlistSongIds.includes(song._id),
  );

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchSongsStart());
    }
  }, [isOpen, dispatch]);

  const handleSelectSong = (songId: string) => {
    dispatch(addSongToPlaylistStart({ playlistId, songId }));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Songs to Playlist">
      {loading ? (
        <Loader />
      ) : availableSongs.length === 0 ? (
        <EmptyState
          icon={<BiPlus />}
          title="No Available Songs"
          description="All songs are already in this playlist or you have no songs to add."
        />
      ) : (
        <List>
          {availableSongs.map((song) => (
            <ListItem key={song._id} onClick={() => handleSelectSong(song._id)}>
              <SongInfo>
                <SongTitle>{song.title}</SongTitle>
                <SongMeta>
                  {song.artist}
                  {song.album && ` • ${song.album}`}
                  {song.genre && ` • ${song.genre}`}
                </SongMeta>
              </SongInfo>
            </ListItem>
          ))}
        </List>
      )}
    </Modal>
  );
};

export default AddSongsToPlaylistModal;
