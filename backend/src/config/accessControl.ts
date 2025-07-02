import { AccessControl } from "accesscontrol";

const ac = new AccessControl();

ac.grant("user")
  .createOwn("account")
  .readOwn("account")
  .updateOwn("account")
  .deleteOwn("account")

  .createAny("song")
  .readAny("song")
  .updateAny("song")
  .deleteAny("song")

  .createOwn("playlist")
  .readOwn("playlist")
  .updateOwn("playlist")
  .deleteOwn("playlist")
  .readAny("playlist");

ac.grant("admin")
  .extend("user")
  .readAny("account", ["*", "!password"])
  .deleteAny("account")
  .updateAny("account")
  .createAny("playlist")
  .readAny("playlist")
  .updateAny("playlist")
  .deleteAny("playlist");

export default ac;
