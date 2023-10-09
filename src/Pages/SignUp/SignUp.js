import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../utils/Header/ResLogo.svg';

import InputField from '../../Components/InputField';

import { emailCheck, passwordCheck } from '../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { checkMail, userDetails } from '../../redux/reducers/authSlice/AuthSlice';
import SocialLogin from '../../Components/SocialLogin';
import PasswordRequirements from '../../Components/PasswordRequirement';
import InforCircleIcon from '../../utils/Account/Icons/info-circle.svg';
import Close from '../../utils/Header/Close-1.svg';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hasPassword, isLoading } = useSelector((state) => state.auth);

  const [isValidCaptch, setIsValidCaptch] = useState(false);
  const [inputValue, setInputValue] = useState({ email: '', password: '' });
  const [isRegistered, setIsRegistered] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [invalidCred, setInvalidCred] = useState('');

  const handleCaptch = () => {
    setIsValidCaptch(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });

    if (name === 'password') {
      setPasswordRequirements({
        minLength: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value),
      });
    }

    // Check if all password requirements are fulfilled
    // const allRequirementsMet = Object.values(passwordRequirements).every((requirement) => requirement);

    // setPasswordRequirements(passwordRequirements);
    // setIsPasswordValid(allRequirementsMet); // set isPasswordValid

    if (errors[name]) {
      setErrors((error) => {
        let errorNew = { ...error };
        delete errorNew[name];
        return errorNew;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var errors;

    errors = emailCheck(inputValue);
    if (Object.keys(errors)?.length) {
      setErrors(errors);
      return;
    }

    const res = await dispatch(checkMail({ email: inputValue.email }));
    if (!res.payload) {
      return;
    }
    if (res.payload?.response?.status === 400) {
      setInvalidCred(res?.payload?.response?.data?.Message);
    }
    if (res.payload.status === 200) {
      setIsEmailChecked(true);

      setIsRegistered(true);
      const payload = {
        email: inputValue.email,
        password: inputValue.password,
      };
      if (!isEmailChecked) {
        return;
      }
      if (inputValue.password) {
        await dispatch(userDetails(payload));
        if (res.payload.status === 200 && hasPassword) {
          setIsEmailChecked(false);
          navigate('/registerdetails', { state: { payload: payload } });
        }
      }
    }
    // setIsRegistered(false);
  };

  const handleClose = () => {
    document.querySelectorAll('[style="margin-right: 500px;"]')[0].style = 'position: relative;';
    document.getElementsByClassName('MAINBODY')[0].style = 'display: none;';
    document.body.style.width = '100%'
  };

  console.log('isRegistered', isRegistered);
  return (
    <>
      <div
        style={{ position: 'sticky', top: 0 }}
        className="flex items-center justify-between px-[20px] py-[11px] border-b-gray border-b-[1px] border-l-gray border-l-[1px] bg-white relative z-[70] font-dmsans"
      >
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="cursor-pointer h-[34px] w-[34px]" onClick={() => navigate('/')} />
          <div className="text-darkgray text-[20px] font-Poppins font-medium">Resala</div>
          <div className="flex gap-1 items-center justify-center w-full rounded-full border border-primaryBlue bg-white font-medium text-primaryBlue ">
            <div className="text-[10px] beta">Beta</div>
          </div>
        </div>

        <div className="flex items-center">
          <div>
            <img
              className="extensionCloseIcon cursor-pointer h-[31px] w-[31px]"
              src={Close}
              alt="Close"
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
      <div className="py-[100px] px-[75px] flex flex-col justify-center">
        {/* <div className="flex items-center justify-center gap-2 mb-[50px]">
          <img src={Logo} alt="logo" className="cursor-pointer h-[32px] w-[32px]" />
          <div className="text-darkgray text-[18px]">Resala</div>
        </div> */}
        <div
          className={
            !isRegistered
              ? 'text-[22px] flex justify-center mb-[8px] font-bold'
              : 'text-[22px] flex justify-center mb-[40px] font-bold'
          }
        >
          Create your account
        </div>
        {!isRegistered && (
          <div className="flex justify-center px-[10px] text-center text-gray2 mb-[48px] flex-col text-[12px] gap-2">
            Phone verification may be required for signup. Your number will only be used to verify your identity for
            security purposes.
          </div>
        )}
        <div className="flex justify-center flex-col gap-2">
          <form onSubmit={handleSubmit}>
            <InputField
              className="block w-full rounded-md border border-gray px-7 py-[16px] mb-[12px] text-[14px] text-darkBlue placeholder:text-gray1"
              name="email"
              label="Email Address"
              type="email"
              placeholder=""
              disabled={isRegistered}
              handleChange={(e) => handleChange(e)}
              isRegistered={isRegistered}
              setIsRegistered={setIsRegistered}
              setIsSecondStep={setIsEmailChecked}
              value={inputValue.email}
            />
            {errors.email && <p className="text-red text-[12px]">{errors.email}</p>}
            {isValidCaptch && isRegistered && inputValue.email ? (
              <>
                <InputField
                  className="block w-full rounded-md border border-gray mt-[4px] pl-[15px] pr-[47px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray1"
                  name="password"
                  label="Password"
                  type="password"
                  isvisible={true}
                  placeholder=" "
                  handleChange={(e) => handleChange(e)}
                  value={inputValue.password}
                />
                {errors.password && <p className="text-red text-[12px]">{errors.password}</p>}
                <PasswordRequirements require={passwordRequirements} />
              </>
            ) : (
              <div className="px-[15px] mt-[12px] py-[18px] bg-lightblue1 rounded-[6px]">
                <div class="flex items-center">
                  <input className="cursor-pointer" required type="checkbox" value="" onChange={handleCaptch} />
                  <label for="link-checkbox" class="ml-2 text-sm font-medium text-primaryBlue">
                    I’m not robot
                  </label>
                </div>
              </div>
            )}
            {invalidCred && !isLoading && (
              <div className="bg-red1 mt-[4px] mb-[16px] rounded-md">
                <div className="flex gap-2 items-center py-[12px] px-[10px]">
                  <img src={InforCircleIcon} className="" />
                  <span className="text-[12px] text-red">{invalidCred}</span>
                </div>
              </div>
            )}
            <div className="col-span-full mt-[16px]">
              <div className="flex gap-2 items-center">
                <button
                  className={`w-full rounded-md focus:outline-none bg-primaryBlue px-1 py-[16px] text-[12px] font-medium text-white hover:opacity-90 focus:outline-none disable:bg-lightblue5 disabled:cursor-none disabled:opacity-50 ${
                    isLoading ? 'opacity-50 bg-lightblue5  cursor-not-allowed' : ''
                  }`}
                  type="submit"
                  //   onClick={(e) => handleSubmit(e)}
                  disabled={
                    isLoading ||
                    (isRegistered &&
                      (!passwordRequirements.minLength ||
                        !passwordRequirements.uppercase ||
                        !passwordRequirements.lowercase ||
                        !passwordRequirements.number ||
                        !passwordRequirements.specialChar))
                  }
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
              </div>
            </div>
          </form>
          <div className="flex justify-center items-center gap-1 mt-[24px] text-[14px]">
            <span className="text-gray2">Already have an account?</span>
            <button
              className={`text-primaryBlue ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => navigate('/login')}
              disabled={isLoading}
            >
              Log In
            </button>
          </div>
          {!isRegistered && <SocialLogin />}
        </div>
      </div>
    </>
  );
};

export default SignUp;
