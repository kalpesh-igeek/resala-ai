import React, { useEffect, useState } from 'react';
import HowToUseInfoBox from '../HowToUseInfoBox';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import KeyboardIcon from '../../utils/Chat/Icons/KeyboardIcon.svg';
import HowToIcon from '../../utils/Chat/Icons/HowToIcon.svg';
import MicrophoneWhiteIcon from '../../utils/Chat/Icons/MicrophoneWhiteIcon.svg';
import SmallClose from '../../utils/Chat/Icons/SmallClose.svg';
import Select from 'react-select';

const AudioInput = ({
  setAudioInput,
  audioInput,
  handleAudioInfoPopup,
  isAudioInfoPopup,
  setIsAudioInfoPopup,
  outputLanguagesVoice,
  setSelectedOption,
  selectedOption,
  selectRef,
  handleSendMessage,
  setIsTypewriterDone,
}) => {
  const { transcript, interimTranscript, finalTranscript, resetTranscript, listening } = useSpeechRecognition();
  const [micPermission, setMicPermission] = useState('denied');
  const [startListen, setStartListen] = useState(true);
  const [startSpeech, setStartSpeech] = useState(true);
  const [micClicked, setMicClicked] = useState(false);
  const [isSpaceDown, setIsSpaceDown] = useState(false);

  useEffect(() => {
    navigator.permissions.query({ name: 'microphone' }).then((permissionStatus) => {
      setMicPermission(permissionStatus.state);
      // setStartSpeech(true);

      permissionStatus.onchange = function () {
        setMicPermission(this.state);
        // setStartSpeech(true);
      };
    });
    // if (micPermission !== 'granted') {
    //   setTimeout(() => {
    //     setGrantAccess(true);
    //   }, 2000);
    // }
  }, []);

  useEffect(() => {
    if (!startSpeech) {
      setStartListen(true);
    }
  }, [startSpeech]);

  //   useEffect(() => {
  //     if (closeSpeech) {
  //       resetTranscript();
  //       SpeechRecognition.stopListening();
  //     }
  //   }, [closeSpeech]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        setIsSpaceDown(true);
        // Trigger your function here
        listenContinuously();
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'Space') {
        setIsSpaceDown(false);
        // You can stop your function here if needed
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (finalTranscript !== '') {
    }
  }, [interimTranscript, finalTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
    return null;
  }

  const requestPermission = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setMicPermission('granted');
        setStartListen(false);
        setStartSpeech(true);
      })
      .catch((err) => {
        // Handle the error
      });
  };

  const handleAudioInput = () => {
    setAudioInput(!audioInput);
    // closeSpeechRecognition();
    SpeechRecognition.stopListening();
    setStartListen(true);
    setStartSpeech(true);
    setMicClicked(false);
    resetTranscript();
  };

  const listenContinuously = () => {
    setStartSpeech(false);
    setStartListen(true);
    setMicClicked(true);
    SpeechRecognition.startListening({
      continuous: true,
      language: selectedOption?.value ? selectedOption?.value : 'en',
    });
  };

  const closeSpeechRecognition = () => {
    setCloseSpeech(true);
    SpeechRecognition.stopListening();
    setAudioInput(false);
    // Stop the speech recognition
    // Reset the relevant states to their initial values
    setStartListen(true);
    setStartSpeech(true);
    setMicClicked(false);

    resetTranscript();
    // console.log('transcript', transcript);
    // Show the first div
    // setShowFirstDiv(true);
  };

  return (
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
            <div ref={selectRef}>
              <Select
                className="border border-gray rounded-md text-[10px] p-[4px]"
                menuPlacement="top"
                defaultValue={outputLanguagesVoice[0]}
                onChange={setSelectedOption}
                options={outputLanguagesVoice}
                // onBlur={handleBlur}
                // onFocus={() => setIsMenuOpen(true)}
                // isMenuOpen={isMenuOpen}
                // menuIsOpen={true}
                styles={{
                  control: (base) => ({
                    ...base,
                    height: '21px',
                    minHeight: '21px',
                    border: 0,
                    boxShadow: 'none',
                    backgroundColor: 'unset',
                    top: '-5px',
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
    </div>
  );
};

export default AudioInput;
