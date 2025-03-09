import React, { useState } from "react";
import styled from "@emotion/styled";
import { Song, TypePlaylist } from "../../redux/types";
import { Title as BtnTitle, Title } from "../../ui/Modal";
import {
  AddNewSongContainer,
  Container as BtnContainer,
  EmptyListContainer,
  StyledSongList,
} from "../../ui/CommonComponents";
import { BiLeftArrow } from "react-icons/bi";
import SongItemInPlaylist from "../SongList/SongItemInPlaylist";
import { useSelector } from "react-redux";
import RootState from "../../redux/RootState";

type PlaylistItemDetailsProps = {
  playlist: TypePlaylist;
  onReturn: () => void;
};

const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
  color: var(--text-color);
`;

const H2 = styled.h2`
  align-self: center;
  color: var(--text-color);
  margin: 0 10px;
`;

const ReturnButton = styled.button`
  transition: background-color 0.3s;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: var(--primary-color);
  display: flex;
  color: var(--text-color);
  &:hover {
    background-color: var(--primary-color);
  }
`;

const PlaylistItemDetails: React.FC<PlaylistItemDetailsProps> = ({
  playlist,
  onReturn,
}) => {
  const [songsIn, setSongsIn] = useState<Song[] | null>(playlist.songs);
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const filteredSongsIn = searchQuery
    ? songsIn?.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : songsIn;

  function handleDelete(song: Song) {
    const newSongs = songsIn?.filter((s) => s._id !== song._id);
    if (!newSongs) return;
    setSongsIn(newSongs);
  }
  return (
    <Container>
      {filteredSongsIn === null || filteredSongsIn?.length === 0 ? (
        <EmptyListContainer>
          <Title>{`${playlist?.name} is empty...`}</Title>
          <ReturnButton onClick={onReturn}>
            <BtnContainer>
              <BiLeftArrow />
              <BtnTitle>Go Back</BtnTitle>
            </BtnContainer>
          </ReturnButton>
        </EmptyListContainer>
      ) : (
        <>
          <AddNewSongContainer>
            <ReturnButton onClick={onReturn}>
              <BtnContainer>
                <BiLeftArrow />
                <BtnTitle>Go Back</BtnTitle>
              </BtnContainer>
            </ReturnButton>
            <H2>
              {filteredSongsIn?.length === 1
                ? `There is ${filteredSongsIn?.length} song in ${playlist?.name}`
                : `There are ${filteredSongsIn?.length} songs in ${playlist?.name}`}
            </H2>
          </AddNewSongContainer>
          <StyledSongList>
            {filteredSongsIn?.map((song) => (
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
