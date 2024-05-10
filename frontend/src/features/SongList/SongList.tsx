import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../redux/RootState";
import { fetchSongsStart } from "../../redux/slices/slice";
import SongItem from "./SongItem";
import styled from "@emotion/styled";

const StyledSongList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

// const StyledSongItem = styled.div`
//   background-color: #222;
//   border-radius: 10px;
//   box-shadow: 0px 2px 4px rgba(255, 255, 255, 0.1);
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   transition: transform 0.3s ease;

//   &:hover {
//     transform: translateY(-5px);
//   }
// `;

// const SongLogo = styled(BsMusicNote)`
//   font-size: 32px;
//   color: #ccc;
//   margin-bottom: 20px;
// `;

const Title = styled.h3`
  font-size: 20px;
  color: #ccc;
  margin: 0;
  width: 100%;
  text-align: center;
`;

// const Body = styled.p`
//   font-size: 16px;
//   color: #aaa;
//   margin: 10px 0;
//   text-align: center;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-top: 20px;
// `;

// const Icon = styled.span`
//   font-size: 20px;
//   cursor: pointer;
//   background-color: #222;
//   color: #fff;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 5px;
//   transition: box-shadow 0.3s ease;

//   &:hover {
//     box-shadow: 1px 1px 5px #fea22a;
//   }
// `;

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.list);

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  return (
    <div>
      {songs.length === 0 ? (
        <Title>No Songs Yet ...</Title>
      ) : (
        <StyledSongList>
          {songs.map((song) => (
            <SongItem key={song._id} song_Id={song._id} song={song} />
          ))}
        </StyledSongList>
      )}
    </div>
  );
};

export default SongList;
