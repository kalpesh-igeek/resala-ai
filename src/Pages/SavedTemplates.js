import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowLeft from '../utils/SavedTemplates/Icons/ArrowLeft.svg';
import Close from '../utils/MainScreen/Icons/Close.svg';
import TemplateDocIcon from '../utils/SavedTemplates/Icons/TemplateDocIcon.svg';
import DropDownBox from '../Components/SaveTemplatePopup/DropdownBox';
import { Tab } from '@headlessui/react';

const templates = [
  {
    id: 'Temp1',
    title: 'Quick Professional',
    type: 'SMS',
    configuration: {
      action: { name: 'Explain' },
      length: { name: 'Lengthy' },
      tone: { name: 'Friendly' },
      language: { name: 'Arabic' },
    },
    input: 'Aliqua id fugiat ffjalsdkfjds;lkfjsl;dsaj ea quis id quis ad et.',
    outout:
      'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.',
  },
  {
    id: 'Temp2',
    title: 'Short & Funny',
    type: 'Social Media',
    configuration: {
      action: { name: 'Explain' },
      length: { name: 'Lengthy' },
      tone: { name: 'Friendly' },
      language: { name: 'Arabic' },
    },
    input: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.',
    outout:
      'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.',
  },
  {
    id: 'Temp3',
    title: 'Casual English',
    type: 'Email',
    configuration: {
      action: { name: 'Explain' },
      length: { name: 'Lengthy' },
      tone: { name: 'Friendly' },
      language: { name: 'Arabic' },
    },
    input: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.',
    outout:
      'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.',
  },
  {
    id: 'Temp4',
    title: 'Chinese Funny',
    type: 'SMS',
    configuration: {
      action: { name: 'Explain' },
      length: { name: 'Lengthy' },
      tone: { name: 'Friendly' },
      language: { name: 'Arabic' },
    },
    input: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.',
    outout:
      'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.',
  },
  {
    id: 'Temp5',
    title: 'Confident Russian',
    type: 'Email',
    configuration: {
      action: { name: 'Explain' },
      length: { name: 'Lengthy' },
      tone: { name: 'Friendly' },
      language: { name: 'Arabic' },
    },
    input: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.',
    outout:
      'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.',
  },
  {
    id: 'Temp6',
    title: 'Russian',
    type: 'General',
    configuration: {
      action: { name: 'Explain' },
      length: { name: 'Lengthy' },
      tone: { name: 'Friendly' },
      language: { name: 'Arabic' },
    },
    input: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.',
    outout:
      'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.',
  },
];

const Tabs = [
  {
    id: 1,
    type: 'All',
  },
  {
    id: 2,
    type: 'Email',
  },
  {
    id: 3,
    type: 'SMS',
  },
  {
    id: 4,
    type: 'General',
  },
];

const SavedTemplates = ({ handleSidebar, setIsOpen, ifOpenDeleteBox, setIfOpenDeleteBox }) => {
  const navigate = useNavigate();

  const [saveTemplates, setSaveTemplates] = useState(templates);
  const [openIndex, setOpenIndex] = useState(null);
  const [dropDown, setDropDownBox] = useState(false);
  const [selectTab, setSelectTab] = useState(1);

  const handleItemOpen = (index) => {
    setOpenIndex(index);
    setDropDownBox(!dropDown);
  };

  const handleClose = () => {
    setIsOpen(false);
    handleSidebar();
  };

  const handleOuterClick = () => {
    if (dropDown) setDropDownBox(false);
  };

  const handleSelectTab = (id) => {
    setSelectTab(id);
  };

  return (
    <div className="" onClick={() => handleOuterClick()}>
      <div className="flex items-center px-[20px] py-[11px] justify-between  border-b-gray border-b-[1px] border-l-gray border-l-[1px]">
        <div className="gap-2 flex items-center text-[14px]">
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <img src={ArrowLeft} />
          </div>
          <span>Templates</span>
        </div>
        <div className="cursor-pointer" onClick={() => handleClose()}>
          <img src={Close} />
        </div>
      </div>

      <div className="py-[12px] px-[20px]">
        <Tab.Group
          as="div"
          className="w-[229px] h-[28px] bg-gray3 mb-[15px] flex items-center justify-between px-[3px] rounded-full"
        >
          <Tab.List className="flex gap-4">
            {Tabs.map((data, id) => (
              <Tab
                className={
                  selectTab === data.id
                    ? 'w-[42px] h-[24px] rounded-[100px] gap-[8px] text-[11px] font-bold bg-graywhite'
                    : 'w-[38px] h-[24px] text-[11px] text-lightgray2'
                }
                key={id}
                onClick={() => handleSelectTab(data.id)}
              >
                {data.type}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>

        {saveTemplates
          .filter((template) => selectTab === 1 || template.type === Tabs.find((tab) => tab.id === selectTab)?.type)
          .map((template, index) => (
            <div className="p-[11px] bg-white border rounded-[6px] border-gray mb-[15px] flex items-center justify-between">
              <div className="flex items-center gap-2 ">
                <div className="h-[40px] w-[40px] bg-lightgray flex items-center justify-center rounded-full">
                  <img src={TemplateDocIcon} />
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="text-[16px] text-darkblue">{template.title}</div>
                  <div className="text-sm text-darkgray1">{template.type}</div>
                </div>
              </div>
              <DropDownBox
                template={template}
                dropDown={dropDown}
                shouldOpen={index == openIndex && dropDown ? true : false}
                clickHandler={(clickedIndex) => {
                  handleItemOpen(clickedIndex);
                }}
                index={index}
                ifOpenDeleteBox={ifOpenDeleteBox}
                setIfOpenDeleteBox={setIfOpenDeleteBox}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SavedTemplates;
