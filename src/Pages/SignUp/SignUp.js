import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../utils/Header/ResalaLogo.svg';
import GoogleIcon from '../../utils/Account/Icons/GoogleIcon.svg';
import InputField from '../../Components/InputField';
import MicrosoftIcon from '../../utils/Account/Icons/MicrosoftIcon.svg';
import AppleIcon from '../../utils/Account/Icons/AppleIcon.svg';
import { emailCheck, passwordCheck } from '../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { checkMail, userDetails } from '../../redux/reducers/authSlice/AuthSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, hasPassword } = useSelector((state) => state.auth);

  const [isValidCaptch, setIsValidCaptch] = useState(false);
  const [inputValue, setInputValue] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleCaptch = () => {
    setIsValidCaptch(true);
  };
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    var errors;

    errors = emailCheck(inputValue);
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    const res = await dispatch(checkMail({ email: inputValue.email }));
    if (!res.payload) {
      return;
    }
    if (res.payload.status === 200) {
      const payload = {
        email: inputValue.email,
        password: inputValue.password,
      };
      errors = passwordCheck(inputValue);
      if (Object.keys(errors).length) {
        setErrors(errors);
        return;
      }
      if (inputValue.password) {
        await dispatch(userDetails(payload));
        if (res.payload.status === 200 && hasPassword) {
          navigate('/registerdetails', { state: { payload: payload } });
        }
      }
    }
  };
  return (
    <>
      <div className="py-[90px] px-[75px] flex flex-col justify-center">
        <div className="flex items-center justify-center gap-2 mb-[50px]">
          <img src={Logo} alt="logo" className="cursor-pointer h-[32px] w-[32px]" />
          <div className="text-darkgray text-[18px]">Resala.ai</div>
        </div>
        <div className="text-[22px] flex justify-center mb-[8px] font-bold">Create your account</div>
        <div className="flex justify-center px-[10px] text-center text-gray2 mb-[48px] flex-col text-[12px] gap-2">
          Phone verification may be required for signup. Your number will only be used to verify your identity for
          security purposes.
        </div>
        <div className="flex justify-center flex-col gap-2">
          <form onSubmit={handleSubmit}>
            <InputField
              className="block w-full rounded-md border border-gray px-[15px] py-[16px] mb-[12px] text-[14px] text-darkBlue placeholder:text-gray1"
              name="email"
              label="Email Address"
              type="email"
              placeholder="example@gmail.com"
              handleChange={(e) => handleChange(e)}
            />
            {errors.email && <p className="text-red text-[12px]">{errors.email}</p>}
            {isValidCaptch && status === 200 ? (
              <>
                <InputField
                  className="block w-full rounded-md border border-gray mt-[4px] px-[15px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray1"
                  name="password"
                  label="Password"
                  type="password"
                  isvisible={true}
                  placeholder="Password"
                  handleChange={(e) => handleChange(e)}
                />
                {errors.password && <p className="text-red text-[12px]">{errors.password}</p>}
              </>
            ) : (
              <div className="px-[15px] mt-[12px] py-[18px] bg-lightblue1 rounded-[6px]">
                <div class="flex items-center">
                  <input required type="checkbox" value="" onChange={handleCaptch} />
                  <label for="link-checkbox" class="ml-2 text-sm font-medium text-primaryBlue">
                    I’m not robot
                  </label>
                </div>
              </div>
            )}
            <div className="col-span-full mt-[12px]">
              <div className="flex gap-2 items-center">
                <button
                  className="w-full rounded-md bg-primaryBlue px-1 py-[16px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                  type="submit"
                  //   onClick={(e) => handleSubmit(e)}
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
          <div className="flex justify-center items-center gap-1 mt-[24px]">
            <span>Already have an account?</span>
            <button className="text-primaryBlue" onClick={() => navigate('/login')}>
              Log In
            </button>
          </div>
          <div className="flex justify-center relative items-center gap-1 mt-[24px]">
            <span className="bg-white uppercase px-[10px] z-10">Or</span>
            <span className="bg-gray h-[1px] absolute w-full"></span>
          </div>
          <div className="flex flex-col relative items-center gap-[12px] mt-[24px]">
            <div className="w-full flex gap-2 items-center">
              <button className="flex items-center gap-2 w-full text-left rounded-md bg-white px-3 py-[14px] text-[14px] text-gray2 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50">
                <img src={GoogleIcon} />
                Continue with Google
              </button>
            </div>
            <div className="w-full flex gap-2 items-center">
              <button className="flex items-center gap-2 w-full text-left rounded-md bg-white px-3 py-[14px] text-[14px] text-gray2 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50">
                <img src={MicrosoftIcon} />
                Continue with Microsoft Account
              </button>
            </div>
            <div className="w-full flex gap-2 items-center">
              <button className="flex items-center gap-2 w-full text-left rounded-md bg-white px-3 py-[14px] text-[14px] text-gray2 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50">
                <img src={AppleIcon} />
                Continue with Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
