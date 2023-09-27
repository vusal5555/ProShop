import Product from "../models/Product.js";

const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(200).json(products);
};

const getSingProduct = async (req, res) => {
  const product = await Product.findById({ _id: req.params.id });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
};

export { getAllProducts, getSingProduct };
