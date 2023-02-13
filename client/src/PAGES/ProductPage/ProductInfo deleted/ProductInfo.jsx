import React from "react";
import { useState } from "react";
// redux
import { useSelector } from "react-redux";

import ContainerA from "../../../COMPONENTS/containers/ContainerA";

//css
import styles from './ProductInfo.module.scss';
// icons
import { TiStarFullOutline } from 'react-icons/ti';
import { TbTruckDelivery } from 'react-icons/tb';
import { IoMdSunny } from 'react-icons/io';
import { MdOutlineNoteAlt } from 'react-icons/md';

const ICON_SIZE = 15;


const ProductInfo = ({ product }) => {
  const reviewsLen = useSelector(state => state.reviewsStore.reviewsLen);
  const average = useSelector(state => state.reviewsStore.average);

  return (
    <div
      className={`${styles.product_info}`}
    >
      <ContainerA
        pl={'1rem'}
        pr={'1rem'}
        maxW={'1200px'}
        
      >
        <div 
        className={`${styles.inner}`}>

          <h2>
            {product?.name}
          </h2>
          <div
            className={`${styles.rate_review}`}
          >
            <p>
              <TiStarFullOutline size={ICON_SIZE}/> 
              <span>{ average }</span> .
            </p>
            <p>{ reviewsLen } reviews .</p>
          </div>
          <div
            className={`${styles.send_infos}`}
          >
            <p className={`${styles.instock}`}>
              <TbTruckDelivery size={ICON_SIZE}/> InStock
            </p>
            <p className={`${styles.sameday}`}>
              <IoMdSunny size={ICON_SIZE}/> Same Day
            </p>
          </div>
          <div 
            className={`${styles.shortdesc}`}
          >
            <MdOutlineNoteAlt size={ICON_SIZE}/>
            <p>
            {product.shortDesc}
            </p>
          </div>
        </div>

      </ContainerA>
    </div>
  )
}

// default props
ProductInfo.defaultProps = {
  product : {}
}

export default ProductInfo;









































































/* 
const ProductCardA = ({children}) => {
  // state for product quantity:
  const [itemQty, setItemQty] = useState(1);

  function incrementQty() {
    // increment state old value:
    setItemQty(prevState => prevState + 1);
  }

  function decrementQty() {
    // if current state > 1 -> can decrement
    if (itemQty > 1)
      setItemQty(prevState => prevState - 1);
  }

  return (
    
    <div className="itemCard" style={itemCardStyle}>

      <p className="itemCard__qty">
        { itemQty }
      </p>

      <button onClick={decrementQty}>-</button>
      <button onClick={incrementQty}>+</button>

    </div>
  )
}

// style
const itemCardStyle = {
  border: 'solid 1px black',
  borderRadius: '5px',
  padding: '10px',
  width: '200px'
}

export default ProductCardA;

*/