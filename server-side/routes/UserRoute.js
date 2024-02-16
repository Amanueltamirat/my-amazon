import express from "express";
import expressAsyncHandler from "express-async-handler";
import bycrpt from "bcryptjs";
import User from "../models/UserModel.js";
import { generateToken, isAuth } from "../utils.js";
import data from '../data.js'
const UserRoute = express.Router();



UserRoute.get(
  "/userslist",
  expressAsyncHandler(async (req, res) => {
    await User.deleteMany({});
    const CreatedUsers = await User.insertMany(data.users);
    const userslist = await User.find({});
    // res.send(CreatedUsers);
    res.send(userslist)
  })
);

UserRoute.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bycrpt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);
UserRoute.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bycrpt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

UserRoute.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      (user.name = req.body.name || user.name),
        (user.email = req.body.email || user.email);
      if (req.body.password) {
        user.password = bycrpt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
    res.status(404).send({ message: "User Not Found" });
  })
);

export default UserRoute;
