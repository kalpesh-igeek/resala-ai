import React, { useState, useEffect, useRef } from 'react';

import FileUpload from '../Components/FileUpload';

import DocumentUploadBg from '../utils/Chat/Icons/DocumentUploadBg.svg';
import Close from '../utils/MainScreen/Icons/Close.svg';

const UploadDocumentPopup = ({
  setIsViewPrompts,
  chatData,
  setChatData,
  isUploadDocument,
  setIsUploadDocument,
  setIsDocChat,
  isStreaming,
  setIsStreaming,
  setAbortController,
  abortController,
  alreadyStreamed,
  setAllreadyStreamed,
  setChatType,
}) => {
  const [selectedFile, setSelectedFile] = useState();
  const docRef = useRef(null);

  const handleClose = () => {
    setSelectedFile();
    setIsUploadDocument(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (docRef.current && !docRef.current.contains(event.target)) {
        setIsUploadDocument(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [docRef, setIsUploadDocument]);

  return (
    <div className={`${isUploadDocument ? 'block' : 'hidden'}`}>
      <div className="fixed top-0 bottom-0 right-0 w-[500px] bg-black opacity-40 z-[60]"></div>
      <div
        ref={docRef}
        className="fixed rounded-[10px] bg-white p-[20px] right-[20px] top-[50%] -translate-y-2/4 z-[70] w-[460px]"
        style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
        // show={open}
      >
        <div className="pt-[8px] text-[22px] font-medium text-darkBlue">
          <div className="flex items-center justify-between mb-[16px]">
            <div className="gap-2 flex items-center">
              <span className="w-[28px] h-[28px] flex items-center justify-center rounded-full">
                <img src={DocumentUploadBg} />
              </span>
              <span className="text-primaryBlue">Upload Document</span>
            </div>
            <div className="cursor-pointer -mt-[30px]" onClick={() => handleClose()}>
              <img src={Close} />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-[18px] text-[14px] text-center text-gray1 border-2 border-dashed border-gray min-h-[228px] rounded-[6px] mb-[20px]">
            <FileUpload
              setIsViewPrompts={setIsViewPrompts}
              chatData={chatData}
              setChatData={setChatData}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setIsUploadDocument={setIsUploadDocument}
              setIsDocChat={setIsDocChat}
              setIsStreaming={setIsStreaming}
              isStreaming={isStreaming}
              abortController={abortController}
              setAbortController={setAbortController}
              setAllreadyStreamed={setAllreadyStreamed}
              alreadyStreamed={alreadyStreamed}
              setChatType={setChatType}
            />
          </div>
          {!selectedFile && (
            <button
              className="flex w-full justify-center rounded-md bg-primaryBlue px-3 py-2 text-sm leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              // onClick={() => handleGenerateDraft()}
            >
              Upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default UploadDocumentPopup;
