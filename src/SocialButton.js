import React, { useEffect, useState } from 'react';
import RisalaAILOGO from './utils/Linkedin/RisalaAILOGO.svg';
import SocialPopup from './SocialPopup';

const SocialButton = ({ fromPosition, fromBtnPosition, handleSidebar }) => {
  return (
    <>
      <div
        id="SocialButton"
        className="hidden cursor-pointer"
        style={{
          position: 'absolute',
          top: fromBtnPosition.top,
          bottom: fromBtnPosition.bottom,
          left: fromBtnPosition.left,
          // bottom: '437px',
          // left: '908px',
          zIndex: '99900',
        }}
      >
        <img className="" src={RisalaAILOGO} style={{ zIndex: '9999999999 !important' }} />
      </div>
      <SocialPopup fromPosition={fromPosition} handleSidebar={handleSidebar} />
    </>
  );
};
export default SocialButton;
