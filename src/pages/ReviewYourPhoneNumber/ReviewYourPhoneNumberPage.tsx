import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as CirclePhoneLogo } from '../../assets/icons/svg/circle-phone.svg'
import { ReactComponent as LogoSecure} from '../../assets/logos/logo-secure.svg'

import "./ReviewYourPhoneNumber.css";

const ReviewYourPhoneNumberPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [formState] = useState<any>(JSON.parse(searchParams.get('formData')!))

  const navigate = useNavigate();

  const handleEditInformation = () => {
    const formData = JSON.stringify(formState)
      navigate(`/?formData=${formData}`);
      window.scrollTo(0, 0);
  };

  const handleSubmitClick = () => {
    localStorage.removeItem('rawState')
  }

  return (
    <div className="review-phone-container">
      <div className="review-phone-content">
        <div className="review-phone-header">
          <div className="review-phone-header-main-text">
            {t("review_phone.title")}
          </div>
          <div className="review-phone-header-main-divider"></div>
          <div className="review-phone-header-main-subtext" style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}>
            <span style={{display: 'inline-flex'}}>{t("transfer_phone.subtitle")}</span>
          </div>
        </div>
        <div className="review-phone-content-2" >
            <div className="review-phone-content-section">
                <div className="review-phone-content-section-title">
                {t("review_phone.carrier")}
                </div>
                <div className="review-phone-content-section-text">
                    {formState.provider}
                </div>
            </div>
            <div className="review-phone-content-section">
                <div className="review-phone-content-section-title">
                {t("review_phone.name")}
                </div>
                <div className="review-phone-content-section-text">
                    {`${formState.firstName} ${formState.lastName}`}
                </div>
            </div>
            <div className="review-phone-content-section">
                <div className="review-phone-content-section-title">
                {t("review_phone.billing")}
                </div>
                <div className="review-phone-content-section-text">
                    <div>
                        {formState.billingAddress}
                    </div>
                    <div>
                        {formState.billingAddress2}
                    </div>
                </div>
            </div>
            <div className="review-phone-content-section">
                <div className="review-phone-content-section-title">
                {t("review_phone.accountNumber")}
                </div>
                <div className="review-phone-content-section-text">
                    {formState.accountNumber}
                </div>
            </div>
            <div className="review-phone-content-section">
                <div className="review-phone-content-section-title">
                {t("review_phone.accountTransferPIN")}
                </div>
                <div className="review-phone-content-section-text">
                    {formState.accountPIN}
                </div>
            </div>
        </div>
        <div className="review-phone-form-action-row" style={{
            marginTop: '20px',
        }}>
            <button className="review-phone-form-button button-secondary" onClick={handleEditInformation}>{t("review_phone.editInformation")}</button>
            <button className="review-phone-form-button button-primary" onClick={handleSubmitClick}>{t("review_phone.submit")}</button>
          </div>
      </div> 
      <div className="review-phone-side-c">
        <div className="review-phone-side-co">
          <div className="side-menu-item-logo"><CirclePhoneLogo/></div>
          <div className="side-menu-item-desc">
            <div className="side-menu-item-desc-title">{t("transfer_phone.needHelp")!}</div>
            <div className="side-menu-item-desc-text">
            {t("transfer_phone.callUs")!} <a href={`tel:${t("transfer_phone.phoneForm.callUsPhoneNumber")!}`}>866-482-1424</a>
            </div>
          </div>
        </div>
        <div className="review-phone-side-co">
          <div className="side-menu-item-logo"><LogoSecure/></div>
          <div className="side-menu-item-desc">
            <div className="side-menu-item-desc-title">{t("transfer_phone.sideMenu.item1.title")!}</div>
            <div className="side-menu-item-desc-text">
            {t("transfer_phone.sideMenu.item1.text")!}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewYourPhoneNumberPage;
