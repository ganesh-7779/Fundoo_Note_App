const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: "http://localhost:3000/google/callback"
},
(accessToken, refreshToken, profile, done) => {
  const dataOne = {
    profile,
    token: accessToken
  };
  // console.log("refreshToken   " + refreshToken);
  console.log(profile);
  // console.log("accessToken   " + accessToken);
  // console.log(dataOne);
  return done(null, dataOne);
}));
