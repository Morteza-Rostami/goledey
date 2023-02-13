import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { MdOutlineStarRate } from 'react-icons/md';
import CONST from '../../../../../CONSTANTS/CONST';

import useWindowDimensions from '../../../../../HOOKS/useWindowDimensions';
import { useState } from 'react';

export default function BasicRating({
  value,
  setValue,
  // open dialog
  handOpen,
}) {
  const {width, height} = useWindowDimensions();
  const [css, setCss] = useState({});

  useEffect(() => {
    if (width > CONST.MOBILE) {
      setCss( {
        fontSize: "5rem",
        "& .MuiRating-icon": {
            width: '4.5rem'
        }
      })
    }
  }, [width]);

  return (
    <Box
      // sx={{
      //   '& > legend': { mt: 2 },
      // }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onClick={handOpen}
        // size='large'
        
        sx={css}
        // icon={<MdOutlineStarRate fontSize="5rem" sx={{ color: "black" }} />}
        
      />
    </Box>
  );
}