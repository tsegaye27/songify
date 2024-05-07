import React from "react";
import { Link } from "react-router-dom";

const SideNav: React.FC = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <br />
      <Link to="/songs/add">Add Song</Link>
      <br />
      <Link to="/songs/edit/:id">Edit Song</Link>
      <br />
      <Link to="/songs">Songs</Link>
    </div>
  );
};

export default SideNav;
