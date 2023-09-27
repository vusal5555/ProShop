import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import connectdb from "../config/db.js";

dotenv.config();

connectdb();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[1]._id;
    const sampleProdutcs = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProdutcs);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-id") {
  destroyData();
} else {
  importData();
}
