import passport from "passport";
import localStrategy from "./localStrategy";
import jwtStrategy from "./jwtStrategy";
// import googleStrategy from "./googleStrategy";

const initiatePassport = () => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
  // passport.use(googleStrategy);
};

export default initiatePassport;
