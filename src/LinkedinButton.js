import React, { useEffect, useState } from 'react';
import RisalaAILOGO from './utils/Linkedin/RisalaAILOGO.svg';
import SocialPopup from './SocialPopup';

const LinkedinButton = ({fromPosition}) => {
  return (
    <>
    <div id="LinkedinButton" className='hidden' style={{
      position: 'fixed',
      bottom: '437px',
      left: '908px',
      zIndex: '999999999999',
    }}>
      <img className="" src={RisalaAILOGO} style={{zIndex: '9999999999 !important'}} />
    </div>
    <SocialPopup fromPosition={fromPosition} />
    </>
  );
};
export default LinkedinButton;
