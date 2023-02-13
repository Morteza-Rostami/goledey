import React from "react";
import { useDispatch } from "react-redux";
// use selector -> for getting state:
import { useEffect } from "react";
// import action:
import { readProducts } from '../../../ACTIONS/productActions';
import { searchProduct } from "../../../ACTIONS/productActions";

import { useSelector } from "react-redux";
import ProductCard from "./ProductCard/ProductCard.c";
import styled from "styled-components";

// css
import styles from './ProductGrid.module.scss';
import CardSkeleton from "./CardSkeleton/CardSkeleton";
import ContainerA from "../../../COMPONENTS/containers/ContainerA";
import Paginate from "../../../COMPONENTS/Paginate/Paginate";

import { PRODUCTS_LIMIT } from "../../../CONSTANTS/CONST";
import { useSearchParams } from "react-router-dom";
import { selectCatChip, setMainAndSubCat } from "../../../ACTIONS/categoriesActions";
import PagSkeleton from "./PagSkeleton/PagSkeleton";
import NotFound from "../../Errors/NotFound/NotFound";

//css 

const ProductGrid = (
  { 
    products ,
    shopReqDone,
  }) => {
  let firstRender = true;
  // const products = useSelector((state) => 
  //   state.productsStore.products);
  // is card loading or not
  const isLoading = useSelector(state => state.productsStore.isLoading);
  const totalPages = useSelector(state => state.productsStore.pagObj.total) || 1;
  const selectedCats = useSelector(state => state.categoriesStore?.selectedCats)
  const searchedTerm = useSelector(state => state.searchStore?.searchedTerm);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  function onClickPaginate(newPage) {
    // dispatch this for: all products and category filters
    dispatch(
      readProducts(
        newPage, 
        selectedCats ? selectedCats : [],
        searchedTerm ? searchedTerm : '')
    );
  }

  // useEffect(() => {
    

    

  //   firstRender = false;
  // }, []);

  /* const cards = {
    products: products.map(product => <ProductCard product={product} key={product._id}/>),
    fillers: 
      [...Array(PRODUCTS_LIMIT - products.length)
      .keys()]
      .map((val, inx) => 
      <div 
        key={inx} 
        style={{
        height: 100 
      }}> 
      </div>)
  } */

  // do not no result untill => products load
  if (!isLoading && !products?.length && shopReqDone) {
    return (
      <div className={`${styles.emp__grid}`}>
        <NotFound/>
      </div>
    )
  }

  return (
    <div
      className={`${styles.product_grid} center-contain`}
    >
      
      <div
        className={`${styles.inner} contain`}
      >

        <div 
          className={`${styles.grid}`}>
          {

            isLoading || !shopReqDone 
            ? (
              [...Array(PRODUCTS_LIMIT).keys()].map((val, inx) => <CardSkeleton key={inx}/>)
            ) 
            : (
              
              products?.length
              ?
              products.map(product => <ProductCard product={product} key={product._id}/>)
              : ''
             
            )
          }

        
        </div>
        
        <div
          style={{
            marginTop: 'auto'
          }}
        >
          {/* skeleton paginate */}
          {
            isLoading || !shopReqDone
            ? (
              <PagSkeleton/>
            ) : (
              <Paginate 
              //dispatchAction={onClickPaginate} 
                totalPages={totalPages}
              />
            )
          }
        </div>

      </div>
    </div>
  )
}

export default ProductGrid;