import React from "react";
//css
import styles from './Item.module.scss';
import Amount from "../../../../COMPONENTS/Amount/Amount";
import TomanIco from "../../../../SVG/TomanIco";
import CheckIco from "../../../../SVG/CheckIco";

import FrontHelp from "../../../../HELPERS/frontHelp";

import { v4 as uuidv4 } from 'uuid';

import {Link} from 'react-router-dom'


const Item = ({ item }) => {
  const product = item ? item.product : '';

  const randomId = () => uuidv4();



  return (
    <li className={`${styles.item}`}>

      <div
      className={`${styles.sec_1}`}
      >
        <Link
          to={`/product/${product.slug}`}
        >
          <img src={product.pictures[0]} alt={product.name} />
        </Link>
        <div
          className={`${styles.amount}`}
        >
          <Amount
            itemSlug={product.slug}
            //key={randomId()}
          />
        </div>
      </div>


      <div
      className={`${styles.sec_2}`}
      >
        <div
          className={`${styles.infos}`}
        >
          <Link
            className={`${styles.name}`}
            to={`/product/${product.slug}`}
          >
            { FrontHelp.truncate(product.name, 19) }
          </Link>
          <p
            className={`${styles.instock}`}
          >
            <CheckIco/>
            <span>
              {product.inStock ? 'موجود در شاپ' : 'ناموجود شد'}
            </span>
          </p>

        </div>

        <div
          className={`${styles.price}`}
        >
          <div
            className={`${styles.wrap}`}
          >
            <p>
              { FrontHelp.formatMoney(item.total) }
            </p>
            <TomanIco/>
          </div>
        </div>
        
      </div>

    </li>
  )
}

export default Item;