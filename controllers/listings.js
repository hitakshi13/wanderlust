const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
module.exports.index = async (req, res) => {
  const listings = await Listing.find({});
  res.render("listings/index.ejs", { listings });
};
// --------------------- FILTER BY CATEGORY ---------------------
module.exports.filterByCategory = async (req, res) => {
  // Decode category from URL (handles spaces)
  const category = decodeURIComponent(req.params.category);

  // Find listings with case-insensitive exact match
  const listings = await Listing.find({
    category: { $regex: `^${category}$`, $options: "i" },
  });

  if (!listings || listings.length === 0) {
    req.flash("error", `No listings found for "${category}"`);
    return res.redirect("/listings");
  }

  // Render the same index view, passing filtered listings
  res.render("listings/index", { listings, category });
};


module.exports.createListing = async (req, res) => {
  const listing = new Listing(req.body.listing);
  await listing.save();
  req.flash("success", "Successfully created a listing!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Successfully updated listing!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted listing!");
  res.redirect("/listings");
};

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body.listing);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};  

