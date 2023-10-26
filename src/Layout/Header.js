import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Logo from '../utils/Header/ResalaLogo.svg';
import Logo from '../utils/Header/ResLogo.svg';
import Avatar from '../utils/Header/Ellipse 32.svg';
import Close from '../utils/Header/Close-1.svg';
import SettingsIcon from '../utils/Header/SettingsIcon.svg';
import Profile from '../Pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { checkActivity } from '../redux/reducers/authSlice/AuthSlice';
import CustomTooltip from '../Components/CustomTooltip/Tooltip';
import { handleToggle } from '../redux/reducers/extension/extension-slice';

const loggedUser = {
  avatar: Avatar,
  name: 'Vatsal Sonani',
  email: 'example@gmail.com',
  password: 'admin123',
};

const Header = ({
  children,
  handleClick,
  handleCloseClick,
  handlePopUpCloseClick,
  setIsLogout,
  setIfOpenConfirmBox,
  isActivity,
  position,
  // setIsLogin
}) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log('isActivity', isActivity);
  const { activity } = useSelector((state) => state.auth);

  const [isProfile, setIsProfile] = useState(false);

  // const handleClose = () => {
  //   console.log({activity});
  //   if (activity) {
  //     console.log('1');
  //     handleClick();
  //   } else {
  //     console.log('2');
  //     // setIfOpenConfirmBox(true);
  //     const textarea1 = document.getElementById('chatText');
  //     const textarea2 = document.getElementById('requestedText');
  //     const SocialButton = document.getElementById('SocialButton');
  //     // const SocialPopup = document.getElementById('SocialPopup');
  //     console.log({textarea1,textarea2});
  //     // setIfConfirmClose(true);
  //     if (textarea1 || textarea2) {
  //       console.log(textarea1.value || textarea1.value);
  //       // console.log(textarea1.value);
  //       if (textarea1.value.trim() === '' || textarea2.value.trim() === '') {
  //         console.log('Hello');
  //         // SocialButton.classList.remove('hidden');
  //         // SocialPopup.classList.remove('hidden');
  //       } else {
  //         console.log("setIfOpenConfirmBox");
  //         setIfOpenConfirmBox(true);
  //       }
  //     }
  //     // setIfConfirmClose(true);
  //     console.log("outer if");
  //     dispatch(checkActivity(false));
  //     handleCloseClick();
  //   }
  // };

  const handleCloseExtension = () =>{
    handleClick();
  }


  const handleClose = () => {
    console.log({activity});
    const chatText = document.getElementById('chatText');
    if(chatText && chatText.value){
      console.log("asfas");
    }
    console.log({chatText});
    const requestedText = document.getElementById('requestedText');
    console.log({requestedText});
    const originalText = document.getElementById('originalText');
    console.log({originalText});

    // console.log("dklsdjdskl");
    // dispatch(handleToggle(false));
    // console.log('remove extension width');
    // document.getElementById('resala_style_right_space') ?document.getElementById('resala_style_right_space').remove() : ''

    // document.querySelectorAll('[style="margin-right: 500px;"]')[0] ? document.querySelectorAll('[style="margin-right: 500px;"]')[0].style = 'position: relative;' : '';
    // document.getElementsByClassName('MAINBODY')[0].style = 'display: none;';
    // document.body.style.width = '100%'
  };

  return (
    <div className={`h-[100%] font-dmsans`}>
      <div
        style={{ position: 'sticky', top: 0, borderLeft:'none' }}
        className="flex items-center justify-between px-[20px] py-[11px] border-b-gray border-b-[1px] border-l-gray border-l-[1px] bg-white relative z-[70]"
      >
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="cursor-pointer h-[34px] w-[34px]" onClick={() => navigate('/')} />
          <div className="text-darkgray text-[20px] font-Poppins font-medium">Resala</div>
          <div className="flex gap-1 items-center justify-center w-full rounded-full border border-primaryBlue bg-white font-medium text-primaryBlue ">
            <div className="text-[10px] beta">Beta</div>
          </div>
        </div>

        <div className="flex items-center">
          <CustomTooltip
            isFloating
            maxWidth="430px"
            place="bottom"
            id="SettingHeaderTool"
            content={`<div class="capitalize font-normal text-[12px] leading-[18px]" > Settings </div>`}
          >
            <div
              id="SettingHeaderTool"
              className="mr-[10px] h-[34px] w-[34px] border-slate-300 rounded-full border flex justify-center items-center cursor-pointer"
            >
              <img className="h-[20px] w-[20px]" src={SettingsIcon} onClick={() => navigate('/preferences')} />
            </div>
          </CustomTooltip>
          <div className="mr-[10px] relative">
            <div className="cursor-pointer" onClick={() => setIsProfile(!isProfile)}>
              <img className="h-[34px] w-[34px]" src={Avatar} />
            </div>
            {isProfile && (
              <Profile
                loggedUser={loggedUser}
                setIsLogout={setIsLogout}
                setIsProfile={setIsProfile}
                // setIsLogin={setIsLogin}
              />
            )}
          </div>
          <div className="mr-[10px] bg-slate-300 w-px h-[28px] mx-0.5"></div>
          <div>
            <img
              className="extensionCloseIcon cursor-pointer h-[31px] w-[31px]"
              src={Close}
              alt="Close"
              onClick={() => handlePopUpCloseClick()}
            />
          </div>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default Header;
