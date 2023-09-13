import React from 'react';
import FacebookIcon from '../../utils/Account/Icons/facebook.svg';

const FacebookLogin = () => {
  return (
    <div className="w-full flex gap-2 items-center">
      <button className="flex items-center gap-2 w-full text-left rounded-md bg-white px-3 py-[14px] text-[14px] text-gray2 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50">
        <img src={FacebookIcon} />
        Continue with Facebook
      </button>
    </div>
  );
};

export default FacebookLogin;
