export enum NodeEnv {
  Development = "development",
  Production = "production",
  Test = "test",
}

export enum ExceptionTypes {
  UncaughtException = "uncaughtException",
  UnhandledRejection = "unhandledRejection",
}

export enum JwtInfoName {
  JsonWebTokenError = "JsonWebTokenError",
  TokenExpiredError = "TokenExpiredError",
}

export enum AuthenticationStrategy {
  Local = "local",
  Google = "google",
  Jwt = "jwt",
}

export enum Status {
  Success = "success",
  Error = "error",
  Fail = "fail",
}

export enum MongooseConnectionEvent {
  Connected = "connected",
  Disconnected = "disconnected",
  Error = "error",
}

export enum ResourceType {
  User = "user",
  Song = "song",
  Playlist = "playlist",
}

export enum UserRole {
  User = "user",
  Admin = "admin",
}
