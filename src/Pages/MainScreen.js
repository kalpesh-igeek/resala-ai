import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RadioGroup } from '@headlessui/react';
import TypeWriterEffect from 'react-typewriter-effect';
import Header from '../Layout/Header';
import ArrowDown from '../utils/PopupBox/Icons/ArrowDown.svg';
import SaveTemplate from '../utils/SavedTemplates/Icons/SaveTemplate.svg';
import StopResIcon from '../utils/SavedTemplates/Icons/minus-cirlce.svg';
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
import newChatIcon from '../utils/MainScreen/Icons/messages-2.svg';
import readIcon from '../utils/MainScreen/Icons/book.svg';
import docChatIcon from '../utils/MainScreen/Icons/document-text.svg';
import hoverChat from '../utils/MainScreen/Icons/hover-message.svg';
import hoverBook from '../utils/MainScreen/Icons/hover-book.svg';
import hoverDoc from '../utils/MainScreen/Icons/hover-document-text.svg';
import stopIcon from '../utils/MainScreen/Icons/stop.svg';
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
import MoreIcon from '../utils/Chat/Icons/more2.svg';
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
import { getToken } from '../utils/localstorage';
import { getDefauPromptList, getPromptList } from '../redux/reducers/userPromptSlice/UserPromptSlice';
import { useDispatch, useSelector } from 'react-redux';
import { chatTextCheck, composeCheck, replyCheck } from '../utils/validation';
import {
  generalPromptChat,
  newChat,
  regenerateChat,
  userChat,
  userChatHistory,
  userChatNew,
} from '../redux/reducers/chatSlice/ChatSlice';
import LoadingGif from '../utils/Chat/Gif/loader.gif';
import Typewriter from '../Components/Typewriter';
import Select from 'react-select';
import { SpeechToText } from '../Components/SpeechToText';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { generateDraft, generateReply } from '../redux/reducers/composeSlice/ComposeSlice';
import writeIcon from '../utils/MainScreen/Tab/edit.svg';
import replyIcon from '../utils/MainScreen/Tab/message.svg';
import actionIcon from '../utils/MainScreen/Icons/award.svg';
import formatIcon from '../utils/MainScreen/Icons/receipt.svg';
import lengthIcon from '../utils/MainScreen/Icons/textalign-left.svg';
import toneIcon from '../utils/MainScreen/Icons/user-edit.svg';
import languageIcon from '../utils/MainScreen/Icons/ion_language-sharp.svg';
import ArrowLeft from '../utils/SavedTemplates/Icons/ArrowLeft.svg';
import ArrowRight from '../utils/SavedTemplates/Icons/arrow-right.svg';
import Close from '../utils/MainScreen/Icons/Close.svg';
import { getTemplateType, updateTemplate } from '../redux/reducers/templateSlice/TemplateSlice';
import Toast from '../utils/toast';
import { respondLanguage, updateLanguage } from '../redux/reducers/userSlice/UserSlice';
import useDebounce from '../utils/debounceSearch/useDebounce';
import { checkActivity } from '../redux/reducers/authSlice/AuthSlice';
import ChatData from '../Components/Chat/ChatData';
import AudioInput from '../Components/Chat/AudioInput';
import prevIcon from '../utils/MainScreen/Icons/prev.svg';
import nextIcon from '../utils/MainScreen/Icons/next.svg';
import axios from 'axios';

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

const format = [{ name: 'Auto' }, { name: 'Comment' }, { name: 'Email' }, { name: 'Message' }, { name: 'Twitter' }];

const lengths = [{ name: 'Auto' }, { name: 'Shorten' }, { name: 'Length' }];

const tones = [
  { name: 'Professional' },
  { name: 'Casual' },
  { name: 'Straight' },
  { name: 'Confident' },
  { name: 'Friendly' },
];

const languages = [{ name: 'English' }, { name: 'Arabic' }, { name: 'Hindi' }, { name: 'French' }, { name: 'Spanish' }];

const outputlanguages = ['English', 'Arabic', 'French', 'Spanish'];

const outputLanguages = [
  { value: 'english', label: 'English' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'french', label: 'French' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'gujarati', label: 'Gujarati' },
  { value: 'hindi', label: 'Hindi' },
];

const outputLanguagesVoice = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'Arabic' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'hi', label: 'Hindi' },
];

const defaultLanguage = outputlanguages[0];

// const defaultOption = options[0];

const Tabs = [
  {
    id: 1,
    type: 'Write',
    icon: writeIcon,
  },
  {
    id: 2,
    type: 'Reply',
    icon: replyIcon,
  },
];

