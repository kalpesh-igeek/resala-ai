import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Close from '../utils/MainScreen/Icons/Close.svg';
import ApplyPrompt from '../utils/PopupBox/Icons/ApplyPrompt.svg';
import CopyIcon from '../utils/Chat/Icons/copy.svg';

export default function GeneralPromptViewPopup({
  selectedPrompt,
  setSelectedPrompt,
  setIsUsePrompt,
  isGeneralPromptViewPopup,
  setIsGeneralPromptViewPopup,
  setIsViewPrompts,
}) {
  const navigate = useNavigate();
  const [inputPrompt, setInputPrompt] = useState('');

  const handleDeleteTemplate = () => {
    setIsGeneralPromptViewPopup(false);
    setSelectedPrompt('');
    setInputPrompt('');
  };

  const handlePromptInput = (e) => {
    setInputPrompt(e.target.value);
  };
  // const handleChange = (e) => {
  //   const { name, value, checked } = e.target;
  //   const val = checked || value;
  //   setSignUp({
  //     ...signUp,
  //     [name]: val,
  //   });
  //   if (errors[name])
  //     setErrors((error) => {
  //       let errorNew = { ...error };
  //       delete errorNew[name];
  //       return errorNew;
  //     });
  // };

  const handleUsePrompt = () => {
    setIsViewPrompts(false);
    setIsGeneralPromptViewPopup(false);
    setIsUsePrompt(true);
    navigate('/');
    setInputPrompt('');
  };

  return (
    <div className={`${isGeneralPromptViewPopup ? 'block' : 'hidden'}`}>
      <div className="fixed top-0 bottom-0 right-0 w-[500px] bg-black opacity-40 z-[60]"></div>
      <div
        className="absolute rounded-[10px] bg-white p-[20px] right-[20px] top-[50%] -translate-y-2/4 z-[70] w-[460px]"
        style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
        // show={open}
      >
        <div className="pt-[8px] pb-[20px] text-[22px] font-medium text-darkBlue">
          <div className="flex items-center justify-between">
            <div className="gap-2 flex items-center">
              <span>{selectedPrompt.name}</span>
            </div>
            <div className="cursor-pointer -mt-[30px]" onClick={() => handleDeleteTemplate()}>
              <img src={Close} />
            </div>
          </div>
        </div>
        <div className="col-span-full mb-[20px]">
          <div className="text-[14px] text-gray1 mb-[8px]">{selectedPrompt.prompt}</div>
        </div>
        <div>
          <div className="flex justify-between">
            <label className="text-[14px] text-gray1 font-medium">PROMPT</label>
            <img src={CopyIcon} className="cursor-pointer" />
          </div>
          <textarea
            style={{ resize: 'none' }}
            id="promptText"
            name="promptText"
            rows="10"
            value={inputPrompt.prompt}
            placeholder="Give me 5 brainstorm ideas about [topic or keyword]."
            className="text-[14px] border-gray block w-full rounded-0 border p-[12px] mt-[4px] rounded-lg"
            onChange={(e) => handlePromptInput(e)}
          />
        </div>
        <div className="mt-[20px] flex justify-end">
          <div className="flex gap-2 items-center">
            <button
              className="flex gap-[10px] rounded-md bg-primaryBlue px-[16px] py-[10px] text-[16px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
              onClick={() => handleUsePrompt()}
            >
              <img src={ApplyPrompt} alt="Not found" />
              Use Prompt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
