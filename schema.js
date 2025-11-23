const Joi = require('joi');

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    category: Joi.string().required(),   // ✅ Added category here
    image: Joi.object({
      url: Joi.string().allow("", null),
      filename: Joi.string().allow("", null)
    }).allow(null)  // allow whole object to be null
  }).required()
});

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required()
  }).required()
});

module.exports = { listingSchema, reviewSchema };
