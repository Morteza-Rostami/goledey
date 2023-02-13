import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MdEvent } from 'react-icons/md';
import { IconButton, InputAdornment } from '@mui/material';


const DatePick = ({
  getDateVal
}) => {
  //new Date(2022, 3, 7)
  const [value, setValue] = React.useState(0);
  const [dateOpen, setDateOpen] = useState(false);

  function datePicked(newVl) {
    setValue(newVl)
    getDateVal(newVl);
  }

  // useEffect(() => {
  //   getDateVal(value);
  // }, [value]);

  return (
    <LocalizationProvider 
      dateAdapter={AdapterJalali}
      localeText={{ cancelButtonLabel: "لغو", okButtonLabel: "تأیید", clearButtonLabel: "پاک کردن" }}  
    >
      <MobileDatePicker
        open={dateOpen}
        onClose={() => setDateOpen(false)}


        mask="____/__/__"
        value={value}
        onChange={(newVl) => datePicked(newVl)}
        renderInput={(params) => (
          
          <TextField 
          {...params} 
            fullWidth
            />
        )}
        InputProps={{
          endAdornment: (
            <InputAdornment onClick={() => setDateOpen(true)}>
              <IconButton>
                <MdEvent />
              </IconButton>
            </InputAdornment>
          )
       }}
      />
    </LocalizationProvider>
  );
}

export default DatePick;