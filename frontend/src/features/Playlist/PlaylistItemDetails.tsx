import React from "react";
import styled from "@emotion/styled";
import { TypePlaylist } from "../../redux/types";
import {
  AddNewSongContainer,
  EmptyListContainer,
  StyledSongList,
  Title,
} from "../SongList/SongList";
import { BiLeftArrow } from "react-icons/bi";
import SongItemInPlaylist from "../SongList/SongItemInPlaylist";

type PlaylistItemDetailsProps = {
  playlist: TypePlaylist | null;
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
  const songLength = playlist?.songs.length;
  return (
    <Container>
      {!playlist?.songs || playlist.songs.length === 0 ? (
        <EmptyListContainer>
          <Title>{`${playlist?.name} is empty...`}</Title>
          <ReturnButton onClick={onReturn}>Return</ReturnButton>
        </EmptyListContainer>
      ) : (
        <>
          <AddNewSongContainer>
            <ReturnButton onClick={onReturn}>
              <BiLeftArrow />
            </ReturnButton>
            <H2>
              {songLength === 1
                ? `There is ${songLength} song`
                : `There are ${songLength} songs`}
            </H2>
          </AddNewSongContainer>
          <StyledSongList>
            {playlist.songs.map((song) => (
              <SongItemInPlaylist
                key={song._id}
                song={song}
                playlist={playlist}
              />
            ))}
          </StyledSongList>
        </>
      )}
    </Container>
  );
};

export default PlaylistItemDetails;
