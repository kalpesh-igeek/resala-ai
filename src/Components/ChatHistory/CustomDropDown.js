import React from 'react';
import Dropdown from 'react-dropdown';
import ArrowDown from '../../utils/PopupBox/Icons/ArrowDown.svg'; // Assuming you've imported the ArrowDown icon

const CustomDropdown = ({ options, onChange }) => {
  const renderOption = (option) => (
    <div className="custom-dropdown-option">
      <img src={option.icon} className="dropdown-option-icon" />
      <span className="dropdown-option-title">{option.label}</span>
    </div>
  );

  return (
    <Dropdown
      options={options}
      placeholder="All chat history"
      arrowClosed={<img className="dropdown-arrow" src={ArrowDown} />}
      arrowOpen={<img className="dropdown-arrow rotated" src={ArrowDown} />}
      onChange={onChange}
      controlClassName="dropdown-control"
      arrowClassName="dropdown-arrow-container"
      menuClassName="dropdown-menu"
      //   value=""
      //   renderOption={renderOption}
    />
  );
};

export default CustomDropdown;
