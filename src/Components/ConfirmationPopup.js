import React from 'react';
import Close from '../utils/MainScreen/Icons/Close.svg';
import WarningIcon from '../utils/MainScreen/Icons/WarningIcon.svg';
import { useNavigate } from 'react-router-dom';

export default function ConfirmationPopup({ ifOpenConfirmBox, setIsOpen, setIfOpenConfirmBox, setIfConfirmClose,onConfirmClick,setOnConfirmClick ,setIsConfirmExit,isConfirmExit}) {
  const navigate = useNavigate()
  const SocialButton = document.getElementById('SocialButton');
  const handleClick = (value) => {
    if(value && isConfirmExit){
      setIfOpenConfirmBox(false)
      setIsConfirmExit(false)
      navigate(-1)
    }else if(value && !isConfirmExit){
      setOnConfirmClick(true)
    }else{
      setIfOpenConfirmBox(false)
    }
    // setIfConfirmClose(true);
    // setIfOpenConfirmBox(false);
    // setIsOpen(false);
    // SocialButton.classList.remove('hidden');
  };

  return (
    <div className={`${ifOpenConfirmBox ? 'block' : 'hidden'}`}>
      <div className="fixed top-0 bottom-0 right-0 w-[500px] bg-black opacity-40 z-[70]"></div>
      <div
        className="fixed rounded-[10px] bg-white p-[20px] right-[20px] top-[50%] -translate-y-2/4 z-[70] w-[460px]"
        style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
        // show={open}
      >
        <div className="pt-[8px] pb-[24px] text-[22px] font-medium text-darkBlue">
          <div className="flex items-center justify-between">
            <div className="gap-2 flex items-center">
              <span className="w-[28px] h-[28px] flex items-center justify-center bg-rose-200 rounded-full">
                <img src={WarningIcon} />
              </span>
              <span className="text-red">Warnings</span>
            </div>
            <div className="cursor-pointer -mt-[30px]" onClick={() => setIfOpenConfirmBox(false)}>
              <img src={Close} />
            </div>
          </div>
        </div>
        <div className="col-span-full mb-[20px] pl-[36px]">
          <div className="text-[14px] text-gray1 mb-[8px]">
            All progress will be lost if you exit this window. Are you sure?
          </div>
        </div>
        <div className="mt-1 flex justify-end">
          <div className="flex gap-2 items-center">
            <button
              className="rounded-md bg-white px-[16px] py-[10px] text-[16px] font-medium text-darkBlue border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
              onClick={() => handleClick(false)}
            >
              No
            </button>
            <button
              className="rounded-md bg-primaryBlue px-[16px] py-[10px] text-[16px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
              // onClick={handleCloseClick}
              onClick={() => {handleClick(true)}}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
