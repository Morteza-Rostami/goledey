import React from 'react'
import { useEffect } from 'react';
// css
import styles from './HomePage.module.scss';
import LayoutHome from '../../LAYOUTS/LayoutHome/LayoutHome';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getHomeData } from '../../ACTIONS/HomeActions';
import Hero from './Hero/Hero';
import Welcome from './Welcome/Welcome';
import Ranks from './Ranks/Ranks';
import CONST from '../../CONSTANTS/CONST';
import COLOR from '../../COLORS/COLORS';
import AdBanner1 from './AdBanner1/AdBanner1';
import AdBanner2 from './AdBanner2/AdBanner2';

const links = [
  '/shop?sCat=sabad-gol&page=1',
  '/shop?sCat=daste-gol&page=1',
  '/shop?sCat=paye-gol&page=1',
]

const HomePage = () => {
  let firstRender = true;
  //data.topDasteGol.map
  const data = useSelector(state => state.homeStore);
  const dispatch = useDispatch();
  const SABADGOL = 'سبد گل';
  const DASTEGOL = 'دسته گل';
  const PAYEGOL = 'پایه گل';

  useEffect(() => {   
    if (firstRender) dispatch(getHomeData());
    firstRender = false;
  }, []);

  return (
    <LayoutHome>
      <div className={`${styles.home}`}>
        
        <Hero/>
        <Welcome/>
        <AdBanner1/>
        <Ranks 
          products={data?.topSabadGol} 
          name={SABADGOL}
          cardName={CONST.TCARDONE}
          bgColor={COLOR.offWhite}
          color={COLOR.primary_250}
          link={links[0]}
        />
        <Ranks 
          products={data?.topDasteGol} 
          name={DASTEGOL}
          cardName={CONST.TCARDTWO}
          bgColor={COLOR.offWhite}
          color={COLOR.secondary_300}
          link={links[1]}

        />
        <AdBanner2/>
        <Ranks 
          products={data?.topPayeGol} 
          name={PAYEGOL}
          cardName={CONST.TCARDONE}
          bgColor={COLOR.offWhite}
          color={COLOR.primary_250}
          link={links[2]}

        />

        
        
      </div>

    </LayoutHome>
  )
}

export default HomePage;