const MainScreen = ({
  // isLogin,
  // setIsLogin,
  setIsLogout,
  requestedText,
  setRequestedText,
  handleClick,
  activeTab,
  CHAT,
  QUICKREPLY,
  SELECTION,
  setIsOpen,
  handleSidebar,
  handleCloseClick,
}) => {
  const TOKEN = getToken();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isLoading, historyId } = useSelector((state) => state.chat);
  const { Loading } = useSelector((state) => state.compose);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const chatId = sessionStorage.getItem('chatId');

  // const [suggestionBox, setSuggestionBox] = useState(true);

  const [selectedTemplate, setSelectedTempate] = useState(state?.template);
  const [isUsePrompt, setIsUsePrompt] = useState(false);

  const myRef = document.getElementById('#draftPreview');
  const [selectTab, setSelectTab] = useState(1);

  const [selectedAction, setSelectedAction] = useState();
  const [selectedFormat, setSelectedFormat] = useState();
  const [selectedLength, setSelectedLength] = useState();
  const [selectedTone, setSelectedTone] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();

  const [selectedItems, setSelectedItems] = useState([
    { name: selectTab === 1 ? selectedAction?.name : selectedFormat?.name },
    { name: selectedLength?.name },
    { name: selectedTone?.name },
    { name: selectedLanguage?.name },
  ]);
  var aiToolsLength = selectedItems.filter((data) => data?.name)?.length;
  // console.log('selectedItems', selectedItems.filter((data) => data?.name)?.length);
  const [inputButtonBox, setInputButtonBox] = useState(true);
  const [saveTemplateBox, setSaveTemplateBox] = useState(false);

  const [resultText, setResultText] = useState('');

  const [speechText, setSpeechText] = useState('');
  const [speechLength, setSpeechLength] = useState(0);

  const [isUploadDocument, setIsUploadDocument] = useState(false);

  const [selectedPrompt, setSelectedPrompt] = useState({});
  const [isGeneralPromptViewPopup, setIsGeneralPromptViewPopup] = useState(false);

  const [isViewPrompts, setIsViewPrompts] = useState(true);
  const [chatData, setChatData] = useState([]);
  // console.log('chatData', chatData);

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

  //Shubham
  // {Chat}

  const [chatInput, setChatInput] = useState({
    chatText: '',
  });
  const [errors, setErrors] = useState({});
  const [chatLoading, setChatLoading] = useState(false);

  const [promptList, setPromptList] = useState([]);
  const [generalPromptList, setGeneralPromptList] = useState([]);
  const [currPage, setCurrPage] = useState(1);

  const [search, setSearch] = useState('');
  const [selectedOption, setSelectedOption] = useState();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [historyMessage, setHistoryMessage] = useState(false);
  const [isTypewriterDone, setIsTypewriterDone] = useState(false);
  const [micPermission, setMicPermission] = useState('denied');
  const [permission, setPermission] = useState(false);
  const [startListen, setStartListen] = useState(true);
  const [startSpeech, setStartSpeech] = useState(true);
  const [micClicked, setMicClicked] = useState(false);

  const [composeRes, setComposeRes] = useState(false);
  const [isDraftPrev, setIsDraftPrev] = useState(false);
  const selectRef = useRef(null);
  const [templateType, setTemplateType] = useState([]);
  const [selectedTemplateType, setSelectedTemplateType] = useState();
  const [editTemplateName, setEditTemplateName] = useState({
    templatename: '',
    input_text: '',
  });
  const [languageList, setLanguageList] = useState([]);
  const [defaultLang, setDefaultLang] = useState();
  const debouncedSearch = useDebounce(search, 1000);
  const [generalPromptRes, setGeneralPromptRes] = useState(false);
  const [closeSpeech, setCloseSpeech] = useState(false);
  const [items, setItems] = useState([
    { id: 'chat', img: newChatIcon, hoverImg: hoverChat, label: 'New Chat', isHovered: false },
    { id: 'book', img: readIcon, hoverImg: hoverBook, label: 'Read Page', isHovered: false },
    { id: 'doc', img: docChatIcon, hoverImg: hoverDoc, label: 'Doc Chat', isHovered: false },
  ]);
  const [activeTabSub, setActiveTabSub] = useState('chat');
  const [switchedTabs, setSwitchedTabs] = useState(false);
  const [disableTypewriter, setDisableTypewriter] = useState(false);
  const [isNewDraft, setIsNewDraft] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(null);
  const [compLoading, setCompLoading] = useState(false);
  const [compRepLoading, setCompRepLoading] = useState(false);
  const [alreadyStreamed, setAllreadyStreamed] = useState(false);
  const chatContainerRef = useRef(null);
  const promptRef = useRef(null);
  const myPromptRef = useRef(null);

  const languageRef = useRef(null);

  useEffect(() => {
    if (selectTab) {
      setSelectedAction('');
      setSelectedFormat('');
      setSelectedLength('');
      setSelectedTone('');
      setSelectedLanguage('');
      aiToolsLength = 0;
    }
  }, [selectTab]);

  const updateIsNewFlag = () => {
    const updatedChatData = chatData.map((item) => {
      if (item.isNew) {
        return { ...item, isNew: false };
      }
      return item;
    });
    setChatData(updatedChatData);
  };

  //Prompt
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        promptRef.current &&
        !promptRef.current.contains(event.target) &&
        !myPromptRef.current.contains(event.target) &&
        !isCustomPromptBox
      ) {
        setAddPromptBox(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [promptRef, setAddPromptBox, isCustomPromptBox]);

  //myprompt
  useEffect(() => {
    function handleClickOutside(event) {
      if (myPromptRef.current && !myPromptRef.current.contains(event.target)) {
        setIsCustomPromptBox(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myPromptRef, setIsCustomPromptBox]);

  //language
  useEffect(() => {
    function handleClickOutside(event) {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setSettingsPopupBox(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [languageRef, setSettingsPopupBox]);

  // const updateRespondLang = async () => {
  //   const res = await dispatch(
  //     updateLanguage({
  //       object_id: selectedOption?.value,
  //     })
  //   );
  // };

  useEffect(() => {
    async function updateRespondLang() {
      const response = await dispatch(
        updateLanguage({
          object_id: selectedOption?.value,
        })
      );

      if (response?.payload?.status === 200) {
        let userPreferences = JSON.parse(localStorage.getItem('userPreferences'));
        userPreferences.Responed_language = selectedOption?.label;
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
      }
    }

    if (selectedOption?.value) {
      updateRespondLang();
    }
  }, [selectedOption?.value]);

  const fetchTemplateType = async () => {
    const res = await dispatch(getTemplateType());

    if (!res.payload) {
      return;
    }

    if (res.payload.status === 200) {
      setTemplateType(res.payload?.Result);
      // setTotalData(res.payload?.totalCount);
      // setIsLoading(false);
    }
  };

  const fetchRespondLanguage = async () => {
    const res = await dispatch(respondLanguage());

    if (!res.payload) {
      return;
    }

    if (res.payload.status === 200) {
      setLanguageList(res.payload?.Result);
      // setTotalData(res.payload?.totalCount);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    setSelectedTempate(state?.template);
    setEditTemplateName({
      templatename: selectedTemplate?.name,
      input_text: selectedTemplate?.input_text,
    });
    fetchTemplateType();
    fetchRespondLanguage();
  }, []);

  function transformResponse(response) {
    return {
      value: response?.value?.toLowerCase().substring(0, 2), // or any other logic you use to generate ids
      label: response?.label,
    };
  }

  useEffect(() => {
    const userPreferences = JSON.parse(localStorage.getItem('userPreferences'));

    // if (defaultLanguage) {
    setDefaultLang({ value: userPreferences?.Responed_language, label: userPreferences?.Responed_language });
    // }
  }, []);
  let transformedDefaultLang = transformResponse(defaultLang);

  //compose
  const [selectedText, setSelectedText] = useState({ input_text: requestedText });
  const [replyText, setReplyText] = useState({ original_text: '', reply: '' });

  const fetchprompts = async () => {
    const res = await dispatch(getPromptList());

    if (!res.payload) {
      return;
    }

    if (res.payload.status === 200) {
      setPromptList(res.payload?.Result);
      // setTotalData(res.payload?.totalCount);
      // setIsLoading(false);
    }
  };
  const handleSelectTab = (id) => {
    setSelectTab(id);
    setComposeRes(false);
    setErrors({});
  };

  const fetchGeneralPrompts = async () => {
    const res = await dispatch(
      getDefauPromptList({
        search: search,
      })
    );

    if (!res.payload) {
      return;
    }

    if (res.payload.status === 200) {
      setGeneralPromptList(res.payload?.Result);
      // setTotalData(res.payload?.totalCount);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (TOKEN) {
      fetchprompts();
    }
  }, [TOKEN]);

  useEffect(() => {
    if (TOKEN) {
      fetchGeneralPrompts();
    }
  }, [TOKEN, debouncedSearch]);

  const handleMouseEnter = (id) => {
    setItems(items.map((item) => (item.id === id ? { ...item, isHovered: true } : item)));
  };

  const handleMouseLeave = (id) => {
    setItems(items.map((item) => (item.id === id ? { ...item, isHovered: false } : item)));
  };

  const fetchChatHistory = async () => {
    const res = await dispatch(userChatHistory(historyId));
    if (!res.payload) {
      return;
    }
    if (res.payload.status === 200) {
      const responseData = res.payload.Result.chat;
      sessionStorage.setItem('chatId', res.payload.Result?.chat_id);
      const tempChatData = responseData.flatMap((item) => [
        {
          msg: item.question, // User's question
          type: 'user',
          loading: false,
        },
        {
          msg: item.answer, // AI's response
          type: 'ai',
          loading: false,
        },
      ]);
      // Add the new message objects to the existing chatData
      setChatData(tempChatData);
      setHistoryMessage(true);

      // You might also want to update the total data and loading states if needed
      // setTotalData(res.payload.totalCount);
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isChatHistory) {
      fetchChatHistory();
    }
  }, [historyId]);

  const handleBlur = () => {
    setIsMenuOpen(false);
  };

  const handleWindowClick = (e) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      setIsMenuOpen(false);
      // setSettingsPopupBox(false);
    }
  };

  useEffect(() => {
    navigator.permissions.query({ name: 'microphone' }).then((permissionStatus) => {
      setMicPermission(permissionStatus.state);
      // setStartSpeech(true);

      permissionStatus.onchange = function () {
        setMicPermission(this.state);
        // setStartSpeech(true);
      };
    });
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  //Speech to text

  const { transcript, interimTranscript, finalTranscript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    if (closeSpeech) {
      resetTranscript();
      SpeechRecognition.stopListening();
    }
  }, [closeSpeech]);

  const [isSpaceDown, setIsSpaceDown] = useState(false);

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
  const listenContinuously = () => {
    if (micPermission !== 'granted') {
      requestPermission();
    }
    if (micPermission === 'granted') {
      setPermission(true);
    }
    setStartSpeech(false);
    setStartListen(true);
    setMicClicked(true);
    SpeechRecognition.startListening({
      continuous: true,
      language: selectedOption?.value ? selectedOption?.value : 'en',
    });
  };

  useEffect(() => {
    if (!startSpeech) {
      setStartListen(true);
    }
  }, [startSpeech]);

  const requestPermission = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setMicPermission('granted');
        setStartListen(false);
        setStartSpeech(true);
        setStartListen(true);
        setPermission(true);
      })
      .catch((err) => {
        // Handle the error
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
    setPermission(false);

    resetTranscript();
    // console.log('transcript', transcript);
    // Show the first div
    // setShowFirstDiv(true);
  };

  useEffect(() => {
    if (selectedTemplate) {
      setInputButtonBox(!inputButtonBox);
      setRequestedText(selectedTemplate?.input);
      setSelectedAction({ name: selectedTemplate?.action });
      setSelectedFormat({ name: selectedTemplate?.action });
      setSelectedLength({ name: selectedTemplate?.length });
      setSelectedTone({ name: selectedTemplate?.tone });
      setSelectedLanguage({ name: selectedTemplate?.language });
      setSelectedItems([
        { name: selectedTemplate?.action },
        { name: selectedTemplate?.length },
        { name: selectedTemplate?.tone },
        { name: selectedTemplate?.language },
      ]);
    }
  }, [selectedTemplate]);

  const handleAudioInfoPopup = () => {
    // closeSpeechRecognition();
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
  // const handleInputFormat = (e, index, action) => {
  //   let tempArr = Array.from(selectedItems);
  //   tempArr[0].name = action.name;
  //   setSelectedItems(tempArr);
  // };

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
    setRequestedText(e.target.value);
  };

  const handleGenerateDraft = async (e) => {
    // setIsActivity(true);
    setIsDraftPrev(true);

    await dispatch(checkActivity(true));
    // setInputButtonBox(false);
    e.preventDefault();
    if (selectTab === 1 && !state?.edit) {
      setIsTypewriterDone(true);
      let errors;
      errors = composeCheck(selectedText);
      if (Object.keys(errors).length) {
        setErrors(errors);
        return;
      }
      if (!selectedText.input_text || !selectedText.input_text.trim()) {
        return;
      }

      const payload = {
        input_text: selectedText.input_text?.trim(),
        action: selectTab === 1 ? selectedAction?.name : selectedFormat?.name,
        length: selectedLength?.name,
        tone: selectedTone?.name,
        language: selectedLanguage?.name,
      };

      // const res = await dispatch(generateDraft(payload));
      // if (!res.payload) {
      //   return;
      // }
      // if (res.payload?.status === 200) {
      //   setComposeRes(true);
      //   setResultText(res.payload?.Result);
      //   setIsNewDraft(true); // add this line
      // }

      try {
        setCompLoading(true);
        // Call your new API here
        const response = await fetch('http://192.168.1.10:8000/compose/compose_stream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: getToken(),
          },
          body: JSON.stringify({
            input_text: selectedText.input_text?.trim(),
            action: selectTab === 1 ? selectedAction?.name : selectedFormat?.name,
            length: selectedLength?.name,
            tone: selectedTone?.name,
            language: selectedLanguage?.name,
            // Include other necessary parameters
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        // Process the response from your new API here
        const reader = response.body.getReader();
        let accumulatedMessage = '';

        while (true) {
          // setAllreadyStreamed(true);
          // setCompLoading(false);
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n');
          for (const line of lines) {
            // console.log('chunk', line);
            // if (line.startsWith('data: ')) {
            // const data = line.substring(6).trim(); // Remove "data: " prefix and trim spaces
            // Replace <br><br> with a newline
            data = line.replace(/#@#/g, '\n');
            // console.log('data', data);
            if (line.includes('connection closed')) {
              setIsTypewriterDone(false);
              setCompLoading(false);

              // Set the typewriter state to false when "connection closed" is encountered
            } else {
              // Exclude lines containing "connection closed" and append the word
              accumulatedMessage += data + '';
              console.log('accumulatedMessage', accumulatedMessage);
              setResultText(accumulatedMessage); // Set the result text here
            }
            // }
          }
        }

        // Update the chat data with the accumulated message, without the "Loading..." message
        setComposeRes(true);
        // setResultText(accumulatedMessage);
        setIsNewDraft(true);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
    if (selectTab === 2 && !state?.edit) {
      setIsTypewriterDone(true);
      // Check if input_text is empty or contains only whitespace
      // if ( !selectedText.input_text || !selectedText.input_text.trim()) {
      //   return;
      // }

      // Check if reply is empty or contains only whitespace
      if (!replyText.reply || !replyText.reply.trim() || !replyText.original_text || !replyText.original_text.trim()) {
        return;
      }

      const payload = {
        original_text: replyText.original_text?.trim(),
        what_to_reply: replyText.reply?.trim(),
        action: selectTab === 1 ? selectedAction?.name : selectedFormat?.name,
        length: selectedLength?.name,
        tone: selectedTone?.name,
        language: selectedLanguage?.name,
      };

      // const res = await dispatch(generateReply(payload));
      // if (!res.payload) {
      //   return;
      // }
      // if (res.payload?.status === 200) {
      //   setComposeRes(true);
      //   setResultText(res.payload?.Result);
      //   setIsNewDraft(true); // add this line
      // }
      try {
        setCompRepLoading(true);
        // Call your new API here
        const response = await fetch('http://192.168.1.10:8000/compose/generate_stream_reply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: getToken(),
          },
          body: JSON.stringify({
            original_text: replyText.original_text?.trim(),
            what_to_reply: replyText.reply?.trim(),
            action: selectTab === 1 ? selectedAction?.name : selectedFormat?.name,
            length: selectedLength?.name,
            tone: selectedTone?.name,
            language: selectedLanguage?.name,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        // Process the response from your new API here
        const reader = response.body.getReader();
        let accumulatedMessage = '';

        while (true) {
          // setCompLoading(false);
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n');
          for (const line of lines) {
            // console.log('chunk', line);
            // if (line.startsWith('data: ')) {
            // const data = line.substring(6).trim(); // Remove "data: " prefix and trim spaces
            // Replace <br><br> with a newline
            data = line.replace(/#@#/g, '\n');
            // console.log('data', data);
            if (line.includes('connection closed')) {
              setIsTypewriterDone(false);
              setCompRepLoading(false);
              // Set the typewriter state to false when "connection closed" is encountered
            } else {
              // Exclude lines containing "connection closed" and append the word
              accumulatedMessage += data + '';
              setResultText(accumulatedMessage); // Set the result text here
            }
            // }
          }
        }

        // Update the chat data with the accumulated message, without the "Loading..." message
        setComposeRes(true);
        // setResultText(accumulatedMessage);
        setIsNewDraft(true);
        // setChatData((prevMessages) => [
        //   ...prevMessages.slice(0, loadingMessageIndex), // Keep all messages before the "Loading..." message
        //   { msg: accumulatedMessage?.trim(), type: 'ai' }, // Add the new message
        //   ...prevMessages.slice(loadingMessageIndex + 1), // Keep all messages after the "Loading..." message
        // ]);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
    if (state?.edit) {
      setIsTypewriterDone(true);
      const payload = {
        input_text: editTemplateName.input_text,
        action: selectTab === 1 ? selectedAction?.name : selectedFormat?.name,
        length: selectedLength?.name,
        tone: selectedTone?.name,
        language: selectedLanguage?.name,
      };

      const res = await dispatch(generateDraft(payload));
      if (!res.payload) {
        return;
      }
      if (res.payload?.status === 200) {
        setComposeRes(true);
        setResultText(res.payload?.Result);
        setIsNewDraft(true); // add this line
      }
    }

    // setResultText(
    //   'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.'
    // );
  };

  //update template

  const handleUpdateTemplate = async (e) => {
    e.preventDefault();
    const updatePayload = {
      id: selectedTemplate?.id,
      payload: {
        name: editTemplateName?.templatename,
        input_text: editTemplateName.input_text,
        output_text: resultText?.output_text ? resultText?.output_text : selectedTemplate?.output_text,
        type: selectedTemplateType?.value ? selectedTemplateType?.value : selectedTemplate?.type?.id,
        action: selectedAction?.name,
        length: selectedLength?.name,
        tone: selectedTone?.name,
        language: selectedLanguage?.name,
      },
    };

    const res = await dispatch(updateTemplate(updatePayload));
    if (!res.payload) {
      return;
    }
    if (res.payload?.status === 200) {
      Toast('success', 'Template updated successfully');
      navigate('/savedtemplates');
    }
  };

  const handleInputButtonBox = () => {
    setInputButtonBox(!inputButtonBox);
  };

  const handleCopyDraft = () => {
    console.log('resultText?.output_text', resultText?.output_text);
    navigator.clipboard.writeText(resultText?.output_text);
  };

  const handlePromptViewPopup = (prompt) => {
    setIsGeneralPromptViewPopup(true);
    setSelectedPrompt(prompt);
  };

  //Shubham

  const handleSelectVoice = (voiceText) => {
    setChatInput({ chatText: voiceText });
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
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const maxCharacterCount = 4000; // Set your desired character limit here
    // if (name === 'chatText') {
    //   if (value.length > maxCharacterCount) {
    //     // If the input exceeds the character limit, truncate it
    //     const truncatedValue = value.substring(0, maxCharacterCount);
    //     e.target.value = truncatedValue;
    //     setSpeechLength(maxCharacterCount);
    //   } else {
    //     setSpeechLength(value.length);
    //   }
    // }

    // if (value.length >= maxCharacterCount) {
    //   e.preventDefault();
    //   e.stopPropogation();
    // }
    // setSpeechLength(e.target.value?.length);
    setChatInput({
      ...chatInput,
      [name]: value,
    });
    setEditTemplateName({
      ...editTemplateName,
      [name]: value,
    });

    if (errors[name])
      setErrors((error) => {
        let errorNew = { ...error };
        delete errorNew[name];
        return errorNew;
      });
  };

  const isSpecialCharacter = (word) => {
    const specialCharacters = '!#$%^&*()_+{}[]|\\;:,.?/';
    const apostrophe = "'";
    if (apostrophe.includes(word)) {
      return false;
    } else return specialCharacters.includes(word);
  };
  // const handleSendMessage = async (e, message, language) => {
  //   // chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  //   chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

  //   setSpeechLength(0);
  //   setIsUsePrompt(false);
  //   setHistoryMessage(false);

  //   // setIsActivity(true);
  //   await dispatch(checkActivity(true));
  //   e.preventDefault();

  //   if (chatLoading) {
  //     return;
  //   }

  //   // if (message?.name) {
  //   //   const newMessage = {};
  //   //   newMessage.msg = message?.name;
  //   //   newMessage.type = 'user';
  //   //   newMessage.loading = true;
  //   //   const loadingMessage = {};
  //   //   loadingMessage.type = 'loading';

  //   //   const tempChatData = [...chatData, newMessage, loadingMessage];
  //   //   // setLastUserMessageIndex(tempChatData.length - 1); // Store the index of the last user message
  //   //   setChatData(tempChatData);

  //   //   let payload = {};

  //   //   payload = {
  //   //     prompt_id: +message?.id,
  //   //     chat_id: chatId,
  //   //     // language: isUsePrompt ? language : selectedOption.value ? selectedOption.value : 'auto',
  //   //   };

  //   //   setChatLoading(true);
  //   //   const res = await dispatch(generalPromptChat(payload));
  //   //   // const resNew = await dispatch(userChatNew(payload));
  //   //   // console.log('resNew', resNew);
  //   //   if (!res.payload) {
  //   //     setChatLoading(false);
  //   //     return;
  //   //   }
  //   //   if (res.payload?.status === 200) {
  //   //     // if (lastUserMessageIndex !== null) {
  //   //     //   tempChatData[lastUserMessageIndex].loading = false; // Set loading to false for the last user message
  //   //     // }
  //   //     setSelectedOption({ value: 'auto' });
  //   //     // setAiResponseReceived(false);
  //   //     // setAiResponseLoading(true);

  //   //     setChatLoading(false);
  //   //     const aiResponse = {};
  //   //     aiResponse.msg = res.payload.Result;
  //   //     aiResponse.loading = false;
  //   //     aiResponse.type = 'ai';
  //   //     aiResponse.isNew = true; // add this line
  //   //     tempChatData.pop();
  //   //     tempChatData.push(aiResponse);
  //   //     if (aiResponse) {
  //   //       // setAiResponseLoading(false);
  //   //       // setAiResponseReceived(true);
  //   //     }
  //   //     setChatData(tempChatData);
  //   //   }
  //   //   setChatInput({
  //   //     ...chatInput,
  //   //     chatText: '',
  //   //   });
  //   // } else {
  //   //   const trimmedMessage = message.trim();
  //   //   if (!trimmedMessage) {
  //   //     return;
  //   //   }

  //   //   const newMessage = {};
  //   //   newMessage.msg = message;
  //   //   newMessage.type = 'user';
  //   //   newMessage.loading = true;
  //   //   const loadingMessage = {};
  //   //   loadingMessage.type = 'loading';

  //   //   const tempChatData = [...chatData, newMessage, loadingMessage];
  //   //   // setLastUserMessageIndex(tempChatData.length - 1); // Store the index of the last user message
  //   //   setChatData(tempChatData);

  //   //   let payload = {};

  //   //   payload = {
  //   //     question: isUsePrompt ? message : chatInput.chatText ? chatInput.chatText : message,
  //   //     chatId: chatId,
  //   //     // language: isUsePrompt ? language : selectedOption.value ? selectedOption.value : 'auto',
  //   //   };

  //   //   setChatLoading(true);
  //   //   const res = await dispatch(userChat(payload));
  //   //   // console.log('res', res);
  //   //   // const resNew = await dispatch(userChatNew(payload));
  //   //   // console.log('resNew', resNew);
  //   //   if (!res.payload) {
  //   //     setChatLoading(false);
  //   //     return;
  //   //   }
  //   //   if (res.payload?.status === 200) {
  //   //     // if (lastUserMessageIndex !== null) {
  //   //     //   tempChatData[lastUserMessageIndex].loading = false; // Set loading to false for the last user message
  //   //     // }
  //   //     setSelectedOption({ value: 'auto' });
  //   //     // setAiResponseReceived(false);
  //   //     // setAiResponseLoading(true);

  //   //     setChatLoading(false);
  //   //     const aiResponse = {};
  //   //     aiResponse.msg = res.payload.Result;
  //   //     aiResponse.loading = false;
  //   //     aiResponse.type = 'ai';
  //   //     aiResponse.isNew = true; // add this line
  //   //     tempChatData.pop();
  //   //     tempChatData.push(aiResponse);
  //   //     if (aiResponse) {
  //   //       // setAiResponseLoading(false);
  //   //       // setAiResponseReceived(true);
  //   //     }
  //   //     setChatData(tempChatData);
  //   //   }
  //   //   setChatInput({
  //   //     ...chatInput,
  //   //     chatText: '',
  //   //   });
  //   // }
  // };

  //good
  // const handleSendMessage = async (e, message, language) => {
  //   // Add the user message to the chat data
  //   setChatData((prevMessages) => [...prevMessages, { msg: message, type: 'user' }]);
  //   let accumulatedMessage = ''; // To accumulate words
  //   // Add the "Loading..." message initially
  //   setChatData((prevMessages) => [...prevMessages, { msg: 'Loading...', type: 'loading' }]);
  //   try {
  //     const response = await fetch('http://192.168.1.10:8000/chat/stream_chat', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*',
  //         Authorization: getToken(),
  //       },
  //       body: JSON.stringify({
  //         question: message,
  //         chatId: chatId,
  //       }),
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  //     }
  //     const reader = response.body.getReader();
  //     // Continuously read and append the streaming response
  //     while (true) {
  //       const { done, value } = await reader.read();
  //       if (done) break;
  //       const chunk = new TextDecoder().decode(value);
  //       // Process and display the received message
  //       const lines = chunk.split('\n');
  //       for (const line of lines) {
  //         if (line.startsWith('data: ')) {
  //           const data = line.substring(6); // Remove "data: " prefix
  //           // Exclude lines containing "connection closed"
  //           if (!data.includes('connection closed')) {
  //             accumulatedMessage += data + ' '; // Append the word
  //           }
  //         }
  //       }
  //       // Update the chat data with the accumulated message, without the "Loading..." message
  //       setChatData((prevMessages) => [
  //         ...prevMessages.slice(0, -1), // Remove the last (Loading...) message
  //         { msg: accumulatedMessage, type: 'ai' }, // Update the chat data
  //       ]);
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //     // Handle the error as needed
  //   }
  // };

  const handleSendMessage = async (e, message, language) => {
    setIsUsePrompt(false);
    setAllreadyStreamed(true);
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    if (alreadyStreamed) {
      return;
    }
    if (message?.name) {
      // Add the user message to the chat data
      setChatData((prevMessages) => [...prevMessages, { msg: message.name, type: 'user' }]);

      setChatData((prevMessages) => [...prevMessages, { msg: 'Loading...', type: 'loading' }]);

      try {
        // Call your new API here
        // const USER_TOKEN = getToken();
        const response = await fetch('http://192.168.1.10:8000/chat/general_prompt_response_stream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: getToken(),
          },
          body: JSON.stringify({
            chat_id: chatId,
            prompt_id: message.id,
            // Include other necessary parameters
          }),
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
            // console.log('chunk', line);
            // if (line.startsWith('data: ')) {
            // const data = line.substring(6).trim(); // Remove "data: " prefix and trim spaces
            // Replace <br><br> with a newline
            data = line.replace(/#@#/g, '\n');
            if (line.includes('connection closed')) {
              setIsTypewriterDone(false);
              setAllreadyStreamed(false);
              // Set the typewriter state to false when "connection closed" is encountered
            } else {
              // Exclude lines containing "connection closed" and append the word
              accumulatedMessage += data + '';
              setChatData((prevMessages) => [
                ...prevMessages.slice(0, prevMessages.length - 1), // Keep all but the last (Loading...) message
                { msg: accumulatedMessage, type: 'ai' }, // Add the new message
              ]);
            }
            // }
          }
        }

        // Update the chat data with the accumulated message, without the "Loading..." message

        // setChatData((prevMessages) => [
        //   ...prevMessages.slice(0, loadingMessageIndex), // Keep all messages before the "Loading..." message
        //   { msg: accumulatedMessage?.trim(), type: 'ai' }, // Add the new message
        //   ...prevMessages.slice(loadingMessageIndex + 1), // Keep all messages after the "Loading..." message
        // ]);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    } else {
      // Add the user message to the chat data
      setChatData((prevMessages) => [...prevMessages, { msg: message, type: 'user' }]);
      let accumulatedMessage = ''; // To accumulate words
      let isTypewriterDone = false; // Initialize the typewriter state
      // Add the "Loading..." message initially
      setChatData((prevMessages) => [...prevMessages, { msg: 'Loading...', type: 'loading' }]);
      try {
        const response = await fetch('http://192.168.1.10:8000/chat/stream_chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: getToken(),
          },
          body: JSON.stringify({
            question: message,
            chatId: chatId,
          }),
        });
        // const payload = {
        //   question: message,
        //   chatId: chatId,
        // };

        // const response = await dispatch(userChatNew(payload));
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        const reader = response.body.getReader();
        // Continuously read and append the streaming response
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = new TextDecoder().decode(value);
          // Process and display the received message
          const lines = chunk.split('\n');
          for (const line of lines) {
            // console.log('chunk', line);
            // if (line.startsWith('data: ')) {
            // const data = line.substring(6).trim(); // Remove "data: " prefix and trim spaces
            // Replace <br><br> with a newline
            data = line.replace(/#@#/g, '\n');
            if (line.includes('connection closed')) {
              // Set the typewriter state to false when "connection closed" is encountered
              setAllreadyStreamed(false);
              isTypewriterDone = true;
            } else {
              // Exclude lines containing "connection closed" and append the word
              accumulatedMessage += data + '';
            }
            // }
          }
          // Update the chat data with the accumulated message, without the "Loading..." message
          setChatData((prevMessages) => [
            ...prevMessages.slice(0, -1), // Remove the last (Loading...) message
            { msg: accumulatedMessage?.trim(), type: 'ai' }, // Update the chat data
          ]);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        // Handle the error as needed
      }
      // Set the isTypewriterDone state to false when "connection closed" is encountered
      if (isTypewriterDone) {
        setIsTypewriterDone(false);
      }
    }
  };

  const handleRegenerate = async () => {
    const updatedChatData = [...chatData];
    const loadingMessage = { msg: 'Loading...', type: 'loading' };

    // Remove the last AI message and add the loading message
    if (updatedChatData[updatedChatData.length - 1].type === 'ai') {
      updatedChatData.pop();
      updatedChatData.push(loadingMessage);
    }

    setChatData(updatedChatData);

    const payload = { chatId: chatId };

    try {
      const response = await fetch('http://192.168.1.10:8000/chat/regenerate_stream_response', {
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
            setIsTypewriterDone(false);
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
        if (updatedChatData[updatedChatData.length - 1].type === 'loading') {
          updatedChatData.pop();
          updatedChatData.push({ msg: accumulatedMessage?.trim(), type: 'ai' });
        }

        setChatData(updatedChatData);
      } else {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleNewChat = async () => {
    const res = await dispatch(newChat());
    if (!res.payload) {
      return;
    }
    if (res.payload?.status === 200) {
      setChatInput({ chatText: '' });
      setChatData([]);
    }
  };
  const handleSelectItems = (id) => {
    if (id === 'chat') {
      handleNewChat();
    }
    if (id === 'doc') {
      setIsUploadDocument(true);
    }
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
    // closeSpeechRecognition();
    SpeechRecognition.stopListening();
    setStartListen(true);
    setStartSpeech(true);
    setMicClicked(false);
    resetTranscript();
  };

  const handleInputFromAudio = (e) => {
    setSpeechText(e.target.innerText);
    setAudioInput(false);
  };

  //compose functions

  const handleChangeCompose = (e) => {
    const { name, value } = e.target;
    setSelectedText({
      ...selectedText,
      [name]: value,
    });
    setReplyText({
      ...replyText,
      [name]: value,
    });

    if (errors[name])
      setErrors((error) => {
        let errorNew = { ...error };
        delete errorNew[name];
        return errorNew;
      });
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

  const handleClose = () => {
    handleSidebar();
    setIsOpen(false);
  };

  // const handleApply = () => {
  //   const focusedElement = document.activeElement;
  //   console.log('focusedElement', focusedElement);
  //   console.log('focusedElement.tagName', focusedElement.tagName);
  //   if (focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA') {
  //     focusedElement.value = resultText.output_text || resultText || selectedTemplate?.output_text;
  //   }
  // };
  const handleApply = () => {
    // Step 2: Retrieve the generated draft text (resultText)
    //   const generatedDraft = resultText.output_text || resultText || selectedTemplate?.output_text;
    // Step 3: Detect when a user focuses on an input field outside your extension
    // You can add an event listener for input field focus
    document.addEventListener('focusin', handleInputFieldFocus);
    // Step 4: Store the generated draft text in a state or a variable
    // For example, you can use React state to store the generated draft text
    // ... code to set the generated draft text in state
  };
  // Step 3: Handle input field focus
  const handleInputFieldFocus = (event) => {
    const target = event.target;
    console.log('target', target);
    // Check if the focused element is an input field
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      // Step 4: Insert the generated draft text into the focused input field
      // You can set the input field's value to the generated draft text
      target.value = resultText.output_text;
    }
    // Remove the event listener to prevent unnecessary calls
    document.removeEventListener('focusin', handleInputFieldFocus);
  };

  return (
    <>
      {!TOKEN ? (
        <Login
        // isLogin={isLogin}
        // setIsLogin={setIsLogin}
        />
      ) : (
        <Header
          handleClick={handleClick}
          setIsLogout={setIsLogout}
          handleCloseClick={handleCloseClick}
          // isActivity={isActivity}
          // setIsLogin={setIsLogin}
        >
          <div className="text-[14px] text-darkBlue bg-white">
            <Tab.Group as="div" defaultIndex={activeTab === SELECTION ? 1 : activeTab === QUICKREPLY ? 2 : 0}>
              {!selectedTemplate ? (
                <div
                  className="flex items-center justify-between px-[20px] bg-white relative z-20 border-b-gray border-b-[1px] border-l-gray border-l-[1px]"
                  // style={{ boxShadow: '0px 2px 8px 0px #0000000D' }}
                  // style={{ position: 'sticky', top: '57px', zIndex: '20px' }}
                >
                  <Tab.List>
                    <Tab
                      key="chat"
                      className={({ selected }) =>
                        classNames(
                          selected ? 'border-primaryBlue text-black' : 'border-transparent text-gray1',
                          'flex-1 whitespace-nowrap border-b-2 py-[12px] text-[16px] font-medium mr-[30px] focus:outline-0'
                        )
                      }
                      onClick={() => {
                        setActiveTabSub('chat');
                        setSwitchedTabs(true);
                        updateIsNewFlag(); // add this line
                        setIsNewDraft(false); // add this line
                      }}
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
                            'flex-1 whitespace-nowrap border-b-2 py-[12px] text-[16px] font-medium mr-[30px] focus:outline-0'
                          )
                        }
                        onClick={() => {
                          setActiveTabSub('compose');
                          setSwitchedTabs(true);
                          updateIsNewFlag(); // add this line
                          setIsNewDraft(false); // add this line
                        }}
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
                        onClick={() => {
                          setActiveTabSub('quickreply');
                          setSwitchedTabs(true);
                          updateIsNewFlag(); // add this line
                          setIsNewDraft(false); // add this line
                        }}
                      >
                        Quick reply
                      </Tab>
                    )}
                  </Tab.List>
                  {/* <Tab.Panels as={Fragment}>
                    <Tab.Panel key="compose" data-headlessui-state="selected">
                      <div>
                        {!selectedTemplate && (
                          <button
                            className="flex gap-1 items-center w-full rounded-md bg-white text-[12px] font-medium text-primaryBlue"
                            onClick={() => navigate('/savedtemplates')}
                            style={{
                              position: 'sticky',
                              top: '57px',
                              zIndex: '20px',
                              boxShadow: '0px 2px 8px 0px #0000000D',
                            }}
                          >
                            <img src={TemplatesIcon} />
                            <span className="text-primaryBlue text-[14px]">Templates</span>
                          </button>
                        )}
                      </div>
                    </Tab.Panel>
                  </Tab.Panels> */}
                </div>
              ) : (
                <div className="flex items-center px-[20px] py-[11px] justify-between  border-b-gray border-b-[1px] border-l-gray border-l-[1px]">
                  <div className="gap-2 flex items-center text-[16px] text-darkBlue">
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        // if (editTemplate) {
                        //   navigate('/savedtemplates');
                        //   setEditTemplate(false);
                        // } else {
                        //   navigate('/');
                        // }
                        navigate('/savedtemplates');
                      }}
                    >
                      <img src={ArrowLeft} />
                    </div>
                    <span>Templates</span>
                    {state?.edit && (
                      <>
                        <img src={ArrowRight} />
                        <span>Edit Template</span>
                      </>
                    )}
                  </div>
                  <div className="cursor-pointer" onClick={handleClose}>
                    <img className="w-[14px] h-[14px]" src={Close} />
                  </div>
                </div>
              )}
              <Tab.Panels as={Fragment}>
                <Tab.Panel key="chat">
                  <div className="px-[20px] py-[12px] relative bg-white mt-[6px]">
                    {/* <div className="flex items-center gap-2 right-[20px] -top-[33px] absolute z-[60]">
                      <button
                        className="flex gap-1 items-center justify-center w-full h-[24px] bg-lightblue1 rounded-full px-[9px] py-[5px] text-[12px] font-medium text-primaryBlue"
                        onClick={() => setIsUploadDocument(true)}
                      >
                        <img src={UploadIcon} />
                        <span className="text-primaryBlue text-[12px]">DocChat</span>
                      </button>
                      <Dropdown
                        className="language flex gap-1 items-center justify-center w-full rounded-full border border-primaryBlue px-[6px] py-[3px] bg-white h-[24px] text-[12px] font-medium text-primaryBlue cursor-pointer"
                        options={outputlanguages}
                        value={defaultLanguage}
                        arrowClosed={<img className="w-[10px] h-[10px]" src={ArrowDown} />}
                        arrowOpen={<img className="w-[10px] h-[10px] rotate-180" src={ArrowDown} />}
                      />
                    </div> */}
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
                                handleChange={(e) => setSearch(e.target.value)}
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
                                  {generalPromptList.map((item) =>
                                    item.length === 0 ? (
                                      <div className="suggestion flex flex-col justify-end rounded-[6px] text-darkgray1 bg-lightblue1 p-[9px] text-[14px] cursor-pointer hover:bg-lightblue3">
                                        <div className="pb-[8px]">{/* <img src={item.image_link} /> */}</div>
                                        <div className="flex items-center justify-between">
                                          {/* <span className="w-full text-[14px] font-medium">{item?.name}</span> */}
                                          No Prompt
                                        </div>
                                      </div>
                                    ) : (
                                      // <div
                                      //   onClick={(e) => {
                                      //     // setGeneralPromptRes(true); // Add this line

                                      //     handleSendMessage(e, item);
                                      //     setIsViewPrompts(false);
                                      //     setIsTypewriterDone(true);
                                      //   }}
                                      //   className="suggestion flex flex-col justify-end rounded-[6px] text-darkgray1 bg-lightblue1 p-[9px] text-[14px] cursor-pointer hover:bg-lightblue3"
                                      // >
                                      //   <div className="pb-[8px]">
                                      //     <img src={item.image_link} />
                                      //   </div>
                                      //   <div className="flex items-center justify-between">
                                      //     <span className="w-full text-[14px] font-medium">{item?.name}</span>
                                      //     {/* <div className="info relative">
                                      //     <img src={InfoIcon} />
                                      //     <div
                                      //       className="info-box p-[7px] rounded-[6px] bg-white text-[12px] absolute bottom-[170%] right-[50%] translate-x-[50%] whitespace-nowrap border border-primaryBlue"
                                      //       onClick={() => handlePromptViewPopup(item)}
                                      //     >
                                      //       View info
                                      //       <span className="h-[10px] w-[10px] bg-white absolute right-0 left-0 m-auto -bottom-[6px] rotate-45 border-b border-r border-primaryBlue"></span>
                                      //     </div>
                                      //   </div> */}
                                      //   </div>
                                      // </div>
                                      <div
                                        onClick={(e) => {
                                          // setGeneralPromptRes(true); // Add this line
                                          handleSendMessage(e, item);
                                          setIsViewPrompts(false);
                                          setIsTypewriterDone(true);
                                        }}
                                        className="suggestion rounded-[6px] text-darkgray1 bg-lightblue1 p-[9px] text-[14px] cursor-pointer hover:bg-lightblue3"
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                      >
                                        <div className="pb-[8px]">
                                          <img src={item.image_link} alt={item.name} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="w-full text-[14px] font-medium">{item?.name}</span>
                                        </div>
                                      </div>
                                      // <div
                                      //   onClick={(e) => {
                                      //     // setGeneralPromptRes(true); // Add this line
                                      //     handleSendMessage(e, item);
                                      //     setIsViewPrompts(false);
                                      //     setIsTypewriterDone(true);
                                      //   }}
                                      //   className={`suggestion rounded-[6px] text-darkgray1 bg-lightblue1 p-[9px] text-[14px] cursor-pointer hover:bg-lightblue3 ${
                                      //     item.name.includes('Riddle time' || 'Word of the day') ? 'h-[69px]' : ''
                                      //   } ${item.name.includes('Word of the day') ? 'h-[69px]' : ''}`}
                                      //   style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto' }}
                                      // >
                                      //   <div className="pb-[8px]">
                                      //     <img src={item.image_link} alt={item.name} />
                                      //   </div>
                                      //   <div className="flex items-center justify-between">
                                      //     <span className="w-full text-[14px] font-medium">{item?.name}</span>
                                      //   </div>
                                      // </div>
                                    )
                                  )}
                                </div>
                              </Tab.Panel>
                              <Tab.Panel key="my" className="h-[305px] relative">
                                <div className="grid grid-cols-3 gap-2 pt-[8px]">
                                  {promptList.map((item) => (
                                    <React.Fragment>
                                      <div
                                        className="flex rounded-[6px] text-darkgray1 bg-lightblue1 p-[8px] text-[14px] cursor-pointer"
                                        onClick={() => {
                                          handleUsePrompt(item);
                                          setIsViewPrompts(false);
                                        }}
                                      >
                                        <span className="max-w-[130px] text-[14px] font-medium overflow-hidden whitespace-nowrap text-ellipsis">
                                          {item?.name}
                                        </span>
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
                    {/* <div
                      ref={chatContainerRef}
                      className="text-[12px] max-h-[440px] overflow-y-auto flex flex-col-reverse"
                    >
                      <div className="">
                        {chatData.map((item) => {
                          switch (item.type) {
                            case 'user':
                              return (
                                <div id="chat-container" className="flex justify-end">
                                  <div
                                    className="bg-lightblue1 text-darkBlue max-w-[370px] p-[12px] flex flex-col rounded-tl-[6px] rounded-tr-[6px] rounded-br-0 rounded-bl-[6px] mb-[16px] text-[14px] "
                                    style={{
                                      boxShadow: '0px 2px 4px 0px #0000000D',
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
                                    className="message  bg-white max-w-[370px] border border-gray p-[12px] flex flex-col mb-[16px] rounded-tl-[6px] rounded-tr-[6px] rounded-br-[6px] rounded-br-0 rounded-bl-0 relative "
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

                                    <pre className="font-dmsans" style={{ textWrap: 'wrap' }}>
                                      {item.isNew && activeTab === 'chat' ? (
                                        <Typewriter
                                          text={item.msg}
                                          delay={50}
                                          setIsTypewriterDone={setIsTypewriterDone}
                                          contentType="chat"
                                        />
                                      ) : (
                                        <>{item.msg}</>
                                      )}
                                    </pre>
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
                    </div> */}
                    <ChatData
                      chatData={chatData}
                      setIsTypewriterDone={setIsTypewriterDone}
                      isTypewriterDone={isTypewriterDone}
                      handleRegenerate={handleRegenerate}
                      chatContainerRef={chatContainerRef}
                      activeTabSub={activeTabSub}
                      switchedTabs={switchedTabs}
                    />
                    {/* <div className="border border-primaryBlue">
                      <div className="flex gap-2">
                        <img src={stopIcon} />
                        <p className="text-primaryBlue text-[12px] font-medium">Stop Generating</p>
                      </div>
                    </div> */}

                    {/* {!isTypewriterDone && chatData?.length >= 2 && (
                      <div
                        className="text-[12px] text-lightgray2 flex items-center gap-2 mb-[20px] cursor-pointer"
                        onClick={() => {
                          handleRegenerate();
                          setIsTypewriterDone(true);
                        }}
                      >
                        <span>
                          <img src={RegenerateIcon} />
                        </span>
                        <span>Regenerate</span>
                      </div>
                    )} */}
                    {isUsePrompt ? (
                      <UsingPromptInputBox
                        handleSendMessage={handleSendMessage}
                        isUsePrompt={isUsePrompt}
                        setIsUsePrompt={setIsUsePrompt}
                        SuggestionCloseIcon={SuggestionCloseIcon}
                        selectedPrompt={selectedPrompt}
                        SendIcon={SendIcon}
                        ArrowDown={ArrowDown}
                        setIsViewPrompts={setIsViewPrompts}
                        setIsTypewriterDone={setIsTypewriterDone}
                      />
                    ) : (
                      <>
                        <div className="flex justify-between">
                          {/* <button
                            className="flex gap-1 items-center rounded-md bg-primaryBlue px-[6px] py-[6px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                            onClick={handleNewChat}
                          >
                            <img src={NewChatIcon} />
                            New Chat
                          </button> */}
                          <div className="flex gap-1">
                            {items.map((item) => (
                              <div
                                key={item.id}
                                className="flex new-btn p-[5px] items-center gap-1 bg-gray4 rounded-md cursor-pointer"
                                onMouseEnter={() => handleMouseEnter(item.id)}
                                onMouseLeave={() => handleMouseLeave(item.id)}
                                onClick={() => handleSelectItems(item.id)}
                              >
                                <img className="w-[18px] h-[18px]" src={item.isHovered ? item.hoverImg : item.img} />
                                {item.isHovered && <p className="text-[12px] text-darkblue">{item.label}</p>}
                              </div>
                            ))}
                          </div>
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
                                ref={promptRef}
                                className={`chats-settings w-max flex flex-col gap-2 absolute right-0 bottom-[100%] bg-white p-[8px] rounded-[8px] ${
                                  addPromptBox ? 'block' : 'hidden'
                                }`}
                                style={{
                                  boxShadow: '0px 2px 20px 0px #00000026',
                                }}
                              >
                                <div className="text-[12px] flex items-center text-gray1 justify-between font-medium px-[8px] py-[4px]">
                                  MY PROMPTS
                                  <span className="cursor-pointer" onClick={() => handleNewPrompt()}>
                                    <img src={AddCircle} />
                                  </span>
                                </div>
                                {promptList.length === 0 ? (
                                  <div className="promptEdit px-[8px] py-[4px] flex items-center justify-between gap-3 text-gray1 text-[14px] rounded-[4px] hover:bg-gray4">
                                    <div className="flex items-center gap-3 cursor-pointer">
                                      <span className="w-[80px] overflow-hidden whitespace-nowrap text-ellipsis">
                                        No Data Found
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    {promptList.map((item) => (
                                      <div className="promptEdit px-[8px] py-[4px] flex items-center justify-between gap-3 text-gray1 text-[14px] rounded-[4px] hover:bg-gray4">
                                        <div
                                          className="flex items-center gap-3 cursor-pointer"
                                          onClick={() => {
                                            handleUsePrompt(item);
                                            setAddPromptBox(false);
                                          }}
                                        >
                                          <img src={MoreIcon} />
                                          <span className="w-[80px] overflow-hidden whitespace-nowrap text-ellipsis">
                                            {item?.name}
                                          </span>
                                        </div>
                                        <span
                                          className="editIcon cursor-pointer"
                                          onClick={() => handleCustomPrompt(item)}
                                        >
                                          <img className="w-max" src={EditIcon} />
                                        </span>
                                      </div>
                                    ))}
                                  </>
                                )}
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
                                ref={languageRef}
                                className={`chats-settings w-[178] flex flex-col gap-2 absolute right-0 bottom-[100%] bg-white p-[8px] rounded-[8px] ${
                                  settingsPopupBox ? 'block' : 'hidden'
                                }`}
                                style={{
                                  boxShadow: '0px 2px 20px 0px #00000026',
                                }}
                              >
                                <div className="text-[12px] font-medium text-gray1 px-[8px] py-[4px]">CHAT SETTING</div>
                                <div className="text-[14px] flex items-center gap-2 text-darkblue bg-gray4 px-[8px] py-[4px] rounded-[4px]">
                                  <img src={TranslateIcon} />
                                  Respond Language
                                </div>
                                {/* <Dropdown
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
                                /> */}
                                <div ref={selectRef}>
                                  <Select
                                    className="border border-gray text-gray1 hover:text-darkBlue rounded-md text-[14px] py-[4px] px-[6px]"
                                    menuPlacement="top"
                                    defaultValue={'English'}
                                    onChange={setSelectedOption}
                                    options={languageList.map((data) => ({
                                      value: data.id,
                                      label: data.language,
                                    }))}
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
                                      }),
                                      menu: (base) => ({
                                        ...base,
                                        width: '178px',
                                        minWidth: '178px',
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
                                  />
                                </div>
                                {/* <div className="relative">
                                  <select
                                    id="languages"
                                    className="appearance-none h-5 border border-gray text-[10px] rounded-[4px] block w-full pl-2.5 pr-8 bg-white hover:bg-gray-100 focus:ring"
                                  >
                                    <option selected value="EN">
                                      English
                                    </option>
                                    <option value="ARB" className="bg-blue-100 hover:bg-lightgray1">
                                      Arabic
                                    </option>
                                    <option value="FR" className="bg-green-100 hover:bg-lightgray1">
                                      France
                                    </option>
                                    <option value="DE" className="bg-yellow-100 hover:bg-lightgray1">
                                      Germany
                                    </option>
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray pointer-events-none">
                                    <svg
                                      className="w-4 h-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="#19224C"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                </div> */}
                              </div>
                            </div>

                            <button className="w-[20px] h-[20px]">
                              <img src={MuteIcon} />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 relative">
                          <form
                            onSubmit={(e) => {
                              handleSendMessage(e, chatInput.chatText);
                              setChatInput({
                                ...chatInput,
                                chatText: '',
                              });
                              setIsViewPrompts(false);
                              setIsTypewriterDone(true);
                            }}
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
                                          className="border border-gray rounded-md text-[12px]"
                                          menuPlacement="top"
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

                                              height: '24px',
                                              minHeight: '24px',
                                              width: '100px',
                                              boxShadow: 'none',
                                              backgroundColor: 'unset',
                                              top: '-3px',
                                            }),
                                            menu: (base) => ({
                                              ...base,
                                              width: '100%',
                                              minWidth: '160px',
                                              height: 'auto',
                                              minHeight: '216px',
                                              right: '-9px',
                                              overflow: 'scroll',
                                            }),
                                            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                                              return {
                                                ...styles,
                                                backgroundColor: isFocused ? '#F3F4F8' : null,
                                                color: !isFocused ? '#8C90A5' : '#19224C',
                                                margin: '8px',
                                                width: 'auto',
                                                borderRadius: '4px',
                                                height: '26px',
                                                lineHeight: '9px',
                                                fontSize: '14px',
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
                                {(micPermission === 'granted' || micPermission !== 'granted') &&
                                  startSpeech &&
                                  !micClicked && (
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
                                {micPermission !== 'granted' && micClicked && (
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
                                {startListen && micClicked && !transcript && permission && (
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
                              // <AudioInput
                              //   setAudioInput={setAudioInput}
                              //   audioInput={audioInput}
                              //   handleAudioInfoPopup={handleAudioInfoPopup}
                              //   isAudioInfoPopup={isAudioInfoPopup}
                              //   setIsAudioInfoPopup={setIsAudioInfoPopup}
                              //   outputLanguagesVoice={outputLanguagesVoice}
                              //   setSelectedOption={setSelectedOption}
                              //   selectedOption={selectedOption}
                              //   selectRef={selectRef}
                              //   handleSendMessage={handleSendMessage}
                              //   setIsTypewriterDone={setIsTypewriterDone}
                              // />
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
                        <div className="absolute text-lightgray2 right-[21px] bottom-[10px] text-[12px]">
                          {speechLength}/4000
                        </div>
                      </>
                    )}
                  </div>
                </Tab.Panel>
                {activeTab !== QUICKREPLY && (
                  <Tab.Panel key="compose" data-headlessui-state="selected">
                    <div className="px-[20px] py-[12px] relative">
                      <div
                        // style={{ position: 'sticky', top: '57px', zIndex: '20px' }}
                        className="right-[20px] -top-[32px] absolute z-30"
                      >
                        {!selectedTemplate && (
                          <button
                            className="flex gap-1 items-center w-full rounded-md bg-white text-[12px] font-medium text-primaryBlue"
                            onClick={() => navigate('/savedtemplates')}
                            style={{
                              position: 'sticky',
                              top: '57px',
                              zIndex: '20px',
                              boxShadow: '0px 2px 8px 0px #0000000D',
                            }}
                          >
                            <img src={TemplatesIcon} />
                            <span className="text-primaryBlue text-[14px]">Templates</span>
                          </button>
                        )}
                      </div>
                      {selectedTemplate !== undefined && (
                        <React.Fragment>
                          <div className="flex items-center gap-3 mb-[15px]">
                            <div className="col-span-full items-center w-full">
                              <label for="input" className="block text-[12px] font-bold leading-6 text-gray1">
                                TEMPLATE NAME
                              </label>
                              <div>
                                <input
                                  id="templatename"
                                  name="templatename"
                                  type="text"
                                  value={editTemplateName?.templatename}
                                  onChange={(e) => handleChange(e)}
                                  placeholder="Name the template"
                                  className="block w-full text-[14px] rounded-md border border-gray p-[10px] text-darkBlue placeholder:text-gray1"
                                />
                              </div>
                            </div>
                            <div className="col-span-full items-center w-full">
                              <label for="input" className="block text-[12px] font-bold leading-6 text-gray1">
                                TEMPLATE TYPE
                              </label>
                              <div>
                                {/* <Dropdown
                                  className="border border-gray rounded-md text-[14px] p-[10px]"
                                  options={options}
                                  // onChange={this._onSelect}
                                  value={selectedTemplate?.type?.name}
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
                                /> */}
                                <Select
                                  className="border border-gray rounded-md p-[9px] text-[14px] placeholder:text-gray1"
                                  menuPlacement="bottom"
                                  name="templateType"
                                  defaultValue={{
                                    label: selectedTemplate?.type?.name,
                                    value: selectedTemplate?.type?.id,
                                  }}
                                  onChange={setSelectedTemplateType}
                                  // options={templateType}
                                  options={templateType.map((item) => ({ value: item.id, label: item.name }))}
                                  // placeholder="Select template type"
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
                                    }),
                                    menu: (base) => ({
                                      ...base,
                                      width: '224px',
                                      minWidth: '224px',
                                      right: '-1px',
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
                                        height: '26px',
                                        lineHeight: '7px',
                                        padding: '10px 12px',
                                        // minWidth: '143px',
                                      };
                                    },
                                    placeholder: (base) => ({
                                      ...base,
                                      color: '#8C90A5',
                                    }),
                                    dropdownIndicator: (provided, state) => ({
                                      ...provided,
                                      transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
                                    }),
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="pb-[20px] mt-[8]">
                            <div className="flex justify-between item-center">
                              <label
                                for="input"
                                className="block text-[12px] font-bold leading-6 text-gray1 whitespace-nowrap"
                              >
                                SAVED TEMPLATE
                              </label>
                            </div>
                            <textarea
                              style={{ resize: 'none' }}
                              id="requestedText"
                              name="input_text"
                              rows="4"
                              value={editTemplateName?.input_text}
                              onChange={(e) => handleChange(e)}
                              placeholder="Your Template name"
                              className="text-[14px] border-gray block w-full rounded-md border p-1.5 text-darkBlue"
                            />
                          </div>
                        </React.Fragment>
                      )}

                      {!selectedTemplate && (
                        <>
                          <Tab.Group
                            as="div"
                            className="w-max bg-gray3 mb-[15px] flex items-center justify-between px-[3px] py-[3px] rounded-full"
                          >
                            <Tab.List className="flex gap-1">
                              {Tabs.map((data, id) => (
                                <Tab
                                  className={
                                    selectTab === data.id
                                      ? 'rounded-[100px] gap-[8px] text-[12px] font-bold bg-graywhite shadow-sm focus:outline-0 px-[6px] py-[6px] transition-all duration-200 ease-linear'
                                      : 'text-[12px] text-lightgray2 px-[6px] py-[6px] transition-all duration-200 ease-linear'
                                  }
                                  key={id}
                                  onClick={() => handleSelectTab(data.id)}
                                >
                                  <div className="flex gap-2 items-center">
                                    <img className="" src={data.icon} />
                                    <span> {data.type}</span>
                                  </div>
                                </Tab>
                              ))}
                            </Tab.List>
                          </Tab.Group>
                          {selectTab === 1 ? (
                            <div className="col-span-full">
                              <label for="input" className="block text-[12px] font-bold leading-6 text-gray1">
                                INPUT
                              </label>
                              <div>
                                <textarea
                                  style={{ resize: 'none' }}
                                  id="requestedText"
                                  name="input_text"
                                  rows="6"
                                  value={selectedText.input_text}
                                  maxLength="4000"
                                  onChange={(e) => handleChangeCompose(e)}
                                  placeholder="Tell me what to write for you"
                                  className="text-[14px] border-gray block w-full rounded-md border p-1.5 mb-[10px]"
                                  required={true}
                                />
                              </div>
                              {/* {errors.input_text && <p className="text-red text-[12px]">{errors.input_text}</p>} */}
                            </div>
                          ) : (
                            <div className="col-span-full">
                              <label for="input" className="block text-[12px] font-bold leading-6 text-gray1">
                                ORIGINAL INPUT
                              </label>
                              <div>
                                <textarea
                                  style={{ resize: 'none' }}
                                  id="requestedText"
                                  name="original_text"
                                  rows="5"
                                  value={replyText.original_text}
                                  onChange={(e) => handleChangeCompose(e)}
                                  placeholder="The original text to which you want to reply"
                                  className="text-[14px] border-gray block w-full rounded-md border p-1.5"
                                />
                              </div>
                              {/* {errors.input_text && <p className="text-red text-[12px]">{errors.input_text}</p>} */}
                              <label for="input" className="block text-[12px] font-bold leading-6 text-gray1 mt-[16px]">
                                WHAT TO REPLY
                              </label>
                              <div>
                                <textarea
                                  style={{ resize: 'none' }}
                                  id="requestedText"
                                  name="reply"
                                  rows="5"
                                  value={replyText.reply}
                                  onChange={(e) => handleChangeCompose(e)}
                                  placeholder="The general content of your reply to the above text"
                                  className="text-[14px] border-gray block w-full rounded-md border p-1.5"
                                />
                              </div>
                              {errors.reply && <p className="text-red text-[12px]">{errors.reply}</p>}
                            </div>
                          )}
                        </>
                      )}
                      <div className="pt-[16px] pb-[10px] flex gap-2 justify-between items-center">
                        <div className="flex text-[14px] font-medium text-darkBlue whitespace-nowrap">AI Tools</div>

                        {!inputButtonBox && (
                          <div className="flex gap-2 items-center w-full" onClick={handleInputButtonBox}>
                            {selectedItems.map(
                              (item) =>
                                item?.name && (
                                  <button className="w-full rounded-md px-1 py-2 text-[12px] font-medium text-darkBlue border bg-lightblue1 border-lightblue">
                                    {item?.name}
                                  </button>
                                )
                            )}
                          </div>
                        )}

                        <div
                          className={`w-[20px] flex text-[14px] font-medium text-darkBlue whitespace-nowrap justify-center cursor-pointer ${
                            !inputButtonBox ? '-rotate-90' : ''
                          }`}
                          onClick={handleInputButtonBox}
                        >
                          <img src={ArrowDown} />
                        </div>
                      </div>
                      {inputButtonBox && (
                        <div className={!inputButtonBox ? `hidden` : `block`}>
                          {selectTab === 1 ? (
                            <div className="pb-[20px]">
                              <div className="flex gap-1 items-center">
                                <img src={actionIcon} />
                                <label for="actions" className="block text-[12px] font-bold leading-6 text-gray1">
                                  ACTION
                                </label>
                              </div>
                              <RadioGroup value={selectedAction} onChange={setSelectedAction}>
                                <div className="inline-flex gap-2 items-center">
                                  {actions.map((action, index) => (
                                    <RadioGroup.Option
                                      name="action"
                                      key={action?.name}
                                      value={action}
                                      onClick={(e) => handleInputAction(e, index, action)}
                                      className={({ checked }) =>
                                        classNames(
                                          'cursor-pointer text-darkBlue',
                                          checked || action?.name === selectedAction?.name
                                            ? 'border-lightblue bg-lightblue1'
                                            : '',
                                          'w-[87px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                                        )
                                      }
                                    >
                                      <RadioGroup.Label as="span">{action?.name}</RadioGroup.Label>
                                    </RadioGroup.Option>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                          ) : (
                            <div className="pb-[20px]">
                              <div className="flex gap-1 items-center">
                                <img src={formatIcon} />
                                <label for="format" className="block text-[12px] font-bold leading-6 text-gray1">
                                  FORMAT
                                </label>
                              </div>
                              <RadioGroup value={selectedFormat} onChange={setSelectedFormat}>
                                <div className="inline-flex gap-2 items-center">
                                  {format.map((action, index) => (
                                    <RadioGroup.Option
                                      name="action"
                                      key={action?.name}
                                      value={action}
                                      onClick={(e) => handleInputAction(e, index, action)}
                                      className={({ checked }) =>
                                        classNames(
                                          'cursor-pointer text-darkBlue',
                                          checked || action?.name === selectedFormat?.name
                                            ? 'border-lightblue bg-lightblue1'
                                            : '',
                                          'w-[87px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                                        )
                                      }
                                    >
                                      <RadioGroup.Label as="span">{action?.name}</RadioGroup.Label>
                                    </RadioGroup.Option>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                          )}
                          <div className="pb-[20px]">
                            <div className="flex gap-1 items-center">
                              <img src={lengthIcon} />
                              <label for="actions" className="block text-[12px] font-bold leading-6 text-gray1">
                                LENGTH
                              </label>
                            </div>
                            <RadioGroup value={selectedLength} onChange={setSelectedLength}>
                              <div className="inline-flex gap-2 items-center">
                                {lengths.map((length, index) => (
                                  <RadioGroup.Option
                                    name="length"
                                    key={length?.name}
                                    value={length}
                                    onClick={(e) => handleInputLength(e, index, length)}
                                    className={({ checked }) =>
                                      classNames(
                                        'cursor-pointer text-darkBlue',
                                        checked || length?.name === selectedLength?.name
                                          ? 'border-lightblue bg-lightblue1'
                                          : '',
                                        'w-[87px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                                      )
                                    }
                                  >
                                    <RadioGroup.Label as="span">{length?.name}</RadioGroup.Label>
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>
                          <div className="pb-[20px]">
                            <div className="flex gap-1 items-center">
                              <img src={toneIcon} />
                              <label for="actions" className="block text-[12px] font-bold leading-6 text-gray1">
                                TONE
                              </label>
                            </div>
                            <RadioGroup value={selectedTone} onChange={setSelectedTone}>
                              <div className="inline-flex gap-2 items-center">
                                {tones.map((tone, index) => (
                                  <RadioGroup.Option
                                    name="length"
                                    key={tone?.name}
                                    value={tone}
                                    onClick={(e) => handleInputTone(e, index, tone)}
                                    className={({ checked }) =>
                                      classNames(
                                        'cursor-pointer text-darkBlue',
                                        checked || tone?.name === selectedTone?.name
                                          ? 'border-lightblue bg-lightblue1'
                                          : '',
                                        'w-[87px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                                      )
                                    }
                                  >
                                    <RadioGroup.Label as="span">{tone?.name}</RadioGroup.Label>
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>
                          <div className="pb-[10px]">
                            <div className="flex gap-1 items-center">
                              <img src={languageIcon} />
                              <label
                                for="actions"
                                className="block text-[12px] font-bold leading-6 text-gray1 uppercase"
                              >
                                LANGUAGE
                              </label>
                            </div>
                            <RadioGroup value={selectedLanguage} onChange={setSelectedLanguage}>
                              <div className="inline-flex gap-2 items-center">
                                {languages.map((language, index) => (
                                  <RadioGroup.Option
                                    name="length"
                                    key={language?.name}
                                    value={language}
                                    onClick={(e) => handleInputLanguage(e, index, language)}
                                    className={({ checked }) =>
                                      classNames(
                                        'cursor-pointer text-darkBlue',
                                        checked || language?.name === selectedLanguage?.name
                                          ? 'border-lightblue bg-lightblue1'
                                          : '',
                                        'w-[87px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                                      )
                                    }
                                  >
                                    <RadioGroup.Label as="span">{language?.name}</RadioGroup.Label>
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      )}
                      <div className="pt-[15px] pb-[20px]">
                        {selectTab === 1 ? (
                          <button
                            type="submit"
                            // className={`flex text-[16px] w-full justify-center rounded-md bg-primaryBlue px-3 py-2 text-sm leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                            //   Loading ? 'opacity-50 bg-lightblue4 cursor-not-allowed' : ''
                            // } ${
                            //   selectTab === 1 && !selectedText.input_text
                            //     ? 'opacity-50 bg-lightblue4 cursor-not-allowed'
                            //     : ''
                            // } ${
                            //   selectTab === 2 && (!selectedText.input_text || !replyText.reply)
                            //     ? 'opacity-50 bg-lightblue4 cursor-not-allowed'
                            //     : ''
                            // }  `}
                            className={`flex text-[16px] w-full justify-center focus:outline-none rounded-md bg-primaryBlue px-3 py-2 text-sm leading-6 text-white shadow-sm hover:opacity-90  ${
                              compLoading ? 'opacity-50 bg-lightblue4 cursor-not-allowed' : ''
                            } ${
                              selectTab === 1 &&
                              (!selectedText.input_text || selectedText.input_text.trim() === '' || aiToolsLength !== 4)
                                ? 'opacity-50 bg-lightblue4 cursor-not-allowed'
                                : ''
                            } `}
                            onClick={(e) => {
                              handleGenerateDraft(e);
                              setComposeRes(false);
                            }}
                            // disabled={Loading || !selectedText.input_text}
                            disabled={
                              compLoading ||
                              (selectTab === 1 &&
                                (!selectedText.input_text || selectedText.input_text.trim() === '')) ||
                              aiToolsLength !== 4
                            }
                          >
                            <div className="">
                              {compLoading ? (
                                <div className="flex items-center">
                                  <svg
                                    aria-hidden="true"
                                    role="status"
                                    class="inline w-4 h-4 mr-3 text-white animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                      fill="#E5E7EB"
                                    />
                                    <path
                                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                  <span>Generating</span>
                                </div>
                              ) : (
                                'Generate Draft'
                              )}
                            </div>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className={`flex text-[16px] w-full focus:outline-none justify-center rounded-md bg-primaryBlue px-3 py-2 text-sm leading-6 text-white shadow-sm hover:opacity-90  ${
                              compRepLoading ? 'opacity-50 bg-lightblue4 cursor-not-allowed' : ''
                            } 
                             ${
                               (selectTab === 2 && !replyText.original_text) ||
                               replyText.original_text.trim() === '' ||
                               !replyText.reply ||
                               replyText.reply.trim() === '' ||
                               aiToolsLength !== 4
                                 ? 'opacity-50 bg-lightblue4 cursor-not-allowed'
                                 : ''
                             }`}
                            onClick={(e) => {
                              handleGenerateDraft(e);
                              setComposeRes(false);
                            }}
                            // disabled={Loading || !selectedText.input_text}
                            disabled={
                              compRepLoading ||
                              (selectTab === 2 &&
                                (!replyText.original_text ||
                                  replyText.original_text.trim() === '' ||
                                  !replyText.reply ||
                                  replyText.reply.trim() === '')) ||
                              aiToolsLength !== 4
                            }
                          >
                            <div className="">
                              {compRepLoading ? (
                                <div className="flex items-center">
                                  <svg
                                    aria-hidden="true"
                                    role="status"
                                    class="inline w-4 h-4 mr-3 text-white animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                      fill="#E5E7EB"
                                    />
                                    <path
                                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                  <span>Generating</span>
                                </div>
                              ) : (
                                'Generate Draft'
                              )}
                            </div>
                          </button>
                        )}
                      </div>
                      {composeRes && (
                        <div className="pb-[20px]">
                          <div className="flex justify-between item-center">
                            <div className="flex gap-2 items-center">
                              <label
                                for="input"
                                className="block text-[12px] font-bold leading-6 text-gray1 whitespace-nowrap"
                              >
                                DRAFT PREVIEW
                              </label>
                              <div className="flex gap-1">
                                <div className="cursor-pointer">
                                  <img className="w-[16px] h-[16px]" src={prevIcon} />
                                </div>
                                <div className="text-[12px]">
                                  <span className="text-darkBlue font-medium">1 </span>
                                  <span className="text-gray1">/</span>
                                  <span className="text-gray1"> 3</span>
                                </div>
                                <div className="cursor-pointer">
                                  <img className="w-[16px] h-[16px]" src={nextIcon} />
                                </div>
                              </div>
                            </div>
                            {!isDraftPrev && (
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
                                  draftResponse={resultText}
                                />
                              </div>
                            )}
                            {isDraftPrev && (
                              <div>
                                <button
                                  className="flex gap-1 items-center w-full rounded-md bg-white text-[12px] font-medium text-primaryBlue"
                                  // onClick={() => setSaveTemplateBox(true)}
                                >
                                  <span className="text-primaryBlue">Stop</span>
                                  <img src={StopResIcon} />
                                </button>
                              </div>
                            )}
                          </div>
                          {/* {!selectedTemplate ? ( */}
                          {activeTab === 'chat' && isNewDraft ? (
                            <Typewriter
                              text={
                                resultText.output_text
                                  ? resultText.output_text
                                  : resultText
                                  ? resultText
                                  : selectedTemplate?.output_text
                              }
                              delay={10}
                              setIsTypewriterDone={setIsTypewriterDone}
                              setIsDraftPrev={setIsDraftPrev}
                              contentType="compose"
                            />
                          ) : (
                            <textarea
                              style={{ resize: 'none' }}
                              id="draftPreview"
                              name="draftPreview"
                              // rows="22"
                              value={resultText ? resultText?.output_text : selectedTemplate?.output_text}
                              placeholder=" "
                              className="text-[14px] border-gray block h-[306px] w-full rounded-md border p-1.5"
                            />
                          )}
                          {/* ) : ( */}

                          {/* )} */}
                        </div>
                      )}
                      {composeRes && !state?.edit && (
                        <div className="mt-1">
                          <div className="flex gap-2 items-center">
                            <button
                              className="w-full rounded-md focus:outline-none bg-white px-1 py-[10px] text-[16px] font-medium text-darkgray1 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
                              onClick={(e) => {
                                handleGenerateDraft(e);
                                setComposeRes(false);
                              }}
                              disabled={resultText !== '' ? '' : 'disabled'}
                            >
                              Regenerate
                            </button>
                            <button
                              className="w-full rounded-md bg-white px-1 focus:outline-none py-[10px] text-[16px] font-medium text-darkgray1 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
                              disabled={resultText !== '' ? '' : 'disabled'}
                              onClick={handleCopyDraft}
                            >
                              Copy
                            </button>
                            <button
                              className="w-full rounded-md focus:outline-none bg-primaryBlue px-1 py-[10px] text-[16px] font-medium text-white focus:outline-none hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                              disabled={resultText !== '' ? '' : 'disabled'}
                              onClick={handleApply}
                              type="button"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      )}
                      {selectedTemplate && (
                        <div className="mt-1">
                          <div className="flex gap-2 items-center">
                            <button
                              className="w-full rounded-md bg-white focus:outline-none px-1 py-[10px] text-[16px] font-medium text-darkgray1 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
                              onClick={(e) => {
                                handleGenerateDraft(e);
                                setComposeRes(false);
                              }}
                              // disabled={resultText !== '' ? '' : 'disabled'}
                            >
                              Regenerate
                            </button>
                            <button
                              className="w-full rounded-md bg-white px-1 focus:outline-none py-[10px] text-[16px] font-medium text-darkgray1 border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
                              // disabled={resultText !== '' ? '' : 'disabled'}
                              onClick={handleCopyDraft}
                            >
                              Copy
                            </button>
                            <button
                              className="w-full rounded-md bg-primaryBlue px-1 focus:outline-none py-[10px] text-[16px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                              // disabled={resultText !== '' ? '' : 'disabled'}
                              onClick={(e) => handleUpdateTemplate(e)}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Tab.Panel>
                )}
                <Tab.Panel key="quickreply" data-headlessui-state="selected">
                  <QuickReply
                    SELECTION="quickreply"
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
                    outputlanguages={outputLanguages}
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
              fetchprompts={fetchprompts}
              isEdit={isEdit}
              isCustomPromptBox={isCustomPromptBox}
              setIsCustomPromptBox={setIsCustomPromptBox}
              customSelectedPrompt={customSelectedPrompt}
              setCustomSelectedPrompt={setCustomSelectedPrompt}
              myPromptRef={myPromptRef}
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
              setIsViewPrompts={setIsViewPrompts}
            />
          </div>
        </Header>
      )}
    </>
  );
};

export default MainScreen;
