// routes/users.js
const express = require("express");
const router = express.Router();

const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

// SIGNUP (GET + POST)
router
  .route("/signup")
  .get(userController.renderSignup)
  .post(wrapAsync(userController.signup));

// LOGIN (GET + POST)
router
  .route("/login")
  .get(userController.renderLogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    wrapAsync(userController.login)
  );

// LOGOUT (single route → cannot be chained)
router.get("/logout", userController.logout);

module.exports = router;