import React, { useState } from "react";
import { Song } from "../../redux/types";
import EditSong from "./EditSong/EditSong";
import styled from "@emotion/styled";
import { BsMusicNote } from "react-icons/bs";
import { BiEdit, BiTrash, BiPlus, BiHeart } from "react-icons/bi";
import Modal from "../../ui/Modal";

const StyledSongItem = styled.div`
  background-color: #222;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(255, 255, 255, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SongLogo = styled(BsMusicNote)`
  font-size: 32px;
  color: #ccc;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 20px;
  color: #ccc;
  margin: 0;
  text-align: center;
`;

const Body = styled.p`
  font-size: 16px;
  color: #aaa;
  margin: 10px 0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #222;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 1px 1px 5px #fea22a;
  }
`;

const Icon = styled.span`
  font-size: 20px;
`;

interface Props {
  song: Song;
}

const SongItem: React.FC<Props> = ({ song }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const maxTitleLength = 20;
  const maxBodyLength = 20;
  const truncatedTitle =
    song.title.length > maxTitleLength
      ? song.title.substring(0, maxTitleLength) + "..."
      : song.title;
  const truncatedBody =
    song.body.length > maxBodyLength
      ? song.body.substring(0, maxBodyLength) + "..."
      : song.body;

  function handleEdit(songId: string | null) {
    if (songId === null) setSelectedId(null);
    else {
      setTimeout(() => {
        setSelectedId(songId);
      }, 300);
    }
  }

  return (
    <>
      <StyledSongItem>
        <SongLogo className="song-logo" />
        <Title>{truncatedTitle}</Title>
        <Body>{truncatedBody}</Body>
        <ButtonContainer>
          <Button onClick={() => handleEdit(song.id)}>
            <Icon>
              <BiEdit />
            </Icon>
          </Button>
          <Button>
            <Icon>
              <BiTrash />
            </Icon>
          </Button>
          <Button>
            <Icon>
              <BiPlus />
            </Icon>
          </Button>
          <Button>
            <Icon>
              <BiHeart />
            </Icon>
          </Button>
        </ButtonContainer>
      </StyledSongItem>
      {selectedId && (
        <Modal>
          <EditSong onUpdate={handleEdit} songId={selectedId} />
        </Modal>
      )}
    </>
  );
};

export default SongItem;
