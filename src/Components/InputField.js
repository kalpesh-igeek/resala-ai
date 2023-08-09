import React, { useEffect, useState } from 'react';
import EyeIcon from '../utils/Account/Icons/EyeIcon.svg';
import closeEyeIcon from '../utils/Account/Icons/eyeslash.svg';

const InputField = ({ name, label, type, className, placeholder, value, isvisible, handleChange }) => {
  //   function handleChange(e) {
  //     setInputValue(e.target.value);
  //   }
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-container relative w-full">
      <input
        className={className}
        name={name}
        type={name === 'password' && showPassword ? 'text' : type}
        // value={inputValue.value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {/* {errors.inputValue.value && <p>{errors.inputValue.value}</p>} */}
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
    </div>
  );
};
export default InputField;
