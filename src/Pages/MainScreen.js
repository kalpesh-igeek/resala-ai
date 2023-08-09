import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RadioGroup } from '@headlessui/react';
import TypeWriterEffect from 'react-typewriter-effect';
import Header from '../Layout/Header';
import ArrowDown from '../utils/PopupBox/Icons/ArrowDown.svg';
import SaveTemplate from '../utils/SavedTemplates/Icons/SaveTemplate.svg';
import SaveTemplatePopup from '../Components/SaveTemplatePopup/SaveTemplatePopup';
import GeneralPromptViewPopup from '../Components/GeneralPromptViewPopup';
import UsingPromptInputBox from '../Components/UsingPromptInputBox';
import MyCustomPromptPopup from '../Components/MyCustomPromptPopup';
import UploadDocumentPopup from '../Components/UploadDocumentPopup';
import ChatHistory from '../Components/ChatHistory/ChatHistory';
import HowToUseInfoBox from '../Components/HowToUseInfoBox';
import QuickReply from '../Components/MainScreen/Tabs/QuickReply';

import TemplatesIcon from '../utils/SavedTemplates/Icons/TemplatesIcon.svg';
import SearchIcon from '../utils/Chat/Icons/SearchIcon.svg';
import NewChatIcon from '../utils/Chat/Icons/NewChatIcon.svg';
import CalenderIcon from '../utils/Chat/Icons/Suggestions/CalenderIcon.svg';
import FunIcon from '../utils/Chat/Icons/Suggestions/FunIcon.svg';
import HealthIcon from '../utils/Chat/Icons/Suggestions/HealthIcon.svg';
import JokeIcon from '../utils/Chat/Icons/Suggestions/JokeIcon.svg';
import MoneyIcon from '../utils/Chat/Icons/Suggestions/MoneyIcon.svg';
import MovieIcon from '../utils/Chat/Icons/Suggestions/MovieIcon.svg';
import NewsIcon from '../utils/Chat/Icons/Suggestions/NewsIcon.svg';
import QuoteIcon from '../utils/Chat/Icons/Suggestions/QuoteIcon.svg';
import RiddleIcon from '../utils/Chat/Icons/Suggestions/RiddleIcon.svg';
import WordIcon from '../utils/Chat/Icons/Suggestions/WordIcon.svg';

import SendIcon from '../utils/Chat/Icons/SendIcon.svg';
import UploadIcon from '../utils/Chat/Icons/UploadIcon.svg';
import SmallClose from '../utils/Chat/Icons/SmallClose.svg';
import MicrophoneIcon from '../utils/Chat/Icons/MicrophoneIcon.svg';
import MicrophoneWhiteIcon from '../utils/Chat/Icons/MicrophoneWhiteIcon.svg';
import KeyboardIcon from '../utils/Chat/Icons/KeyboardIcon.svg';
import SettingsIcon from '../utils/Chat/Icons/Controls/SettingsIcon.svg';
import SettingsIconHover from '../utils/Chat/Icons/Controls/SettingsIconHover.svg';
import DocIcon from '../utils/Chat/Icons/Controls/DocIcon.svg';
import DocIconHover from '../utils/Chat/Icons/Controls/DocIconHover.svg';
import HistoryIcon from '../utils/Chat/Icons/Controls/HistoryIcon.svg';
import MuteIcon from '../utils/Chat/Icons/Controls/MuteIcon.svg';

import TranslateIcon from '../utils/Chat/Icons/TranslateIcon.svg';
import ReadIcon from '../utils/Chat/Icons/ReadIcon.svg';
import CopyIcon from '../utils/Chat/Icons/CopyIcon.svg';
import RegenerateIcon from '../utils/Chat/Icons/RegenerateIcon.svg';
import AddCircle from '../utils/Chat/Icons/AddCircle.svg';
import MoreIcon from '../utils/Chat/Icons/MoreIcon.svg';
import EditIcon from '../utils/Chat/Icons/EditIcon.svg';
import HowToIcon from '../utils/Chat/Icons/HowToIcon.svg';

import PagePrevIcon from '../utils/Chat/Icons/Pagination/PagePrevIcon.svg';
import PageNextIcon from '../utils/Chat/Icons/Pagination/PageNextIcon.svg';

import SuggestionCloseIcon from '../utils/Chat/Icons/SuggestionCloseIcon.svg';
import InfoIcon from '../utils/Chat/Icons/InfoIcon.svg';
import Dropdown from 'react-dropdown';
import { Tab } from '@headlessui/react';
import Login from './Login';
import InputField from '../Components/InputField';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const actions = [
  { name: 'Polish' },
  { name: 'Improve' },
  { name: 'Simplify' },
  { name: 'Summarize' },
  { name: 'Explain' },
];

const lengths = [{ name: 'Auto' }, { name: 'Shorten' }, { name: 'Lengthy' }];

const tones = [
  { name: 'Professional' },
  { name: 'Casual' },
  { name: 'Straight' },
  { name: 'Confident' },
  { name: 'Friendly' },
];

