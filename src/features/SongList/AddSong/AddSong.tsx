import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSongStart } from "../../redux/slices/slice";
import { v4 as uuidv4 } from "uuid";

const AddSong: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "" || body.trim() === "") return;
    const id = uuidv4();
    dispatch(addSongStart({ id, title, body }));
    setTitle("");
    setBody("");
  };
  return (
    <div>
      <h1>Add Song</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter the Artist"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <br />
        <button type="submit">Add Song</button>
      </form>
    </div>
  );
};

export default AddSong;
