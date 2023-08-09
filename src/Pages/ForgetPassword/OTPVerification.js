import React, { useState, useEffect } from "react";
import OTPVerificationLogo from "../../utils/Account/Icons/OTPVerificationLogo.svg";
import CheckEmailLogo from "../../utils/Account/Icons/CheckEmailLogo.svg";
import { useNavigate } from "react-router-dom";
import InputField from "../../Components/InputField";

const OTPVerification = () => {
    const navigate = useNavigate();

    const [isOTPSent, setIsOTPSent] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsOTPSent(false)
            navigate('/otpverification')
        }, 5000);
    }, [])


    return (
        <div className="py-[90px] px-[75px] flex flex-col justify-center">
            {isOTPSent ?
                <>
                    <div className="flex items-center justify-center gap-2 mb-[40px]">
                        <img
                            src={CheckEmailLogo}
                            alt="CheckEmailLogo"
                            className="cursor-pointer h-[70px] w-[70px]"
                        />
                    </div>
                    <div className="text-[22px] flex justify-center mb-[8px] font-bold">
                        Check Your Email
                    </div>
                    <div className="flex justify-center px-[10px] text-center text-gray2 mb-[24px] flex-col text-[12px] gap-2">
                        We will send you an One Time Password.
                        Please check the email address example@gmail.com.
                    </div>
                </>
                :
                <>
                    <div className="flex items-center justify-center gap-2 mb-[40px]">
                        <img
                            src={OTPVerificationLogo}
                            alt="OTPVerificationLogo"
                            className="cursor-pointer h-[70px] w-[70px]"
                        />
                    </div>
                    <div className="text-[22px] flex justify-center mb-[8px] font-bold">
                        OTP Verification
                    </div>
                    <div className="flex justify-center px-[10px] text-center text-gray2 mb-[24px] flex-col text-[12px] gap-2">
                        Enter the OTP send to example@gmail.com
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
                    >
                        Resend code
                    </button>
                    <button
                        className="w-full rounded-md bg-primaryBlue mt-[12px] px-1 py-[16px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                        onClick={() => navigate('/enternewpassword')}
                    >
                        Continue
                    </button>
                </>
            }
        </div>

    );
}
export default OTPVerification