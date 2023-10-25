import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { newChat } from '../redux/reducers/chatSlice/ChatSlice';
import { getToken } from '../utils/localstorage';
import DocumentUpload from '../utils/Chat/Icons/document-upload.svg';
import { round } from 'lodash';

const fileContents2 = `Article summary
Virat Kohli is an Indian cricketer and former captain of the Indian national cricket team. He is considered one of the best batsmen in the world and has numerous records to his name. Kohli has won several awards for his performances, including the Sir Garfield Sobers Trophy for ICC Cricketer of the Year in 2017 and 2018. He is known for his aggressive style of play and his passion for the game.

Questions you may be intrested in:
1. Lorem ipsum dolor sit amet consectetur?
2. Lorem ipsum dolor sit amet consectetur. Scelerisque ut non proin vitae senectus gravida massa aliquam vitae?
3. Lorem ipsum dolor sit amet consectetur. Ipsum dui purus id magna sed?
4. Lorem ipsum dolor sit amet consectetur?
`;

const FileUpload = ({
  setIsViewPrompts,
  chatData,
  setChatData,
  selectedFile,
  setSelectedFile,
  setIsUploadDocument,
  setIsDocChat,
  setIsStreaming,
  isStreaming,
  setAbortController,
  abortController,
  alreadyStreamed,
  setAllreadyStreamed,
  setChatType,
}) => {
  const [summeriseContent, setSummeriseContent] = useState([]);
  const hiddenFileInput = React.useRef(null);
  const chatId = sessionStorage.getItem('chatId');


  const [counter, setCounter] = useState(0);
  const [isSelected, setisSelected] = useState(0);

  const dispatch = useDispatch();

  const handleClick = () => {
    hiddenFileInput.current.click();
    setIsUploadDocument(true);
  };

  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    setSelectedFile(fileUploaded);
    // props.handleFile(fileUploaded);
  };

  useEffect(() => {
    let interval;
    if (isSelected) {
       interval = setInterval(() => {
        if (counter < 100) {
          setCounter(counter + 1);
        }
      }, 100);
    }

    return () => clearInterval(interval);
  }, [counter,isSelected]);

  const handleThumbnailImage = (e) => {
    setCounter(0);
    setisSelected(true);
    const input = e.target;
    const imageObj = e.target.files;

    const upload_file = imageObj;
    const fileExtention = imageObj[0]?.name.split('.');
    const fsize = upload_file[0]?.size;
    if (!imageObj || !fileExtention || !fsize || !fileExtention.length) {
      return;
    }
    const file = Math.round(fsize / 1024);
    if (upload_file) {
      if (file >= 10000) {
        // Toast('error', 'File too Big, please select a file less than 10MB');
        // console.log('error');
        input.value = '';
        if (!/safari/i.test(navigator.userAgent)) {
          input.type = '';
          input.type = 'file';
        }
        // const prev = operation === 'Edit' ? courseObject.thumbnail : '';
        // setImage('');
        // setPreviewImage(prev);
      }
      // const { name } = e.target;
      if (e.target.files.length !== 0) {
        setSelectedFile(e.target.files[0]);
        // setPreviewImage(URL.createObjectURL(e.target.files[0]));
        // if (errors[name])
        //   setErrors((error) => {
        //     let errorNew = { ...error };
        //     delete errorNew[name];
        //     return errorNew;
        //   });
      }
    } else {
      // Toast('error', 'Only jpg, jpeg and png files are allowed!');
      // console.log('errror');
    }
  };

  const handleSummeriseFile = async () => {
    setChatType('summarize');
    setIsUploadDocument(false);
    setIsViewPrompts(false);
    setIsDocChat(true);
    if (selectedFile) {
      setIsStreaming(true);
      setAllreadyStreamed(true);
    }

    if (abortController) {
      abortController.abort();
      setAbortController(null); // Clear the abort controller
    }

    if (alreadyStreamed) {
      return;
    }

    // Create a new AbortController instance for this fetch request
    const controller = new AbortController();
    setAbortController(controller);
    const formData = new FormData();

    formData.append('chat_id', chatId);
    formData.append('document', selectedFile);
    setChatData((prevMessages) => [...prevMessages, { msg: 'Loading...', type: 'loading' }]);

    try {
      const response = await fetch('https://api-qa.resala.ai/doc_chat/document_summrize', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: await getToken(),
        },
        body: formData,
        signal: controller.signal,
      });

      if (response.ok) {
        const reader = response.body.getReader();
        let accumulatedMessage = '';

        // Add initial message to chat data

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            data = line.replace(/#@#/g, '\n');
            // console.log('data', data);

            if (line.includes('connection closed')) {
              setAllreadyStreamed(false);
              setIsStreaming(false);
              break;
            } else if (line.startsWith('Summarizing : ')) {
              // If the line starts with the summarizing string, skip it
              continue;
            } else {
              accumulatedMessage += data + ''; // Add the line to the accumulated message
            }
          }
          // Update the chat data with the accumulated message, without the "Loading..." message
          setChatData((prevMessages) => [
            ...prevMessages.slice(0, -1), // Remove the last (Loading...) message
            { msg: accumulatedMessage?.trim(), type: 'ai' }, // Update the chat data
          ]);
          // Create a new message with the accumulated message
        }

        // Update state variables
        // ...
      } else {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    // Update other state variables and clear selected file
    // ...

    setSelectedFile();
  };

  const handleStartChatFile = async () => {
    setChatType('let-chat');
    setIsUploadDocument(false);
    setIsViewPrompts(false);
    if (selectedFile) {
      setIsStreaming(true);
    }

    if (abortController) {
      abortController.abort();
      setAbortController(null); // Clear the abort controller
    }

    if (alreadyStreamed) {
      return;
    }
    if (isStreaming) {
      return;
    }
    const controller = new AbortController();
    setAbortController(controller);
    const formData = new FormData();

    formData.append('chat_id', chatId);
    formData.append('document', selectedFile);
    setChatData((prevMessages) => [...prevMessages, { msg: 'Loading...', type: 'loading' }]);

    try {
      const response = await fetch('https://api-qa.resala.ai/doc_chat/document_chat_stream', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: await getToken(),
        },
        body: formData,
        signal: controller.signal,
      });

      if (response.ok) {
        const reader = response.body.getReader();
        let accumulatedMessage = '';

        // Add initial message to chat data

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            data = line.replace(/#@#/g, '\n');
            // console.log('data', data);

            if (line.includes('connection closed')) {
              setIsStreaming(false);
              break;
            } else {
              accumulatedMessage += data + ''; // Add the line to the accumulated message
            }
          }
          // Update the chat data with the accumulated message, without the "Loading..." message
          setChatData((prevMessages) => [
            ...prevMessages.slice(0, -1), // Remove the last (Loading...) message
            { msg: accumulatedMessage?.trim(), type: 'ai' }, // Update the chat data
          ]);
          // Create a new message with the accumulated message
        }
        // setIsStreaming(false);
        // Update state variables
        // ...
        // await dispatch(newChat());
      } else {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    // Update other state variables and clear selected file
    // ...

    setSelectedFile();
  };

  useEffect(() => {
    let tempArr = Array.from(chatData);
    summeriseContent.map((item) => {
      tempArr.push(item);
    });
    setChatData(tempArr);
  }, [summeriseContent]);

  return (
    <>
      {selectedFile ? (
        <>
          {/* <div className="h-[166px] uppercase rounded-[6px] w-[166px] text-[20px] flex items-center bg-lightblue1 text-primaryBlue justify-center mb-[18px]">
            {selectedFile.type &&  selectedFile?.type.toString().split("/")[1] ? selectedFile?.type.toString().split("/")[1] : selectedFile.type}
          </div>
          <div className="text-[14px] mb-[8px] font-[400]"> {selectedFile.name}</div>
          <div className="flex justify-center gap-2">
            <button
              className="rounded-md bg-white px-[16px] py-[10px] text-[16px] font-medium text-darkgray1 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
              onClick={() => handleSummeriseFile()}
            >
              Summarize
            </button>
            <button
              className="rounded-md bg-white px-[16px] py-[10px] text-[16px] font-medium text-darkgray1 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
              onClick={() => {
                handleStartChatFile();
              }}
            >
              Let’s Chat
            </button>
          </div> */}
          <div className="p-[6px]  h-[70px] w-full border border-[#DFE4EC] uppercase rounded-[6px] flex items-center justify-between">
            <div className='flex items-center'>
              <img className='w-[50px] h-[50px]' src={DocumentUpload} />
              <div className='flex flex-col items-start text-start pl-[10px]'>
                <span className='font-[500] text-[14px] text-[#5F6583]'>{selectedFile.name}</span>
                <span className='font-[400] text-[12px] text-[#5F6583] mt-[8px]'>{Number(selectedFile.size / 1024).toFixed(2)} MB</span>
              </div>
            </div>
            {counter < 100 && <div>{counter}%</div>}
          </div>
          <div className={`rounded-[6px] bg-[#EEF6FF] h-[70px] mt-[-70px]`} style={{ width: `${counter}%` }}></div>
          {counter == 100 && (
            <div className="flex justify-center gap-2 mt-[24px]">
              <button
                className="rounded-md bg-white px-[16px] py-[10px] text-[16px] font-medium text-darkgray1 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
                onClick={() => handleSummeriseFile()}
              >
                Summarize
              </button>
              <button
                className="rounded-md bg-white px-[16px] py-[10px] text-[16px] font-medium text-darkgray1 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
                onClick={() => {
                  handleStartChatFile();
                }}
              >
                Let’s Chat
              </button>
            </div>
          )
          }
        </>
      ) : (
        <>
          <img className='pt-[12px]' src={DocumentUpload} />
          <span className='font-[400] pt-[24px] text-[#8C90A5] text-[14px] '>Drop your documents here or </span>
          <button
            className="flex gap-1 items-center justify-center w-full rounded-full px-[9px] py-[5px] text-[12px] font-medium text-primaryBlue"
            onClick={handleClick}
          >
            <span className="text-primaryBlue text-[14px] font-medium">Click Here To Upload</span>
          </button>
          <span className='font-[400] pt-[40px] text-[#8C90A5] text-[14px] '>File type supported: PDF &nbsp;&nbsp;|&nbsp;&nbsp;Max file size: 100MB</span>
          <input type="file" ref={hiddenFileInput} onChange={handleThumbnailImage} accept=".pdf" style={{ display: 'none' }} />
        </>
      )}
    </>
  );
};
export default FileUpload;
