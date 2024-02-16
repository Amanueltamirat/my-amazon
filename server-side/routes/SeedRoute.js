import express from "express";
import Product from "../models/UserModel.js";
import data from "../data.js";
import User from "../models/UserModel.js";

const SeedRouter = express.Router();
SeedRouter.get("/", async (req, res) => {
  
  await Product.deleteMany({});
  // const CreatedProducts = await Product.insertMany(data);

  // await User.deleteMany({});
  // const CreatedUsers = await User.insertMany(data.users);
  res.send({ msg:'there is nothing' });
});

export default SeedRouter;
