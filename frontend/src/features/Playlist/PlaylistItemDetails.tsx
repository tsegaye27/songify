import React, { useState } from "react";
import styled from "@emotion/styled";
import { Song, TypePlaylist } from "../../redux/types";
import { Title as BtnTitle, Title } from "../../ui/Modal";
import {
  AddNewSongContainer,
  EmptyListContainer,
  StyledSongList,
} from "../../ui/CommonComponents";
import SongItemInPlaylist from "../SongList/SongItemInPlaylist";
import { useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { IoChevronBackSharp } from "react-icons/io5";

type PlaylistItemDetailsProps = {
  playlist: TypePlaylist;
  onReturn: () => void;
};

// Styled Components
const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #2c2c2c; /* Darker background for a modern look */
  color: #ffffff; /* White text for better contrast */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Enhanced shadow for depth */
`;

const H2 = styled.h2`
  color: #ffffff; /* White for contrast */
  margin: 20px 0; /* Increased margin for spacing */
  font-size: 1.5rem; /* Large font size for headings */
  text-align: center; /* Centering the text */
`;

const ReturnButton = styled.button`
  transition:
    background-color 0.3s,
    transform 0.3s;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #444; /* Green background for modern look */
  display: flex;
  align-items: center; /* Center align icon and text */
  color: #ffffff; /* White text for contrast */
  font-size: 1rem; /* Consistent font size */

  &:hover {
    background-color: #333; /* Darker green on hover */
    transform: scale(1.05); /* Slight scale effect on hover */
  }
`;

const EmptyMessageContainer = styled.div`
  text-align: center; /* Center the text */
  margin-top: 20px; /* Space from the button */
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
          <ReturnButton onClick={onReturn}>
            <IoChevronBackSharp title="Back" />
            <BtnTitle>Back</BtnTitle>
          </ReturnButton>
          <EmptyMessageContainer>
            <Title>{`${playlist?.name} is empty...`}</Title>
          </EmptyMessageContainer>
        </EmptyListContainer>
      ) : (
        <>
          <AddNewSongContainer>
            <ReturnButton onClick={onReturn}>
              <IoChevronBackSharp title="Back" />
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
