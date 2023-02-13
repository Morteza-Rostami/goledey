import React from "react";
//css
import styles from './Items.module.scss';
import Item from "./Item/Item";

// components

const Items = ({ items }) => {

  
  return (
    <ul className={`${styles.items}`}>
      {
        items 
          ? items.map(item => <Item item={item} key={item.product._id}/>)
          : ''
      }
    </ul>
  )
}

export default Items;