// import p1 from "./images/p1.jpg";
// import p2 from "./images/p2.jpg";
// import p3 from "./images/p3.jpg";
// import p4 from "./images/p4.jpg";
import bcrypt from "bcryptjs";
const data = {

 products: [
    {
      // _id: "1",
      name: "Nike slim shirt",
      slug: "nike-slim-shirt",
      category: "shirts",
      image: "https://m.media-amazon.com/images/I/61NqJPjHHJL._AC_SY500_.jpg",
      countInStock: 10,
      brand: "Nike",
      price: 12,
      rating: 3,
      numReviews: 10,
      description: "high quality shirt",
    },
    {
      // _id: "2",
      name: "Adidas fit shirt",
      slug: "adidas-fit-shirt",
      category: "shirts",
      image: "https://m.media-amazon.com/images/I/71KohBeO1iL._AC_SY500_.jpg",
      countInStock: 10,
      brand: "Nike",
      price: 120,
      rating: 4,
      numReviews: 10,
      description: "high quality shirt",
    },
    {
      // _id: "3",
      name: "Nike slim pant",
      slug: "nike-slim-pant",
      category: "pants",
      image: "https://m.media-amazon.com/images/I/71XcPtgW-7L._AC_SX522_.jpg",
      countInStock: 10,
      brand: "Nike",
      price: 20,
      rating: 4.5,
      numReviews: 10,
      description: "high quality shirt",
    },

    {
      // _id: "4",
      name: "Adidas fit pant",
      slug: "adidas-fit-pant",
      category: "pants",
      image: "https://m.media-amazon.com/images/I/61eTV5lI+RL._AC_SY741_.jpg",
      countInStock: 0,
      brand: "Nike",
      price: 120,
      rating: 5,
      numReviews: 10,
      description: "high quality shirt",
    },
  ],

  users: [
    {
      name: "Amanuel",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "John",
      email: "user@test.com",
      password: bcrypt.hashSync("23456"),
      isAdmin: false,
    },
  ],
};
export default data;
