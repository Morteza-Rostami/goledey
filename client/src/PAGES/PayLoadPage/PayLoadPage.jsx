import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { verifyPayment } from '../../ACTIONS/payActions';

const PayLoadPage = () => {
  //const [searchPrams, setSearchParams] = useSearchParams();

  //const loc = useLocation();
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const once = useRef(true);
  
  useEffect(() => {
    // action called for verifing the payment:
    //const params = searchPrams.entries();

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    //console.log(searchPrams)
    console.log('params', params);

    if (once.current) {
      if (params.Status && params.Status === 'OK') {
        dispatch(verifyPayment(params, navigate));
  
      } else {
        navigate('/payment/failed');
      }

      once.current = false;
    }


  }, []);

  ///console.log(loc)

  return (
    <></>
  )
}

export default PayLoadPage