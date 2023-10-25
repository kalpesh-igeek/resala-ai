import React from 'react';

const ChatInput = () => {
  return (
    <div className="mt-2 relative">
      <form
        // onSubmit={(e) => {
        //   handleSendMessage(e, chatInput.chatText);
        //   setChatInput({
        //     ...chatInput,
        //     chatText: '',
        //   });
        //   setIsViewPrompts(false);
        //   setIsTypewriterDone(true);
        // }}
        className="mb-[10px]"
      >
        {audioInput ? (
          <div className="flex flex-col border border-gray p-[10px]">
            <div className="flex items-center gap-4 mb-[16px]">
              <div
                className="flex items-center justify-center w-[24px] h-[24px] rounded-full cursor-pointer"
                onClick={() => handleAudioInput()}
                style={{
                  boxShadow: '0px 0px 10px 0px #00000026',
                }}
              >
                <img src={KeyboardIcon} />
              </div>
              <div className="flex items-center justify-between w-full bg-white">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    handleAudioInfoPopup();
                  }}
                >
                  <img src={HowToIcon} />
                  <span className="text-[12px] text-darkBlue">How to use</span>
                </div>
                {isAudioInfoPopup && <HowToUseInfoBox setIsAudioInfoPopup={setIsAudioInfoPopup} />}
                <div className="inputLanguage flex items-center gap-2 text-[12px] relative text-darkBlue">
                  <div className="">Language</div>
                  {/* <Dropdown
                    className=" border border-gray rounded-md text-[10px] p-[4px] w-[100px]"
                    options={outputlanguages}
                    value={defaultLanguage}
                    arrowClosed={
                      <img
                        className="absolute top-[50%] -translate-y-[50%] right-[0] w-[16px] h-[16px]"
                        src={ArrowDown}
                      />
                    }
                    arrowOpen={
                      <img
                        className="absolute top-[50%] -translate-y-[50%] right-[0] w-[16px] h-[16px] rotate-180"
                        src={ArrowDown}
                      />
                    }
                  /> */}
                  <div ref={selectRef}>
                    <Select
                      className="border border-gray rounded-md text-[10px] p-[4px]"
                      menuPlacement="top"
                      isSearchable={false}
                      defaultValue={outputLanguagesVoice[0]}
                      onChange={setSelectedOption}
                      options={outputLanguagesVoice}
                      onBlur={handleBlur}
                      onFocus={() => setIsMenuOpen(true)}
                      isMenuOpen={isMenuOpen}
                      // menuIsOpen={true}
                      styles={{
                        control: (base) => ({
                          ...base,
                          height: '21px',
                          minHeight: '21px',
                          border: 0,
                          boxShadow: 'none',
                          backgroundColor: 'unset',
                          top: '-5px'
                        }),
                        menu: (base) => ({
                          ...base,
                          width: '143px',
                          minWidth: '143px',
                          height: '216px',
                          right: '-9px',
                        }),
                        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                          // const color = chroma(data.color);
                          // console.log({ data, isDisabled, isFocused, isSelected });
                          return {
                            ...styles,
                            backgroundColor: isFocused ? '#F3F4F8' : null,
                            color: '#333333',
                            margin: '8px',
                            width: 'auto',
                            borderRadius: '4px',
                            height: '21px',
                            lineHeight: '7px',
                            // minWidth: '143px',
                          };
                        },
                        dropdownIndicator: (provided, state) => ({
                          ...provided,
                          transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
                        }),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <SpeechToText /> */}
            {/* <div
                                  className={`flex justify-between gap-2 items-center bg-primaryBlue px-[8px] py-[12px] text-[12px] text-white rounded-[6px] ${
                                    isMicEnabled ? '' : 'opacity-40'
                                  }`}
                                > */}
            {micPermission === 'granted' && startSpeech && !micClicked && (
              <div
                className={`flex justify-between gap-2 items-center bg-primaryBlue px-[8px] py-[12px] text-[12px] text-white rounded-[6px] cursor-pointer`}
              >
                <div
                  className="flex gap-2 items-center"
                  onClick={() => {
                    listenContinuously();
                  }}
                >
                  <img src={MicrophoneWhiteIcon} />
                  {/* {!isMicEnabled ? (
                                      ) : ( */}
                  {/* <span>Voice input disabled: Mic access denied</span> */}
                  {/* )} */}
                  <span>Hold Space or Click button to speak</span>
                </div>
                <div
                  className="cursor-pointer"
                  // onClick={() => setAudioInput(false)}
                  onClick={() => closeSpeechRecognition()}
                >
                  <img src={SmallClose} />
                </div>
              </div>
            )}
            {micPermission !== 'granted' && (
              <div
                className={`flex justify-between gap-2 items-center bg-yellow px-[8px] py-[12px] text-[12px] text-white rounded-[6px] cursor-pointer`}
              >
                <div className="flex gap-2 items-center" onClick={requestPermission}>
                  <img src={MicrophoneWhiteIcon} />
                  {/* {!isMicEnabled ? (
                                      <span>Hold Space or Click button to speak</span>
                                    ) : ( */}
                  <span>Please allow Resala to use your microphone</span>
                  {/* )} */}
                </div>
                <div
                  className="cursor-pointer"
                  // onClick={() => setAudioInput(false)}
                  onClick={() => closeSpeechRecognition()}
                >
                  <img src={SmallClose} />
                </div>
              </div>
            )}
            {startListen && micClicked && !transcript && (
              <div
                className={`flex justify-between gap-2 items-center bg-green px-[8px] py-[12px] text-[12px] text-white rounded-[6px] cursor-pointer`}
              >
                <div className="flex gap-2 items-center">
                  <img src={MicrophoneWhiteIcon} />
                  {/* {!isMicEnabled ? (
                                      <span>Hold Space or Click button to speak</span>
                                    ) : ( */}
                  <span>Listening. Click again to submit, Esc to cancel</span>
                  {/* )} */}
                </div>
                <div
                  className="cursor-pointer"
                  // onClick={() => setAudioInput(false)}
                  onClick={() => closeSpeechRecognition()}
                >
                  <img src={SmallClose} />
                </div>
              </div>
            )}
            {transcript && (
              <div
                className={`flex justify-between gap-2 items-center bg-green px-[8px] py-[12px] text-[12px] text-white rounded-[6px] cursor pointer`}
              >
                <div
                  className="flex gap-2 items-center"
                  // onClick={() => handleSelectVoice(transcript)}
                  onClick={(e) => {
                    handleSendMessage(e, transcript);
                    setIsTypewriterDone(true);

                    setAudioInput(false);
                    setMicClicked(false);
                    setAudioInput(false);
                    // Stop the speech recognition
                    SpeechRecognition.stopListening();

                    // Reset the relevant states to their initial values
                    setStartListen(true);
                    setStartSpeech(true);
                    setMicClicked(false);
                    resetTranscript();
                    setIsViewPrompts(false);
                  }}
                >
                  <img src={MicrophoneWhiteIcon} />
                  {/* {!isMicEnabled ? (
                                      <span>Hold Space or Click button to speak</span>
                                    ) : ( */}
                  <span className="cursor-pointer">{transcript}</span>
                  {/* )} */}
                </div>
                <div
                  className="cursor-pointer"
                  // onClick={() => setAudioInput(false)}
                  onClick={() => closeSpeechRecognition()}
                >
                  <img src={SmallClose} />
                </div>
              </div>
            )}
            {/* <div className="flex justify-between gap-2 items-center bg-yellow px-[8px] py-[12px] text-[12px] text-white rounded-[6px]">
                                    <div className="flex gap-2 items-center">
                                      <img src={MicrophoneWhiteIcon} />
                                      Please allow Resala to use your microphone
                                    </div>
                                    <div onClick={() => console.log("closed")}>
                                      <img src={SmallClose} />
                                    </div>
                                  </div> */}
            {/* <div className="flex justify-between gap-2 items-center bg-green px-[8px] py-[12px] text-[12px] text-white rounded-[6px]">
                                    <div className="flex gap-2 items-center">
                                      <img src={MicrophoneWhiteIcon} />
                                      Listening. Click again to submit, Esc to cancel
                                    </div>
                                    <div onClick={() => console.log("closed")}>
                                      <img src={SmallClose} />
                                    </div>
                                  </div> */}
            {/* <div className="flex justify-between gap-2 items-center bg-green px-[8px] py-[12px] text-[12px] text-white rounded-[6px]">
                                    <div className="flex gap-2 items-center">
                                      <img src={MicrophoneWhiteIcon} />
                                      <div className="cursor-pointer" onClick={(e) => handleInputFromAudio(e)}>
                                        Hello, How are you?
                                      </div>
                                    </div>
                                    <div onClick={() => console.log("closed")}>
                                      <img src={SmallClose} />
                                    </div>
                                  </div> */}
          </div>
        ) : (
          <div className="flex items-top gap-4 border border-gray p-[10px] rounded-lg">
            <div
              className="flex items-center justify-center w-[24px] h-[24px] rounded-full cursor-pointer"
              onClick={() => handleAudioInput()}
              style={{
                boxShadow: '0px 0px 10px 0px #00000026',
              }}
            >
              <img src={MicrophoneIcon} />
            </div>
            <textarea
              style={{ resize: 'none' }}
              id="chatText"
              name="chatText"
              rows="5"
              value={chatInput.chatText}
              placeholder={errors.chatText ? errors.chatText : 'Tell me what to write for you'}
              className="text-[14px] pt-[5px] block w-[349px] rounded-lg focus:outline-0"
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e, chatInput.chatText);
                  setChatInput({
                    ...chatInput,
                    chatText: '',
                  });
                  setIsViewPrompts(false);
                  setIsTypewriterDone(true);
                }
              }}
            />
            {/* {errors.chatText && <p className="text-red text-[12px]">{errors.chatText}</p>} */}
            {!chatLoading && (
              <button
                className={`absolute top-[12px] right-[12px] w-[20px] h-[20px] cursor-pointer focus:outline-0  ${
                  chatLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                // onClick={(e) => {}}
                type="submit"
                disabled={chatLoading || !chatInput.chatText}
              >
                <img src={SendIcon} />
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default ChatInput;
