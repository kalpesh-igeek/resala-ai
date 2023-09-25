import React from 'react';
import AppleSocialLogin from './AppleLogin';
import FacebookLogin from './FacebookLogin';
import GoogleLogin from './GoogleLogin';

const SocialLogin = () => {
  return (
    <>
      <div className="flex justify-center relative items-center gap-1 mt-[24px]">
        <span className="bg-white capitlize px-[10px] z-10 text-[14px]">Or</span>
        <span className="bg-gray h-[1px] absolute w-full"></span>
      </div>
      <div className="flex flex-col relative items-center gap-[12px] mt-[24px]">
        <GoogleLogin />
        <FacebookLogin />
        <AppleSocialLogin />
      </div>
    </>
  );
};

export default SocialLogin;
