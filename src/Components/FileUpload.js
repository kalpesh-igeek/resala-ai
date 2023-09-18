import React, { useState, useEffect } from 'react';
import { getToken } from '../utils/localstorage';

const fileContents = `Lorem ipsum dolor sit amet consectetur. 
Tellus hendrerit vitae nibh luctus mi id dignissim pharetra convallis. 
Rhoncus diam risus neque elementum viverra erat lacus in non. 
Sed rutrum diam aenean hendrerit aliquam ultrices. 
Posuere in vivamus non vestibulum consectetur tortor vel urna.

Lorem ipsum dolor sit amet consectetur. 
Tellus hendrerit vitae nibh luctus mi id dignissim pharetra convallis. 
Rhoncus diam risus neque elementum viverra erat lacus in non. 
Sed rutrum diam aenean hendrerit aliquam ultrices. 
Posuere in vivamus non vestibulum consectetur tortor vel urna.

Lorem ipsum dolor sit amet consectetur. 
Tellus hendrerit vitae nibh luctus mi id dignissim pharetra convallis. 
Rhoncus diam risus neque elementum viverra erat lacus in non. 
Sed rutrum diam aenean hendrerit aliquam ultrices. 
Posuere in vivamus non vestibulum consectetur tortor vel urna.
`;

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
}) => {
  const [summeriseContent, setSummeriseContent] = useState([]);

  const hiddenFileInput = React.useRef(null);
  const chatId = sessionStorage.getItem('chatId');

  const handleClick = () => {
    hiddenFileInput.current.click();
    setIsUploadDocument(true);
  };

  console.log('selectedFile', selectedFile);
  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    setSelectedFile(fileUploaded);
    // props.handleFile(fileUploaded);
  };

  const handleSummeriseFile = async () => {
    console.log('fileContents', fileContents);
    setIsUploadDocument(false);

    const payload = { chat_id: chatId, document: selectedFile };

    try {
      const response = await fetch('http://192.168.1.10:8000/doc_chat/document_summrize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: getToken(),
        },
        body: JSON.stringify(payload),
      });

      // if (updatedChatData?.length) {
      //   updatedChatData.pop();
      // }

      if (response.ok) {
        const reader = response.body.getReader();
        let accumulatedMessage = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // setIsTypewriterDone(false);
            break;
          }

          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            data = line.replace(/#@#/g, '\n');
            console.log('data', data);
            // console.log('data', data);
            if (line.includes('connection closed')) {
              break;
            } else {
              accumulatedMessage += data + '';
            }
          }
        }

        // Remove the loading message and add the new AI message
        // if (updatedChatData[updatedChatData.length - 1].type === 'loading') {
        //   updatedChatData.pop();
        //   updatedChatData.push({ msg: accumulatedMessage?.trim(), type: 'ai' });
        // }

        // setChatData(updatedChatData);
      } else {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    // setSummeriseContent([
    //   {
    //     msg: 'Summarizing : ' + selectedFile.name,
    //     type: 'system',
    //   },
    //   {
    //     msg: fileContents,
    //     type: 'system',
    //   },
    // ]);
    setIsViewPrompts(false);
    setSelectedFile();
  };

  const handleStartChatFile = () => {
    setIsUploadDocument(false);
    setSummeriseContent([
      {
        msg: 'Chatting : ' + selectedFile.name,
        type: 'system',
      },
      {
        msg: fileContents2,
        type: 'system',
      },
    ]);
    setIsViewPrompts(false);
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
          <div className="h-[166px] rounded-[6px] w-[166px] text-[20px] flex items-center bg-lightblue1 text-primaryBlue justify-center mb-[18px]">
            {selectedFile.type}
          </div>
          <div className="text-[14px] mb-[8px]"> {selectedFile.name}</div>
          <div className="flex justify-center gap-2">
            <button
              className="rounded-md bg-white px-[16px] py-[10px] text-[16px] font-medium text-darkgray1 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
              onClick={() => handleSummeriseFile()}
            >
              Summarize
            </button>
            <button
              className="rounded-md bg-white px-[16px] py-[10px] text-[16px] font-medium text-darkgray1 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
              onClick={() => handleStartChatFile()}
            >
              Let’s Chat
            </button>
          </div>
        </>
      ) : (
        <>
          <span>Drop your documents [pdf, docx, pptx or txt] here or </span>
          <button
            className="flex gap-1 items-center justify-center w-full rounded-full px-[9px] py-[5px] text-[12px] font-medium text-primaryBlue"
            onClick={handleClick}
          >
            <span className="text-primaryBlue text-[14px] font-medium">Click Here To Upload</span>
          </button>
          <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
        </>
      )}
    </>
  );
};
export default FileUpload;
