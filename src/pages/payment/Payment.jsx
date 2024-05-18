import Axios from 'axios';
import "./payment.css";
import { useEffect } from 'react';
import { useCart } from '../../context/cart/useCart';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../utils/urlConfig';

function Payment(props) {
  const { cart, setCartState, setTotalQuantity,totalQuantity } = useCart();
  const navigate = useNavigate()
  const loadScript = () => {
    return new Promise((resolve, reject)=>{
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    })
  }
  const displayRazorpay = async() =>{
    const netTotalPrice = Object.values(cart).reduce(
      (total, item) => total + item.price * item.quantity,
      0
  );
    await loadScript();
    const data = {
      amount: netTotalPrice*100,
      currency: "INR",
    };
    const resp = await Axios.post(`${BASE_URL}/checkout`, data);
    const {id, amount, currency } = resp.data.data;
    let options = {
        "key": 'rzp_test_RRv9RrX1Y1mqqZ', // Enter the Key ID generated from the Dashboard
        "amount": amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": currency,
        "name": "AKASH SONI Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response){
          setCartState({});
          setTotalQuantity(0);
          sessionStorage.removeItem("checkout");
          alert("Ypur order is placed successfully")
          const headers = {
            'Content-Type': 'application/json',
            'x-razorpay-signature': response.razorpay_signature, // Example of an authorization header
          };
          navigate("/orders");
          await Axios.post(`${BASE_URL}/verify`, {
            "order_id" : response.razorpay_order_id,
             "products" :cart,
             "date": Date.now(),
             "user_id" : sessionStorage.getItem("email")
          },{headers})
          
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
        },
        "prefill": {
            "name": "Akash Soni",
            "email": "aakashkumarsoni0786@gmail.com",
            "contact": "7275022124"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var razorpayInst = new Razorpay(options);
    razorpayInst.open();
  }
  useEffect(()=>{
    if(props.goToPayment) {
      displayRazorpay()
    }
  },[props.goToPayment]);
  return (
    <>
      {totalQuantity>0 && <button className="cart-net-total-paybtn"  onClick={props.checkout}>
        Proceed to Pay
      </button>}
    </>
  );
}

export default Payment