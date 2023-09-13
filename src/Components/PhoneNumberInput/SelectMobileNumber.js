import React, { Fragment, useEffect, useRef, useState } from 'react';
import { getCountryCallingCode } from 'react-phone-number-input';
import { getCountries } from 'react-phone-number-input';
import countryNames from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import arrowIcon from '../../utils/Account/Icons/arrow-down.svg';
import searchIcon from '../../utils/Account/Icons/Icons.svg';

const SelectMobileNumber = () => {
  const [number, setNumber] = useState(`+${getCountryCallingCode('US')}`);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('US');
  const [countryCode, setCountryCode] = useState(getCountryCallingCode('US'));
  const [isDropdown, setIsDropdown] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const myPromptRef = useRef(null);

  //myprompt
  useEffect(() => {
    function handleClickOutside(event) {
      if (myPromptRef.current && !myPromptRef.current.contains(event.target)) {
        setIsDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myPromptRef, setIsDropdown]);

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

  const handleOnPhoneChange = (e) => {
    const value = e.target.value;
    setNumber(value);
    setIsValid(value.length > 2 && isValidPhoneNumber(value));
  };

  const handleOnChangeSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <div
        className={`relative p-[1px]  w-full rounded-[7px] justify-between cursor-pointer flex items-center text-[14px] gap-2`}
      >
        <div
          onClick={() => setIsDropdown(!isDropdown)}
          className="flex gap-3 justify-center items-center rounded-[7px] border-gray border relative px-[20px] py-[10px]"
        >
          <img
            className="w-[28px] h-[28px]"
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
            alt=""
          />
          {/* <ArrowIcon className={`transform transition-transform duration-200 ${isDropdown ? 'rotate-180' : ''}`} />{' '} */}
          <img
            className={`transform transition-transform duration-200 ${isDropdown ? 'rotate-180' : ''}`}
            src={arrowIcon}
          />
          {/* Rotate the arrow icon when dropdown is open */}
        </div>
        <input
          className="border-gray rounded-md border text-gray1 w-[100%] max-w-[262px] px-[20px] py-[15px]"
          value={number}
          type="number"
          onChange={(e) => {
            handleOnPhoneChange(e);
          }}
        />
        {isDropdown && (
          <div
            ref={myPromptRef}
            style={{ boxShadow: '0px 0px 10px 0px #00000026' }}
            className="absolute z-30 w-full top-[55px] border-[1px]  border-gray rounded-[7px] h-[288px] overflow-y-auto left-0 bg-white"
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
              <div>
                {countries &&
                  countries.map((itm, index) => (
                    <div
                      key={index}
                      className={`relative flex justify-between px-[10px] py-[6px] text-lightBlue h-[32px] hover:!bg-lightGray rounded-[7px] mb-[8px] ${
                        country === itm && 'bg-lightGray'
                      } `}
                      onClick={() => {
                        setCountry(itm);
                        setIsDropdown(false);
                        setCountryCode(getCountryCallingCode(itm));
                        setNumber(`+${getCountryCallingCode(itm)}`);
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
                      {country === itm && (
                        <div className="absolute right-[9px] top-[9px]">
                          {/* <img src={CheckedIcon} alt="CheckedIcon" /> */}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectMobileNumber;
