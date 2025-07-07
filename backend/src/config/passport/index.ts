import passport from "passport";
import localStrategy from "./localStrategy";
import jwtStrategy from "./jwtStrategy";

const initiatePassport = () => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
};

export default initiatePassport;
