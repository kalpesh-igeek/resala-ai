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

  const [compLoading, setCompLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Input string
    const result = newPrompt.prompt.replace(/\[\s+\]|\[\s+(.*?)\s+\]/g, (match, p1) => (p1 ? `[${p1}]` : ''));
    const newString = result.replace("[]", "");
    setNewPrompt({
      ...newPrompt,
      [prompt]: newString,
    });
    setIsCustomPromptBox(false);

    const payload ={
      "name": newPrompt.name,
      "prompt": newString
  }
  console.log('payload',payload);
    const errors = promptCheck(payload);
    if (Object.keys(errors)?.length) {
      setErrors(errors);
      return;
    }
    if (!isEdit) {
      // const payload = {
      //   name: newPrompt.name,
      //   prompt: newPrompt.prompt,
      // };
      const res = await dispatch(addPrompt(payload));
      if (!res.payload) {
        return;
      }
      if (res.payload?.status === 200) {
        setCompLoading(false)
        fetchprompts();
        setIsCustomPromptBox(false);
        handleClose();
        // navigate('/mobileverification', { state: { register: res.payload } });
      }
    } else {
      // const payload = {
      //   id: customSelectedPrompt?.id,
      //   name: newPrompt.name,
      //   prompt: newPrompt.prompt,
      // };

      const res = await dispatch(updatePrompt({...payload,id: customSelectedPrompt?.id,}));
      if (!res.payload) {
        return;
      }
      if (res.payload?.status === 200) {
        setCompLoading(false)
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
                onClick={(e) => {handleSubmit(e); setCompLoading(true)}}
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
                onClick={(e) => {handleSubmit(e); setCompLoading(true)}}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCustomPromptPopup;
