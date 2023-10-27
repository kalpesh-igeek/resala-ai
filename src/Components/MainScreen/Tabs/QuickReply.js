import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TypeWriterEffect from 'react-typewriter-effect';
import SaveTemplatePopup from '../../../Components/SaveTemplatePopup/SaveTemplatePopup';

import SaveTemplate from '../../../utils/SavedTemplates/Icons/SaveTemplate.svg';
import ArrowDown from '../../../utils/MainScreen/Icons/arrow-down.svg';
import ArrowUP from '../../../utils/MainScreen/Icons/arrow-up.png';
import prevIcon from '../../../utils/MainScreen/Icons/prev.svg';
import nextIcon from '../../../utils/MainScreen/Icons/next.svg';
import StopResIcon from '../../../utils/SavedTemplates/Icons/minus-cirlce.svg';
import SmallClose from '../../../utils/Chat/Icons/SmallClose.svg';
import MicrophoneWhiteIcon from '../../../utils/Chat/Icons/MicrophoneWhiteIcon.svg';
import RequestIcon from '../../../utils/MainScreen/Tab/RequestIcon.svg';
import AcknowledgeIcon from '../../../utils/MainScreen/Tab/AcknowledgeIcon.svg';
import DeclineIcon from '../../../utils/MainScreen/Tab/DeclineIcon.svg';

import { getIdeasReply } from '../../../redux/reducers/QuickReplySlice/QuickReplySlice';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getToken } from '../../../utils/localstorage';

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'straight', label: 'Straight' },
  { value: 'confident', label: 'Confident' },
  { value: 'friendly', label: 'Friendly' },
];
const exeLang = [
  { value: 'english', label: 'English' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'french', label: 'French' },
  { value: 'spanish', label: 'Spanish' },
];

