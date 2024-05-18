import { useEffect, useState } from "react";
import CartItem from "../../components/cartItem/CartItem";
import Axios from 'axios';
import './order.css';
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/urlConfig";

const OrderItems = () => {
  const [orderItems,setOrderItems] = useState([]);

  const navigate = useNavigate();
    useEffect(async()=>{
      if(sessionStorage.getItem("email")){
      const res = await Axios.get(`${BASE_URL}/orders`)
      console.log("data ",res.data.data)
      setOrderItems(res.data.data.filter((e)=>e.user == sessionStorage.getItem("email")))}
      else {
        alert("Please login first!")
        navigate("/login");
      }
    },[])
    function getSum(total, num) {
      return total + num.price *  num.quantity;
    }
    return (
      <>
      <h2 className="cart-items-heading">Your Orders </h2>
      {orderItems.map((item,index)=>{
        return <ul className="cart-items">
          <div className="cart-net-total">
        <p className="cart-net-total-label">{index+1}. Order id : {item.orderId}</p>
        <p className="cart-net-total-label">Date : {item.bookedAt}</p>
      </div>
        {item.product.map((prod, index) => {
          return <CartItem key={`cart-item-${index}`} cartData={prod} />;
        })}
        <div className="cart-net-total">
        <p className="cart-net-total-label">Total Price</p>
        <p className="cart-net-total-label">₹{item.product.reduce(getSum,0)}</p>
      </div>
      <div className="cart-net-line"></div>
      </ul>
      })}

      
    </>
    );
}

export default OrderItems;