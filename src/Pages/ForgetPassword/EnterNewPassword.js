import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../utils/Header/ResalaLogo.svg";
import InputField from "../../Components/InputField";

const EnterNewPassword = () => {
    const navigate = useNavigate();

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidCaptch, setIsValidCaptch] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/passwordchanged");
    }

    return (
        <>
            <div className="py-[90px] px-[75px] flex flex-col justify-center">
                <div className="flex items-center justify-center gap-2 mb-[50px]">
                    <img
                        src={Logo}
                        alt="logo"
                        className="cursor-pointer h-32px] w-[32px]"
                    />
                    <div className="text-darkgray text-[18px]">
                        Resala.ai
                    </div>
                </div>
                <div className="text-[22px] flex justify-center mb-[8px] font-bold">
                    Create your account
                </div>
                <div className="flex justify-center px-[10px] text-center text-gray2 mb-[48px] flex-col text-[12px] gap-2">
                    Phone verification may be required for signup. Your number will only be used to verify your identity for security purposes.
                </div>
                <div className="flex justify-center flex-col gap-2">
                    <form>
                        <InputField
                            className="block w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray1"
                            name="enterpassword"
                            label="New password"
                            type="password"
                            isvisible={true}
                            placeholder=""
                        />
                        <InputField
                            className="block w-full rounded-md border border-gray mt-[4px] px-[15px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray1"
                            name="reenterpassword"
                            label="Re-enter new password"
                            type="password"
                            isvisible={true}
                            placeholder=""
                        />
                        <button
                            className='bg-transparent text-primaryBlue w-full mb-[15px] rounded-md px-1 py-[5px] text-[14px] font-medium hover:opacity-90 disabled:cursor-none disabled:opacity-50'
                            onClick={() => navigate('/forgetpassword')}
                        >
                            Forget password ?
                        </button>
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
                        </div>
                    </form>
                    <div className="flex justify-center items-center gap-1 mt-[24px]">
                        <span>
                            Don’t have account?
                        </span>
                        <button
                            className="text-primaryBlue"
                            onClick={() => navigate("/login")}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}
export default EnterNewPassword