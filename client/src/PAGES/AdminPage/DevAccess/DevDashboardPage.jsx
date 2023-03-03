import React from "react";
import { Link } from "react-router-dom";
// import LayoutA from "../../../LAYOUTS/LayoutA/LayoutA";
import AutoLayout from "../../../LAYOUTS/AutoLayout/AutoLayout";
import Header from "../../../LAYOUTS/Header/Header";
import MobNav from "../../../LAYOUTS/MobNav/MobNav";
import Footer from "../../../LAYOUTS/Footer/Footer";

const DevDashboard = () => {

  return (
    <AutoLayout
      headerMob={<Header/>}
      headerDec={<Header/>}
      footerMob={<MobNav/>}
      footerDec={<Footer/>}
    >
      <h2>Dev DashBoard</h2>
      <Link to='/admin/create/product'>
        ایجاد محصول
      </Link>
      <Link to='/admin/products'>
        محصولات
      </Link>
      <Link to='/admin/orders'>
        سفارشات
      </Link>
    </AutoLayout>
  )
}

export default DevDashboard;