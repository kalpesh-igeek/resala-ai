import React from 'react';
import SearchIcon from '../../utils/Chat/Icons/SearchIcon.svg';
import InputField from '../InputField';

export const SearchInput = ({name,onChange,value}) => {
  return (
    <>
      <div className="border border-gray items-center flex rounded-md px-[9px] py-1">
        <img src={SearchIcon} alt="s" />
        <InputField
          label=""
          className="block w-full rounded-md border-0 px-[9px] py-[7px] text-[12px] text-darkBlue placeholder:text-gray1 focus:outline-0"
          name={name}
          type="text"
          handleChange={onChange}
          value={value}
          placeholder="Search"
        />
      </div>
    </>
  );
};