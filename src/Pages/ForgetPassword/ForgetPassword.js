import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../utils/Header/ResLogo.svg';
import InputField from '../../Components/InputField';
import { forgotPasswordDetails, sendOtpMail } from '../../redux/reducers/authSlice/AuthSlice';
import { emailCheck } from '../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import SubHeader from '../../Layout/SubHeader';
import InforCircleIcon from '../../utils/Account/Icons/info-circle.svg';


const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [inputValue, setInputValue] = useState({ email: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value.toString().trim(),
    });
    if (errors[name])
      setErrors((error) => {
        let errorNew = { ...error };
        delete errorNew[name];
        return errorNew;
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var errors;
    errors = emailCheck(inputValue);
    if (Object.keys(errors)?.length) {
      setErrors(errors);
      return;
    }
    const res = await dispatch(sendOtpMail(inputValue));
    if (!res.payload) {
      return;
    }

    if(res.payload?.Error){
      setErrors({ email : res.payload?.Message});
    }

    if (res.payload.status === 200) {
      const res = await dispatch(forgotPasswordDetails(inputValue));
      navigate('/otpverification', { state: { userEmail: res?.payload } });
    }
  };

  //   const handleSubmit = () => {
  //     navigate('/otpverification');
  //   };

  return (
    <>
    <SubHeader></SubHeader>
      <div className="py-[90px] px-[75px] flex flex-col justify-center">
        {/* <div className="flex items-center justify-center gap-2 mb-[50px]">
          <img src={Logo} alt="logo" className="cursor-pointer h-[32px] w-[32px]" />
          <div className="text-darkgray text-[18px]">Resala</div>
        </div> */}
        <div className="text-[22px] flex justify-center mb-[8px] font-bold text-[#19224C]">Reset your password</div>
        <div className="flex justify-center px-[10px] text-center text-gray2 mb-[40px] flex-col text-[12px] gap-2">
          Enter your email address and we will send you instructions to reset your password.
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center flex-col">
            <InputField
              className="block w-full rounded-md border border-gray px-[15px] py-[16px] mb-[10px] text-[14px] text-[#6D77A0] placeholder:text-[#6D77A0]"
              name="email"
              label="Email Address"
              type="email"
              placeholder=" "
              handleChange={(e) => handleChange(e)}
              value={inputValue?.email}
            />
            {errors.email && 
            // <p className="text-red text-[12px] mb-[5px]">{errors.email}</p>
            <div className="bg-red1 mt-[4px] mb-[16px] rounded-md">
                <div className="flex gap-2 items-center py-[12px] px-[10px]">
                  <img src={InforCircleIcon} className="" />
                  <span className="text-[12px] text-red">{errors.email}</span>
                </div>
              </div>
            }
          </div>
          <div className="col-span-full">
            <div className="flex gap-2 items-center">
              <button
                className="w-full rounded-md bg-primaryBlue focus:outline-none px-1 py-[16px] text-[16px] font-[700] text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                type="submit"
                // onClick={(e) => handleSubmit(e)}
              >
                {isLoading ? (
                  <div>
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
                  </div>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
            <button
              className={`bg-transparent text-gray2 w-full rounded-md px-1 py-[16px] text-[14px] font-medium hover:opacity-90 disabled:cursor-none disabled:opacity-50 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              type="button"
              style={{ cursor: 'unset' }}
              disabled={isLoading}
            >
              <span className="cursor-pointer" onClick={(e) => navigate('/login')}>
                Go Back
              </span>
            </button>
            {/* <button
              type="button"
              className={`flex justify-center bg-transparent text-primaryBlue w-full mb-[24px] rounded-md px-1 py-[5px] text-[14px] font-medium hover:opacity-90 disabled:opacity-50  ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{ cursor: 'unset' }}
              disabled={isLoading}
            >
              <span className={`${isLoading ? '' : 'cursor-pointer'}`} onClick={() => navigate('/forgetpassword')}>
                Forgot password?
              </span>
            </button> */}
          </div>
        </form>
      </div>
    </>
  );
};
export default ForgetPassword;
