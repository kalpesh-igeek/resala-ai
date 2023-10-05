import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../utils/Header/ResLogo.svg';
import InputField from '../../Components/InputField';
import EyeOpen from "../../utils/Account/Icons/Eye.svg"
import { forgotPassword } from '../../redux/reducers/authSlice/AuthSlice';
import { resetPasswordCheck } from '../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import PasswordRequirements from '../../Components/PasswordRequirement';

const EnterNewPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const { email } = state; // Read values passed on state

  const [inputValue, setInputValue] = useState({ password: '', re_password: '' });
  const [errors, setErrors] = useState({});
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

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
    if (name === 'password' || name === 're_password') {
      setPasswordRequirements({
        minLength: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var errors;
    errors = resetPasswordCheck(inputValue);
    if (Object.keys(errors)?.length) {
      setErrors(errors);
      return;
    }
    const payload = {
      password: inputValue.password,
      re_password: inputValue.re_password,
      email: email.email,
    };
    const res = await dispatch(forgotPassword(payload));

    if (!res?.payload) {
      return;
    }
    if (res.payload.status === 200) {
      // const res = await dispatch(forgotPasswordDetails(inputValue));
      navigate('/passwordchanged');
    }
  };
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     navigate('/passwordchanged');
  //   };

  return (
    <>
      <div className="py-[90px] px-[75px] flex flex-col justify-center">
        <div className="flex items-center justify-center gap-2 mb-[50px]">
          <img src={Logo} alt="logo" className="cursor-pointer h-32px] w-[32px]" />
          <div className="text-darkgray text-[18px]">Resala</div>
        </div>
        <div className="text-[22px] flex justify-center mb-[40px] font-bold">Reset your password</div>

        <div className="flex justify-center flex-col gap-2">
          <form onSubmit={handleSubmit}>
            <InputField
              className="block w-full rounded-md border border-gray mt-[4px] pl-[15px] pr-[47px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray1"
              name="password"
              label="New password"
              type="password"
              isvisible={true}
              placeholder=""
              handleChange={(e) => handleChange(e)}
              value={inputValue?.password}
            />
            {errors.password && <p className="text-red text-[12px] mb-[10px]">{errors.password}</p>}
            <InputField
              className="block w-full rounded-md border border-gray mt-[4px] pl-[15px] pr-[47px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray1"
              name="re_password"
              label="Re-enter new password"
              type="password"
              isvisible={true}
              placeholder=""
              handleChange={(e) => handleChange(e)}
              value={inputValue?.re_password}
            />
            {errors.re_password && <p className="text-red text-[12px] mb-[5px]">{errors.re_password}</p>}
            <PasswordRequirements require={passwordRequirements} />

            <div className="col-span-full mt-[16px]">
              <div className="flex gap-2 items-center">
                <button
                  className="w-full rounded-md bg-primaryBlue px-1 py-[16px] focus:outline-none text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                  type="submit"
                  //   onClick={(e) => handleSubmit(e)}
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
          <div className="flex justify-center items-center text-gray2 gap-1 mt-[23px] text-[14px]">
            <span className="text-gray2">Don’t have account?</span>
            <button className="text-primaryBlue font-bold" onClick={() => navigate('/login')}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default EnterNewPassword;
