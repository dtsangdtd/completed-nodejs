const express = require("express");
const passport = require("passport");
const { authGoogleLogin } = require("../controllers/auth.controller");
const router = express.Router();

router.get("/google/callback", (req, res, next) => {
  passport.authenticate(
    "google",
    { successRedirect: false },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      // Pass the result of passport.authenticate to the custom callback
      authGoogleLogin(req, res, user, next);
    }
  )(req, res, next);
});

router.get(
  "/google",
  (req, res, next) => {
    // Save the original URL to the session
    req.session.returnTo = req.originalUrl;
    next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
