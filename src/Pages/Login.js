import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../utils/Header/ResalaLogo.svg";
import GoogleIcon from '../utils/Account/Icons/GoogleIcon.svg';
import MicrosoftIcon from '../utils/Account/Icons/MicrosoftIcon.svg';
import AppleIcon from '../utils/Account/Icons/AppleIcon.svg';
import InputField from "../Components/InputField";

export default function Login({ isLogin, setIsLogin }) {
    const navigate = useNavigate();

    const [isValidUser, setIsValidUser] = useState(false);
    const handleSubmit = () => {
        if (!isValidUser) {
            setIsValidUser(true)
        } else {
            setIsLogin(true);
            navigate("/")
        }
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
                    <div className="text-darkgray text-[18px] font-Poppins font-medium">
                        Resala.ai
                    </div>
                </div>
                <div className="text-[22px] flex justify-center mb-[40px] font-bold">
                    Welcome Back
                </div>
                <div className="flex justify-center flex-col">
                    <InputField
                        className="block w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray1"
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder=""
                    />
                    {isValidUser &&
                        <>
                            <InputField
                                className="block w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray1"
                                name="password"
                                label="Password"
                                type="password"
                                placeholder=""
                                isvisible={true}
                            />
                            <button
                                className='bg-transparent text-primaryBlue w-full mb-[24px] rounded-md px-1 py-[5px] text-[14px] font-medium hover:opacity-90 disabled:cursor-none disabled:opacity-50'
                                onClick={() => navigate('/forgetpassword')}
                            >
                                Forget password ?
                            </button>
                        </>
                    }
                    <div className="col-span-full mb-[15px]">
                        <div className="flex gap-2 items-center">
                            <button
                                className="w-full rounded-md bg-primaryBlue px-1 py-[16px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                                type="submit"
                                onClick={() => handleSubmit()}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-1 mt-[10px]">
                    <span>
                        Don’t have account?
                    </span>
                    <button
                        className="text-primaryBlue"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </button>
                </div>
                {!isValidUser &&
                    <>
                        <div className="flex justify-center relative items-center gap-1 mt-[24px]">
                            <span className="bg-white uppercase px-[10px] z-10">Or</span>
                            <span className="bg-gray h-[1px] absolute w-full"></span>
                        </div>
                        <div className="flex flex-col relative items-center gap-[12px] mt-[24px]">
                            <div className="w-full flex gap-2 items-center">
                                <button
                                    className="flex items-center gap-2 w-full text-left rounded-md bg-white px-3 py-[14px] text-[14px] text-gray2 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
                                >
                                    <img src={GoogleIcon} />
                                    Continue with Google
                                </button>
                            </div>
                            <div className="w-full flex gap-2 items-center">
                                <button
                                    className="flex items-center gap-2 w-full text-left rounded-md bg-white px-3 py-[14px] text-[14px] text-gray2 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
                                >
                                    <img src={MicrosoftIcon} />
                                    Continue with Microsoft Account
                                </button>
                            </div>
                            <div className="w-full flex gap-2 items-center">
                                <button
                                    className="flex items-center gap-2 w-full text-left rounded-md bg-white px-3 py-[14px] text-[14px] text-gray2 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
                                >
                                    <img src={AppleIcon} />
                                    Continue with Apple
                                </button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    );
}