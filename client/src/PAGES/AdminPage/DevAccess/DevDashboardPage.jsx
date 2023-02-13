import React from "react";
import { Link } from "react-router-dom";
import LayoutA from "../../../LAYOUTS/LayoutA/LayoutA";

const DevDashboard = () => {

  return (
    <LayoutA>
      <h2>Dev DashBoard</h2>
      <Link to='/dev/create/product'>
        ایجاد محصول
      </Link>
      <Link to='/admin/products'>
        محصولات
      </Link>
      <Link to='/admin/orders'>
        سفارشات
      </Link>
    </LayoutA>
  )
}

export default DevDashboard;