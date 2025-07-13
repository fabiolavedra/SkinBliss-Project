const Product = require("../models/Product");
const Brand = require("../models/Brand");
const Category = require("../models/Category");
const crypto = require("crypto-js");
const catchAsync = require("../utils/catchAsync");

//Create a new product (only admin can access this)
const createProduct = catchAsync(async (req, res, next) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();

  res.status(200).json(savedProduct);
});

//Update a product (only admin can access this)
const updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      photo: req.body.photo,
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      stock: req.body.stock,
      skinType: req.body.skinType,
      categoryId: req.body.categoryId,
      brandId: req.body.brandId,
      active: req.body.active,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedProduct);
});

//Delete a product (make it inactive)
const deleteProduct = catchAsync(async (req, res, next) => {
  await Product.findByIdAndUpdate(
    req.params.id,
    { active: false },
    { new: true }
  );

  res.status(200).json("Product is deleted");
});

//Get a specific product by id
const getProduct = catchAsync(async (req, res, next) => {
  let canSearchInactive = false;

  if (req.user && req.user.role === "admin") {
    canSearchInactive = true;
  }

  const filter = { _id: req.params.id };
  if (!canSearchInactive) {
    filter.active = true;
  }

  const productAndReviews = await Product.findOne(filter)
    .populate({
      path: "reviews",
      populate: {
        path: "userId",
        select: "name surname",
      },
    })
    .populate("categoryId", "name photo desc")
    .populate("brandId", "name photo desc");

  res.status(200).json(productAndReviews || []);
});

//Get all products with queries
const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ active: true })
    .populate("reviews")
    .populate("categoryId")
    .populate("brandId");

  res.status(200).json(products);
});

const getSuggestedProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({
    active: true,
    skinType: req.user.skinType,
  }).populate("categoryId", "name photo desc");

  res.status(200).json(products);
});

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSuggestedProducts,
};
