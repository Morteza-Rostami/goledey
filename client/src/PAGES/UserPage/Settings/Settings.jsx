import React from 'react'
import SettingForm from './SettingForm/SettingForm'
import LayoutA from '../../../LAYOUTS/LayoutA/LayoutA'
import UserGrid from '../UserGrid/UserGrid'
import NavBar from '../Dashboard/NavBar/NavBar'
import Header from '../../../LAYOUTS/Header/Header'
import Footer from '../../../LAYOUTS/Footer/Footer'
import HeaderProfile from '../../../LAYOUTS/HeaderProfile/HeaderProfile'
import MobNav from '../../../LAYOUTS/MobNav/MobNav';
import AutoLayout from '../../../LAYOUTS/AutoLayout/AutoLayout'
import { useParams } from 'react-router-dom'

// css
import styles from './Settings.module.scss';

const Settings = () => {
  const { userId: authUser } = useParams();

  return (
    <AutoLayout
      headerMob={<HeaderProfile title={'تنظیمات'} link={`/users/dashboard/${authUser}`}/>}
      headerDec={<Header/>}
      footerMob={<MobNav/>}
      footerDec={<Footer/>}
    >
      <div className={`${styles.settings}`}>

        <UserGrid 
          navDisable={true}
        >
          <div style={{width: '100%'}}>
            <NavBar/>
          </div>
          <section style={{width: '100%'}}>
            <div
              className={`${styles.head}`}
            >
              <h4>
                تنظیمات
              </h4>
            </div>
            <SettingForm/>
          </section>
        </UserGrid>

      </div>

    </AutoLayout>
  )
}

export default Settings