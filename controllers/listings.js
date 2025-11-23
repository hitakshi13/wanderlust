// controllers/listings.js
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const listings = await Listing.find({});
  res.render("listings/index.ejs", { listings });
};

module.exports.filterByCategory = async (req, res) => {
  const category = decodeURIComponent(req.params.category);
  const listings = await Listing.find({
    category: { $regex: `^${category}$`, $options: "i" }
  });

  if (listings.length === 0) {
    req.flash("error", `No listings found for "${category}"`);
    return res.redirect("/listings");
  }

  res.render("listings/index.ejs", { listings, category });
};

module.exports.createListing = async (req, res) => {
  let geoData = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1
    })
    .send();

  if (!geoData.body.features.length) {
    geoData.body.features[0] = { geometry: { type: "Point", coordinates: [0,0] } };
  }

  const listing = new Listing(req.body.listing);
  listing.geometry = geoData.body.features[0].geometry;

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  listing.owner = req.user._id;
  await listing.save();

  req.flash("success", "Successfully created a listing!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }

  listing.set(req.body.listing);

  if (req.body.listing.location !== listing.location) {
    let geoData = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
      .send();

    if (geoData.body.features.length > 0) {
      listing.geometry = geoData.body.features[0].geometry;
    }
  }

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  await listing.save();
  req.flash("success", "Successfully updated listing!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Successfully deleted listing!");
  res.redirect("/listings");
};

// FIXED VALIDATION
module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return next(new ExpressError(msg, 400));
  }
  next();
};
