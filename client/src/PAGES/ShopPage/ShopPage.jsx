import React, { useEffect, useRef } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
// import LayoutA from "../../LAYOUTS/LayoutA/LayoutA";
// import FilterBar from "./FilterBar/FilterBar";
import ProductGrid from "./ProductGrid/ProductGrid.c";

// import material ui stuff:
import { styled } from "@mui/material/styles";
import CatChips from "./CatChips/CatChips";
import LayoutHome from "../../LAYOUTS/LayoutHome/LayoutHome";
import { useSelector, useDispatch } from "react-redux";
import { readProducts } from "../../ACTIONS/productActions";
import { useState } from "react";


const ShopPage = ({ children }) => {
  const products = useSelector(state => state.productsStore?.products) || [];
  const dispatch = useDispatch();
  const [searchParams, setSearchParams]  = useSearchParams();
  const loc = useLocation();

  // request is done
  const [shopReqDone, setShopReqDone] = useState(false);
  const reqOnce = useRef(true);

  /* dispatch to get products on page load */
  useEffect(() => {

    //if (reqOnce.current) {
      const data = {
        mCat: searchParams.get('mCat'),
        sCat: searchParams.get('sCat'),
        page: searchParams.get('page') || 1,
        filters: searchParams.get('filters'),
        term: searchParams.get('term') || '',
        setShopReqDone: setShopReqDone,
      } 


      dispatch(readProducts(data));

      window.scrollTo(0, 0);

      //reqOnce.current = false;
    //}
  }, [loc]);

  return (
    <div>
      <LayoutHome>
        <CatChips/>
        <ProductGrid 
          products={products}
          shopReqDone={shopReqDone}
        />
        
      </LayoutHome>
    </div>
  )
}

export default ShopPage;


