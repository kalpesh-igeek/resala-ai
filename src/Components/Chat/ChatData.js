import React, { useRef, useState } from 'react';
import ReadIcon from '../../utils/Chat/Icons/ReadIcon.svg';
import CopyIcon from '../../utils/Chat/Icons/CopyIcon.svg';
import Typewriter from '../Typewriter';
import LoadingGif from '../../utils/Chat/Gif/loader.gif';
import RegenerateIcon from '../../utils/Chat/Icons/RegenerateIcon.svg';

const ChatData = ({
  chatData,
  setIsTypewriterDone,
  isTypewriterDone,
  handleRegenerate,
  chatContainerRef,
  activeTabSub,
}) => {
  const renderMessage = (item) => {
    if (activeTabSub === 'chat' && item.isNew) {
      // console.log('1');
      // Display typewriter component
      return <Typewriter text={item.msg} delay={50} setIsTypewriterDone={setIsTypewriterDone} contentType="chat" />;
    } else {
      // console.log('2');
      // Display normal message from chatData
      return <>{item.msg}</>;
    }
  };

  return (
    <>
      <div ref={chatContainerRef} className="text-[12px] max-h-[440px] overflow-y-auto flex flex-col-reverse">
        <div className="">
          {chatData.map((item, index) => {
            switch (item.type) {
              case 'user':
                return (
                  <div id="chat-container" className="flex justify-end">
                    <div
                      className="bg-lightblue1 text-darkBlue max-w-[370px] p-[12px] flex flex-col rounded-tl-[6px] rounded-tr-[6px] rounded-br-0 rounded-bl-[6px] mb-[16px] text-[14px] "
                      style={{
                        // boxShadow: '0px 2px 4px 0px #0000000D',
                        overflowWrap: 'break-word',
                      }}
                    >
                      {item.msg}
                    </div>
                  </div>
                );
              case 'ai':
                return (
                  <div id="chat-container" className="flex justify-start">
                    <div
                      className="message  bg-lightgray max-w-[370px] border border-gray p-[12px] flex flex-col mb-[12px] rounded-tl-[6px] rounded-tr-[6px] rounded-br-[6px] rounded-br-0 rounded-bl-0 relative "
                      style={{
                        // boxShadow: '0px 2px 4px 0px #0000000D',
                        overflowWrap: 'break-word',
                      }}
                    >
                      <div className="option flex items-center gap-2 bg-white absolute right-0 -top-[23px] border border-gray p-[8px] rounded-[6px]">
                        <span className="cursor-pointer">
                          <img src={ReadIcon} />
                        </span>
                        <span className="cursor-pointer">
                          <img src={CopyIcon} />
                        </span>
                      </div>

                      <pre className="font-dmsans" style={{ textWrap: 'wrap' }}>
                        {renderMessage(item)}
                      </pre>

                      {/* Remove <pre></pre> when new original response from chat GPT */}
                    </div>
                  </div>
                );
              case 'loading':
                return <img id="chat-container" className="w-[100px]" src={LoadingGif} />;
              default:
                return null;
            }
          })}
        </div>
      </div>

      {!isTypewriterDone && chatData?.length >= 2 && (
        <div className="text-[12px] text-lightgray2 mb-[20px]">
          <span
            className="flex items-center gap-2"
            onClick={() => {
              handleRegenerate();
              setIsTypewriterDone(true);
            }}
          >
            <img className="cursor-pointer" src={RegenerateIcon} />
            <p className="cursor-pointer">Regenerate</p>
          </span>
        </div>
      )}
    </>
  );
};

export default ChatData;
