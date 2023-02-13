import React from "react";
// css
import styles from './CatTabs.module.scss';

// components
// import CatItem from "./CatItem/CatItem";
import MyIcon from "../../../../COMPONENTS/Icon/Icon";

// material ui
import Box from '@mui/material/Box';
import Tabs, {tabsClasses, TabsClasses} from '@mui/material/Tabs'
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import actions
import { ForceRepaint, readCategories, setActiveTab } from '../../../../ACTIONS/categoriesActions';
import { selectCatChip } from "../../../../ACTIONS/categoriesActions";

// react-router
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

// custom hook
import CONST from "../../../../CONSTANTS/CONST";

import {SabadIco} from '../../../../SVG/categoriesSVG/SabadIco';
import {SatlIco} from '../../../../SVG/categoriesSVG/SatlIco';
import {ShakhIco} from '../../../../SVG/categoriesSVG/ShakhIco';
import {BoxIco} from '../../../../SVG/categoriesSVG/BoxIco';
import {DastIco} from '../../../../SVG/categoriesSVG/DastIco';
import {JamIco} from '../../../../SVG/categoriesSVG/JamIco';
import {PayeIco} from '../../../../SVG/categoriesSVG/PayeIco';
import BaleIco from '../../../../SVG/categoriesSVG/BaleIco';
import TarhimIco from '../../../../SVG/categoriesSVG/TarhimIco';
import GoldanIco from "../../../../SVG/categoriesSVG/GoldanIco";


// skeleton loading
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// import history from 'history';

// categories icons
const catIcons = {
  'sabad-gol': <SabadIco/>,
  'daste-gol': <DastIco/>,
  'paye-gol': <PayeIco/>,
  'jame-gole': <JamIco/>,
  'daste-gol': <DastIco/>,
  'box-gol': <BoxIco/>,
  'satle-gol': <SatlIco/>,
  'baleborun': <BaleIco/>,
  'tarhim': <TarhimIco/>,
  'goldan': <GoldanIco/>,
}

const CatTabs = ({
  setSubMenuOpen,
}) => {
  //let firstRender = true;
  
  // is product loading
  const isLoading = useSelector(state => state.productsStore.isLoading);

  const categories = useSelector(state => state.categoriesStore.categories);
  const selectedCats = useSelector(state => state.categoriesStore.selectedCats);
  const dispatch = useDispatch();
  // state of tabs
  const [tabVal, setTabVal] = useState(0);

  // value of state is behind
  // const [mCatParam, setMCatParam] = useSearchParamsState('mCat', '');

  const loc = useLocation();
  const navigate = useNavigate();
  // const history = history.createBrowserHistory();


  // main cats to not show -> later delete them from db:
  const banned = ['gift'];

  // run once and get categories
  useEffect(() => {
    if (!categories.length) {
      dispatch(readCategories());
      //firstRender = false;
    }

  }, []);

  // handle change of tabs
  function handleChange(e, newVal) {setTabVal(newVal);}

  function handleTabClick(e, cat) {

    // if there is sub-cats
    if (cat.subCats.length) {
      setSubMenuOpen();
      // set the active tab: for getting data for sub-cats menu
      
      dispatch(ForceRepaint('none'));
      setTimeout(() => {
        dispatch(ForceRepaint('flex'));
        
      }, 200);
      dispatch(setActiveTab(cat));
    }

    // if: no subCats and on '/'
    if (!cat.subCats.length && loc.pathname === CONST.HOME) {
      // set: mCat=''&page=1 ## and: navigate to: '/shop'
      navigate({
        pathname: '/shop',
        search: `?mCat=${cat.slug}&page=1`,
      });
    }
    // if: no subCats and on '/shop'
    else if (!cat.subCats.length && loc.pathname === CONST.SHOP) {
      navigate(
        { pathname: '/shop', search: `?mCat=${cat.slug}&page=1` },
        // { replace: true }
      );
    }

  }
  

  return (
    <div
      className={`${styles.cat_tabs} cattabs`}
    >
      <Tabs
        className=""
        onChange={handleChange}
        value={tabVal}
        variant={"scrollable"}
        indicatorColor="secondary"
        textColor="secondary"
        scrollButtons
        /* disable indicator */
        TabIndicatorProps={{
          style: {display: 'none'}
        }}
        /* disable scroll button when reach the end */
        sx={{ 
          [`& .${tabsClasses.scrollButtons}`]: 
          {'&.Mui-disabled': {opacity: 0.3},}, 
        }}
      >
        {
          !categories.length || isLoading
          ? (
            [...Array(9).keys()].map((val, inx) => <CatSkeleton key={inx} />)
          ) : ''
        }

        {
          categories.length && !isLoading
            ? categories
              .filter(cat => cat.type === CONST.CAT && !banned.some(i => cat.slug === i))
              .map((cat, inx) => {
              // <CatItem cat={cat} key={cat._id}/>
              return (
              <Tab 
                className={`${styles.tab}`}
                id={cat.slug}
                label={<span>{cat.name}</span>} 
                // icon={<MyIcon svg={cat.svg}/>}
                icon={catIcons[cat.slug]}
                key={cat._id}
                onClick={(e) => {
                  e.inx = inx;
                  handleTabClick(e, cat);
                }}

                // sx={{
                //   background: tabVal === inx ? 'orange' : ''
                // }}
                
              />
              )
            })
            : ''
        }  
      </Tabs>

    </div>
  );
}

/* category skeleton */
const CatSkeleton = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        padding: '0 1rem',
      }}
    >
      <Skeleton 
      direction="rtl"
      circle={true}
      height={20} 
      width={20}/>

      <Skeleton 
      direction="rtl"
      height={30} 
      width={60}/>
      
    </div>
  )
}


export default CatTabs;

/* 

db.categories.updateOne(
  { slug: "box-gol" },
  {
    $set: { 
      subCatIds: [
        '63de4fde7c605ac315e919e7',

       
      ],
    },
    $currentDate: { lastModified: true }
  }
) 

db.categories.updateOne(
  { slug: "goldan" },
  {
    $set: { "name": 'گلدان (آپارتمانی)'},
    $currentDate: { lastModified: true }
  }
)


db.categories.insertMany(
  [ 
    {
      name: "یک طبقه", 
      slug: "yek-tabaghe", 
      icon: "cat_yek-tabaghe.svg", 
      type: "occ"
    },
    {
      name: "دو طبقه", 
      slug: "do-tabaghe", 
      icon: "cat_do-tabaghe.svg", 
      type: "occ"
    },
    {
      name: "افتتاحیه", 
      slug: "eftetahie", 
      icon: "cat_eftetahie.svg", 
      type: "occ"
    },
    {
      name: "جای حلقه", 
      slug: "jaye-halghe", 
      icon: "cat_jaye_halghe.svg", 
      type: "occ"
    },
    {
      name: "رز", 
      slug: "rose", 
      icon: "cat_rose.svg", 
      type: "occ"
    }
])

db.categories.deleteOne({ slug: 'khastegari' });
db.categories.deleteOne({ slug: 'cactus' });
db.categories.deleteOne({ slug: 'khastegari' });
db.categories.deleteOne({ slug: 'khastegari' });

*/