import axios from "axios";
import React from "react";
import { useEffect, useReducer } from "react";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orderslist: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function OrderlistScreen() {
  const [{ loading, error, orderslist }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    orderslist: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `http://localhost:3001/api/order/orderlist`
        );
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data,
        });
        // console.log(data);
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <h1>Orders</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAl</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orderslist.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>Aman</td>
                  <td>{order.createdAt?.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.isPaid.substring(0, 10) : "NO"}</td>
                  <td>
                    {order.isDelivered
                      ? order.isDeliveredAt.substring(0, 10)
                      : "NO"}
                  </td>

                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      Delete
                    </Button>

                    <Button
                      type="button"
                      variant="light"
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderlistScreen;
