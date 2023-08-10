import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  setDisabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleGameClick = () => {
    setDisabled(!disabled);
  };

  return (
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
        />
      ) : (
        <input
          className={className}
          name={name}
          type={name === 'password' && showPassword ? 'text' : type}
          // value={inputValue.value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
      <label
        className={`bg-white inline-flex absolute text-[14px] font-normal leading-6 text-gray2 px-[2px] filled
                ${type === 'date' && 'right-[15px]'}
                ${type === 'number' && 'hidden'}
                `}
      >
        {label}
      </label>
      {type === 'password' && isvisible && (
        <div
          className="absolute top-[50%] -translate-y-[50%] right-[15px] cursor-pointer"
          onClick={() => handleShowPassword()}
        >
          {!showPassword ? <img src={EyeIcon} alt="eyeicon" /> : <img src={closeEyeIcon} alt="closeEyeIcon" />}
        </div>
      )}
      {type === 'email' && location.pathname === '/' && (
        <div
          className="absolute top-[45%] -translate-y-[50%] right-[15px] cursor-pointer"
          onClick={() => handleGameClick()}
        >
          <p className="text-primaryBlue w-[26px] h-[16px] cursor-pointer">Edit</p>
        </div>
      )}
    </div>
  );
};
export default InputField;
