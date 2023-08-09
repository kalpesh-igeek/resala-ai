import React, { useEffect, useState } from 'react';
import Logo from "../../utils/Header/ResalaLogo.svg";
import { useNavigate } from "react-router-dom";
import InputField from '../../Components/InputField';

const EnterCode = () => {
    const navigate = useNavigate();

    useEffect(() => {
      setTimeout(() => {
        navigate('/successful')
      }, 5000);
    }, [])
    

    return (
        <div className="py-[90px] px-[75px] flex flex-col justify-center">
            <div className="flex items-center justify-center gap-2 mb-[50px]">
                <img
                    src={Logo}
                    alt="logo"
                    className="cursor-pointer h-[32px] w-[32px]"
                />
                <div className="text-darkgray text-[18px]">
                    Resala.ai
                </div>
            </div>
            <div className="text-[22px] flex justify-center mb-[8px] font-bold">
                Enter the code
            </div>
            <div className="flex justify-center px-[10px] text-center text-gray2 mb-[48px] flex-col text-[12px] gap-2">
                Please enter the code we just sent you.
            </div>
            <InputField
                className="text-center block w-full rounded-md border border-gray px-[15px] py-[16px] mb-[12px] text-[14px] text-darkBlue placeholder:text-gray1"
                name="phone"
                label=""
                type="number"
                placeholder="000 000"
            />
            <button
                className='bg-transparent text-primaryBlue w-full rounded-md px-1 py-[5px] text-[14px] font-medium hover:opacity-90 disabled:cursor-none disabled:opacity-50'
                // onClick={() => handleSMSbutton()}
            >
                Resend code
            </button>
        </div>
    );
}
export default EnterCode