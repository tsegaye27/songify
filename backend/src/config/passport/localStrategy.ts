import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../../models/user";
import { errorMessages } from "../../utils/messages/errorMessages";

const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await User.findUserByEmail(email);
      if (!user || !user.password) {
        return done(null, false, { message: errorMessages.invalidCredentials });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: errorMessages.invalidCredentials });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  },
);

export default localStrategy;
