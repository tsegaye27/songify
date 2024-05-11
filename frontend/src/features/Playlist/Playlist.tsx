import React, { useEffect } from "react";

const Playlist: React.FC = () => {
  useEffect(() => {
    document.title = "Playlist";
  }, []);
  return <div>Playlist</div>;
};

export default Playlist;
