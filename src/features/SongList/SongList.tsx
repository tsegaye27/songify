import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { fetchSongsStart } from "../../redux/slices/slice";
import SongItem from "./SongItem";
import styled from "@emotion/styled";
import { BiEdit, BiHeart, BiPlus, BiTrash } from "react-icons/bi";
import { BsMusicNote } from "react-icons/bs";

const StyledSongList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

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

const Icon = styled.span`
  font-size: 20px;
  cursor: pointer;
  background-color: #222;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 1px 1px 5px #fea22a;
  }
`;

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.list);
  console.log(songs);

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  return (
    <div>
      <StyledSongList>
        {songs.length === 0 ? (
          <StyledSongItem>
            <SongLogo className="song-logo" />
            <Title>Sample Title</Title>
            <Body>Sample Body</Body>
            <ButtonContainer>
              <Icon>
                <BiEdit />
              </Icon>
              <Icon>
                <BiTrash />
              </Icon>
              <Icon>
                <BiPlus />
              </Icon>
              <Icon>
                <BiHeart />
              </Icon>
            </ButtonContainer>
          </StyledSongItem>
        ) : (
          songs.map((song) => <SongItem key={song.id} song={song} />)
        )}
      </StyledSongList>
    </div>
  );
};

export default SongList;
