import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import LoadingButton from '@mui/lab/LoadingButton';


// css
import styles from './ReviewsDialog.module.scss';

// responsive dialog
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import {MdClose, MdOutlineKeyboardArrowDown} from 'react-icons/md';

import Slide from '@mui/material/Slide';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { readReviews } from '../../../../ACTIONS/reviewActions';
import CONST from '../../../../CONSTANTS/CONST';
import ReviewCard from '../ReviewCard/ReviewCard';
import RevCard2 from '../RevCard2/RevCard2';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReviewsDialog = ({
  //reviews,
  slug,
}) => {
  const reviews = useSelector(state => state.reviewsStore?.reviews);

  // next pagination page:
  const nextPage = useSelector(state => state.reviewsStore.pagObj?.next?.page);
  // is loading more revies
  const isLoading = useSelector(state => state.reviewsStore.isLoading);

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // hndle load more reivew button:
  function handLoadMore() {
    dispatch(readReviews(slug, nextPage, CONST.reviewsLim));
  }

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div
      className={`${styles.rdialog}`}
    >
      <Button 
        className={`${styles.btn}`}
        endIcon={<MdOutlineKeyboardArrowDown className={`${styles.ico}`}/>}
        onClick={handleClickOpen('paper')}
      >
          مشاهده نظرات بیشتر
      </Button>


      {/* modal */}
      <Dialog
        className={`${styles.reviews_modal} reviews-model`}
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        TransitionComponent={Transition}
        keepMounted
        // aria-describedby="alert-dialog-slide-description"
        fullScreen={fullScreen}
        // fullWidth={false}
        // maxWidth={500}
      >
        <DialogTitle 
          component={'div'}
          className={`${styles.header}`}
        id="scroll-dialog-title">
          <IconButton onClick={handleClose}>
            <MdClose/>
          </IconButton>
        </DialogTitle>
        <DialogContent 
          className={`${styles.content}`}
        sx={{
          padding: '1rem 1.6rem',
        }}
        dividers={true}>
          

          <ul 
            className={`${styles.reviews__list}`}
          >
            {
              reviews?.length 
                ?
                reviews.map((rev, inx) => (<RevCard2 review={rev} key={inx}/>))
                : ''
            }


            <div
              className={`${styles.load_more}`}
            >
              {
                nextPage 
                ? (
                  <LoadingButton
                    variant='outlined'
                    size='medium'
                    onClick={handLoadMore}

                    loading={isLoading}
                    disabled={ nextPage ? false : true }

                  >
                    نظرات بیشتر
                  </LoadingButton>

                ) : ''
              }
            </div>
          </ul> {/* reviews__list */}
        </DialogContent>
        {/* <DialogActions>
          <Button>Load More</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

export default ReviewsDialog;