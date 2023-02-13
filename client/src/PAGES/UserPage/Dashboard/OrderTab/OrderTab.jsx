import React from 'react'

// css
import styles from './OrderTab.module.scss';

const OrderTab = ({
  id,
  icon,
  status,
  count,
  activeTab,
}) => {
  return (
    <div
      className={`${styles.tab}`}
    >
      {icon}
      <p
        className={`${styles.status}`}
      >
      {status}
      </p>

      <p
        className={`${styles.count}`}
      >
        {count}
      </p>
    </div>
  )
}

export default OrderTab