import { actions, resources } from "../utils/enums";

export interface IRoute {
  path: string;
  element: JSX.Element;
  exact?: boolean;
  isAuthenticated: boolean;
  permissions?: {
    resource: keyof typeof resources;
    action: keyof typeof actions;
  };
}
