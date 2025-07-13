const Brand = require("../models/Brand");
const catchAsync = require("../utils/catchAsync");

const createBrand = catchAsync(async (req, res, next) => {
  const newBrand = new Brand(req.body);
  const savedBrand = await newBrand.save();

  res.status(201).json(savedBrand);
});

const updateBrand = catchAsync(async (req, res, next) => {
  const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedBrand);
});

const deleteBrand = catchAsync(async (req, res, next) => {
  await Brand.findByIdAndDelete(req.params.id);

  res.status(200).json("Brand is deleted");
});

const getBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  res.status(200).json(brand);
});

const getAllBrands = catchAsync(async (req, res, next) => {
  const brands = await Brand.find();

  res.status(200).json(brands);
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrands,
};
