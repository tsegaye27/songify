export const errorMessages = {
  // Environment and Database Connection Errors
  envValidationErr: (err: string) => `Env vars validation error: ${err}`,
  mongoConnectionFailed: "MongoDB connection failed!",
  dbConnectionFailed: (errorMessage: string) =>
    `Failed to connect to the database: ${errorMessage}`,
  unknownDbConnectionError:
    "Failed to connect to the database: Unknown error occurred",
  shutdownError: (shutdownErrorMessage: string) =>
    `Error during MongoDB shutdown: ${shutdownErrorMessage}`,
  mongooseConnectionError: (errorMessage: string) =>
    `Mongoose connection error: ${errorMessage}`,

  // Initial Connection and Validation Errors
  initialConnectionError: (errorMessage: string) =>
    `Initial connection error: ${errorMessage}`,
  validationFailed: "Validation failed",

  // General Application Errors
  uncaughtException: (errorMessage: string) =>
    `Uncaught Exception: ${errorMessage}`,
  unhandledRejection: (promise: Promise<any>, reason: unknown) =>
    `Unhandled Rejection at: ${promise}, reason: ${reason}`,
  noEndpoint: "Endpoint not found",
  internalServerError: "Internal Server Error",

  // Authentication and Authorization Errors
  unauthorized: "Unauthorized: User not found",
  invalidToken: "Unauthorized: Invalid token",
  invalidEmail: "Unauthorized: Invalid email",
  expiredToken: "Unauthorized: Token has expired",
  noToken: "Unauthorized: No token provided",

  googleUserNotFound:
    "Unauthorized: User not found during Google authentication",
  authFailed: "Authentication failed",

  // Google Authentication Errors
  googleStrategy: "Error in google strategy",
  googleAuthError: (errorMessage: string) =>
    `Error during Google authentication: ${errorMessage}`,
  googleProfileError: "Error retrieving Google profile information",

  // User Retrieval and Authentication Errors
  retrievingUser: (errorMessage: string) =>
    `Error retrieving user: ${errorMessage}`,
  localAuthError: (errorMessage: string) =>
    `Local authentication error: ${errorMessage}`,
  invalidCredentials: "Invalid email or password",
  loginError: (errorMessage: string) => `Login process error: ${errorMessage}`,
  localAuthFailed: (errorMessage: string) =>
    `Local authentication failed: ${errorMessage}`,

  // Email and Nodemailer Errors
  transportError: "Error occurred while creating nodemailer transport",
  nodemailerVerificationFailed: (errorMessage: string) =>
    `[Nodemailer Loader] Verifying mailing account failed: ${errorMessage}`,
  nodemailerTransportError: (errorMessage: string) =>
    `[Nodemailer Loader] Error occurred while creating nodemailer transport: ${errorMessage}`,
  emailSendingFailed: (errorMessage: string) =>
    `Failed to send email: ${errorMessage}`,

  // Duplicate Email Error
  duplicateEmailError: (errorMessage: string) =>
    `The ${errorMessage} is already registered`,

  // Song-related Errors
  songNotFound: "Song not found",
  songAlreadyExists: "Song already exists",
  songCreationFailed: "Failed to create song",
  songUpdateFailed: "Failed to update song",
  songDeletionFailed: "Failed to delete song",

  // Playlist-related Errors
  playlistNotFound: "Playlist not found",
  playlistAlreadyExists: "Playlist already exists",
  playlistCreationFailed: "Failed to create playlist",
  playlistUpdateFailed: "Failed to update playlist",
  playlistDeletionFailed: "Failed to delete playlist",
  playlistAccessDenied: "You don't have permission to access this playlist",
  songAlreadyInPlaylist: "Song already exists in the playlist",
  songNotInPlaylist: "Song not found in the playlist",

  // Search and general
  searchQueryRequired: "Search query is required",
  invalidObjectId: "Invalid ID format",
  insufficientPermissions: "You don't have sufficient permissions",
  permissionCheckFailed: "Failed to check permissions",
};
