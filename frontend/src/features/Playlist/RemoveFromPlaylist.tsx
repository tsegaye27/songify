import React from "react";
import { useDispatch } from "react-redux";
import { removeSongFromPlaylistStart } from "../../redux/slices/playlistSlice";
import styled from "@emotion/styled";
import { Song, TypePlaylist } from "../../redux/types";
import { BiCheck, BiX } from "react-icons/bi";

type Props = {
  song: Song;
  playlist: TypePlaylist;
  onClose: () => void;
  onUpdateList: () => void;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 80%;
  justify-content: center;
  padding: 16px;
  border-radius: 4px;
  text-align: center;
`;

const Message = styled.div`
  font-size: 16px;
  margin-bottom: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  background-color: #0073e6;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5;
  }

  &:first-of-type {
    margin-right: 8px;
  }
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
      <Message>{`Remove ${song.title} from ${playlist.name}`}</Message>
      <ButtonContainer>
        <Button onClick={handleRemove}>
          <BiCheck />
        </Button>
        <Button onClick={onClose}>
          <BiX />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default RemoveFromPlaylist;
