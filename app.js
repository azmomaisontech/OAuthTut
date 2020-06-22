const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoute = require("./routes/auth-route");
const profileRoute = require("./routes/profile-route");
const connectDB = require("./config/db");
const { cookie } = require("./config/keys");
require("./config/passport-setup");

const app = express();

// Initialize the DB
connectDB();

//Set up view engine
app.set("view engine", "ejs");

// Cookie Session
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [cookie.key]
  })
);

// Initiliaze passport
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.use("/auth", authRoute);
app.use("/profile", profileRoute);

// Create home route
app.get("/", (req, res) => {
  res.render("home");
});

// Connect Server
app.listen(5000, () => {
  console.log("Server started on Port 5000");
});
