import React, { useEffect, useRef } from 'react';
import Close from '../utils/MainScreen/Icons/Close.svg';
import HowToIconBg from '../utils/Chat/Icons/HowToIconBg.svg';

const HowToUseInfoBox = ({ setIsAudioInfoPopup }) => {
  const myPromptRef = useRef();
  const handleClose = () => {
    setIsAudioInfoPopup(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (myPromptRef.current && !myPromptRef.current.contains(event.target)) {
        setIsAudioInfoPopup(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myPromptRef, setIsAudioInfoPopup]);
  return (
    <div
      ref={myPromptRef}
      className="absolute rounded-[10px] bg-white p-[20px] left-0 bottom-[100%] z-50 w-[460px]"
      style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
      // show={open}
    >
      <div className="pt-[8px] pb-[8px] mb-[20px] text-[20px] font-medium text-darkBlue">
        <div className="flex items-center justify-between">
          <div className="gap-2 flex items-center capitalize">
            <img src={HowToIconBg} />
            <span>How to use voice input</span>
          </div>
          <div className="cursor-pointer -mt-[30px]" onClick={() => handleClose()}>
            <img src={Close} />
          </div>
        </div>
      </div>
      <div className="">
        <div className="text-[14px] rounded-md bg-lightblue1 px-[15px] py-[11px] text-gray1 mb-[16px]">
          Voice input requires microphone access, and only supports Chrome for now.
        </div>
        <div className="mb-[16px] flex flex-col gap-[4px]">
          <div className="text-[14px] font-medium text-darkBlue">Start recording:</div>
          <div className="text-[14px] text-gray1">
            Click the button or hold
            <span className="font-medium text-primaryBlue border border-primaryBlue rounded-[4px] py-[1px] px-[3px] mx-[3px]">
              Space
            </span>
            to start recording.
          </div>
          <div className="text-gray1 text-[12px]">*real-time transcript will be display when speaking.</div>
        </div>
        <div className="mb-[16px] flex flex-col gap-[4px]">
          <div className="text-[14px] font-medium text-darkBlue">Stop recording:</div>
          <div className="text-[14px] text-gray1">
            Click the button again or release
            <span className="font-medium text-primaryBlue border border-primaryBlue rounded-[4px] py-[1px] px-[3px] mx-[3px]">
              Space
            </span>
            to stop recording.
          </div>
          <div className="text-gray1 text-[12px]">*message will be send automatically after stop.</div>
        </div>
        <div className="mb-[16px] flex flex-col gap-[4px]">
          <div className="text-[14px] font-medium text-darkBlue">Cancel recording:</div>
          <div className="text-[14px] text-gray1">
            Click the Cancel icon or press
            <span className="font-medium text-primaryBlue border border-primaryBlue rounded-[4px] py-[1px] px-[3px] mx-[3px]">
              Esc
            </span>
            to cancel recording.
          </div>
        </div>
        <div className="mb-[16px] flex flex-col gap-[4px]">
          <div className="text-[14px] font-medium text-darkBlue">Edit transcript</div>
          <div className="text-[14px] text-gray1">
            Click the Edit icon or press
            <span className="font-medium text-primaryBlue border border-primaryBlue rounded-[4px] py-[1px] px-[3px] mx-[3px]">
              E
            </span>
            to put the current transcript into message input for edit.
          </div>
          <div className="text-gray1 text-[12px]">*only available when transcript is not empty.</div>
        </div>
      </div>
    </div>
  );
};
export default HowToUseInfoBox;
