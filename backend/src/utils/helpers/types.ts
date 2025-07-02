export interface EnsureDirectoryExistsParams {
  filePath: string;
  recursive?: boolean;
}

export interface generateAccountActivationUrlParams {
  passwordOrKey: string;
  userId: string;
  email: string;
  expiresIn: string;
}
