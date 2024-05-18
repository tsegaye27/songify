import React from "react";
import { Title } from "../SongList/SongList";
import styled from "@emotion/styled";
import { Input } from "../SongList/AddSong/AddSong";
import { Form } from "react-router-dom";

const StyledAddPlaylist = styled.div`
  width: 100%;
`;

const AddPlaylist: React.FC = () => {
  return (
    <StyledAddPlaylist>
      <Form>
        <Title>Enter Playlist name</Title>
        <Input type="text" placeholder="enter the name here..." />
      </Form>
    </StyledAddPlaylist>
  );
};

export default AddPlaylist;
