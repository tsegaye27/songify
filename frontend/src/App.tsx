import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import SongList from "./features/SongList/SongList";
import Error from "./ui/Error";
import GlobalStyles from "./styles/GlobalStyles";
import Favorite from "./features/Favorite/Favorite";
import Playlist from "./features/Playlist/Playlist";

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
        errorElement: <Error />,
        element: <Navigate to="/songs" replace />,
      },
      {
        path: "/songs",
        element: <SongList />,
        errorElement: <Error />,
      },

      {
        path: "/favorites",
        element: <Favorite />,
        errorElement: <Error />,
      },
      {
        path: "/playlists",
        element: <Playlist />,
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
