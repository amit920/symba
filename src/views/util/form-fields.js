import React from "react";
import Select from "react-select";
//import { Creatable } from "react-select";
// import changeCase from 'change-case';
import DatePicker from "react-datepicker";
import moment from "moment";
// require('!style-loader!css-loader!react-datepicker/dist/react-datepicker.css');

// import ComboField from './combo-field';
/* eslint-disable */
export const EMAIL_REGEX = new RegExp(
  /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*/
);
export const PHONE_NUMBER_REGEX =
  /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;
export const URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
export const renderTextField = (props) => (
  <div>
    <input
      {...props.input}
      placeholder={props.placeholder}
      type={props.type}
      className={props.className}
      disabled={props.disabled}
      maxLength={props.maxLength}
      style={props.style}
    />
    {!props.noValidate && !props.meta.error && !props.disabled && (
      <span className="sprite validation-success"></span>
    )}
    {props.meta.error && props.meta.touched && (
      <div className="validation-error">{props.meta.error}</div>
    )}
  </div>
);
export const Checkbox = (props) => (
  <div>
    <input {...props.input} className={props.className}></input>
    {!props.noValidate && !props.meta.error && !props.disabled && (
      <span className="sprite validation-success"></span>
    )}
    {props.meta.touched && (
      <div className="validation-error">{props.meta.error}</div>
    )}
  </div>
);
export const renderTextArea = (props) => (
  <div>
    <textarea
      {...props.input}
      placeholder={props.placeholder}
      className={props.className}
      disabled={props.disabled}
      maxLength={props.maxLength}
      style={props.style}
      rows={props.rows}
    ></textarea>
    {!props.noValidate && !props.meta.error && !props.disabled && (
      <span className="sprite validation-success"></span>
    )}
    {props.meta.touched && (
      <div className="validation-error">{props.meta.error}</div>
    )}
  </div>
);

export const renderSelectField = (props) => (
  <div>
    <Select
      {...props}
      value={props.input.value}
      onChange={(value) => {
        props.input.onChange(value ? value[props.valueKey] : value);
        if (typeof props.onChangeEvent == "function") {
          props.onChangeEvent(value[props.valueKey]);
        }
      }}
      onBlur={() =>
        props.input.onBlur(
          props.input.value ? props.input.value.value : props.input.value
        )
      }
      options={props.options}
      className={props.className}
      placeholder={props.placeholder}
      disabled={props.disabled}
    />
    {!props.noValidate && !props.meta.error && !props.disabled && (
      <span className="sprite validation-success"></span>
    )}
    {props.meta.touched && (
      <div className="validation-error">{props.meta.error}</div>
    )}
  </div>
);

export const renderMultiSelectField = (props) => (
  <div>
    <Select
      {...props}
      value={props.input.value}
      onChange={(value) => {
        props.input.onChange(value ? value.map((x) => x[props.valueKey]) : []);
        if (typeof props.onChangeEvent == "function") {
          props.onChangeEvent(value[props.valueKey]);
        }
      }}
      onBlur={() =>
        props.input.onBlur(
          props.input.value ? props.input.value.value : props.input.value
        )
      }
      options={props.options}
      className={props.className}
      placeholder={props.placeholder}
      disabled={props.disabled}
    />
    {!props.noValidate && !props.meta.error && !props.disabled && (
      <span className="sprite validation-success"></span>
    )}
    {props.meta.touched && (
      <div className="validation-error">{props.meta.error}</div>
    )}
  </div>
);

export const renderDateField = (props) => (
  <div>
    <DatePicker
      id={"datepicker"}
      className={props.className}
      disabled={props.disabled}
      selected={props.input.value ? moment(props.input.value) : ""}
      onChange={(value) => props.input.onChange(value)}
      dateFormat="MMMM DD, YYYY"
    />
    {!props.noValidate && !props.meta.error && !props.disabled && (
      <span className="sprite validation-success"></span>
    )}
    {props.meta.touched && (
      <div className="validation-error">{props.meta.error}</div>
    )}
  </div>
);

export const renderDateFieldutility = (props) => (
  <div>
    <DatePicker
      id={"datepicker"}
      className={props.className}
      disabled={props.disabled}
      selected={props.input.value ? moment(props.input.value) : ""}
      onChange={(value) => props.input.onChange(value)}
      dateFormat="MM-DD-YY"
    />
    {!props.noValidate && !props.meta.error && !props.disabled && (
      <span className="sprite validation-success"></span>
    )}
    {props.meta.touched && (
      <div className="validation-error">{props.meta.error}</div>
    )}
  </div>
);

// export const renderComboField = (props) => (
//   <ComboField {...props}
//       value={props.input.value}
//       className={props.className}
//       clearValue={() => props.input.onChange('')}
//       onChange={(value) => props.input.onChange(value ? value.value : value)}
//       onBlur={() => props.input.onBlur(props.input.value ? props.input.value.value : props.input.value)}
//       options={props.options.concat([{label: 'Other', value:'Other', clearableValue: false}])}
//       placeholder={props.placeholder}
//       disabled={props.disabled}/>
// )

const adaptFileEventToValue = (delegate) => (e) => {
  delegate(e.target.files[0]);
};

export const fileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => (
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />
);

export const validate = (values, validations) => {
  const errors = {};
  if (validations.required) {
    validations.required.fields.forEach((field) => {
      if (values[field] === "undefined" || values[field] === "") {
        // errors[field] = changeCase.sentence(field) + ' required';
      }
    });
  }

  if (validations.charCount) {
    validations.charCount.fields.forEach((field) => {
      if (values[field]) {
        if (
          validations.charCount.min &&
          values[field].length < validations.charCount.min
        ) {
          errors[
            field
          ] = `Must be at least ${validations.charCount.min} characters`;
        }
        if (
          validations.charCount.max &&
          values[field].length > validations.charCount.max
        ) {
          errors[
            field
          ] = `Must be ${validations.charCount.max} characters or less`;
        }
      }
    });
  }

  if (validations.match) {
    validations.match.fields.forEach((field) => {
      if (
        values[field] &&
        values[field] !== values[validations.match.toMatch]
      ) {
        errors[field] = `Does not match ${validations.match.toMatch}`;
      }
    });
  }

  if (validations.isNumber) {
    validations.isNumber.fields.forEach((field) => {
      if (values[field] && isNaN(values[field])) {
        errors[field] = `Must be a number`;
      }
    });
  }

  if (validations.email) {
    validations.email.fields.forEach((field) => {
      if (values[field] && !EMAIL_REGEX.test(values[field])) {
        errors[field] = `Invalid email`;
      }
    });
  }

  if (validations.phone_number) {
    validations.phone_number.fields.forEach((field) => {
      if (values[field] && !PHONE_NUMBER_REGEX.test(values[field])) {
        errors[field] = "Invalid Phone Number";
      }
    });
  }

  // if (validations.urls) {
  //   validations.urls.fields.forEach(field => {
  //     if (values[field] && !URL_REGEX.test(values[field])) {
  //       errors[field] = 'Invalid URL';
  //     }
  //   })
  // }

  return errors;
};

// const isoDate = (date) => {
//   const dateObj = new Date(date);
//   return dateObj.toISOString();
// };
