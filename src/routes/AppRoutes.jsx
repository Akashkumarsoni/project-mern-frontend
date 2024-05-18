import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/header/Header';
import NotFound from '../pages/notFound/NotFound';
// import Loader from '../components/loader';
import useFetchData from '../hooks/useFetchData';
import ProductListing from '../pages/productListing/ProductListing';
import CartItems from '../pages/cartItems/CartItems';
import Signup from '../pages/signup/Signup';
import Login from '../pages/login/Login';
import Payment from '../pages/payment/Payment';
import OrderItems from '../pages/orders/Order';
import BASE_URL from '../utils/urlConfig';
const AppRoutes = () => {

  const {data: categories, error, isLoading } = useFetchData(`${BASE_URL}/api/product/categories`, []);
  // ["electronics", "men's clothing", "women's clothing", "jewellery"];
  return (
      <>
      
      {/* <Loader /> */}
        <Router>
            {/* { user && user.length ? <Header categories={categories.data} isLoading={isLoading}/> : <></>}  */}
            <Header categories={categories} isLoading={false}/>
            <Routes>
                <Route path='/' element={<ProductListing />} />
                <Route path='/cart' element={<CartItems />} />
                <Route path="/orders" element={<OrderItems />} />
                <Route  path='/products/:categoryName' element={<ProductListing />}/>
                <Route path='*' element={<NotFound />} />
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/payment" element={<Payment />}></Route>
            </Routes>
        </Router>
      </>
  )

}

export default AppRoutes;