import React from 'react'

import styles from './ProSlot.module.scss';

const ProSlot = ({
  slot,
}) => {
  return (
    <div
      className={`${styles.pro_slot}`}
    >
      {slot.icon}
      <span>
        {slot.text}
      </span>
    </div>
  )
}

export default ProSlot