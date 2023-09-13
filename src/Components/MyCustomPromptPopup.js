import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addPrompt, deletePrompt, updatePrompt } from '../redux/reducers/userPromptSlice/UserPromptSlice';
import Close from '../utils/MainScreen/Icons/Close.svg';
import { promptCheck } from '../utils/validation';

const MyCustomPromptPopup = ({
  isEdit,
  isCustomPromptBox,
  setIsCustomPromptBox,
  customSelectedPrompt,
  setCustomSelectedPrompt,
  fetchprompts,
  myPromptRef,
}) => {
  const dispatch = useDispatch();
  const [newPrompt, setNewPrompt] = useState({
    name: '',
    prompt: '',
  });

  //language
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (myPromptRef.current && !myPromptRef.current.contains(event.target)) {
  //       setIsCustomPromptBox(false);
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [myPromptRef, setIsCustomPromptBox]);

  useEffect(() => {
    if (isEdit) {
      setNewPrompt({
        name: customSelectedPrompt?.name,
        prompt: customSelectedPrompt?.prompt,
      });
    }
  }, [isEdit, customSelectedPrompt]);
  const [errors, setErrors] = useState({});
  const handlePromptInput = (e) => {
    const { name, value } = e.target;

    setNewPrompt({
      ...newPrompt,
      [name]: value,
    });

    if (errors[name])
      setErrors((error) => {
        let errorNew = { ...error };
        delete errorNew[name];
        return errorNew;
      });
  };

  const handleClose = () => {
    setNewPrompt({ name: '', prompt: '' });
    setIsCustomPromptBox(false);
  };

  const handleSubmit = async (e) => {
    // setIsCustomPromptBox(false);ss
    e.preventDefault();

    const errors = promptCheck(newPrompt);
    if (Object.keys(errors)?.length) {
      setErrors(errors);
      return;
    }
    if (!isEdit) {
      const payload = {
        name: newPrompt.name,
        prompt: newPrompt.prompt,
      };
      const res = await dispatch(addPrompt(payload));
      if (!res.payload) {
        return;
      }
      if (res.payload?.status === 200) {
        fetchprompts();
        setIsCustomPromptBox(false);
        handleClose();
        // navigate('/mobileverification', { state: { register: res.payload } });
      }
    } else {
      const payload = {
        id: customSelectedPrompt?.id,
        name: newPrompt.name,
        prompt: newPrompt.prompt,
      };

      const res = await dispatch(updatePrompt(payload));
      if (!res.payload) {
        return;
      }
      if (res.payload?.status === 200) {
        fetchprompts();
        setIsCustomPromptBox(false);
        handleClose();
        // navigate('/mobileverification', { state: { register: res.payload } });
      }
    }
  };

  const handleDeletePrompt = async () => {
    const res = await dispatch(deletePrompt(customSelectedPrompt?.id));
    if (!res.payload) {
      return;
    }
    if (res.payload?.status === 200) {
      fetchprompts();
      setIsCustomPromptBox(false);
      handleClose();
      // navigate('/mobileverification', { state: { register: res.payload } });
    }
  };

  return (
    <div className={`${isCustomPromptBox ? 'block' : 'hidden'}`}>
      <div className="fixed top-0 bottom-0 right-0 w-[500px] bg-black opacity-40 z-[60]"></div>
      <div
        ref={myPromptRef}
        className="fixed rounded-[10px] bg-white p-[20px] right-[20px] top-[50%] -translate-y-2/4 z-[70] w-[460px]"
        style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
        // show={open}
      >
        <div className="pt-[8px] pb-[20px] text-[22px] font-medium text-darkBlue">
          <div className="flex items-center justify-between">
            <div className="gap-2 flex items-center">
              <span>{isEdit ? 'Edit' : 'New'} Prompt</span>
            </div>
            <div className="cursor-pointer -mt-[33px]" onClick={() => handleClose()}>
              <img src={Close} />
            </div>
          </div>
        </div>
        <div>
          <div className="col-span-full mb-[12px]">
            <label className="text-[12px] text-gray1 font-bold">NAME</label>
            <input
              id="templatename"
              name="name"
              type="text"
              value={newPrompt ? newPrompt.name : ''}
              placeholder="Name of the prompt"
              className="block text-[14px] w-full rounded-md border border-gray px-[15px] py-[11px] text-darkBlue placeholder:text-gray1"
              onChange={(e) => handlePromptInput(e)}
            />
            {errors.name && <p className="text-red text-[12px]">{errors.name}</p>}
          </div>
          <div className="mb-[20px]">
            <label className="text-[12px] text-gray1 font-bold">PROMPT</label>
            <div className="text-gray1 bg-lightblue1 w-full p-[12px] flex flex-col rounded-[6px] mb-[4px]">
              Use square brackets [] to specify user input.
            </div>
            <textarea
              style={{ resize: 'none' }}
              id="promptText"
              name="prompt"
              rows="5"
              value={newPrompt ? newPrompt.prompt : ''}
              placeholder="e.g: Write a article about [TOPIC], make sure to include these keywords: [KEYWORDS]"
              className="text-[14px] border-gray block w-full rounded-lg border p-[12px] placeholder:text-gray1"
              onChange={(e) => handlePromptInput(e)}
            />
            {errors.prompt && <p className="text-red text-[12px]">{errors.prompt}</p>}
          </div>
          {isEdit ? (
            <div className="flex items-center justify-between">
              <button
                className="rounded-md bg-white focus:outline-none px-[16px] py-[10px] text-[16px] font-medium text-red border border-red"
                onClick={handleDeletePrompt}
              >
                Delete
              </button>
              <button
                className="rounded-md bg-primaryBlue focus:outline-none px-[16px] py-[10px] text-[16px] font-medium text-white hover:opacity-90"
                type="button"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-end gap-[15px]">
              <button
                className="rounded-md bg-white focus:outline-none px-[16px] py-[10px] text-[16px] font-medium text-darkgray1 border border-gray hover:bg-lightgray"
                onClick={handleClose}
              >
                Cancle
              </button>
              <button
                className="rounded-md bg-primaryBlue focus:outline-none px-[16px] py-[10px] text-[16px] font-medium text-white hover:opacity-90 "
                type="button"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCustomPromptPopup;
