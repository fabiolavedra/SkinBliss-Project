const Order = require("../models/Order");
const Address = require("../models/Address");
const catchAsync = require("../utils/catchAsync");
const { getUserShoppingCart, deleteAllCartItems } = require("./cartController");

const createOrder = catchAsync(async (req, res, next) => {
  const cart = await getUserShoppingCart(req.user._id);
  if (!cart) {
    return res.status(400).json({ message: "Products are required" });
  }

  const products = cart.cartProducts;

  const total = products.reduce((acc, product) => {
    return acc + product.productId.price * product.quantity;
  }, 0);

  // Create address first
  const address = new Address(req.body.address);
  const savedAddress = await address.save();

  // Create order
  const order = new Order({
    userId: req.user._id,
    addressId: savedAddress._id,
    totalPrice: total,
    products: products.map((product) => ({
      productId: product.productId._id,
      quantity: product.quantity,
      price: product.productId.price,
    })),
  });

  const savedOrder = await order.save();
  await deleteAllCartItems(req.user._id);
  res.status(201).json(savedOrder);
});

const getLatestAddress = catchAsync(async (req, res, next) => {
  const order = await Order.findOne({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .populate("addressId")
    .select("addressId");

  if (!order) {
    return res.status(404).json({ message: "No orders found" });
  }

  res.status(200).json(order.addressId);
});

const getAllOrders = catchAsync(async (req, res, next) => {
  let orders;

  if (req.user.role === "admin") {
    orders = await Order.find()
      .populate({
        path: "products.productId",
        model: "Product",
        populate: [
          { path: "brandId", model: "Brand" },
          { path: "categoryId", model: "Category" },
        ],
      })
      .populate({
        path: "userId",
        select: "name surname phone email role",
      })
      .populate("addressId");
  } else {
    orders = await Order.find({ userId: req.user._id })
      .populate({
        path: "products.productId",
        model: "Product",
        populate: [
          { path: "brandId", model: "Brand" },
          { path: "categoryId", model: "Category" },
        ],
      })
      .populate({
        path: "userId",
        select: "name surname phone email role",
      })
      .populate("addressId");
  }

  res.status(200).json(orders);
});

const getSingleOrder = catchAsync(async (req, res, next) => {
  let order;

  if (req.user.role === "admin") {
    order = await Order.findById(req.params.id)
      .populate({
        path: "products.productId",
        model: "Product",
        populate: [
          { path: "brandId", model: "Brand" },
          { path: "categoryId", model: "Category" },
        ],
      })
      .populate({
        path: "userId",
        select: "name surname phone email role",
      })
      .populate("addressId");
  } else {
    order = await Order.findOne({ _id: req.params.id, userId: req.user._id })
      .populate({
        path: "products.productId",
        model: "Product",
        populate: [
          { path: "brandId", model: "Brand" },
          { path: "categoryId", model: "Category" },
        ],
      })
      .populate({
        path: "userId",
        select: "name surname phone email role",
      })
      .populate("addressId");
  }

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.status(200).json(order);
});

// const updateOrder = catchAsync(async (req, res, next) => {
//   const updated_order = await Order.findByIdAndUpdate(parseInt(req.params.id), req.body, {
//     new: true,
//     runValidators: true,
//   });
//   res.status(200).json(updated_order);
// });

const deleteOrder = catchAsync(async (req, res, next) => {
  await Order.findByIdAndDelete(req.params.id);

  res.status(204).json({ message: "Order deleted successfully" });
});

// const getUserOrders = catchAsync(async (req, res, next) => {
//   // console.log(req.params.id);
//   const find_order = await Order.find({ userId: req.params.id });
//   //console.log(find_cart);
//   res.status(200).json(find_order);
// });

// const getAllOrders = catchAsync(async (req, res, next) => {
//   const all_orders = await Order.find()
//     .populate({ path: "userId", select: "-__v -createdAt -updatedAt" }).populate({path:'product.productId' , select:'-_id -__v -createdAt -updatedAt'})
//     .sort({ createdAt: -1 });
//   res.status(200).json(all_orders);
// });

// const calculateIncome = catchAsync(async (req, res, next) => {
//   const productId = req.query.productId;
//   const date = new Date();
//   const last_month = new Date(date.setMonth(date.getMonth() - 1));
//   const previous_month = new Date(date.setMonth(last_month.getMonth() - 1));

//   const income = await Order.aggregate([
//     {
//       $match: {
//         createdAt: { $gte: previous_month },
//       },
//     },
//     { $project: { month: { $month: "$createdAt" }, sales: "$total" } },
//     {
//       $group: {
//         _id: "$month",
//         total: { $sum: "$sales" },
//       },
//     },
//   ]);

//   res.status(200).json(income);
// });

module.exports = {
  // calculateIncome,
  createOrder,
  getAllOrders,
  getSingleOrder,
  deleteOrder,
  getLatestAddress,
  // updateOrder,
  // deleteOrder,
  // getUserOrders,
  // getAllOrders,
};
