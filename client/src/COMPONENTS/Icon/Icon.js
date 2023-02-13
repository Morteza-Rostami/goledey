
import { Icon } from '@mui/material';
import { makeStyles } from '@mui/material';
// css
import styles from './Icon.module.css';

const MyIcon = ({ svg }) => {

  return (
    <Icon 
      style={{ textAlign: 'center', width: '100%', height: 'auto' }}>
      {/* <img className={classes.imageIcon} src="/graphics/firebase-logo.svg"/> */}
      <div 
        className={`${styles.svg_wrap}`}
        dangerouslySetInnerHTML={{ __html: svg }}
        style={{height: '100%', width:'100%'}}
      >
      </div>
    </Icon>
  )
}

export default MyIcon;