import { IconButton } from '@mui/material'
import React from 'react'
import { MdClose } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'

// css
import styles from './HeaderProfile.module.scss';


const HeaderProfile = ({
  title,
  link
}) => {

  return (
    <header
      className={`${styles.head}`}
    >
      <div
        className={`${styles.inner}`}
      >

      <p
        className={`${styles.title}`}
      >
        {title}
      </p>
      <div
        className={`${styles.close}`}
      >
        <IconButton 
        className={`${styles.btn}`}
        component={Link}
        to={link}
        >
          <MdClose/>
        </IconButton>
      </div>
      </div>{/* inner */}

    </header>
  )
}

export default HeaderProfile