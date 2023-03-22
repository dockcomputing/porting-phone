import React from 'react';
import './Header.css'
import { ReactComponent as LivelyLogo } from '../../../assets/logos/lively-logo.svg'
import { ReactComponent as PhoneIcon } from '../../../assets/icons/svg/phone.svg'
import { useTranslation } from 'react-i18next';

function Header() {
    const { t } = useTranslation(); 

  return (
    <div className="header-container">
        <div className="header-top-container">
            <div className="header-top-content">
                <PhoneIcon color="#d3116a" width="20" height="20"/> {t('header.need_help')}
            </div>
        </div>
        <div className="header-bottom-container">
            <div className="logo">
                <LivelyLogo/>
            </div>
        </div>
    </div>
  );
}

export default Header;
