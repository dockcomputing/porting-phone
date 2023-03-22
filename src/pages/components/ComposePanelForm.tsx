import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { maskPhoneInput } from '../../utils/phone-utils';
import './ComposePanelForm.css'

interface ComposePanelFormProps {
  defaultPhoneNumberValue : string;
  pageId: string
}

function ComposePanelForm(props : ComposePanelFormProps) {
  
  const navigate = useNavigate()

  const { t } = useTranslation(); 
  const [state, setState] = useLocalStorage('rawState', {
    phoneNumber: maskPhoneInput(props.defaultPhoneNumberValue),
    billingAddress: '',
    password: '',
    accountNumber: '',
  })

  const [formFieldFocused, setFormFieldFocused] = useLocalStorage('focusedFields', {
    phoneNumber: false,
    billingAddress: false,
    password: false,
    accountNumber: false,
  })

  const [pristineForm, setPristineForm] = useLocalStorage('pristineForm', {
    phoneNumber: true,
    accountNumber: true,
    billingAddress: true,
    password: true,
  })

  const [errors, setFormErrors] = useLocalStorage('formErrors', {
    phoneNumber: '',
    billingAddress: '',
    password: '',
    accountNumber: '',
  })
  
  const [queryResult] = React.useState({
   error: false, 
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isFormInvalid()) return
    e.preventDefault();

    // handle multiple input from form
    const phoneNumber = (document.getElementById('phoneNumber') as HTMLInputElement)
    
    if (phoneNumber.value.length === 0) {
      return
    } else {
      console.log('Value for phone number is: ', phoneNumber.value)
    }

    // eslint-disable-next-line
    const body = phoneNumber.value.replace(/[\s\(\)\-]/g, "");

    window.localStorage.clear()
    navigate('/setup')
    window.scrollTo(0, 0);
    
  };

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isPortingElement = document.getElementById('is-porting')!
    isPortingElement.innerHTML = ''
  }

  const handlePhoneInput = (e: any) => {
    const phoneValue = e.target.value
    const maskedPhoneInput = maskPhoneInput(phoneValue)
    setState({
      ...state,
      phoneNumber: maskedPhoneInput
    })

    if (pristineForm.phoneNumber) {
      setPristineForm((state : any) => ({
        ...state,
        phoneNumber: false,
      }))
    }
    // eslint-disable-next-line
    if (!maskedPhoneInput || maskedPhoneInput.replace(/[\(\)\s-]/g, '').length < 10 ) {
      setFormErrors({
        ...errors,
        phoneNumber: t('form_fields.phone_number.error')
      })
    } else {
      setFormErrors({
        ...errors,
        phoneNumber: ''
      })
    }
  }

  const handleAccountNumberInput = (e: any) => {
    const accountNumberValue = e.target.value
    setState({
      ...state,
      accountNumber: accountNumberValue
    })

    if (pristineForm.phoneNumber) {
      setPristineForm((state : any) => ({
        ...state,
        accountNumber: false,
      }))
    }
    // eslint-disable-next-line
    if (accountNumberValue.length === 0 ) {
      setFormErrors({
        ...errors,
        accountNumber: t('form_fields.account_number.error')
      })
    } else {
      setFormErrors({
        ...errors,
        accountNumber: ''
      })
    }
  }

  const handlePasswordInput = (e: any) => {
    const value = e.target.value

    if (pristineForm.password) {
      setPristineForm((state : any) => ({
        ...state,
        password: false,
      }))
    }

    setState({
      ...state,
      password: value
    })
    
    if (!value || value.length === 0 ) {
      setFormErrors({
        ...errors,
        password: t('form_fields.password.error')
      })
    } else {
      setFormErrors({
        ...errors,
        password: ''
      })
    }
  }

  const handleBillingAddressInput = (e: any) => {
    const value = e.target.value

    if (pristineForm.billingAddress) {
      setPristineForm((state : any) => ({
        ...state,
        billingAddress: false,
      }))
    }

    setState({
      ...state,
      billingAddress: value
    })
    if (!value || value.length === 0 ) {
      setFormErrors({
        ...errors,
        billingAddress: t('form_fields.billing_address.error')
      })
    } else {
      setFormErrors({
        ...errors,
        billingAddress: ''
      })
    }
  }

  const isFormInvalid = () => {
    return !!(errors.billingAddress || errors.accountNumber || errors.password || errors.phoneNumber || !state.billingAddress || !state.phoneNumber || !state.password)
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit} onChange={handleChange} className='form-container'>
      <input type="hidden" value="123456789"/>
      <div className="title-div">
        <h3>{t('congrats_new_phone')}</h3>
        {t('form_subheader_1')}
        <br /><br />
        {t('form_subheader_2')}
      </div>

      <div className="form-item">
        <label className="form-label">
        {t('form_fields.phone_number.label')}
        </label>
        <input 
          name="phoneNumber" id="phoneNumber" placeholder={t('form_fields.phone_number.placeholder') || ''}
          className="form-input" onInput={handlePhoneInput}
          onBlur={() => setFormFieldFocused((state : any) => ({ ...state, phoneNumber: true}))}
          value={state.phoneNumber}></input>
        { errors.phoneNumber && formFieldFocused.phoneNumber && !pristineForm.phoneNumber && <div className='input-error-message'>{errors.phoneNumber}</div> }
      </div>

      <div className="form-item">
        <label className="form-label">
        {t('form_fields.account_number.label')}
        </label>
        <input name="accountNumber" id="accountNumber" placeholder={t('form_fields.account_number.placeholder') || ''} className="form-input" onInput={handleAccountNumberInput}
          onBlur={() => setFormFieldFocused((state : any) => ({ ...state, accountNumber: true}))}
          value={state.accountNumber}></input>
        { errors.accountNumber && formFieldFocused.accountNumber && !pristineForm.accountNumber && <div className='input-error-message'>{errors.accountNumber}</div> }

      </div>

      <div className="form-item">
        <label className="form-label">
        {t('form_fields.billing_address.label')}
        </label>
        <input type="text"
          name="billingAddress" id="billingAddress" autoComplete='new-password' placeholder={t('form_fields.billing_address.placeholder') || ''} 
          className="form-input" onInput={handleBillingAddressInput} value={state.billingAddress}
          onBlur={() => setFormFieldFocused((state : any) => ({ ...state, billingAddress: true}))}
        ></input>
        { errors.billingAddress && formFieldFocused.billingAddress && !pristineForm.billingAddress && <div className='input-error-message'>{errors.billingAddress}</div> }
      </div>

      <div className="form-item" >
        <label className="form-label">
        {t('form_fields.password.label')}
        </label>
        <input type="password" autoComplete='one-time-code'
          name="password" id="password" placeholder={t('form_fields.password.placeholder') || ''}
          className="form-input" onInput={handlePasswordInput} value={state.password}
          onBlur={() => setFormFieldFocused((state : any) => ({ ...state, password: true}))}
        ></input>
        { errors.password && formFieldFocused.password && !pristineForm.password && <div className='input-error-message'>{errors.password}</div> }
        <div className="form-note">
          <div><h4>{t('form_fields.disclaimer.title')}</h4></div>
          <div className="form-note-password-advice"> {t('form_fields.disclaimer.content')}</div>
      </div>
    </div>

      <input type="submit" value={t('form_fields.submit.value') || ''} className={`form-submit-button ${props.pageId === 'page2' ? 'page2-button' : 'page1-button'} ${isFormInvalid() ? 'submit-disabled' : ''}`} />
      { queryResult.error && <div className="form-error">{t('form_fields.submit.error')}</div>}
    </form>
  );
}

export default ComposePanelForm;
