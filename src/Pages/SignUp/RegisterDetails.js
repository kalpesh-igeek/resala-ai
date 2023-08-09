import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../utils/Header/ResalaLogo.svg";
import InputField from "../../Components/InputField";

const RegisterDetails = () => {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate("/mobileverification")
    }
    return (
        <>
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
                <div className="text-[22px] flex justify-center mb-[40px] font-bold">
                    Tell us about you
                </div>
                <div className="w-full flex gap-2 items-center justify-center">
                    <InputField
                        className="w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray2"
                        name="firstname"
                        label="First name"
                        type="text"
                        placeholder=""
                    />
                    <InputField
                        className="w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray2"
                        name="lastname"
                        label="Last name"
                        type="text"
                        placeholder=""
                    />
                </div>
                <InputField
                    className="block w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray2"
                    name="organizationname"
                    label="Organization name (Optional)"
                    type="text"
                    placeholder=""
                />
                <div className="flex gap-2 items-center">
                    <button
                        className="w-full rounded-md bg-primaryBlue px-1 py-[16px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                        onClick={() => handleSubmit()}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </>
    );
}

export default RegisterDetails