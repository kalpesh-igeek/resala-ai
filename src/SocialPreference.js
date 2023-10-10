import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowLeft from './utils/SavedTemplates/Icons/ArrowLeft.svg';
// import TripleToggleSwitch from '../../Components/TripleToggleSwitch/TripleToggleSwitch';
import QuickReplySettings from './Pages/Preferences/QuickReplySettings';
import PauseExtensionSettings from './Pages/Preferences/PauseExtensionSettings';
import { Tab } from '@headlessui/react';
import RequireIcon from './utils/Preferences/Icons/Required.svg';
import Select from 'react-select';

const labels = {
  left: {
    title: 'Floating',
    value: 'floating',
  },
  right: {
    title: 'Side',
    value: 'side',
  },
  center: {
    title: 'Hidden',
    value: 'hidden',
  },
};

const darkMode = [
  {
    id: 1,
    type: 'Auto',
  },
  {
    id: 2,
    type: 'ON',
  },
  {
    id: 3,
    type: 'OFF',
  },
];

const exePlace = [
  {
    id: 1,
    type: 'Left',
  },
  {
    id: 2,
    type: 'Right',
  },
];

const iconEffect = [
  {
    id: 1,
    type: 'Floating',
  },
  {
    id: 2,
    type: 'Hidden',
  },
  {
    id: 3,
    type: 'Side',
  },
];

const outputLanguages = [
  { value: 'english', label: 'English' },
  { value: 'arabic', label: 'Arabic' },
];

