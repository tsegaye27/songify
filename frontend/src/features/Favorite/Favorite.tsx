import React, { useEffect } from "react";

const Favorite: React.FC = () => {
  useEffect(() => {
    document.title = "Favorites";
  }, []);
  return <div>Favorite</div>;
};

export default Favorite;
