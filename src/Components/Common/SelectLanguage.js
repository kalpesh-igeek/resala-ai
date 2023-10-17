import React from 'react';
import Select, { components } from 'react-select';
import ArrowDown from '../../utils/PopupBox/Icons/ArrowDown.svg';

export const SelectLanguage = ({ isOpen, setClose, active, options }) => {
  // console.log({ isOpen, setClose, active, options });

  const CustomOption = ({ data, ...props }) => (
    <components.Option {...props}>
      <div className="flex items-center gap-2 ">
        <span>{data.label}</span>
      </div>
    </components.Option>
  );

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <img
            className={`absolute w-[16px] h-[16px]`}
            style={{
              right: props.selectProps.menuIsOpen ? '-10px' : '10px',
              top: props.selectProps.menuIsOpen ? ' 0px' : '22%',
              transform: props.selectProps.menuIsOpen && 'rotate(180deg)',
            }}
            src={ArrowDown}
            // style={{ transform: props.selectProps.menuIsOpen && 'rotate(180deg)' }}
          />
        </components.DropdownIndicator>
      )
    );
  };

  const SingleValue = ({ data, ...props }) => (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2 text-black">
        <span>{data.label}</span>
      </div>
    </components.SingleValue>
  );

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'transparent',
      padding: 0,
      border: 'none',
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        border: 'none',
      },
      color: 'black',
      height: '26px',
      minHeight: '26px',
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
      boxShadow: '0px 2px 20px 0px #00000026',
      width: '182px',
      minWidth: '182px',
      right: '2px',
      top: '-257px',
      // right: '-1px',
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
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
        height: '26px',
        lineHeight: '7px',
        padding: '5px 8px',
        display: 'flex',
        alignItems: 'center',
        // minWidth: '143px',
      };
    },
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
      width: '14px',
      height: '14px',
      // right: '5px',
    }),
  };
  return (
    <div className="cursor-pointer border border-[#DFE4EC] relative flex text-[12px] w-[120px] items-center gap-2 rounded-[4px] py-[2px]">
      <Select
        id="language-select"
        className="w-full"
        components={{ Option: CustomOption, SingleValue, DropdownIndicator }}
        options={options.map((itm) => ({
          value: itm.title,
          label: itm.title,
          active: itm.active,
        }))}
        defaultValue={{
          value: active.title,
          label: active.title,
          active: active.active,
        }}
        styles={customStyles}
        onChange={(e) => {
          // console.log('--->', e);
        }}
        // onChange={handleChatTypeChange}
        // menuIsOpen={true}
      />
    </div>
  );
};
