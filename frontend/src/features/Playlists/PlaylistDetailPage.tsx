import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { BiArrowBack, BiPlus, BiTrash, BiEdit } from "react-icons/bi";
import { BsCollectionPlay } from "react-icons/bs";
import { Button, Loader, EmptyState } from "../../ui";
import RootState from "../../redux/RootState";
import {
  fetchPlaylistsStart,
  removeSongFromPlaylistStart,
} from "../../redux/slices/playlistSlice";
import EditPlaylistModal from "./components/EditPlaylistModal";
import AddSongsToPlaylistModal from "./components/AddSongsToPlaylistModal";
import { ISong } from "../../app/models/song";

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BackButton = styled(Button)`
  padding: 0.75rem;
`;

const PlaylistInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
`;

const PlaylistIcon = styled(BsCollectionPlay)`
  font-size: 4rem;
  color: var(--primary-color);
`;

const PlaylistDetails = styled.div``;

const PlaylistName = styled.h1`
  color: var(--text-color);
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
`;

const PlaylistMeta = styled.div`
  color: var(--text-color-secondary);
  font-size: 0.875rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const SongsContainer = styled.div`
  background-color: var(--second-background-color);
  border-radius: var(--radius-lg);
  border: 1px solid var(--accent-color);
`;

const SongsHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--accent-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SongsTitle = styled.h2`
  color: var(--text-color);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const SongsList = styled.div`
  padding: 1rem;
`;

const SongItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--accent-color);
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

const RemoveButton = styled(Button)`
  padding: 0.5rem;
`;

const PlaylistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: playlists, loading } = useSelector(
    (state: RootState) => state.playlists,
  );
  const [isAddSongModalOpen, setAddSongModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const playlist = playlists.find((p) => p._id === id);

  useEffect(() => {
    // Always fetch playlists to ensure we have the latest data including populated songs
    dispatch(fetchPlaylistsStart());
  }, [dispatch, id]);

  const handleRemoveSong = (songId: string) => {
    if (playlist) {
      dispatch(
        removeSongFromPlaylistStart({
          playlistId: playlist._id,
          songId,
        }),
      );
    }
  };

  if (loading || !playlist) {
    return <Loader message="Loading playlist..." />;
  }

  const songs = playlist.songs as ISong[];

  return (
    <>
      <Header>
        <BackButton variant="ghost" onClick={() => navigate("/playlists")}>
          <BiArrowBack />
        </BackButton>

        <PlaylistInfo>
          <PlaylistIcon />
          <PlaylistDetails>
            <PlaylistName>{playlist.name}</PlaylistName>
            <PlaylistMeta>
              {songs.length} songs • {playlist.isPublic ? "Public" : "Private"}
              {playlist.description && ` • ${playlist.description}`}
            </PlaylistMeta>
          </PlaylistDetails>
        </PlaylistInfo>

        <Actions>
          <Button variant="secondary" onClick={() => setEditModalOpen(true)}>
            <BiEdit /> Edit
          </Button>
          <Button variant="primary" onClick={() => setAddSongModalOpen(true)}>
            <BiPlus /> Add Songs
          </Button>
        </Actions>
      </Header>

      <SongsContainer>
        <SongsHeader>
          <SongsTitle>Songs</SongsTitle>
        </SongsHeader>

        <SongsList>
          {songs.length === 0 ? (
            <EmptyState
              title="No songs in this playlist"
              description="Add some songs to get started!"
            />
          ) : (
            songs.map((song) => (
              <SongItem key={song._id}>
                <SongInfo>
                  <SongTitle>{song.title}</SongTitle>
                  <SongMeta>
                    {song.artist}
                    {song.album && ` • ${song.album}`}
                    {song.genre && ` • ${song.genre}`}
                  </SongMeta>
                </SongInfo>
                <RemoveButton
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSong(song._id)}
                >
                  <BiTrash />
                </RemoveButton>
              </SongItem>
            ))
          )}
        </SongsList>
      </SongsContainer>

      <AddSongsToPlaylistModal
        isOpen={isAddSongModalOpen}
        onClose={() => setAddSongModalOpen(false)}
        playlistId={playlist._id}
      />

      <EditPlaylistModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        playlist={playlist}
      />
    </>
  );
};

export default PlaylistDetailPage;
