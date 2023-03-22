import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { maskPhoneInput } from '../utils/phone-utils';
import ComposePanelForm from './components/ComposePanelForm';

import './ComposePanel.css'

interface ComposePanelProps extends React.ComponentProps<any> {
  title : string
  pageId: string
}

const ComposePanel = (props : ComposePanelProps) => {

  const [searchParams] = useSearchParams();
  const [state] = React.useState({
    phoneNumber: getParsedPhoneNumberFromParams(),
    phoneNumberRaw: getPhoneNumberFromParams() || ''
  })

  function getPhoneNumberFromParams() {
    return searchParams.get('phoneNumber')
  }

  function getParsedPhoneNumberFromParams () {
    const phoneNumber = getPhoneNumberFromParams()
    if (phoneNumber) {
      const maskedPhoneInput = maskPhoneInput(phoneNumber)
      return maskedPhoneInput
    }
    return ''
  }

  // format the form here to make it presentable
  return (
    <div className="new-tweet-container">
      <ComposePanelForm defaultPhoneNumberValue={state.phoneNumber} pageId={props.pageId}/>
      <div id="is-porting"></div>
    </div>
  );
};
export default ComposePanel;
