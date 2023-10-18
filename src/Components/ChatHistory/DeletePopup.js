import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteChatHistory } from '../../redux/reducers/chatSlice/ChatSlice';
import Close from '../../utils/MainScreen/Icons/Close.svg';
import alertIcon from '../../utils/MainScreen/Icons/alertIcon.svg';

export default function DeletePopup({
  deleteContent,
  ifOpenDeleteBox,
  setIfOpenDeleteBox,
  setIsDeleteChatConfirm,
  setIsDeleteFileConfirm,
  deleteChatIndex,
  fetchChatHistory,
  deleteRef,
}) {
  const dispatch = useDispatch();

  const handleDeleteTemplate = async (e) => {
    e.stopPropagation();
    if (deleteChatIndex) {
      const res = await dispatch(deleteChatHistory(deleteChatIndex));
      if (!res.payload) {
        return;
      }
      if (res.payload?.status === 200) {
        setIfOpenDeleteBox(false);
        fetchChatHistory();
      }
    }
    // if (deleteContent == 'chat') {
    //   setIsDeleteChatConfirm(true);
    // } else {
    //   setIsDeleteFileConfirm(true);
    // }
  };
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent click events from propagating when clicking anywhere within the popup
  };

  return (
    <div onClick={handleClick} className={`${ifOpenDeleteBox ? 'block' : 'hidden'}`}>
      <div className="fixed top-0 bottom-0 right-0 w-[500px] bg-black opacity-40 z-[70]"></div>
      <div
        ref={deleteRef}
        className="fixed rounded-[10px] bg-white p-[20px] right-[20px] top-[50%] -translate-y-2/4 z-[80] w-[460px]"
        style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
        // show={open}
      >
        <div className="pt-[8px] pb-[20px] text-[22px] font-medium text-darkBlue">
          <div className="flex items-center justify-between">
            <div className="gap-2 flex items-center">
              <span className="w-[28px] h-[28px] flex items-center justify-center bg-rose-200 rounded-full">
                <img src={alertIcon} />
              </span>
              <span className="text-red">Alert</span>
            </div>
            <div className="cursor-pointer -mt-[30px]" onClick={() => setIfOpenDeleteBox(false)}>
              <img src={Close} />
            </div>
          </div>
        </div>
        <div className="col-span-full mb-[20px] pl-[36px]">
          <div className="text-[14px] text-gray1 mb-[8px]">Are you sure you want to delete this conversation?</div>
        </div>
        <div className="mt-1 flex justify-end">
          <div className="flex gap-2 items-center">
            <button
              className="rounded-md bg-white px-[16px] py-[10px] text-[16px] font-medium text-[#5F6583] border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
              onClick={() => setIfOpenDeleteBox(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-primaryBlue px-[16px] py-[10px] text-[16px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
              onClick={(e) => handleDeleteTemplate(e)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
