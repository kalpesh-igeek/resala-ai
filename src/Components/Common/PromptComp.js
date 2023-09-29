import React from 'react';
import classNames from 'classnames';
import { Tab } from '@headlessui/react';
import InputField from '../InputField';
import SearchIcon from '../../utils/Chat/Icons/SearchIcon.svg';

function PromptComp() {
  return (
    <>
      <Tab.Group as="div" defaultIndex={0}>
        <Tab.List
          style={{
            boxShadow: '0px 2px 8px 0px #0000000D',
            paddingInline:'20px'
          }}
        >
          {['General prompt', 'My prompt'].map((itm, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                classNames(
                  selected ? 'border-primaryBlue text-black' : 'border-transparent text-gray1',
                  'flex-1 whitespace-nowrap border-b-2 py-[12px] text-[14px] font-medium mr-[30px] focus:outline-0'
                )
              }
            >
              {itm}
            </Tab>
          ))}
        </Tab.List>
        <div className="my-[12px] border border-gray items-center flex rounded-md px-[9px] mx-[20px]">
          <img src={SearchIcon} alt="s" />
          <InputField
            className="block w-full rounded-md border-0 px-[9px] py-[7px] text-[12px] text-darkBlue placeholder:text-gray1 focus:outline-0"
            name="search"
            label=""
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="px-[20px]">
          <Tab.Panels>
            <Tab.Panel>General prompt Content 2</Tab.Panel>
            <Tab.Panel>My prompt Content 1</Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </>
  );
}

export default PromptComp;
