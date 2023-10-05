import React, { useState } from 'react';
import classNames from 'classnames';

import CustomTooltip from '../CustomTooltip/Tooltip';

import CheckedIcon from '../../utils/CheckedIcon.svg';
import settingIcon from '../../utils/MainScreen/Icons/settingIcon.svg';
import languageIcon from '../../utils/MainScreen/Icons/ion_language-sharp-blue.svg';
import { SelectLanguageComp } from './SelectLanguageComp';

export const FloatOptions = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelected = (id) => {
    const tmp = Array.from(selectedOptions);
    if (selectedOptions.includes(id)) {
      const updated = tmp.filter((i) => i !== id);
      setSelectedOptions(updated);
    } else {
      tmp.push(id);
      setSelectedOptions(tmp);
    }
  };

  return (
    <>
      <div className="flex flex-col-reverse gap-y-[8px]">
        <CustomTooltip
          isFloating
          maxWidth="430px"
          place="left"
          id="1"
          content={`<div class="capitalize font-normal text-[12px] leading-[18px]" > translation </div>`}
        >
          <div
            id="1"
            onClick={() => {
              handleSelected('1');
            }}
            className={classNames(
              `relative select-none rounded-full border border-transparent cursor-pointer w-[40px] h-[40px] flex justify-center items-center bg-lightblue1`,
              { '!border-primaryBlue bg-lightblue6': selectedOptions.includes('1') }
            )}
            // className={`select-none rounded-full cursor-pointer w-[40px] h-[40px] flex justify-center items-center bg-lightblue1`}
          >
            <img src={languageIcon} alt="languageIcon" />
            {selectedOptions.includes('1') && (
              <img className="absolute bottom-0 right-0" src={CheckedIcon} alt="CheckedIcon" />
            )}
          </div>
        </CustomTooltip>
        <CustomTooltip
          isFloating
          maxWidth="430px"
          place="left"
          id="2"
          content={`<div class="capitalize font-normal text-[12px] leading-[18px]" > Language Option </div>`}
        >
          <div className="relative">
            <div
              id="2"
              onClick={() => {
                handleSelected('2');
              }}
              // className={classNames(
              //   `relative select-none rounded-full border border-transparent cursor-pointer w-[40px] h-[40px] flex justify-center items-center bg-lightblue1`,
              //   { '!border-primaryBlue bg-lightblue6': selectedOptions.includes('2') }
              // )}
              className={`relative select-none rounded-full cursor-pointer w-[40px] h-[40px] flex justify-center items-center bg-lightblue1`}
            >
              <img src={settingIcon} alt="settingIcon" />
            </div>
            <SelectLanguageComp isOpen={selectedOptions.includes('2')} />
          </div>
        </CustomTooltip>
      </div>
    </>
  );
};
