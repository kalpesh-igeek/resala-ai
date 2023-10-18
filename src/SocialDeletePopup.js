import React from 'react';
import WarningIcon from './utils/MainScreen/Icons/WarningIcon.svg';
import Close from './utils/MainScreen/Icons/Close.svg';
function SocialDeletePopup({ onEmpty }) {
  const handleDeleteChat = () => {
    onEmpty();
  };
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent click events from propagating when clicking anywhere within the popup
  };
  return (
    <div onClick={handleClick}>
      <div
        // ref={deleteRef}
        // className="fixed rounded-[10px] bg-white p-[20px] right-[20px] top-[50%] -translate-y-2/4 z-[80] w-[460px]"
        className=" rounded-[10px] bg-white p-[20px] z-[80] w-[460px]"
        style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
        // show={open}
      >
        <div className="pt-[8px] pb-[20px] text-[22px] font-medium text-darkBlue">
          <div className="flex items-center justify-between">
            <div className="gap-2 flex items-center">
              <span className="w-[28px] h-[28px] flex items-center justify-center bg-rose-200 rounded-full">
                <img src={WarningIcon} />
              </span>
              <span className="text-red">Delete History</span>
            </div>
            {/* <div className="cursor-pointer -mt-[30px]" onClick={() => setIfOpenDeleteBox(false)}> */}
            <div className="cursor-pointer -mt-[30px]">
              <img src={Close} />
            </div>
          </div>
        </div>
        <div className="col-span-full mb-[20px] pl-[36px]">
          <div className="text-[14px] text-gray1 mb-[8px]">Are you sure you want to delete this conversation?</div>
        </div>
        <div className="mt-1 flex justify-end">
          <div className="flex gap-2 items-center">
            {/* <button
              className="rounded-md bg-white px-[16px] py-[10px] text-[16px] font-medium text-darkBlue border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
              onClick={() => setIfOpenDeleteBox(false)}
            > */}
            <button className="rounded-md bg-white px-[16px] py-[10px] text-[16px] font-medium text-darkBlue border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50">
              No
            </button>
            {/* <button
              className="rounded-md bg-primaryBlue px-[16px] py-[10px] text-[16px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
              onClick={(e) => handleDeleteTemplate(e)}
            > */}
            <button
              className="rounded-md bg-primaryBlue px-[16px] py-[10px] text-[16px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
              onClick={handleDeleteChat}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialDeletePopup;
