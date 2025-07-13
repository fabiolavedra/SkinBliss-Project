const mongoose = require("mongoose");
//Product collection schema
const productschema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    desc: { type: String, required: true, trim: true },
    photo: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    active: { type: Boolean, default: true },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    skinType: {
      type: String,
      enum: [
        "oily",
        "dry",
        "combination",
        "sensitive",
        "acne_prone_skin",
        "dry_acne_prone_skin",
        "hiperpigmentation",
        "not_specified",
      ],
      required: true,
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productschema.set("toObject", { virtuals: true });
productschema.set("toJSON", { virtuals: true });

productschema.virtual("reviews", {
  ref: "Review",
  foreignField: "productId",
  localField: "_id",
});

module.exports = mongoose.model("Product", productschema);
