const router = require("express").Router();
const passport = require("passport");

//Auth login
router.get("/login", (req, res) => {
  res.render("login");
});

//Auth logout
router.get("/logout", (req, res) => {
  res.send("Logging out");
});

//Auth login Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

//Calback route for google to redirect back
// to after permission screen
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile/");
});

module.exports = router;
