const mongoose = require("mongoose");

// Category collection schema
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    photo: { type: String, required: true },
    desc: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
