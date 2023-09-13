import React from 'react';

import AppleIcon from '../../utils/Account/Icons/AppleIcon.svg';

import AppleLogin from 'react-apple-signin-auth';

const AppleSocialLogin = () => {
  return (
    <div className="w-full flex gap-2 items-center">
      <AppleLogin
        clientId="T7W7J5G3W9.ai.resala.ResalaApp"
        redirectURI="https://df48-2401-4900-1f3f-e028-f562-ef9c-49bb-a55.ngrok-free.app"
        responseType={'code'}
        responseMode={'query'}
        usePopup={true}
        callback={(response) => console.log(response)}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="flex items-center gap-2 w-full text-left rounded-md bg-white px-3 py-[14px] text-[14px] text-gray2 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
          >
            <img src={AppleIcon} />
            Continue with Apple
          </button>
        )}
      />
    </div>
  );
};

export default AppleSocialLogin;
