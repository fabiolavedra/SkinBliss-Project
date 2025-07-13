const mongoose = require("mongoose");

// Address collection schema
const addressSchema = new mongoose.Schema(
  {
    address: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    postal_code: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
