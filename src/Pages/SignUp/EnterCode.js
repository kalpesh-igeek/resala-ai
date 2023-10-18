import React, { useEffect, useState } from 'react';
import Logo from '../../utils/Header/ResLogo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../Components/InputField';
import { useDispatch } from 'react-redux';
import { otpVerification, sendOtpSMS, userDetails } from '../../redux/reducers/authSlice/AuthSlice';
import SubHeader from '../../Layout/SubHeader';

const EnterCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { phone, register } = state; // Read values passed on state

  const [otpInput, setOtpInput] = useState({
    otp: 0,
    country_code: phone.country_code,
    phone_number: phone.phone_number,
  });
  const [isLoading, setLoading] = useState(false);

  const [timer, setTimer] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const otp = value.replace(/\s/g, '');
    const formattedOtp = otp.replace(/\D/g, '').replace(/(\d{3})(?=\d)/g, '$1 ');
    // console.log('formattedOtp', formattedOtp);

    const formattedValue = value.replace(/\D/g, '');

    // Check if the input is a number
    if (!isNaN(formattedValue)) {
      setOtpInput({
        ...otpInput,
        [name]: formattedValue,
      });
    }
  };
  useEffect(() => {
    // Check if OTP input is a 6-digit number
    if (otpInput.otp.toString()?.length === 6) {
      const verifyOTP = async () => {
        try {
          setLoading(true); // Start loading
        //   let payload = {
        //     otp: "653359",
        //     country_code: "+91",
        //     phone_number: "+918758260598"
        // }
          const res = await dispatch(otpVerification({...otpInput , phone_number: otpInput.phone_number.toString().split(otpInput.country_code)[1] })); // Dispatch API call
          if (res.payload.status === 200) {
            navigate('/successful', { state: { signUpData: phone } }); // Navigate on success
          } else {
            // Handle error
            console.error('OTP verification failed:', res);
          }
        } catch (error) {
          console.error('Error verifying OTP:', error);
        } finally {
          setLoading(false); // Turn off loading
        }
      };

      verifyOTP();
    }
  }, [otpInput.otp, dispatch, navigate]);

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

  const handleResendOtp = async (e) => {
    setIsButtonDisabled(true); // Disable button immediately after click

    const payload = {
      is_whatapp: phone.is_whatapp,
      phone_number: phone.phone_number.toString().split(phone.country_code)[1],
      country_code: phone.country_code,
    };
    const res = await dispatch(sendOtpSMS(payload));
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate('/successful')
  //   }, 5000);
  // }, [])

  return (
    <>
    <SubHeader></SubHeader>
      <div
        className="px-[15px] py-[15px] text-[14px] font-bold text-primaryBlue cursor-pointer"
        onClick={() => navigate('/mobileverification', { state: { register: register } })}
      >
        Go Back
      </div>
      <div className="py-[68px] px-[75px] flex flex-col justify-center">
        {/* <div className="flex items-center justify-center gap-2 mb-[50px]">
          <img src={Logo} alt="logo" className="cursor-pointer h-[32px] w-[32px]" />
          <div className="text-darkgray text-[18px]">Resala</div>
        </div> */}
        <div className="text-[22px] flex justify-center mb-[8px] font-bold text-[#19224C]">Enter the code</div>
        <div className="flex justify-center px-[10px] text-center text-gray2 mb-[48px] flex-col text-[12px] gap-2">
          Please enter the code we just sent you.
        </div>
        <InputField
          className="text-center block w-full rounded-md border border-gray px-[15px] py-[16px] mb-[12px] text-[14px] text-darkBlue placeholder:text-gray1"
          name="otp"
          label=""
          type="text"
          // pattern="\d{3}\s?\d{3}"
          placeholder="000 000"
          handleChange={(e) => handleChange(e)}
          displayValue={otpInput}
        />
        {isLoading && (
          <div class="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {/* Show loader if loading */}
        {timer !== 0 && (
          <div className="flex justify-center bg-transparent text-primaryBlue w-full rounded-md px-1 py-[5px] text-[14px] font-medium disabled:cursor-none disabled:opacity-50 mb-[10px]">
            {timer === 0 ? '00:00' : `00:${timer < 10 ? '0' : ''}${timer}`}
          </div>
        )}
        <span
          className={`flex justify-center bg-transparent text-gray2 w-full rounded-md px-1 text-[14px] font-medium ${
            isButtonDisabled ? 'disabled:cursor-none opacity-50' : ''
          }`}
        >
          Don't receive the code?
        </span>
        <button
          className={`flex cursor-default justify-center bg-transparent text-[#1678F2] w-full rounded-md px-1 py-[5px] text-[14px] font-[700] hover:opacity-90 ${
            isButtonDisabled ? 'disabled:cursor-none disabled:opacity-50' : ''
          }`}
          disabled={isButtonDisabled}
        >
          <span
            className={!isButtonDisabled ? 'cursor-pointer' : 'cursor-default '}
            onClick={(e) => handleResendOtp(e)}
          >
            Resend code
          </span>
        </button>
      </div>
    </>
  );
};
export default EnterCode;
