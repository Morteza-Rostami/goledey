//import logo from './logo.svg';
import './App.scss';
import '../src/THEME/GLOBAL.css';

// import hoks:
import React, {useEffect, useId, useRef, useState} from 'react';
// import react router
import { Routes, Switch, Route, Link } from 'react-router-dom';

// import pages:
import Product from './PAGES/ProductPage/productPage';

// Dev Admin pages:
import DevDashboard from './PAGES/AdminPage/DevAccess/DevDashboardPage';
import CreateProduct from './PAGES/AdminPage/DevAccess/CreateProductPage';

// redux
import { useDispatch, useSelector } from 'react-redux';

// actions
// import { getCartLocalStorage } from './ACTIONS/cartActions';
import Cart from './PAGES/CartPage/Cart';
import Register from './PAGES/RegisterPage/Register';
import Dashboard from './PAGES/UserPage/Dashboard/Dashboard';
import Orders from './PAGES/UserPage/Orders/Orders';
import Settings from './PAGES/UserPage/Settings/Settings';
//import { getCartFromDb } from './ACTIONS/cartActions';

import { useNavigate, useLocation } from 'react-router-dom';
// decode token
import decode from 'jwt-decode';
import { getAuthFromLS, logout, setUserComplete } from './ACTIONS/userActions';
import Checkout from './PAGES/CheckoutPage/Checkout';
import Address from './PAGES/UserPage/Address/Address';
import ShopPage from './PAGES/ShopPage/ShopPage';
import HomePage from './PAGES/HomePage/HomePage';
import UpdateItemPage from './PAGES/AdminPage/UpdateItemPage/UpdateItemPage';
import ProductsList from './PAGES/AdminPage/ProductsList/ProductsList';
import LoadScreen from './COMPONENTS/LoadScreen/LoadScreen';

// random id
import { v4 as uuidv4 } from 'uuid';
import { setSnackObj } from './ACTIONS/msgActions';
import { useSnackbar } from 'notistack';
import { getCartDb, getCartLS } from './ACTIONS/cartActions';
import AdminOrders from './PAGES/AdminPage/AdminOrders/AdminOrders';

/* seo: set document head */
import {Helmet} from "react-helmet";
import PayLoadPage from './PAGES/PayLoadPage/PayLoadPage';

import PaySuccess from './PAGES/Errors/PaySuccess/PaySuccess'
import PayFailed from './PAGES/Errors/PayFailed/PayFailed'
import GateGuest from './HELPERS/Permissions/GateGuest';
import LoginModel from './PAGES/RegisterPage/LoginModal/LoginModal';

import {Navigate} from 'react-router-dom';
import CONST from './CONSTANTS/CONST';

