import { useState } from "react";
import CartItem from "../../components/cartItem/CartItem";
import { useCart } from "../../context/cart/useCart";

import './cartItems.css';
import Payment from "../payment/Payment";
import { useNavigate } from "react-router-dom";

const cartItems = () => {
    const { cart,totalQuantity } = useCart();
    const [startPay,setStartPay] = useState(false)
    const navigate = useNavigate();
    // const [updatedCartData, setUpdatedCartData] = useState(cart);

    // Calculate the net total price
    const netTotalPrice = Object.values(cart).reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const proceedToPayment = () =>{
      const loggedin = sessionStorage.getItem("loggedIn");
      if(loggedin && loggedin == 'true') {
        setStartPay(true);
      }else {
        setStartPay(false)
        alert("Please login first!")
        navigate('/login');
        sessionStorage.setItem("checkout","true");

      }
    }
    // const onQuantityChange = (productId, newQuantity) => {
    //     // Find the item in the cart based on its productId
    //     const updatedCart = Object.values(updatedCartData).map((item) => {
    //       if (item.id === productId) {
    //         // Update the quantity of the specific item
    //         return {
    //           ...item,
    //           quantity: newQuantity,
    //         };
    //       }
    //       return item;
    //     });
      
    //     // Update the cart data in the parent component's state
    //     setUpdatedCartData(updatedCart);
    //   };
      

    return (
    <>
     {totalQuantity>0 ? <>
        <h2 className="cart-items-heading">Your cart Items</h2>
        <ul className="cart-items">
          {Object.values(cart).map((item, index) => {
            return <CartItem key={`cart-item-${index}`} cartData={item} />;
          })}
        </ul>

        <div className="cart-net-total">
          <p className="cart-net-total-label">Net Total</p>
          <p className="cart-net-total-price">₹{netTotalPrice.toFixed(2)}</p>
        </div>

        <div className="cart-net-total">
          {/* <p className="cart-net-total-label">Place Order</p> */}
          <Payment checkout = {proceedToPayment} goToPayment={startPay} />
        </div>
      </>:<div className="cart-net-no-item">
          <h2>No items are added to cart</h2>
      </div>}
    </>
    );
}

export default cartItems;