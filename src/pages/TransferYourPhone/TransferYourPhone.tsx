import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CirclePhoneLogo } from '../../assets/icons/svg/circle-phone.svg'
import { maskPhoneInput } from "../../utils/phone-utils";
import Dropdown from "../components/Dropdown/Dropdown";
import TextInput from "../components/TextInput/TextInput";
import { ReactComponent as LogoSecure} from '../../assets/logos/logo-secure.svg'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import TagManager from 'react-gtm-module'

import "./TransferYourPhone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLocalStorage from "../../hooks/useLocalStorage";

const TransferYourPhonePage = () => {
  const { t } = useTranslation();

  const [canContinue, setCanContinue] = useState<boolean>(false)
  const [formState, setFormState] = useLocalStorage('rawState', {
    eligibilityNumber: '',
    firstName: '',
    lastName: '',
    billingAddress: '',
    billingAddress2: '',
    city: '',
    state: '',
    zip: '',
    accountNumber: '',
    accountPIN: '',
    provider: '',
    primaryAccountHolder: true,
  })

  const [isEligible, setIsEligible] = useState(false);
  const [shouldEligibleNotificationAppear, setShouldEligibleNotificationAppear] = useState(false)
  const [isFormFillable, setIsFormFillable] = useState(false);

  const setCheckEligibiliyButtonClickedAndTrack = () => {
    setShouldEligibleNotificationAppear(true)
    TagManager.dataLayer({ dataLayer: { event: 'porting_check_eligibility_clicked' } })
    setTimeout(() => {
      showQuestions()
    }, 10000);
  }

  const showQuestions = () => {
    setShouldEligibleNotificationAppear(false)
    setIsEligible(true)
  }


  const updateFormState = (newState : any) => setFormState((prevState : {}) => ({
    ...prevState,
    ...newState,
  }))

  const updateFormStateOnChange = (fieldName: string, value: string) => {
    console.log(fieldName, value)
    updateFormState({
      [fieldName]: value
    })
  }

  const navigate = useNavigate();

  const handleContinueOnClick = () => {
    if (!canContinue) return;
    const formData = JSON.stringify(formState)
      navigate(`/review-phone-number?formData=${formData}`);
      window.scrollTo(0, 0);
  };

  useEffect(() => {
    const mandatoryFields = ['firstName', 'lastName', 'billingAddress', 'city', 'state', 'zip', 'accountNumber', 'accountPIN']

    let error = false;
    for (const key of mandatoryFields) {
      if (formState[key].length === 0)
        error = true;
    }
    setCanContinue(!error)

    if (formState.provider) {
      setIsFormFillable(true)
    }
  }, [formState])

  return (
    <div className="transfer-phone-container">
      <div className="transfer-phone-content">
        <div className="transfer-phone-header">
          <div className="transfer-phone-header-main-text">
            {t("transfer_phone.title")}
          </div>
          <div className="transfer-phone-header-main-divider"></div>
          <div className="transfer-phone-header-main-subtext" style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}>
            <span style={{display: 'inline-flex'}}>{t("transfer_phone.subtitle")}</span>
            <span style={{display: 'inline-flex', fontWeight: '600'}}><span style={{marginRight: '5px'}} className="input-required-marker">*</span> {t("transfer_phone.required")}</span>
          </div>
        </div>
        <div className="transfer-phone-form-first">
          <div className="t-phone-form-container">
            <div className="t-phone-form-container-title">
              {t("transfer_phone.enterPhone")}
            </div>
            <div className="t-phone-form-container-content">
              <input className="transfer-phone-form-input" value={formState.eligibilityNumber} onChange={(e) => {
                e.preventDefault()
                // eslint-disable-next-line
                if (e.target.value.replace(/[\(\)\s-]/g, '').length !== 10) {
                  // Reset is eligible
                  isEligible && setIsEligible(false)
                }
                const maskedPhoneInput = maskPhoneInput(e.target.value)
                updateFormState({
                  eligibilityNumber: maskedPhoneInput,
                })
              }}/>
              <button
                // eslint-disable-next-line
                className={`transfer-phone-form-button ${(formState.eligibilityNumber?.replace(/[\(\)\s-]/g, '').length !== 10 || isEligible) && 'button-disabled'}`}
                onClick={setCheckEligibiliyButtonClickedAndTrack}
                // eslint-disable-next-line
                disabled={(formState.eligibilityNumber?.replace(/[\(\)\s-]/g, '').length !== 10 || isEligible)}
              >
                 {t("transfer_phone.checkEligibility")}
              </button>
            </div>
          </div>
          { shouldEligibleNotificationAppear && <div className="is-eligible-disclaimer">
            <div style={{
              width: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              marginRight: '10px',
              left: '0px',
              top: '0px',
              position: 'absolute',
              padding: '5px'
            }}>
              <div style={{fontWeight: '600', marginRight: '20px', maxWidth: '100%'}}><FontAwesomeIcon onClick={showQuestions} icon={faTimes}/></div>
            </div>
            <div className="is-eligible-content">
              <div className="is-eligible-content-icon">
                <FontAwesomeIcon icon={faCheck}/>
              </div>
              <div className="is-eligible-content-text">
                <div className="is-eligible-content-text-title">
                  {t("transfer_phone.isEligibleYes")}
                  </div>
                  <div className="is-eligible-content-text-sub">
                    {t("transfer_phone.isEligibleText")}
                  </div>
              </div>
              </div>
          </div> }
          {isEligible && (
            <>
              <div className="t-phone-form-container small-gap mb-s" style={{marginTop: '20px'}}>
                <div className="t-phone-form-container-title" style={{
                  flexDirection: 'row',
                }}>
                  {t("transfer_phone.selectCarrier")}<span style={{marginLeft: '5px'}} className="input-required-marker">*</span>
                </div>
                <div className="transfer-phone-container-subtitle">
                  <Dropdown options={[
                    {
                      id: 0,
                      label: "Provider 1",
                      value: "Provider 1"
                    },
                    {
                      id: 1,
                      label: "Provider 2",
                      value: "Provider 2"
                    },
                    {
                      id: 2,
                      label: "Provider 3",
                      value: "Provider 3"
                    }
                  ]}
                    value={formState.provider}
                    headerPlaceholder={t("transfer_phone.selectCarrierPlaceholder")}
                    onChange={(val : string) => updateFormStateOnChange('provider', val)}
                    width="200px"
                  />
                </div>
              </div>
              <div className="t-phone-form-container small-gap mb-s">
                <div className="t-phone-form-container-title" style={{display: 'flex', flexDirection: 'row', position:'relative'}}>
                {t("transfer_phone.primaryAccountHolderTitle")} <span style={{
                    borderRadius: '50%',
                    background: 'orange',
                    width: '15px',
                    height: '15px',
                    position: 'absolute',
                    top: '2px',
                    left: '260px',
                    color: 'white',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}><b>i</b></span>
                </div>
                <div className="transfer-phone-status-subsection">
                  <div className="transfer-phone-status-subsection-item">
                    <input type="radio" checked={formState.primaryAccountHolder} name="radio" defaultChecked onClick={() => {
                      updateFormState({
                        primaryAccountHolder: true,
                      })
                    }}/>
                    <label htmlFor="yes">{t("transfer_phone.primaryAccountHolderYes")}</label>
                  </div>
                  <div className="transfer-phone-status-subsection-item">
                    <input type="radio" checked={!formState.primaryAccountHolder} name="radio" onClick={() => {
                      updateFormState({
                        primaryAccountHolder: false,
                      })
                    }} />
                    <label htmlFor="yes">{t("transfer_phone.primaryAccountHolderNo")}</label>
                  </div>
                </div>
              </div>
              <div className="t-phone-form-disclaimer-container">
                <div className="t-title">
                {t("transfer_phone.phoneFormDisclaimer.title")}
                </div>
                <div className="t-content">
                  <div className="t-content-item">
                    <div className="t-content-item-title">{t("transfer_phone.phoneFormDisclaimer.firstItemTitle")}</div>
                    <div className="t-content-item-text">
                      {t("transfer_phone.phoneFormDisclaimer.firstItemText")}
                    </div>
                  </div>
                  <div className="t-content-item">
                    <div className="t-content-item-title">{t("transfer_phone.phoneFormDisclaimer.secondItemTitle")}</div>
                    <div className="t-content-item-text">
                    {t("transfer_phone.phoneFormDisclaimer.secondItemText")}
                    </div>
                  </div>
                </div>
              </div>
              { !isFormFillable && <div className="transfer-phone-form-actions">
              <button className={`transfer-phone-form-button ${!formState.provider && 'button-disabled'}`} disabled={!formState.provider} onClick={() => {setIsFormFillable(true)}}>{t("transfer_phone.nextStep")}</button>
              </div> }
            </>
          )}
        </div>
        { isEligible && isFormFillable && <div className="transfer-phone-form-second">
          <div className="transfer-phone-form-row">
              <TextInput 
                labelText={t("transfer_phone.phoneForm.firstNameLabel")}
                placeholder={t("transfer_phone.phoneForm.firstNamePlaceholder")!}
                required={true}
                width="290px"
                value={formState.firstName}
                onChange={(e : any) => { 
                  updateFormState({
                    'firstName' : e.target.value
                  })
                }}
                />
                <TextInput 
                labelText={t("transfer_phone.phoneForm.lastNameLabel")}
                placeholder={t("transfer_phone.phoneForm.lastNamePlaceholder")!}
                required={true}
                width="290px"
                value={formState.lastName}
                onChange={(e : any) => { 
                  updateFormState({
                    'lastName' : e.target.value
                  })
                }}
                />
          </div>
          <div className="transfer-phone-form-row">
            
              <TextInput 
                labelText={t("transfer_phone.phoneForm.billingAddressLabel")}
                placeholder={t("transfer_phone.phoneForm.billingAddressPlaceholder")!}
                required={true}
                value={formState.billingAddress}
                width="290px"
                onChange={(e : any) => { 
                  updateFormState({
                    'billingAddress' : e.target.value
                  })
                }}
                />
              <TextInput 
                labelText={t("transfer_phone.phoneForm.billingAddress2Label")}
                placeholder={t("transfer_phone.phoneForm.billingAddress2Placeholder")!}
                required={false}
                value={formState.billingAddress2}
                width="290px"
                onChange={(e : any) => { 
                  updateFormState({
                    'billingAddress2' : e.target.value
                  })
                }}
                />
          </div>
          <div className="transfer-phone-form-row">
              <TextInput 
                labelText={t("transfer_phone.phoneForm.cityLabel")!}
                placeholder={t("transfer_phone.phoneForm.cityPlaceholder")!}
                required={true}
                value={formState.city}
                width="370px"
                onChange={(e : any) => { 
                  updateFormState({
                    'city' : e.target.value
                  })
                }}
              />
              <div className="text-input-container">
              <Dropdown 
                label={t("transfer_phone.phoneForm.stateLabel")!}
                required={true}
                // placeholder="State"
                value={formState.state}
                headerPlaceholder={t("transfer_phone.phoneForm.statePlaceholder")!}
                options={[
                  {
                    id: 0,
                    label: "A",
                    value: "A"
                  },
                  {
                    id: 1,
                    label: "B",
                    value: "B"
                  },
                  {
                    id: 2,
                    label: "C",
                    value: "C"
                  }
                ]} 
                onChange={(val : string) => updateFormStateOnChange('state', val)}
                />
                </div>
              <TextInput 
                labelText={t("transfer_phone.phoneForm.zipCodeLabel")!}
                placeholder={t("transfer_phone.phoneForm.zipCodePlaceholder")!}
                value={formState.zip}
                required={true}
                width="115px"
                onChange={(e : any) => { 
                  updateFormState({
                    'zip' : e.target.value
                  })
                }}
              />
          </div>
          <div className="transfer-phone-form-row">
            <TextInput 
                labelText={t("transfer_phone.phoneForm.accountNumberLabel")!}
                placeholder={t("transfer_phone.phoneForm.accountNumberPlaceholder")!}
                required={true}
                value={formState.accountNumber}
                width="290px"
                onChange={(e : any) => { 
                  updateFormState({
                    'accountNumber' : e.target.value
                  })
                }}
            />
          </div>
          <div
            className="transfer-phone-form-row"
            style={{ alignItems: "flex-end" }}
          >
             <TextInput 
                  labelText={t("transfer_phone.phoneForm.accountTransferPINLabel")!}
                  placeholder={t("transfer_phone.phoneForm.accountTransferPINPlaceholder")!}
                  required={true}
                  value={formState.accountPIN}
                  width="200px"
                  onChange={(e : any) => { 
                    updateFormState({
                      'accountPIN' : e.target.value
                    })
                  }}
              />
            <div
              className="transfer-phone-form-item"
              style={{ width: "290px" }}
            >
              <div className="transfer-phone-form-second-inrow-disclaimer">
                <b>{t("transfer_phone.phoneForm.noteBold")!}</b>{t("transfer_phone.phoneForm.noteText")!}
              </div>
            </div>
          </div>
          <div className="transfer-phone-form-action-row">
            <button className="transfer-phone-form-button button-secondary">{t("transfer_phone.back")!}</button>
            <button className={`transfer-phone-form-button button-primary ${!canContinue && 'button-disabled'}`} disabled={!canContinue} onClick={
              handleContinueOnClick
            }>{t("transfer_phone.continue")!}</button>
          </div>
        </div> }
      </div> 
      <div className="transfer-phone-side-c">
        <div className="transfer-phone-side-co">
          <div className="side-menu-item-logo"><CirclePhoneLogo/></div>
          <div className="side-menu-item-desc">
            <div className="side-menu-item-desc-title">{t("transfer_phone.needHelp")!}</div>
            <div className="side-menu-item-desc-text">
              {t("transfer_phone.callUs")!} <a href={`tel:${t("transfer_phone.phoneForm.callUsPhoneNumber")!}`}>866-482-1424</a>
            </div>
          </div>
        </div>
        <div className="transfer-phone-side-co">
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

export default TransferYourPhonePage;
