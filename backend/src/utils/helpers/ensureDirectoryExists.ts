// src/utils/ensureDirectoryExists.ts

import fs from "fs";
import path from "path";
import { EnsureDirectoryExistsParams } from "./types";

export const ensureDirectoryExists = ({
  filePath,
  recursive = true,
}: EnsureDirectoryExistsParams): void => {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive });
  }
};
