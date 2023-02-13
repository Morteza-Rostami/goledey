import React, { useEffect } from "react";
import { useState } from "react";
// material ui
import { Stack, Pagination, PaginationItem } from "@mui/material";
// css
import styles from './Paginate.module.scss';

import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Paginate = ({ 
  //dispatchAction, 
  totalPages }) => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams]  = useSearchParams();
  const loc = useLocation();

  const nextPage = useSelector(state => state.productsStore?.pagObj?.next?.page);

  function handlePageChange(e, newPage) { 
    // set state page
    setPage(newPage)
    // set url param page
    searchParams.set('page', newPage);
    setSearchParams(searchParams);

    // go to top
    window.scrollTo(0, 0);

  }

  useEffect(() => {
    // set state of pag component based on url -> initial load
    setPage(Number(searchParams.get('page')) || 1);
  }, []);

  // if: there is no next page
  /* if (!nextPage) {
    return <></>
  } */

  return (
    <div
      className={`${styles.paginate} shop-pag`}
    >
      <Stack 
        spacing={2}
        className={`${styles.inner}`}
        >
        <Pagination 
          count={totalPages} 
          variant="outlined" 
          //shape="rounded" 
          onChange={handlePageChange}
          page={page}

          renderItem={(item) => (
            <PaginationItem
              slots={{ 
                previous: PagPrev, 
                next: PagNext,  
              }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  )
}

const PagPrev = () => {
  return (
    <div
      className={`${styles.prev}`}
    >
      <MdOutlineKeyboardArrowLeft/>
    </div>
  )
}

const PagNext = () => {
  return (
    <div
      className={`${styles.next}`}
    >
      <MdOutlineKeyboardArrowRight/>
    </div>
  )
}

export default Paginate;

/* 

# number of total page -> for pagination component.
# onClick -> on page number -: get the number of page from paginate button.
# dispatch and action to read all products -> sending: page number in ulr 
request.
# get the pagObj in sotre.

*/