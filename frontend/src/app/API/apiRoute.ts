const bases = {
  auth: "/auth",
  songs: "/songs",
  playlists: "/playlists",
};

const auth = {
  base: bases.auth,
  signup: `${bases.auth}/sign-up`,
  login: `${bases.auth}/log-in`,
  logout: `${bases.auth}/log-out`,
  verifyEmail: `${bases.auth}/verify-email`,
  forgotPassword: `${bases.auth}/forgot-password`,
  resetPassword: `${bases.auth}/reset-password`,
  googleAuth: `${bases.auth}/google`,
};

const songs = {
  base: bases.songs,
  search: `${bases.songs}/search`,
  byId: (id: string) => `${bases.songs}/${id}`,
};

const playlists = {
  base: bases.playlists,
  my: `${bases.playlists}/my`,
  public: `${bases.playlists}/public`,
  search: `${bases.playlists}/search`,
  byId: (id: string) => `${bases.playlists}/${id}`,
  addSong: (id: string) => `${bases.playlists}/${id}/songs`,
  removeSong: (id: string, songId: string) =>
    `${bases.playlists}/${id}/songs/${songId}`,
};

const apiRoutes = { auth, songs, playlists };
export default apiRoutes;
