import React, { useEffect, useState } from "react";
import { Song } from "../../redux/types";
import EditSong from "./EditSong/EditSong";
import styled from "@emotion/styled";
import { BsMusicNote } from "react-icons/bs";
import { BiEdit, BiTrash, BiPlus, BiHeart } from "react-icons/bi";
import Modal from "../../ui/Modal";
import { AiFillHeart } from "react-icons/ai";
import { keyframes } from "@emotion/react";
import DeleteSong from "./DeleteSong";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/slices/favoriteSlice";
import RootState from "../../redux/RootState";
import AddPlaylist from "../Playlist/AddPlaylist";

const StyledSongItem = styled.div`
  background-color: #222;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(255, 255, 255, 0.1);
  padding: 20px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  transition: transform 0.4s ease;

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
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: color 0.3s ease;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    color: red;
  }
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
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #006eff;
  }
`;

const Icon = styled.span`
  font-size: 20px;
`;

const IsFavIcon = styled(AiFillHeart)`
  color: red;
`;

const IsNotFavIcon = styled(BiHeart)`
  transition: color 0.3s ease;
  &:hover {
    color: red;
  }
`;

interface Props {
  song: Song;
}

const SongItem: React.FC<Props> = ({ song }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favList);

  useEffect(() => {
    const isFav = favorites.some((favSong) => favSong._id === song._id);
    setIsFavorite(isFav);
  }, [favorites, song._id]);

  function handleEdit(songId: string | null) {
    if (songId === null) setIsSelected(false);
    else {
      setTimeout(() => {
        setIsSelected(true);
      }, 300);
    }
  }

  function handleFavorite() {
    setIsFavorite((prevState) => !prevState);
    if (!isFavorite) {
      dispatch(addToFavorites(song));
    } else {
      dispatch(removeFromFavorites(song._id));
    }
  }

  function handleDelete() {
    setShowDelete((show) => !show);
  }

  function handleAddToPlaylist() {
    setShowPlaylist((show) => !show);
  }

  return (
    <>
      <StyledSongItem>
        <SongLogo className="song-logo" />
        <Title>{song.title}</Title>
        <Body>{song.artist}</Body>
        <ButtonContainer>
          <EditButton>
            <Icon onClick={() => handleEdit(song._id)}>
              <BiEdit />
            </Icon>
          </EditButton>
          <DeleteButton>
            <Icon onClick={handleDelete}>
              <BiTrash />
            </Icon>
          </DeleteButton>
          <AddToPlaylistButton>
            <Icon onClick={handleAddToPlaylist}>
              <BiPlus />
            </Icon>
          </AddToPlaylistButton>
        </ButtonContainer>
        <FavoriteButton>
          <Icon onClick={handleFavorite}>
            {isFavorite ? <IsFavIcon /> : <IsNotFavIcon />}
          </Icon>
        </FavoriteButton>
      </StyledSongItem>
      {/* <StyledSongItem>
        <SongLogo className="song-logo" />
        <Title>{song.title}</Title>
        <Body>{song.artist}</Body>
        <ButtonContainer>
          <EditButton>
            <Icon onClick={() => handleEdit(song._id)}>
              <BiEdit />
            </Icon>
          </EditButton>
          <DeleteButton>
            <Icon onClick={handleDelete}>
              <BiTrash />
            </Icon>
          </DeleteButton>
          <AddToPlaylistButton>
            <Icon onClick={handleAddToPlaylist}>
              <BiPlus />
            </Icon>
          </AddToPlaylistButton>
        </ButtonContainer>
        <FavoriteButton>
          <Icon onClick={handleFavorite}>
            {isFavorite ? <IsFavIcon /> : <IsNotFavIcon />}
          </Icon>
        </FavoriteButton>
      </StyledSongItem> */}
      {isSelected && (
        <Modal>
          <EditSong onUpdate={handleEdit} song_Id={song._id} />
        </Modal>
      )}
      {showDelete && (
        <Modal>
          <DeleteSong onDelete={handleDelete} song_Id={song._id} />
        </Modal>
      )}
      {showPlaylist && (
        <Modal>
          <AddPlaylist />
        </Modal>
      )}
    </>
  );
};

export default SongItem;
