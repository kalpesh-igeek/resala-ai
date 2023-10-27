import React, { useEffect, useRef, useState } from 'react';
import './Social.css';
import Setting from './utils/Social/solar_settings-broken.png';
import ProfilePic from './utils/Social/Ellipse 31.png';
import Cross from './utils/Social/cross.png';
import Closed from './utils/Social/close-circle.png';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Arrow from './utils/Social/arrow-down.png';
import Mic from './utils/Social/microphone2.svg';
import MicSVG from './utils/Social/mic.svg';
import Send from './utils/Social/send.svg';
import Left from './utils/Social/arrow-left.png';
import Trash from './utils/Social/trash.png';
import Menu from './utils/Social/Vector.png';
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
import CustomTooltip from './Components/CustomTooltip/Tooltip';
import { useDispatch } from 'react-redux';
import { handleToggle } from './redux/reducers/extension/extension-slice';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default SocialPopup = ({ fromPosition, setSocialsButton, handleSidebar, delay }) => {
  const [language, setLanguage] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const dispatch = useDispatch();

  const languageSelectorRef = useRef(null);
  const professionSelectorRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageSelectorRef.current && !languageSelectorRef.current.contains(event.target)) {
        setLanguage(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (professionSelectorRef.current && !professionSelectorRef.current.contains(event.target)) {
        setProfession(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // type writer effect
  const textAreaRef = useRef(null);
  const textAreaRefForIdeas = useRef(null);
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

  //textarea reponsive height

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
    setIdeasValueHome('');
    setIdeasValueHome1('');
    setSpeechLength(0);
    setSocialHome(true);
    setPostIdea(!PostIdea);
    setButtonShow(!ButtonsShow);
    setResponses([]);
    setResponsesText([]);
    setLoading(false);
    setvisibleTextarea(false);
    setIdeadload(false);
    const SocialComponent = document.getElementById('SocialPopup');
    SocialComponent.classList.add('hidden');
  };

  // api integration: social ideas
  const [socialIdeas, setSocialIdeas] = useState([]);

  // get-postIdea
  useEffect(() => {
    const SocialButton = document.getElementById('SocialButton');
    SocialButton.addEventListener('click', async () => {
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
        setSocialIdeas(response.data.Result);
      }
    });
  }, []);

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

  useEffect(() => {
    if (IdeasValueHome) {
      const input = textAreaRef.current;
      const offset = input.offsetHeight - input.clientHeight;
      input.style.height = 'auto';
      input.style.height = input.scrollHeight + offset + 'px';
    }
  }, [IdeasValueHome]);

  // textarea-postIdea
  // const handleTextArea = async () => {
  //   console.log("Clicked=======>");
  //   if (IdeasValueHome1.trim() === '') {
  //     return;
  //   }
  //   setPostIdea(!PostIdea);
  //   setLoadingText(!loadingText);
  //   setVisible2(true);
  //   setVisible(false);
  //   setSocialHome(false);
  //   setPostIdea1(!PostIdea1);
  //   setSpeechLength(0);

  //   const hostname = window.location.hostname;
  //   let response;

  //   const postData = { text: IdeasValueHome1, action: 'string', language: languages, tone: professions };

  //   if (hostname === 'www.linkedin.com') {
  //     response = await postRequest('/linkedin/linkedin_post_streaming', postData);
  //   } else if (hostname === 'www.facebook.com') {
  //     response = await postRequest('/facebook/facebook_post_streaming', postData);
  //   } else if (hostname === 'twitter.com') {
  //     response = await postRequest('/twitter/twitter_post_streaming', postData);
  //   }
  //   if (response && response.status === 200) {

  //     let text = response.data
  //       .replace(/#@#/g, '')
  //       .replace(/POST :/g, '')
  //       .replace(/Post\s*:\s*/, '')
  //       .replace(/Action :/g, '')
  //       .replace(/connection closed/g, '');
  //     text = text.toString().replace('POST : ', '').replace('Post :', '');
  //     const words = text.split(/\s+/).filter((word) => word.trim() !== '');
  //     console.log({words});
  //     const textArea1 = textAreaRef.current;

  //     const paragraph = words.join(' ');
  //     const lines = paragraph.split(/[\.,]/);
  //     const lineCount = lines.length;
  //     textArea1.rows = lineCount + 1;
  //     const textArea = document.getElementById('socialTextarea');
  //     console.log({paragraph});
  //     console.log({textArea});

  //     typewriterEffect(paragraph, textArea, 20);
  //     setIdeasValueHome(paragraph);
  //     setButtonShowHome(true);
  //     setPostIdea(!PostIdea);
  //     setLoadingText(false);
  //   }
  // };





  const handleTextArea = async () => {
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

    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }

    const controller = new AbortController();
    setAbortController(controller);


    const hostname = window.location.hostname;
    let response;

    const textArea = document.getElementById('socialTextarea');

    const postData = { text: IdeasValueHome1, action: 'string', language: languages, tone: professions };
    let URL = "";
    if (hostname === 'www.linkedin.com') {
      URL = "/linkedin/linkedin_post_streaming";
    } else if (hostname === 'www.facebook.com') {
      URL = "/facebook/facebook_post_streaming";
    } else if (hostname === 'twitter.com') {
      URL = "/twitter/twitter_post_streaming";
    }

    try {
      const response = await fetch(`https://api-qa.resala.ai${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await getToken(),
        },
        body: JSON.stringify(postData),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

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
            // setAllreadyStreamed(false);
            // setIsStreaming(false);
          } else {
            accumulatedMessage += data + '';
            setIdeasValueHome(accumulatedMessage);
          }
        }
        setButtonShowHome(true);
        setPostIdea(!PostIdea);
        setLoadingText(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  // textarea-postIdea

  // textarea-renegerate
  const [LoadRegenerate, setLoadRegenerate] = useState(false);
  const [ResponsesText, setResponsesText] = useState([]);
  const handleRegenerate = async () => {
    setLoadingText(true);
    setLoadRegenerate(!LoadImprove1);
    const hostname = window.location.hostname;
    let response;
    const postData = { text: IdeasValueHome1, action: 'Improve it', language: languages, tone: professions };

    // if (hostname === 'www.linkedin.com') {
    //   response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    // } else if (hostname === 'www.facebook.com') {
    //   response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    // } else if (hostname === 'twitter.com') {
    //   response = await postRequest('/twitter/regenrate_post_streaming', postData);
    // }

    // if (response && response.status === 200) {
    //   let text = response.data
    //     .replace(/#@#/g, '')
    //     .replace(/POST :/g, '')
    //     .replace(/Post\s*:\s*/, '')
    //     .replace(/Action :/g, '')
    //     .replace(/connection closed/g, '');
    //   text = text.toString().replace('POST : ', '').replace('Post :', '');
    //   const words = text.split(/\s+/).filter((word) => word.trim() !== '');

    //   const textArea1 = textAreaRef.current;
    //   const paragraph = words.join(' ');
    //   const lines = paragraph.split(/[\.,]/);
    //   const lineCount = lines.length;
    //   textArea1.rows = lineCount + 1;
    //   const textArea = document.getElementById('socialTextarea');
    //   typewriterEffect(paragraph, textArea, 20);
    //   setIdeasValueHome(paragraph);
    //   setLoadingText(false);

    //   setResponsesText((state) => [...state, IdeasValueHome]);

    //   setButtonShowHome(true);
    //   setLoadRegenerate(false);

    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }

    const controller = new AbortController();
    setAbortController(controller);

    let URL = "";
    if (hostname === 'www.linkedin.com') {
      URL = "/linkedin/linkedin_post_streaming";
    } else if (hostname === 'www.facebook.com') {
      URL = "/facebook/facebook_post_streaming";
    } else if (hostname === 'twitter.com') {
      URL = "/twitter/twitter_post_streaming";
    }

    try {
      const response = await fetch(`https://api-qa.resala.ai${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await getToken(),
        },
        body: JSON.stringify(postData),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      // const textArea1 = textAreaRef.current;
      // textArea1.rows = 2;
      const reader = response.body.getReader();
      let accumulatedMessage = '';
      setResponsesText((state) => [...state, IdeasValueHome]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');
        const lineCount = lines.length;
        // textArea1.rows = lineCount + 1;
        for (const line of lines) {
          data = line.replace(/#@#/g, '\n');
          if (line.includes('connection closed')) {
            setIsTypewriterDone(false);
          } else {
            accumulatedMessage += data + '';
            setIdeasValueHome(accumulatedMessage);
          }
        }
        setLoadingText(false);
        setButtonShowHome(true);
        setLoadRegenerate(false);

      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

  };

  // textarea-renegerate

  // textarea-improve
  const [LoadImprove1, setloadImprove1] = useState(false);

  const handlePostIdeaAction = async (Action) => {

    setloadImprove1(!LoadImprove1);
    setLoadingText(true);

    const hostname = window.location.hostname;
    let response;

    const postData = { text: IdeasValueHome1, action: Action, language: languages, tone: professions };

    // if (hostname === 'www.linkedin.com') {
    //   response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    // } else if (hostname === 'www.facebook.com') {
    //   response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    // } else if (hostname === 'twitter.com') {
    //   response = await postRequest('/twitter/regenrate_post_streaming', postData);
    // }

    // if (response && response.status === 200) {
    //   let text = response.data
    //     .replace(/#@#/g, '')
    //     .replace(/POST :/g, '')
    //     .replace(/Post\s*:\s*/, '')
    //     .replace(/Action :/g, '')
    //     .replace(/connection closed/g, '');
    //   text = text.toString().replace('POST : ', '').replace('Post :', '');
    //   const words = text.split(/\s+/).filter((word) => word.trim() !== '');
    //   const textArea1 = textAreaRef.current;
    //   const paragraph = words.join(' ');
    //   const lines = paragraph.split(/[\.,]/);
    //   const lineCount = lines.length;
    //   textArea1.rows = lineCount + 1;
    //   const textArea = document.getElementById('socialTextarea');
    //   typewriterEffect(paragraph, textArea, 20);
    //   setIdeasValueHome(paragraph);
    //   setLoadingText(false);
    //   setResponsesText((state) => [...state, IdeasValueHome]);
    //   setButtonShowHome(true);
    //   setloadImprove1(false);
    // }


    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }

    const controller = new AbortController();
    setAbortController(controller);

    let URL = "";
    if (hostname === 'www.linkedin.com') {
      URL = "/linkedin/linkedin_post_streaming";
    } else if (hostname === 'www.facebook.com') {
      URL = "/facebook/facebook_post_streaming";
    } else if (hostname === 'twitter.com') {
      URL = "/twitter/twitter_post_streaming";
    }

    try {
      const response = await fetch(`https://api-qa.resala.ai${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await getToken(),
        },
        body: JSON.stringify(postData),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      let accumulatedMessage = '';
      setResponsesText((state) => [...state, IdeasValueHome]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          data = line.replace(/#@#/g, '\n');
          if (line.includes('connection closed')) {
            setIsTypewriterDone(false);
          } else {
            accumulatedMessage += data + '';
            setIdeasValueHome(accumulatedMessage);
          }
        }
        setLoadingText(false);
        setButtonShowHome(true);
        setloadImprove1(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
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
      setLoadShorten1(false);
    }
  };
  // textarea-shorten

  const handleIdeas = (element) => {
    const selected = socialIdeas[element];
    setSocialHome(false);
    setSelectedIdea(selected);
    setVisible(true);
    setVisible2(false);
    setButtonShow(false);
    setPostIdea(true);
  };

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
      // e.stopPropogation();
    }
  };

  const handleAutoResize = (event) => {
    const input = event.target;
    const offset = input.offsetHeight - input.clientHeight;
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + offset + 'px';

  }


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


  useEffect(() => {
    if (IdeasValue) {
      const input = textAreaRef.current;
      const offset = input.offsetHeight - input.clientHeight;
      input.style.height = 'auto';
      input.style.height = input.scrollHeight + offset + 'px';
    }
  }, [IdeasValue]);

  // Handle POst Ideas 
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

    // if (hostname === 'www.linkedin.com') {
    //   response = await postRequest('/linkedin/linkedin_post_streaming', postData);
    // } else if (hostname === 'www.facebook.com') {
    //   response = await postRequest('/facebook/facebook_post_streaming', postData);
    // } else if (hostname === 'twitter.com') {
    //   response = await postRequest('/twitter/twitter_post_streaming', postData);
    // }

    // if (response && response.status === 200) {
    //   const text = response.data
    //     .replace(/#@#/g, '')
    //     .replace(/connection closed/, '')
    //     .replace(/Post :/g, '');

    //   const words = text.split(/\s+/).filter((word) => word.trim() !== '');
    //   const textArea1 = textAreaRef.current;
    //   const paragraph = words.join(' ');
    //   const lines = paragraph.split(/[\.,]/);
    //   const lineCount = lines.length;
    //   textArea1.rows = lineCount + 1;
    //   setIdeasValue("");
    //   setIdeadload(false);
    //   settextarea2reg(false);
    //   typewriterEffect(paragraph, textArea, 20);
    //   // setIdeasValue(paragraph);
    //   console.log("Set ideas value", IdeasValue);
    //   settypeWriter(true);
    //   setButtonShow(!ButtonsShow);
    //   setPostIdea(!PostIdea);
    //}

    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }

    const controller = new AbortController();
    setAbortController(controller);

    let URL = "";
    if (hostname === 'www.linkedin.com') {
      URL = '/linkedin/linkedin_post_streaming';
    } else if (hostname === 'www.facebook.com') {
      URL = '/facebook/facebook_post_streaming';
    } else if (hostname === 'twitter.com') {
      URL = '/twitter/twitter_post_streaming';
    }

    try {
      const response = await fetch(`https://api-qa.resala.ai${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await getToken(),
        },
        body: JSON.stringify(postData),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

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
          } else {
            accumulatedMessage += data + '';
            setIdeasValue(accumulatedMessage);
          }
        }
        setIdeadload(false);
        settextarea2reg(false);
        settypeWriter(true);
        setButtonShow(!ButtonsShow);
        setPostIdea(!PostIdea);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // home-ideaPost
  const [typing, setTyping] = useState(true);
  const [typedText, setTypedText] = useState('');
  const textToType = IdeasValue;

  useEffect(() => {
    if (typing) {
      const typingDelay = 200;
      const typingInterval = setInterval(() => {
        if (typedText.length < textToType.length) {
          setTypedText(textToType.slice(0, typedText.length + 1));
        } else {
          setTyping(false);
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

  useEffect(() => {
    setCopiedStates1(responses.map(() => false));
  }, [responses])




  const handlePostIdeaRegenerate = async () => {
    setRegenerate1(!regenerate1);
    settextarea2reg(true);
    setIdeadload(true);

    const hostname = window.location.hostname;
    const textArea = document.getElementById('socialTextarea');

    let response;

    const postData = { text: InitialIdeasValue, action: 'string', language: languages, tone: professions };

    // if (hostname === 'www.linkedin.com') {
    //   response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    // } else if (hostname === 'www.facebook.com') {
    //   response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    // } else if (hostname === 'twitter.com') {
    //   response = await postRequest('/twitter/regenrate_post_streaming', postData);
    // }

    // if (response && response.status === 200) {
    //   let text = response.data
    //     .replace(/#@#/g, '')
    //     .replace(/POST :/g, '')
    //     .replace(/Action :/g, '')
    //     .replace(/Post :/g, '')
    //     .replace(/connection closed/g, '');
    //   text = text.toString().replace('POST :', '');
    //   const words = text.split(/\s+/).filter((word) => word.trim() !== '');

    //   const textArea1 = textAreaRef.current;
    //   const paragraph = words.join(' ');
    //   const lines = paragraph.split(/[\.,]/);
    //   const lineCount = lines.length;
    //   textArea1.rows = lineCount + 1;
    //   typewriterEffect(paragraph, textArea, 20);
    //   setIdeasValue(paragraph);
    //   settextarea2reg(false);
    //   setIdeadload(false);

    //   setButtonShow(true);

    //   setResponses((state) => [...state, IdeasValue]);
    // }
    // setRegenerate1(false);

    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }

    const controller = new AbortController();
    setAbortController(controller);

    let URL = "";
    if (hostname === 'www.linkedin.com') {
      URL = '/linkedin/linkedin_post_streaming';
    } else if (hostname === 'www.facebook.com') {
      URL = '/facebook/facebook_post_streaming';
    } else if (hostname === 'twitter.com') {
      URL = '/twitter/twitter_post_streaming';
    }

    try {
      const response = await fetch(`https://api-qa.resala.ai${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await getToken(),
        },
        body: JSON.stringify(postData),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      let accumulatedMessage = '';
      setResponses((state) => [...state, IdeasValue]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          data = line.replace(/#@#/g, '\n');
          if (line.includes('connection closed')) {
            setIsTypewriterDone(false);
          } else {
            accumulatedMessage += data + '';
            setIdeasValue(accumulatedMessage);
          }
        }
        settextarea2reg(false);
        setIdeadload(false);
        setButtonShow(true);
      }
      setRegenerate1(false);

    } catch (error) {
      console.error('An error occurred:', error);
    }
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

    const postData = { text: IdeasValue, action: action, language: languages, tone: professions };

    // if (hostname === 'www.linkedin.com') {
    //   response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    // } else if (hostname === 'www.facebook.com') {
    //   response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    // } else if (hostname === 'twitter.com') {
    //   response = await postRequest('/twitter/regenrate_post_streaming', postData);
    // }

    // if (response && response.status === 200) {
    //   let text = response.data
    //     .replace(/#@#/g, '')
    //     .replace(/POST\s*:\s*/g, '')
    //     .replace(/Action :/g, '')
    //     .replace(/Post\s*:\s*/g, '')
    //     .replace(/connection closed/g, '');
    //   text = text.toString().replace('POST :', '');
    //   const words = text.split(/\s+/).filter((word) => word.trim() !== '');
    //   const textArea1 = textAreaRef.current;
    //   const paragraph = words.join(' ');
    //   const lines = paragraph.split(/[\.,]/);
    //   const lineCount = lines.length;
    //   textArea1.rows = lineCount + 1;
    //   typewriterEffect(paragraph, textArea, 20);
    //   setIdeasValue(paragraph);
    //   settextarea2reg(false);

    //   setResponses((state) => [...state, IdeasValue]);
    //   setButtonShow(true);
    //   setloadImprove(false);
    // }

    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }

    const controller = new AbortController();
    setAbortController(controller);

    let URL = "";
    if (hostname === 'www.linkedin.com') {
      URL = '/linkedin/linkedin_post_streaming';
    } else if (hostname === 'www.facebook.com') {
      URL = '/facebook/facebook_post_streaming';
    } else if (hostname === 'twitter.com') {
      URL = '/twitter/twitter_post_streaming';
    }

    try {
      const response = await fetch(`https://api-qa.resala.ai${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await getToken(),
        },
        body: JSON.stringify(postData),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      let accumulatedMessage = '';
      setResponses((state) => [...state, IdeasValue]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          data = line.replace(/#@#/g, '\n');
          if (line.includes('connection closed')) {
            setIsTypewriterDone(false);
          } else {
            accumulatedMessage += data + '';
            setIdeasValue(accumulatedMessage);
          }
        }
      }

      settextarea2reg(false);
      setButtonShow(true);
      setloadImprove(false)

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // home-improve
  const handlePostIdeaActionHome = async (action) => {
    setloadImprove(!LoadImprove);
    settextarea2reg(true);

    const hostname = window.location.hostname;
    const textArea = document.getElementById('socialTextarea');

    let response;

    const postData = { text: IdeasValue, action: action, language: languages, tone: professions };

    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }

    const controller = new AbortController();
    setAbortController(controller);

    let URL = "";
    if (hostname === 'www.linkedin.com') {
      URL = '/linkedin/linkedin_post_streaming';
    } else if (hostname === 'www.facebook.com') {
      URL = '/facebook/facebook_post_streaming';
    } else if (hostname === 'twitter.com') {
      URL = '/twitter/twitter_post_streaming';
    }

    try {
      const response = await fetch(`https://api-qa.resala.ai${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await getToken(),
        },
        body: JSON.stringify(postData),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      let accumulatedMessage = '';
      setResponses((state) => [...state, IdeasValue]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          data = line.replace(/#@#/g, '\n');
          if (line.includes('connection closed')) {
            setIsTypewriterDone(false);
          } else {
            accumulatedMessage += data + '';
            setIdeasValue(accumulatedMessage);
          }
        }
      }

      settextarea2reg(false);
      setButtonShow(true);
      setloadImprove(false)

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

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
      setLoadShorten(false);
    }
  };

  const handleEmpty = (index) => {
    const updatedResponses = [...responses];
    updatedResponses.splice(index, 1);
    setResponses(updatedResponses);
    setSpeechLength(0);
  };

  const handleEmptyTextarea2 = (index) => {
    const updatedResponses = [...ResponsesText];
    updatedResponses.splice(index, 1);
    setResponsesText(updatedResponses);
    setSpeechLength(0);
  };

  const handleEmpty12 = () => {
    setSpeechLength(0);
    setIdeasValue('');
    setButtonShow(!ButtonsShow)
    setIdeadload(false);
    setPostIdea(true);
  };
  // empty

  // insert functionality

  const InsertedValue = (insertValue) => {
    const LinkedInClass = document.getElementsByClassName('ql-editor');
    const FacebookClass = document.getElementsByClassName('xha3pab');
    const twitterClass = document.querySelectorAll('[data-testid="tweetTextarea_0_label"]');
    const hostname = window.location.hostname;

    if (hostname == 'www.linkedin.com') {
      const LinkedInText = LinkedInClass[0].children[0];
      LinkedInText.textContent = `${insertValue}`;
    } else if (hostname == 'www.facebook.com') {
      let FacebookText = FacebookClass[0];
      if (
        FacebookText.childNodes[0]?.childNodes[0]?.children?.length > 0 &&
        FacebookText.childNodes[0]?.childNodes[0]?.children[0]?.tagName == 'SPAN'
      ) {
        FacebookText.childNodes[0].childNodes[0].children[0].firstChild.textContent = `${insertValue}`;
      } else {
        const newSpan = document.createElement('span');
        newSpan.textContent = insertValue;
        newSpan.setAttribute('data-lexical-text', 'true');
        FacebookText.childNodes[0].childNodes[0].appendChild(newSpan);
      }
    } else if (hostname == 'twitter.com') {
      // const TwitterText =
      //   twitterClass[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0];
      // TwitterText.textContent = `${IdeasValue}`;
      TwitterInput(insertValue);
      handleClose();
    }
  };

  const TwitterInput = (IdeasValue) => {
    const input = document.querySelector('[data-testid="tweetTextarea_0"]');
    if (IdeasValue) {
      const data = new DataTransfer();
      data.setData(
        "text/plain",
        IdeasValue.replace(/(\r\n|\n|\r)/gm, "")
      );
      input.dispatchEvent(
        new ClipboardEvent("paste", {
          dataType: "text/plain",
          data: IdeasValue.replace(/(\r\n|\n|\r)/gm, ""),
          bubbles: true,
          clipboardData: data,
          cancelable: true,
        })
      );
      return true;
    }
  }

  const handleInsert = (divfd2, index) => {
    const LinkedInClass = document.getElementsByClassName('ql-editor');
    const FacebookClass = document.getElementsByClassName('xha3pab');
    const twitterClass = document.querySelectorAll('[data-testid="tweetTextarea_0_label"]');
    const hostname = window.location.hostname;

    if (hostname == 'www.linkedin.com') {
      const LinkedInText = LinkedInClass[0].children[0];
      LinkedInText.textContent = `${divfd2}`;
    } else if (hostname == 'www.facebook.com') {
      let FacebookText = FacebookClass[0];
      if (
        FacebookText.childNodes[0]?.childNodes[0]?.children?.length > 0 &&
        FacebookText.childNodes[0]?.childNodes[0]?.children[0]?.tagName == 'SPAN'
      ) {
        FacebookText.childNodes[0].childNodes[0].children[0].firstChild.textContent = `${divfd2}`;
      } else {
        const newSpan = document.createElement('span');
        newSpan.textContent = divfd2;
        newSpan.setAttribute('data-lexical-text', 'true');
        FacebookText.childNodes[0].childNodes[0].appendChild(newSpan);
      }
    } else if (hostname == 'twitter.com') {
      // const TwitterText =
      //   twitterClass[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0];
      // TwitterText.textContent = `${divfd2}`;
      TwitterInput(divfd2);
      handleClose();
    }
  };
  const [PopupMenu, setPopupMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
  const [copiedStates, setCopiedStates] = useState(ResponsesText.map(() => false));

  const [copiedStates1, setCopiedStates1] = useState(responses.map(() => false));

  const handleCopy = (text, index) => {
    copy(text);
    const updatedCopiedStates = [...copiedStates];
    updatedCopiedStates[index] = true;
    setCopiedStates(updatedCopiedStates);
    setTimeout(() => {
      const update = [...copiedStates];
      update[index] = false;
      setCopiedStates(update);
    }, 3000);
  };
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
      .catch((err) => { });
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

    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }

    if (alreadyStreamed) {
      return;
    }
    if (isStreaming && message) {
      return;
    }

    const controller = new AbortController();
    setAbortController(controller);

    if (message?.name) {
      setChatData((prevMessages) => [...prevMessages, { msg: message.name, type: 'user' }]);

      setChatData((prevMessages) => [...prevMessages, { msg: 'Loading...', type: 'loading' }]);

      try {
        const response = await fetch('https://api-qa.resala.ai/chat/general_prompt_response_stream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

            Authorization: getToken(),
          },
          body: JSON.stringify({
            chat_id: chatId,
            prompt_id: message.id,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

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
            } else {
              accumulatedMessage += data + '';
              setChatData((prevMessages) => [
                ...prevMessages.slice(0, prevMessages.length - 1),
                { msg: accumulatedMessage, type: 'ai' },
              ]);
            }
          }
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    } else if (message && !isDocChat) {
      setChatData((prevMessages) => [...prevMessages, { msg: message, type: 'user' }]);
      let accumulatedMessage = '';
      let isTypewriterDone = false;

      setChatData((prevMessages) => [...prevMessages, { msg: 'Loading...', type: 'loading' }]);
      try {
        const response = await fetch('https://api-qa.resala.ai/chat/stream_chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

            Authorization: getToken(),
          },
          // todo
          body: JSON.stringify({
            question: message,
            chatId: chatId,
            web_access: !webAccess,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        const reader = response.body.getReader();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = new TextDecoder().decode(value);

          const lines = chunk.split('\n');
          for (const line of lines) {
            data = line.replace(/#@#/g, '\n');
            if (line.includes('connection closed')) {
              setAllreadyStreamed(false);
              setIsStreaming(false);
              isTypewriterDone = true;
            } else {
              accumulatedMessage += data + '';
            }
          }

          setChatData((prevMessages) => [
            ...prevMessages.slice(0, -1),
            { msg: accumulatedMessage?.trim(), type: 'ai' },
          ]);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }

      if (isTypewriterDone) {
        setIsTypewriterDone(false);
      }
    } else if (message && isDocChat) {
      setChatData((prevMessages) => [...prevMessages, { msg: message, type: 'user' }]);
      let accumulatedMessage = '';
      let isTypewriterDone = false;

      setChatData((prevMessages) => [...prevMessages, { msg: 'Loading...', type: 'loading' }]);
      try {
        const response = await fetch('https://api-qa.resala.ai/doc_chat/chat_document', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

            Authorization: getToken(),
          },
          body: JSON.stringify({
            question: message,
            chatId: chatId,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        const reader = response.body.getReader();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = new TextDecoder().decode(value);

          const lines = chunk.split('\n');
          for (const line of lines) {
            data = line.replace(/#@#/g, '\n');
            if (line.includes('connection closed')) {
              setAllreadyStreamed(false);
              setIsStreaming(false);
              isTypewriterDone = true;
            } else {
              accumulatedMessage += data + '';
            }
          }

          setChatData((prevMessages) => [
            ...prevMessages.slice(0, -1),
            { msg: accumulatedMessage?.trim(), type: 'ai' },
          ]);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }

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

  const socialMediaPreference = () => {
    console.log('socialMediaPreference');
    const SocialPopup = document.getElementById('SocialPopup');
    const SocialButton = document.getElementById('SocialButton');
    console.log({ SocialPopup, SocialButton });
    SocialButton.classList.remove('hidden');
    SocialPopup.classList.add('hidden');
    handleSidebar('chat');
    dispatch(handleToggle(true));
    navigate('/preferences');
  };

  return (
    <>
      <div
        className={`hidden rounded-[10px] bg-white fixed w-[600px] min-h-[375px] h-[max-content] max-h-[650px] relative shadow border border-white overflow-hidden !font-['DM Sans']`}
        id="SocialPopup"
        style={{
          top: fromPosition.top,
          bottom: fromPosition.bottom,
          left: fromPosition.left,
          zIndex: '99900',
          fontFamily: 'dm Sans, sans-serif',
        }}
      >
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
            <CustomTooltip
              maxWidth="430px"
              place="top"
              id="SettingHeader"
              content={`<div class="capitalize font-normal text-[12px] leading-[18px]" >Preferences</div>`}
            >
              <div
                id="SettingHeader"
                className="rounded-full justify-center items-center flex border border-slate-200 w-[24] h-[24] cursor-pointer relative"
              >
                <img
                  className="h-[14px] w-[14px]"
                  src={Setting}
                  id="socialMediaPreference"
                  onClick={() => {
                    socialMediaPreference();
                  }}
                />
              </div>
            </CustomTooltip>

            <div className="w-[1px] h-[22px] border border-slate-200"></div>
            <div id="closeSocialBtn" className="cursor-pointer relative">
              <img className="rounded-full w-[24] h-[24]" src={Closed} onClick={handleClose} />
            </div>
          </div>
        </div>
        <div
          className="flex justify-between p-[12] pl-[16] pr-[16] items-center"
          style={{ boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex">
            <div className="font-['DM Sans'] font-[500] text-[#19224C] text-[16px]">Compose</div>
          </div>
          <div className="flex gap-[8px]">
            {/* Language */}
            <div ref={languageSelectorRef}
              className="p-[4px] pl-[8px] relative cursor-pointer w-[70px] bg-white rounded-[14px] border border-blue-600 justify-around items-center flex"
              onClick={(event) => {
                console.log("Main arrow");
                event.stopPropagation();
                handleLanguage();
              }}
            >
              <div className="text-indigo-950 text-xs font-medium font-['DM Sans']">
                <p className="text-[#19224C] text-[12px]"> {languages}</p>
              </div>
              <div className="">
                <img className="w-[14] h-[14]" src={Arrow} />
              </div>
              {/* drop down */}
              <div
                className={`${language ? 'block' : 'hidden'
                  } w-[121px] bg-white rounded-lg shadow flex-col justify-start items-start gap-[8px] inline-flex absolute top-[30px] right-0 p-[8px] pt-[10] pb-[10px]`}
                style={{ zIndex: '99999999', boxShadow: '0px 2px 20px 0px rgba(0, 0, 0, 0.15)' }}
              >
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setLanguages('Auto');
                    handleLanguage();
                  }}
                >
                  <div className="w-[97px] text-[14px] font-['DM Sans']">Auto</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={(ee) => {
                    ee.stopPropagation();
                    setLanguages('English');
                    handleLanguage();
                  }}
                >
                  <div className="w-[97px] text-[14px] font-['DM Sans']">English</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={(ea) => {
                    ea.stopPropagation();
                    setLanguages('Arabic');
                    handleLanguage();
                  }}
                >
                  <div className="w-[97px]  text-[14px] font-['DM Sans']">Arabic</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={(eh) => {
                    eh.stopPropagation();
                    setLanguages('Hindi');
                    handleLanguage();
                  }}
                >
                  <div className="w-[97px]  text-[14px] font-['DM Sans']">Hindi</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={(eg) => {
                    eg.stopPropagation();
                    setLanguages('Gujarati');
                    handleLanguage();
                  }}
                >
                  <div className="w-[97px]  text-[14px] font-['DM Sans']">Gujarati</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={(et) => {
                    et.stopPropagation();
                    setLanguages('Thai');
                    handleLanguage();
                  }}
                >
                  <div className="w-[97px]  text-[14px] font-['DM Sans']">Thai</div>
                </div>
              </div>
            </div>

            {/* profession */}
            <div ref={professionSelectorRef}
              className="p-[4px] pl-[8px] relative cursor-pointer w-[99px] bg-white rounded-[14px] border border-blue-600 justify-around items-center flex"
              onClick={(e) => {
                e.stopPropagation();
                handleprofession();
              }
              }
            >
              <div className="text-indigo-950 text-xs font-medium font-['DM Sans']">
                <p className="text-[#19224C] text-[12px]">{professions}</p>
              </div>
              <div className="">
                <img className="w-[14] h-[14]" src={Arrow} />
              </div>

              <div
                className={`${profession ? 'block' : 'hidden'
                  } w-[121px] bg-white rounded-lg shadow flex-col justify-start items-start gap-[8px] inline-flex absolute top-[30px] right-0 p-[8px] pt-[10] pb-[10px]`}
                style={{ zIndex: '99999999', boxShadow: '0px 2px 20px 0px rgba(0, 0, 0, 0.15)' }}
              >
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfessions('Professional');
                    handleprofession();
                  }}>
                  <div className="w-[97px]  text-[14px] font-['DM Sans']">Professional</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage "
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfessions('Casual');
                    handleprofession();
                  }}>
                  <div className="w-[97px] text-[14px] font-['DM Sans']">Casual</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfessions('Straight');
                    handleprofession();
                  }}>
                  <div className="w-[97px] text-[14px] font-['DM Sans']">Straight</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfessions('Confident');
                    handleprofession();
                  }}>
                  <div className="w-[97px] text-[14px] font-['DM Sans']">Confident</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfessions('Friendly');
                    handleprofession();
                  }}>
                  <div className="w-[97px] text-[14px] font-['DM Sans']">Friendly</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-[14px] px-[16px] overflow-y-scroll max-h-[554px]" id="">
          <p
            className={`${!SocialHome ? 'hidden' : 'block'
              } text-[#8C90A5] text-[12px] font-[700] leading-normal !font-['DM Sans']`}
          >
            IDEAS FOR YOU
          </p>
          {/* todo textarea  */}

          <div className={`${visible || visible2 ? 'hidden' : ''} flex gap-[8px] flex-wrap h-[85px] overflow-y-scroll`}>
            {socialIdeas.length == 0 ? (<>
              {Array.from({ length: 1 }, (_, index) => (
                <div className="flex gap-[16px] px-[6px] items-center mb-[24px]">
                  <Skeleton height={40} width={40} />
                  <div className='flex flex-col gap-[8px] item-center'>
                    <Skeleton height={20} width={404} />
                    <Skeleton height={20} width={200} />
                  </div>
                </div>
              ))}
            </>
            ) : (
              <>
                {socialIdeas?.map((idea, index) => (
                  <div key={index} className={`${!SocialHome ? 'hidden' : 'block'}`}>
                    <div className="p-[8px] bg-blue-50 rounded-[6px] flex-col justify-start items-start gap-2.5 inline-flex  cursor-pointer hover:bg-[#D9EBFF] hoveringOver"
                      onClick={() => handleIdeas(index)}>
                      <div className="gap-[8px] justify-start items-start inline-flex">
                        <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">
                          <img src={idea.image_link} />
                        </div>
                        <div className="text-[#5F6583] text-[14px] font-medium font-['DM Sans']">{idea.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {visible && (
            <>
              <div id="wholeAreaContent" className={`relative ${ButtonsShow ? 'pb-[40px]' : ''}`}>
                <div
                  className={`${!ButtonsShow ? 'hidden' : ''
                    }   flex justify-end items-center gap-[8px]   absolute bottom-[7px] right-0 left-0 bg-white`}
                >
                  <div
                    className="h-[30px] px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex !cursor-pointer hoverEffectIdeas"
                    onClick={() => { handlePostIdeaActionHome('Improve it') }}
                  >
                    <div className="text-white text-base font-medium font-['DM Sans']">✍️</div>
                    <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer ">
                      Improve it
                    </div>
                  </div>
                  <div
                    className="h-[30px] px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] !cursor-pointer inline-flex hoverEffectIdeas"
                    onClick={() => { handlePostIdeaActionHome('Add details') }}
                  >
                    <div className="text-white text-base font-medium font-['DM Sans']">📝</div>
                    <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                      Add Details Ideas
                    </div>
                  </div>
                  <div
                    className="h-[30px] px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] !cursor-pointer inline-flex hoverEffectIdeas"
                    onClick={() => { handlePostIdeaActionHome('Humor') }
                    }
                  >
                    <div className="text-white text-base font-medium font-['DM Sans']">😂</div>
                    <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                      Add Humor
                    </div>
                  </div>

                  <div ref={popupRef}
                    className="w-[12px] flex justify-center items-center cursor-pointer relative"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPopupMenu(!PopupMenu);
                    }}
                  >
                    <CustomTooltip
                      maxWidth="430px"
                      place="top"
                      id="SocialPrompts"
                      content={`<div class="capitalize font-normal text-[12px] leading-[18px]" >Prompts</div>`}
                    >
                      <img className="" src={Menu} id="SocialPrompts" />
                    </CustomTooltip>
                    {PopupMenu && (
                      <div
                        className="absolute top-[-175px] p-[8px] w-[224px] h-[160px] right-0 bg-[#fff] gap-[8px] z-[999999]"
                        style={{ boxShadow: '0px 4px 20px 0px rgba(60, 66, 87, 0.10)', 'z-index': '999999' }}
                      >
                        <div className="flex justify-between items-center py-[4px]">
                          <p className="text-[#8C90A5] text-[12px] capitalize font-[700] font-['DM Sans']">
                            IDEAS FOR TEXT Home
                          </p>
                          <div className="w-[12px] cursor-pointer" onClick={(e) => {
                            e.stopPropagation();
                            setPopupMenu(!PopupMenu);
                          }}>
                            <img className="" src={Cross} />
                          </div>
                        </div>
                        {/* todo */}
                        <div className="flex flex-wrap gap-[6px] h-auto overflow-y-scroll">
                          <div
                            className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePostIdeaActionHome('Improve it');
                              setPopupMenu(!PopupMenu);
                            }}
                          >
                            <div className="text-white text-base font-medium font-['DM Sans']">✍️</div>
                            <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                              Improve it
                            </div>
                          </div>

                          <div
                            className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePostIdeaActionHome('Add details');
                              setPopupMenu(!PopupMenu);
                            }}
                          >
                            <div className="text-white text-base font-medium font-['DM Sans']">📝</div>
                            <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                              Add Details
                            </div>
                          </div>

                          <div
                            className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePostIdeaActionHome('Humor');
                              setPopupMenu(!PopupMenu);
                            }}
                          >
                            <div className="text-white text-base font-medium font-['DM Sans']">😂</div>
                            <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                              Add Humor
                            </div>
                          </div>

                          <div
                            className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePostIdeaActionHome('Inspire');
                              setPopupMenu(!PopupMenu);
                            }}
                          >
                            <div className="text-white text-base font-medium font-['DM Sans']">💡</div>
                            <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                              Inspire
                            </div>
                          </div>

                          <div
                            className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex hoverEffectIdeas"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePostIdeaActionHome('Shorten it');
                              setPopupMenu(!PopupMenu);
                            }}
                          >
                            <div className="text-white text-base font-medium font-['DM Sans']">📄</div>
                            <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                              Shorten it
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {!textarea2reg ? (
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
                    <p className="text-[#19224C]" style={{ fontSize: '14px' }}> Back </p>
                  </div>
                ) : (
                  <div className="flex justify-start items-center gap-1 my-2">
                    <img src={Loader} className="w-[12px]" />
                    <p className="text-blue-600 text-[12px] font-medium font-['DM Sans']">Working on it...</p>
                  </div>
                )}

                <div className="h-[auto] overflow-y-scroll ">
                  {/* todo loader */}

                  <div id="mainContentArea1" className="mb-[15px]">
                    <div className="p-[8px] bg-blue-50 rounded-tl-md rounded-tr-md border border-slate-200  w-[-webkit-fill-available] justify-start items-start gap-2 inline-flex !cursor-pointer !hover:bg-[#D9EBFF] ">
                      <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">
                        <img src={selectedIdea.image_link} />
                      </div>
                      <div className="text-[#19224C] text-[14px] font-[500] font-['DM Sans']">{selectedIdea.name}</div>
                    </div>

                    <div className={`bg-white rounded-bl-md text-[#8C90A5] rounded-br-md border-l border-r border-b border-slate-200 p-[14px]  pt-[0px] ${IdeasValue ? 'h-[auto]' : 'min-h-[160px]'}  flex flex-row gap-[14px]`}>
                      <div className="flex flex-col justify-between w-[508px]">

                        {/* textarea 2 */}
                        <textarea
                          placeholder={selectedIdea.placeholder}
                          className={` textArea resize-none font-[400] text-[14px] text-[#19224C] ${IdeasValue && ButtonsShow ? 'h-auto min-[35px] max-h-max' : 'min-h-[130px] pt-[10px]'}   !bg-white`}
                          style={{ width: '100%', boxShadow: 'none', fontSize: '14px', height: 'auto', background: 'white' }}
                          value={IdeasValue}
                          ref={textAreaRef}
                          id="socialTextarea"
                          maxLength={1000}
                          name="socialTextarea"
                          disabled={ButtonsShow}
                          onChange={(e) => {
                            handleChange(e);
                            setvisibleTextarea(true);

                          }}
                          onPaste={handlePaste}
                        />


                        <div className={`${!ButtonsShow ? 'hidden' : 'block'}  mt-[10px]`}>
                          <div className={`flex gap-[8px] `}>
                            <div
                              className={`bg-[#1678F2] px-[10px] flex justify-center items-center h-[30px] text-[12px] rounded-[4px] text-white w-[90px]  cursor-pointer `}
                              onClick={() => InsertedValue(IdeasValue)}
                            >
                              Insert
                            </div>
                            <div
                              className="text-[#5F6583] px-[10px] font-[500] flex justify-center items-center  h-[30px] text-[12px]  rounded-[4px] border border-[#DFE4EC] w-[90px]  cursor-pointer hoverEffectIdeas"
                              onClick={(e) => {
                                copy(IdeasValue);
                                setCopied(true);
                                setTimeout(() => {
                                  setCopied(false);
                                }, 3000);
                                e.preventDefault();
                              }}
                            >
                              {copied ? 'Copied' : 'Copy'}
                            </div>
                            <div
                              className="text-[#5F6583] px-[10px] font-[500] text-[12px] flex justify-center items-center  rounded-[4px] border border-[#DFE4EC]  cursor-pointer hoverEffectIdeas"
                              onClick={handlePostIdeaRegenerate}
                            >
                              Regenerate
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end pt-[2px] ">
                        <div className="w-[30px] h-[20px]" >
                          {Ideadload ? (
                            ''
                          ) : (
                            <img className={`${!PostIdea ? 'hidden' : 'block'} cursor-pointer pt-[10px]`} onClick={handlePostIdeas} src={Send} />
                          )}
                        </div>

                        <div>
                          {ButtonsShow && (
                            <CustomTooltip
                              maxWidth="430px"
                              place="top"
                              id="SocialDelete"
                              content={`<div class="capitalize font-normal text-[12px] leading-[18px]" >Delete</div>`}
                            >
                              <div onClick={handleEmpty12} className="relative" id="SocialDelete">
                                <img className="w-[16px] cursor-pointer" src={Trash} />
                              </div>
                            </CustomTooltip>
                          )}
                        </div>
                      </div>
                    </div>
                    {!ButtonsShow && (
                      <div className="flex justify-end items-center mt-[3px]">
                        <span className="text-[#8C90A5] text-[12px]  font-['DM Sans'] ">{speechLength}/1000</span>
                      </div>
                    )}
                  </div>

                  {responses?.map((divfd, index) => (
                    <>
                      <div id="mainContentArea1" className="mb-[15px]" key={index}>
                        <div className="p-[8px] bg-blue-50 rounded-tl-md rounded-tr-md border border-slate-200  w-[-webkit-fill-available] justify-start items-start gap-2 inline-flex hover:bg-[#D9EBFF]">
                          <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">
                            <img src={selectedIdea.image_link} />
                          </div>
                          <div className="text-[#19224C] text-[14px] font-medium font-['DM Sans']">
                            {selectedIdea.name}
                          </div>
                        </div>

                        <div className=" bg-white rounded-bl-md text-[#19224C] rounded-br-md border-l border-r border-b border-slate-200 p-[14px] h-[auto] flex flex-row gap-[14px]">
                          <div className="flex flex-col justify-between w-[508px]">
                            <div className='text-[14px]'>{divfd}
                              {/* textarea 2 for regenerate  */}
                              {/* <textarea
                                readOnly
                                placeholder={`${selectedIdea.placeholder}`}
                                className="p-[1px] textArea  text-[#8C90A5] h-auto"
                                style={{ width: '100%', boxShadow: 'none', fontSize: '14px', height: 'auto' }}
                                name="socialTextarea"
                                value={divfd}
                                ref={textAreaRef}
                                onChange={(event) => {
                                  const input = event.target;
                                  const offset = input.offsetHeight - input.clientHeight;
                                  input.style.height = 'auto';
                                  input.style.height = input.scrollHeight + offset + 'px';
                                }}
                                onPaste={handlePaste}
                                id="socialTextarea"
                              /> */}
                            </div>

                            <div className={`${!ButtonsShow ? 'hidden' : 'block'}  mt-[10px]`}>
                              {/* todo */}
                              <div className={`flex gap-[8px]`}>
                                <div
                                  className={`bg-[#1678F2] px-[10px] flex justify-center items-center  rounded-[4px] text-[12px] text-white w-[90px] h-[30px]  cursor-pointer`}
                                  // onClick={InsertedValue}
                                  onClick={() => InsertedValue(divfd)}
                                >
                                  Insert
                                </div>
                                <div
                                  className="text-[#5F6583] px-[10px] flex justify-center items-center font-[500]  rounded-[4px] text-[12px] border border-[#DFE4EC] w-[90px] h-[30px]  cursor-pointer hoverEffectIdeas"
                                  onClick={() => {
                                    copy(divfd)
                                    const updatedCopiedStates = [...copiedStates1];
                                    updatedCopiedStates[index] = true;
                                    setCopiedStates1(updatedCopiedStates);

                                    setTimeout(() => {
                                      const updated = [...copiedStates1];
                                      updated[index] = false;
                                      setCopiedStates1(updated);
                                      console.log(updated[index]);
                                    }, 3000);
                                  }
                                  }
                                >
                                  {copiedStates1[index] ? 'Copied' : 'Copy'}
                                </div>
                                <div
                                  className="text-[#5F6583] px-[10px] font-[500]  flex justify-center items-center  rounded-[4px] text-[12px] border border-[#DFE4EC] h-[30px]  cursor-pointer hoverEffectIdeas"
                                  onClick={handlePostIdeaRegenerate}
                                >
                                  Regenerate
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="test123" className="flex flex-col justify-between items-end pt-[2px] ">
                            <div className="w-[20px] h-[20px] cursor-pointer egdjwej">{loading ? '' : ''}</div>
                            <CustomTooltip
                              maxWidth="430px"
                              place="top"
                              id="SocialDelete"
                              content={`<div class="capitalize font-normal text-[12px] leading-[18px]" >Delete</div>`}
                            >
                              <div onClick={() => handleEmpty(index)} className="relative" id="SocialDelete">
                                <img className="w-[16px] cursor-pointer" src={Trash} />
                              </div>
                            </CustomTooltip>
                          </div>
                        </div>
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
                {!loadingText ? (
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
                      setButtonShowHome(!ButtonsShowHome);
                      setResponsesText([]);
                      setLoading(false);
                      setvisibleTextarea(false);
                      setCopied(false);
                      settextarea2reg(false);
                    }}
                  >
                    <img className="w-[14] h-[14]" src={Left} />
                    <p className="text-[#19224C]">Back</p>
                  </div>
                ) : (
                  <div className="flex justify-start items-center gap-1 my-2">
                    <img src={Loader} className="w-[12px]" />
                    <p className="text-blue-600 text-[12px] font-medium font-['DM Sans']">Working on it...</p>
                  </div>
                )}
                <div className="h-auto overflow-y-scroll ">
                  <div id="mainContentArea1" className="mb-[15px]">
                    <div className="p-[8px] bg-blue-50 rounded-tl-md rounded-tr-md border border-slate-200  w-[-webkit-fill-available] justify-start items-start gap-2 inline-flex !cursor-pointer hover:bg-[#D9EBFF]">
                      <div className="text-[#19224C] text-[14px] font-[500] font-['DM Sans']">{IdeasValueHome1}</div>
                    </div>

                    <div className={` bg-white rounded-bl-md rounded-br-md border-l border-r border-b pt-[0px] border-slate-200 p-[14px] ${IdeasValueHome ? 'h-[auto]' : 'min-h-[160px]'} flex flex-row gap-[14px]`}>
                      <div className="flex flex-col justify-between w-[508px]">
                        <div>
                          {/* textarea 3 */}
                          <textarea
                            readOnly
                            className={` textArea  text-[14px] text-[#19224C] resize-none ${IdeasValueHome && ButtonsShowHome ? 'h-auto min-[35px] max-h-max' : 'min-h-[35px]'} pt-[10px]'}`}
                            style={{ width: '100%', boxShadow: 'none', height: 'auto' }}
                            ref={textAreaRef}
                            value={IdeasValueHome}
                            id="socialTextarea"
                            name="socialTextarea"
                            onChange={(e) => handleChange(e)}
                            onPaste={handlePaste}
                          />
                        </div>
                        <div className={`${!ButtonsShowHome ? 'hidden' : 'block'} mt-[10px] `}>
                          <div className={`flex gap-[8px]`}>
                            <div
                              className={`bg-[#1678F2] px-[10px] flex justify-center items-center h-[30px] text-[12px] rounded-[4px] text-white w-[90px]  cursor-pointer`}
                              // onClick={InsertedValue}
                              onClick={() => InsertedValue(IdeasValueHome)}
                            >
                              Insert
                            </div>
                            <div
                              className="text-[#5F6583] px-[10px] font-[500] text-[12px] flex justify-center items-center  rounded-[4px] border border-[#DFE4EC] w-[90px]  cursor-pointer hoverEffectIdeas"
                              onClick={() => {
                                copy(IdeasValueHome);
                                setCopied(true);
                                setTimeout(() => {
                                  setCopied(false);
                                }, 3000);
                              }}
                            >
                              {copied ? 'Copied' : 'Copy'}
                              {/* {copiedStates[index] ? 'Copied' : 'Copy'} */}
                            </div>
                            <div
                              className="text-[#5F6583] px-[10px] font-[500] flex justify-center items-center  text-[12px]  rounded-[4px] border border-[#DFE4EC]  cursor-pointer hoverEffectIdeas"
                              onClick={handleRegenerate}
                            >
                              Regenerate
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end pt-[2px] ">
                        <div className="w-[50px]  cursor-pointer">{loadingText ? '' : ''}</div>
                        <div>
                          {!ButtonsShowHome ? (
                            ''
                          ) : (
                            <CustomTooltip
                              maxWidth="430px"
                              place="top"
                              id="SocialDelete"
                              content={`<div class="capitalize font-normal text-[12px] leading-[18px]" >Delete</div>`}
                            >
                              <div onClick={handleEmpty12} className="relative" id="SocialDelete">
                                <img className="w-[16px] cursor-pointer" src={Trash} />
                              </div>
                            </CustomTooltip>
                          )}
                        </div>
                      </div>
                    </div>
                    {!ButtonsShowHome && (
                      <div className="flex justify-end items-center mt-[2px]">
                        <p className="text-[#8C90A5] text-[12px]  font-['DM Sans'] ">{speechLength}/1000</p>
                      </div>
                    )}
                  </div>

                  {/* todo */}
                  {ResponsesText?.map((divfd2, index) => (
                    <>
                      <div id="mainContentArea1" className="mb-[15px]" key={index}>
                        <div className="p-[8px] bg-blue-50 rounded-tl-md rounded-tr-md border border-slate-200  w-[-webkit-fill-available] justify-start items-start gap-2 inline-flex !cursor-pointer hover:bg-[#D9EBFF]">
                          <div className="text-[#19224C]  text-[14px] font-medium font-['DM Sans']">
                            {IdeasValueHome1}
                          </div>
                        </div>

                        <div className=" bg-white rounded-bl-md text-[#19224C]  rounded-br-md border-l border-r border-b border-slate-200 p-[14px] flex flex-row gap-[14px] ">
                          <div className="flex flex-col justify-between w-[508px]">
                            <div className='text-[14px]'>{divfd2}</div>
                            {/* <div style={{ flex: '1', height: 'auto' }}>
                              <textarea
                                className={`textArea resize-none min-h-[130px]`}
                                style={{ width: '100%', boxShadow: 'none' }}
                                value={divfd2}
                                ref={textAreaRef}
                                id="socialTextarea"
                                name="socialTextarea"
                                onChange={(e) => handleChange(e)}
                                onPaste={handlePaste}
                              />
                            </div> */}
                            <div className={`${!ButtonsShowHome ? 'hidden' : 'block'} mt-[10px] `}>
                              <div className={`flex gap-[8px] `}>
                                <div
                                  className={`bg-[#1678F2] px-[10px] flex justify-center items-center h-[30px] text-[12px] rounded-[4px] text-white w-[90px]  cursor-pointer`}
                                  onClick={() => handleInsert(divfd2, index)}
                                >
                                  Insert
                                </div>
                                <div
                                  className="text-[#5F6583] px-[10px] font-[500] text-[12px] flex justify-center items-center  rounded-[4px] border border-[#DFE4EC] w-[90px]  cursor-pointer hoverEffectIdeas"
                                  onClick={() => { handleCopy(divfd2, index) }}>
                                  {copiedStates[index] ? 'Copied' : 'Copy'}
                                </div>
                                <div
                                  className="text-[#5F6583] px-[10px] font-[500] flex justify-center items-center  text-[12px]  rounded-[4px] border border-[#DFE4EC]  cursor-pointer hoverEffectIdeas"
                                  onClick={handleRegenerate}
                                >
                                  Regenerate
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between items-end pt-[2px] ">
                            <div className="w-[20px] h-[20px] cursor-pointer">{loadingText ? '' : ''}</div>
                            <div>
                              {!ButtonsShowHome ? (
                                ''
                              ) : (
                                <CustomTooltip
                                  maxWidth="430px"
                                  place="top"
                                  id="SocialDelete"
                                  content={`<div class="capitalize font-normal text-[12px] leading-[18px]" >Delete</div>`}
                                >
                                  <div
                                    onClick={() => handleEmptyTextarea2(index)}
                                    className="relative"
                                    id="SocialDelete"
                                  >
                                    <img className="w-[16px] cursor-pointer" src={Trash} />
                                  </div>
                                </CustomTooltip>
                              )}
                            </div>
                          </div>
                        </div>
                        {!ButtonsShowHome && (
                          <div className="flex justify-end items-center mt-[2px]">
                            <p className="text-[#8C90A5] text-[12px]  font-['DM Sans'] ">{speechLength}/1000</p>
                          </div>
                        )}
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
                      onClick={() => handlePostIdeaAction('Improve it')}
                    >
                      <div className="text-white text-base font-medium font-['DM Sans']">✍️</div>
                      <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']  cursor-pointer">
                        Improve it
                      </div>
                    </div>
                    <div
                      className="h-[30px] px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex  cursor-pointer hoverEffectIdeas"
                      onClick={() => { handlePostIdeaAction('Add details') }}
                    >
                      <div className="text-white text-base font-medium font-['DM Sans']">📝</div>
                      <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Add Details </div>
                    </div>

                    <div
                      className="h-[30px] px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex  cursor-pointer hoverEffectIdeas"
                      onClick={() => { handlePostIdeaAction('Humor') }}
                    >
                      <div className="text-white text-base font-medium font-['DM Sans']">😂</div>
                      <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Add Humor</div>
                    </div>

                    <div ref={popupRef}
                      className="w-[12px] flex justify-center items-center cursor-pointer relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPopupMenu(!PopupMenu);
                      }}
                    >
                      <CustomTooltip
                        maxWidth="430px"
                        place="top"
                        id="SocialPrompts"
                        content={`<div class="capitalize font-normal text-[12px] leading-[18px]" >Prompts</div>`}
                      >
                        <img className="" src={Menu} id="SocialPrompts" />
                      </CustomTooltip>
                      {PopupMenu && (
                        <div
                          className="absolute top-[-183px] p-[8px] w-[224px] h-[165px] right-0 bg-[#fff] gap-[8px] z-[999999]"
                          style={{ boxShadow: '0px 4px 20px 0px rgba(60, 66, 87, 0.10)' }}
                        >
                          <div className="flex justify-between items-center py-[4px] pb-[12px]">
                            <p className="text-[#8C90A5] text-[12px] capitalize font-[700] font-['DM Sans']">
                              IDEAS FOR TEXT
                            </p>
                            <div className="w-[12px] cursor-pointer" onClick={(e) => {
                              e.stopPropagation();
                              setPopupMenu(!PopupMenu);
                            }}>
                              <img className="" src={Cross} />
                            </div>
                          </div>

                          <div className="flex flex-wrap h-auto gap-[6px]">
                            <div
                              className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePostIdeaAction('Improve it');
                              }}
                            >
                              <div className="text-white text-base font-medium font-['DM Sans']">✍️</div>
                              <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Improve it</div>
                            </div>

                            <div
                              className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePostIdeaAction('Add details');
                              }}
                            >
                              <div className="text-white text-base font-medium font-['DM Sans']">📝</div>
                              <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Add Details</div>
                            </div>

                            <div
                              className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePostIdeaAction('Humor');
                              }}
                            >
                              <div className="text-white text-base font-medium font-['DM Sans']">😂</div>
                              <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Add Humor</div>
                            </div>

                            <div
                              className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer hoverEffectIdeas"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePostIdeaAction('Inspire');
                              }}
                            >
                              <div className="text-white text-base font-medium font-['DM Sans']">💡</div>
                              <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Inspire</div>
                            </div>

                            <div
                              className="px-[6px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex hoverEffectIdeas"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePostIdeaAction('Shorten it');
                              }}
                            >
                              <div className="text-white text-base font-medium font-['DM Sans']">📄</div>
                              <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Shorten it</div>
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
        </div>

        <div
          className={`${SocialHome ? 'block' : 'hidden'} p-[16px] ${audioInput ? 'pb-[16px]' : 'pb-[2px]'
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
                        <div
                          ref={myPromptRef}
                          className=" rounded-[10px] bg-white p-[20px] z-[999202] w-[460px]"
                          style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
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
                        isSearchable={false}
                        styles={{
                          control: (base) => ({
                            ...base,

                            height: '24px',
                            minHeight: '24px',
                            width: '100px',
                            boxShadow: 'none',
                            backgroundColor: 'unset',
                            top: '-3px'
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
                              fontSize: '14px'
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
                  onClick={(e) => {
                    e.stopPropagation();
                    listenContinuously();
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <img src={MicrophoneWhiteIcon} />
                    <span>Hold Space or Click button to speak</span>
                  </div>
                  <div className="cursor-pointer" onClick={(del) => {
                    del.stopPropagation();
                    closeSpeechRecognition();
                  }}>
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
                    <span>Please allow Resala to use your microphone</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => closeSpeechRecognition()}>
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
                    <span>Listening. Click again to submit, Esc to cancel</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => closeSpeechRecognition()}>
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
                    onClick={(e) => {
                      handleSendMessage(e, transcript);
                      setIsTypewriterDone(true);
                      setIsViewPrompts(false);
                      setAudioInput(false);
                      setMicClicked(false);
                      setAudioInput(false);
                      SpeechRecognition.stopListening();
                      setStartListen(true);
                      setStartSpeech(true);
                      setMicClicked(false);
                      resetTranscript();
                      setIsViewPrompts(false);
                      // }
                    }}
                  >
                    <img src={MicrophoneWhiteIcon} />

                    <span className="cursor-pointer">{transcript}</span>
                    {/* )} */}
                  </div>
                  <div className="cursor-pointer" onClick={() => closeSpeechRecognition()}>
                    <img src={SmallClose} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-[565px] p-[14px] pb-[0px] flex border-[1px] border-slate-200 rounded-[6px] gap-[12px]">
              {/* todo mic*/}
              <div
                className="rounded-full w-[24px] h-[20px] background-[#fff] flex justify-center items-center"
                style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }}
                onClick={handleAudioInput}
              >
                <img className="w-[16px] h-[16px]" src={Mic} />
              </div>
              {/* <div>
              <img className="w-[16px] h-[16px]" src={MicSVG} />
              </div> */}

              <div className="min-w-[444px] min-h-[90px] text-[#8C90A5] text-[14px] font-normal font-['Arial']">
                {/* textarea 1 */}
                <textarea
                  placeholder="Tell me what to write for you"
                  className="p-[1px] textArea resize-none min-5-[50px] bg-white"
                  id="socialTextarea"
                  rows="5"
                  ref={textAreaRef}
                  value={IdeasValueHome1}
                  maxLength="1000"
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
                      // e.stopPropogation();
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
