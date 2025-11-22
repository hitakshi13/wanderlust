const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controllers/listings.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// --------------------- INDEX + CREATE ---------------------
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// --------------------- NEW FORM ---------------------
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

// --------------------- CATEGORY ---------------------
router.get(
  "/category/:category",
  wrapAsync(listingController.filterByCategory)
);

// --------------------- SEARCH ---------------------
router.get(
  "/search",
  wrapAsync(async (req, res) => {
    const { query } = req.query;
    const listings = await Listing.find({
      $or: [
        { country: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
    });
    res.render("listings/index", { listings, query });
  })
);

// --------------------- SHOW + UPDATE + DELETE ---------------------
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// --------------------- EDIT FORM ---------------------
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
