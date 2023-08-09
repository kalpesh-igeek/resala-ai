import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../utils/Header/ResalaLogo.svg";
import InputField from "../../Components/InputField";


const ForgetPassword = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/otpverification");
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
                <div className="text-[22px] flex justify-center mb-[8px] font-bold">
                    Reset your password
                </div>
                <div className="flex justify-center px-[10px] text-center text-gray2 mb-[40px] flex-col text-[12px] gap-2">
                    Enter your email address and we will send you instructions to reset your password.
                </div>
                <div className="flex justify-center flex-col gap-2">
                    <form>
                        <InputField
                            className="block w-full rounded-md border border-gray px-[15px] py-[16px] mb-[12px] text-[14px] text-darkBlue placeholder:text-gray1"
                            name="email"
                            label="Email Address"
                            type="email"
                            placeholder=""
                        />
                    </form>
                </div>
                <div className="col-span-full">
                    <div className="flex gap-2 items-center">
                        <button
                            className="w-full rounded-md bg-primaryBlue px-1 py-[16px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                            type="submit"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Continue
                        </button>
                    </div>
                    <button
                        className='bg-transparent text-gray2 w-full rounded-md px-1 py-[16px] text-[14px] font-medium hover:opacity-90 disabled:cursor-none disabled:opacity-50'
                        onClick={(e) => navigate('/login')}
                    >
                        Back to login
                    </button>
                </div>

            </div>
        </>
    );
}
export default ForgetPassword