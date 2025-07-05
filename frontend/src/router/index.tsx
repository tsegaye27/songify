import { lazy } from "react";
import { actions, resources } from "../utils/enums";
import { IRoute } from "./types";

const DashboardPage = lazy(() => import("../features/Dashboard/DashboardPage"));
const LoginPage = lazy(() => import("../features/Auth/LoginPage/LoginPage"));
const SignUpPage = lazy(() => import("../features/Auth/SignUpPage/SignUpPage"));
const SongsPage = lazy(() => import("../features/Songs/SongsPage"));
const PlaylistsPage = lazy(() => import("../features/Playlists/PlaylistsPage"));
const PlaylistDetailPage = lazy(
  () => import("../features/Playlists/PlaylistDetailPage"),
);
const FavoritesPage = lazy(() => import("../features/Favorites/FavoritesPage"));

export const routes: IRoute[] = [
  // Public Routes (Not Authenticated)
  {
    element: <LoginPage />,
    path: "/auth/login",
    isAuthenticated: false,
  },
  {
    element: <SignUpPage />,
    path: "/auth/signup",
    isAuthenticated: false,
  },

  // Protected Routes (Authenticated)
  {
    element: <DashboardPage />,
    path: "/",
    isAuthenticated: true,
  },
  {
    element: <SongsPage />,
    path: "/songs",
    isAuthenticated: true,
    permissions: {
      resource: resources.SONGS,
      action: actions.readAny,
    },
  },
  {
    element: <PlaylistDetailPage />,
    path: "/playlists/:id",
    isAuthenticated: true,
    permissions: {
      resource: resources.PLAYLISTS,
      action: actions.readAny,
    },
  },
  {
    element: <PlaylistsPage />,
    path: "/playlists",
    isAuthenticated: true,
    permissions: {
      resource: resources.PLAYLISTS,
      action: actions.readAny,
    },
  },
  {
    element: <FavoritesPage />,
    path: "/favorites",
    isAuthenticated: true,
  },
];
