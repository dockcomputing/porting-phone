import React from 'react';
import './Header.css'
import { ReactComponent as LivelyLogo } from '../../assets/logos/lively-logo.svg'
import { ReactComponent as PhoneIcon } from '../../assets/icons/svg/phone.svg'

function Header() {

  return (
    <div className="header-container">
        <div className="header-top-container">
            <div className="header-top-content">
                <PhoneIcon color="#d3116a" width="20" height="20"/> Need Help? (800) 733-6632
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
