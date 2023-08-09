import React from 'react';
import SaveTemplate from '../../utils/MainScreen/Icons/SaveTemplate.svg'
import Close from '../../utils/MainScreen/Icons/Close.svg'
import Dropdown from 'react-dropdown';
import ArrowDown from '../../utils/PopupBox/Icons/ArrowDown.svg'

export default function SaveTemplatePopup({ saveTemplateBox, setSaveTemplateBox }) {

  const options = [
    'General', 'Social Media', 'Email', 'SMS'
  ];
  // const defaultOption = options[0];

  return (
    <div className={`${saveTemplateBox ? "block" : "hidden"}`}>
      <div className="fixed top-0 bottom-0 right-0 w-[500px] bg-black z-[60] opacity-40"></div>
      <div
        className='fixed rounded-[10px] bg-white p-[20px] right-[20px] top-[50%] -translate-y-2/4 z-[70] w-[460px] h-[257px]'
        style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
        // show={open}
      >
        <div className="pt-[8px] pb-[20px] text-[22px] font-medium text-darkBlue">
          <div className='flex items-center justify-between'>
            <div className='gap-2 flex items-center'>
              <div className='bg-blue-200 w-[28px] h-[28px] rounded-full flex justify-center items-center hover:bg-blue-200'>
                <img src={SaveTemplate} />
              </div>
              <span>Save Template</span>
            </div>
            <div className='cursor-pointer -mt-[30px]' onClick={() => setSaveTemplateBox(false)}>
              <img src={Close} />
            </div>
          </div>
        </div>
        <div className="col-span-full mb-[15px]">
          <input
            id="templatename"
            name="templatename"
            type="text"
            placeholder='Name the template'
            className="block w-full rounded-md border border-gray px-[15px] py-[11px] text-darkBlue placeholder:text-gray1"
          />
        </div>
        <div className="col-span-full mb-[15px]">
          <Dropdown
            className='border border-gray rounded-md mb-[15px] p-[10px]'
            options={options}
            onChange={this._onSelect}
            placeholder="Select template type"
            arrowClosed={<img className='absolute top-[50%] -translate-y-[50%] right-[0] w-[16px] h-[16px]' src={ArrowDown} />}
            arrowOpen={<img className='absolute top-[50%] -translate-y-[50%] right-[0] w-[16px] h-[16px] rotate-180' src={ArrowDown} />}
          />
          {/* <select
            id="templatetype"
            name="templatetype"
            className="block w-full rounded-md border border-gray px-[15px] py-[11px] text-darkBlue"
          >
            <option>Select template type</option>
            <option>General</option>
            <option>Social Media</option>
            <option>Email</option>
            <option>SMS</option>
          </select> */}
        </div>
        <div className="mt-1 flex justify-end">
          <div className="flex gap-2 items-center">
            <button
              className="rounded-md bg-white px-[16px] py-[10px] text-[16px] font-medium text-darkBlue border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
              onClick={() => setSaveTemplateBox(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-primaryBlue px-[16px] py-[10px] text-[16px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
              onClick={() => setSaveTemplateBox(false)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}
