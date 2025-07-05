export const API_ROUTE = import.meta.env.VITE_API_ROUTE;

export const cookieKeys = {
  authToken: "jwt",
};

export const routeConstants = {
  home: "/",
  login: "/auth/login",
  signup: "/auth/signup",
  songs: "/songs",
  playlists: "/playlists",
  myPlaylists: "/plalyists/my",
};

export const apiEndpoints = {
  auth: {
    signup: "/auth/sign-up",
    login: "/auth/log-in",
    logout: "/auth/log-out",
  },
  songs: {
    base: "/songs",
    byId: (id: string) => `/songs/${id}`,
  },
  playlists: {
    base: "/playlists",
    myPlaylists: "/playlists/my",
    byId: (id: string) => `/playlists/${id}`,
    addSong: (id: string) => `/playlists/${id}/songs`,
    removeSong: (id: string, songId: string) =>
      `/playlists/${id}/songs/${songId}`,
  },
};
