import React, { useEffect, useRef, useState } from 'react';
import './Social.css';
import Setting from './utils/Social/solar_settings-broken.png';
import ProfilePic from './utils/Social/Ellipse 31.png';
import Cross from './utils/Social/cross.png';
import Closed from './utils/Social/close-circle.png';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Arrow from './utils/Social/arrow-down.png';
import Mic from './utils/Social/microphone2.png';
import Send from './utils/Social/send.png';
import Left from './utils/Social/arrow-left.png';
import Trash from './utils/Social/trash.png';
import Menu from './utils/Social/Vector.png';
import LoadingGif from './utils/Chat/Gif/loader.gif';
import Loader from './utils/89.gif';
import KeyboardIcon from './utils/Chat/Icons/KeyboardIcon.svg';
import Select from 'react-select';
import MicrophoneWhiteIcon from './utils/Chat/Icons/MicrophoneWhiteIcon.svg';
import SmallClose from './utils/Chat/Icons/SmallClose.svg';
import HowToIcon from './utils/Chat/Icons/HowToIcon.svg';
import HowToIconBg from './utils/Chat/Icons/HowToIconBg.svg';
import Close from './utils/MainScreen/Icons/Close.svg';
import ResalaIconWithText from './utils/Youtube/ResalaIconWithText.svg';
import { getToken } from './utils/localstorage';
import { getRequest, postRequest } from './services';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';

