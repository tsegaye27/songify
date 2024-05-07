import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import SongList from "./features/SongList/SongList";
import AddSong from "./features/AddSong/AddSong";
import EditSong from "./features/EditSong/EditSong";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/songs",
        element: <SongList />,
      },
      {
        path: "/songs/add",
        element: <AddSong />,
      },
      {
        path: "/songs/edit/:id",
        element: <EditSong />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
