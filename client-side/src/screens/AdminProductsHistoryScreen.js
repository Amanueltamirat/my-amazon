import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import axios from "axios";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function AdminProductsHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    products: [],
  });
  // console.log(userInfo);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`https://mern-app.onrender.com/api/products`);
        // http://localhost:3001/api/products
        
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL" });
        toast.error(getError(err));
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Helmet>
          <title>Products</title>
        </Helmet>
        <h1>Products</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => navigate(`/`)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => navigate(`/`)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminProductsHistoryScreen;
