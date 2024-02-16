import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      // required: [true, "Title required"],
      // unique: true,
    },
    slug: {
      type: String,
      // required: [true, "Title required"],
      unique: true,
    },
    image: {
      type: String,
      // required: [true, "Title required"],
    },
    brand: {
      type: String,
      // required: [true, "Title required"],
    },
    category: {
      type: String,
      // required: [true, "category required"],
    },
    description: {
      type: String,
      // required: [true, "description required"],
    },

    countInStock: {
      type: Number,
      // required: [true, "Title required"],
    },
    price: {
      type: Number,
      // required: [true, "price required"],
    },
    rating: {
      type: Number,
      // required: [true, "Title required"],
    },
    numReviews: {
      type: Number,
      // required: [true, "Title required"],
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", ProductSchema);
export default Product;
