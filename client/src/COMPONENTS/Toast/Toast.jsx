import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import SnackbarContent from '@mui/material/SnackbarContent';

// import { withStyles } from '@mui/material';

// const styles = {
//   snackbarStyleViaContentProps: {
//     backgroundColor: "orange"
//   },
//   snackbarStyleViaNestedContent: {
//     backgroundColor: "lightgreen",
//     color: "black"
//   }
// };

// snackbar component
const Toast = ({ message, open, setOpen }) => {
  // state of snackbar
  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center'
  });
  const { vertical, horizontal } = state;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        open={open}
        anchorOrigin={ {vertical, horizontal} }
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
        style={{fontSize: '20px !important'}}
        sx={{fontSize: 30}}
        color={'success'}
        fontSize={20}
        
      >
        {/* <SnackbarContent
          color='success'
        >
          {message}
        <Alert severity="success"sx={{fontSize: 20}}>{message}</Alert>
        </SnackbarContent> */}
      </Snackbar>
    </div>
  );
}

// Toast = withStyles(styles)(Toast);

export default Toast;