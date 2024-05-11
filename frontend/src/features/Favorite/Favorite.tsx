import React, { useEffect } from "react";

interface FavoriteProps {
  searchQuery: string;
}

const Favorite: React.FC<FavoriteProps> = ({ searchQuery }) => {
  useEffect(() => {
    document.title = "Favorites";
  }, []);
  return <div>Favorite</div>;
};

export default Favorite;