function App({
  //showLoader,
  //hideLoader,
}) {
  /* snackbars */
  // const snacks = useSelector(state => state.toastStore.toasts);
  const token = JSON.parse(localStorage.getItem('auth'))?.token;
  const user = JSON.parse(localStorage.getItem('auth'))?.user;
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // check for admin and auth
  useEffect(() => {
    if (token) {
      setIsAuth(true);

      // if: user.admin
      const decodedToken = decode(token);
      if (decodedToken.role === CONST.ADMIN) {
        setIsAdmin(true);
      }
    }
  }, [token]);

  // is font loaded
  const [appReady, setAppReady] = useState(false);

  const firstRender = useRef(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const randomId = () => uuidv4();
  const snackObj = useSnackbar();

  function logoutExpireToken() {
    const token = JSON.parse(localStorage.getItem('auth'))?.token;

    if (token) {
      const decodedToken = decode(token);
      if ((decodedToken.exp * 1000) < new Date().getTime()) {
        dispatch(logout(navigate));
      }
    }
  }

  /* stop load screen */

  /* set snack obj */
  useEffect(() => {
    dispatch(setSnackObj(snackObj));
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      // action: update store.cart with: localStorage.cart
      dispatch(getAuthFromLS());
      
      // if: auth -> get db.cart to store.cart
      if ( user ) {
        const data = { userId: user._id }
        dispatch(getCartDb(data));

      } else {
        dispatch(getCartLS());
      }

      logoutExpireToken();
      firstRender.current = false; 
    }
  }, []);

  // on changing browser location-> if: token expired delete auth:
  useEffect(() => {
    logoutExpireToken();
  }, [location]);

  // check user profile complete
  useEffect(() => {
    if (user) {
      dispatch(setUserComplete());

    }
  }, []);

  // is app ready (font loaded)
  useEffect(() => {
    
    document.fonts.load("1rem MjDinar")
    .then(() => {
      return document.fonts.load('1rem NotoSansArabicMedium')
    })
    .then(() => setAppReady(true));
  }, [])

  if (!appReady) {
    return <></>
  }


  return (
    <div className="App">

      {/* document head */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>فروشگاه | اینترنتی (گلِ دی)</title>
        <link rel="canonical" href="https://goledey.com/" />
        <meta name='description' content='فروشِ بهترین سبد گل پایه گل و دسته گل در کرج و تهران'/>
      </Helmet>
      
      <Routes>
        
        <Route path='/' element={<HomePage/>}/>
        <Route path='/shop' element={<ShopPage/>} />
        <Route path='/product/:slug' element={<Product key={randomId()}/>}/>
        {/* <Route 
          path='/product/:slug' 
          render={(props) => <Product {...props} key={randomId()}/>}
        /> */}
        <Route path='/cart/:useId' element={<Cart/>}/>

        {/* login */}
        <Route path='/register' element={<Register/>}/>

        {/* user profile */}
        <Route 
        path={'/users/dashboard/:userId'} 
        element={isAuth ? <Dashboard/> : <Navigate replace to={'/'}/>}
        />
        <Route 
        path={'/users/orders/:userId/:status'} 
        element={isAuth ? <Orders key={randomId()} /> : <Navigate replace to={'/'}/>}
        />
        <Route 
        path={'/users/settings/:userId'} 
        element={isAuth ? <Settings/> : <Navigate replace to={'/'}/>}
        />
        <Route 
        path={'/users/address/:userId'} 
        element={isAuth ? <Address/> : <Navigate replace to={'/'}/>}
        />

        {/* checkout */}
        <Route 
          path={`/checkout/:userId`}
          element={isAuth ? <Checkout/> : <Navigate replace to={'/'}/>}
        />

        {/* Dev admin Routes */}
        <Route 
          path='/admin/dashboard' 
          element={isAdmin ? <DevDashboard/> : <Navigate replace to={'/'}/>}
        />
        <Route 
        path='/admin/create/product' 
        element={isAdmin ? <CreateProduct/> : <Navigate replace to={'/'}/>} 
        />
        <Route 
        path='/admin/products' 
        element={isAdmin ? <ProductsList/> : <Navigate replace to={'/'}/>}
        />
        <Route 
        path='/admin/edit/product/:slug' 
        element={isAdmin ? <UpdateItemPage/> : <Navigate replace to={'/'}/>}
        />

        <Route 
        path='/admin/orders' 
        element={isAdmin ? <AdminOrders/> : <Navigate replace to={'/'}/>}
        />
        
        {/* <Route path='/admin/delete/product/:id' element={<UpdateItemPage/>}/> */}

        {/* after zpal checkout come to loading screen untill payment success is checked. */}
        <Route 
        path='/payment/loadscreen' 
        element={isAuth ? <PayLoadPage/> : <Navigate replace to={'/'}/>}
        />

        {/* payment failed */}
        <Route 
        path='/payment/success' 
        element={isAuth ? <PaySuccess/> : <Navigate replace to={'/'}/>}
        />
        {/* payment success */}
        <Route 
        path='/payment/failed' 
        element={isAuth ? <PayFailed/> : <Navigate replace to={'/'}/>}
        />
      </Routes>
      
      <LoadScreen/>
      <GateGuest>

        <LoginModel/>
      </GateGuest>
    </div> /* app */
  );
}

export default App;






/* 

{
        snacks
        ? snacks.map((snack, i) => React.cloneElement(snack, {key: i}))
        : ''
      }
*/