import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import EyeIcon from '../utils/Account/Icons/EyeIcon.svg';
import closeEyeIcon from '../utils/Account/Icons/eyeslash.svg';

const InputField = ({
  name,
  label,
  type,
  className,
  placeholder,
  value,
  isvisible,
  handleChange,
  disabled,
  setIsRegistered,
  isRegistered,
  setIsSecondStep,
  displayValue,
  // isLoading,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { isLoading } = useSelector((state) => state.auth);
  const inputRef = useRef();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleGameClick = () => {
    setIsRegistered(false);
    setIsSecondStep(false);
    inputRef.current.focus();
  };
  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const value = event.target.value;
    if (/\D/.test(keyValue) || (value.length >= 6 && keyCode !== 8))
      // if key pressed is not digit or length is more than 6 and key is not backspace
      event.preventDefault();
  };

  const handleKeyPressPass = (e) => {
    if (e.key === '') {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="input-container relative w-full">
        {name === 'otp' ? (
          <input
            className={className}
            name={name}
            type={type}
            // value={inputValue.value}
            maxLength="6"
            onChange={handleChange}
            placeholder={placeholder}
            displayValue={displayValue?.otp.toString().replace(/(\d{3})(?=\d)/g, '$1 ')}
            // onkeydown="return event.keyCode !== 69"
            // onKeyPress={handleKeyPress}
          />
        ) : (
          <input
            ref={inputRef}
            className={`appearance-none ${className}`}
            name={name}
            type={(name === 'password' || name === 're_password') && showPassword ? 'text' : type}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            // required={type === 'email' || type === 'password' ? true : false}
            disabled={isLoading}
          />
        )}
        {/* ${value && 'filled'}  */}
        {/* <label
          className={`input-label bg-white inline-flex absolute text-[14px] font-normal leading-6 text-gray2 px-[2px] filled
                ${type === 'date' && 'right-[15px]'}
                ${type === 'number' && 'hidden'}
                `}
        >
          {label}
        </label> */}

        <label
          className={`input-label bg-white inline-flex absolute text-[14px] font-normal leading-6 text-gray2 px-[2px] ${
            (type === 'email' || type === 'password') && (value || isFocused) ? 'filled text-[12px]' : ''
          } 
            ${type === 'date' && 'right-[15px]'}
            ${type === 'number' && 'hidden'}
            ${type === 'text' && 'hidden'}
            `}
        >
          {label}
        </label>
        {/* <label className={`label ${isFocused ? 'label-focused' : ''}`}>{label}</label> */}
        {type === 'password' && isvisible && (
          <div
            className="absolute top-[50%] -translate-y-[50%] right-[15px] cursor-pointer"
            onClick={() => handleShowPassword()}
          >
            {!showPassword ? <img src={EyeIcon} alt="eyeicon" /> : <img src={closeEyeIcon} alt="closeEyeIcon" />}
          </div>
        )}

        {isRegistered && !isLoading && (
          <div
            className="absolute top-[45%] -translate-y-[50%] right-[15px] cursor-pointer"
            onClick={() => handleGameClick()}
          >
            <p className="text-primaryBlue w-[26px] h-[16px] cursor-pointer">Edit</p>
          </div>
        )}
      </div>
    </>
  );
};
export default InputField;
