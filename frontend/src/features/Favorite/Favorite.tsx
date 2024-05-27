import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import SongItem from "../SongList/SongItem";
import styled from "@emotion/styled";

const StyledFavorite = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const H2 = styled.h2`
  text-align: center;
  color: var(--text-color);
`;

const Favorite: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.favList);
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const filteredList = favorites.filter((song) => {
    const title = song.title || "";
    const artist = song.artist || "";
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  useEffect(() => {
    document.title = "Favorites";
  }, []);

  return (
    <>
      {filteredList.length === 0 ? (
        <H2>No Favorite Songs yet...</H2>
      ) : (
        <StyledFavorite>
          {filteredList.map((song) => (
            <SongItem key={song._id} song={song} />
          ))}
        </StyledFavorite>
      )}
    </>
  );
};

export default Favorite;
