import React, { useEffect } from "react";

const PlayList: React.FC = () => {
  useEffect(() => {
    document.title = "Playlist";
  }, []);
  return <div>PlayList</div>;
};

export default PlayList;
