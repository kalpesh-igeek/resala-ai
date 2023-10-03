import React from 'react';

import Logo from '../../utils/Header/ResLogo.svg';
import CloseIcon from '../../utils/CloseIcon.svg';

export const FloatBtn = ({ isClicked, onClick }) => {
  return (
    <div className={`flex justify-center items-center`} onClick={onClick}>
      <img src={Logo} alt="logo" className="cursor-pointer h-[30px] w-[30px]" />
      <span
        className={`${
          isClicked && 'fix-text'
        } whitespace-pre text-[14px] text-primaryBlue font-semibold leading-[16px]`}
      >
        {/* not to remove this */}
        {' '} 
        Resala.ai
      </span>
      <img
        className={`${isClicked && 'visible'} closeIcon invisible absolute top-[-2px] right-[-2px]`}
        src={CloseIcon}
        alt="CloseIcon"
      />
    </div>
  );
};
