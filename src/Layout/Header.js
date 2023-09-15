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
  setIsLogout,
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

  const handleClose = () => {
    if (activity) {
      handleClick();
    } else {
      dispatch(checkActivity(false));
      handleCloseClick();
    }
  };

  return (
    <div className={`h-[100%] font-dmsans`}>
      <div
        style={{ position: 'sticky', top: 0 }}
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
          <div className="mr-[10px] h-[34px] w-[34px] border-slate-300 rounded-full border flex justify-center items-center cursor-pointer">
            <img className="h-[20px] w-[20px]" src={SettingsIcon} onClick={() => navigate('/preferences')} />
          </div>
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
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default Header;
