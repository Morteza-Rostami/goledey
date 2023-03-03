import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MdClose, MdEvent, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { useMemo } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { SxProps } from '@mui/material';
import COLOR from '../../COLORS/COLORS';
import { BsFillCalendarEventFill } from 'react-icons/bs';

// css
import styles from './DatePicker.module.scss';
import { Link } from 'react-router-dom';

const day = 60 * 60 * 24 * 1000;
let now = new Date();
const tomorrowVal = new Date(now.getTime() + day)

const MyDatePicker = ({
  dateOpen,
  setDateOpen,
  date,
  setDate,
  setDatePicked,
}) => {
  //new Date(2022, 3, 7)
  //const [date, setValue] = React.useState(new Date());
  const [tomorrow, setTomorrow] = useState(tomorrowVal); 

  function datePicked(newVl) {
    setDatePicked(true)
    //setValue(newVl)
    setDate(newVl);
  }

  // date of 7 days from now
  const nextWeek = useMemo(() => {
    return new Date(new Date().setDate(new Date().getDate() + 7))
  }, []);

  // useEffect(() => {
  //   setDate(value);
  // }, [value]);

  // update value of tomorrow
  useEffect(() => {
    now = new Date();
    setTomorrow(new Date(now.getTime() + day))
  }, [])


  return (
    <LocalizationProvider 
      dateAdapter={AdapterJalali}
      localeText={{ cancelButtonLabel: "لغو", okButtonLabel: "تأیید", clearButtonLabel: "پاک کردن" }}  
    >
      <MobileDatePicker
        className='date-picker-checkout'
        open={dateOpen}
        onClose={() => setDateOpen(false)}
        ampmInClock={false}
        views={['day']}
        //label={}
        label=' '
        toolbarPlaceholder={''}
        ToolbarComponent={(props) => (
          <div
            className={`${styles.head}`}
          >
            <div
              className={`${styles.wrap__close}`}
            >
              <IconButton
                className={`${styles.btn}`}
                onClick={() => setDateOpen(false)}
              >
                <MdClose color={COLOR.primary_250}/>
              </IconButton>
            </div>
            <div
              className={`${styles.message}`}
            >
              <div
                className={`${styles.title}`}
              >
                <BsFillCalendarEventFill size={18} color={COLOR.primary_250}/>
                <p>انتخاب بازه زمانی</p>
              </div>
              <p 
                className={`${styles.subtext}`}
              >
                زمان ارسال را انتخاب کنید.
              </p>
            </div>
          </div>
        )}
        // PopperProps={{
        //   className: classes.desktopView,
        // }}
        DialogProps={{
          className: 'checkout-date',
          sx: {
            "& .MuiPaper-root": {
              border: 'none'
            },
            "& .muirtl-1forz40-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
              backgroundColor: COLOR.primary_250,
            },
            "& .muirtl-194yee8-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)": {
              border: `1px solid ${COLOR.secondary_300}`
            },
            "& .muirtl-1forz40-MuiButtonBase-root-MuiPickersDay-root": {
              backgroundColor: COLOR.offWhite,
            }
          }
        }}

        closeOnSelect={true}
        // components={{
        //   ActionBar: {
            
        //   }
        // }}

        // PopperProps={{
        //   sx: {
        //     "& .MuiPaper-root": {
        //       border: '1px solid red'
        //     }
        //   }
        // }}

        mask="____/__/__"
        value={date}
        onChange={(newVl) => datePicked(newVl)}
        renderInput={(params) => (
          
          <div
            className={`${styles.action}`}
          >
            <Button
              className={`${styles.btn}`}
              variant='text'
              size='medium'
              onClick={() => setDateOpen(true)}
            >
              <span>
                تغییر | ویرایش
              </span>
              <MdOutlineKeyboardArrowLeft className={`${styles.ico}`}/>
            </Button>
          </div>
          // <TextField 
          // sx={{
          //   background: 'red'
          // }}
          // {...params} 
          //   fullWidth
          // />
        )}
        InputProps={{
          endAdornment: (
            <InputAdornment 
            position='start'
            onClick={() => setDateOpen(true)}>
              <IconButton>
                <MdEvent />
              </IconButton>
            </InputAdornment>
          ),
          // startAdornment: (
          //   <>love</>
          // ),
          // InputAdornment: (
          //   <>fo</>
          // )
       }}

       minDate={tomorrow}
       maxDate={nextWeek}
      />
    </LocalizationProvider>
  );
}

export default MyDatePicker;