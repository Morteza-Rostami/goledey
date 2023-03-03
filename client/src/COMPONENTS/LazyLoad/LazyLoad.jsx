import * as React from 'react';
import Button from '@mui/material/Button';

import LoadingButton from '@mui/lab/LoadingButton';


// css
//import css from './LazyLoad.module.scss';

// responsive dialog
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';

import {MdClose, MdOutlineKeyboardArrowDown} from 'react-icons/md';

import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CONST from '../../CONSTANTS/CONST';

const LazyLoad = ({
  dataArr,
  css,
  nextPage,
  isLoading,
  makeCard,
  loadMoreText,
  action,
  dispatchData
}) => {
  // next pagination page:
  //const nextPage = useSelector(state => state.reviewsStore.pagObj?.next?.page);
  // is loading more revies
  //const isLoading = useSelector(state => state.reviewsStore.isLoading);

  const dispatch = useDispatch();


  // hndle load more reivew button:
  function handLoadMore() {
    // dispatch(action());
    dispatch(action(dispatchData))
  }

  return (
    <div
      className={`${css && css.lazy__load} lazy`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      
      {
        dataArr?.length 
        ?
          dataArr.map((data, inx) => {
            return (makeCard(data?._id || inx, data))
          })
        : ''
      }

      <div
        className={`${css && css.load_more}`}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          
        }}
      >
        {
          nextPage && (
            <Button
              variant='outlined'
              size='medium'
              onClick={handLoadMore}

              //loading={!isLoading}
              disabled={ nextPage ? false : true }

              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

              }}

            >

              {loadMoreText}
            </Button>
          )
        }
      </div>
    </div>
  );
}

export default LazyLoad;