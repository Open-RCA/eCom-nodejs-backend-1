const mongoose = require("mongoose");
const Joi = require("joi");
// import JoiObjectId from "joi-objectid"
// const JoiobjectId=JoiObjectId(Joi)
const JoiObjectId=require("joi-objectid")
const JoiobjectId=JoiObjectId(Joi)

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
    required: true,
  },
  productImages: {
    type: Array,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

function validateProductSchema(Product) {
  const JoiSchema = Joi.object({
    proName: Joi.string().required().max(20).min(2),
    catId: JoiobjectId().required(),
    quantityInStock: Joi.number().required(),
    price: Joi.number().required(),
    description: Joi.string().required().max(20).min(2),
    review: Joi.string().required().max(20).min(2),
    tag: Joi.string().required(),
    registerDate: Joi.date(),
    productImages: Joi.array().required(),
  }).options({ abortEarly: false });
  return JoiSchema.validate(Product);
}
module.exports.Product = mongoose.model("Product", ProductSchema);
module.exports.validateProductSchema = validateProductSchema;
