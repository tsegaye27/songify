import React, { useState } from "react";
import styled from "@emotion/styled";
import { Song, TypePlaylist } from "../../redux/types";
import {
  AddNewSongContainer,
  EmptyListContainer,
  StyledSongList,
  Title,
} from "../SongList/SongList";
import { BiLeftArrow } from "react-icons/bi";
import SongItemInPlaylist from "../SongList/SongItemInPlaylist";

type PlaylistItemDetailsProps = {
  playlist: TypePlaylist;
  onReturn: () => void;
};

const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
  color: white;
`;

const H2 = styled.h2`
  align-self: center;
  color: white;
  margin: 0 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 5px;
  border: none;
  background-color: #0073e6;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #005bb5;
  }
`;

const ReturnButton = styled(Button)`
  background-color: #44567d;
  color: white;
  &:hover {
    background-color: #44567dec;
  }
`;

const PlaylistItemDetails: React.FC<PlaylistItemDetailsProps> = ({
  playlist,
  onReturn,
}) => {
  const [songsIn, setSongsIn] = useState<Song[] | null>(playlist.songs);
  function handleDelete(song: Song) {
    const newSongs = songsIn?.filter((s) => s._id !== song._id);
    if (!newSongs) return;
    setSongsIn(newSongs);
  }
  return (
    <Container>
      {songsIn === null || songsIn.length === 0 ? (
        <EmptyListContainer>
          <Title>{`${playlist?.name} is empty...`}</Title>
          <ReturnButton onClick={onReturn}>
            <BiLeftArrow />
          </ReturnButton>
        </EmptyListContainer>
      ) : (
        <>
          <AddNewSongContainer>
            <ReturnButton onClick={onReturn}>
              <BiLeftArrow />
            </ReturnButton>
            <H2>
              {songsIn.length === 1
                ? `There is ${songsIn.length} song`
                : `There are ${songsIn.length} songs`}
            </H2>
          </AddNewSongContainer>
          <StyledSongList>
            {songsIn.map((song) => (
              <SongItemInPlaylist
                key={song._id}
                song={song}
                playlist={playlist}
                onDelete={() => handleDelete(song)}
              />
            ))}
          </StyledSongList>
        </>
      )}
    </Container>
  );
};

export default PlaylistItemDetails;
