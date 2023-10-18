import React, { useState, useEffect } from 'react';
import OTPVerificationLogo from '../../utils/Account/Icons/OTPVerificationLogo.svg';
import InformationIcon from '../../utils/Account/Icons/information.svg';
import InforCircleIcon from '../../utils/Account/Icons/info-circle.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../Components/InputField';
import { otpCheck } from '../../utils/validation';
import { forgotPasswordDetails, otpVerification, sendOtpMail } from '../../redux/reducers/authSlice/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import SubHeader from '../../Layout/SubHeader';

const OTPVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const { state } = useLocation();
  const { userEmail } = state; // Read values passed on state

  const [isOTPSent, setIsOTPSent] = useState(true);
  const [inputValue, setInputValue] = useState({ otp: 0 });
  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOTPSent(false);
      // navigate('/otpverification');
    }, 4000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    if (errors[name])
      setErrors((error) => {
        let errorNew = { ...error };
        delete errorNew[name];
        return errorNew;
      });
  };

  const otpVerificationMail = async (e) => {
    e.preventDefault();

    var errors;
    errors = otpCheck(inputValue);
    if (Object.keys(errors)?.length) {
      setErrors(errors);
      return;
    }
    const payload = {
      email: userEmail.email,
      otp: inputValue.otp,
    };
    const res = await dispatch(otpVerification(payload));

    if (!res?.payload) {
      return;
    }
    if (res.payload.status === 200) {
      // const res = await dispatch(forgotPasswordDetails(inputValue));
      navigate('/enternewpassword', { state: { email: userEmail } });
    }
  };

  useEffect(() => {
    setIsButtonDisabled(true);
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          setIsButtonDisabled(false);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
  }, []);
  const handleResendOtpMail = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true); // Disable button immediately after click
    res = await dispatch(sendOtpMail(userEmail));

    if (!res.payload) {
      setIsButtonDisabled(timer !== 0); // Enable button if request fails and timer is 0
      return;
    }

    if (res.payload?.status === 200) {
      setTimer(60); // Start timer only after successful response
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            setIsButtonDisabled(false);
            return 0;
          } else {
            setIsButtonDisabled(true); // Keep button disabled as long as timer is not 0
            return prevTimer - 1;
          }
        });
      }, 1000);
    } else {
      setIsButtonDisabled(timer !== 0); // Enable button if request fails and timer is 0
    }
  };

  return (
    <>
    <SubHeader></SubHeader>
      {isOTPSent ? (
        <div className="flex gap-1 bg-lightblue1 justify-center">
          <div className="flex gap-2 justify-center py-[12px]">
            <img src={InformationIcon} className="" />
            <span className="text-[14px] text-primaryBlue">
              We have sent you verification code to
              <span className="text-[14px] text-primaryBlue font-bold"> {userEmail.email}</span>
            </span>
          </div>
        </div>
      ) : (
        <div
          className="px-[15px] py-[15px] text-[14px] font-bold text-primaryBlue cursor-pointer"
          onClick={() => navigate('/forgetpassword')}
        >
          Go Back
        </div>
      )}
      <div className="py-[56px] px-[75px] flex flex-col justify-center">
        {/* {isOTPSent ? (
          // <>
          //   <div className="flex items-center justify-center gap-2 mb-[40px]">
          //     <img src={CheckEmailLogo} alt="CheckEmailLogo" className="cursor-pointer h-[70px] w-[70px]" />
          //   </div>
          //   <div className="text-[22px] flex justify-center mb-[8px] font-bold">Check Your Email</div>
          //   <div className="flex justify-center px-[10px] text-center text-gray2 mb-[24px] flex-col text-[12px] gap-2">
          //     We will send you an One Time Password. Please check the email address example@gmail.com.
          //   </div>
          // </> */}
        {/* ) : ( */}
        <>
          <div className="flex items-center justify-center gap-2 mb-[40px]">
            <img src={OTPVerificationLogo} alt="OTPVerificationLogo" className="cursor-pointer h-[70px] w-[70px]" />
          </div>
          <div className="text-[22px] flex justify-center mb-[8px] font-bold text-[#19224C]">Verification Code</div>
          <div className="px-[10px] text-center text-gray2 mb-[24px] flex-col text-[12px] gap-2">
            Enter the code we sent to <span className="font-bold"> {userEmail.email}</span>
          </div>
          <InputField
            className="text-center block w-full rounded-md border border-gray px-[15px] py-[16px] mb-[12px] text-[14px] text-darkBlue placeholder:text-gray1"
            name="otp"
            label=""
            type="number"
            placeholder="000 000"
            handleChange={(e) => handleChange(e)}
          />
          {errors.otp && <p className="text-red text-[12px] mb-[5px]">{errors.otp}</p>}
          {/* <div className="bg-red1 mt-[4px] mb-[16px] rounded-md">
            <div className="flex gap-2 items-center py-[12px] px-[10px]">
              <img src={InforCircleIcon} className="" />
              <span className="text-[12px] text-red">Code entered is incorrect. Please try again.</span>
            </div>
          </div> */}
          {timer !== 0 && (
            <div className="flex justify-center bg-transparent text-primaryBlue w-full rounded-md px-1 py-[5px] text-[14px] font-medium disabled:cursor-none disabled:opacity-50 mb-[10px]">
              {timer === 0 ? '00:00' : `00:${timer < 10 ? '0' : ''}${timer}`}
            </div>
          )}
          <>
            <span
              className={`flex justify-center bg-transparent text-gray2 w-full rounded-md px-1 text-[14px] font-medium ${
                isButtonDisabled ? 'disabled:cursor-none opacity-50' : ''
              }`}
            >
              Don't receive the code?
            </span>
            <button
              className={`flex cursor-default justify-center bg-transparent text-primaryBlue w-full rounded-md px-1 py-[5px] text-[14px] font-medium hover:opacity-90 ${
                isButtonDisabled ? 'disabled:cursor-none disabled:opacity-50' : ''
              }`}
              disabled={isButtonDisabled}
            >
              <span
                className={!isButtonDisabled ? 'cursor-pointer' : 'cursor-default '}
                onClick={(e) => handleResendOtpMail(e)}
              >
                Resend code
              </span>
            </button>
          </>
          {/* <div className="flex justify-center bg-transparent text-primaryBlue w-full rounded-md px-1 py-[5px] text-[14px] font-medium hover:opacity-90 disabled:cursor-none disabled:opacity-50">
            <span className="cursor-pointer" onClick={(e) => handleResendOtpMail(e)}>
              Resend code
            </span>
          </div> */}
          <button
            className={`w-full rounded-md bg-primaryBlue mt-[12px] px-1 py-[16px] focus:outline-none text-[16px] font-[700] text-white hover:opacity-90 disabled:bg-lightblue5 disabled:cursor-none disabled:opacity-50 ${
              inputValue.otp?.length !== 6 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={(e) => otpVerificationMail(e)}
            disabled={inputValue.otp?.length !== 6}
          >
            {isLoading ? (
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              'Continue'
            )}
          </button>
        </>
        {/* )} */}
      </div>
    </>
  );
};
export default OTPVerification;
