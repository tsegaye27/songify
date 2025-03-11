import React, { useEffect, useState } from "react";
import { Song } from "../../redux/types";
import EditSong from "./EditSong";
import styled from "@emotion/styled";
import { BsMusicNote } from "react-icons/bs";
import { BiEdit, BiTrash, BiPlus, BiHeart } from "react-icons/bi";
import Modal from "../../ui/Modal";
import { AiFillHeart } from "react-icons/ai";
import { keyframes, css } from "@emotion/react";
import DeleteSong from "./DeleteSong";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/slices/favoriteSlice";
import RootState from "../../redux/RootState";
import PlaylistListView from "../Playlist/PlaylistListView";
import { Tooltip as ReactTooltip } from "react-tooltip";

export const StyledSongItem = styled.div`
  background-color: var(--second-background-color); /* Darker background */
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
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
  color: var(--green-primary); /* Set the color to --green-primary */
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 100%;
  background-color: #222; /* Dark background for logo */
`;

const Title = styled.h3`
  font-size: 20px;
  color: var(--text-color); /* Light text color */
  margin: 0;
  text-align: center;
`;

const Body = styled.p`
  font-size: 16px;
  color: var(--text-color-secondary); /* Softer secondary text color */
  margin: 10px 0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const FavoriteButton = styled.button`
  background-color: transparent; /* Transparent for better visual flow */
  color: var(--text-color);
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: color 0.3s ease;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    color: var(--red-primary); /* Accent color on hover */
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

const DeleteButtonStyles = (props: {
  bgColor?: string;
  marginRight?: string;
}) => css`
  background: ${props.bgColor};
  color: var(--text-color);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  margin-right: ${props.marginRight};

  &:hover {
    animation: ${shakeAnimation} 0.5s linear;
  }
`;

export const DeleteButton = styled.button(DeleteButtonStyles);

const AddToPlaylistButton = styled.button`
  background-color: #222; /* Match the Edit and Delete button background */
  color: var(--text-color);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  &:hover {
    color: var(--green-primary); /* Accent color on hover */
  }
`;

const EditButtonStyles = (props: {
  bgColor?: string;
  marginRight?: string;
}) => `
  background-color: ${props.bgColor};
  margin-right: ${props.marginRight};
  border: none;
  color: var(--text-color);
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--red-primary); /* Use accent color on hover */
  }
`;
export const EditButton = styled.button(EditButtonStyles);

export const Icon = styled.span`
  font-size: 20px;
`;

const IsFavIcon = styled(AiFillHeart)`
  color: var(--red-primary); /* Use accent color for favorites */
`;

const IsNotFavIcon = styled(BiHeart)`
  transition: color 0.3s ease;

  &:hover {
    color: var(--red-primary); /* Use accent color on hover */
  }
`;

type Props = {
  song: Song;
};

const SongItem: React.FC<Props> = ({ song }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

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
        setShowModal(true);
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
    setShowModal(true);
  }

  function handleAddToPlaylist() {
    setShowPlaylist(true);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setShowDelete(false);
    setShowPlaylist(false);
    setIsSelected(false);
  }

  return (
    <>
      <StyledSongItem>
        <SongLogo className="song-logo" />
        <Title>{song.title}</Title>
        <Body>{song.artist}</Body>
        <ButtonContainer>
          <EditButton
            bgColor="#222" /* Darker button background */
            data-tooltip-id="editSongButton"
            data-tooltip-content="Edit Song"
            data-tooltip-place="bottom"
            onClick={() => handleEdit(song._id)}
          >
            <Icon>
              <BiEdit />
            </Icon>
          </EditButton>
          <ReactTooltip id="editSongButton" />
          <DeleteButton
            data-tooltip-id="deleteSongButton"
            data-tooltip-content="Delete Song"
            data-tooltip-place="bottom"
            bgColor="#222" /* Darker button background */
            onClick={handleDelete}
          >
            <Icon>
              <BiTrash />
            </Icon>
          </DeleteButton>
          <ReactTooltip id="deleteSongButton" />
          <AddToPlaylistButton
            data-tooltip-id="AddSongToPlaylistButton"
            data-tooltip-content="Add To Playlist"
            data-tooltip-place="bottom"
            onClick={handleAddToPlaylist}
          >
            <Icon>
              <BiPlus />
            </Icon>
          </AddToPlaylistButton>
          <ReactTooltip id="AddSongToPlaylistButton" />
        </ButtonContainer>
        <FavoriteButton
          data-tooltip-id="FavoriteButton"
          data-tooltip-content={
            isFavorite ? "Remove from Favorites" : "Add to Favorites"
          }
          data-tooltip-place="top"
        >
          <Icon onClick={handleFavorite}>
            {isFavorite ? <IsFavIcon /> : <IsNotFavIcon />}
          </Icon>
        </FavoriteButton>
        <ReactTooltip id="FavoriteButton" />
      </StyledSongItem>
      {isSelected && showModal && (
        <Modal isOpen={true} onClose={handleCloseModal}>
          <EditSong onUpdate={handleEdit} song={song} />
        </Modal>
      )}
      {showDelete && showModal && (
        <Modal isOpen={true} onClose={handleCloseModal}>
          <DeleteSong onDelete={handleDelete} song_Id={song._id} />
        </Modal>
      )}
      {showPlaylist && showModal && (
        <Modal isOpen={true} onClose={handleCloseModal}>
          <PlaylistListView songId={song._id} onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default SongItem;
