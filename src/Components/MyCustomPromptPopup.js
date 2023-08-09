import React, { useState, useEffect } from 'react';
import Close from '../utils/MainScreen/Icons/Close.svg';

const MyCustomPromptPopup = ({
  isEdit,
  isCustomPromptBox,
  setIsCustomPromptBox,
  customSelectedPrompt,
  setCustomSelectedPrompt,
}) => {
  const [newPrompt, setNewPrompt] = useState({
    title: '',
    prompt: '',
  });
  const handlePromptInput = (e) => {
    const { name, value } = e.target;

    setCustomSelectedPrompt({
      ...customSelectedPrompt,
      [name]: value,
    });
  };

  const handleClose = () => {
    // setNewPrompt({ title: '', prompt: '' });
    setIsCustomPromptBox(false);
  };

  const handleSubmit = () => {
    // setIsCustomPromptBox(false);ss
  };

  return (
    <div className={`${isCustomPromptBox ? 'block' : 'hidden'}`}>
      <div className="fixed top-0 bottom-0 right-0 w-[500px] bg-black opacity-40 z-[60]"></div>
      <div
        className="fixed rounded-[10px] bg-white p-[20px] right-[20px] top-[50%] -translate-y-2/4 z-[70] w-[460px]"
        style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
        // show={open}
      >
        <div className="pt-[8px] pb-[20px] text-[22px] font-medium text-darkBlue">
          <div className="flex items-center justify-between">
            <div className="gap-2 flex items-center">
              <span>{isEdit ? 'Edit' : 'New'} Prompt</span>
            </div>
            <div className="cursor-pointer -mt-[30px]" onClick={() => handleClose()}>
              <img src={Close} />
            </div>
          </div>
        </div>
        <form onClick={handleSubmit}>
          <div className="col-span-full mb-[12px]">
            <input
              id="templatename"
              name="title"
              type="text"
              value={customSelectedPrompt.title ? customSelectedPrompt.title : ''}
              placeholder="Name of the prompt"
              className="block text-[14px] w-full rounded-md border border-gray px-[15px] py-[11px] text-darkBlue placeholder:text-gray1"
              onChange={(e) => handlePromptInput(e)}
            />
          </div>
          <div className="mb-[20px]">
            <div className="text-gray1 bg-lightblue1 w-full p-[12px] flex flex-col rounded-[6px] mb-[4px]">
              Use square brackets [] to specify user input.
            </div>
            <textarea
              id="promptText"
              name="prompt"
              rows="6"
              value={customSelectedPrompt.prompt ? customSelectedPrompt.prompt : ''}
              placeholder="e.g: Write a article about [TOPIC], make sure to include these keywords: [KEYWORDS]"
              className="text-[14px] border-gray block w-full rounded-0 border p-[12px] placeholder:text-gray1"
              onChange={(e) => handlePromptInput(e)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="rounded-md bg-white px-[16px] py-[10px] text-[16px] font-medium text-red border border-red">
              Delete
            </button>
            <button className="rounded-md bg-primaryBlue px-[16px] py-[10px] text-[16px] font-medium text-white hover:opacity-90">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyCustomPromptPopup;
