import express from "express";
import bodyParser from "body-parser";
import path from "path";
import mongoose from "mongoose";
import SeedRouter from "./routes/SeedRoute.js";
import ProductRouter from "./routes/ProductRoute.js";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import OrderRouter from "./routes/OrderRoute.js";
import cors from "cors";
dotenv.config();

let db =   mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
})
app.use("/api/seed", SeedRouter);
app.use("/api/products", ProductRouter);
app.use("/api/users", UserRoute);
app.use("/api/order", OrderRouter);

// db.users.drop();



const port = process.env.PORT || 3001;

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client-side/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client-side/build/index.html"));
});
//server error
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log("server is ready at " + port);
});
