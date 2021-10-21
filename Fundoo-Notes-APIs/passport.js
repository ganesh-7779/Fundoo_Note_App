const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// The user  (i have provide as the second argument of the done function) is saved in the session
// and is later used to retrieve the whole object via the deserializeUser function.
// serializeUser determines which data of the user object should be stored in the session.
// The result of the serializeUser method is attached to the session as req.session.passport.user = {}.
// Here for instance, it would be (as we provide the user  as the key)
passport.serializeUser((user, done) => {
  // console.log(user);
  done(null, user);
  // saved to session
  // req.session.passport.user = {user: '..'}
});

// The first argument of deserializeUser corresponds to the key of the user object that was given to the done function.
// So your whole object is retrieved with help of that key.
// That key here is the user  object. In deserializeUser that key is matched with the in memory array / database or any data resource.
passport.deserializeUser((user, done) => {
  console.log("deserializeUser");
  // console.log(user);
  done(null, user);
  // user object attaches to the request as req.user
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
  // console.log(profile);
  // console.log("accessToken   " + accessToken);
  // console.log(dataOne);
  return done(null, dataOne);
}));
