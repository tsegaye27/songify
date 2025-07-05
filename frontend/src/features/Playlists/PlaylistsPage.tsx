import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylistsStart } from "../../redux/slices/playlistSlice";
import RootState from "../../redux/RootState";
import { Loader, EmptyState, Button } from "../../ui";
import { BiPlus, BiCollection } from "react-icons/bi";
import PlaylistItem from "./components/PlaylistItem";
import AddPlaylistModal from "./components/AddPlaylistModal";
import styled from "@emotion/styled";

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: var(--text-color);
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const PlaylistsPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    list: playlists,
    loading,
    error,
  } = useSelector((state: RootState) => state.playlists);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPlaylistsStart());
  }, [dispatch]);

  if (loading && playlists.length === 0) {
    return <Loader message="Loading your playlists..." />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <PageHeader>
        <PageTitle>Playlists</PageTitle>
        <Button variant="primary" onClick={() => setAddModalOpen(true)}>
          <BiPlus /> Create Playlist
        </Button>
      </PageHeader>

      {playlists.length === 0 ? (
        <EmptyState
          icon={<BiCollection />}
          title="No Playlists Yet"
          description="Create your first playlist to start organizing your music."
        />
      ) : (
        <Grid>
          {playlists.map((playlist) => (
            <PlaylistItem key={playlist._id} playlist={playlist} />
          ))}
        </Grid>
      )}

      <AddPlaylistModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
    </>
  );
};

export default PlaylistsPage;
