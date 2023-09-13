import React from 'react';
import Close from '../../utils/MainScreen/Icons/Close.svg';
import EyeIcon from '../../utils/Account/Icons/EyeIcon.svg';

const NAME_TYPE = 'Name';
const PASSWORD_TYPE = 'Password';

export default function ModificationPopup({ isModificationBox, setIsModificationBox, editModalType }) {
  return (
    <div className={`${isModificationBox ? 'block' : 'hidden'}`}>
      <div className="fixed top-0 bottom-0 right-0 w-[500px] bg-black opacity-40 z-[60]"></div>
      <div
        className="fixed rounded-[10px] bg-white p-[20px] right-[20px] top-[50%] -translate-y-2/4 z-[70] w-[460px]"
        style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
        // show={open}
      >
        <div className="pt-[8px] pb-[24px] text-[22px] font-medium text-darkBlue">
          <div className="flex items-center justify-between">
            <div className="gap-2 flex items-center">
              <span className="text-darkBlue">Edit {editModalType}</span>
            </div>
            <div className="cursor-pointer -mt-[30px]" onClick={() => setIsModificationBox(false)}>
              <img src={Close} />
            </div>
          </div>
        </div>
        {editModalType === NAME_TYPE ? (
          <div className="input-container relative w-full mb-[15px]">
            <input
              id="newname"
              name="newname"
              type="text"
              placeholder="Name"
              className="block w-full rounded-md border border-gray px-[15px] py-[11px] text-darkBlue placeholder:text-gray1"
            />
          </div>
        ) : (
          <>
            <div className="input-container relative w-full mb-[15px]">
              <input
                id="oldpassword"
                name="oldpassword"
                type="password"
                placeholder="Old password"
                className="block w-full rounded-md border border-gray px-[15px] mb-[15px] py-[11px] text-darkBlue placeholder:text-gray1"
              />
              <div
                className="absolute top-[50%] -translate-y-[50%] right-[15px]"
                // onClick={() => handleShowPassword()}
              >
                <img src={EyeIcon} alt="eyeicon" />
              </div>
            </div>
            <div className="input-container relative w-full mb-[15px]">
              <input
                id="newpassword"
                name="newpassword"
                type="password"
                placeholder="New password"
                className="block w-full rounded-md border border-gray px-[15px] mb-[15px] py-[11px] text-darkBlue placeholder:text-gray1"
              />
              <div
                className="absolute top-[50%] -translate-y-[50%] right-[15px]"
                // onClick={() => handleShowPassword()}
              >
                <img src={EyeIcon} alt="eyeicon" />
              </div>
            </div>
            <div className="input-container relative w-full mb-[15px]">
              <input
                id="cnfpassword"
                name="cnfpassword"
                type="password"
                placeholder="Confirm password"
                className="block w-full rounded-md border border-gray px-[15px] mb-[15px] py-[11px] text-darkBlue placeholder:text-gray1"
              />
              <div
                className="absolute top-[50%] -translate-y-[50%] right-[15px]"
                // onClick={() => handleShowPassword()}
              >
                <img src={EyeIcon} alt="eyeicon" />
              </div>
            </div>
          </>
        )}
        <div className="mt-1 flex justify-end">
          <div className="flex gap-2 items-center">
            <button className="rounded-md bg-white px-[16px] py-[10px] text-[16px] font-medium text-darkBlue border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50">
              Cancel
            </button>
            <button className="rounded-md bg-primaryBlue px-[16px] focus:outline-none py-[10px] text-[16px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
