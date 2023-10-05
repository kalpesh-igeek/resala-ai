import React, { useEffect, useState } from 'react';
import './Social.css';
import Logo from './utils/Social/Risala.ai - LOGO - 13.png';
import Setting from './utils/Social/solar_settings-broken.png';
import Profile from './utils/Social/Ellipse 31.png';
import Cross from './utils/Social/cross.png';
import Close from './utils/Social/close-circle.png';

import Arrow from './utils/Social/arrow-down.png';
import Mic from './utils/Social/microphone2.png';
import Send from './utils/Social/send.png';
import Left from './utils/Social/arrow-left.png';
import Trash from './utils/Social/trash.png';
import Menu from './utils/Social/Vector.png';
// import { message } from 'antd';

import ResalaIconWithText from './utils/Youtube/ResalaIconWithText.svg';
import axios from 'axios';
import { getToken } from './utils/localstorage';
import { getRequest, postRequest } from './services';
import { Audio } from 'react-loader-spinner';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);
export default SocialPopup = ({ fromPosition }) => {
  // const [Ideas, setIdeas] = useState(true);
  // const [Intro1, setIntro] = useState(false);
  // const [Mobile1, setMobile] = useState(false);
  // const [Bag1, setBag] = useState(false);

  // right: calc(100vw - 1120px);
  // position: fixed;
  // bottom: calc(100vh - 480px);
  // /* bottom: 0px; */
  // z-index: 9999999999;
  // a[0].getBoundingClientRect();
  // const [fromPosition, setFromPosition] = useState({
  //   bottom: 0,
  //   left: 0,
  // });
  // useEffect(() => {
  //   let setLogoSocial = document.getElementById('setLogoSocial');
  //   if (!setLogoSocial) return;
  //   setLogoSocial.addEventListener('click', function () {
  //     let SocialPopup = document.getElementById('SocialPopup');
  //     console.log('clicked!', SocialPopup);
  //     const FormPosition = document.getElementsByClassName('xt7dq6l')[2].getBoundingClientRect();
  //     console.log('FormPosition', FormPosition);
  //     if (FormPosition) {
  //       console.log('FormPosition', FormPosition);
  //       setFromPosition({
  //         bottom: FormPosition.bottom - 275,
  //         left: FormPosition.left + 250,
  //       });
  //       // SocialPopup.style.top = FormPosition.top;
  //       // SocialPopup.style.left = FormPosition.left;
  //     }
  //   });
  // }, []);

  console.log('fromPosition', fromPosition);

  //
  const [language, setLanguage] = useState(false);

  const handleLanguage = () => {
    // setLanguage((prevLanguage) => (prevLanguage === 'English' ? '' : 'English'));
    setLanguage(!language);
    setProfession(false);
  };
  const [profession, setProfession] = useState(false);
  const [professions, setProfessions] = useState('Professional');

  const handleprofession = (selectedValue) => {
    setProfessions(selectedValue);
    console.log(professions, 'professions');
    setProfession(!profession);
    setLanguage(false);
  };
  // // todo profession
  // const [profession, setProfession] = useState('Professional'); // Initialize with a default profession

  // const handleProfession = () => {
  //   setProfession((prevProfession) => (prevProfession === 'Professional' ? '' : 'Professional'));
  // };
  // language
  // const [language, setLanguage] = useState('English');
  // const handleLanguage = () => {
  //   setLanguage((prevLanguage) => (prevLanguage === 'English' ? '' : 'English'));
  // };

  // const selectLanguage = (selectedLanguage) => {
  //   setLanguage(selectedLanguage);
  // };

  //
  const [ideas, setIdeas] = useState(false);
  // const handleIdeas = () => {
  //   setIdeas(!ideas);
  // };

  //
  const [showButton1Content, setShowButton1Content] = useState(false);
  const [showButton2Content, setShowButton2Content] = useState(false);
  const [showButton3Content, setShowButton3Content] = useState(false);

  const toggleContent = (buttonNumber) => {
    setShowButton1Content(false);
    setShowButton2Content(false);
    setShowButton3Content(false);

    switch (buttonNumber) {
      case 1:
        setShowButton1Content(true);
        setIdeas(!ideas);
        break;
      case 2:
        setShowButton2Content(true);
        setIdeas(!ideas);

        break;
      case 3:
        setShowButton3Content(true);
        setIdeas(!ideas);

        break;
      default:
        break;
    }
  };

  //
  const handleBack = () => {
    setIdeas(!ideas);
    setShowButton1Content(false);
    setShowButton3Content(false);
    setShowButton2Content(false);
    setIdeasValue('');
  };

  // close
  const [close, setClose] = useState(true);

  const handleClose = () => {
    setClose(!close);
    setIdeasValue('');
  };

  // api integration: social ideas
  const [socialIdeas, setSocialIdeas] = useState([]);

  useEffect(() => {
    const SocialButton = document.getElementById('SocialButton');
    SocialButton.addEventListener('click', async () => {
      console.log('CLICKCKCKCKCKCKCK');
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
        console.log(response.data.Result);
        setSocialIdeas(response.data.Result);
      }
    });
  }, []);
  console.log({ socialIdeas });

  //todo
  const [selectedIdea, setSelectedIdea] = useState([]);
  const [visible, setVisible] = useState(true);
  const handleIdeas = (element) => {
    const selected = socialIdeas[element];
    setSelectedIdea(selected);
    setVisible(!visible);
  };

  console.log(selectedIdea, 'selectedIdea');

  // todo : api for language
  const [languages, setLanguages] = useState([]);
  useEffect(async () => {
    let response;
    response = await getRequest('/user/language_list');

    if (response.status == 200) {
      console.log(response.data.Result);
      setLanguages(response.data.Result);
    }
  }, []);

  console.log({ languages }, 'languages');

  // todo textarea
  const [IdeasValue, setIdeasValue] = useState('');
  const [InitialIdeasValue, setInitialIdeasValue] = useState('');
  console.log(IdeasValue, 'IdeasValue');
  const [loading, setLoading] = useState(false);

  const handlePostIdeas = async () => {
    // setLoading(true);
    setInitialIdeasValue(IdeasValue);
    console.log('InitialIdeasValue!', InitialIdeasValue);
    const hostname = window.location.hostname;
    let response;

    const postData = { text: IdeasValue, action: 'string' };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/linkedin_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/twitter_post_streaming', postData);
    }
    console.log({ 'dgvklsdgdsklgvnsdklgndskgdns => ': response });
    if (response && response.status === 200) {
      const words = response.data.split(/\s+/).filter((word) => word.trim() !== '');
      const paragraph = words.join(' ');
      console.log(paragraph, ';;;;;;dsdhsdh');
      setIdeasValue(paragraph);
      // setIdeasValue(paragraph);
    }
    console.log(selectedIdea, 'selectedIdea');
    // setIdeasValue('');
  };
  // copy to clipboard
  // const [messageApi, contextHolder] = message.useMessage();
  // const success = () => {
  //   messageApi.open({
  //     type: 'success',
  //     content: 'Copied',
  //   });
  // };
  const copyToClipboard = () => {
    const textArea = document.querySelector('.textArea');

    if (textArea) {
      textArea.select();
      document.execCommand('copy');
    }
    // success();
  };

  // regenarate
  // const [newDivContent, setNewDivContent] = useState('');
  const [responses, setResponses] = useState([]);

  const handlePostIdeaRegenerate = async () => {
    setLoading(true);
    // setNewDivContent('');

    const hostname = window.location.hostname;
    let response;

    const postData = { text: InitialIdeasValue, action: 'string', language: 'english' };
    console.log(postData, 'postData');

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_twitter_post_streaming', postData);
    }

    console.log({ 'dgvklsdgdsklgvnsdklgndskgdns => ': response });
    if (response && response.status === 200) {
      console.log('skfsdj,gsdjkgdsjkgkjsdjk');
      const words = response.data.split(/\s+/).filter((word) => word.trim() !== '');
      // const words = response.detail[0].ctx.doc.split(/\s+/).filter((word) => word.trim() !== '');
      console.log(words, 'words');
      const paragraph = words.join(' ');
      console.log(paragraph, ';;;;;;dsdhsdh');
      setIdeasValue(paragraph);
      // todo 123
      const newDiv = (
        <div id="mainContentArea1" className="mb-[15px]">
          <div className="p-[8px] bg-blue-50 rounded-tl-md rounded-tr-md border border-slate-200  w-[-webkit-fill-available] justify-start items-start gap-2 inline-flex">
            <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">
              <img src={selectedIdea.image_link} />
            </div>
            <div className="text-[#8c90a5] text-[14px] font-medium font-['DM Sans']">{selectedIdea.name}</div>
          </div>
          {/* <div className="text-[#8c90a5] text-[14px] font-medium font-['DM Sans']">{selectedIdea.name}</div> */}
          <div className=" bg-white rounded-bl-md text-[#8C90A5] rounded-br-md border-l border-r border-b border-slate-200 p-[14px] h-[120px] flex flex-row gap-[14px]">
            <div className="flex flex-col justify-between w-[508px]">
              <div>
                {/* <p className="text-[#8C90A5]">{selectedIdea.placeholder}</p> */}
                <textarea
                  placeholder={`${selectedIdea.placeholder}`}
                  className="p-[1px] textArea resize-none"
                  style={{ width: '100%', boxShadow: 'none' }}
                  value={IdeasValue}
                  onChange={(e) => setIdeasValue(e.target.value)}
                />
              </div>
              <div className={`${IdeasValue === '' ? 'hidden' : 'block'} `}>
                <div className={`flex gap-[8px] mt-[16px]`}>
                  <div className="bg-[#1678F2] px-[10px] flex justify-center items-center  rounded-[4px] text-white w-[90px]">
                    Insert
                  </div>
                  <div
                    className="text-[#5F6583] px-[10px] flex justify-center items-center  rounded-[4px] border border-[#DFE4EC] w-[90px]"
                    onClick={copyToClipboard}
                  >
                    Copy
                  </div>
                  <div
                    className="text-[#5F6583] px-[10px] flex justify-center items-center  rounded-[4px] border border-[#DFE4EC]"
                    onClick={handlePostIdeaRegenerate}
                  >
                    {loading ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      // 'loading...'
                      'Regenerate'
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end pt-[2px] ">
              {/* <div className="w-[20px] h-[20px]" onClick={handleIdeasValues}>
                      <img className="" src={Send} />
                    </div> */}
              <div className="w-[20px] h-[20px] cursor-pointer " onClick={handlePostIdeas}>
                <img className="" src={Send} />
              </div>
              <div>
                {IdeasValue === '' ? (
                  <span className="text-[#8C90A5] text-[12px]">0/4000</span>
                ) : (
                  <div onClick={handleEmpty}>
                    <img className="w-[16px] cursor-pointer" src={Trash} />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* {newDivContent && <div>{newDivContent}</div>} */}
        </div>
      );
      setResponses([...responses, newDiv]);
      // setIdeasValue('');
      console.log(responses, 'responses');
      // setIdeasValue(paragraph);
    }
    setLoading(false);
  };
  // improve it
  const handlePostIdeaImprove = async () => {
    // setLoading(true);
    console.log('regenerated!');
    const hostname = window.location.hostname;
    let response;
    console.log(IdeasValue, 'IdeasValue');
    const postData = { text: IdeasValue, action: 'string', tone: 'Improve it', language: 'english' };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_twitter_post_streaming', postData);
    }

    if (response && response.status === 200) {
      const words = response.detail[0].ctx.doc.split(/\s+/).filter((word) => word.trim() !== '');
      console.log(words, 'words');
      const paragraph = words.join(' ');
      console.log(paragraph, ';;;;;;dsdhsdh');
      setIdeasValue(paragraph);
    }
  };

  const handlePostIdeaAddDetails = async () => {
    // setLoading(true);
    console.log('regenerated!');
    const hostname = window.location.hostname;
    let response;
    console.log(IdeasValue, 'IdeasValue');
    const postData = { text: IdeasValue, action: 'string', tone: 'Add Details', language: 'english' };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_twitter_post_streaming', postData);
    }

    if (response && response.status === 200) {
      const words = response.detail[0].ctx.doc.split(/\s+/).filter((word) => word.trim() !== '');
      console.log(words, 'words');
      const paragraph = words.join(' ');
      console.log(paragraph, ';;;;;;dsdhsdh');
      setIdeasValue(paragraph);
    }
  };

  const handlePostIdeaHumor = async () => {
    // setLoading(true);
    console.log('regenerated!');
    const hostname = window.location.hostname;
    let response;
    console.log(IdeasValue, 'IdeasValue');
    const postData = { text: IdeasValue, action: 'string', tone: 'Add Humor', language: 'english' };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_twitter_post_streaming', postData);
    }

    if (response && response.status === 200) {
      const words = response.detail[0].ctx.doc.split(/\s+/).filter((word) => word.trim() !== '');
      console.log(words, 'words');
      const paragraph = words.join(' ');
      console.log(paragraph, ';;;;;;dsdhsdh');
      setIdeasValue(paragraph);
    }
  };

  const handlePostIdeaInspire = async () => {
    // setLoading(true);
    console.log('regenerated!');
    const hostname = window.location.hostname;
    let response;
    console.log(IdeasValue, 'IdeasValue');
    const postData = { text: IdeasValue, action: 'string', tone: 'Inspire', language: 'english' };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_twitter_post_streaming', postData);
    }

    if (response && response.status === 200) {
      const words = response.detail[0].ctx.doc.split(/\s+/).filter((word) => word.trim() !== '');
      console.log(words, 'words');
      const paragraph = words.join(' ');
      console.log(paragraph, ';;;;;;dsdhsdh');
      setIdeasValue(paragraph);
    }
  };

  const handlePostIdeaShorten = async () => {
    // setLoading(true);
    console.log('regenerated!');
    const hostname = window.location.hostname;
    let response;
    console.log(IdeasValue, 'IdeasValue');
    const postData = { text: IdeasValue, action: 'string', tone: 'Shorten it', language: 'english' };

    if (hostname === 'www.linkedin.com') {
      response = await postRequest('/linkedin/regenrate_post_streaming', postData);
    } else if (hostname === 'www.facebook.com') {
      response = await postRequest('/facebook/regenrate_facebook_post_streaming', postData);
    } else if (hostname === 'twitter.com') {
      response = await postRequest('/twitter/regenrate_twitter_post_streaming', postData);
    }

    if (response && response.status === 200) {
      const words = response.detail[0].ctx.doc.split(/\s+/).filter((word) => word.trim() !== '');
      console.log(words, 'words');
      const paragraph = words.join(' ');
      console.log(paragraph, ';;;;;;dsdhsdh');
      setIdeasValue(paragraph);
    }
  };
  // empty

  const handleEmpty = () => {
    setIdeasValue('');
  };

  // todo : menu
  const [PopupMenu, setPopupMenu] = useState(false);
  console.log({ responses });
  return (
    <>
      <div
        style={{
          top: fromPosition.top,
          bottom: fromPosition.bottom,
          left: fromPosition.left,
          zIndex: '99999999',
        }}
        className={`${
          close ? 'hidden' : 'block'
        } rounded-[10px] bg-white fixed w-[600px] h-[365px] relative bg-white rounded-[10px] shadow border border-white overflow-hidden`}
        id="SocialPopup"
      >
        <div className="flex justify-between p-[12] pl-[16] pr-[16] border-b-[1px] border-b-slate-200">
          <div className="flex">
            <div>
              <img src={ResalaIconWithText} />
            </div>
            <div className="items-center flex ml-[0.5]">
              <div className="w-[34px] h-[17px] rounded-xl border border-blue-600 justify-center flex">
                <div className="text-blue-600 text-[10px] font-medium font-['DM Sans']">Beta</div>
              </div>
            </div>
          </div>
          <div className="flex gap-[8]">
            <div className="rounded-full justify-center items-center flex border border-slate-200 w-[24] h-[24]">
              <img className="w-[14] h-[14]" src={Setting} />
            </div>
            <div>
              <img className="rounded-full w-[24] h-[24]" src={Profile} />
            </div>
            <div onClick={handleClose} id="closeSocialBtn" className="cursor-pointer">
              <img className="rounded-full w-[24] h-[24]" src={Close} />
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
                <p className="text-[#5F6583] text-[12px]">English</p>
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
                {languages?.map((element, index) => (
                  <div
                    className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                    key={index}
                  >
                    <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">{element.language}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* profession */}
            <div
              className="p-[4px] pl-[8px] relative cursor-pointer w-[99px] bg-white rounded-[14px] border border-blue-600 justify-around items-center flex"
              onClick={() => handleprofession('Professional')}
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
                  onClick={() => handleprofession('Professional')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Professional</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage "
                  onClick={() => handleprofession('Casual')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Casual</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={() => handleprofession('Straight')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Straight</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={() => handleprofession('Confident')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Confident</div>
                </div>
                <div
                  className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage"
                  onClick={() => handleprofession('Friendly')}
                >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Friendly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[12px] px-[16px] " id="">
          <p className={`${!visible ? 'hidden' : 'block'} text-[#8C90A5] text-[14px] font-bold font-['DM Sans']`}>
            IDEAS FOR YOU
          </p>
          {/* todo textarea  */}
          {/* {contextHolder} */}

          <div className="flex gap-[8px] flex-wrap">
            {socialIdeas?.map((idea, index) => (
              <div key={index} onClick={() => handleIdeas(index)} className={`${!visible ? 'hidden' : 'block'}`}>
                <div className="p-[8px] bg-blue-50 rounded-md flex-col justify-start items-start gap-2.5 inline-flex  cursor-auto">
                  <div className="gap-[8px] justify-start items-start inline-flex">
                    <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">
                      <img src={idea.image_link} />
                    </div>
                    <div className="text-[#8c90a5] text-[14px] font-medium font-['DM Sans']">{idea.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!visible && (
            <>
              <div id="wholeAreaContent" className="relative">
                <div
                  className="flex gap-[8px] mb-[12px] justify-start items-center cursor-pointer"
                  onClick={() => {
                    setVisible(!visible);
                    setIdeasValue('');
                  }}
                >
                  <img className="w-[14] h-[14]" src={Left} />
                  <p className="text-[#19224C]">Back</p>
                </div>

                <div className="h-[160px] overflow-y-scroll ">
                  <div id="mainContentArea1" className="mb-[15px]">
                    <div className="p-[8px] bg-blue-50 rounded-tl-md rounded-tr-md border border-slate-200  w-[-webkit-fill-available] justify-start items-start gap-2 inline-flex">
                      <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">
                        <img src={selectedIdea.image_link} />
                      </div>
                      <div className="text-[#8c90a5] text-[14px] font-medium font-['DM Sans']">{selectedIdea.name}</div>
                    </div>
                    {/* <div className="text-[#8c90a5] text-[14px] font-medium font-['DM Sans']">{selectedIdea.name}</div> */}
                    <div className=" bg-white rounded-bl-md text-[#8C90A5] rounded-br-md border-l border-r border-b border-slate-200 p-[14px] h-[120px] flex flex-row gap-[14px]">
                      <div className="flex flex-col justify-between w-[508px]">
                        <div>
                          {/* <p className="text-[#8C90A5]">{selectedIdea.placeholder}</p> */}
                          <textarea
                            placeholder={`${selectedIdea.placeholder}`}
                            className="p-[1px] textArea resize-none"
                            style={{ width: '100%', boxShadow: 'none' }}
                            value={IdeasValue}
                            onChange={(e) => setIdeasValue(e.target.value)}
                          />
                        </div>
                        <div className={`${IdeasValue === '' ? 'hidden' : 'block'} `}>
                          <div className={`flex gap-[8px] mt-[16px]`}>
                            <div className="bg-[#1678F2] px-[10px] flex justify-center items-center  rounded-[4px] text-white w-[90px]">
                              Insert
                            </div>
                            <div
                              className="text-[#5F6583] px-[10px] flex justify-center items-center  rounded-[4px] border border-[#DFE4EC] w-[90px]"
                              onClick={copyToClipboard}
                            >
                              Copy
                            </div>
                            <div
                              className="text-[#5F6583] px-[10px] flex justify-center items-center  rounded-[4px] border border-[#DFE4EC]"
                              onClick={handlePostIdeaRegenerate}
                            >
                              {loading
                                ? // <Audio
                                  //   height="80"
                                  //   width="80"
                                  //   radius="9"
                                  //   color="green"
                                  //   ariaLabel="loading"
                                  //   wrapperStyle
                                  //   wrapperClass
                                  // />
                                  'loading...'
                                : 'Regenerate'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end pt-[2px] ">
                        {/* <div className="w-[20px] h-[20px]" onClick={handleIdeasValues}>
                      <img className="" src={Send} />
                    </div> */}
                        <div className="w-[20px] h-[20px] cursor-pointer " onClick={handlePostIdeas}>
                          <img className="" src={Send} />
                        </div>
                        <div>
                          {IdeasValue === '' ? (
                            <span className="text-[#8C90A5] text-[12px]">0/4000</span>
                          ) : (
                            <div onClick={handleEmpty}>
                              <img className="w-[16px] cursor-pointer" src={Trash} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* {newDivContent && <div>{newDivContent}</div>} */}
                  </div>
                  {/* <div id="mainContentArea" className="mb-[15px]">
                    <div className="p-[8px] bg-blue-50 rounded-tl-md rounded-tr-md border border-slate-200  w-[-webkit-fill-available] justify-start items-start gap-2 inline-flex">
                      <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">
                        <img src={selectedIdea.image_link} />
                      </div>
                      <div className="text-[#8c90a5] text-[14px] font-medium font-['DM Sans']">{selectedIdea.name}</div>
                    </div>

                    <div className=" bg-white rounded-bl-md text-[#8C90A5] rounded-br-md border-l border-r border-b border-slate-200 p-[14px] h-[120px] flex flex-row gap-[14px]">
                      <div className="flex flex-col justify-between w-[508px]">
                        <div>
                          <textarea
                            placeholder={`${selectedIdea.placeholder}`}
                            className="p-[1px] textArea resize-none"
                            style={{ width: '100%', boxShadow: 'none' }}
                            value={IdeasValue}
                            onChange={(e) => setIdeasValue(e.target.value)}
                          />
                        </div>
                        <div className={`${IdeasValue === '' ? 'hidden' : 'block'} `}>
                          <div className={`flex gap-[8px] mt-[16px]`}>
                            <div className="bg-[#1678F2] px-[10px] flex justify-center items-center  rounded-[4px] text-white w-[90px]">
                              Insert
                            </div>
                            <div
                              className="text-[#5F6583] px-[10px] flex justify-center items-center  rounded-[4px] border border-[#DFE4EC] w-[90px]"
                              onClick={copyToClipboard}
                            >
                              Copy
                            </div>
                            <div
                              className="text-[#5F6583] px-[10px] flex justify-center items-center  rounded-[4px] border border-[#DFE4EC]"
                              onClick={handlePostIdeaRegenerate}
                            >
                              {loading ? 'loading...' : 'Regenerate'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end pt-[2px] ">
                        <div className="w-[20px] h-[20px] cursor-pointer " onClick={handlePostIdeas}>
                          <img className="" src={Send} />
                        </div>
                        <div>
                          {IdeasValue === '' ? (
                            <span className="text-[#8C90A5] text-[12px]">0/4000</span>
                          ) : (
                            <div onClick={handleEmpty}>
                              <img className="w-[16px] cursor-pointer" src={Trash} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {responses?.map((divfd, index) => (
                    <div key={index}>{divfd}</div>
                  ))}
                </div>
                {/* {responses.map((response, index) => (
                  <div key={index}>
                    <p>{response}</p>
                  </div>
                ))} */}
                {/* todo button part   */}

                <div className="flex justify-end items-center gap-[8px] mt-[15px] absolute right-0 left-0 bg-white">
                  <div
                    className="h-[30px] px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex !cursor-pointer"
                    onClick={handlePostIdeaImprove}
                  >
                    <div className="text-white text-base font-medium font-['DM Sans']">✍️</div>
                    <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Improve it</div>
                  </div>
                  <div
                    className="h-[30px] px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] !cursor-pointer inline-flex"
                    onClick={handlePostIdeaAddDetails}
                  >
                    <div className="text-white text-base font-medium font-['DM Sans']">📝</div>
                    <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Add details</div>
                  </div>
                  <div
                    className="h-[30px] px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] !cursor-pointer inline-flex"
                    onClick={handlePostIdeaHumor}
                  >
                    <div className="text-white text-base font-medium font-['DM Sans']">😂</div>
                    <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Add humor</div>
                  </div>
                  <div
                    className="w-[12px] flex justify-center items-center cursor-pointer relative"
                    onClick={() => setPopupMenu(!PopupMenu)}
                  >
                    <img className="" src={Menu} />

                    {PopupMenu && (
                      <div
                        className="absolute top-[-163px] p-[8px] w-[221px] h-[150px] right-0 bg-[#fff] gap-[8px]"
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
                            className="px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer "
                            onClick={handlePostIdeaImprove}
                          >
                            <div className="text-white text-base font-medium font-['DM Sans']">✍️</div>
                            <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Improve it</div>
                          </div>

                          <div
                            className="px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer"
                            onClick={handlePostIdeaAddDetails}
                          >
                            <div className="text-white text-base font-medium font-['DM Sans']">📝</div>
                            <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Add Details</div>
                          </div>

                          <div
                            className="px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer"
                            onClick={handlePostIdeaHumor}
                          >
                            <div className="text-white text-base font-medium font-['DM Sans']">😂</div>
                            <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Add humor</div>
                          </div>

                          <div
                            className="px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex cursor-pointer"
                            onClick={handlePostIdeaInspire}
                          >
                            <div className="text-white text-base font-medium font-['DM Sans']">💡</div>
                            <div className="text-[#5F6583] text-[12px] font-medium font-['DM Sans']">Inspire</div>
                          </div>

                          <div
                            className="px-[8px] py-[6px] bg-white rounded border border-slate-200 justify-start items-center gap-[6px] inline-flex"
                            onClick={handlePostIdeaShorten}
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
            </>
          )}

          {/* <div className="flex gap-[8px] flex-wrap">
            <div>
              <div className="p-[8px] bg-blue-50 rounded-md flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="gap-[8px] justify-start items-start gap-2 inline-flex items-center">
                  <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">👋</div>
                  <div className="text-[#8C90A5] text-[14px] font-medium font-['DM Sans']">
                    Write a personal introduction
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p-[8px] bg-blue-50 rounded-md flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="gap-[8px] justify-start items-start gap-2 inline-flex items-center">
                  <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">📱</div>
                  <div className="text-[#8C90A5] text-[14px] font-medium font-['DM Sans']">
                    Write a social media post
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p-[8px] bg-blue-50 rounded-md flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="gap-[8px] justify-start items-start gap-2 inline-flex items-center">
                  <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">💼</div>
                  <div className="text-[#8C90A5] text-[14px] font-medium font-['DM Sans']">Job posting</div>
                </div>
              </div>
            </div>
            <div>
              <div className="p-[8px] bg-blue-50 rounded-md flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="gap-[8px] justify-start items-start gap-2 inline-flex items-center">
                  <div className="text-white text-base font-medium font-['DM Sans'] w-[16px] h-[16px]">💼</div>
                  <div className="text-[#8C90A5] text-[14px] font-medium font-['DM Sans']">Job posting</div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className={`${!visible ? 'hidden' : 'block'} p-[16px] absolute bottom-[0px] flex border border-white`}>
          <div className="w-[565px] p-[14px] pb-[0px] flex border-[1px] border-slate-200 rounded-[6px] gap-[8px]">
            <div
              className="rounded-full w-[24px] h-[24px] background-[#fff] flex justify-center items-center"
              style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }}
            >
              <img className="w-[16px] h-[16px]" src={Mic} />
            </div>
            <div className="min-w-[444px] min-h-[86px] text-[#8C90A5] text-[14px] font-normal font-['Arial']">
              <textarea
                placeholder="Tell me what to write for you"
                className="p-[1px] textArea resize-none"
                style={{ width: '100%', height: '100%', boxShadow: 'none' }}
              />
            </div>
            <div className="flex flex-col justify-between items-end pt-[2px] pb-[10px]">
              <div className="w-[20px] h-[20px]">
                <img className="" src={Send} />
              </div>
              <div>
                <span className="text-[#8C90A5] text-[12px]">0/4000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