const languages = [{ name: 'English' }, { name: 'Arabic' }];

const generalSuggestions = [
  {
    title: 'Tell me a joke',
    icon: JokeIcon,
    description: 'Lorem ipsum dolor sit amet consectetur. Aenean etiam mollis eu urna pellentesque mattis id',
    prompt: 'Give me 5 brainstorm ideas about [topic or keyword].',
  },
  {
    title: 'Quote of the day',
    icon: QuoteIcon,
    description: 'Lorem ipsum dolor sit amet consectetur. Aenean etiam mollis eu urna pellentesque mattis id',
    prompt: '',
  },
  {
    title: 'Top news',
    icon: NewsIcon,
    description: 'Lorem ipsum dolor sit amet consectetur. Aenean etiam mollis eu urna pellentesque mattis id',
    prompt: '',
  },
  {
    title: 'Fun fact',
    icon: FunIcon,
    description: 'Lorem ipsum dolor sit amet consectetur. Aenean etiam mollis eu urna pellentesque mattis id',
    prompt: '',
  },
  {
    title: 'Health tip',
    icon: HealthIcon,
    description: 'Lorem ipsum dolor sit amet consectetur. Aenean etiam mollis eu urna pellentesque mattis id',
    prompt: '',
  },
  {
    title: 'On this day',
    icon: CalenderIcon,
    description: 'Lorem ipsum dolor sit amet consectetur. Aenean etiam mollis eu urna pellentesque mattis id',
    prompt: '',
  },
  {
    title: 'Riddle time',
    icon: RiddleIcon,
    description: 'Lorem ipsum dolor sit amet consectetur. Aenean etiam mollis eu urna pellentesque mattis id',
    prompt: '',
  },
  {
    title: 'Word of the day',
    icon: WordIcon,
    description: 'Lorem ipsum dolor sit amet consectetur. Aenean etiam mollis eu urna pellentesque mattis id',
    prompt: '',
  },
  {
    title: 'Movie recommendation',
    icon: MovieIcon,
    description: 'Lorem ipsum dolor sit amet consectetur. Aenean etiam mollis eu urna pellentesque mattis id',
    prompt: '',
  },
  {
    title: 'How can I make money',
    icon: MoneyIcon,
    description: 'Lorem ipsum dolor sit amet consectetur. Aenean etiam mollis eu urna pellentesque mattis id',
    prompt: '',
  },
];

const savedInputs = [
  {
    title: 'Test Prompt',
    prompt: 'Give me 5 brainstorm ideas about [topic or keyword].',
  },
  {
    title: 'Brainstorm',
    prompt: 'Give me 5 brainstorm ideas about [topic or keyword].',
  },
  {
    title: 'Translate to English',
    prompt: 'Tranlate any inputs in english.',
  },
];

const chats = [
  {
    msg: 'Request Can you please clarify this email to me as what you’re actually requesting',
    type: 'user',
  },
  {
    msg: 'Lorem ipsum dolor sit amet consectetur. Morbi elementum pellentesque pulvinar sagittis consectetur. Mauris a amet bibendum nibh.',
    type: 'system',
  },
  {
    msg: 'Decline Can you pleaase clarify this email to me as what you’re actually requesting for me to do with this?',
    type: 'user',
  },
  {
    msg: 'Lorem ipsum dolor sit amet consectetur. Tellus hendrerit vitae nibh luctus mi id dignissim pharetra convallis. Rhoncus diam risus neque elementum viverra erat lacus in non. Sed rutrum diam aenean hendrerit aliquam ultrices. Posuere in vivamus non vestibulum consectetur tortor vel urna.',
    type: 'system',
  },
];

const outputlanguages = ['English', 'Arabic', 'French', 'Spanish'];

const defaultLanguage = outputlanguages[0];

const options = ['General', 'Social Media', 'Email', 'SMS'];

// const defaultOption = options[0];

