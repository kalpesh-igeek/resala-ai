import React from 'react';
import Logo from '../../utils/Header/ResalaLogo.svg';
import Close from '../../utils/Header/Close.svg';

const CloseDrawer = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="py-[20px] pl-[23px] border-b-gray border-b-[1px]">
        <img src={Logo} alt="logo" className="cursor-pointer" />
      </div>
      <div className="pt-[20px] pb-[19px] pl-[20px] border-t-gray border-t-[1px]">
        <img className="DrawerCloseIcon cursor-pointer" src={Close} alt="Close" />
      </div>
    </div>
  );
};

export default CloseDrawer;
