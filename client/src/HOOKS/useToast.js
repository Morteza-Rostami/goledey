import * as React from 'react';
import Toast from '../COMPONENTS/Toast/Toast';

const useToast = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  function handOpen() {
    console.log('open');
    setOpen(true);
  };

  // set message
  function setMsg(msg) {
    console.log(msg);
    setMessage(msg);
  } 


  // snackbar component
  function makeToast() {
    console.log('make toast', message);
    return (<Toast message={message} open={open} setOpen={setOpen}/>);
  } 

  return {
    handOpen,
    setMsg,
    makeToast,
  }

}

export default useToast;