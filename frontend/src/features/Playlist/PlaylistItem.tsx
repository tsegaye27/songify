import React from "react";
import { useDispatch } from "react-redux";
import { deletePlaylist } from "../../redux/slices/playlistSlice";
import styled from "@emotion/styled";
import { TypePlaylist } from "../../redux/types";

const Item = styled.div`
  background-color: #222;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h3`
  font-size: 20px;
  color: #ccc;
`;

const Button = styled.button`
  margin: 5px;
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4040;
  }
`;

interface PlaylistItemProps {
  playlist: TypePlaylist;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ playlist }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePlaylist(playlist.name));
  };

  return (
    <Item>
      <Title>{playlist.name}</Title>
      <Button onClick={handleDelete}>Delete</Button>
      {/* Add components or buttons to add and display songs */}
    </Item>
  );
};

export default PlaylistItem;
