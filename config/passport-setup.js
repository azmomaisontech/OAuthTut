const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const { google } = require("./keys");
const User = require("../model/User");

// To send out to the browser
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Receiving the id back from the browser
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      //This callbackURL must be same as the one
      // you entered in the google developer console
      callbackURL: "/auth/google/redirect",
      clientID: google.clientID,
      clientSecret: google.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      // profile.id, profile.displayName are both
      // contained on the object returned by google

      // so first off, check your DB to see if the user
      //  with the googleID already ExtensionScriptApis,
      //  so you don't save them twice
      try {
        let user = await User.findOne({ googleId: profile.id });

        //The null is for the error
        if (user) return done(null, user);
        user = new User({
          username: profile.displayName,
          googleId: profile.id
        });
        await user.save();
        done(null, user);
      } catch (err) {
        console.log(err);
        done();
      }
    }
  )
);
