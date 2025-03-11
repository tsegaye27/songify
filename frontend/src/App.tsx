import React, { Suspense, lazy } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import Error from "./ui/Error";
import Loader from "./ui/Loader";

const SongList = lazy(() => import("./features/SongList/SongList"));
const Favorite = lazy(() => import("./features/Favorite/Favorite"));
const Playlist = lazy(() => import("./features/Playlist/Playlist"));

const router = createBrowserRouter(
  [
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
            <Suspense fallback={<Loader />}>
              <SongList />
            </Suspense>
          ),
          errorElement: <Error />,
        },
        {
          path: "/favorites",
          element: (
            <Suspense fallback={<Loader />}>
              <Favorite />
            </Suspense>
          ),
          errorElement: <Error />,
        },
        {
          path: "/playlists",
          element: (
            <Suspense fallback={<Loader />}>
              <Playlist />
            </Suspense>
          ),
          errorElement: <Error />,
        },
      ],
    },
  ],
  {},
);

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
