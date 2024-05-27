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

const ReturnButton = styled.button`
  transition: background-color 0.3s;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #222;
  display: flex;
  color: white;
  &:hover {
    background-color: #222222a0;
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
            <h3>Go Back</h3>
          </ReturnButton>
        </EmptyListContainer>
      ) : (
        <>
          <AddNewSongContainer>
            <ReturnButton onClick={onReturn}>
              <BiLeftArrow />
              <h3>Go Back</h3>
            </ReturnButton>
            <H2>
              {songsIn.length === 1
                ? `There is ${songsIn.length} song in ${playlist?.name}`
                : `There are ${songsIn.length} songs in ${playlist?.name}`}
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
