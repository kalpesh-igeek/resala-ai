import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from '../../Components/Typewriter';
// import SaveTemplate from '../utils/SavedTemplates/Icons/SaveTemplate.svg';
import EditIcon from '../../utils/SavedTemplates/Icons/edit-2.svg';
import Select from 'react-select';
import { getTemplateType } from '../../redux/reducers/templateSlice/TemplateSlice';
import { useDispatch } from 'react-redux';

const Template = ({ selectedTemplate, setActiveTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  console.log('selected', selectedTemplate);

  const fetchTemplateType = async () => {
    const res = await dispatch(getTemplateType());

    if (!res.payload) {
      return;
    }

    if (res.payload.status === 200) {
      setOptions(res.payload?.Result);
    }
  };

  useEffect(() => {
    fetchTemplateType();
  }, []);

  return (
    <div className="px-[20px] py-[12px] relative mt-[12px]">
      <div className="col-span-full">
        <div className="w-full flex gap-2 justify-center mb-[8px]">
          <div className="w-full">
            <label for="input" className="block text-[12px] font-bold leading-6 text-gray1">
              TEMPLATE NAME
            </label>
            <input
              id="requestedText"
              name="input_text"
              value={selectedTemplate?.name}
              // onChange={(e) => handleChangeCompose(e)}
              placeholder="Lorem ipsum dolor sit amet consectetur."
              className="block w-full rounded-md border border-gray mt-[4px] px-7 py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray1"
            />
          </div>
          <div className="w-full">
            <label for="input" className="block text-[12px] font-bold leading-6 text-gray1 mb-[4px]">
              TEMPLATE TYPE
            </label>
            {/* align-items: center; width: 100%; height: 52px; display: inline-grid; */}
            {/* <Select
              className="border border-gray rounded-md p-[9px] h-[52px] w-full inline-grid text-[14px] placeholder:text-gray1"
              menuPlacement="bottom"
              name="templateType"
              defaultValue={{
                label: selectedTemplate?.type?.name,
                value: selectedTemplate?.type?.id,
              }}
              // onChange={(e) => handleChangeCompose(e)}
              options={options.map((item) => ({ value: item.id, label: item.name }))}
              styles={{
                control: (base) => ({
                  ...base,
                  height: '30px',
                  minHeight: '30px',
                  border: 0,
                  boxShadow: 'none',
                }),
                menu: (base) => ({
                  ...base,
                  width: '224px',
                  minWidth: '224px',
                  right: '-1px',
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
                    padding: '10px 12px',
                    // minWidth: '143px',
                  };
                },
                placeholder: (base) => ({
                  ...base,
                  color: '#8C90A5',
                }),
                dropdownIndicator: (provided, state) => ({
                  ...provided,
                  transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
                }),
              }}
            /> */}
            <input
              id="requestedText"
              name="input_text"
              // value={selectedText.input_text}
              value={selectedTemplate?.type?.name}
              // onChange={(e) => handleChangeCompose(e)}
              placeholder="Lorem ipsum dolor sit amet consectetur."
              className="block w-full rounded-md border border-gray mt-[4px] px-7 py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray1"
            />
          </div>
        </div>
        <div className="pb-[20px] mt-[8]">
          <div className="flex justify-between item-center">
            <label for="input" className="block text-[12px] font-bold leading-6 text-gray1 whitespace-nowrap">
              SAVED TEMPLATE
            </label>
            <div>
              <button
                className="flex gap-1 items-center w-full rounded-md bg-white text-[12px] font-medium text-primaryBlue"
                onClick={() => {
                  navigate('/', {
                    state: {
                      template: selectedTemplate,
                      edit: true,
                    },
                  });
                  setActiveTab('selection');
                }}
              >
                <span className="text-primaryBlue">Edit Template</span>
                <img src={EditIcon} />
              </button>
            </div>
          </div>
          <textarea
            style={{ resize: 'none' }}
            id="requestedText"
            name="reply"
            rows="30"
            value={selectedTemplate.output_text}
            // onChange={(e) => handleChangeCompose(e)}
            placeholder="Lorem ipsum dolor sit amet consectetur."
            className="text-[14px] border-gray block w-full rounded-md border p-1.5"
          />
        </div>
      </div>

      <div className="mt-1">
        <div className="flex gap-2 items-center">
          <button
            className="w-full rounded-md bg-white px-1 py-[10px] text-[16px] font-medium text-darkgray1 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
            // disabled={resultText !== '' ? '' : 'disabled'}
            // onClick={handleCopyDraft}
          >
            Copy
          </button>
          <button
            className="w-full rounded-md focus:outline-none bg-primaryBlue px-1 py-[10px] text-[16px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
            // disabled={resultText !== '' ? '' : 'disabled'}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Template;
