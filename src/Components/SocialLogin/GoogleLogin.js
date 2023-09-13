import React from 'react';
import GoogleIcon from '../../utils/Account/Icons/GoogleIcon.svg';
const GoogleLogin = () => {
  return (
    <div className="w-full flex gap-2 items-center">
      <button className="flex items-center gap-2 w-full text-left rounded-md bg-white px-3 py-[14px] text-[14px] text-gray2 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50">
        <img src={GoogleIcon} />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
