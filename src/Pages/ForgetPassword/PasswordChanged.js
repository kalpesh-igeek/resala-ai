import React from "react";
import PasswordSuccessLogo from "../../utils/Account/Icons/PasswordSuccessLogo.svg";
import { useNavigate } from "react-router-dom";

const  PasswordChanged = () => {
    const navigate = useNavigate();
    return (
        <div className="py-[90px] px-[75px] flex flex-col justify-center">
            <div className="flex items-center justify-center gap-2 mb-[50px]">
                <img
                    src={PasswordSuccessLogo}
                    alt="PasswordSuccessLogo"
                    className="cursor-pointer h-[64px] w-[64px]"
                />
            </div>
            <div className="text-[22px] flex justify-center mb-[8px] font-bold">
                Password Changed!
            </div>
            <div className="flex justify-center px-[10px] text-center text-gray2 mb-[48px] flex-col text-[12px] gap-2">
                Your password has been changed successfully.
            </div>
            <button
                className="w-full rounded-md bg-primaryBlue px-1 py-[16px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                onClick={() => navigate('/login')}
            >
                Back to Apps Client
            </button>
        </div>
    );
}
export default PasswordChanged