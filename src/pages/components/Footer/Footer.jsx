import React from 'react';
import './Footer.css'
import { ReactComponent as LivelyLogoNegative } from '../../../assets/logos/lively-logo-negative.svg'
import { ReactComponent as CirclePhoneLogo } from '../../../assets/icons/svg/circle-phone.svg'
import { useTranslation } from 'react-i18next';

function Footer() {
  
  const { t } = useTranslation(); 
  return (
    <div className="footer-container">
        <div className="footer-overline-top"></div>
        <div className="footer-top-container">
            <div className="footer-logo">
                <LivelyLogoNegative/>
            </div>
            <div className="footer-top-contact">
            <CirclePhoneLogo/> {t('footer.phone')}
            </div>
        </div>
        <div className="footer-bottom-container">
            <div className="left-footer-bottom-section">
                {(new Date().getFullYear())} {t('footer.rights')}
            </div>
            <div className="right-footer-bottom-section">
                <a href='/legal/terms-of-use'>{t('footer.terms_of_use')}</a> |
                <a href='/legal/privacy-policy'>{t('footer.privacy_policy')}</a> |
                <a href='/legal/customer-agreement'>{t('footer.customer_agreement')}</a> |
                <a href='/legal'>{t('footer.return_policy')}</a> |
                <a href='/legal'>{t('footer.warranty')}</a> |
                <a href='/legal'>{t('footer.urgent_care_terms')}</a> |
                <a href='/legal'>{t('footer.lively_wearable_terms')}</a> |
                <a href='/legal/do-not-sell-my-personal-information'>{t('footer.do_not_sell')}</a> |
                <a href='/legal/california-privacy-policy'>{t('footer.california_privacy_rights')}</a>

            </div>
        </div>
    </div>
  );
}

export default Footer;

