import { Strategy as JwtStrategy } from "passport-jwt";
import { cookieExtractor } from "../../utils/helpers/extractCookies";
import { JWT_SECRET } from "../environments";
import User from "../../models/user";
import { errorMessages } from "../../utils/messages/errorMessages";

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(opts, async (jwtPayload, done) => {
  try {
    const user = await User.findUserById(jwtPayload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false, { message: errorMessages.unauthorized });
  } catch (error) {
    return done(error, false);
  }
});

export default jwtStrategy;
