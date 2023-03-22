import React from "react";
import "./TextInput.css";

interface TextInputProps {
    onChange?: Function,
    errorMessage?: string,
    labelText: string,
    required?: boolean,
    placeholder?: string,
    width?: string
    value?: string,
}

const TextInput = (props : TextInputProps) => {
  return (
    <div className="text-input-container" style={{
            width: props.width || 'auto'
        }}>
        <div className="text-input-label">{props.labelText} {props.required && <span className="input-required-marker">*</span>}</div>
        <input
            className="text-input"
            type="text"
            placeholder={props.placeholder}
            value={props.value || ''}
            // @ts-ignore
            onChange={props.onChange || function(){}}

        />
        {props.errorMessage && <div className="text-input-error-message">{props.errorMessage}</div>}
    </div>
  );
};

export default TextInput;
