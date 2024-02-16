import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js";
import { isAuth } from "../utils.js";

const OrderRouter = express.Router();

OrderRouter.get(
  "/orderlist",
  expressAsyncHandler(async (req, res) => {
    const orderlist = await Order.find();
   
    res.send(orderlist);
  })
);

OrderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // Order.collection.updateMany();
    // Order.collection.insertOne();
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
      // users: req.user.name,
    });
    // newOrder.collection.insertOne({ users: req.user.name });

    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Created", order });
  })
);

OrderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

OrderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);
OrderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedorder = await order.save();
      res.send({ message: "Order is paid", order: updatedorder });
    } else {
      res.status(404).send({
        message: "Order Not Found",
      });
    }
  })
);

export default OrderRouter;