export default SocialPopup = ({ fromPosition, setSocialsButton, handleSidebar, delay }) => {
  const [language, setLanguage] = useState(false);

  const handleLanguage = () => {
    setLanguage(!language);
    setProfession(false);
  };
  const [profession, setProfession] = useState(false);
  const [professions, setProfessions] = useState('Professional');

  const handleprofession = () => {
    setProfession(!profession);
    setLanguage(false);
  };

  // type writer effect
  const textAreaRef = useRef(null);
  function typewriterEffect(text, element, delay) {
    let charIndex = 0;
    const textLength = text.length;

    function type() {
      if (charIndex < textLength) {
        element.value += text.charAt(charIndex);
        charIndex++;
        element.scrollTop = element.scrollHeight;
        setTimeout(type, delay);
      }
    }
    type();
  }
  //textarea height functionality
  // function calculateTextAreaRows(content) {
  //   const lines = content.split(/\r?\n|\r/);

  //   const lineCount = Math.max(lines.length, 1);

  //   return lineCount;
  // }

  //textarea height functionality

  const [ideas, setIdeas] = useState(false);

  const handleBack = () => {
    setIdeas(!ideas);
    setShowButton1Content(false);
    setShowButton3Content(false);
    setShowButton2Content(false);
    setIdeasValue('');
    setResponses([]);
  };

  const handleClose = () => {
    setVisible(false);
    setVisible2(false);
    setIdeasValue('');
    setSpeechLength(0);
    setSocialHome(true);
    setPostIdea(!PostIdea);
    setButtonShow(!ButtonsShow);
    setResponses([]);
    setLoading(false);
    setvisibleTextarea(false);
    setIdeadload(false);
    // setClose(false);
    const SocialComponent = document.getElementById('SocialPopup');
    SocialComponent.classList.add('hidden');

    // console.log('dsfsdfds', close);
  };

  // api integration: social ideas
  const [socialIdeas, setSocialIdeas] = useState([]);

  // get-postIdea
  useEffect(() => {
    const SocialButton = document.getElementById('SocialButton');
    SocialButton.addEventListener('click', async () => {
      // console.log('CLICKCKCKCKCKCKCK');
      const hostname = window.location.hostname;
      let response;

      if (hostname == 'www.linkedin.com') {
        response = await getRequest('/linkedin/linkedin_idea_list');
      } else if (hostname == 'www.facebook.com') {
        response = await getRequest('/facebook/facebook_idea_list');
      } else if (hostname == 'twitter.com') {
        response = await getRequest('/twitter/twitter_idea_list');
      }
      if (response.status == 200) {
        // console.log(response.data.Result, 'idea_list');
        // console.log(response.data, 'ideasssssssss');
        setSocialIdeas(response.data.Result);
      }
    });
  }, []);
  // console.log({ socialIdeas });
  // get-postIdea

  // textarea
  const [selectedIdea, setSelectedIdea] = useState([]);
  const [SocialHome, setSocialHome] = useState(true);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [IdeasValueHome, setIdeasValueHome] = useState('');
  const [IdeasValueHome1, setIdeasValueHome1] = useState('');
  const [PostIdea1, setPostIdea1] = useState(true);
  const [ButtonsShowHome, setButtonShowHome] = useState(false);
  const [loadingText, setLoadingText] = useState(false);

  // textarea-postIdea
  const handleTextArea = async () => {
    // setLoadRegenerate(true);

    if (IdeasValueHome1.trim() === '') {
      return;
    }
    setPostIdea(!PostIdea);
    setLoadingText(!loadingText);
    setVisible2(true);
    setVisible(false);
    setSocialHome(false);
    setPostIdea1(!PostIdea1);
    setSpeechLength(0);
    const hostname = window.location.hostname;
    let response;

    const postData = { text: IdeasValueHome1, action: 'string', language: languages, tone: professions };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/linkedin_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/twitter_post_streaming', postData);
    }
    if (response && response.status === 200) {
      let text = response.data
        .replace(/#@#/g, '')
        .replace(/POST :/g, '')
        .replace(/Post\s*:\s*/, '')
        .replace(/Action :/g, '')
        .replace(/connection closed/g, '');
      text = text.toString().replace('POST : ', '').replace('Post :', '');
      const words = text.split(/\s+/).filter((word) => word.trim() !== '');
      const textArea1 = textAreaRef.current;
      console.log(textArea1, 'textArea1');
      const paragraph = words.join(' ');
      const lines = paragraph.split(/[\.,]/);
      const lineCount = lines.length;
      textArea1.rows = lineCount + 1;
      const textArea = document.getElementById('socialTextarea');
      typewriterEffect(paragraph, textArea, 20);

      setIdeasValueHome(paragraph);
      setButtonShowHome(true);
      setPostIdea(!PostIdea);
      setLoadingText(false);
      // setLoadRegenerate(false);
      // setIdeasValue(paragraph);
    }
    // console.log(selectedIdea, 'selectedIdea');
  };
  // textarea-postIdea

  // textarea-renegerate
  const [LoadRegenerate, setLoadRegenerate] = useState(false);
  const [ResponsesText, setResponsesText] = useState([]);
  const handleRegenerate = async () => {
    // setLoading(true);
    setLoadingText(true);

    setLoadRegenerate(!LoadImprove1);
    // console.log('regenerated!');
    const hostname = window.location.hostname;
    let response;
    // console.log(IdeasValueHome1, 'IdeasValue');
    // const postData = { text: IdeasValue, action: 'string', tone: 'Improve it', language: 'english' };
    const postData = { text: IdeasValueHome1, action: 'Improve it', language: languages, tone: professions };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_post_streaming', postData);
    }

    if (response && response.status === 200) {
      let text = response.data
        .replace(/#@#/g, '')
        .replace(/POST :/g, '')
        .replace(/Post\s*:\s*/, '')
        .replace(/Action :/g, '')
        .replace(/connection closed/g, '');
      text = text.toString().replace('POST : ', '').replace('Post :', '');
      const words = text.split(/\s+/).filter((word) => word.trim() !== '');
      // console.log(words, 'words');
      const textArea1 = textAreaRef.current;
      const paragraph = words.join(' ');
      const lines = paragraph.split(/[\.,]/);
      const lineCount = lines.length;
      textArea1.rows = lineCount + 1;
      const textArea = document.getElementById('socialTextarea');
      typewriterEffect(paragraph, textArea, 20);
      setIdeasValueHome(paragraph);
      setLoadingText(false);

      setResponsesText((state) => [...state, IdeasValueHome]);

      setButtonShowHome(true);
      setLoadRegenerate(false);
    }
  };
  // textarea-renegerate

  // textarea-improve
  const [LoadImprove1, setloadImprove1] = useState(false);
  const handlePostIdeaImprove1 = async () => {
    setloadImprove1(!LoadImprove1);
    setLoadingText(true);

    const hostname = window.location.hostname;
    let response;

    const postData = { text: IdeasValueHome1, action: 'Improve it', language: languages, tone: professions };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_post_streaming', postData);
    }

    if (response && response.status === 200) {
      console.log(response.data);
      let text = response.data
        .replace(/#@#/g, '')
        .replace(/POST :/g, '')
        .replace(/Post\s*:\s*/, '')
        .replace(/Action :/g, '')
        .replace(/connection closed/g, '');
      text = text.toString().replace('POST : ', '').replace('Post :', '');
      const words = text.split(/\s+/).filter((word) => word.trim() !== '');
      const textArea1 = textAreaRef.current;
      const paragraph = words.join(' ');
      const lines = paragraph.split(/[\.,]/);
      const lineCount = lines.length;
      textArea1.rows = lineCount + 1;
      const textArea = document.getElementById('socialTextarea');
      typewriterEffect(paragraph, textArea, 20);
      setIdeasValueHome(paragraph);
      setLoadingText(false);
      setResponsesText((state) => [...state, IdeasValueHome]);
      setButtonShowHome(true);
      setloadImprove1(false);
    }
  };
  // textarea-improve

  // textarea-details
  const [LoadAddDetails1, setLoadAddDetails1] = useState(false);
  const handlePostIdeaAddDetails1 = async () => {
    setLoadAddDetails1(!LoadAddDetails1);
    setLoadingText(true);

    const hostname = window.location.hostname;
    let response;

    const postData = { text: IdeasValueHome1, action: 'Add details', language: languages, tone: professions };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_post_streaming', postData);
    }

    if (response && response.status === 200) {
      console.log(response.data);
      let text = response.data
        .replace(/#@#/g, '')
        .replace(/POST :/g, '')
        .replace(/Post\s*:\s*/, '')
        .replace(/Action :/g, '')
        .replace(/connection closed/g, '');
      text = text.toString().replace('POST : ', '').replace('Post :', '');
      const words = text.split(/\s+/).filter((word) => word.trim() !== '');
      const textArea1 = textAreaRef.current;
      const paragraph = words.join(' ');
      const lines = paragraph.split(/[\.,]/);
      const lineCount = lines.length;
      textArea1.rows = lineCount + 1;
      setIdeasValueHome(paragraph);
      setLoadingText(false);
      setResponsesText((state) => [...state, IdeasValueHome]);
      setButtonShowHome(true);
      setLoadAddDetails1(false);
    }
  };
  // textarea-details

  // textarea-humor
  const [LoadHumor1, setLoadHumor1] = useState(false);
  const handlePostIdeaHumor1 = async () => {
    setLoadHumor1(!LoadHumor1);
    setLoadingText(true);

    const hostname = window.location.hostname;
    let response;

    const postData = { text: IdeasValueHome1, action: 'Humor', language: languages, tone: professions };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_post_streaming', postData);
    }

    if (response && response.status === 200) {
      console.log(response.data);
      let text = response.data
        .replace(/#@#/g, '')
        .replace(/POST :/g, '')
        .replace(/Action :/g, '')
        .replace(/Post\s*:\s*/, '')
        .replace(/connection closed/g, '');
      text = text.toString().replace('POST : ', '').replace('Post :', '');
      const words = text.split(/\s+/).filter((word) => word.trim() !== '');
      const textArea1 = textAreaRef.current;
      const paragraph = words.join(' ');
      const lines = paragraph.split(/[\.,]/);
      const lineCount = lines.length;
      textArea1.rows = lineCount + 1;
      const textArea = document.getElementById('socialTextarea');
      typewriterEffect(paragraph, textArea, 20);
      setIdeasValueHome(paragraph);
      setLoadingText(false);
      setResponsesText((state) => [...state, IdeasValueHome]);
      setButtonShowHome(true);
      setLoadHumor1(false1);
    }
  };
  // textarea-humor

  // textarea-inspire
  const [LoadInspire1, setLoadInspire1] = useState(false);
  const handlePostIdeaInspire1 = async () => {
    setLoadInspire1(!LoadInspire1);
    setLoadingText(true);

    const hostname = window.location.hostname;
    let response;

    const postData = { text: IdeasValueHome1, action: 'Inpire', language: languages, tone: professions };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_post_streaming', postData);
    }

    if (response && response.status === 200) {
      console.log(response.data);
      let text = response.data
        .replace(/#@#/g, '')
        .replace(/POST :/g, '')
        .replace(/Post\s*:\s*/, '')
        .replace(/Action :/g, '')
        .replace(/connection closed/g, '');
      text = text.toString().replace('POST : ', '').replace('Post :', '');
      const words = text.split(/\s+/).filter((word) => word.trim() !== '');
      const textArea1 = textAreaRef.current;
      const paragraph = words.join(' ');
      const lines = paragraph.split(/[\.,]/);
      const lineCount = lines.length;
      textArea1.rows = lineCount + 1;
      const textArea = document.getElementById('socialTextarea');
      typewriterEffect(paragraph, textArea, 20);
      setIdeasValueHome(paragraph);
      setLoadingText(false);
      setResponsesText((state) => [...state, IdeasValueHome]);
      setButtonShowHome(true);
      setLoadInspire1(false);
    }
  };
  // textarea-inspire

  // textarea-shorten
  const [LoadShorten1, setLoadShorten1] = useState(false);
  const handlePostIdeaShorten1 = async () => {
    setLoadShorten1(!LoadShorten1);
    setLoadingText(true);

    const hostname = window.location.hostname;
    let response;

    const postData = { text: IdeasValueHome1, action: 'Shorten it', language: languages, tone: professions };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_post_streaming', postData);
    }

    if (response && response.status === 200) {
      console.log(response.data);
      let text = response.data
        .replace(/#@#/g, '')
        .replace(/POST :/g, '')
        .replace(/Post\s*:\s*/, '')
        .replace(/Action :/g, '')
        .replace(/connection closed/g, '');
      text = text.toString().replace('POST : ', '').replace('Post :', '');
      const words = text.split(/\s+/).filter((word) => word.trim() !== '');
      // console.log(words, 'words');
      const textArea1 = textAreaRef.current;
      const paragraph = words.join(' ');
      const lines = paragraph.split(/[\.,]/);
      const lineCount = lines.length;
      textArea1.rows = lineCount + 1;
      const textArea = document.getElementById('socialTextarea');
      typewriterEffect(paragraph, textArea, 20);
      // console.log(paragraph, ';;;;;;dsdhsdh');
      setIdeasValueHome(paragraph);
      setLoadingText(false);
      setResponsesText((state) => [...state, IdeasValueHome]);
      setButtonShowHome(true);
      setLoadShorten1(false);
    }
  };
  // textarea-shorten

  // empty
  // const handleEmpty12 = () => {
  //   setIdeasValueHome1('');
  //   setSpeechLength(0);
  // };

  const handleIdeas = (element) => {
    const selected = socialIdeas[element];
    console.log('Selected ', selected);
    setSocialHome(false);
    setSelectedIdea(selected);
    setVisible(true);
    setVisible2(false);
    setButtonShow(false);
    setPostIdea(true);
  };

  // console.log(selectedIdea, 'selectedIdea');

  // todo : api for language
  const [languages, setLanguages] = useState('English');

  // todo counting text
  const [speechLength, setSpeechLength] = useState(0);

  const handlePaste = (e) => {
    const maxCharacterCount = 1000;
    const pastedText = e.clipboardData.getData('text');
    const { name, value } = e.target;

    if (name === 'socialTextarea' && value.length + pastedText.length > maxCharacterCount) {
      e.preventDefault();
    }
  };

  // home-textCounting
  const handleChange = (e) => {
    setIdeasValue(e.target.value);
    // console.log(IdeasValue, 'Ideas');
    const { name, value } = e.target;
    const maxCharacterCount = 1000;
    if (name === 'socialTextarea') {
      if (value.length > maxCharacterCount) {
        const truncatedValue = value.substring(0, maxCharacterCount);
        e.target.value = truncatedValue;
        setSpeechLength(truncatedValue.length);
      } else {
        setSpeechLength(value.length);
      }
    }
    if (value.length >= maxCharacterCount) {
      e.preventDefault();
      e.stopPropogation();
    }
  };
  // home-textCounting

  // todo textarea
  const [IdeasValue, setIdeasValue] = useState('');
  const [InitialIdeasValue, setInitialIdeasValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [PostIdea, setPostIdea] = useState(true);
  const [ButtonsShow, setButtonShow] = useState(false);

  // home-ideaPost
  const [Ideadload, setIdeadload] = useState(false);
  const [visibleTextarea, setvisibleTextarea] = useState(false);
  const [typeWriter, settypeWriter] = useState(false);
  const [textarea2reg, settextarea2reg] = useState(false);

  // typewriter effect

  // typewriter effect
  //
  const handlePostIdeas = async () => {
    if (IdeasValue.trim() === '') {
      return;
    }

    setIdeadload(true);
    settextarea2reg(true);
    setPostIdea(!PostIdea);
    setInitialIdeasValue(IdeasValue);
    const hostname = window.location.hostname;
    const textArea = document.getElementById('socialTextarea');

    let response;

    const postData = { text: IdeasValue, action: 'string', language: languages, tone: professions };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/linkedin_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/twitter_post_streaming', postData);
    }

    if (response && response.status === 200) {
      console.log(response.data);
      const text = response.data
        .replace(/#@#/g, '')
        .replace(/connection closed/, '')
        .replace(/Post :/g, '');

      const words = text.split(/\s+/).filter((word) => word.trim() !== '');
      const textArea1 = textAreaRef.current;
      const paragraph = words.join(' ');
      const lines = paragraph.split(/[\.,]/);
      const lineCount = lines.length;
      textArea1.rows = lineCount + 1;
      // console.log(paragraph, ';;;;;;dsdhsdh');
      setIdeadload(false);
      settextarea2reg(false);

      typewriterEffect(paragraph, textArea, 20);
      setIdeasValue(paragraph);
      settypeWriter(true);

      setButtonShow(!ButtonsShow);
      setPostIdea(!PostIdea);
    }
  };
  // home-ideaPost
  const [typing, setTyping] = useState(true);
  const [typedText, setTypedText] = useState('');
  const textToType = IdeasValue;

  useEffect(() => {
    if (typing) {
      const typingDelay = 200; // Adjust the typing speed
      const typingInterval = setInterval(() => {
        if (typedText.length < textToType.length) {
          setTypedText(textToType.slice(0, typedText.length + 1));
        } else {
          setTyping(false); // Typing is complete
        }
      }, typingDelay);

      return () => {
        clearInterval(typingInterval);
      };
    }
  }, [typing, textToType, typedText]);
  // home-Regenerate
  const [responses, setResponses] = useState([]);
  const [regenerate1, setRegenerate1] = useState(false);
  const handlePostIdeaRegenerate = async () => {
    setRegenerate1(!regenerate1);
    settextarea2reg(true);
    setIdeadload(true);

    const hostname = window.location.hostname;
    const textArea = document.getElementById('socialTextarea');

    let response;

    const postData = { text: InitialIdeasValue, action: 'string', language: languages, tone: professions };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_post_streaming', postData);
    }

    if (response && response.status === 200) {
      console.log(response.data);

      let text = response.data
        .replace(/#@#/g, '')
        .replace(/POST :/g, '')
        .replace(/Action :/g, '')
        .replace(/Post :/g, '')
        .replace(/connection closed/g, '');
      text = text.toString().replace('POST :', '');
      const words = text.split(/\s+/).filter((word) => word.trim() !== '');

      const textArea1 = textAreaRef.current;
      const paragraph = words.join(' ');
      const lines = paragraph.split(/[\.,]/);
      const lineCount = lines.length;
      textArea1.rows = lineCount + 1;
      typewriterEffect(paragraph, textArea, 20);
      setIdeasValue(paragraph);
      settextarea2reg(false);
      setIdeadload(false);

      setButtonShow(true);

      setResponses((state) => [...state, IdeasValue]);
    }
    setRegenerate1(false);
  };
  // home-Regenerate

  // home-improve
  const [LoadImprove, setloadImprove] = useState(false);
  const handlePostIdeaImprove = async () => {
    setloadImprove(!LoadImprove);
    settextarea2reg(true);

    const hostname = window.location.hostname;
    const textArea = document.getElementById('socialTextarea');

    let response;

    const postData = { text: IdeasValue, action: 'Improve it', language: languages, tone: professions };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_post_streaming', postData);
    }

    if (response && response.status === 200) {
      console.log(response.data);

      let text = response.data
        .replace(/#@#/g, '')
        .replace(/POST\s*:\s*/g, '')
        .replace(/Action :/g, '')
        .replace(/Post\s*:\s*/g, '')
        .replace(/connection closed/g, '');
      text = text.toString().replace('POST :', '');
      const words = text.split(/\s+/).filter((word) => word.trim() !== '');
      const textArea1 = textAreaRef.current;
      const paragraph = words.join(' ');
      const lines = paragraph.split(/[\.,]/);
      const lineCount = lines.length;
      textArea1.rows = lineCount + 1;
      typewriterEffect(paragraph, textArea, 20);
      setIdeasValue(paragraph);
      settextarea2reg(false);

      setResponses((state) => [...state, IdeasValue]);
      setButtonShow(true);
      setloadImprove(false);
    }
  };
  // home-improve

  // home-details
  const [LoadAddDetails, setLoadAddDetails] = useState(false);
  const handlePostIdeaAddDetails = async () => {
    setLoadAddDetails(!LoadAddDetails);
    settextarea2reg(true);

    const hostname = window.location.hostname;
    const textArea = document.getElementById('socialTextarea');

    let response;

    const postData = { text: IdeasValue, action: 'Add details', language: languages, tone: professions };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_post_streaming', postData);
    }

    if (response && response.status === 200) {
      console.log(response.data);
      let text = response.data
        .replace(/#@#/g, '')
        .replace(/POST\s*:\s*/g, '')
        .replace(/Action :/g, '')
        .replace(/Post :/g, '')
        .replace(/connection closed/g, '');
      text = text.toString().replace('POST :', '');
      const words = text.split(/\s+/).filter((word) => word.trim() !== '');
      const textArea1 = textAreaRef.current;
      const paragraph = words.join(' ');
      const lines = paragraph.split(/[\.,]/);
      const lineCount = lines.length;
      textArea1.rows = lineCount + 1;
      typewriterEffect(paragraph, textArea, 20);
      setIdeasValue(paragraph);
      settextarea2reg(false);

      setResponses((state) => [...state, IdeasValue]);
      setButtonShow(true);
      setLoadAddDetails(false);
    }
  };
  // home-details

  // home-Humor
  const [LoadHumor, setLoadHumor] = useState(false);
  const handlePostIdeaHumor = async () => {
    settextarea2reg(true);

    setLoadHumor(!LoadHumor);
    const hostname = window.location.hostname;
    const textArea = document.getElementById('socialTextarea');

    let response;

    const postData = { text: IdeasValue, action: 'Humor', language: languages, tone: professions };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_post_streaming', postData);
    }

    if (response && response.status === 200) {
      console.log(response.data);
      let text = response.data
        .replace(/#@#/g, '')
        .replace(/POST\s*:\s*/g, '')
        .replace(/Post :/g, '')
        .replace(/Action :/g, '')
        .replace(/connection closed/g, '');
      text = text.toString().replace('POST :', '');
      const words = text.split(/\s+/).filter((word) => word.trim() !== '');
      const textArea1 = textAreaRef.current;
      const paragraph = words.join(' ');
      const lines = paragraph.split(/[\.,]/);
      const lineCount = lines.length;
      textArea1.rows = lineCount + 1;
      typewriterEffect(paragraph, textArea, 20);
      setIdeasValue(paragraph);
      settextarea2reg(false);

      setResponses((state) => [...state, IdeasValue]);
      setButtonShow(true);
      setLoadHumor(false);
    }
  };
  // home-Humor

  // home-Inspire
  const [LoadInspire, setLoadInspire] = useState(false);
  const handlePostIdeaInspire = async () => {
    setLoadInspire(!LoadInspire);
    settextarea2reg(true);

    const hostname = window.location.hostname;
    const textArea = document.getElementById('socialTextarea');

    let response;
    const postData = { text: IdeasValue, action: 'Inpire', language: languages, tone: professions };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_post_streaming', postData);
    }

    if (response && response.status === 200) {
      console.log(response.data);
      let text = response.data
        .replace(/#@#/g, '')
        .replace(/POST\s*:\s*/g, '')
        .replace(/Post :/g, '')
        .replace(/Action :/g, '')
        .replace(/connection closed/g, '');
      text = text.toString().replace('POST :', '');
      const words = text.split(/\s+/).filter((word) => word.trim() !== '');
      const textArea1 = textAreaRef.current;
      const paragraph = words.join(' ');
      const lines = paragraph.split(/[\.,]/);
      const lineCount = lines.length;
      textArea1.rows = lineCount + 1;
      typewriterEffect(paragraph, textArea, 20);
      setIdeasValue(paragraph);
      settextarea2reg(false);

      setResponses((state) => [...state, IdeasValue]);
      setButtonShow(true);
      setLoadInspire(false);
    }
  };
  // home-Inspire

  // home-shorten
  const [LoadShorten, setLoadShorten] = useState(false);
  const handlePostIdeaShorten = async () => {
    setLoadShorten(!LoadShorten);
    settextarea2reg(true);

    const hostname = window.location.hostname;
    const textArea = document.getElementById('socialTextarea');

    let response;

    const postData = { text: IdeasValue, action: 'Shorten it', language: languages, tone: professions };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_post_streaming', postData);
    }

    if (response && response.status === 200) {
      console.log(response.data);
      let text = response.data
        .replace(/#@#/g, '')
        .replace(/POST\s*:\s*/g, '')
        .replace(/Post :/g, '')
        .replace(/Action :/g, '')
        .replace(/connection closed/g, '');

      text = text.toString().replace('POST :', '');
      const words = text.split(/\s+/).filter((word) => word.trim() !== '');
      // console.log(words, 'words');
      const textArea1 = textAreaRef.current;
      const paragraph = words.join(' ');
      const lines = paragraph.split(/[\.,]/);
      const lineCount = lines.length;
      textArea1.rows = lineCount + 1;
      typewriterEffect(paragraph, textArea, 20);
      // console.log(paragraph, ';;;;;;dsdhsdh');
      setIdeasValue(paragraph);
      settextarea2reg(false);

      setResponses((state) => [...state, IdeasValue]);
      setButtonShow(true);
      setLoadShorten(false);
    }
  };

  const handleEmpty = (index) => {
    const updatedResponses = [...responses];
    updatedResponses.splice(index, 1);
    setResponses(updatedResponses);
    setSpeechLength(0);
    // setIdeasValue('');
  };
  const handleEmpty12 = () => {
    setSpeechLength(0);
    setIdeasValue('');
  };
  // empty

  // insert functionality

  const InsertedValue = () => {
    const LinkedInClass = document.getElementsByClassName('ql-editor');
    const FacebookClass = document.getElementsByClassName('xha3pab');
    const twitterClass = document.querySelectorAll('[data-testid="tweetTextarea_0_label"]');
    const hostname = window.location.hostname;

    if (hostname == 'www.linkedin.com') {
      const LinkedInText = LinkedInClass[0].children[0];
      LinkedInText.textContent = `${IdeasValue}`;
    } else if (hostname == 'www.facebook.com') {
      let FacebookText = FacebookClass[0];
      if (
        FacebookText.childNodes[0]?.childNodes[0]?.children?.length > 0 &&
        FacebookText.childNodes[0]?.childNodes[0]?.children[0]?.tagName == 'SPAN'
      ) {
        FacebookText.childNodes[0].childNodes[0].children[0].firstChild.textContent = `${IdeasValue}`;
      } else {
        const newSpan = document.createElement('span');
        newSpan.textContent = IdeasValue;
        newSpan.setAttribute('data-lexical-text', 'true');
        FacebookText.childNodes[0].childNodes[0].appendChild(newSpan);
      }
    } else if (hostname == 'twitter.com') {
      const TwitterText =
        twitterClass[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0];
      TwitterText.textContent = `${IdeasValue}`;
    }
  };

  const [PopupMenu, setPopupMenu] = useState(false);

  // profile
  const loggedUser = {
    avatar: ProfilePic,
    name: 'Vatsal Sonani',
    email: 'example@gmail.com',
    password: 'admin123',
  };

  // setting
  const navigate = useNavigate();
  // copy
  const [copied, setCopied] = useState(false);

  //todo:  voice over search
  const outputLanguagesVoice = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'Arabic' },
    { value: 'fr', label: 'French' },
    { value: 'es', label: 'Spanish' },
    { value: 'gu', label: 'Gujarati' },
    { value: 'hi', label: 'Hindi' },
  ];
  const [audioInput, setAudioInput] = useState(false);
  const [isAudioInfoPopup, setIsAudioInfoPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [micPermission, setMicPermission] = useState('denied');
  const [permission, setPermission] = useState(false);
  const [isTypewriterDone, setIsTypewriterDone] = useState(false);
  const [isViewPrompts, setIsViewPrompts] = useState(true);
  const [closeSpeech, setCloseSpeech] = useState(false);

  const [startListen, setStartListen] = useState(true);
  const [startSpeech, setStartSpeech] = useState(true);
  const [micClicked, setMicClicked] = useState(false);
  const { transcript, interimTranscript, finalTranscript, resetTranscript, listening } = useSpeechRecognition();
  const selectRef = useRef(null);

  useEffect(() => {
    if (closeSpeech) {
      resetTranscript();
      SpeechRecognition.stopListening();
    }
  }, [closeSpeech]);
  useEffect(() => {
    if (finalTranscript !== '') {
    }
  }, [interimTranscript, finalTranscript]);

  const handleSelectVoice = (voiceText) => {
    setChatInput({ chatText: voiceText });
    setAudioInput(false);
    setMicClicked(false);
    setAudioInput(false);
    SpeechRecognition.stopListening();

    setStartListen(true);
    setStartSpeech(true);
    setMicClicked(false);
    resetTranscript();
  };
  const closeSpeechRecognition = () => {
    setCloseSpeech(true);
    SpeechRecognition.stopListening();
    setAudioInput(false);

    setStartListen(true);
    setStartSpeech(true);
    setMicClicked(false);
    setPermission(false);

    resetTranscript();
  };
  const handleAudioInput = () => {
    setAudioInput(!audioInput);
    SpeechRecognition.stopListening();
    setStartListen(true);
    setStartSpeech(true);
    setMicClicked(false);
    resetTranscript();
  };
  const handleAudioInfoPopup = () => {
    setIsAudioInfoPopup(!isAudioInfoPopup);
    setIsViewPrompts(false);
  };
  const handleBlur = () => {
    setIsMenuOpen(false);
  };

  const handleWindowClick = (e) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };
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
  useEffect(() => {
    navigator.permissions.query({ name: 'microphone' }).then((permissionStatus) => {
      setMicPermission(permissionStatus.state);
      permissionStatus.onchange = function () {
        setMicPermission(this.state);
      };
    });
  }, []);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
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
  const handleSendMessage = async (e, message, language) => {
    if (message || message?.trim()) {
      setIsUsePrompt(false);
      setAllreadyStreamed(true);
      setIsStreaming(true);
      setSpeechLength(0);
    }

    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    if (alreadyStreamed) {
      return;
    }

    // Check if there's an ongoing fetch request and abort it
    if (abortController) {
      abortController.abort();
      setAbortController(null); // Clear the abort controller
    }

    if (alreadyStreamed) {
      return;
    }
    if (isStreaming && message) {
      return;
    }
    // Create a new AbortController instance for this fetch request
    const controller = new AbortController();
    setAbortController(controller);

    if (message?.name) {
      // Add the user message to the chat data
      setChatData((prevMessages) => [...prevMessages, { msg: message.name, type: 'user' }]);

      setChatData((prevMessages) => [...prevMessages, { msg: 'Loading...', type: 'loading' }]);

      try {
        const response = await fetch('https://api-qa.resala.ai/chat/general_prompt_response_stream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            Authorization: getToken(),
          },
          body: JSON.stringify({
            chat_id: chatId,
            prompt_id: message.id,
            // Include other necessary parameters
          }),
          signal: controller.signal, // Associate the AbortController with the request
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
            if (line.includes('connection closed')) {
              setIsTypewriterDone(false);
              setAllreadyStreamed(false);
              setIsStreaming(false);
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
      } catch (error) {
        console.error('An error occurred:', error);
      }
    } else if (message && !isDocChat) {
      // Add the user message to the chat data
      setChatData((prevMessages) => [...prevMessages, { msg: message, type: 'user' }]);
      let accumulatedMessage = ''; // To accumulate words
      let isTypewriterDone = false; // Initialize the typewriter state
      // Add the "Loading..." message initially
      setChatData((prevMessages) => [...prevMessages, { msg: 'Loading...', type: 'loading' }]);
      try {
        const response = await fetch('https://api-qa.resala.ai/chat/stream_chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            Authorization: getToken(),
          },
          // todo
          body: JSON.stringify({
            question: message,
            chatId: chatId,
            web_access: !webAccess,
          }),
          signal: controller.signal, // Associate the AbortController with the request
        });

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
            data = line.replace(/#@#/g, '\n');
            if (line.includes('connection closed')) {
              // Set the typewriter state to false when "connection closed" is encountered
              setAllreadyStreamed(false);
              setIsStreaming(false);
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
    } else if (message && isDocChat) {
      setChatData((prevMessages) => [...prevMessages, { msg: message, type: 'user' }]);
      let accumulatedMessage = ''; // To accumulate words
      let isTypewriterDone = false; // Initialize the typewriter state
      // Add the "Loading..." message initially
      setChatData((prevMessages) => [...prevMessages, { msg: 'Loading...', type: 'loading' }]);
      try {
        const response = await fetch('https://api-qa.resala.ai/doc_chat/chat_document', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            Authorization: getToken(),
          },
          body: JSON.stringify({
            question: message,
            chatId: chatId,
          }),
          signal: controller.signal, // Associate the AbortController with the request
        });

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
            data = line.replace(/#@#/g, '\n');
            if (line.includes('connection closed')) {
              setAllreadyStreamed(false);
              setIsStreaming(false);
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

  // how to use info box
  const myPromptRef = useRef();
  const handleCloseInfo = () => {
    setIsAudioInfoPopup(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (myPromptRef.current && !myPromptRef.current.contains(event.target)) {
        setIsAudioInfoPopup(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myPromptRef, setIsAudioInfoPopup]);

  console.log(responses, 'responses');
  return (
    <>
      <div
        className={`hidden rounded-[10px] bg-white fixed w-[600px] min-h-[365px] h-[max-content] max-h-[650px] relative shadow border border-white overflow-hidden !font-['DM Sans']`}
        id="SocialPopup"
        // ref={socialPopupRef}
        style={{
          top: fromPosition.top,
          bottom: fromPosition.bottom,
          left: fromPosition.left,
          zIndex: '99900',
          fontFamily: 'dm Sans, sans-serif',
        }}
      >
        {/* {delelePopup && (
          <div className="absolute top-[35%] right-[12%] z-[9999]" onClick={() => setdelelePopup(!delelePopup)}>
            <SocialDeletePopup onEmpty={handleEmpty} />
          </div>
        )} */}
        <div className="flex justify-between p-[12] pl-[16] pr-[16] border-b-[1px] border-b-slate-200">
          <div className="flex">
            <div>
              <img src={ResalaIconWithText} />
            </div>
            <div className="items-center flex ml-[3px]">
              <div className="w-[34px] h-[17px] rounded-xl border border-blue-600 justify-center flex">
                <div className="text-blue-600 text-[10px] font-medium font-['DM Sans']">Beta</div>
              </div>
            </div>
          </div>
          <div className="flex gap-[8] ">
            <div
              id="SettingHeader"
              className="rounded-full justify-center items-center flex border border-slate-200 w-[24] h-[24] cursor-pointer relative"
            >
              <img className="h-[14px] w-[14px]" src={Setting} id="socialMediaPreference" />
            </div>
            {/* line */}
            <div className="w-[1px] h-[22px] border border-slate-200"></div>
            <div id="closeSocialBtn" className="cursor-pointer relative">
              <img className="rounded-full w-[24] h-[24]" src={Closed} onClick={handleClose} />
            </div>
          </div>
        </div>
        <div
          className="flex justify-between p-[12] pl-[16] pr-[16]"
          style={{ boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex">
            <div className="font-['DM Sans'] text-[16px]">Compose</div>
          </div>
          <div className="flex gap-[8px]">
            <div
              className="p-[4px] pl-[8px] relative cursor-pointer w-[70px] bg-white rounded-[14px] border border-blue-600 justify-around items-center flex"
              onClick={handleLanguage}
            >
              <div className="text-indigo-950 text-xs font-medium font-['DM Sans']">
                <p className="text-[#5F6583] text-[12px]"> {languages}</p>
              </div>
              <div className="">
                <img className="w-[14] h-[14]" src={Arrow} />
              </div>
              {/* drop down */}
              <div
                className={`${
                  language ? 'block' : 'hidden'
                } w-[121px] bg-white rounded-lg shadow flex-col justify-start items-start gap-[8px] inline-flex absolute top-[30px] right-0 p-[8px] pt-[10] pb-[10px]`}
                style={{ zIndex: '99999999', boxShadow: '0px 2px 20px 0px rgba(0, 0, 0, 0.15)' }}
              >
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={() => setLanguages('Auto')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Auto</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={() => setLanguages('English')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">English</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={() => setLanguages('Arabic')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Arabic</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={() => setLanguages('Hindi')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Hindi</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={() => setLanguages('Gujarati')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Gujarati</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={() => setLanguages('Thai')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Thai</div>
                </div>
                {/* {languages?.map((element, index) => (
                  <div
                    className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                    key={index}
                  >
                    <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">{element.language}</div>
                  </div>
                ))} */}
              </div>
            </div>

            {/* profession */}
            <div
              className="p-[4px] pl-[8px] relative cursor-pointer w-[99px] bg-white rounded-[14px] border border-blue-600 justify-around items-center flex"
              onClick={handleprofession}
            >
              <div className="text-indigo-950 text-xs font-medium font-['DM Sans']">
                <p className="text-[#5F6583] text-[12px]">{professions}</p>
              </div>
              <div className="">
                <img className="w-[14] h-[14]" src={Arrow} />
              </div>

              <div
                className={`${
                  profession ? 'block' : 'hidden'
                } w-[121px] bg-white rounded-lg shadow flex-col justify-start items-start gap-[8px] inline-flex absolute top-[30px] right-0 p-[8px] pt-[10] pb-[10px]`}
                style={{ zIndex: '99999999', boxShadow: '0px 2px 20px 0px rgba(0, 0, 0, 0.15)' }}
              >
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={() => setProfessions('Professional')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Professional</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage "
                  onClick={() => setProfessions('Casual')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Casual</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={() => setProfessions('Straight')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Straight</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={() => setProfessions('Confident')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Confident</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={() => setProfessions('Friendly')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Friendly</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* second div */}
        <div className="py-[14px] px-[16px] overflow-y-scroll max-h-[554px]" id="">
          <p
            className={`${
              !SocialHome ? 'hidden' : 'block'
            } text-[#8C90A5] text-[12px] font-[700] leading-normal !font-['DM Sans']`}
          >
            IDEAS FOR YOU
          </p>
          {/* todo textarea  */}
          {/* {contextHolder} */}

          <div className={`${visible || visible2 ? 'hidden' : ''} flex gap-[8px] flex-wrap h-[85px] overflow-y-scroll`}>
            {socialIdeas?.map((idea, index) => (
              <div key={index} onClick={() => handleIdeas(index)} className={`${!SocialHome ? 'hidden' : 'block'}`}>
                <div className="p-[8px] bg-blue-50 rounded-[6px] flex-col justify-start items-start gap-2.5 inline-flex  cursor-pointer hover:bg-[#D9EBFF] hoveringOver">
                  <div className="gap-[8px] justify-start items-start inline-flex">
                    <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">
                      <img src={idea.image_link} />
                    </div>
                    <div className="text-[#5F6583] text-[14px] font-medium font-['DM Sans']">{idea.name}</div>
                  </div>
                </div>
              </div>
            ))}
            {/* {socialIdeas?.map((idea, index) => (
              <div key={index} onClick={() => handleIdeas(index)} className={`${!SocialHome ? 'hidden' : 'block'}`}>
                <div className="p-[8px] bg-blue-50 rounded-[6px] flex-col justify-start items-start gap-2.5 inline-flex  cursor-pointer hover:bg-[#D9EBFF] hoveringOver">
                  <div className="gap-[8px] justify-start items-start inline-flex">
                    <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">
                      <img src={idea.image_link} />
                    </div>
                    <div className="text-[#5F6583] text-[14px] font-medium font-['DM Sans']">{idea.name}</div>
                  </div>
                </div>
              </div>
            ))} */}
          </div>

          {visible && (
            <>
              <div id="wholeAreaContent" className={`relative ${ButtonsShow ? 'pb-[40px]' : ''}`}>
                <div
                  className={`${
                    !ButtonsShow ? 'hidden' : ''
                  }   flex justify-end items-center gap-[8px]   absolute bottom-[7px] right-0 left-0 bg-white`}
                >
                  {/* <div className={``}> */}
                  <div
                    className="h-[30px] px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex !cursor-pointer hoverEffectIdeas"
                    onClick={handlePostIdeaImprove}
                  >
                    <div className="text-white text-base font-medium font-['DM Sans']">✍️</div>
                    <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer ">
                      Improve it
                    </div>
                    {/* {!LoadImprove ? (
                      <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                        Improve it
                      </div>
                    ) : (
                      <img id="chat-container" className="w-[50px]" src={LoadingGif} />
                    )} */}
                  </div>
                  <div
                    className="h-[30px] px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] !cursor-pointer inline-flex hoverEffectIdeas"
                    onClick={handlePostIdeaAddDetails}
                  >
                    <div className="text-white text-base font-medium font-['DM Sans']">📝</div>
                    <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                      Add Details
                    </div>
                    {/* {!LoadAddDetails ? (
                      <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                        Add Details
                      </div>
                    ) : (
                      <img id="chat-container" className="w-[50px]" src={LoadingGif} />
                    )} */}
                  </div>
                  <div
                    className="h-[30px] px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] !cursor-pointer inline-flex hoverEffectIdeas"
                    onClick={handlePostIdeaHumor}
                  >
                    <div className="text-white text-base font-medium font-['DM Sans']">😂</div>
                    <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                      Add Humor
                    </div>
                    {/* {!LoadHumor ? (
                      <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                        Add Humor
                      </div>
                    ) : (
                      <img id="chat-container" className="w-[50px]" src={LoadingGif} />
                    )} */}
                  </div>
                  <div
                    className="w-[12px] flex justify-center items-center cursor-pointer relative"
                    onClick={() => setPopupMenu(!PopupMenu)}
                  >
                    <img className="" src={Menu} />

                    {PopupMenu && (
                      <div
                        className="absolute top-[-163px] p-[8px] w-[224px] h-[150px] right-0 bg-[#fff] gap-[8px]"
                        style={{ boxShadow: '0px 4px 20px 0px rgba(60, 66, 87, 0.10)' }}
                      >
                        <div className="flex justify-between items-center py-[4px]">
                          <p className="text-[#8C90A5] text-[12px] capitalize font-[700] font-['DM Sans']">
                            IDEAS FOR TEXT
                          </p>
                          <div className="w-[12px] cursor-pointer" onClick={() => setPopupMenu(!PopupMenu)}>
                            <img className="" src={Cross} />
                          </div>
                        </div>
                        {/* todo */}
                        <div className="flex flex-wrap gap-[6px] h-[108px] overflow-y-scroll">
                          <div
                            className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                            onClick={handlePostIdeaImprove}
                          >
                            <div className="text-white text-base font-medium font-['DM Sans']">✍️</div>
                            <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                              Improve it
                            </div>
                            {/* {!LoadImprove ? (
                              <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                                Improve it
                              </div>
                            ) : (
                              <img id="chat-container" className="w-[35px]" src={LoadingGif} />
                            )} */}
                          </div>

                          <div
                            className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                            onClick={handlePostIdeaAddDetails}
                          >
                            <div className="text-white text-base font-medium font-['DM Sans']">📝</div>
                            <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                              Add Details
                            </div>
                            {/* {!LoadAddDetails ? (
                              <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                                Add Details
                              </div>
                            ) : (
                              <img id="chat-container" className="w-[35px]" src={LoadingGif} />
                            )} */}
                          </div>

                          <div
                            className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                            onClick={handlePostIdeaHumor}
                          >
                            <div className="text-white text-base font-medium font-['DM Sans']">😂</div>
                            <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                              Add Humor
                            </div>
                            {/* {!LoadHumor ? (
                              <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                                Add Humor
                              </div>
                            ) : (
                              <img id="chat-container" className="w-[35px]" src={LoadingGif} />
                            )} */}
                          </div>

                          <div
                            className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                            onClick={handlePostIdeaInspire}
                          >
                            <div className="text-white text-base font-medium font-['DM Sans']">💡</div>
                            <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                              Inspire
                            </div>
                            {/* {!LoadInspire ? (
                              <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                                Inspire
                              </div>
                            ) : (
                              <img id="chat-container" className="w-[35px]" src={LoadingGif} />
                            )} */}
                          </div>

                          <div
                            className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex hoverEffectIdeas"
                            onClick={handlePostIdeaShorten}
                          >
                            <div className="text-white text-base font-medium font-['DM Sans']">📄</div>
                            <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                              Shorten it
                            </div>
                            {/* {!LoadShorten ? (
                              <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                                Shorten it
                              </div>
                            ) : (
                              <img id="chat-container" className="w-[35px]" src={LoadingGif} />
                            )} */}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* </div> */}
                </div>
                <div
                  className="flex gap-[8px] mb-[12px] justify-start items-center cursor-pointer sticky top-[-15px] right-0 left-0 bg-white z-[99]"
                  onClick={() => {
                    setVisible(false);
                    setVisible2(false);
                    setIdeasValue('');
                    setSpeechLength(0);
                    setSocialHome(true);
                    setPostIdea(!PostIdea);
                    setButtonShow(!ButtonsShow);
                    setResponses([]);
                    setLoading(false);
                    setvisibleTextarea(false);
                    setIdeadload(false);
                    setCopied(false);
                    settextarea2reg(false);
                  }}
                >
                  <img className="w-[14] h-[14]" src={Left} />
                  <p
                    className="text-[#19224C]"
                    style={{
                      fontSize: '14px',
                    }}
                  >
                    Back
                  </p>
                </div>
                {textarea2reg ? (
                  <div className="flex justify-start items-center gap-1 my-2">
                    <img src={Loader} className="w-[12px]" />
                    <p className="text-blue-600 text-[12px] font-medium font-['DM Sans']">Working on it...</p>
                  </div>
                ) : (
                  ''
                )}
                <div className="h-[auto] overflow-y-scroll ">
                  {/* todo loader */}
                  {/* {Ideadload ? (
                    <div className="flex justify-start items-center gap-1 my-2">
                      <img src={Loader} className="w-[12px]" />
                      <p className="text-blue-600 text-[12px] font-medium font-['DM Sans']">Working on it...</p>
                    </div>
                  ) : (
                    ''
                  )} */}
                  <div id="mainContentArea1" className="mb-[15px]">
                    <div className="p-[8px] bg-blue-50 rounded-tl-md rounded-tr-md border border-slate-200  w-[-webkit-fill-available] justify-start items-start gap-2 inline-flex !cursor-pointer !hover:bg-[#D9EBFF] ">
                      <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">
                        <img src={selectedIdea.image_link} />
                      </div>
                      <div className="text-[#19224C] text-[14px] font-medium font-['DM Sans']">{selectedIdea.name}</div>
                    </div>
                    {/* <div className="text-[#8c90a5] text-[14px] font-medium font-['DM Sans']">{selectedIdea.name}</div> */}
                    <div className=" bg-white rounded-bl-md text-[#8C90A5] rounded-br-md border-l border-r border-b border-slate-200 p-[14px] min-h-[172px] flex flex-row gap-[14px]">
                      <div className="flex flex-col justify-between w-[508px]">
                        <div>
                          {/* textarea 2 */}
                          <textarea
                            placeholder={selectedIdea.placeholder}
                            className={` 'p-[1px] textArea resize-none text-[#8C90A5] h-auto min-h-[130px]`}
                            style={{ width: '100%', boxShadow: 'none', fontSize: '14px', height: 'auto' }}
                            value={IdeasValue}
                            ref={textAreaRef}
                            id="socialTextarea"
                            name="socialTextarea"
                            onChange={(e) => {
                              handleChange(e);
                              setvisibleTextarea(true);
                            }}
                            onPaste={handlePaste}
                          />
                        </div>

                        <div className={`${!ButtonsShow ? 'hidden' : 'block'} `}>
                          <div className={`flex gap-[8px] `}>
                            <div
                              className={`bg-[#1678F2] px-[10px] flex justify-center items-center h-[30px] text-[12px] rounded-[4px] text-white w-[90px]  cursor-pointer `}
                              onClick={InsertedValue}
                            >
                              Insert
                            </div>
                            <div
                              className="text-[#5F6583] px-[10px] flex justify-center items-center  h-[30px] text-[12px]  rounded-[4px] border border-[#DFE4EC] w-[90px]  cursor-pointer hoverEffectIdeas"
                              onClick={() => {
                                copy(IdeasValue);
                                setCopied(true);
                              }}
                            >
                              {copied ? 'Copied' : 'Copy'}
                            </div>
                            <div
                              className="text-[#5F6583] px-[10px] flex justify-center items-center  h-[30px] text-[12px] rounded-[4px] border border-[#DFE4EC]  cursor-pointer hoverEffectIdeas"
                              onClick={handlePostIdeaRegenerate}
                            >
                              Regenerate
                              {/* {regenerate1 ? (
                                <img id="chat-container" className="w-[35px]" src={LoadingGif} />
                              ) : (
                                'Regenerate'
                              )} */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end pt-[2px] ">
                        {/* <div className={`w-[20px] h-[20px] cursor-pointer `} onClick={handlePostIdeas}>
                          <img className=" cursor-pointer " src={Send} />
                        </div> */}
                        <div className="w-[30px] h-[20px] cursor-pointer" onClick={handlePostIdeas}>
                          {/* {PostIdea ? <img className=" cursor-pointer " src={Send} /> : ''} */}
                          {Ideadload ? (
                            // <img id="chat-container" className="w-[30px]" src={LoadingGif} />
                            ''
                          ) : (
                            <img className={`${!PostIdea ? 'hidden' : 'block'} cursor-pointer `} src={Send} />
                          )}
                        </div>
                        <div>
                          {/* {!ButtonsShow ? (
                            <span className="text-[#8C90A5] text-[12px]">{speechLength}/1000</span>
                          ) : (
                            <div onClick={handleEmpty}>
                              <img className="w-[16px] cursor-pointer" src={Trash} />
                            </div>
                          )} */}
                          {ButtonsShow && (
                            <div onClick={handleEmpty} className="relative">
                              <img className="w-[16px] cursor-pointer" src={Trash} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {!ButtonsShow && (
                      <div className="flex justify-end items-center mt-[3px]">
                        <span className="text-[#8C90A5] text-[12px]  font-['DM Sans'] ">{speechLength}/1000</span>
                      </div>
                    )}
                    {/* {newDivContent && <div>{newDivContent}</div>} */}
                  </div>

                  {responses?.map((divfd, index) => (
                    <>
                      {/* {textarea2reg ? (
                        <div className="flex justify-start items-center gap-1 my-2">
                          <img src={Loader} className="w-[12px]" />
                          <p className="text-blue-600 text-[12px] font-medium font-['DM Sans']">Working on it...</p>
                        </div>
                      ) : (
                        ''
                      )} */}
                      <div id="mainContentArea1" className="mb-[15px]" key={index}>
                        <div className="p-[8px] bg-blue-50 rounded-tl-md rounded-tr-md border border-slate-200  w-[-webkit-fill-available] justify-start items-start gap-2 inline-flex hover:bg-[#D9EBFF]">
                          <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">
                            <img src={selectedIdea.image_link} />
                          </div>
                          <div className="text-[#19224C] text-[14px] font-medium font-['DM Sans']">
                            {selectedIdea.name}
                          </div>
                        </div>
                        {/* <div className="text-[#8c90a5] text-[14px] font-medium font-['DM Sans']">{selectedIdea.name}</div> */}
                        <div className=" bg-white rounded-bl-md text-[#8C90A5] rounded-br-md border-l border-r border-b border-slate-200 p-[14px] min-h-[172px] flex flex-row gap-[14px]">
                          <div className="flex flex-col justify-between w-[508px]">
                            <div>
                              {/* textarea 2 for regenerate  */}
                              <textarea
                                placeholder={`${selectedIdea.placeholder}`}
                                className="p-[1px] textArea resize-none text-[#8C90A5] h-auto min-h-[130px]"
                                style={{ width: '100%', boxShadow: 'none', fontSize: '14px', height: 'auto' }}
                                name="socialTextarea"
                                value={divfd}
                                ref={textAreaRef}
                                // onChange={(e) => handleChange(e)}
                                onChange={handleChange}
                                onPaste={handlePaste}
                                id="socialTextarea"
                                // onChange={(e) => setIdeasValue(e.target.value)}
                              />
                            </div>

                            <div className={`${!ButtonsShow ? 'hidden' : 'block'} `}>
                              {/* todo */}
                              <div className={`flex gap-[8px]`}>
                                <div
                                  className={`bg-[#1678F2] px-[10px] flex justify-center items-center  rounded-[4px] text-[12px] text-white w-[90px] h-[30px]  cursor-pointer`}
                                  onClick={InsertedValue}
                                >
                                  Insert
                                </div>
                                <div
                                  className="text-[#5F6583] px-[10px] flex justify-center items-center  rounded-[4px] text-[12px] border border-[#DFE4EC] w-[90px] h-[30px]  cursor-pointer hoverEffectIdeas"
                                  onClick={() => copy(IdeasValue)}
                                >
                                  {copied ? 'Copy' : 'Copied'}
                                </div>
                                <div
                                  className="text-[#5F6583] px-[10px] flex justify-center items-center  rounded-[4px] text-[12px] border border-[#DFE4EC] h-[30px]  cursor-pointer hoverEffectIdeas"
                                  onClick={handlePostIdeaRegenerate}
                                >
                                  Regenerate
                                  {/* {loading ? (
                                    <img id="chat-container" className="w-[35px]" src={LoadingGif} />
                                  ) : (
                                    'Regenerate'
                                  )} */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="test123" className="flex flex-col justify-between items-end pt-[2px] ">
                            {/* <div className="w-[20px] h-[20px]" onClick={handleIdeasValues}>
                      <img className="" src={Send} />
                    </div> */}
                            <div className="w-[20px] h-[20px] cursor-pointer egdjwej">
                              {/* <img className={`${PostIdea ? 'hidden' : 'block'} cursor-pointer `} src={Send} /> */}
                              {loading
                                ? // <img id="chat-container" className="w-[100px]" src={LoadingGif} />
                                  ''
                                : ''}
                            </div>
                            <div onClick={handleEmpty12}>
                              <img className="w-[16px] cursor-pointer" src={Trash} />
                            </div>
                          </div>
                        </div>
                        {/* {newDivContent && <div>{newDivContent}</div>} */}
                      </div>
                    </>
                  ))}
                </div>

                {/* todo button part   */}
              </div>
            </>
          )}
          {visible2 && (
            <>
              <div id="" className="relative">
                <div
                  className="flex gap-[8px] mb-[12px] justify-start items-center cursor-pointer stickyBack sticky top-[-25px] right-0 left-0 bg-white z-[99]"
                  onClick={() => {
                    setVisible(false);
                    setVisible2(false);
                    setIdeasValueHome1('');
                    setIdeasValueHome('');
                    setSpeechLength(0);
                    setSocialHome(true);
                    setButtonShow(!ButtonsShow);
                    // setResponses([]);
                    setButtonShowHome(!ButtonsShowHome);
                    setResponsesText([]);
                    setLoading(false);
                    setvisibleTextarea(false);
                    setCopied(false);
                    settextarea2reg(false);
                  }}
                  // style={{ position: 'sticky', top: '-12px', right: '0', left: '0', background: 'white' }}
                >
                  <img className="w-[14] h-[14]" src={Left} />
                  <p className="text-[#19224C]">Back</p>
                </div>
                {loadingText ? (
                  <div className="flex justify-start items-center gap-1 my-2">
                    <img src={Loader} className="w-[12px]" />
                    <p className="text-blue-600 text-[12px] font-medium font-['DM Sans']">Working on it...</p>
                  </div>
                ) : (
                  ''
                )}
                <div className="h-auto overflow-y-scroll ">
                  <div id="mainContentArea1" className="mb-[15px]">
                    <div className="p-[8px] bg-blue-50 rounded-tl-md rounded-tr-md border border-slate-200  w-[-webkit-fill-available] justify-start items-start gap-2 inline-flex !cursor-pointer hover:bg-[#D9EBFF]">
                      {/* <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">
                        <img src={selectedIdea.image_link} />
                      </div> */}
                      <div className="text-[#8c90a5] text-[14px] font-medium font-['DM Sans']">{IdeasValueHome1}</div>
                    </div>
                    {/* <div className="text-[#8c90a5] text-[14px] font-medium font-['DM Sans']">{selectedIdea.name}</div> */}
                    <div className=" bg-white rounded-bl-md text-[#8C90A5] rounded-br-md border-l border-r border-b border-slate-200 p-[14px] min-h-[172px] flex flex-row gap-[14px]">
                      <div className="flex flex-col justify-between w-[508px]">
                        <div>
                          {/* <p className="text-[#8C90A5]">{selectedIdea.placeholder}</p> */}
                          {/* textarea 3 */}
                          <textarea
                            // placeholder={`${selectedIdea.placeholder}`}
                            // className={`${!loading ? 'h-[58px]' : ''} p-[1px] textArea resize-none`}
                            className={` p-[1px] textArea resize-none h-auto min-h-[130px]`}
                            style={{ width: '100%', boxShadow: 'none', height: 'auto' }}
                            ref={textAreaRef}
                            value={IdeasValueHome}
                            id="socialTextarea"
                            name="socialTextarea"
                            onChange={(e) => handleChange(e)}
                            onPaste={handlePaste}
                            // onChange={(e) => setIdeasValue(e.target.value)}
                          />
                        </div>
                        <div className={`${!ButtonsShowHome ? 'hidden' : 'block'} `}>
                          <div className={`flex gap-[8px]`}>
                            <div
                              className={`bg-[#1678F2] px-[10px] flex justify-center items-center  rounded-[4px] text-white w-[90px]  cursor-pointer`}
                              onClick={InsertedValue}
                            >
                              Insert
                            </div>
                            <div
                              className="text-[#5F6583] px-[10px] flex justify-center items-center  rounded-[4px] border border-[#DFE4EC] w-[90px]  cursor-pointer hoverEffectIdeas"
                              onClick={() => {
                                copy(IdeasValue);
                                setCopied(true);
                              }}
                            >
                              {copied ? 'Copied' : 'Copy'}
                            </div>
                            <div
                              className="text-[#5F6583] px-[10px] flex justify-center items-center  rounded-[4px] border border-[#DFE4EC]  cursor-pointer hoverEffectIdeas"
                              onClick={handleRegenerate}
                            >
                              Regenerate
                              {/* {LoadRegenerate ? (
                                <img id="chat-container" className="w-[35px] ml-1" src={LoadingGif} />
                              ) : (
                                'Regenerate'
                              )} */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end pt-[2px] ">
                        {/* <div className={`w-[20px] h-[20px] cursor-pointer `} onClick={handlePostIdeas}>
                          <img className=" cursor-pointer " src={Send} />
                        </div> */}
                        <div className="w-[50px]  cursor-pointer">
                          {/* {!ButtonsShowHome ? <img className=" cursor-pointer " src={Send} /> : ''} */}
                          {loadingText
                            ? // <img id="chat-container" className="w-[80px]" src={LoadingGif} />
                              ''
                            : // <img className={`${!PostIdea ? 'hidden' : 'block'} cursor-pointer `} src={Send} />
                              ''}
                        </div>
                        <div>
                          {!ButtonsShowHome ? (
                            ''
                          ) : (
                            <div onClick={handleEmpty12}>
                              <img className="w-[16px] cursor-pointer" src={Trash} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {!ButtonsShowHome && (
                      <div className="flex justify-end items-center mt-[2px]">
                        <p className="text-[#8C90A5] text-[12px]  font-['DM Sans'] ">{speechLength}/1000</p>
                      </div>
                    )}
                    {/* {newDivContent && <div>{newDivContent}</div>} */}
                  </div>

                  {/* todo */}
                  {ResponsesText?.map((divfd, index) => (
                    <>
                      {/* {loadingText ? (
                        <div className="flex justify-start items-center gap-1 my-2">
                          <img src={Loader} className="w-[12px]" />
                          <p className="text-blue-600 text-[12px] font-medium font-['DM Sans']">Working on it...</p>
                        </div>
                      ) : (
                        ''
                      )} */}
                      <div id="mainContentArea1" className="mb-[15px]" key={index}>
                        <div className="p-[8px] bg-blue-50 rounded-tl-md rounded-tr-md border border-slate-200  w-[-webkit-fill-available] justify-start items-start gap-2 inline-flex !cursor-pointer hover:bg-[#D9EBFF]">
                          {/* <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">
                        <img src={selectedIdea.image_link} />
                      </div> */}
                          <div className="text-[#8c90a5] text-[14px] font-medium font-['DM Sans']">
                            {IdeasValueHome1}
                          </div>
                        </div>
                        {/* <div className="text-[#8c90a5] text-[14px] font-medium font-['DM Sans']">{selectedIdea.name}</div> */}
                        <div className=" bg-white rounded-bl-md text-[#8C90A5] rounded-br-md border-l border-r border-b border-slate-200 p-[14px] flex flex-row gap-[14px] ">
                          <div className="flex flex-col justify-between w-[508px]">
                            <div style={{ flex: '1', height: 'auto' }}>
                              {/* <p className="text-[#8C90A5]">{selectedIdea.placeholder}</p> */}
                              {/* textarea 3 for regenerate */}
                              <textarea
                                // placeholder={`${selectedIdea.placeholder}`}
                                className={`textArea resize-none min-h-[130px]`}
                                style={{ width: '100%', boxShadow: 'none' }}
                                value={divfd}
                                ref={textAreaRef}
                                id="socialTextarea"
                                name="socialTextarea"
                                onChange={(e) => handleChange(e)}
                                onPaste={handlePaste}
                                // onChange={(e) => setIdeasValue(e.target.value)}
                              />
                            </div>
                            <div className={`${!ButtonsShowHome ? 'hidden' : 'block'} `}>
                              <div className={`flex gap-[8px] `}>
                                <div
                                  className={`bg-[#1678F2] px-[10px] flex justify-center items-center  rounded-[4px] text-white w-[90px]  cursor-pointer `}
                                  onClick={InsertedValue}
                                  // disabled={buttonDisabled}
                                >
                                  Insert
                                </div>
                                <div
                                  className="text-[#5F6583] px-[10px] flex justify-center items-center  cursor-pointer rounded-[4px] border border-[#DFE4EC] w-[90px] hoverEffectIdeas"
                                  onClick={() => {
                                    copy(IdeasValue);
                                    setCopied(true);
                                  }}
                                >
                                  {copied ? 'Copied' : 'Copy'}
                                </div>
                                <div
                                  className="text-[#5F6583] px-[10px] flex justify-center items-center  cursor-pointer  rounded-[4px] border border-[#DFE4EC] hoverEffectIdeas"
                                  onClick={handleRegenerate}
                                >
                                  Regenerate
                                  {/* {LoadRegenerate ? (
                                    <img id="chat-container" className="w-[35px] ml-1" src={LoadingGif} />
                                  ) : (
                                    'Regenerate'
                                  )} */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between items-end pt-[2px] ">
                            {/* <div className={`w-[20px] h-[20px] cursor-pointer `} onClick={handlePostIdeas}>
                          <img className=" cursor-pointer " src={Send} />
                        </div> */}
                            <div className="w-[20px] h-[20px] cursor-pointer">
                              {/* {!ButtonsShowHome ? <img className=" cursor-pointer " src={Send} /> : ''} */}
                              {loadingText
                                ? // <img id="chat-container" className="w-[100px]" src={LoadingGif} />
                                  ''
                                : // <img className={`${!PostIdea ? 'hidden' : 'block'} cursor-pointer `} src={Send} />
                                  ''}
                            </div>
                            <div>
                              {!ButtonsShowHome ? (
                                ''
                              ) : (
                                <div onClick={handleEmpty}>
                                  <img className="w-[16px] cursor-pointer" src={Trash} />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {!ButtonsShowHome && (
                          <div className="flex justify-end items-center mt-[2px]">
                            <p className="text-[#8C90A5] text-[12px]  font-['DM Sans'] ">{speechLength}/1000</p>
                          </div>
                        )}
                        {/* {newDivContent && <div>{newDivContent}</div>} */}
                      </div>
                    </>
                  ))}
                </div>

                {/* todo button part   */}
                <div className={`${!ButtonsShowHome ? 'hidden' : 'block'} `}>
                  <div
                    className={`flex justify-end items-center gap-[8px]  sticky bottom-[7px] right-0 left-0 bg-white`}
                  >
                    <div
                      className="h-[30px] px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex !cursor-pointer hoverEffectIdeas"
                      onClick={handlePostIdeaImprove1}
                    >
                      <div className="text-white text-base font-medium font-['DM Sans']">✍️</div>
                      <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                        Improve it
                      </div>
                      {/* {!LoadImprove1 ? (
                        <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                          Improve it
                        </div>
                      ) : (
                        <img id="chat-container" className="w-[50px]" src={LoadingGif} />
                      )} */}
                    </div>
                    <div
                      className="h-[30px] px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex  cursor-pointer hoverEffectIdeas"
                      onClick={handlePostIdeaAddDetails1}
                    >
                      <div className="text-white text-base font-medium font-['DM Sans']">📝</div>
                      <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Add Details</div>
                      {/* {!LoadAddDetails1 ? (
                        <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Add Details</div>
                      ) : (
                        <img id="chat-container" className="w-[50px]" src={LoadingGif} />
                      )} */}
                    </div>
                    <div
                      className="h-[30px] px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex  cursor-pointer hoverEffectIdeas"
                      onClick={handlePostIdeaHumor1}
                    >
                      <div className="text-white text-base font-medium font-['DM Sans']">😂</div>
                      <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Add Humor</div>
                      {/* {!LoadHumor1 ? (
                        <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Add Humor</div>
                      ) : (
                        <img id="chat-container" className="w-[50px]" src={LoadingGif} />
                      )} */}
                    </div>
                    <div
                      className="w-[12px] flex justify-center items-center cursor-pointer relative"
                      onClick={() => setPopupMenu(!PopupMenu)}
                    >
                      <img className="" src={Menu} />

                      {PopupMenu && (
                        <div
                          className="absolute top-[-163px] p-[8px] w-[224px] h-[150px] right-0 bg-[#fff] gap-[8px]"
                          style={{ boxShadow: '0px 4px 20px 0px rgba(60, 66, 87, 0.10)' }}
                        >
                          <div className="flex justify-between items-center py-[4px]">
                            <p className="text-[#8C90A5] text-[12px] capitalize font-[700] font-['DM Sans']">
                              IDEAS FOR TEXT
                            </p>
                            <div className="w-[12px] cursor-pointer" onClick={() => setPopupMenu(!PopupMenu)}>
                              <img className="" src={Cross} />
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-[6px]">
                            <div
                              className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                              onClick={handlePostIdeaImprove1}
                            >
                              <div className="text-white text-base font-medium font-['DM Sans']">✍️</div>
                              <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Improve it</div>
                              {/* {!LoadImprove1 ? (
                                <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">
                                  Improve it
                                </div>
                              ) : (
                                <img id="chat-container" className="w-[32px]" src={LoadingGif} />
                              )} */}
                            </div>

                            <div
                              className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                              onClick={handlePostIdeaAddDetails1}
                            >
                              <div className="text-white text-base font-medium font-['DM Sans']">📝</div>
                              <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Add Details</div>
                              {/* {!LoadAddDetails1 ? (
                                <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">
                                  Add Details
                                </div>
                              ) : (
                                <img id="chat-container" className="w-[32px]" src={LoadingGif} />
                              )} */}
                            </div>

                            <div
                              className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                              onClick={handlePostIdeaHumor1}
                            >
                              <div className="text-white text-base font-medium font-['DM Sans']">😂</div>
                              <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Add Humor</div>

                              {/* {!LoadHumor1 ? (
                                <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Add Humor</div>
                              ) : (
                                <img id="chat-container" className="w-[32px]" src={LoadingGif} />
                              )} */}
                            </div>

                            <div
                              className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                              onClick={handlePostIdeaInspire1}
                            >
                              <div className="text-white text-base font-medium font-['DM Sans']">💡</div>
                              <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Inspire</div>
                              {/* 
                              {!LoadInspire1 ? (
                                <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Inspire</div>
                              ) : (
                                <img id="chat-container" className="w-[32px]" src={LoadingGif} />
                              )} */}
                            </div>

                            <div
                              className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex hoverEffectIdeas"
                              onClick={handlePostIdeaShorten1}
                            >
                              <div className="text-white text-base font-medium font-['DM Sans']">📄</div>
                              <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Shorten it</div>
                              {/* {!LoadShorten1 ? (
                                <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">
                                  Shorten it
                                </div>
                              ) : (
                                <img id="chat-container" className="w-[32px]" src={LoadingGif} />
                              )} */}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* textarea */}
        </div>

        <div
          className={`${SocialHome ? 'block' : 'hidden'} p-[16px] ${
            audioInput ? 'pb-[16px]' : 'pb-[2px]'
          } absolute bottom-[0px] flex border border-white flex-col w-[100%]`}
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
                <div className="flex items-center justify-between w-full bg-white ">
                  <div
                    className="flex items-center gap-2 cursor-pointer relative"
                    onClick={() => {
                      handleAudioInfoPopup();
                    }}
                  >
                    <img src={HowToIcon} />
                    <span className="text-[12px] text-darkBlue">How to use</span>
                    {isAudioInfoPopup && (
                      <div className="!overflow-y-scroll absolute top-[-205px] h-[189px] w-[460px] right-0 left-0 shadow-md">
                        {/* <HowToUseInfoBox setIsAudioInfoPopup={setIsAudioInfoPopup} /> */}
                        <div
                          ref={myPromptRef}
                          className=" rounded-[10px] bg-white p-[20px] z-[999202] w-[460px]"
                          style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
                          // show={open}
                        >
                          <div className="pt-[8px] pb-[8px] mb-[20px] text-[20px] font-medium text-darkBlue">
                            <div className="flex items-center justify-between">
                              <div className="gap-2 flex items-center">
                                <img src={HowToIconBg} />
                                <span>How to use voice input</span>
                              </div>
                              <div className="cursor-pointer -mt-[30px]" onClick={() => handleCloseInfo()}>
                                <img src={Close} />
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <div className="text-[14px] rounded-md bg-lightblue1 px-[15px] py-[11px] text-gray1 mb-[16px]">
                              Voice input requires microphone access, and only supports Chrome for now.
                            </div>
                            <div className="mb-[16px] flex flex-col gap-[4px]">
                              <div className="text-[14px] font-medium text-darkBlue">Start recording:</div>
                              <div className="text-[14px] text-gray1">
                                Click the button or hold
                                <span className="font-medium text-primaryBlue border border-primaryBlue rounded-[4px] py-[1px] px-[3px] mx-[3px]">
                                  Space
                                </span>
                                to start recording.
                              </div>
                              <div className="text-gray1 text-[12px]">
                                *real-time transcript will be display when speaking.
                              </div>
                            </div>
                            <div className="mb-[16px] flex flex-col gap-[4px]">
                              <div className="text-[14px] font-medium text-darkBlue">Stop recording:</div>
                              <div className="text-[14px] text-gray1">
                                Click the button again or release
                                <span className="font-medium text-primaryBlue border border-primaryBlue rounded-[4px] py-[1px] px-[3px] mx-[3px]">
                                  Space
                                </span>
                                to stop recording.
                              </div>
                              <div className="text-gray1 text-[12px]">
                                *message will be send automatically after stop.
                              </div>
                            </div>
                            <div className="mb-[16px] flex flex-col gap-[4px]">
                              <div className="text-[14px] font-medium text-darkBlue">Cancel recording:</div>
                              <div className="text-[14px] text-gray1">
                                Click the Cancel icon or press
                                <span className="font-medium text-primaryBlue border border-primaryBlue rounded-[4px] py-[1px] px-[3px] mx-[3px]">
                                  Esc
                                </span>
                                to cancel recording.
                              </div>
                            </div>
                            <div className="mb-[16px] flex flex-col gap-[4px]">
                              <div className="text-[14px] font-medium text-darkBlue">Edit transcript</div>
                              <div className="text-[14px] text-gray1">
                                Click the Edit icon or press
                                <span className="font-medium text-primaryBlue border border-primaryBlue rounded-[4px] py-[1px] px-[3px] mx-[3px]">
                                  E
                                </span>
                                to put the current transcript into message input for edit.
                              </div>
                              <div className="text-gray1 text-[12px]">
                                *only available when transcript is not empty.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="inputLanguage flex items-center gap-2 text-[12px] relative text-darkBlue">
                    <div className="">Language</div>

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

              {(micPermission === 'granted' || micPermission !== 'granted') && startSpeech && !micClicked && (
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
                      // if (!isStreaming) {
                      // setController(new AbortController());
                      // setIsStreaming(true);

                      handleSendMessage(e, transcript);
                      setIsTypewriterDone(true);
                      setIsViewPrompts(false);
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
                      // }
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
          ) : (
            <div className="w-[565px] p-[14px] pb-[0px] flex border-[1px] border-slate-200 rounded-[6px] gap-[12px]">
              {/* todo mic*/}
              <div
                className="rounded-full w-[24px] h-[24px] background-[#fff] flex justify-center items-center"
                style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }}
                onClick={handleAudioInput}
              >
                <img className="w-[16px] h-[16px]" src={Mic} />
              </div>
              {/* <div
              className={`flex items-center justify-center mt-[10px] w-[24px] h-[24px] rounded-full cursor-pointer ${
                isStreaming ? 'disabled cursor-default' : ''
              }`}
              onClick={() => !isStreaming && handleAudioInput()} // Conditionally set the onClick handler
              style={{
                boxShadow: '0px 0px 10px 0px #00000026',
              }}
            ></div> */}

              <div className="min-w-[444px] min-h-[90px] text-[#8C90A5] text-[14px] font-normal font-['Arial']">
                {/* textarea 1 */}
                <textarea
                  placeholder="Tell me what to write for you"
                  className="p-[1px] textArea resize-none min-5-[50px]"
                  id="socialTextarea"
                  ref={textAreaRef}
                  value={IdeasValueHome1}
                  onChange={(e) => {
                    setIdeasValueHome1(e.target.value);
                    const { name, value } = e.target;
                    const maxCharacterCount = 1000;
                    if (name === 'socialTextarea') {
                      if (value.length > maxCharacterCount) {
                        const truncatedValue = value.substring(0, maxCharacterCount);
                        e.target.value = truncatedValue;
                        setSpeechLength(truncatedValue.length);
                      } else {
                        setSpeechLength(value.length);
                      }
                    }
                    if (value.length >= maxCharacterCount) {
                      e.preventDefault();
                      e.stopPropogation();
                    }
                  }}
                  onPaste={handlePaste}
                  name="socialTextarea"
                  style={{ width: '100%', boxShadow: 'none' }}
                />
              </div>
              <div className="flex flex-col justify-between items-end pt-[2px] pb-[10px] ml-[27px]">
                <div className="w-[20px] h-[20px]  cursor-pointer" onClick={handleTextArea}>
                  <img className=" cursor-pointer " src={Send} />
                </div>
              </div>
            </div>
          )}
          {audioInput ? (
            ''
          ) : (
            <div className="flex justify-end items-center mt-[3px] fsddfsd">
              <span className="text-[#8C90A5] text-[12px]  font-['DM Sans'] ">{speechLength}/1000</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
