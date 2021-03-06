const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  proName: {
    type: String,
    required: true,
  },
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sub-categories",
    required: true,
  },
  quantityInStock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: false,
    default: "",
  },
  productImages: {
    type: Array,
    required: true,
  },
  tag: {
    type: Array,
    required: true,
  },
  registerDate: {
    type: Date,
    default: Date.now(),
  },
});

function validateProductSchema(Product) {
  const JoiSchema = Joi.object({
    proName: Joi.string().required().max(20).min(2),
    catId: Joi.string().required(),
    quantityInStock: Joi.number().required(),
    price: Joi.number().required(),
    description: Joi.string().required().max(100).min(2),
    review: Joi.string().max(20).min(2),
    tag: Joi.array().required(),
    registerDate: Joi.date(),
    productImages: Joi.array().required(),
  }).options({ abortEarly: false });
  return JoiSchema.validate(Product);
}
module.exports.Product = mongoose.model("Product", ProductSchema);
module.exports.validateProductSchema = validateProductSchema;
