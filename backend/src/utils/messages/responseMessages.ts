export const responseMessages = {
  userApi: {
    signUp:
      "Thank you for registering! Please check your email to verify your account and activate it.",
    verifyEmail:
      "Your email has been successfully verified. Welcome aboard! You are now logged in.",
    googleSignUp:
      "Thank you for signing up with Google! Your registration was successful, and you are now logged in.",
    login: "Login successful. Welcome back!",
    logout: "You have successfully logged out. We hope to see you again soon!",
    passwordReset:
      "We received your request to reset your password! Please check your email for instructions on how to create a new password.",
    resetPasswordAndLogin:
      "Your password has been successfully reset. You are now logged in with your new password. Welcome back",
  },

  songApi: {
    fetchSuccess: "Songs fetched successfully.",
    createSuccess: "Song created successfully.",
    updateSuccess: "Song updated successfully.",
    deleteSuccess: "Song deleted successfully.",
    searchSuccess: "Song search completed successfully.",
  },

  playlistApi: {
    fetchSuccess: "Playlists fetched successfully.",
    createSuccess: "Playlist created successfully.",
    updateSuccess: "Playlist updated successfully.",
    deleteSuccess: "Playlist deleted successfully.",
    searchSuccess: "Playlist search completed successfully.",
    songAddSuccess: "Song added to playlist successfully.",
    songRemoveSuccess: "Song removed from playlist successfully.",
  },
};
