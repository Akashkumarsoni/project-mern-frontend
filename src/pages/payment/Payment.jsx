import Axios from 'axios';
import "./payment.css";
import { useEffect } from 'react';
import { useCart } from '../../context/cart/useCart';
import shortid from 'shortid';

function Payment(props) {
  const { cart } = useCart();
  const loadScript = () => {
    return new Promise((resolve, reject)=>{
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    })
  }
  console.log("cartData" ,cart)
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
    const resp = await Axios.post('http://localhost:3000/payment/checkout', data);
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
          console.log(response);
          const headers = {
            'Content-Type': 'application/json',
            'x-razorpay-signature': response.razorpay_signature, // Example of an authorization header
          };
          await Axios.post('http://localhost:3000/payment/verify', {
            "order_id" : response.razorpay_order_id
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
      <button className="cart-net-total-paybtn"  onClick={props.checkout}>
        Proceed to Pay
      </button>
    </>
  );
}

export default Payment