const QuickReply = ({
  TemplatesIcon,
  requestedText,
  handleInputChange,
  handleAudioInput,
  MicrophoneIcon,
  speechText,
  handleSpeechInput,
  handleSendMessage,
  speechLength,
  SendIcon,
  setSaveTemplateBox,
  saveTemplateBox,
  // resultText,
  myRef,
  outputlanguages,
  defaultLanguage,
  selectedTone,
  setSelectionTone,
  SELECTION,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const gmail = new Gmail();
  // gmail.load();

  const [isReplies, setIsReplies] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState();
  const [ideasList, setIdeasList] = useState([]);
  const [senderIntent, setSenderIntent] = useState(null);
  const [customIdea, setCustomIdea] = useState('');
  const [selectedOption, setSelectedOption] = useState(tones[0].label);
  const [selectedLang, setSelectedLang] = useState(exeLang[0].label);
  const [resultText, setResultText] = useState([]);
  const [currentPageIndexTab1, setCurrentPageIndexTab1] = useState(0);
  const [isStreamingComp, setIsStreamingComp] = useState(false);
  const [composeRes, setComposeRes] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [replyResponse, setReplyResponse] = useState({
    tone: '',
    language: '',
    sender_intent: '',
    generate_mail: '',
  });
  // console.log('replyResponse', replyResponse);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [templatePayload, setTemplatePayload] = useState({
    template_name: '',
    template_type: '',
    tone: '',
    language: '',
    sender_intent: '',
    generate_mail: '',
  });
  const draftPreviewTextareaRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handlePlanInfo = () => {
    setIsReplies(!isReplies);
  };
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const handleSelectLangChange = (selectedLang) => {
    // console.log(selectedLang);
    setSelectedLang(selectedLang);
  };
  const defaultTone = tones[0];

  const calculateTextareaRows = () => {
    const content = resultText[currentPageIndexTab1]?.output_text || '';
    const maxRows = 10; // Define your maximum number of rows
    const lineBreaks = (content.match(/\n/g) || []).length;
    const numRows = Math.min(maxRows, lineBreaks + 1); // Minimum is 1 row

    return numRows;
  };
  useEffect(() => {
    // Update the rows attribute when content changes
    const numRows = calculateTextareaRows();
    if (draftPreviewTextareaRef.current) {
      draftPreviewTextareaRef.current.rows = numRows;
    }
  }, [resultText, currentPageIndexTab1]);

  useEffect(() => {
    const textarea = draftPreviewTextareaRef.current;

    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to auto
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content
    }
  }, [resultText, currentPageIndexTab1]);

  const { isExtensionOpen } = useSelector((state) => state.extension);

  const fetchIdeasOfReply = async () => {
    const res = await dispatch(getIdeasReply());

    if (!res.payload) {
      return;
    }

    if (res.payload.status === 200) {
      setIdeasList(res.payload?.Result);
      // setTotalData(res.payload?.totalCount);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (SELECTION === 'quickreply') {
      fetchIdeasOfReply();
      setSenderIntent(null)
    }
  }, [isExtensionOpen]);

  const getSendersIntent = async () => {
    const emailContentElement = document.getElementsByClassName('a3s aiL ')[0]; // Use querySelector for class selectors

    if (emailContentElement) {
      // Extract the email content from the element
      const content = emailContentElement.textContent.trim().replace(/\s+/g, ' '); // Replace multiple spaces and line breaks with a single space

      setSenderIntent("Loading....")
      try {
        const response = await fetch('https://api-qa.resala.ai/quick_reply/stream_sender_intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            Authorization: await getToken(),
          },
          body: JSON.stringify({
            email: content,
          }),
          // signal: controller.signal, // Associate the AbortController with the request
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        // Process the response from your new API here
        const reader = response.body.getReader();
        let accumulatedMessage = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n');
          for (const line of lines) {
            data = line.replace(/#@#/g, '\n');
            // console.log('data', data);
            if (line.includes('connection closed')) {
              // setIsTypewriterDone(false);
            } else {
              // Exclude lines containing "connection closed" and append the word
              accumulatedMessage += data + '';
              setSenderIntent(accumulatedMessage);
            }
            // }
          }
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  useEffect(() => {
    // if (emailContent) {
      setSenderIntent(null)
    getSendersIntent();
    // }
  }, [isExtensionOpen]);

  const handleGetReply = async (idea) => {
    setIsStreamingComp(true);
    setCustomIdea('');
    setIsReplies(false);

    if (isStreamingComp) {
      return;
    }

    // Check if there's an ongoing fetch request and abort it
    if (abortController) {
      abortController.abort();
      setAbortController(null); // Clear the abort controller
    }

    // Create a new AbortController instance for this fetch request
    const controller = new AbortController();
    setAbortController(controller);
    try {
      // setCompLoading(true);
      // Call your new API here
      const response = await fetch('https://api-qa.resala.ai/quick_reply/generate_stream_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: await getToken(),
        },
        body: JSON.stringify({
          sender_intent: senderIntent.trim(),
          tone: selectedOption,
          language: selectedLang,
          // tone: selectedOption?.label,
          // language: selectedLang?.label,
          ideas_of_replay: idea?.idea || idea,
          // Include other necessary parameters
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      // Process the response from your new API here
      const reader = response.body.getReader();
      let accumulatedMessage = '';
      let newResultText = [];

      while (true) {
        // setAllreadyStreamed(true);
        // setCompLoading(false);
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          setComposeRes(true);

          data = line.replace(/#@#/g, '\n');
          // console.log('data', data);
          // console.log('data', data);
          if (line.includes('connection closed')) {
            setIsStreamingComp(false);
          } else {
            // Exclude lines containing "connection closed" and append the word
            accumulatedMessage += data + '';
            // setResultText((prevResultText) => [...prevResultText, { output_text: accumulatedMessage }]);
          }
          // }
        }
        setTemplatePayload({
          tone: selectedOption,
          language: selectedLang,
          sender_intent: senderIntent.trim(),
          generate_mail: accumulatedMessage,
        });
        newResultText = [
          ...resultText,
          { output_text: accumulatedMessage.trim() }, // Trim to remove trailing spaces
        ];
        // console.log('newResultText', newResultText[newResultText?.length]);
        setCurrentPageIndexTab1(newResultText.length - 1); // Use the updated result text length

        // Update the state with the new result text
        setResultText(newResultText);
        setReplyResponse({
          tone: selectedOption?.label,
          language: selectedLang?.label,
          sender_intent: senderIntent.trim(),
          generate_mail: resultText[newResultText?.length],
        });
        if(customIdea){
          setSelectedIdea(null);
        }
        // setHasResultText(true);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleStopDraft = () => {
    // Check if there's an ongoing fetch request and abort it
    if (abortController) {
      abortController.abort();
      setAbortController(null); // Clear the abort controller

      setIsStreamingComp(false);
    }
  };

  const copyToClipboard = () => {
    const textToCopy = resultText[currentPageIndexTab1]?.output_text || '';

    // Use the Clipboard API to copy text to the clipboard
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // Text successfully copied to clipboard
        // console.log('Text copied to clipboard:', textToCopy);
      })
      .catch((error) => {
        // Handle any errors that may occur
        console.error('Error copying text to clipboard:', error);
      });
  };

  useEffect(() => {
    // Check if microphone permission is granted when the component mounts
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setIsPermissionGranted(true);
      })
      .catch((error) => {
        console.error('Microphone permission denied:', error);
      });
  }, []);

  const startListening = () => {
    if (isPermissionGranted) {
      setIsMicEnabled(true);
      setIsListening(true);
      setTranscript(''); // Clear any previous transcription
      // Start listening for microphone input here using a speech recognition library
      // For example, you can use the Web Speech API
      const recognition = new window.SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onresult = (event) => {
        const last = event.results.length - 1;
        const spokenText = event.results[last][0].transcript;
        setTranscript(spokenText);
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsMicEnabled(false);
      };
      recognition.start();
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const reset = () => {
    setIsMicEnabled(false);
    setIsListening(false);
    setTranscript('');
  };

  const handleApply = () => {
    const parentElement = document.querySelector('div[gmail_original="1"]');

    if (parentElement) {
      // Get the dynamic text from templatePayload.generate_mail
      const dynamicText = templatePayload.generate_mail;

      // Split the dynamic text into sections based on line breaks
      const dynamicTextSections = dynamicText.split('\n');

      // Clear any existing content in the parent element
      parentElement.innerHTML = '';

      // Create a new div element for each section and add it to the parent element
      dynamicTextSections.forEach((sectionText, index) => {
        if (sectionText.trim() === '') {
          // Add a div element with a line break when there is a line break in the dynamic text
          const newDiv = document.createElement('div');
          newDiv.setAttribute('dir', 'ltr');
          newDiv.setAttribute('gmail_original', '1');
          newDiv.innerHTML = '<br>';
          parentElement.appendChild(newDiv);
        } else {
          // Add a div element with the dynamic text
          const newDiv = document.createElement('div');
          newDiv.setAttribute('dir', 'ltr');
          newDiv.setAttribute('gmail_original', '1');
          newDiv.innerHTML = sectionText;
          parentElement.appendChild(newDiv);
        }
      });
    } else {
      console.error('Element not found');
    }
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(templatePayload?.generate_mail);
    // navigator.clipboard.writeText(resultTextRep?.output_text);

    setCopied(true); // Set copied state to true when text is copied
    setTimeout(() => {
      setCopied(false); // Revert copied state to false after 2 seconds
    }, 2000);
  };

  const [language, setLanguage] = useState(false);
  const [profession, setProfession] = useState(false);

  const handleLanguage = () => {
    // setLanguage((prevLanguage) => (prevLanguage === 'English' ? '' : 'English'));
    setLanguage(!language);
    setProfession(false);
  };

  const handleprofession = () => {
    setProfession(!profession);
    setLanguage(false);
  };

  // console.log({selectedLang});
  return (
    <>
      <div className="px-[20px] py-[12px] relative">
        <div className="flex gap-2 right-[20px] -top-[38px] absolute z-30">
        <div className="flex gap-[8px]">
            <div
              className="p-[4px] pl-[8px] relative cursor-pointer w-[70px] bg-white rounded-[14px] border border-blue-600 justify-around items-center flex"
              onClick={handleLanguage}
            >
              <div className="text-indigo-950 text-xs font-medium font-['DM Sans']">
                <p className="text-[#5F6583] text-[12px]">{selectedLang}</p>
              </div>
              <div className="">
                <img className="w-[14] h-[14]" src={ArrowDown} />
              </div>
              {/* drop down */}
              <div
                className={`${
                  language ? 'block' : 'hidden'
                } w-[121px] bg-white rounded-lg shadow flex-col justify-start items-start gap-[8px] inline-flex absolute top-[30px] right-0 p-[8px] pt-[10] pb-[10px]`}
                style={{ zIndex: '99999999', boxShadow: '0px 2px 20px 0px rgba(0, 0, 0, 0.15)' }}
              >
                {exeLang?.map((element, index) => (
                  <div
                    className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                    key={index}
                    onClick={() => handleSelectLangChange(element.value)}
                  >
                    <div className="w-[97px] text-[14px] font-['DM Sans']">{element.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* profession */}
            <div
              className="p-[4px] pl-[8px] relative cursor-pointer w-[99px] bg-white rounded-[14px] border border-blue-600 justify-around items-center flex"
              onClick={() => handleprofession()}
            >
              <div className="text-indigo-950 text-xs font-medium font-['DM Sans']">
                <p className="text-[#5F6583] text-[12px]">{selectedOption}</p>
              </div>
              <div className="">
                <img className="w-[14] h-[14]" src={ArrowDown} />
              </div>
              {/* drop down */}
              <div
                className={`${
                  profession ? 'block' : 'hidden'
                } w-[121px] bg-white rounded-lg shadow flex-col justify-start items-start gap-[8px] inline-flex absolute top-[30px] right-0 p-[8px] pt-[10] pb-[10px]`}
                style={{ zIndex: '99999999', boxShadow: '0px 2px 20px 0px rgba(0, 0, 0, 0.15)' }}
              >
                {tones?.map((element, index) => (
                  <div
                    className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                    key={index}
                    onClick={() => handleSelectChange(element.value)}
                  >
                    <div className="w-[97px] text-[14px] font-['DM Sans']">{element.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <Select
            className="language w-[74px] h-[24px] flex gap-1 items-center justify-center rounded-full border border-primaryBlue px-[6px] py-[3px] bg-white text-[12px] font-medium text-darkBlue cursor-pointer"
            menuPlacement="top"
            // defaultValue={}
            // onChange={setSelectedOption}
            placeholder="select"
            options={exeLang}
            value={selectedLang}
            onChange={handleSelectLangChange}
            // menuIsOpen={true}
            styles={{
              // container: (base) => ({
              //   ...base,
              //   display: 'flex',
              //   alignItems: 'center', // Align items vertically in the center
              // }),
              control: (base) => ({
                ...base,
                // width: '40px', // Set the desired width here
                height: '16px', // You can adjust the height as needed
                minHeight: '16px',
                // padding: '4px 8px',
                borderRadius: '14px',
                border: '1px solid #1678F2', // Border color matching Figma
                background: 'none',
                boxShadow: 'none',
                fontSize: '12px',
                fontWeight: 'medium',
                color: '#19224C', // Text color
                cursor: 'pointer',
                // marginRight: '20px',
              }),
              menu: (base) => ({
                ...base,
                width: '121px',
                minWidth: '121px',
                right: '-9px',
              }),
              option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                // const color = chroma(data.color);
                // console.log({ data, isDisabled, isFocused, isSelected });
                return {
                  ...styles,
                  backgroundColor: isFocused ? '#F3F4F8' : null,
                  color: !isFocused ? '#8C90A5' : '#19224C',
                  margin: '8px',
                  width: 'auto',
                  borderRadius: '4px',
                  height: '21px',
                  lineHeight: '7px',
                  // padding: '4px 0px 4px 8px',
                  // minWidth: '143px',
                };
              },
              dropdownIndicator: (provided, state) => ({
                ...provided,
                transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
                // width: '14px',
              }),
            }}
          />
          <Select
            className="language w-[103px] h-[24px] flex gap-1 items-center justify-center rounded-full border border-primaryBlue px-[6px] py-[3px] bg-white text-[12px] font-medium text-darkBlue cursor-pointer"
            menuPlacement="top"
            // defaultValue={}
            // onChange={setSelectedOption}
            placeholder="select"
            options={tones}
            // menuIsOpen={true}
            value={selectedOption} // Pass the selected value here
            onChange={handleSelectChange} // Set the selected value when it changes
            styles={{
              control: (base) => ({
                ...base,
                height: '21px',
                minHeight: '21px',
                // width: '69px',
                border: 0,
                boxShadow: 'none',
              }),
              menu: (base) => ({
                ...base,
                width: '121px',
                minWidth: '121px',
                right: '-9px',
              }),
              option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                // const color = chroma(data.color);
                // console.log({ data, isDisabled, isFocused, isSelected });
                return {
                  ...styles,
                  backgroundColor: isFocused ? '#F3F4F8' : null,
                  color: !isFocused ? '#8C90A5' : '#19224C',
                  margin: '8px',
                  width: 'auto',
                  borderRadius: '4px',
                  height: '21px',
                  lineHeight: '7px',
                  // padding: '4px 0px 4px 8px',
                  // minWidth: '143px',
                };
              },
              dropdownIndicator: (provided, state) => ({
                ...provided,
                transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
              }),
            }}
          /> */}

          <button
            className="flex w-[76px] gap-1 items-center w-full rounded-md bg-white text-[12px] font-medium text-primaryBlue"
            onClick={() => {
              navigate('/savedtemplates');
            }}
          >
            <img src={TemplatesIcon} />
            <span className="text-primaryBlue text-[14px]">Templates</span>
          </button>
        </div>
        <div className="col-span-full mb-[11px]">
          <label for="input" className="block text-[12px] font-bold leading-6 text-darkBlue">
            SENDER'S INTENT
          </label>
          <div className="mt-2">
            <textarea
            readOnly
              style={{ resize: 'none' }}
              id="requestedText"
              name="requestedText"
              rows="7"
              value={senderIntent}
              onChange={(e) => handleInputChange(e)}
              placeholder=""
              className="text-[14px] border-gray block text-[#19224C] w-full rounded-md border p-1.5"
            />
          </div>
        </div>

        <div className="mb-[20px]">
          <div className="flex px-[10px] py-[12px] bg-lightblue1 font-medium rounded-md items-center justify-between gap-2 cursor-pointer" onClick={handlePlanInfo}>
            <div className="cursor-pointer w-full text-[12px]">
              IDEAS FOR REPLY
            </div>
            {isReplies ? (
              <img src={ArrowUP} onClick={handlePlanInfo} />
            ) : (
              <img src={ArrowDown} onClick={handlePlanInfo} />
            )}
          </div>
          {isReplies && (
            <div className="flex flex-col gap-2 border-t border-white py-[10px]">
              {ideasList.map((idea, index) => (
                <div
                  className="flex text-[12px] p-[15px] hoverIdeas items-start gap-2 rounded-[6px] cursor-pointer "
                  onClick={() => {
                    handleGetReply(idea);
                    setSelectedIdea(idea);
                    setComposeRes(false);
                  }}
                  key={index}
                  id={`idea-${idea.id}`} // Add a unique ID to each idea div
                >
                  <img src={idea.image_link} />
                  <div className="block">
                    <span className="text-[12px] font-bold mr-[5px]">{idea.type}</span>
                    <span className="text-[12px] font-[400]">{idea.idea}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex relative items-top gap-4 border rounded-md  border-gray p-[10px] mt-[10px] mb-[20px]">
          <div
            className={`flex items-center justify-center w-[24px] h-[24px] rounded-full cursor-pointer ${
              isStreamingComp ? 'disabled cursor-default' : ''
            }`}
            onClick={() => !isStreamingComp && handleAudioInput()}
            style={{
              boxShadow: '0px 0px 10px 0px #00000026',
            }}
          >
            <img src={MicrophoneIcon} />
          </div>
          <textarea
            style={{ resize: 'none', backgroundColor: isStreamingComp ? 'white' : '' }}
            id="chatText"
            name="chatText"
            rows="1"
            value={customIdea}
            placeholder="Tell me what to write for you"
            className="text-[14px] text-[#8C90A5] pt-[5px] block w-full rounded-md focus:outline-0"
            onChange={(e) => setCustomIdea(e.target.value)}
            onKeyDown={(e) => {
              // if (!isStreaming) {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleGetReply(customIdea);
                setCustomIdea('');
              }
              // }
            }}
            disabled={isStreamingComp}
          />
          {!isStreamingComp && (
            <button
              className={`absolute top-[12px] right-[12px] w-[20px] h-[20px] cursor-pointer focus:outline-0  ${
                isStreamingComp ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => handleGetReply(customIdea)}
              type="submit"
              disabled={isStreamingComp}
            >
              <img src={SendIcon} />
            </button>
          )}
          {/* {isMicEnabled && !isListening && (
            <div
              className="flex justify-between gap-2 items-center bg-green px-[8px] py-[12px] text-[12px] text-white rounded-[6px] cursor-pointer"
              onClick={startListening}
            >
              <div className="flex gap-2 items-center">
                <img src={MicrophoneWhiteIcon} />
                <span>Listening. Click again to submit, Esc to cancel</span>
              </div>
              <div className="cursor-pointer" onClick={reset}>
                <img src={SmallClose} />
              </div>
            </div>
          )}

          {!isMicEnabled && isPermissionGranted && (
            <div
              className="flex justify-between gap-2 items-center bg-yellow px-[8px] py-[12px] text-[12px] text-white rounded-[6px] cursor-pointer"
              onClick={startListening}
            >
              <div className="flex gap-2 items-center">
                <img src={MicrophoneWhiteIcon} />
                <span>Please allow Resala to use your microphone</span>
              </div>
              <div className="cursor-pointer" onClick={reset}>
                <img src={SmallClose} />
              </div>
            </div>
          )}

          {!isMicEnabled && !isPermissionGranted && (
            <div
              className="flex justify-between gap-2 items-center bg-primaryBlue px-[8px] py-[12px] text-[12px] text-white rounded-[6px] cursor-pointer"
              onClick={startListening}
            >
              <div className="flex gap-2 items-center">
                <img src={MicrophoneIcon} />
                <span>Hold Space or Click button to speak</span>
              </div>
              <div className="cursor-pointer" onClick={reset}>
                <img src={SmallClose} />
              </div>
            </div>
          )}

          {isListening && (
            <div
              className="flex justify-between gap-2 items-center bg-green px-[8px] py-[12px] text-[12px] text-white rounded-[6px] cursor-pointer"
              onClick={stopListening}
            >
              <div className="flex gap-2 items-center">
                <img src={MicrophoneWhiteIcon} />
                <span>Listening...</span>
              </div>
              <div className="cursor-pointer" onClick={reset}>
                <img src={SmallClose} />
              </div>
            </div>
          )}

          {transcript && (
            <div className="flex justify-between gap-2 items-center bg-green px-[8px] py-[12px] text-[12px] text-white rounded-[6px] cursor pointer">
              <div className="flex gap-2 items-center">
                <img src={MicrophoneWhiteIcon} />
                <span className="cursor-pointer">{transcript}</span>
              </div>
              <div className="cursor-pointer" onClick={reset}>
                <img src={SmallClose} />
              </div>
            </div>
          )} */}
        </div>
        {composeRes && (
          <div className="pb-[20px]">
            <div className="flex justify-between item-center">
              <div className="flex gap-2 items-center">
                <label for="input" className="block text-[12px] font-bold leading-6 text-gray1 whitespace-nowrap">
                  REPLY PREVIEW
                </label>
                {/* {resultText.length > 1 && ( */}
                <div className="flex gap-1">
                  <div
                    className="cursor-pointer"
                    onClick={() => setCurrentPageIndexTab1((prevIndex) => Math.max(prevIndex - 1, 0))}
                  >
                    <img className="w-[16px] h-[16px]" src={prevIcon} alt="Previous" />
                  </div>
                  <div className="text-[12px]">
                    <span className="text-darkBlue font-medium">{currentPageIndexTab1 + 1} </span>
                    <span className="text-gray1">/</span>
                    <span className="text-gray1"> {resultText.length}</span>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      setCurrentPageIndexTab1((prevIndex) => Math.min(prevIndex + 1, resultText.length - 1))
                    }
                  >
                    <img className="w-[16px] h-[16px]" src={nextIcon} alt="Next" />
                  </div>
                </div>
              </div>
              {/* )} */}
              {!isStreamingComp && (
                <div>
                  <button
                    className="flex gap-1 items-center w-full rounded-md bg-white text-[12px] font-medium text-primaryBlue"
                    onClick={() => setSaveTemplateBox(true)}
                  >
                    <span className="text-primaryBlue">Save Template</span>
                    <img src={SaveTemplate} />
                  </button>
                  <SaveTemplatePopup
                    setSaveTemplateBox={setSaveTemplateBox}
                    saveTemplateBox={saveTemplateBox}
                    draftResponse={templatePayload}
                    module="quickReply"
                  />
                </div>
              )}
              {isStreamingComp && (
                <div>
                  <button
                    className="flex gap-1 items-center w-full rounded-md bg-white text-[12px] font-medium text-primaryBlue"
                    onClick={() => {
                      handleStopDraft();
                    }}
                  >
                    <span className="text-primaryBlue">Stop</span>
                    <img src={StopResIcon} />
                  </button>
                </div>
              )}
            </div>
            {selectedIdea && (
              <div className="flex text-[14px] p-[15px] bg-lightblue1 items-start gap-2 rounded-t-[6px] cursor-pointer">
                <img src={selectedIdea.icon} />
                <div className="block">
                  <span className="font-bold mr-[5px]">{selectedIdea.type}</span>
                  {selectedIdea.idea}
                </div>
              </div>
            )}
            <textarea
              ref={draftPreviewTextareaRef}
              style={{ resize: 'none', minHeight: '3em', marginTop:'10px' }}
              id="draftPreview"
              name="draftPreview"
              // rows={calculateTextareaRows() || 2}
              value={
                resultText[currentPageIndexTab1]?.output_text ? resultText[currentPageIndexTab1]?.output_text : ''
                // : selectedTemplate?.output_text
              }
              placeholder=" "
              className="text-[14px] border-gray block w-full rounded-md border p-1.5"
            />
          </div>
        )}
        {composeRes && !isStreamingComp && (
          <div className="mt-1">
            <div className="flex gap-2 items-center">
              <button
                className="w-full rounded-md focus:outline-none bg-white px-1 py-[10px] text-[16px] font-medium text-darkgray1 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
                onClick={() => {
                  handleGetReply(selectedIdea);
                  setComposeRes(false);
                }}
                // disabled={resultTextRep !== '' ? '' : 'disabled'}
              >
                Regenerate
              </button>
              <button
                className="w-full rounded-md bg-white px-1 focus:outline-none py-[10px] text-[16px] font-medium text-darkgray1 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
                // disabled={resultTextRep !== '' ? '' : 'disabled'}
                // disabled={isStreamingComp}
                onClick={handleCopyDraft}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                className={`w-full rounded-md focus:outline-none bg-primaryBlue px-1 py-[10px] text-[16px] font-medium text-white focus:outline-none hover:opacity-90 disabled:cursor-none disabled:opacity-50 ${
                  isStreamingComp ? 'opacity-50 bg-lightblue4 cursor-not-allowed' : ''
                }`}
                disabled={isStreamingComp}
                onClick={handleApply}
                type="button"
              >
                Insert
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default QuickReply;
