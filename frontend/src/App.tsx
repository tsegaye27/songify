import React, { Suspense, lazy } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import Error from "./ui/Error";

const SongList = lazy(() => import("./features/SongList/SongList"));
const Favorite = lazy(() => import("./features/Favorite/Favorite"));
const Playlist = lazy(() => import("./features/Playlist/Playlist"));

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
        element: (
          <Suspense fallback={<div>Loading Songs...</div>}>
            <SongList />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/favorites",
        element: (
          <Suspense fallback={<div>Loading Favorites...</div>}>
            <Favorite />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/playlists",
        element: (
          <Suspense fallback={<div>Loading Playlists...</div>}>
            <Playlist />
          </Suspense>
        ),
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
