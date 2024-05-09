import React, { useState } from "react";
import { updateSongStart } from "../../../redux/slices/slice";
import { useDispatch } from "react-redux";

interface EditSongProps {
  songId: string;
  onUpdate: (songId: string | null) => void;
}

const EditSong: React.FC<EditSongProps> = ({ songId, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim() === "" || body.trim() === "") return;
    dispatch(updateSongStart({ id: songId, title, body }));
    setTitle("");
    setBody("");
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
          required
        />
        <br />
        <input
          type="text"
          placeholder="Enter the Artist"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <br />
        <button
          onClick={() => {
            if (!title || !body) return;
            onUpdate(null);
          }}
          type="submit"
        >
          Update Song
        </button>
      </form>
    </div>
  );
};

export default EditSong;
