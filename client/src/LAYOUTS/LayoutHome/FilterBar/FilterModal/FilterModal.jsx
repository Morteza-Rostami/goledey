import React from "react";
import { useState } from 'react';
// css 
import styles from './FilterModal.module.css';

// redux
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// material ui
import { Button } from "@mui/material";
import { MdSettingsInputComponent } from 'react-icons/md';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Select } from "@mui/material";

// material ui form
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// form animation:
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// component
const FilterModal = () => {
  const [open, setOpen] = useState(false);
  

  function handleOpen() {setOpen(true)}

  function handleClose() {setOpen(false)}

  // handle filters form submit
  function handleFiltersSubmit() {

  }

  return (
    <div
      className={`${styles.filter}`}
    >
      <Button
        className={`${styles.open_btn}`}
        variant="outlined"
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #DDD',
          minWidth: 90,
          justifyContent: 'space-between',
          borderRadius: 2,
          textTransform: 'capitalize',
          py: 1,
          color: 'theme.palette.text.primary',
          fontSize:'var(--font-100)',
          fontWeight: 'var(--font-w-300)',
        }}
        onClick={handleOpen}
      >
        <MdSettingsInputComponent/>
        Filters
      </Button>

      {/* modal */}
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {/* check if products are loaded before using filters on them */}
        <DialogTitle>{"Filters"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          </DialogContentText>
          <form 
            className="react-form"
            onSubmit={handleFiltersSubmit}
          >
            <div style={{width: '100%', height: '1px', background: 'grey'}}></div>
            <h2>
              Filter by Price: 
            </h2>
            <FormGroup
              style={{ 
                display: 'flex', 
                gap: '5px', 
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              
              <FormControlLabel
                id="priceLH"
                //label="price: low to high"
                control={<Checkbox/>}
              />
              <label htmlFor="priceLH">price: low to high</label>
                
            </FormGroup>
            <FormGroup
              style={{ 
                display: 'flex', 
                gap: '5px', 
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <FormControlLabel
                id="priceHL"
                //label="price: low to high"
                control={<Checkbox/>}
              />
              <label htmlFor="priceHL">price: high to low</label>
                
            </FormGroup>
            <div style={{width: '100%', height: '1px', background: 'grey'}}></div>
            <h2>
              Filter by delivery:
            </h2>
            <FormGroup
              style={{ 
                display: 'flex', 
                gap: '5px', 
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <FormControlLabel
                id="sameDay"
                //label="price: low to high"
                control={<Checkbox/>}
              />
              <label htmlFor="sameDay">same day delivery</label>
                
            </FormGroup>

          </form>

            {/* TEMp */}
          <Select value={1} >
            <MenuItem value={1}>
              <Link to='/'>H</Link>
            </MenuItem>
            <MenuItem value={3}>
              <Link to='/dev/dashboard'>Dev Admin</Link>
            </MenuItem>
            <MenuItem value={4}>April</MenuItem>
            <MenuItem value={5}>May</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined"
            onClick={handleClose}>
              Apply Filters
          </Button>
        </DialogActions>

      </Dialog>

    </div>
  )
}

export default FilterModal;