import React, { useState } from "react";
import { Title } from "../SongList/SongList";
import { useDispatch } from "react-redux";
import { addPlaylistStart } from "../../redux/slices/playlistSlice";
import {
  AddSongContainer as AddPlaylistContainer,
  Form,
} from "../SongList/AddSong/AddSong";

interface AddPlaylistProps {
  onAdd: () => void;
}

const AddPlaylist: React.FC<AddPlaylistProps> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") return;
    dispatch(addPlaylistStart({ name }));
    onAdd();
  };
  return (
    <AddPlaylistContainer>
      <Title>Add Playlist</Title>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the Playlist Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add Playlist</button>
        <button onClick={() => onAdd()}>Cancel</button>
      </Form>
    </AddPlaylistContainer>
  );
};

export default AddPlaylist;
