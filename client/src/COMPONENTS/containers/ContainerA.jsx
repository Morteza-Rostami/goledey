import React from "react";
import styled from 'styled-components';
import styles from './container~a.module.css';

const StyledContainerA = ({ className, children}) => {

  return (
    <div 
      className={`${styles.container} ${className}`}>
      {children}
    </div>
  )
}

// styled:
const ContainerA = styled(StyledContainerA)`
  //display: flex;
  width: 100%;
  //justify-content: space-between;
  //align-items: center;
  max-width: ${props => props?.maxW ? props.maxW : '1800px'};
  padding-right: ${props => props.pr ? props.pr : ''}; 
  padding-left: ${props => props.pl ? props.pl : ''};
  // more style:
  ${props => props?.newCss ? props.newCss : ''}
`;

export default ContainerA;