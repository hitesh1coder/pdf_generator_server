import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    products: [],
  },
  { timestamps: true }
);

const Products = mongoose.model("product", productsSchema);

export default Products;
