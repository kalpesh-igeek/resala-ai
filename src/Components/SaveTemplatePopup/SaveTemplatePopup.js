import React, { useEffect, useRef, useState } from 'react';
import SaveTemplate from '../../utils/MainScreen/Icons/SaveTemplate.svg';
import Close from '../../utils/MainScreen/Icons/Close.svg';
import Dropdown from 'react-dropdown';
import ArrowDown from '../../utils/PopupBox/Icons/ArrowDown.svg';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { templateCheck } from '../../utils/validation';
import { addTemplate, addTemplateQuickReply, getTemplateType } from '../../redux/reducers/templateSlice/TemplateSlice';
import { useNavigate } from 'react-router-dom';

export default function SaveTemplatePopup({ saveTemplateBox, setSaveTemplateBox, draftResponse, module }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState();
  const [errors, setErrors] = useState({});
  const [templateInput, setTemplateInput] = useState({
    templatename: '',
  });
  const [templateType, setTemplateType] = useState([]);
  const saveTemplateRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (saveTemplateRef.current && !saveTemplateRef.current.contains(event.target)) {
        setSaveTemplateBox(false);
        setTemplateInput('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [saveTemplateRef, setSaveTemplateBox]);

  const fetchTemplateType = async () => {
    const res = await dispatch(getTemplateType());

    if (!res.payload) {
      return;
    }

    if (res.payload.status === 200) {
      setTemplateType(res.payload?.Result);
      // setTotalData(res.payload?.totalCount);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplateType();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplateInput({
      ...templateInput,
      [name]: value,
    });

    if (errors[name])
      setErrors((error) => {
        let errorNew = { ...error };
        delete errorNew[name];
        return errorNew;
      });
  };

  const handleSaveTemplate = async (e) => {
    e.preventDefault();
    let errors;
    errors = templateCheck(templateInput);
    if (Object.keys(errors)?.length) {
      setErrors(errors);
      return;
    }
    if (module === 'quickReply') {
      // console.log('first');
      const payload = {
        template_name: templateInput?.templatename,
        template_type: selectedOption?.value,
        tone: draftResponse?.tone,
        language: draftResponse?.language,
        sender_intent: draftResponse?.sender_intent,
        generate_mail: draftResponse?.generate_mail,
      };
      const res = await dispatch(addTemplateQuickReply(payload));
      if (!res.payload) {
        return;
      }
      if (res.payload?.status === 200) {
        setSaveTemplateBox(false);
        setTemplateInput('');
        navigate('/savedtemplates');
      }
    } else {
      // console.log('second');
      const payload = {
        name: templateInput?.templatename,
        type: selectedOption?.value,
        action: draftResponse?.action,
        length: draftResponse?.length,
        tone: draftResponse?.tone,
        language: draftResponse?.language,
        input_text: draftResponse?.input_text,
        output_text: draftResponse?.output_text,
      };
      const res = await dispatch(addTemplate(payload));
      if (!res.payload) {
        return;
      }
      if (res.payload?.status === 200) {
        setSaveTemplateBox(false);
        setTemplateInput('');
        navigate('/savedtemplates');
      }
    }
  };
  // const defaultOption = options[0];

  return (
    <div className={`${saveTemplateBox ? 'block' : 'hidden'}`}>
      <div className="fixed top-0 bottom-0 right-0 w-[500px] bg-black z-[60] opacity-40"></div>
      <div
        ref={saveTemplateRef}
        className="fixed rounded-[10px] bg-white p-[20px] right-[20px] top-[50%] -translate-y-2/4 z-[70] w-[460px] h-[257px]"
        style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
        // show={open}
      >
        <div className="pt-[8px] pb-[20px] text-[22px] font-medium text-darkBlue">
          <div className="flex items-center justify-between">
            <div className="gap-2 flex items-center">
              <div className="bg-blue-200 w-[28px] h-[28px] rounded-full flex justify-center items-center hover:bg-blue-200">
                <img src={SaveTemplate} />
              </div>
              <span>Save Template</span>
            </div>
            <div
              className="cursor-pointer -mt-[30px]"
              onClick={() => {
                setSaveTemplateBox(false);
                setTemplateInput('');
              }}
            >
              <img src={Close} />
            </div>
          </div>
        </div>
        <div className="col-span-full mb-[15px]">
          <input
            id="templatename"
            name="templatename"
            type="text"
            placeholder="Name the template"
            className="block w-full rounded-md border text-[14px] border-gray px-[15px] py-[11px] text-darkBlue placeholder:text-gray1"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-span-full mb-[15px]">
          <Select
            className="border border-gray rounded-md mb-[15px] p-[10px] text-[14px] placeholder:text-gray1"
            menuPlacement="bottom"
            name="templateType"
            defaultValue="Select template type"
            onChange={setSelectedOption}
            // options={templateType}
            options={templateType.map((item) => ({ value: item.id, label: item.name }))}
            placeholder="Select template type"
            // onBlur={handleBlur}
            // onFocus={() => setIsMenuOpen(true)}
            // isMenuOpen={isMenuOpen}
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
                width: '420px',
                minWidth: '420px',
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
              dropdownIndicator: (provided, state) => ({
                ...provided,
                transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
              }),
              placeholder: (base) => ({
                ...base,
                color: '#8C90A5',
              }),
            }}
          />
        </div>
        <div className="mt-1 flex justify-end">
          <div className="flex gap-2 items-center">
            <button
              className="rounded-md bg-white focus:outline-none px-[16px] py-[10px] text-[16px] font-medium text-darkBlue border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
              onClick={() => {
                setSaveTemplateBox(false);
                setTemplateInput('');
              }}
            >
              Cancel
            </button>
            <button
              className={`rounded-md bg-primaryBlue focus:outline-none px-[16px] py-[10px] text-[16px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50 ${
                !templateInput.templatename || templateInput.templatename?.trim() === '' || !selectedOption
                  ? 'opacity-50 bg-lightblue4 cursor-not-allowed'
                  : ''
              }`}
              onClick={(e) => handleSaveTemplate(e)}
              disabled={!templateInput.templatename || !selectedOption}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
