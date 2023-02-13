import React, { useEffect } from "react";

// material ui
import { Paper } from "@mui/material";
import Chip from "@mui/material/Chip";


import { useDispatch, useSelector } from "react-redux";
// action
import { removeCategoryChip } from "../../../ACTIONS/categoriesActions";
import { deleteSearchedTerm } from "../../../ACTIONS/searchActions";
import { readProducts } from "../../../ACTIONS/productActions";
import { useLocation, useSearchParams } from "react-router-dom";
import { useState } from "react";
import CONST from "../../../CONSTANTS/CONST";

// css
import styles from './CatChips.module.scss';
import Skeleton from "react-loading-skeleton";

const CatChips = () => {
  // const cats = useSelector(state => state.categoriesStore.selectedCats);
  // is product loading
  const isLoading = useSelector(state => state.productsStore.isLoading);

  const categories = useSelector(state => state.categoriesStore?.categories);
  const [cats, setCats] = useState([]);
  const [term, setTerm] = useState('');

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const loc = useLocation();

  // get categories from url
  useEffect(() => {
    if (categories.length) {
      const arr = [];

      if (searchParams.has(CONST.TERM)) {
        setTerm(searchParams.get(CONST.TERM));
      } else {
        // if: not term in url
        setTerm('');
      }

      if (searchParams.has(CONST.MCAT)) 
        arr.push(categories.filter(i => i.slug === searchParams.get(CONST.MCAT))[0])

      if (searchParams.has(CONST.SCAT)) 
        arr.push(categories.filter(i => i.slug === searchParams.get(CONST.SCAT))[0])
      
      setCats(arr);
    }
  }, [loc.search, categories]);


  function handleDelete(catSlug) {


    if (searchParams.has(CONST.MCAT))
      if (searchParams.get(CONST.MCAT) === catSlug) searchParams.delete(CONST.MCAT)
    
    if (searchParams.has(CONST.SCAT))
      if (searchParams.get(CONST.SCAT) === catSlug) searchParams.delete(CONST.SCAT)
    setSearchParams(searchParams);



    // remove cat chip
    //dispatch(removeCategoryChip(catId));
    // remove mCat from url
    //searchParams.delete('mCat');
    // update url state
    //setSearchParams(searchParams);

    // searchParams.delete('sCat');
    // setSearchParams(searchParams);
  }

  function handleSearchChipDelete() { 
    if (searchParams.has(CONST.TERM))
      searchParams.delete(CONST.TERM);
      setSearchParams(searchParams);
  }

  // if products loading
  if (isLoading) {
    return (
     <></>
    )
  }

  // if no chips
  if(!cats?.length && !term.length ) return <></>

  return (
    <div
      className={`${styles.cat_chips} center-contain`}
    >
      <div
        className={`${styles.inner} contain`}
        component="ul"
      >

        {
          isLoading
          ? (
            cats.map((vl, i) => (
              <Skeleton 
                direction="rtl"
                width={100}
                height={50}
              />
            ))
          ) : (
            cats?.length
            ? cats.map((cat, inx) => (
              <Chip 
                // icon={}
                className={`${styles.chip}`}
                label={cat.name}
                onDelete={() => handleDelete(cat.slug)}
                key={inx}
                sx={{fontSize: '1.3rem'}}
              />
            )) : ''
          )
        }

        {
          term
          ? (
            <Chip 
              className={`${styles.chip}`}
              // icon={close}
              label={term}
              onDelete={handleSearchChipDelete}
              sx={{fontSize: '1.3rem'}}
            />
          ) : ''
        }
      </div>
    </div>
  )
}

export default CatChips;