import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import TranslateIcon from '../../utils/Chat/Icons/TranslateIcon.svg';
import { respondLanguage } from '../../redux/reducers/userSlice/UserSlice';
import { useDispatch } from 'react-redux';

export const SelectLanguageComp = ({ isOpen }) => {
  const selectRef = useRef();
  const languageRef = useRef();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [languageList, setLanguageList] = useState([]);

  const fetchRespondLanguage = async () => {
    const res = await dispatch(respondLanguage());
    if (!res.payload) return;
    if (res.payload.status === 200) {
      setLanguageList(res.payload?.Result);
    }
  };

  const handleBlur = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    fetchRespondLanguage();
  }, []);

  return (
    <>
      <div
        ref={languageRef}
        className={`chats-settings w-[203px] p-[10px] flex flex-col gap-2 absolute right-[40px] bottom-[0px] bg-white rounded-[8px] ${
          isOpen ? '!block' : '!hidden'
        }`}
        style={{
          zIndex: 999999,
          boxShadow: '0px 2px 20px 0px #00000026',
        }}
      >
        <div className="flex gap-x-[10px] justify-between mb-[8px]">
          <div className="min-w-[50px] text-[14px] flex items-center gap-2 text-darkblue">Source:</div>
          <Select
            className="border p-[2px] w-[111px] border-gray text-gray1 hover:text-darkBlue rounded-md text-[14px]"
            menuPlacement="top"
            defaultValue={'English'}
            onChange={(e) => {
              e.preventDefault();
              console.log(e);
            }}
            // onChange={setSelectedOption}
            options={languageList.map((data) => ({
              value: data.id,
              label: data.language,
            }))}
            // onBlur={handleBlur}
            // onFocus={() => setIsMenuOpen(true)}
            isMenuOpen={isMenuOpen}
            // menuIsOpen={true}
            styles={{
              control: (base) => ({
                ...base,
                height: '21px',
                minHeight: '21px',
                border: 0,
                boxShadow: 'none',
              }),
              menu: (base) => ({
                ...base,
                width: '111px',
                minWidth: '111px',
                right: '0px',
              }),
              option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                // const color = chroma(data.color);
                // console.log({ data, isDisabled, isFocused, isSelected });
                return {
                  ...styles,
                  backgroundColor: isFocused ? '#F3F4F8' : null,
                  color: !isFocused ? '#8C90A5' : '#19224C',
                  margin: '8px',
                  width: 'auto',
                  borderRadius: '4px',
                  height: '21px',
                  lineHeight: '7px',
                  // padding: '4px 0px 4px 8px',
                  // minWidth: '143px',
                };
              },
              dropdownIndicator: (provided, state) => ({
                ...provided,
                transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
              }),
            }}
          />
        </div>

        <div className="flex gap-x-[10px] justify-between" ref={selectRef}>
          <div className="min-w-[50px] text-[14px] flex items-center gap-2 text-darkblue">Target:</div>

          <Select
            className="border p-[2px] w-[111px] border-gray text-gray1 hover:text-darkBlue rounded-md text-[14px]"
            menuPlacement="top"
            defaultValue={'English'}
            onChange={(e) => {
              e.preventDefault();
              console.log(e);
            }}
            // onChange={setSelectedOption}
            options={languageList.map((data) => ({
              value: data.id,
              label: data.language,
            }))}
            // onBlur={handleBlur}
            // onFocus={() => setIsMenuOpen(true)}
            isMenuOpen={isMenuOpen}
            // menuIsOpen={true}
            styles={{
              control: (base) => ({
                ...base,
                height: '21px',
                minHeight: '21px',
                border: 0,
                boxShadow: 'none',
              }),
              menu: (base) => ({
                ...base,
                width: '111px',
                minWidth: '111px',
                right: '0px',
              }),
              option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                // const color = chroma(data.color);
                // console.log({ data, isDisabled, isFocused, isSelected });
                return {
                  ...styles,
                  backgroundColor: isFocused ? '#F3F4F8' : null,
                  color: !isFocused ? '#8C90A5' : '#19224C',
                  margin: '8px',
                  width: 'auto',
                  borderRadius: '4px',
                  height: '21px',
                  lineHeight: '7px',
                  // padding: '4px 0px 4px 8px',
                  // minWidth: '143px',
                };
              },
              dropdownIndicator: (provided, state) => ({
                ...provided,
                transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
              }),
            }}
          />
        </div>
      </div>
    </>
  );
};
