import React, { useDebugValue } from 'react';
import SuccessIcon from '../../utils/Account/Icons/SuccessIcon.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/reducers/authSlice/AuthSlice';
import { getToken, setToken } from '../../utils/localstorage';
import { newChat } from '../../redux/reducers/chatSlice/ChatSlice';

const Successful = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { signUpData } = state; // Read values passed on state

  const handleSignUp = async (e) => {
    e.preventDefault();
    const res = await dispatch(signUp(signUpData));
    if (res.payload?.status === 200) {
      setToken(res.payload?.Result?.access_token);
      // const userToken = getToken();
      // console.log('userToken', userToken);
      // if (userToken) {
      //   await dispatch(newChat());
      //   navigate('/');
      // }
      Promise.resolve().then(() => {
        const userToken = getToken();
        if (userToken) {
          // Now we are sure that the token is updated in local storage
          dispatch(newChat());
          navigate('/');
        }
      });
    }
  };

  return (
    <div className="py-[90px] px-[75px] flex flex-col justify-center">
      <div className="flex items-center justify-center gap-2 mb-[50px]">
        <img src={SuccessIcon} alt="SuccessIcon" className="cursor-pointer h-[64px] w-[64px]" />
      </div>
      <div className="text-[22px] flex justify-center mb-[8px] font-bold">Welcome to Resala</div>
      <div className="flex justify-center px-[10px] text-center text-gray2 mb-[48px] flex-col text-[12px] gap-2">
        You’ve logged in to Resala
      </div>
      <button
        className="w-full focus:outline-none rounded-md bg-primaryBlue px-1 py-[16px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
        onClick={(e) => handleSignUp(e)}
      >
        Continue Using
      </button>
    </div>
  );
};
export default Successful;
