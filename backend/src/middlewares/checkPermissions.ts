import ac from "@/config/accessControl";
import { NextFunction, Request, Response } from "express";
import AppError from "@/errors/appErrors";
import httpStatus from "http-status";
import { errorMessages } from "@/utils/messages/errorMessages";
import { UserInterface } from "@/models/user/types";

interface AuthenticatedRequest extends Request {
  user: UserInterface;
}

export const checkPermission = (action: string, resource: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user.role || "user";
      const permission = ac.can(userRole)[action](resource);

      if (!permission.granted) {
        return next(
          new AppError(
            errorMessages.insufficientPermissions,
            httpStatus.FORBIDDEN,
          ),
        );
      }

      req.permission = permission;
      next();
    } catch (error) {
      next(
        new AppError(
          errorMessages.permissionCheckFailed,
          httpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  };
};

export const canCreateSong = checkPermission("createAny", "song");
export const canReadSongs = checkPermission("readAny", "song");
export const canUpdateSong = checkPermission("updateAny", "song");
export const canDeleteSong = checkPermission("deleteAny", "song");

export const canCreateOwnPlaylist = checkPermission("createOwn", "playlist");
export const canReadOwnPlaylist = checkPermission("readOwn", "playlist");
export const canUpdateOwnPlaylist = checkPermission("updateOwn", "playlist");
export const canDeleteOwnPlaylist = checkPermission("deleteOwn", "playlist");
export const canReadAnyPlaylist = checkPermission("readAny", "playlist");
