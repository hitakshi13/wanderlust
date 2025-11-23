if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log("SECRET_KEY =", process.env.SECRET_KEY);
console.log("ATLASDB_URL =", process.env.ATLASDB_URL);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local");
const passport = require("passport");
const User = require("./models/user.js");

const sessionSecret = process.env.SECRET_KEY || "fallbacksecret";
const MONGO_URL = process.env.ATLASDB_URL;

// --------------------- CONNECT TO MONGO ---------------------
main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// --------------------- VIEW ENGINE ---------------------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --------------------- MIDDLEWARE ---------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// --------------------- SESSION (NO STORE) ---------------------
const sessionOptions = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};

app.use(session(sessionOptions));
app.use(flash());

// --------------------- PASSPORT ---------------------
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --------------------- FLASH & CURRENT USER ---------------------
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// --------------------- ROUTES ---------------------
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// --------------------- 404 ---------------------
app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// --------------------- GLOBAL ERROR HANDLER ---------------------
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  res.status(statusCode).render("error.ejs", { err });
});

// --------------------- START SERVER ---------------------
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
