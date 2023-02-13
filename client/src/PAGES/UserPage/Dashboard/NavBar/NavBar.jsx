import React, { useMemo } from 'react'

// css
import styles from './NavBar.module.scss';
import CONST from '../../../../CONSTANTS/CONST';

//icons
import {MdOutlineSpaceDashboard} from 'react-icons/md';
import {MdOutlineLocationOn} from 'react-icons/md';
import NavItem from './NavItem/NavItem';

import AvatarIco from '../../../../SVG/profileSVG/AvatarIco';
import DashboardIco from '../../../../SVG/profileSVG/DashboardIco';
import PhoneIco from '../../../../SVG/profileSVG/PhoneIco';
import LocIco from '../../../../SVG/profileSVG/LocIco';
import OrdersIco from '../../../../SVG/profileSVG/OrdersIco';
import AddressIco from '../../../../SVG/profileSVG/AddressIco';
import SettingsIco from '../../../../SVG/profileSVG/SettingsIco';
import LogoutIco from '../../../../SVG/profileSVG/LogoutIco';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../ACTIONS/userActions';
import { useNavigate, useParams } from 'react-router-dom';
import InfoCard from '../../../../COMPONENTS/InfoCard/InfoCard';



const NavBar = ({
  cssName,
}) => {

  // auth user
  //const authUser = useSelector(state => state.userStore.user._id);
  const { userId: authUser } = useParams();
  const isUserComplete = useSelector(state => state.userStore.isUserComplete);

  const navigate = useNavigate();


  const dispatch = useDispatch();

  /* const infos = useMemo(() => {
    return [
      {
        icon: <AvatarIco/>,
        title: 'مرتضی رستمی',
        link: '',
        page: '', 
        cssName: styles.option
      },
      {
        icon: <PhoneIco/>,
        title: '09905995768',
        link: '',
        page: '', 
        cssName: styles.option
      },
      {
        icon: <LocIco/>,
        title: 'ارسال کالا به البرز کرج',
        link: '',
        page: '', 
        cssName: styles.option
      }
    ]
  }, []); */

  const links = useMemo(() => {
    return [
      {
        icon: <DashboardIco/>,
        title: 'داشبورد',
        link: `/users/dashboard/${authUser}`,
        page: CONST.dashboard, 
        cssName: styles.option
      },
      {
        icon: <OrdersIco/>,
        title: 'سفارشات',
        link: `/users/orders/${authUser}/${CONST.ONGOING}`,
        page: CONST.dashboard, 
        cssName: styles.option
      },
      {
        icon: <AddressIco/>,
        title: 'آدرسها',
        link: `/users/address/${authUser}`,
        page: CONST.dashboard, 
        cssName: styles.option,
        error: !isUserComplete,

      },
      {
        icon: <SettingsIco/>,
        title: 'تنظیمات',
        link: `/users/settings/${authUser}`,
        page: CONST.dashboard, 
        cssName: styles.option,
        error: !isUserComplete,
      },
      {
        icon: <LogoutIco/>,
        title: 'خروج از اکانت',
        link: '',
        page: CONST.dashboard, 
        cssName: styles.option,
        button: true,
        onClick: () => dispatch(logout(navigate)),
      }
    ]
  }, [isUserComplete]);



  return (
    <section
      className={`${styles.navbar} ${cssName}`}
    >
      <div
        className={`${styles.nav__card}`}
      >

        <div
          className={`${styles.topsec}`}
        >

          <InfoCard/>
        </div> {/* topsec */}


        <ul
          className={`${styles.options}`}
        >
          {
            links &&
            links.map((link, i) => (
              <NavItem 
                icon={link.icon}
                title={link.title}
                link={link.link}
                page={link.page}
                cssName={link.cssName}
                button={link?.button}
                handClick={link?.onClick}
                error={link?.error}
                key={i}
              />
            ))
          }
        </ul>
      </div> {/* nav__card */}

    </section>
  )
}

export default NavBar