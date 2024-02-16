import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import Col from "react-bootstrap/Col";
import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Products from "../components/Products";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return {
        state,
      };
  }
};
const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },
  {
    name: "3stars & up",
    rating: 3,
  },
  {
    name: "2stars & up",
    rating: 2,
  },
  {
    name: "1stars & up",
    rating: 1,
  },
];

function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParametr = new URLSearchParams(search);
  const category = searchParametr.get("category") || "all";
  const query = searchParametr.get("query") || "all";
  const price = searchParametr.get("price") || "all";
  const rating = searchParametr.get("rating") || "all";
  const order = searchParametr.get("order") || "newest";
  const page = searchParametr.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
      products: [],
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://my-amazon-14yi.onrender.com/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
        // console.log(err);
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);
  const [categories, setCategories] = useState([]);
  console.log(categories);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `https://my-amazon-14yi.onrender.com/api/products/categories`
        );
        setCategories(data);
        console.log(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <h3>Department</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={"all" === category ? "text-bold" : ""}
                  to={getFilterUrl({ category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => {
                return (
                  <li key={c}>
                    <Link
                      className={c === category ? "text-bold" : ""}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={"all" === price ? "text-bold" : ""}
                  to={getFilterUrl({ price: "all" })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => {
                return (
                  <li key={p.value}>
                    <Link
                      className={p.value === price ? "text-bold" : ""}
                      to={getFilterUrl({ price: p.value })}
                    >
                      {p.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => {
                return (
                  <li key={r.name}>
                    <Link
                      className={r.rating === rating ? "text-bold" : ""}
                      to={getFilterUrl({ rating: r.rating })}
                    >
                      <Rating caption={" & up"} rating={r.rating}></Rating>
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  to={getFilterUrl({ rating: "all" })}
                  className={rating === "all" ? "text-bold" : ""}
                >
                  <Rating caption={" & up"} rating={0}></Rating>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="jusfify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? "No" : countProducts} Results
                    {query !== "all" && ":" + query}
                    {category !== "all" && ":" + category}
                    {price !== "all" && ":" + price}
                    {rating !== "all" && ":" + rating}
                    {query !== "all" ||
                    category !== "all" ||
                    rating !== "all" ||
                    price !== "all" ? (
                      <Button
                        variant="light"
                        onClick={() => navigate("/search")}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort bt{" "}
                  <select
                    value={order}
                    onChange={(e) =>
                      navigate(getFilterUrl({ order: e.target.value }))
                    }
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <Row>
                {products.map((product) => {
                  return (
                    <Col sm={6} lg={4} className="mb-3" key={product._id}>
                      <Products product={product}></Products>
                    </Col>
                  );
                })}
              </Row>
              <div>
                {[...Array(pages).keys()].map((x) => {
                  return (
                    <LinkContainer
                      key={x + 1}
                      className="mx-1"
                      to={getFilterUrl({ page: x + 1 })}
                    >
                      <Button
                        className={Number(page) === x + 1 ? "text-bold" : ""}
                        variant="light"
                      >
                        {x + 1}
                      </Button>
                    </LinkContainer>
                  );
                })}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default SearchScreen;
