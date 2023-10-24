import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import Logo from '../utils/Header/ResalaLogo.svg';
import Logo from '../utils/Header/ResLogo.svg';
import GoogleIcon from '../utils/Account/Icons/GoogleIcon.svg';
import MicrosoftIcon from '../utils/Account/Icons/MicrosoftIcon.svg';
import AppleIcon from '../utils/Account/Icons/AppleIcon.svg';
import InputField from '../Components/InputField';
import { emailCheck, passwordCheck } from '../utils/validation';
import { emailChecking, login } from '../redux/reducers/authSlice/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, setToken } from '../utils/localstorage';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { newChat } from '../redux/reducers/chatSlice/ChatSlice';
import Toast from '../utils/toast';
import EyeClose from '../utils/Account/Icons/EyeClose.svg';
import EyeOpen from '../utils/Account/Icons/Eye.svg';
import SocialLogin from '../Components/SocialLogin';
import InforCircleIcon from '../utils/Account/Icons/info-circle.svg';
import SelectMobileNumber from '../Components/PhoneNumberInput/SelectMobileNumber';
import Close from '../utils/Header/Close-1.svg';
import { handleToggle } from '../redux/reducers/extension/extension-slice';

export default function Login({ isLogin, setIsLogin, setActiveTab }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isValidUser, setIsValidUser] = useState(false);
  const [inputValue, setInputValue] = useState({ email: '', password: '' });
  const [isRegistered, setIsRegistered] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSecondStep, setIsSecondStep] = useState(false);
  const { status, isLoading } = useSelector((state) => state.auth);
  const [invalidCred, setInvalidCred] = useState('');
  const [invalidCredTime, setInvalidCredTime] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: name === 'email' ? value.toString().trim() : value
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
    let errors;

    // Check email validity
    errors = emailCheck(inputValue);
    if (Object.keys(errors)?.length) {
      setErrors(errors);
      return;
    }

    if (!isSecondStep) {
      // If it's the first step, only check email
      const res = await dispatch(emailChecking({ email: inputValue.email }));
      if (res.payload?.response?.status === 400) {
        setInvalidCred(res?.payload?.response?.data?.Message);
        // setTimeout(()=>{},4000)
      }

      if(res.payload?.Error){
        setErrors({ email : res.payload?.Message});
      }

      if (res.payload?.status === 200) {
        setInvalidCred('');
        setIsRegistered(true);
        setDisabled(true);
        setIsSecondStep(true); // Move to the second step
      }
    } else {
      // If it's the second step, check password and login
      errors = passwordCheck(inputValue);
      if (Object.keys(errors)?.length) {
        setErrors(errors);
        return;
      }

      const payload = {
        email: inputValue.email,
        password: inputValue.password,
      };
      const res = await dispatch(login(payload));

      if (res.payload?.response?.status === 400) {
        setInvalidCred(res?.payload?.response?.data?.Message);
      }
      if (res.payload.status === 200) {
        setInvalidCred('');

        try {
            var token = "Bearer "+res.payload?.data?.Result?.access_token;
            chrome.storage.sync.set({ "userAccessToken": token }, function () {});

            // access token from the chrome storage
          // chrome.storage.sync.get(["userAccessToken"], function (items) {
          //   console.log("userAccessToken : ", items);
          // });

          dispatch(newChat());
          navigate('/');
        } catch (error) {
          console.log(error);
        }

        // chrome.storage.local.set({ "userAccessToken": "Piyush" }).then((result) => {
        //   console.log("Value is set",result);

        //   chrome.storage.local.get('userAccessToken', function (result) {

        //     alert(result.channels);
        //   });
        // });
        //   if (re?.payload?.status == 200) {

        //     chrome.storage.local.get("userAccessToken", function (value) {
        //       console.log("userAccessToken : ", value); // 1
        //     });


        //     console.log("Called after navigate");
        //   }
        // });
        // console.log("Token : ",res.payload?.data?.Result?.access_token);
        // chrome.storage.local.set({ loginToken: JSON.stringify(`Bearer ${res.payload?.data?.Result?.access_token}`) });
        // navigate('/');
        // dispatch(newChat());
        // console.log("Called after navigate");

        //   localStorage.setItem('userAccessToken', `Bearer ${res.payload?.data?.Result?.access_token}`);

        // Promise.resolve().then(() => {
        //   const userToken = getToken();
        //   console.log({userToken});
        //   if (userToken) {
        //     dispatch(newChat());
        //     navigate('/');
        //   }
        // });
      }
    }
    // setIsRegistered(false);
  };

  const handleSignUp = () => {
    localStorage.removeItem('userAccessToken');
    sessionStorage.removeItem('chatId');
    navigate('/signup');
  };

  const handleClose = () => {
    console.log("dklsdjdskl");
    dispatch(handleToggle(false));
    console.log('remove extension width');
    document.getElementById('resala_style_right_space') ?document.getElementById('resala_style_right_space').remove() : ''

    // document.querySelectorAll('[style="margin-right: 500px;"]')[0] ? document.querySelectorAll('[style="margin-right: 500px;"]')[0].style = 'position: relative;' : '';
    // document.getElementsByClassName('MAINBODY')[0].style = 'display: none;';
    // document.body.style.width = '100%';
  };

  return (
    <>
      <div
        style={{ position: 'sticky', top: 0 ,borderLeft:'none' }}
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
          <div className="text-darkgray text-[18px] font-Poppins font-medium">Resala</div>
        </div> */}
        <div className="text-[22px] flex justify-center mb-[40px] font-bold text-[#19224C]">
          {!isSecondStep ? 'Welcome Back' : 'Enter your password'} 
        </div>
        <div className="flex justify-center flex-col gap-2">
          <form onSubmit={handleSubmit}>
            <InputField
              className={`block w-full rounded-md border border-gray px-7 py-[16px] mb-[12px] text-[14px] text-[#6D77A0] placeholder:text-[#6D77A0] ${isSecondStep ? 'bg-[#FFFFFF]' :''}` }
              name="email"
              label="Email Address"
              type="email"
              placeholder=" "
              handleChange={(e) => handleChange(e)}
              disabled={isSecondStep}
              setIsRegistered={setIsRegistered}
              setIsSecondStep={setIsSecondStep}
              isRegistered={isRegistered}
              value={inputValue.email}
            />
            {/* {errors.email && <p className="text-red text-[12px]">{errors.email}</p>} */}
            {errors.email && (
              <div className="bg-red1 mt-[4px] mb-[16px] rounded-md">
                <div className="flex gap-2 items-center py-[12px] px-[10px]">
                  <img src={InforCircleIcon} className="" />
                  <span className="text-[12px] text-red">{errors.email}</span>
                </div>
              </div>
            )}
            {!isSecondStep && invalidCred && !isLoading && !isRegistered && (
              <div className="bg-red1 mt-[4px] mb-[16px] rounded-md">
                <div className="flex gap-2 items-center py-[12px] px-[10px]">
                  <img src={InforCircleIcon} className="" />
                  <span className="text-[12px] text-red">{invalidCred}</span>
                </div>
              </div>
            )}
            {isRegistered && inputValue.email && (
              <div className="relative">
                <InputField
                  isFixedLabel
                  className="block w-full rounded-md border border-gray mt-[4px] pl-[15px] pr-[47px] py-[16px] text-[14px] mb-[12px] text-[#6D77A0] placeholder:text-[#6D77A0]"
                  name="password"
                  label="Password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder=" "
                  // isvisible={true}
                  handleChange={(e) => handleChange(e)}
                  value={inputValue.password}
                // isLoading={isLoading}
                />
                <div
                  className="absolute right-[15px] top-[15px] cursor-pointer"
                  onClick={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                  }}
                >
                  <img className="" src={isPasswordVisible ? EyeClose : EyeOpen} alt="EyeOpen" />
                </div>

                {errors.password && <p className="text-red text-[12px]">{errors.password}</p>}
                {invalidCred && !isLoading && isRegistered && (
                  <div className="bg-red1 mt-[4px] mb-[16px] rounded-md">
                    <div className="flex gap-2 items-center py-[12px] px-[10px]">
                      <img src={InforCircleIcon} className="" />
                      <span className="text-[12px] text-red">{invalidCred}</span>
                    </div>
                  </div>
                )}
                {/* <div
                  type="button"
                  className="flex justify-center bg-transparent text-primaryBlue w-full mb-[24px] rounded-md px-1 py-[5px] text-[14px] font-medium hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                > */}
                <button
                  type="button"
                  className={`flex justify-center bg-transparent text-[#046AF3] w-full mb-[24px] rounded-md px-1 py-[5px] text-[14px] font-[400] hover:opacity-90 disabled:opacity-50  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  style={{ cursor: 'unset' }}
                  disabled={isLoading}
                >
                  <span className={`${isLoading ? '' : 'cursor-pointer'}`} onClick={() => navigate('/forgetpassword')}>
                    Forgot password?
                  </span>
                </button>
                {/* </div> */}
              </div>
            )}

            <div className="col-span-full mb-[15px]">
              <div className="flex gap-2 items-center">
                <button
                  className={`w-full h-[52px] rounded-md bg-[#1678F2] px-1 py-[16px] text-[16px] font-[700] text-white hover:opacity-90 focus:outline-none disabled:cursor-none disabled:opacity-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  type="submit"
                  disabled={isLoading}
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
        </div>
        <div className="flex justify-center items-center gap-1 mt-[10px] text-[14px]">
          <span className="text-gray2 font-[500]">Don't have account?</span>
          <button
            className={`text-primaryBlue ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} font-[700]`}
            onClick={handleSignUp}
            disabled={isLoading}
          >
            Sign up
          </button>
        </div>
        {!isRegistered && <SocialLogin />}
      </div>
    </>
  );
}
