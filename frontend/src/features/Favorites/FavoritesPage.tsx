import React from "react";
import { useFavorites } from "../Songs/hooks/useFavorites";
import { EmptyState } from "../../ui";
import { BiHeart } from "react-icons/bi";
import SongItem from "../Songs/components/SongItem";
import styled from "@emotion/styled";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <>
      {favorites.length === 0 ? (
        <EmptyState
          icon={<BiHeart />}
          title="No Favorite Songs"
          description="You haven't added any songs to your favorites yet. Click the heart icon on a song to add it here."
        />
      ) : (
        <Grid>
          {favorites.map((song) => (
            <SongItem key={song._id} song={song} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default FavoritesPage;
