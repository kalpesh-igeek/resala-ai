import React, { useState } from 'react';
import Logo from '../../utils/Facebook/logo.png';
import FacebookPopup from './FacebookPopup';

function FacebookButton() {
  const [showFbpopup, setShowFbpopup] = useState(false);
  //   const handleFacebookPopup = () => {
  //     console.log('hello popup');
  //     facebookClick();
  //   };
  return (
    <>
      <div className="relative" id="setLogoFacebook">
        <div
          onClick={() => {
            console.log('clock bittojoidnfjdhjubg');
          }}
          className="w-[12px] rounded-full "
          id="logoFacebook"
        >
          <img src={Logo} alt="logo" className="w-[12px]" />

          {/* {showFbpopup ? (
            <div className="absolute top-0 left-0">
              <FacebookPopup />
            </div>
          ) : (
            ''
          )} */}
        </div>
        {/* <div className={`${showFbpopup ? 'block' : 'hidden'} absolute top-0 left-0`}>
          <FacebookPopup />
        </div> */}
      </div>
    </>
  );
}

export default FacebookButton;
