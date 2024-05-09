import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      Songify
      <Link to="/songs">go to Songs</Link>
    </div>
  );
};

export default Home;
