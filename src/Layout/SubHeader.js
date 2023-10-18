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

const SubHeader = () => {

  const handleClose = () => {
    document.querySelectorAll('[style="margin-right: 500px;"]')[0].style = 'position: relative;';
    document.getElementsByClassName('MAINBODY')[0].style = 'display: none;';
    document.body.style.width = '100%'
  };

  return (
    <div className={`h-auto font-dmsans`}>
      <div
        style={{ position: 'sticky', top: 0, borderLeft:'none' }}
        className="flex items-center justify-between px-[20px] py-[11px] border-b-gray border-b-[1px] border-l-gray border-l-[1px] bg-white relative z-[70]"
      >
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="cursor-pointer h-[34px] w-[34px]" />
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
    </div>
  );
};

export default SubHeader;