const SocialPreference = ({ selectedItems, setSelectedItems, setPreference }) => {
  const navigate = useNavigate();
  const [selectTabMode, setSelectTabMode] = useState(1);
  const [selectTabPlace, setSelectTabPlace] = useState(1);
  const [selectTabEffect, setSelectTabEffect] = useState(1);

  const onChange = (value) => console.log('value', value);

  const handleInputTone = (e, index, tone) => {
    let tempArr = Array.from(selectedItems);
    tempArr[2].name = tone.name;
    setSelectedItems(tempArr);
  };

  const handleInputLanguage = (e, index, language) => {
    let tempArr = Array.from(selectedItems);
    tempArr[3].name = language.name;
    setSelectedItems(tempArr);
  };

  const handleSelectTabMode = (id) => {
    setSelectTabMode(id);
  };

  const handleSelectTabPlace = (id) => {
    setSelectTabPlace(id);
  };

  const handleSelectTabEffect = (id) => {
    setSelectTabEffect(id);
  };

  return (
    <>
      <div
        className="flex items-center px-[20px] py-[11px] justify-between bg-white  border-b-gray border-b-[1px] border-l-gray border-l-[1px]"
        style={{ zIndex: '9999999' }}
      >
        <div className="gap-2 flex items-center text-[16px] text-darkBlue" onClick={() => setPreference(false)}>
          <div className="cursor-pointer">
            <img src={ArrowLeft} />
          </div>
          <span>Preferences</span>
        </div>
      </div>
      <div className="px-[20px] bg-white" style={{ zIndex: '9999999' }}>
        <div className="control py-[24px] border-b border-gray flex justify-between items-center">
          <div>
            <div className="text-[16px] text-darkblue font-medium mb-[5px]">Dark Mode</div>
            <div className="text-[14px] text-darkgray1">Apply Dak mode Theme to Chrome Extension</div>
          </div>

          <Tab.Group
            as="div"
            className="w-max bg-gray3 mb-[15px] flex items-center justify-between px-[3px] py-[3px] rounded-full"
          >
            <Tab.List className="flex gap-1">
              {darkMode.map((data, id) => (
                <Tab
                  className={
                    selectTabMode === data.id
                      ? 'rounded-[100px] gap-[8px] text-darkBlue text-[12px] font-bold bg-graywhite shadow-sm focus:outline-0 px-[6px] py-[6px] '
                      : 'text-[12px] text-lightgray2 px-[6px] py-[6px]'
                  }
                  key={id}
                  onClick={() => handleSelectTabMode(data.id)}
                >
                  <span> {data.type}</span>
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
        <div className="control py-[24px] border-b border-gray flex justify-between items-center">
          <div className="flex gap-2">
            <div className="text-[16px] text-darkblue font-medium mb-[5px]">Extension Sidebar</div>
            <img className="w-[15px] h-[15px]" src={RequireIcon} />
          </div>

          <Tab.Group
            as="div"
            className="w-max bg-gray3 flex items-center justify-between px-[3px] py-[3px] rounded-full"
          >
            <Tab.List className="flex gap-1">
              {exePlace.map((data, id) => (
                <Tab
                  className={
                    selectTabPlace === data.id
                      ? 'rounded-[100px] gap-[8px] text-darkBlue text-[12px] font-bold bg-graywhite shadow-sm focus:outline-0 px-[6px] py-[6px]'
                      : 'text-[12px] text-lightgray2 px-[6px] py-[6px]'
                  }
                  key={id}
                  onClick={() => handleSelectTabPlace(data.id)}
                >
                  <span> {data.type}</span>
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
        <div className="control py-[24px] border-b border-gray flex justify-between items-center">
          <div className="flex gap-2">
            <div className="text-[16px] text-darkblue font-medium mb-[5px]">Extension Icon</div>
            <img className="w-[15px] h-[15px]" src={RequireIcon} />
          </div>
          {/* <div>
            <TripleToggleSwitch labels={labels} onChange={onChange} />
          </div> */}
          <Tab.Group
            as="div"
            className="w-max bg-gray3 flex items-center justify-between px-[3px] py-[3px] rounded-full"
          >
            <Tab.List className="flex gap-1">
              {iconEffect.map((data, id) => (
                <Tab
                  className={
                    selectTabEffect === data.id
                      ? 'rounded-[100px] gap-[8px] text-darkBlue text-[12px] font-bold bg-graywhite shadow-sm focus:outline-0 px-[6px] py-[6px]'
                      : 'text-[12px] text-lightgray2 px-[6px] py-[6px]'
                  }
                  key={id}
                  onClick={() => handleSelectTabEffect(data.id)}
                >
                  <span> {data.type}</span>
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
        {/* {////} */}

        <div className="control py-[24px] border-b border-gray flex justify-between items-center">
          <div>
            <div className="text-[16px] text-darkblue font-medium mb-[5px]">Language</div>
          </div>
          <Select
            className="language flex gap-1 items-center justify-center rounded-full bg-gray3 text-[12px] font-bold text-darkBlue cursor-pointer"
            // menuPlacement="top"
            defaultValue={outputLanguages[0]}
            // menuPortalTarget={document.body}
            // onChange={setSelectedOption}
            placeholder="select"
            options={outputLanguages}
            // defaultInputValue={outputLanguages[0]}
            // menuIsOpen={true}
            styles={{
              control: (base) => ({
                ...base,
                height: '30px',
                minHeight: '30px',
                width: '121px',
                minWidth: '121px',
                border: 0,
                boxShadow: 'none',
                backgroundColor: '#F3F3F3',
                textAlign: 'center',
                borderRadius: '100%',
              }),
              menu: (base) => ({
                ...base,
                width: '121px',
                minWidth: '121px',
                right: '-9px',
                boxShadow: '0px 2px 20px 0px #00000026',
              }),
              option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                return {
                  ...styles,
                  backgroundColor: isFocused ? '#F3F4F8' : null,
                  color: !isFocused ? '#8C90A5' : '#19224C',
                  margin: '8px',
                  width: 'auto',
                  borderRadius: '4px',
                  height: '26px',
                  lineHeight: '13px',
                  cursor: 'pointer',
                };
              },
              dropdownIndicator: (provided, state) => ({
                ...provided,
                transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
              }),
            }}
          />
          {/* <div>
            <TripleToggleSwitch labels={labels} onChange={onChange} />
          </div> */}
        </div>

        <div className="control py-[24px] border-b border-gray flex justify-between items-center">
          <div>
            <div className="text-[16px] text-darkblue font-medium mb-[5px]">Quick Action Button</div>
            <div className="text-[14px] text-darkgray1">Display when text is selected</div>
          </div>
          <div>
            <label class="flex items-center relative w-max cursor-pointer select-none">
              <input
                type="checkbox"
                class="appearance-none transition-colors cursor-pointer w-[54px] h-[24px] rounded-full bg-lightgray1"
              />
              <span class="off absolute font-bold text-[11px] uppercase right-[5px]"> OFF </span>
              <span class="on absolute font-bold text-[11px] uppercase right-[32px]"> ON </span>
              <span class="w-[18px] h-[18px] right-[32px] absolute rounded-full transform transition-transform bg-white" />
            </label>
          </div>
        </div>
        <div className="control py-[24px] border-b border-gray">
          <QuickReplySettings />
        </div>
        <div className="control py-[24px] border-b border-gray flex justify-between items-center">
          <div>
            <div className="text-[16px] text-darkblue font-medium mb-[5px]">Youtube Summary</div>
            <div className="text-[14px] text-darkgray1">Display “YouTube Summary” panel alongside YouTube videos.</div>
          </div>
          <div>
            <label class="flex items-center relative w-max cursor-pointer select-none">
              <input
                type="checkbox"
                class="appearance-none transition-colors cursor-pointer w-[54px] h-[24px] rounded-full bg-lightgray1"
              />
              <span class="off absolute font-bold text-[11px] uppercase right-[5px]"> OFF </span>
              <span class="on absolute font-bold text-[11px] uppercase right-[32px]"> ON </span>
              <span class="w-[18px] h-[18px] right-[32px] absolute rounded-full transform transition-transform bg-white" />
            </label>
          </div>
        </div>
        <div className="control py-[24px] border-b border-gray flex justify-between items-center">
          <div>
            <div className="text-[16px] text-darkblue font-medium mb-[5px]">Reading Summary</div>
            <div className="text-[14px] text-darkgray1">
              Display “Resala Summary Button” alongside article website pages.
            </div>
          </div>
          <div>
            <label class="flex items-center relative w-max cursor-pointer select-none">
              <input
                type="checkbox"
                class="appearance-none transition-colors cursor-pointer w-[54px] h-[24px] rounded-full bg-lightgray1"
              />
              <span class="off absolute font-bold text-[11px] uppercase right-[5px]"> OFF </span>
              <span class="on absolute font-bold text-[11px] uppercase right-[32px]"> ON </span>
              <span class="w-[18px] h-[18px] right-[32px] absolute rounded-full transform transition-transform bg-white" />
            </label>
          </div>
        </div>
        <div className="control py-[24px] border-b border-gray flex justify-between items-center">
          <div>
            <div className="text-[16px] text-darkblue font-medium mb-[5px]">Social Media</div>
            <div className="text-[14px] text-darkgray1">
              This feature helps you get ai powered responses on social media platforms.
            </div>
          </div>
          <div>
            <label class="flex items-center relative w-max cursor-pointer select-none">
              <input
                type="checkbox"
                class="appearance-none transition-colors cursor-pointer w-[54px] h-[24px] rounded-full bg-lightgray1"
              />
              <span class="off absolute font-bold text-[11px] uppercase right-[5px]"> OFF </span>
              <span class="on absolute font-bold text-[11px] uppercase right-[32px]"> ON </span>
              <span class="w-[18px] h-[18px] right-[32px] absolute rounded-full transform transition-transform bg-white" />
            </label>
          </div>
        </div>
        <div className="control py-[24px] border-b border-gray">
          <PauseExtensionSettings />
        </div>
      </div>
    </>
  );
};

export default SocialPreference;
