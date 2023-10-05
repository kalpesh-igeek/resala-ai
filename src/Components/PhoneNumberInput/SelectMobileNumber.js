import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { getCountryCallingCode } from 'react-phone-number-input';
import { getCountries } from 'react-phone-number-input';
import countryNames from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';
import {
  isValidPhoneNumber,
  formatPhoneNumber,
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from 'react-phone-number-input';
import arrowIcon from '../../utils/Account/Icons/arrow-down.svg';
import searchIcon from '../../utils/Account/Icons/Icons.svg';

import en from 'react-phone-number-input/locale/en';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';

const SelectMobileNumber = ({ setInputValue }) => {
  const countryRef = useRef(null);
  const [value, setValue] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [countryLib, setCountryLib] = useState('US');
  const [searchInput, setSearchInput] = useState('');
  const [countries, setCountries] = useState(getCountries());

  const handleCountrySelect = (countryName) => {
    setCountryLib(countryName);
    setValue(`+${getCountryCallingCode(countryName)}`);
  };

  // dorpDownRef
  useEffect(() => {
    function handleClickOutside(event) {
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [countryRef, setIsOpen]);

  useEffect(() => {
    const names = getCountries();
    let filteredData = names;

    if (searchInput) {
      filteredData = names.filter((el) => {
        const lowerCaseEl = el.toLowerCase();
        const lowerCaseSearchInput = searchInput.toLowerCase();
        return (
          lowerCaseEl.includes(lowerCaseSearchInput) || countryNames[el].toLowerCase().includes(lowerCaseSearchInput)
        );
      });
    }

    setCountries(filteredData);
  }, [searchInput]);

  useEffect(() => {
    setCountries(getCountries());
  }, []);

  const handleOnChangeSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleNumberChange = (data) => {
    setValue(data);
    setInputValue((prev) => {
      return {
        ...prev,
        phone_number: data,
      };
    });
  };

  return (
    <div className="relative">
      {/* COUNTRY SELECT COMPONENT */}
      <div
        ref={countryRef}
        style={{ display: !isOpen ? 'none' : 'block', boxShadow: '0px 0px 10px 0px #00000026' }}
        className="absolute z-30 w-full top-[52px] border-[1px]  border-gray rounded-[7px] h-[288px] overflow-y-auto left-0 bg-white"
      >
        <div className="relative">
          <input
            placeholder="Search for country"
            className="border-b-gray border-b-[1px] text-gray1 h-[40px] w-full pl-[40px] focus:outline-none placeholder:text-gray1"
            name="searchInput"
            value={searchInput}
            onChange={handleOnChangeSearch}
          />
          <div className="absolute top-[11px] left-[16px]">
            <img src={searchIcon} alt="search" className="" />
          </div>
        </div>
        <div className="bg-white px-[8px] py-[6px]">
          {countries &&
            countries.map((itm, index) => (
              <div
                key={index}
                className={`relative flex cursor-pointer justify-between px-[10px] py-[6px] text-lightBlue h-[32px] rounded-[7px] mb-[8px] hover:bg-gray4 `}
                onClick={() => {
                  setIsOpen(false);
                  handleCountrySelect(itm || undefined);
                }}
              >
                <div className="flex gap-2 items-center">
                  <img
                    className="w-[28px]"
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${itm}.svg`}
                  />
                  <div className="text-[12px] text-darkBlue font-medium">{countryNames[itm]}</div>
                </div>
                <div className="text-[14px] text-gray2">
                  {'+'}
                  {getCountryCallingCode(itm)}
                </div>
                {countryLib === itm && (
                  <div className="absolute right-[9px] top-[9px]">
                    {/* <img src={CheckedIcon} alt="CheckedIcon" /> */}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <PhoneInput
        onFocus={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onBlur={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        international
        value={value}
        onChange={(value) => {
          handleNumberChange(value);
        }}
        defaultCountry="US"
        placeholder="Enter phone number"
        countryCallingCodeEditable={false}
        countrySelectComponent={(props) => {
          console.log(props);
          const { value } = props;
          return (
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex cursor-pointer gap-[6px] p-[10px] border-[1px] border-gray mr-[8px] items-center rounded-[6px]"
            >
              <img
                className="w-[26px] h-[28px]"
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value}.svg`}
                alt=""
              />
              <img
                className={`transform w-[14px] h-[14px] transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                src={arrowIcon}
              />
            </div>
          );
        }}
        error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'}
      />
    </div>
  );
};

export default SelectMobileNumber;
