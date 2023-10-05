import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FlashIcon from '../../utils/Account/Profile/FlashIcon.svg';
import AddIcon from '../../utils/Account/Profile/AddIcon.svg';
import BookIcon from '../../utils/Account/Profile/BookIcon.svg';
import YoutubeIcon from '../../utils/Account/Profile/YoutubeIcon.svg';
import BillingIcon from '../../utils/Account/Profile/BillingIcon.svg';
import QuestionIcon from '../../utils/Account/Profile/QuestionIcon.svg';
import LogoutIcon from '../../utils/Account/Profile/LogoutIcon.svg';
import UserIcon from '../../utils/Account/Profile/UserIcon.svg';
import ArrowRightIcon from '../../utils/Account/Profile/ArrowRightIcon.svg';
import { removeToken } from '../../utils/localstorage';
import { useDispatch } from 'react-redux';
import { clearDisptach } from '../../redux/reducers/authSlice/AuthSlice';

const Profile = ({
  loggedUser,
  setIsLogout,
  setIsProfile,
  // setIsLogin
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileRef = useRef(null);

  const handleLogout = () => {
    // setIsLogout(true);
    removeToken();
    navigate('/login');
    dispatch(clearDisptach());
    chrome.storage.local.remove('userAccessToken', function () {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log('Token removed successfully!');
      }
    });
    sessionStorage.removeItem('chatId');
    localStorage.removeItem('userPreferences');
    // Broadcast the logout action to other tabs
    // setTimeout(() => {
    //   // setIsLogout(false);
    //   // setIsLogin(false);
    // }, 5000);
  };
  //profile
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfile(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileRef, setIsProfile]);

  return (
    <>
      <div
        ref={profileRef}
        className="absolute top-[100%] right-0 bg-white rounded-[6px]"
        style={{
          boxShadow: '0px 10px 20px 0px #3C42571A',
        }}
      >
        <div
          className="w-[350px] rounded-[6px] overflow-hidden"
          style={{
            boxshadow: '0px 10px 20px 0px #3C42571A',
          }}
        >
          <div className="flex gap-2 items-center text-[16px] py-[15px] px-[15px] bg-lightblue1">
            <div className="h-[40px] w-[40px] flex items-center justify-center">
              <img className="h-[34px] w-[34px]" src={loggedUser.avatar} />
            </div>
            <div className="flex flex-col text-darkBlue">
              <div className="text-[16px]">{loggedUser.name}</div>
              <div className="text-[12px]">{loggedUser.email}</div>
            </div>
          </div>
          <div className="pt-[8px] pb-[15px] px-[15px] flex flex-col text-darkBlue">
            <div className="flex flex-col gap-[24px]">
              <div className="flex-col gap-2 flex">
                <div className="text-[14px] text-primaryBlue">Free Queries</div>
                <div className="bg-lightblue1 flex items-center justify-between p-[4px] gap-2">
                  <div className="flex items-center gap-2">
                    <img src={FlashIcon} />
                    <div className="text-[12px] font-bold text-primaryBlue">16/30 per day</div>
                  </div>
                  <button className="flex pl-[4px] pr-[8px] py-[4px] gap-1 items-center rounded-[4px] text-[12px] font-medium bg-lightblue2">
                    <img src={AddIcon} />
                    <span className="text-primaryBlue">More</span>
                  </button>
                </div>
              </div>
              <div className="flex-col gap-2 flex">
                <div className="text-[14px] text-primaryBlue">Pro Features Trial</div>
                <div className="bg-lightblue1 flex items-center justify-between p-[4px] gap-2">
                  <div className="flex items-center gap-2">
                    <img src={BookIcon} />
                    <div className="text-[12px] font-medium text-primaryBlue opacity-50">Reading Assistant</div>
                    <div className="text-[12px] text-primaryBlue">2/2</div>
                  </div>
                  <button className="flex pl-[4px] pr-[8px] py-[4px] gap-1 items-center rounded-[4px] text-[12px] font-medium bg-lightblue2">
                    <img src={AddIcon} />
                    <span className="text-primaryBlue">More</span>
                  </button>
                </div>
                <div className="bg-lightblue1 flex items-center justify-between p-[4px] gap-2">
                  <div className="flex items-center gap-2">
                    <img src={YoutubeIcon} />
                    <div className="text-[12px] font-medium text-primaryBlue opacity-50">YouTube Summary</div>
                    <div className="text-[12px] text-primaryBlue">0/2</div>
                  </div>
                  <button className="flex pl-[4px] pr-[8px] py-[4px] gap-1 items-center rounded-[4px] text-[12px] font-medium bg-lightblue2">
                    <img src={AddIcon} />
                    <span className="text-primaryBlue">More</span>
                  </button>
                </div>
              </div>
              <div className="flex-col gap-[16px] flex">
                <div
                  className="cursor-pointer flex justify-between items-center gap-2"
                  onClick={() =>
                    navigate('/billings', {
                      state: {
                        loggedUser: loggedUser,
                      },
                    })
                  }
                >
                  <div className="flex items-center gap-2">
                    <img src={BillingIcon} />
                    <div className="">Billing</div>
                  </div>
                  <div>
                    <img src={ArrowRightIcon} />
                  </div>
                </div>
                <div
                  className="cursor-pointer flex justify-between items-center gap-2"
                  onClick={() =>
                    navigate('/manageAccount', {
                      state: {
                        loggedUser: loggedUser,
                      },
                    })
                  }
                >
                  <div className="flex items-center gap-2">
                    <img src={QuestionIcon} />
                    <div className="">Manage Account</div>
                  </div>
                  <div>
                    <img src={ArrowRightIcon} />
                  </div>
                </div>
                <div className="cursor-pointer flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2">
                    <img src={LogoutIcon} />
                    <div className="">Help</div>
                  </div>
                  <div>
                    <img src={ArrowRightIcon} />
                  </div>
                </div>
                <div className="cursor-pointer flex justify-between items-center gap-2" onClick={() => handleLogout()}>
                  <div className="flex items-center gap-2">
                    <img src={UserIcon} />
                    <div className="">Logout</div>
                  </div>
                  <div>
                    <img src={ArrowRightIcon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
