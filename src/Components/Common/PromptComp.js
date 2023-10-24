import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Tab } from '@headlessui/react';
import InputField from '../InputField';
import SearchIcon from '../../utils/Chat/Icons/SearchIcon.svg';
import { SearchInput } from './SearchInput';
import EditGrayIcon from '../../utils/Chat/Icons/EditGrayIcon.svg';
import AddCircle from '../../utils/Chat/Icons/AddCircle.svg';
import CustomTooltip from '../CustomTooltip/Tooltip';

function PromptComp({
  generalPromptList,
  promptList,
  setClose,
  handleUsePrompt,
  handleSendMessage,
  setIsViewPrompts,
  setIsTypewriterDone,
  setChatInput,
  handleCustomPrompt,
  handleNewPrompt,
  multiplePlaceholder,
  setMultiplePlaceholder,
}) {
  const [generalSearch, setGeneralSearch] = useState('');
  const [personalSearch, setPersonalSearch] = useState('');
  const [currentActive, setCurrentActive] = useState(0);

  useEffect(() => {
    if (currentActive === 0) {
      // console.log('generalSearch', generalSearch);
      setPersonalSearch('');
    } else {
      // console.log('personalSearch', personalSearch);
      setGeneralSearch('');
    }
  }, [currentActive]);

  return (
    <div className="relative">
      <Tab.Group
        as="div"
        defaultIndex={0}
        onChange={(index) => {
          setCurrentActive(index);
        }}
      >
        <Tab.List
          style={{
            borderBottom: '1px solid #DFE4EC',
            paddingInline: '20px',
          }}
        >
          {['General prompt', 'My prompt'].map((itm, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                classNames(
                  selected ? 'border-primaryBlue text-[#19224C]' : 'border-transparent text-gray1',
                  'flex-1 whitespace-nowrap border-b-2 py-[12px] text-[14px] font-medium mr-[30px] focus:outline-0'
                )
              }
            >
              {itm}
            </Tab>
          ))}
        </Tab.List>
        <div className="px-[12px]">
          <Tab.Panels>
            <Tab.Panel>
              {/* SEARCH FIELD */}
              <div className="my-[12px] px-[8px]">
                <SearchInput
                  name="generalPSearch"
                  value={generalSearch}
                  onChange={(e) => {
                    setGeneralSearch(e.target.value);
                  }}
                />
              </div>
              <div className="h-[450px] overflow-y-auto">
                <div className="grid grid-cols-1 pt-[8px]">
                  {generalPromptList?.map((item, index) =>
                    item.length === 0 ? (
                      <div className="suggestion flex flex-col justify-end rounded-[6px] text-darkgray1 bg-lightblue1 p-[9px] text-[14px] cursor-pointer hover:bg-lightblue3">
                        <div className="flex items-center justify-between">No Prompt</div>
                      </div>
                    ) : (
                      <div className='px-[8px] hover:bg-[#F3F4F8] hover:rounded-[7px]'>
                        <div className="border-b border-gray py-[8px] selectText cursor-pointer" key={index}>
                          <div
                            className="flex items-start justify-center flex-col mb-[8px]"
                            onClick={(e) => {
                              // setChatInput({ chatText: item.prompt });
                              handleSendMessage(e, item);
                              setIsTypewriterDone(true);
                              setIsViewPrompts(false);
                              setClose(false);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <div className="capitalize text-[14px] font-medium cursor-pointer max-h-[30px] max-w-[380px] overflow-hidden whitespace-nowrap text-ellipsis">
                                {item?.name}
                              </div>
                            </div>
                            <div className="mt-[8px] text-gray1 max-h-[30px] max-w-[380px] overflow-hidden whitespace-nowrap text-ellipsis">
                              {item?.prompt}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {/* SEARCH FIELD */}
              <div className="my-[12px] px-[8px]">
                <SearchInput
                  name="PersonlaPSearch"
                  value={personalSearch}
                  onChange={(e) => {
                    setPersonalSearch(e.target.value);
                  }}
                />
              </div>
              {/* <div className="h-[calc(100vh-463px)] overflow-y-auto"> */}
              <div className="h-[450px] overflow-y-auto">
                <div className="grid grid-cols-1 pt-[8px]">
                  {promptList?.map((item, index) =>
                    item.length === 0 ? (
                      <div className="suggestion flex flex-col justify-end rounded-[6px] text-darkgray1 bg-lightblue1 p-[9px] text-[14px] cursor-pointer hover:bg-lightblue3">
                        <div className="flex items-center justify-between">No Prompt</div>
                      </div>
                    ) : (
                      <div className='px-[8px] hover:bg-[#F3F4F8] hover:rounded-[7px]'>
                        <div
                          className="flex justify-between border-b border-gray py-[8px] selectText cursor-pointer"
                          key={index}
                        >
                          <div
                            className="flex items-start grow justify-center flex-col mb-[8px] "
                            onClick={() => {
                              // console.log('item', item.prompt);
                              const regex = /\[(.*?)\]/g;
                              const matchesArr = item.prompt.match(regex);
                              if (matchesArr) {
                                // Remove brackets from each element in the array
                                const matches = matchesArr.map((element) => {
                                  return element.replace(/\[|\]/g, ''); // Use regex to remove square brackets
                                });
                                // console.log('matches', matches);
                                // console.log('multiplePlaceholder', multiplePlaceholder);
                                setMultiplePlaceholder({
                                  ...item,
                                  fields: matches,
                                });
                                handleUsePrompt(item);
                                setIsViewPrompts(false);
                              } else {
                                handleUsePrompt(item);
                                setIsViewPrompts(false);
                              }
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <div className="capitalize text-[14px] font-medium cursor-pointer max-h-[30px] max-w-[380px] overflow-hidden whitespace-nowrap text-ellipsis">
                                {item?.name}
                              </div>
                            </div>
                            <div className="mt-[8px] text-gray1 max-h-[30px] max-w-[380px] overflow-hidden whitespace-nowrap text-ellipsis">
                              {item?.prompt}
                            </div>
                          </div>
                          <CustomTooltip
                            maxWidth="430px"
                            place="top"
                            id={"PromptLibraryEdit" + index}
                            content={`<div class="capitalize font-normal text-[12px] leading-[18px]">Edit</div>`}
                          >
                            <button id={"PromptLibraryEdit" + index} className="cursor-pointer" onClick={() => handleCustomPrompt(item)}>
                              <img className="w-max" src={EditGrayIcon} />
                            </button>
                          </CustomTooltip>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </div>

      </Tab.Group>
      <CustomTooltip
        maxWidth="430px"
        place="top"
        id='AddPrompt'
        content={`<div class="capitalize font-normal text-[12px] leading-[18px]" > Add Prompt </div>`}
      >
        <button id='AddPrompt' className={`${currentActive === 1 ? 'block' : 'hidden'} absolute right-[20px] top-[16px] cursor-pointer`} onClick={() => handleNewPrompt()}>
          <img src={AddCircle} />
        </button>
      </CustomTooltip>
    </div>
  );
}

export default PromptComp;