const MainScreen = ({
  isLogin,
  setIsLogin,
  setIsLogout,
  requestedText,
  setRequestedText,
  handleClick,
  activeTab,
  CHAT,
  QUICKREPLY,
  SELECTION,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // const [suggestionBox, setSuggestionBox] = useState(true);

  const [selectedTemplate, setSelectedTempate] = useState(location.state?.template);
  const [isUsePrompt, setIsUsePrompt] = useState(false);
  const myRef = document.getElementById('#draftPreview');

  const [selectedAction, setSelectedAction] = useState(actions[0]);
  const [selectedLength, setSelectedLength] = useState(lengths[1]);
  const [selectedTone, setSelectedTone] = useState(tones[2]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[1]);

  const [selectedItems, setSelectedItems] = useState([
    { name: selectedAction.name },
    { name: selectedLength.name },
    { name: selectedTone.name },
    { name: selectedLanguage.name },
  ]);
  const [inputButtonBox, setInputButtonBox] = useState(false);
  const [saveTemplateBox, setSaveTemplateBox] = useState(false);

  const [resultText, setResultText] = useState('');
  const [speechText, setSpeechText] = useState('');
  const [speechLength, setSpeechLength] = useState(0);

  const [isUploadDocument, setIsUploadDocument] = useState(false);

  const [selectedPrompt, setSelectedPrompt] = useState({});
  const [isGeneralPromptViewPopup, setIsGeneralPromptViewPopup] = useState(false);

  const [isViewPrompts, setIsViewPrompts] = useState(true);
  const [chatData, setChatData] = useState(chats);

  const [settingsPopupBox, setSettingsPopupBox] = useState(false);

  const [customSelectedPrompt, setCustomSelectedPrompt] = useState({
    title: '',
    prompt: '',
  });
  const [isCustomPromptBox, setIsCustomPromptBox] = useState(false);
  const [addPromptBox, setAddPromptBox] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [isChatHistory, setIsChatHistory] = useState(false);

  const [audioInput, setAudioInput] = useState(false);
  const [isAudioInfoPopup, setIsAudioInfoPopup] = useState(false);

  const [isMicEnabled, setIsMicEnabled] = useState(false);

  useEffect(() => {
    if (selectedTemplate) {
      setRequestedText(selectedTemplate?.input);
      setSelectedAction(selectedTemplate?.configuration?.action);
      setSelectedLength(selectedTemplate?.configuration?.length);
      setSelectedTone(selectedTemplate?.configuration?.tone);
      setSelectedLanguage(selectedTemplate?.configuration?.language);
      setSelectedItems([
        { name: selectedTemplate?.configuration?.action?.name },
        { name: selectedTemplate?.configuration?.length?.name },
        { name: selectedTemplate?.configuration?.tone?.name },
        { name: selectedTemplate?.configuration?.language?.name },
      ]);
    }
  }, [selectedTemplate]);

  const handleAudioInfoPopup = () => {
    setIsAudioInfoPopup(true);
    setIsViewPrompts(false);
  };

  const handleSpeechInput = (e) => {
    setSpeechLength(e.target.value.length);
    setSpeechText(e.target.value);
  };

  const handleInputAction = (e, index, action) => {
    let tempArr = Array.from(selectedItems);
    tempArr[0].name = action.name;
    setSelectedItems(tempArr);
  };

  const handleInputLength = (e, index, length) => {
    let tempArr = Array.from(selectedItems);
    tempArr[1].name = length.name;
    setSelectedItems(tempArr);
  };

  const handleInputTone = (e, index, tone) => {
    let tempArr = Array.from(selectedItems);
    tempArr[2].name = tone.name;
    setSelectedItems(tempArr);
  };

  const handleInputLanguage = (e, index, language) => {
    let tempArr = Array.from(selectedItems);
    tempArr[3].name = language.name;
    setSelectedItems(tempArr);
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setRequestedText(e.target.value);
  };

  const handleGenerateDraft = () => {
    setInputButtonBox(false);
    setResultText(
      'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.'
    );
  };

  const handleInputButtonBox = () => {
    setInputButtonBox(!inputButtonBox);
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(resultText);
  };

  const handlePromptViewPopup = (prompt) => {
    setIsGeneralPromptViewPopup(true);
    setSelectedPrompt(prompt);
  };

  const handleSendMessage = (e, message) => {
    e.preventDefault();
    setIsUsePrompt(false);
    setIsViewPrompts(false);
    const newMessage = {};
    newMessage.msg = message;
    newMessage.type = 'user';
    setChatData([...chatData, newMessage]);
  };

  const handleNewPrompt = () => {
    setIsEdit(false);
    setCustomSelectedPrompt({ title: '', prompt: '' });
    setIsCustomPromptBox(true);
  };

  const handleCustomPrompt = (prompt) => {
    setIsEdit(true);
    setCustomSelectedPrompt(prompt);
    setIsCustomPromptBox(true);
  };

  const handleAudioInput = () => {
    setAudioInput(!audioInput);
  };

  const handleInputFromAudio = (e) => {
    setSpeechText(e.target.innerText);
    setAudioInput(false);
  };

  const TypeWriter = () => {
    return (
      <TypeWriterEffect startDelay={100} cursorColor="black" text={resultText} typeSpeed={20} scrollArea={myRef} />
    );
  };

  const handleUsePrompt = (item) => {
    setIsViewPrompts(false);
    setIsGeneralPromptViewPopup(false);
    setIsUsePrompt(true);
    navigate('/');
    setSelectedPrompt(item);
    setAddPromptBox(false);
    setSettingsPopupBox(false);
  };

  const handleCloseSettingPrompt = () => {
    setAddPromptBox(false);
    setSettingsPopupBox(false);
  };

  const handleOpenPrompt = () => {
    setSettingsPopupBox(false);
    setAddPromptBox(!addPromptBox);
  };

  const handleOpenSettings = () => {
    setAddPromptBox(false);
    setSettingsPopupBox(!settingsPopupBox);
  };

  const handleChatHistory = () => {
    setIsChatHistory(true);
    setAddPromptBox(false);
    setSettingsPopupBox(false);
  };
  return (
    <>
      {!isLogin ? (
        <Login isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : (
        <Header handleClick={handleClick} setIsLogout={setIsLogout} setIsLogin={setIsLogin}>
          <div className="text-[14px] text-darkBlue bg-white">
            <Tab.Group as="div" defaultIndex={activeTab === SELECTION ? 1 : activeTab === QUICKREPLY ? 2 : 0}>
              <div
                className="flex items-center justify-between px-[20px] bg-white relative z-20"
                style={{ boxShadow: '0px 2px 8px 0px #0000000D' }}
              >
                <Tab.List>
                  <Tab
                    key="chat"
                    className={({ selected }) =>
                      classNames(
                        selected ? 'border-primaryBlue text-black' : 'border-transparent text-gray1',
                        'flex-1 whitespace-nowrap border-b-2 py-[12px] text-[14px] font-medium mr-[30px] focus:outline-0'
                      )
                    }
                  >
                    Chat
                  </Tab>
                  {activeTab !== QUICKREPLY && (
                    <Tab
                      key="compose"
                      data-headlessui-state="selected"
                      className={({ selected }) =>
                        classNames(
                          selected ? 'border-primaryBlue text-black' : 'border-transparent text-gray1',
                          'flex-1 whitespace-nowrap border-b-2 py-[12px] text-[14px] font-medium mr-[30px] focus:outline-0'
                        )
                      }
                    >
                      Compose
                    </Tab>
                  )}
                  {activeTab === QUICKREPLY && (
                    <Tab
                      key="quickreply"
                      data-headlessui-state="selected"
                      className={({ selected }) =>
                        classNames(
                          selected ? 'border-primaryBlue text-black' : 'border-transparent text-gray1',
                          'flex-1 whitespace-nowrap border-b-2 py-[12px] text-[14px] font-medium mr-[30px] focus:outline-0'
                        )
                      }
                    >
                      Quick reply
                    </Tab>
                  )}
                </Tab.List>
              </div>
              <Tab.Panels as={Fragment}>
                <Tab.Panel key="chat">
                  <div className="px-[20px] py-[12px] relative bg-white">
                    <div className="flex items-center gap-2 right-[20px] -top-[33px] absolute z-[60]">
                      <button
                        className="flex gap-1 items-center justify-center w-full bg-lightblue1 rounded-full px-[9px] py-[5px] text-[12px] font-medium text-primaryBlue"
                        onClick={() => setIsUploadDocument(true)}
                      >
                        <img src={UploadIcon} />
                        <span className="text-primaryBlue text-[9px]">DocChat</span>
                      </button>
                      <Dropdown
                        className="language flex gap-1 items-center justify-center w-full rounded-full border border-primaryBlue px-[6px] py-[3px] bg-white text-[9px] font-medium text-primaryBlue cursor-pointer"
                        options={outputlanguages}
                        value={defaultLanguage}
                        arrowClosed={<img className="w-[10px] h-[10px]" src={ArrowDown} />}
                        arrowOpen={<img className="w-[10px] h-[10px] rotate-180" src={ArrowDown} />}
                      />
                    </div>
                    {!isViewPrompts ? (
                      <div className="bg-lightblue1 px-[66px] py-[16px] flex flex-col text-center rounded-[6px] relative z-50">
                        <div className="text-[14px] mb-[16px]">Find useful prompts from our prompts community.</div>
                        <div
                          className="text-[14px] font-bold text-primaryBlue cursor-pointer"
                          onClick={() => setIsViewPrompts(true)}
                        >
                          View Prompts
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white border border-gray p-[8] rounded-[6px] relative z-50">
                        <Tab.Group as="div" defaultIndex={0}>
                          <div className="flex gap-2 items-center">
                            <Tab.List className="border border-gray inline-flex rounded-[4px] h-[32px]">
                              <Tab
                                key="general"
                                className={({ selected }) =>
                                  classNames(
                                    selected
                                      ? 'border-primaryBlue text-black rounded-l-[4px]'
                                      : 'border-transparent text-gray1',
                                    'flex-1 whitespace-nowrap border p-[7px] -m-[1px] text-[12px] font-medium focus:outline-0'
                                  )
                                }
                              >
                                General
                              </Tab>
                              <Tab
                                key="my"
                                className={({ selected }) =>
                                  classNames(
                                    selected
                                      ? 'border-primaryBlue text-black rounded-r-[4px]'
                                      : 'border-transparent text-gray1',
                                    'flex-1 whitespace-nowrap border p-[7px] -m-[1px] text-[12px] font-medium focus:outline-0'
                                  )
                                }
                                onClick={handleCloseSettingPrompt}
                              >
                                My
                              </Tab>
                            </Tab.List>
                            <div className="border border-gray items-center flex w-full rounded-md px-[9px]">
                              <img src={SearchIcon} />
                              <InputField
                                className="block w-full rounded-md border-0 px-[9px] py-[7px] text-[12px] text-darkBlue placeholder:text-gray1 focus:outline-0"
                                name="search"
                                label=""
                                type="text"
                                placeholder="Search"
                              />
                            </div>
                            <div
                              className="absolute -top-[10] -right-[10px] cursor-pointer"
                              onClick={() => setIsViewPrompts(false)}
                            >
                              <img src={SuggestionCloseIcon} />
                            </div>
                          </div>
                          <Tab.Panels as={Fragment}>
                            <div className="grid">
                              <Tab.Panel key="general">
                                <div className="grid grid-cols-3 gap-2 pt-[8px]">
                                  {generalSuggestions.map((item) => (
                                    <div
                                      onClick={() => handlePromptViewPopup(item)}
                                      className="suggestion flex flex-col justify-end rounded-[6px] text-darkgray1 bg-lightblue1 p-[9px] text-[14px] cursor-pointer"
                                    >
                                      <div className="pb-[8px]">
                                        <img src={item.icon} />
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="w-full">{item.title}</span>
                                        <div className="info relative">
                                          <img src={InfoIcon} />
                                          <div
                                            className="info-box p-[7px] rounded-[6px] bg-white text-[12px] absolute bottom-[170%] right-[50%] translate-x-[50%] whitespace-nowrap border border-primaryBlue"
                                            onClick={() => handlePromptViewPopup(item)}
                                          >
                                            View info
                                            <span className="h-[10px] w-[10px] bg-white absolute right-0 left-0 m-auto -bottom-[6px] rotate-45 border-b border-r border-primaryBlue"></span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </Tab.Panel>
                              <Tab.Panel key="my" className="h-[305px] relative">
                                <div className="grid grid-cols-3 gap-2 pt-[8px]">
                                  {savedInputs.map((item) => (
                                    <React.Fragment>
                                      <div
                                        className="flex rounded-[6px] text-darkgray1 bg-lightblue1 p-[8px] text-[14px] cursor-pointer"
                                        onClick={() => handleUsePrompt(item)}
                                      >
                                        {item.title}
                                      </div>
                                    </React.Fragment>
                                  ))}
                                </div>
                                <div className="absolute bottom-0 right-0 gap-2 flex items-center">
                                  <span className="cursor-pointer">
                                    <img src={PagePrevIcon} />
                                  </span>
                                  <div className="">1 of 20</div>
                                  <span className="cursor-pointer">
                                    <img src={PageNextIcon} />
                                  </span>
                                </div>
                              </Tab.Panel>
                            </div>
                          </Tab.Panels>
                        </Tab.Group>
                      </div>
                    )}
                  </div>
                  <div className="bg-white w-[500px] items-center fixed right-0 bottom-0 p-[20px]">
                    <div className="text-[12px] max-h-[440px] overflow-y-auto flex flex-col-reverse">
                      <div className="">
                        {chatData.map((item) =>
                          item.type === 'user' ? (
                            <div className="flex justify-end">
                              <div
                                className="bg-lightblue1 max-w-[370px] p-[12px] flex flex-col rounded-tl-[6px] rounded-tr-[6px] rounded-br-0 rounded-bl-[6px] mb-[16px]"
                                style={{
                                  boxShadow: '0px 2px 4px 0px #0000000D',
                                }}
                              >
                                {item.msg}
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-start">
                              <div
                                className="message bg-white max-w-[370px] border border-gray p-[12px] flex flex-col mb-[16px] rounded-tl-[6px] rounded-tr-[6px] rounded-br-[6px] rounded-br-0 rounded-bl-0 relative"
                                style={{
                                  boxShadow: '0px 2px 4px 0px #0000000D',
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
                                <pre
                                  className="font-dmsans"
                                  style={{
                                    textWrap: 'wrap',
                                  }}
                                >
                                  {item.msg}
                                </pre>{' '}
                                {/* Remove <pre></pre> when new original response from chat GPT */}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="text-[12px] text-lightgray2 flex items-center gap-2 mb-[20px]">
                      <span>
                        <img src={RegenerateIcon} />
                      </span>
                      <span>Regenerate</span>
                    </div>
                    {isUsePrompt ? (
                      <UsingPromptInputBox
                        handleSendMessage={handleSendMessage}
                        isUsePrompt={isUsePrompt}
                        setIsUsePrompt={setIsUsePrompt}
                        SuggestionCloseIcon={SuggestionCloseIcon}
                        selectedPrompt={selectedPrompt}
                        SendIcon={SendIcon}
                        ArrowDown={ArrowDown}
                      />
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <button className="flex gap-1 items-center rounded-md bg-primaryBlue px-[6px] py-[6px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50">
                            <img src={NewChatIcon} />
                            New Chat
                          </button>
                          <div className="flex gap-[15px] items-center">
                            <button className="w-[20px] h-[20px]" onClick={handleChatHistory}>
                              <img src={HistoryIcon} />
                            </button>
                            <div className="relative">
                              <div
                                className="w-[20px] h-[20px] flex items-center justify-center cursor-pointer rounded-md bg-white"
                                onClick={handleOpenPrompt}
                              >
                                <img src={addPromptBox ? DocIconHover : DocIcon} />
                              </div>
                              <div
                                className={`chats-settings w-[143] flex flex-col gap-2 absolute right-0 bottom-[100%] bg-white p-[8px] rounded-[8px] ${
                                  addPromptBox ? 'block' : 'hidden'
                                }`}
                                style={{
                                  boxShadow: '0px 2px 20px 0px #00000026',
                                }}
                              >
                                <div className="text-[10px] flex items-center justify-between font-medium px-[8px] py-[4px]">
                                  My Prompts
                                  <span className="cursor-pointer" onClick={() => handleNewPrompt()}>
                                    <img src={AddCircle} />
                                  </span>
                                </div>
                                {savedInputs.map((item) => (
                                  <div className="promptEdit px-[8px] py-[4px] flex items-center justify-between gap-2 text-[10px] rounded-[4px] hover:bg-lightgray1">
                                    <div
                                      className="flex items-center gap-2 cursor-pointer "
                                      onClick={() => handleUsePrompt(item)}
                                    >
                                      <img src={MoreIcon} />
                                      {item.title}
                                    </div>
                                    <span className="editIcon cursor-pointer" onClick={() => handleCustomPrompt(item)}>
                                      <img className="w-[12px] h-[12px]" src={EditIcon} />
                                    </span>
                                  </div>
                                ))}
                                <div className="px-[8px] py-[4px] flex items-center gap-2 text-[10px] rounded-[4px] cursor-pointer hover:bg-lightgray1">
                                  <img src={MoreIcon} />
                                  Translate to...
                                </div>
                              </div>
                            </div>
                            <div className="relative">
                              <div
                                className="w-[20px] h-[20px] flex items-center justify-center cursor-pointer rounded-md bg-white"
                                onClick={handleOpenSettings}
                              >
                                <img src={settingsPopupBox ? SettingsIconHover : SettingsIcon} />
                              </div>
                              <div
                                className={`chats-settings w-[143] flex flex-col gap-2 absolute right-0 bottom-[100%] bg-white p-[8px] rounded-[8px] ${
                                  settingsPopupBox ? 'block' : 'hidden'
                                }`}
                                style={{
                                  boxShadow: '0px 2px 20px 0px #00000026',
                                }}
                              >
                                <div className="text-[10px] font-medium px-[8px] py-[4px]">Chat Setting</div>
                                <div className="text-[10px] flex items-center gap-2 text-darkblue bg-lightgray px-[8px] py-[4px]">
                                  <img src={TranslateIcon} />
                                  Respond Language
                                </div>
                                <Dropdown
                                  className="border border-gray rounded-md text-[10px] p-[4px]"
                                  options={outputlanguages}
                                  // onChange={this._onSelect}
                                  value={defaultLanguage}
                                  placeholder="Select template type"
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
                                />
                              </div>
                            </div>

                            <button className="w-[20px] h-[20px]">
                              <img src={MuteIcon} />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 relative">
                          <form>
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
                                      onClick={() => handleAudioInfoPopup()}
                                    >
                                      <img src={HowToIcon} />
                                      <span className="text-[10px]">How to use</span>
                                    </div>
                                    {isAudioInfoPopup && <HowToUseInfoBox setIsAudioInfoPopup={setIsAudioInfoPopup} />}
                                    <div className="inputLanguage flex items-center gap-2 text-[10px] relative">
                                      <div className="">Language</div>
                                      <Dropdown
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
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={`flex justify-between gap-2 items-center bg-primaryBlue px-[8px] py-[12px] text-[12px] text-white rounded-[6px] ${
                                    isMicEnabled ? '' : 'opacity-40'
                                  }`}
                                >
                                  <div className="flex gap-2 items-center">
                                    <img src={MicrophoneWhiteIcon} />
                                    {isMicEnabled ? (
                                      <span>Hold Space or Click button to speak</span>
                                    ) : (
                                      <span>Voice input disabled: Mic access denied</span>
                                    )}
                                  </div>
                                  <div onClick={() => console.log('closed')}>
                                    <img src={SmallClose} />
                                  </div>
                                </div>
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
                              <div className="flex items-top gap-4 border border-gray p-[10px]">
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
                                  id="chatText"
                                  name="chatText"
                                  rows="6"
                                  value={speechText}
                                  placeholder="Tell me what to write for you"
                                  className="text-[12px] pt-[5px] block w-full rounded-0 focus:outline-0"
                                  onChange={(e) => handleSpeechInput(e)}
                                />
                                <button
                                  className="absolute top-[12px] right-[12px] w-[20px] h-[20px] cursor-pointer focus:outline-0"
                                  onClick={(e) => handleSendMessage(e, speechText)}
                                  type="submit"
                                >
                                  <img src={SendIcon} />
                                </button>
                                <div className="absolute text-lightgray2 right-[12px] bottom-[10px] text-[12px]">
                                  {speechLength}/4000
                                </div>
                              </div>
                            )}
                          </form>
                        </div>
                      </>
                    )}
                  </div>
                </Tab.Panel>
                {activeTab !== QUICKREPLY && (
                  <Tab.Panel key="compose" data-headlessui-state="selected">
                    <div className="px-[20px] py-[12px] relative">
                      <div className="right-[20px] -top-[31px] absolute z-30">
                        <button
                          className="flex gap-1 items-center w-full rounded-md bg-white text-[12px] font-medium text-primaryBlue"
                          onClick={() => navigate('/savedtemplates')}
                        >
                          <img src={TemplatesIcon} />
                          <span className="text-primaryBlue text-[14px]">Templates</span>
                        </button>
                      </div>
                      {selectedTemplate !== undefined && (
                        <div className="flex items-center gap-3 mb-[15px]">
                          <div className="col-span-full items-center w-full">
                            <label for="input" className="block text-[10px] font-bold leading-6 text-gray1">
                              TEMPLATE NAME
                            </label>
                            <div>
                              <input
                                id="templatename"
                                name="templatename"
                                type="text"
                                value={selectedTemplate?.title}
                                placeholder="Name the template"
                                className="block w-full text-[10px] rounded-md border border-gray p-[10px] text-darkBlue placeholder:text-gray1"
                              />
                            </div>
                          </div>
                          <div className="col-span-full items-center w-full">
                            <label for="input" className="block text-[10px] font-bold leading-6 text-gray1">
                              TEMPLATE TYPE
                            </label>
                            <div>
                              <Dropdown
                                className="border border-gray rounded-md text-[10px] p-[10px]"
                                options={options}
                                // onChange={this._onSelect}
                                value={selectedTemplate?.type}
                                placeholder="Select template type"
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
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="col-span-full">
                        <label for="input" className="block text-[10px] font-bold leading-6 text-gray1">
                          INPUT
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="requestedText"
                            name="requestedText"
                            rows="7"
                            value={requestedText}
                            onChange={(e) => handleInputChange(e)}
                            placeholder="Lorem ipsum dolor sit amet consectetur."
                            className="text-[10px] border-gray block w-full rounded-md border p-1.5"
                          />
                        </div>
                      </div>
                      <div className="pt-[16px] pb-[10px] flex gap-2 justify-between items-center">
                        <div className="flex text-[14px] font-medium text-darkBlue whitespace-nowrap">AI Tools</div>

                        <div className="flex gap-2 items-center w-full" onClick={handleInputButtonBox}>
                          {selectedItems.map((item) => (
                            <button className="w-full rounded-md px-1 py-2 text-[12px] font-medium text-darkBlue border bg-lightblue1 border-lightblue">
                              {item.name}
                            </button>
                          ))}
                        </div>

                        <div
                          className={`w-[20px] flex text-[14px] font-medium text-darkBlue whitespace-nowrap justify-center cursor-pointer ${
                            !inputButtonBox ? '-rotate-90' : ''
                          }`}
                          onClick={handleInputButtonBox}
                        >
                          <img src={ArrowDown} />
                        </div>
                      </div>
                      <div className={!inputButtonBox ? `hidden` : `block`}>
                        <div className="pb-[20px]">
                          <label for="actions" className="block text-[10px] font-bold leading-6 text-gray1">
                            ACTION
                          </label>
                          <RadioGroup value={selectedAction} onChange={setSelectedAction}>
                            <div className="inline-flex gap-2 items-center">
                              {actions.map((action, index) => (
                                <RadioGroup.Option
                                  name="action"
                                  key={action.name}
                                  value={action}
                                  onClick={(e) => handleInputAction(e, index, action)}
                                  className={({ active, checked }) =>
                                    classNames(
                                      'cursor-pointer text-darkBlue',
                                      active || checked ? 'border-lightblue bg-lightblue1' : '',
                                      'w-[87px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                                    )
                                  }
                                >
                                  <RadioGroup.Label as="span">{action.name}</RadioGroup.Label>
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="pb-[20px]">
                          <label for="actions" className="block text-[10px] font-bold leading-6 text-gray1">
                            LENGTH
                          </label>
                          <RadioGroup value={selectedLength} onChange={setSelectedLength}>
                            <div className="inline-flex gap-2 items-center">
                              {lengths.map((length, index) => (
                                <RadioGroup.Option
                                  name="length"
                                  key={length.name}
                                  value={length}
                                  onClick={(e) => handleInputLength(e, index, length)}
                                  className={({ active, checked }) =>
                                    classNames(
                                      'cursor-pointer text-darkBlue',
                                      active || checked ? 'border-lightblue bg-lightblue1' : '',
                                      'w-[87px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                                    )
                                  }
                                >
                                  <RadioGroup.Label as="span">{length.name}</RadioGroup.Label>
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="pb-[20px]">
                          <label for="actions" className="block text-[10px] font-medium leading-6 text-gray1">
                            TONE
                          </label>
                          <RadioGroup value={selectedTone} onChange={setSelectedTone}>
                            <div className="inline-flex gap-2 items-center">
                              {tones.map((tone, index) => (
                                <RadioGroup.Option
                                  name="length"
                                  key={tone.name}
                                  value={tone}
                                  onClick={(e) => handleInputTone(e, index, tone)}
                                  className={({ active, checked }) =>
                                    classNames(
                                      'cursor-pointer text-darkBlue',
                                      active || checked ? 'border-lightblue bg-lightblue1' : '',
                                      'w-[87px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                                    )
                                  }
                                >
                                  <RadioGroup.Label as="span">{tone.name}</RadioGroup.Label>
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="pb-[10px]">
                          <label for="actions" className="block text-[10px] font-bold leading-6 text-gray1 uppercase">
                            Language
                          </label>
                          <RadioGroup value={selectedLanguage} onChange={setSelectedLanguage}>
                            <div className="inline-flex gap-2 items-center">
                              {languages.map((language, index) => (
                                <RadioGroup.Option
                                  name="length"
                                  key={language.name}
                                  value={language}
                                  onClick={(e) => handleInputLanguage(e, index, language)}
                                  className={({ active, checked }) =>
                                    classNames(
                                      'cursor-pointer text-darkBlue',
                                      active || checked ? 'border-lightblue bg-lightblue1' : '',
                                      'w-[87px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                                    )
                                  }
                                >
                                  <RadioGroup.Label as="span">{language.name}</RadioGroup.Label>
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                      <div className="pt-[15px] pb-[20px]">
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-primaryBlue px-3 py-2 text-sm leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() => handleGenerateDraft()}
                        >
                          Generate Draft
                        </button>
                      </div>
                      <div className="pb-[20px]">
                        <div className="flex justify-between item-center">
                          <label
                            for="input"
                            className="block text-[10px] font-bold leading-6 text-gray1 whitespace-nowrap"
                          >
                            DRAFT PREVIEW
                          </label>
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
                            />
                          </div>
                        </div>
                        <div
                          contentEditable="true"
                          id="draftPreview"
                          name="draftPreview"
                          rows="22"
                          placeholder="Lorem ipsum dolor sit amet consectetur."
                          className="text-[10px] border-gray block h-[306px] w-full rounded-md border p-1.5"
                        >
                          <TypeWriter />
                        </div>
                      </div>
                      <div className="mt-1">
                        <div className="flex gap-2 items-center">
                          <button
                            className="w-full rounded-md bg-white px-1 py-[10px] text-[12px] font-medium text-darkBlue border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
                            onClick={() => handleGenerateDraft()}
                            disabled={resultText !== '' ? '' : 'disabled'}
                          >
                            Regenerate
                          </button>
                          <button
                            className="w-full rounded-md bg-white px-1 py-[10px] text-[12px] font-medium text-darkBlue border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
                            disabled={resultText !== '' ? '' : 'disabled'}
                            onClick={handleCopyDraft}
                          >
                            Copy
                          </button>
                          <button
                            className="w-full rounded-md bg-primaryBlue px-1 py-[10px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                            disabled={resultText !== '' ? '' : 'disabled'}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </Tab.Panel>
                )}
                <Tab.Panel key="quickreply" data-headlessui-state="selected">
                  <QuickReply
                    TemplatesIcon={TemplatesIcon}
                    requestedText={requestedText}
                    handleInputChange={handleInputChange}
                    handleAudioInput={handleAudioInput}
                    MicrophoneIcon={MicrophoneIcon}
                    speechText={speechText}
                    handleSpeechInput={handleSpeechInput}
                    handleSendMessage={handleSendMessage}
                    speechLength={speechLength}
                    SendIcon={SendIcon}
                    saveTemplateBox={saveTemplateBox}
                    setSaveTemplateBox={setSaveTemplateBox}
                    resultText={resultText}
                    myRef={myRef}
                    outputlanguages={outputlanguages}
                    defaultLanguage={defaultLanguage}
                    selectedTone={selectedTone}
                    setSelectedTone={setSelectedTone}
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <GeneralPromptViewPopup
              setIsViewPrompts={setIsViewPrompts}
              selectedPrompt={selectedPrompt}
              setSelectedPrompt={setSelectedPrompt}
              setIsUsePrompt={setIsUsePrompt}
              isGeneralPromptViewPopup={isGeneralPromptViewPopup}
              setIsGeneralPromptViewPopup={setIsGeneralPromptViewPopup}
            />
            <MyCustomPromptPopup
              isEdit={isEdit}
              isCustomPromptBox={isCustomPromptBox}
              setIsCustomPromptBox={setIsCustomPromptBox}
              customSelectedPrompt={customSelectedPrompt}
              setCustomSelectedPrompt={setCustomSelectedPrompt}
            />
            <UploadDocumentPopup
              chatData={chatData}
              setIsViewPrompts={setIsViewPrompts}
              setChatData={setChatData}
              isUploadDocument={isUploadDocument}
              setIsUploadDocument={setIsUploadDocument}
            />
            <ChatHistory
              chatData={chatData}
              setChatData={setChatData}
              isChatHistory={isChatHistory}
              setIsChatHistory={setIsChatHistory}
            />
          </div>
        </Header>
      )}
    </>
  );
};

export default MainScreen;
