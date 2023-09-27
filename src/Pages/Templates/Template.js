import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from '../../Components/Typewriter';
// import SaveTemplate from '../utils/SavedTemplates/Icons/SaveTemplate.svg';
import EditIcon from '../../utils/SavedTemplates/Icons/edit-2.svg';

const Template = ({ selectedTemplate, setActiveTab }) => {
  const [copied, setCopied] = useState(false); // State to track if text is copied
  const navigate = useNavigate();

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(selectedTemplate?.output_text);
    setCopied(true); // Set copied state to true when text is copied
    setTimeout(() => {
      setCopied(false); // Revert copied state to false after 2 seconds
    }, 2000);
  };
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [focusedTextarea, setFocusedTextarea] = useState(null);

  useEffect(() => {
    const messageListener = (message) => {
      if (message.enableButton !== undefined) {
        setButtonDisabled(!message.enableButton);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const isElementInExtension = (element) => {
    // Replace 'your-extension-id' with the actual ID of your extension's root element.
    const extensionRootElement = document.getElementById('side-bar-extension-root');
    return extensionRootElement?.contains(element);
  };

  const isInputField = (element) => {
    return (
      element.tagName === 'INPUT' ||
      element.tagName === 'TEXTAREA' ||
      // Add more conditions for other input field types as needed
      false
    );
  };

  const findClosestButton = (element) => {
    while (element) {
      if (element.tagName === 'BUTTON') {
        return element;
      }
      element = element.parentElement;
    }
    return null;
  };

  const handleFocusIn = (event) => {
    const focusedElement = event.target;

    if (!isElementInExtension(focusedElement) && isInputField(focusedElement)) {
      const button = findClosestButton(focusedElement);

      if (button) {
        button.removeAttribute('disabled');
      }

      chrome.runtime.sendMessage({ enableButton: true });
      setButtonDisabled(false);

      if (focusedElement.tagName === 'TEXTAREA' || focusedElement.tagName === 'INPUT') {
        setFocusedTextarea(focusedElement);
      }
    }
  };

  const handleApply = () => {
    if (focusedTextarea) {
      const valueToInsert = selectedTemplate?.output_text;
      const selectionStart = focusedTextarea.selectionStart;
      const selectionEnd = focusedTextarea.selectionEnd;
      const currentValue = focusedTextarea.value;
      const newValue = currentValue.substring(0, selectionStart) + valueToInsert + currentValue.substring(selectionEnd);

      // Set the new value of the textarea
      focusedTextarea.value = newValue;

      // Restore focus and cursor position
      focusedTextarea.focus();
      focusedTextarea.setSelectionRange(selectionStart + valueToInsert.length, selectionStart + valueToInsert.length);
    }
  };

  useEffect(() => {
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  useEffect(() => {
    const handleFocusOut = (event) => {
      if (focusedTextarea && !event.relatedTarget) {
        setFocusedTextarea(null);
        setButtonDisabled(true);
      }
    };

    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [focusedTextarea]);
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
            <label for="input" className="block text-[12px] font-bold leading-6 text-gray1">
              TEMPLATE TYPE
            </label>
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
                      pathName: '/savedtemplates',
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
            onClick={handleCopyDraft}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            className={`w-full rounded-md focus:outline-none bg-primaryBlue px-1 py-[10px] text-[16px] font-medium text-white focus:outline-none hover:opacity-90 ${
              buttonDisabled ? 'opacity-50 bg-lightblue4 cursor-not-allowed' : ''
            }`}
            disabled={buttonDisabled}
            onClick={handleApply}
            type="button"
            id="addToFocusedInput"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Template;
