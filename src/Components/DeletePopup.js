import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTemplate } from '../redux/reducers/templateSlice/TemplateSlice';
import Close from '../utils/MainScreen/Icons/Close.svg';
import WarningIcon from '../utils/MainScreen/Icons/WarningIcon.svg';

export default function DeletePopup({ ifOpenDeleteBox, setIfOpenDeleteBox, templateObject, fetchTemplateList }) {
  const dispatch = useDispatch();
  const deleteRef = useRef(null);
  const handleDeleteTemplate = async () => {
    const res = await dispatch(deleteTemplate(templateObject?.id));
    if (!res.payload) {
      return;
    }
    if (res.payload?.status === 200) {
      fetchTemplateList();
      setIfOpenDeleteBox(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (deleteRef.current && !deleteRef.current.contains(event.target)) {
        setIfOpenDeleteBox(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [deleteRef, setIfOpenDeleteBox]);

  return (
    <div className={`${ifOpenDeleteBox ? 'block' : 'hidden'}`}>
      <div className="fixed top-0 bottom-0 right-0 w-[500px] bg-black z-[60] opacity-40"></div>
      <div
        ref={deleteRef}
        className="absolute rounded-[10px] bg-white p-[20px] right-[20px] top-[50%] -translate-y-2/4 z-[70] w-[460px]"
        style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
        // show={open}
      >
        <div className="pt-[8px] pb-[20px] text-[22px] font-medium text-darkBlue">
          <div className="flex items-center justify-between">
            <div className="gap-2 flex items-center">
              <span className="w-[28px] h-[28px] flex items-center justify-center bg-rose-200 rounded-full">
                <img src={WarningIcon} />
              </span>
              <span className="text-red">Delete template</span>
            </div>
            <div className="cursor-pointer -mt-[30px]" onClick={() => setIfOpenDeleteBox(false)}>
              <img src={Close} />
            </div>
          </div>
        </div>
        <div className="col-span-full mb-[20px] pl-[36px]">
          <div className="text-[14px] text-gray1 mb-[8px]">Do you really want to delete this templete?</div>
        </div>
        <div className="mt-1 flex justify-end">
          <div className="flex gap-2 items-center">
            <button
              className="rounded-md bg-white px-[16px] py-[10px] text-[16px] font-medium text-darkBlue border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
              onClick={() => setIfOpenDeleteBox(false)}
            >
              No
            </button>
            <button
              className="rounded-md bg-primaryBlue px-[16px] py-[10px] text-[16px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
              onClick={handleDeleteTemplate}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
