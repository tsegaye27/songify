import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import SongList from "./features/SongList/SongList";
import Error from "./ui/Error";
import GlobalStyles from "./styles/GlobalStyles";
import Favorite from "./features/Favorite/Favorite";
import Playlist from "./features/Playlist/Playlist";
import Artist from "./features/Artist/Artist";
import Album from "./features/Album/Album";

const router = createBrowserRouter([
  {
    element: (
      <>
        <AppLayout />
        <GlobalStyles />
      </>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/songs",
        element: <SongList />,
        errorElement: <Error />,
      },
      {
        path: "/playlists",
        element: <Playlist />,
        errorElement: <Error />,
      },
      {
        path: "/favorites",
        element: <Favorite />,
        errorElement: <Error />,
      },
      {
        path: "/artists",
        element: <Artist />,
        errorElement: <Error />,
      },
      {
        path: "/albums",
        element: <Album />,
        errorElement: <Error />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
