import React, { useState } from "react";
import { Song } from "../../redux/types";
import EditSong from "./EditSong/EditSong";
import styled from "@emotion/styled";
import { BsMusicNote } from "react-icons/bs";
import { BiEdit, BiTrash, BiPlus, BiHeart } from "react-icons/bi";
import Modal from "../../ui/Modal";
import { AiFillHeart } from "react-icons/ai";
import { keyframes } from "@emotion/react";
import { deleteSongStart } from "../../redux/slices/slice";
import { useDispatch } from "react-redux";

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

const FavoriteButton = styled.button`
  background-color: #222;
  color: #ff0000;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
`;
const shakeAnimation = keyframes`
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  `;
const DeleteButton = styled.button`
  background-color: #222;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    animation: ${shakeAnimation} 0.5s linear;
  }
`;

const AddToPlaylistButton = styled.button`
  background-color: #222;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
  }
`;
const EditButton = styled.button`
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
  song_Id: string;
}

const SongItem: React.FC<Props> = ({ song, song_Id }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const dispatch = useDispatch();

  function handleEdit(songId: string | null) {
    if (songId === null) setIsSelected(false);
    else {
      setTimeout(() => {
        setIsSelected(true);
      }, 300);
    }
  }

  function handleFavorite(songId: string) {
    setIsFavorite((fav) => !fav);
  }

  function handleDelete(songId: string) {
    dispatch(deleteSongStart(songId));
  }

  return (
    <>
      <StyledSongItem>
        <SongLogo className="song-logo" />
        <Title>{song.title}</Title>
        <Body>{song.artist}</Body>
        <ButtonContainer>
          <EditButton onClick={() => handleEdit(song._id)}>
            <Icon>
              <BiEdit />
            </Icon>
          </EditButton>
          <DeleteButton onClick={() => handleDelete(song._id)}>
            <Icon>
              <BiTrash />
            </Icon>
          </DeleteButton>
          <AddToPlaylistButton>
            <Icon>
              <BiPlus />
            </Icon>
          </AddToPlaylistButton>
          <FavoriteButton onClick={() => handleFavorite(song._id)}>
            <Icon>{isFavorite ? <AiFillHeart /> : <BiHeart />}</Icon>
          </FavoriteButton>
        </ButtonContainer>
      </StyledSongItem>
      {isSelected && (
        <Modal>
          <EditSong onUpdate={handleEdit} song_Id={song_Id} />
        </Modal>
      )}
    </>
  );
};

export default SongItem;
