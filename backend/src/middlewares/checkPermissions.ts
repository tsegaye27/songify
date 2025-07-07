import ac from "../config/accessControl";
import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appErrors";
import httpStatus from "http-status";
import { errorMessages } from "../utils/messages/errorMessages";

export const checkPermission = (action: string, resource: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return next(
          new AppError(errorMessages.unauthorized, httpStatus.UNAUTHORIZED),
        );
      }

      const userRole = (req.user as any).role || "user";
      const permission = executePermissionCheck(userRole, action, resource);

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

const executePermissionCheck = (
  userRole: string,
  action: string,
  resource: string,
) => {
  const query = ac.can(userRole);

  switch (action) {
    case "createAny":
      return query.createAny(resource);
    case "readAny":
      return query.readAny(resource);
    case "updateAny":
      return query.updateAny(resource);
    case "deleteAny":
      return query.deleteAny(resource);
    case "createOwn":
      return query.createOwn(resource);
    case "readOwn":
      return query.readOwn(resource);
    case "updateOwn":
      return query.updateOwn(resource);
    case "deleteOwn":
      return query.deleteOwn(resource);
    default:
      throw new Error(`Unknown action: ${action}`);
  }
};
