const ShoppingCart = require("../models/Cart");

const catchAsync = require("../utils/catchAsync");

//Add a product to the cart
const addCart = catchAsync(async (req, res, next) => {
  const product = req.body.product;
  const userCart = await getUserShoppingCart(req.user._id);

  if (userCart) {
    // Check if product already exists in cart
    const existingProduct = userCart.cartProducts.find(
      (item) => item.productId.toString() === product.productId
    );

    if (existingProduct) {
      // Update quantity if product exists
      existingProduct.quantity += product.quantity || 1;
    } else {
      // Add new product to cart
      userCart.cartProducts.push({
        productId: product.productId,
        quantity: product.quantity || 1,
      });
    }

    const updatedCart = await userCart.save();
    return res.status(200).json(updatedCart);
  }

  // Create new cart if doesn't exist
  const newCart = new ShoppingCart({
    userId: req.user._id,
    cartProducts: [
      {
        productId: product.productId,
        quantity: product.quantity || 1,
      },
    ],
  });

  const savedCart = await newCart.save();
  return res.status(201).json(savedCart);
});

//Update the cart items
const updateCart = catchAsync(async (req, res, next) => {
  const product = req.body.product;

  console.log({
    product,
    userId: req.user._id,
  });

  const userCart = await getUserShoppingCart(req.user._id);

  if (!userCart) {
    return res.status(404).json("Cart not found");
  }

  // Find and update the product in cart
  const productIndex = userCart.cartProducts.findIndex(
    (item) => item.productId.toString() === product.productId
  );

  if (productIndex !== -1) {
    userCart.cartProducts[productIndex].quantity = product.quantity;
    const updatedCart = await userCart.save();
    res.status(200).json(updatedCart);
  } else {
    res.status(404).json("Product not found in cart");
  }
});

//Get a specific user cart
const getUserCart = catchAsync(async (req, res, next) => {
  const userCart = await getUserShoppingCart(req.user._id);

  if (!userCart) {
    return res.status(404).json("Cart not found");
  }

  res.status(200).json(userCart);
});

const deleteAllCartItems = async (userId) => {
  const userCart = await ShoppingCart.findOne({ userId: userId });
  if (userCart) {
    userCart.cartProducts = [];
    await userCart.save();
  }
};

//Delete an item from the cart
const deleteUserCart = catchAsync(async (req, res, next) => {
  const userCart = await getUserShoppingCart(req.user._id);

  if (!userCart) {
    return res.status(404).json("Cart not found");
  }

  // Remove product from cart
  userCart.cartProducts = userCart.cartProducts.filter(
    (item) => item.productId.toString() !== req.params.productId
  );

  await userCart.save();
  res.status(200).json("Cart item is deleted");
});

const getUserShoppingCart = async (userId) => {
  const userCart = await ShoppingCart.findOne({ userId: userId }).populate({
    path: "cartProducts.productId",
    model: "Product",
    populate: [
      { path: "brandId", model: "Brand" },
      { path: "categoryId", model: "Category" },
    ],
  });

  return userCart;
};

//Get all users carts (only admin can access this)
const getAllCarts = catchAsync(async (req, res, next) => {
  const all_carts = await ShoppingCart.find().sort({ createdAt: -1 });
  res.status(200).json(all_carts);
});

module.exports = {
  addCart,
  updateCart,
  getUserCart,
  deleteUserCart,
  getAllCarts,
  getUserShoppingCart,
  deleteAllCartItems,
};
