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
  const [compLoading, setCompLoading] = useState(false);
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
        setCompLoading(false)
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
        setCompLoading(false)
        setSaveTemplateBox(false);
        setTemplateInput('');
        navigate('/savedtemplates');
      }
    }
  };
  // const defaultOption = options[0];

  return (
    <div className={`${saveTemplateBox ? 'block' : 'hidden'} ${compLoading ? 'pointer-events-none' : 'pointer-events-auto'}`}>
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
              <span className='text-[20px]'>Save Template</span>
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
           isSearchable={false}
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
                top: '-5px',
                ':hover': {
                  cursor: 'pointer'
                }
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
                  cursor:'pointer',
                  height: '26px',
                  lineHeight: '7px',
                  padding: '10px 12px',
                  // minWidth: '143px',
                  ':hover': {
                    cursor: 'pointer'
                  }
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
              onClick={(e) => {setCompLoading(true); handleSaveTemplate(e)}}
              disabled={!templateInput.templatename || !selectedOption}
            >
              {compLoading ? (
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Save</span>
                </div>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
