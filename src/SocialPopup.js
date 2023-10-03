import React, { useEffect, useState } from 'react';
import './Social.css';
import Logo from './utils/Social/Risala.ai - LOGO - 13.png';
import Beg from './utils/Social/beta.png';
import Setting from './utils/Social/solar_settings-broken.png';
import Profile from './utils/Social/Ellipse 31.png';
import Close from './utils/Social/close-circle.png';
import Arrow from './utils/Social/arrow-down.png';
import Mic from './utils/Social/microphone2.png';
import Send from './utils/Social/send.png';
import Bag from './utils/Social/bag.png';
import Hand from './utils/Social/hand.png';
import Mobile from './utils/Social/mobile.png';
import Left from './utils/Social/arrow-left.png';
import ResalaIconWithText from './utils/Youtube/ResalaIconWithText.svg';

function SocialPopup({ fromPosition }) {
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
  useEffect(() => {
    let setLogoSocial = document.getElementById('setLogoSocial');
    if (!setLogoSocial) return;
    setLogoSocial.addEventListener('click', function () {
      let SocialPopup = document.getElementById('SocialPopup');
      console.log('clicked!', SocialPopup);
      const FormPosition = document.getElementsByClassName('xt7dq6l')[2].getBoundingClientRect();
      console.log('FormPosition', FormPosition);
      if (FormPosition) {
        console.log('FormPosition', FormPosition);
        setFromPosition({
          bottom: FormPosition.bottom - 275,
          left: FormPosition.left + 250,
        });
        // SocialPopup.style.top = FormPosition.top;
        // SocialPopup.style.left = FormPosition.left;
      }
    });
  }, []);

  console.log('fromPosition', fromPosition);

  //
  const [language, setLanguage] = useState(false);
  const handleLanguage = () => {
    setLanguage(!language);
    setProfession(false);
  };
  const [profession, setProfession] = useState(false);
  const handleprofession = () => {
    setProfession(!profession);
    setLanguage(false);
  };

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
  };

  // close
  const [close, setClose] = useState(true);

  const handleClose = () => {
    setClose(!close);
  };
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
            <div onClick={handleClose} id='closeSocialBtn'>
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
                } w-[121px] bg-white rounded-lg shadow flex-col justify-start items-start gap-[8px] inline-flex absolute top-[30px] right-0 p-[8px] pt-[10] pb-[10px]` }
                style={{zIndex:"99999999", boxShadow: '0px 2px 20px 0px rgba(0, 0, 0, 0.15)'}}
              >
                <div className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage" >
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">English</div>
                </div>
                <div className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage">
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Arabic</div>
                </div>
                <div className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage">
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Hindi</div>
                </div>
                <div className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage">
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Guajarati</div>
                </div>
                <div className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage">
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Thai</div>
                </div>
              </div>
              {/* drop down */}
            </div>
            <div
              className="p-[4px] pl-[8px] relative cursor-pointer w-[99px] bg-white rounded-[14px] border border-blue-600 justify-around items-center flex"
              onClick={handleprofession}
            >
              <div className="text-indigo-950 text-xs font-medium font-['DM Sans']">
                <p className="text-[#5F6583] text-[12px]">Professional</p>
              </div>
              <div className="">
                <img className="w-[14] h-[14]" src={Arrow} />
              </div>
              {/* drop down */}
              {/* <div
                className={`${
                  profession ? 'block' : 'hidden'
                } w-[121px] h-[182px] px-2 py-2.5 bg-white rounded-lg shadow-md border-4 border-white flex-col justify-start items-start gap-2 inline-flex absolute bottom-[-185px] right-0 `} style={{zIndex:"9999"}}
              >
                <div className="pl-2 py-1 bg-gray-100 rounded-md justify-center items-center gap-2 inline-flex hover:bg-[#F3F4F8]">
                  <div className="w-[97px] text-[#8C90A5] text-sm font-normal font-['DM Sans']">Professional</div>
                </div>
                <div className="pl-2 py-1 bg-white rounded-md justify-center items-center gap-2 inline-flex hover:bg-[#F3F4F8]">
                  <div className="w-[97px] text-[#8C90A5] text-sm font-normal font-['DM Sans']">Casual</div>
                </div>
                <div className="pl-2 py-1 bg-white rounded-md justify-center items-center gap-2 inline-flex hover:bg-[#F3F4F8]">
                  <div className="w-[97px] text-[#8C90A5] text-sm font-normal font-['DM Sans']">Straight</div>
                </div>
                <div className="pl-2 py-1 bg-white rounded-md justify-center items-center gap-2 inline-flex hover:bg-[#F3F4F8]">
                  <div className="w-[97px] text-[#8C90A5] text-sm font-normal font-['DM Sans']">Confident</div>
                </div>
                <div className="pl-2 py-1 bg-white rounded-md justify-center items-center gap-2 inline-flex hover:bg-[#F3F4F8]">
                  <div className="w-[97px] text-[#8C90A5] text-sm font-normal font-['DM Sans']">Friendly</div>
                </div>
              </div> */}

              <div
                className={`${
                  profession ? 'block' : 'hidden'
                } w-[121px] bg-white rounded-lg shadow flex-col justify-start items-start gap-[8px] inline-flex absolute top-[30px] right-0 p-[8px] pt-[10] pb-[10px]` }
                style={{zIndex:"99999999", boxShadow: '0px 2px 20px 0px rgba(0, 0, 0, 0.15)'}}
              >
                <div className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage">
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Professional</div>
                </div>
                <div className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage ">
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Casual</div>
                </div>
                <div className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage">
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Straight</div>
                </div>
                <div className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage">
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Confident</div>
                </div>
                <div className="pt-[4px] pl-[8px] pb-[4px] bg-white rounded-md justify-center items-center inline-flex hoverLanguage">
                  <div className="w-[97px] text-[#8C90A5] text-[14px] font-['DM Sans']">Friendly</div>
                </div>
              </div>
              {/* drop down */}
            </div>
          </div>
        </div>
        <div className="p-[16px]">
          <p className="text-[#8C90A5] text-[14px] font-bold font-['DM Sans']"> IDEAS FOR YOU</p>
          <div className="flex gap-[8px] flex-wrap">
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
          </div>
        </div>
        <div className="p-[16px] absolute bottom-[0px] flex border border-white">
          <div className='w-[565px] p-[14px] pb-[0px] flex border-[1px] border-slate-200 rounded-[6px] gap-[8px]'>
            <div className="rounded-full w-[24px] h-[24px] background-[#fff] flex justify-center items-center" style={{boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)'}}>
              <img className="w-[16px] h-[16px]" src={Mic} />
            </div>
            <div className="min-w-[444px] min-h-[86px] text-[#8C90A5] text-[14px] font-normal font-['Arial']">
              <textarea
                placeholder="Tell me what to write for you"
                className="p-[1px] textArea resize-none"
                style={{ width: '100%', height: '100%' ,boxShadow: 'none'}}
              />
            </div>
            <div className="flex flex-col justify-between items-end pt-[2px] pb-[10px]">
              <div className='w-[20px] h-[20px]'>
                <img className="" src={Send} />
              </div>
              <div>
                <span className='text-[#8C90A5] text-[12px]'>
                  0/4000
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SocialPopup;
