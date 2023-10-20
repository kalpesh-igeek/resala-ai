import React, { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import ArrowDown from '../../utils/PopupBox/Icons/ArrowDown.svg';
import ArrowUp from '../../utils/PopupBox/Icons/arrow-up.svg';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const tones = [
  { name: 'Professional' },
  { name: 'Casual' },
  { name: 'Straight' },
  { name: 'Confident' },
  { name: 'Friendly' },
];

const languages = [
  { name: 'English' },
  { name: 'Spanish' },
  { name: 'French' },
  { name: 'Arabic' },
  { name: 'Chinese' },
  { name: 'Hindi' },
];

const QuickReplySettings = () => {
  const [selectedTone, setSelectedTone] = useState(tones[2]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[1]);

  const [dropDown, setDropDown] = useState(false);

  const [selectedItems, setSelectedItems] = useState([{ name: selectedTone.name }, { name: selectedLanguage.name }]);

  const handleToggle = () => {
    setDropDown(!dropDown);
  };

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <div className="w-full">
          <div className="flex gap-2">
            <div className="text-[16px] text-darkBlue font-medium mb-[5px]">Quick Reply</div>
            <div className={`cursor-pointer`} onClick={handleToggle}>
              {dropDown ? (
                <img
                  className="w-[20px]"
                  src={ArrowUp}
                  // style={{ transform: `rotate(${dropDown ? '-180' : '0'}deg)` }}
                />
              ) : (
                <img
                  className="w-[20px]"
                  src={ArrowDown}
                  // style={{ transform: `rotate(${dropDown ? '-180' : '0'}deg)` }}
                />
              )}
            </div>
          </div>
          <div className="text-[14px] text-darkgray1">Display "quick reply" entry on the email page</div>
        </div>
        <div className="flex items-center gap-2">
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
      <div className={`${dropDown ? 'block' : 'hidden'}`}>
        <label for="actions" className="block text-[10px] font-medium leading-6 text-gray1 mt-[15px]">
          TONE
        </label>
        <RadioGroup value={selectedTone} onChange={setSelectedTone}>
          <div className="inline-flex gap-2 items-center">
            {tones.map((tone, index) => (
              <RadioGroup.Option
                name="length"
                key={tone.name}
                value={tone}
                // onClick={(e) => handleInputTone(e, index, tone)}
                className={({ active, checked }) =>
                  classNames(
                    'cursor-pointer text-darkBlue',
                    active || checked ? 'border-lightblue bg-lightblue1' : '',
                    'w-[64px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[10px] font-medium hover:border-lightblue hover:bg-lightblue1'
                  )
                }
              >
                <RadioGroup.Label as="span">{tone.name}</RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>

        <label for="actions" className="block text-[10px] font-bold leading-6 text-gray1 uppercase mt-[15px]">
        Compose Language
        </label>
        <RadioGroup value={selectedLanguage} onChange={setSelectedLanguage}>
          <div className="inline-flex gap-2 items-center">
            {languages.map((language, index) => (
              <RadioGroup.Option
                name="length"
                key={language.name}
                value={language}
                // onClick={(e) => handleInputLanguage(e, index, language)}
                className={({ active, checked }) =>
                  classNames(
                    'cursor-pointer text-darkBlue',
                    active || checked ? 'border-lightblue bg-lightblue1' : '',
                    'w-[64px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[10px] font-medium hover:border-lightblue hover:bg-lightblue1'
                  )
                }
              >
                <RadioGroup.Label as="span">{language.name}</RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </>
  );
};
export default QuickReplySettings;
