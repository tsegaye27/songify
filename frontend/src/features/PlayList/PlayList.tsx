import React, { useEffect } from "react";

interface PlayListProps {
  searchQuery: string;
}

const PlayList: React.FC<PlayListProps> = ({ searchQuery }) => {
  useEffect(() => {
    document.title = "Playlist";
  }, []);
  return <div>PlayList</div>;
};

export default PlayList;
