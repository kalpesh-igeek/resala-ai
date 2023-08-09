import React, { useEffect, useState } from "react";
import EyeIcon from '../utils/Account/Icons/EyeIcon.svg'

const InputField = ({ name, label, type, className, placeholder, value, isvisible }) => {
    const [inputValue, setInputValue] = useState(value);

    function handleChange(e) {
        setInputValue(e.target.value);
    }

    const handleShowPassword = () => {

    }

    return (
        <div className="input-container relative w-full">
            <input
                className={className}
                name={name}
                type={type}
                value={inputValue}
                onChange={handleChange}
                placeholder={placeholder}
                />
            <label className={`bg-white inline-flex absolute text-[14px] font-normal leading-6 text-gray2 px-[2px] 
                ${inputValue && 'filled'} 
                ${type === 'date' && 'right-[15px]'}
                ${type === 'number' && 'hidden'}
                `}>
                {label}
            </label>
            {type === 'password' &&
                isvisible &&
                <div
                    className="absolute top-[50%] -translate-y-[50%] right-[15px]"
                    onClick={() => handleShowPassword()}
                >
                    <img src={EyeIcon} alt="eyeicon" />
                </div>
            }
        </div>
    );
}
export default InputField