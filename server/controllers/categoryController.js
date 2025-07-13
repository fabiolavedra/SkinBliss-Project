const Category = require("../models/Category");
const catchAsync = require("../utils/catchAsync");

const createCategory = catchAsync(async (req, res, next) => {
  const newCategory = new Category(req.body);
  const savedCategory = await newCategory.save();

  res.status(201).json(savedCategory);
});

const updateCategory = catchAsync(async (req, res, next) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedCategory);
});

const deleteCategory = catchAsync(async (req, res, next) => {
  await Category.findByIdAndDelete(req.params.id);

  res.status(200).json("Category is deleted");
});

const getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  res.status(200).json(category);
});

const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json(categories);
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
};
