import React, { useState } from "react";
import { updateSongStart } from "../../redux/slices/slice";
import { useDispatch } from "react-redux";

interface EditSongProps {
  songId: string;
}

const EditSong: React.FC<EditSongProps> = ({ songId }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim() === "" || body.trim() === "") return;
    dispatch(updateSongStart({ id: songId, title, body }));
  }

  return (
    <div>
      <h3>Edit Song</h3>
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
        <button type="submit">Update Song</button>
      </form>
    </div>
  );
};

export default EditSong;
