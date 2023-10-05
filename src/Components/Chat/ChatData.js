import React, { useEffect, useRef, useState } from 'react';
import ReadIcon from '../../utils/Chat/Icons/ReadIcon.svg';
import ReadFilledIcon from '../../utils/Chat/Icons/ReadIcon-filled.svg';
import CopyIcon from '../../utils/Chat/Icons/CopyIcon.svg';
import CopiedIcon from '../../utils/Chat/Icons/CopiedIcon.svg';
import Typewriter from '../Typewriter';
import LoadingGif from '../../utils/Chat/Gif/loader.gif';
import RegenerateIcon from '../../utils/Chat/Icons/RegenerateIcon.svg';
import copy from 'copy-to-clipboard';
import { useSpeechSynthesis } from 'react-speech-kit';
import CustomTooltip from '../CustomTooltip/Tooltip';

const ChatData = ({
  chatData,
  setIsTypewriterDone,
  isTypewriterDone,
  handleRegenerate,
  chatContainerRef,
  activeTabSub,
  isStreaming,
  isSpeechEnabled,
}) => {
  const { speak, cancel, speaking } = useSpeechSynthesis();
  const [isCopied, setisCopied] = useState(undefined);

  const handleSpeak = (msg) => {
    if (speaking) {
      cancel();
    } else {
      speak({ text: msg });
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setisCopied(false);
    }, 3000);
    return clearTimeout(timer);
  }, [isCopied]);

  // FIX: contiue speech
  useEffect(() => {
    if (!isTypewriterDone && isSpeechEnabled) {
      const speechMsg = chatData[chatData.length - 1]?.msg;
      if (speechMsg) {
        speak({ text: speechMsg });
      }
    }
    return () => {
      cancel();
    };
  }, [isTypewriterDone, isSpeechEnabled]);

  const renderMessage = (item) => {
    if (activeTabSub === 'chat' && item.isNew) {
      // Display typewriter component
      return <Typewriter text={item.msg} delay={50} setIsTypewriterDone={setIsTypewriterDone} contentType="chat" />;
    } else {
      // Display normal message from chatData
      const messages = item.msg.split('\n'); // Split the message by new lines
      const summarizingString = 'Summarizing : '; // Replace this with the format of your summarizing string

      // Check if the first message starts with the summarizing string
      if (messages[0].startsWith(summarizingString)) {
        // If there is a new line after the summarizing string, create a new message
        if (messages[0].indexOf(summarizingString) + summarizingString.length < messages[0].length) {
          return (
            <>
              <div>{messages[0]}</div>
              <div>{messages.slice(1).join('\n')}</div>
            </>
          );
        }
      }

      return <>{item.msg}</>;
    }
  };

  return (
    <>
      <div
        ref={chatContainerRef}
        className={`text-[12px] max-h-[530px] overflow-y-auto flex flex-col-reverse ${isStreaming ? 'mb-[55px]' : ''} `}
      >
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
                      className="message  bg-lightgray max-w-[370px] border-0 border-gray p-[12px] flex flex-col mb-[12px] rounded-tl-[6px] rounded-tr-[6px] rounded-br-[6px] rounded-br-0 rounded-bl-0 relative "
                      style={{
                        // boxShadow: '0px 2px 4px 0px #0000000D',
                        overflowWrap: 'break-word',
                      }}
                    >
                      <div className="option flex items-center gap-2 bg-white absolute right-0 -top-[23px] border border-gray p-[8px] rounded-[6px]">
                        <CustomTooltip
                          maxWidth="430px"
                          place="top"
                          id={`speak-${index + 1}`}
                          content={`<div class="capitalize font-normal text-[12px] leading-[18px]" > ${
                            speaking ? 'Stop' : 'Speak'
                          } </div>`}
                        >
                          <span id={`speak-${index + 1}`} onClick={() => handleSpeak(item.msg)} className="cursor-pointer">
                            <img src={speaking ? ReadFilledIcon : ReadIcon} />
                          </span>
                        </CustomTooltip>
                        <CustomTooltip
                          maxWidth="430px"
                          place="top"
                          id={`copyTooltip-${index + 1}`}
                          content={`<div class="capitalize font-normal text-[12px] leading-[18px]" > ${
                            isCopied !== index ? "Copy" : "Copied"
                          } </div>`}
                        >
                          <span
                            id={`copyTooltip-${index + 1}`}
                            onClick={() => {
                              copy(item.msg);
                              setisCopied(index);
                            }}
                            className="cursor-pointer"
                          >
                            <img src={isCopied !== index ? CopyIcon : CopiedIcon} />
                          </span>
                        </CustomTooltip>
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
        <div className="text-[12px] text-lightgray2 mb-[16px]">
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
