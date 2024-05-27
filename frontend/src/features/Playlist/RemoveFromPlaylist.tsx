import React from "react";
import { useDispatch } from "react-redux";
import { removeSongFromPlaylistStart } from "../../redux/slices/playlistSlice";
import styled from "@emotion/styled";
import { Song, TypePlaylist } from "../../redux/types";
import {
  Button,
  ButtonContainer,
  CancelButton,
  DeleteButton,
  Title,
} from "../SongList/DeleteSong";

type Props = {
  song: Song;
  playlist: TypePlaylist;
  onClose: () => void;
  onUpdateList: () => void;
};

const Container = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 90%;
  height: 70%;
`;

const RemoveFromPlaylist: React.FC<Props> = ({
  song,
  playlist,
  onClose,
  onUpdateList,
}) => {
  const dispatch = useDispatch();

  function handleRemove() {
    dispatch(
      removeSongFromPlaylistStart({
        playlistId: playlist._id,
        songId: song._id,
      })
    );
    onUpdateList();
    onClose();
  }

  return (
    <Container>
      <Title>{`Remove ${song.title} from ${playlist.name}`}</Title>
      <ButtonContainer>
        <Button onClick={handleRemove}>
          <DeleteButton />
        </Button>
        <Button onClick={onClose}>
          <CancelButton />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default RemoveFromPlaylist;
