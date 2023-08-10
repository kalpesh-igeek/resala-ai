import React, { useEffect, useState } from 'react';
import Logo from '../../utils/Header/ResalaLogo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../Components/InputField';
import { useDispatch } from 'react-redux';
import { otpVerification, userDetails } from '../../redux/reducers/authSlice/AuthSlice';

const EnterCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { phone } = state; // Read values passed on state

  const [otpInput, setOtpInput] = useState({
    otp: 0,
    country_code: phone.country_code,
    phone_number: phone.phone_number,
  });
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtpInput({
      ...otpInput,
      [name]: parseInt(value),
    });
  };
  console.log('otpInput', otpInput);
  console.log('otpInput.otp.length === 6', otpInput.otp.length);
  console.log('otpInput.otp.toString().length', otpInput.otp.toString().length);
  useEffect(() => {
    // Check if OTP input is a 6-digit number
    if (otpInput.otp.toString().length === 6) {
      const verifyOTP = async () => {
        try {
          setLoading(true); // Start loading
          const res = await dispatch(otpVerification(otpInput)); // Dispatch API call
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate('/successful')
  //   }, 5000);
  // }, [])

  return (
    <div className="py-[90px] px-[75px] flex flex-col justify-center">
      <div className="flex items-center justify-center gap-2 mb-[50px]">
        <img src={Logo} alt="logo" className="cursor-pointer h-[32px] w-[32px]" />
        <div className="text-darkgray text-[18px]">Resala.ai</div>
      </div>
      <div className="text-[22px] flex justify-center mb-[8px] font-bold">Enter the code</div>
      <div className="flex justify-center px-[10px] text-center text-gray2 mb-[48px] flex-col text-[12px] gap-2">
        Please enter the code we just sent you.
      </div>
      <InputField
        className="text-center block w-full rounded-md border border-gray px-[15px] py-[16px] mb-[12px] text-[14px] text-darkBlue placeholder:text-gray1"
        name="otp"
        label=""
        type="number"
        placeholder="000 000"
        handleChange={(e) => handleChange(e)}
      />
      {isLoading && <div>Loading...</div>} {/* Show loader if loading */}
      <button
        className="bg-transparent text-primaryBlue w-full rounded-md px-1 py-[5px] text-[14px] font-medium hover:opacity-90 disabled:cursor-none disabled:opacity-50"
        // onClick={() => handleSMSbutton()}
      >
        Resend code
      </button>
    </div>
  );
};
export default EnterCode;
