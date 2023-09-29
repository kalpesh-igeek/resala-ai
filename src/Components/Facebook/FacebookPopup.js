import React, { useEffect, useState } from 'react';
import './Facebook.css';
import Logo from '../../utils/Facebook/Risala.ai - LOGO - 13.png';
import Beg from '../../utils/Facebook/beta.png';
import Setting from '../../utils/Facebook/solar_settings-broken.png';
import Profile from '../../utils/Facebook/Ellipse 31.png';
import Close from '../../utils/Facebook/close-circle.png';
import Arrow from '../../utils/Facebook/arrow-down.png';
import Mic from '../../utils/Facebook/microphone2.png';
import Send from '../../utils/Facebook/send.png';
import Bag from '../../utils/Facebook/bag.png';
import Hand from '../../utils/Facebook/hand.png';
import Mobile from '../../utils/Facebook/mobile.png';
import Left from '../../utils/Facebook/arrow-left.png';

function FacebookPopup() {
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
  const [fromPosition, setFromPosition] = useState({
    bottom: 0,
    left: 0,
  });
  useEffect(() => {
    let setLogoFacebook = document.getElementById('setLogoFacebook');
    if (!setLogoFacebook) return;
    setLogoFacebook.addEventListener('click', function () {
      let logoFacebook12 = document.getElementById('logoFacebook12');
      console.log('clicked!', logoFacebook12);
      const FormPosition = document.getElementsByClassName('xt7dq6l')[2].getBoundingClientRect();
      console.log('FormPosition', FormPosition);
      if (FormPosition) {
        console.log('FormPosition', FormPosition);
        setFromPosition({
          bottom: FormPosition.bottom - 275,
          left: FormPosition.left + 250,
        });
        // logoFacebook12.style.top = FormPosition.top;
        // logoFacebook12.style.left = FormPosition.left;
      }
    });
  }, []);

  console.log('fromPosition', fromPosition);

  //
  const [language, setLanguage] = useState(false);
  const handleLanguage = () => {
    setLanguage(!language);
  };
  const [profession, setProfession] = useState(false);
  const handleprofession = () => {
    setProfession(!profession);
  };

  //
  const [ideas, setIdeas] = useState(false);
  const handleIdeas = () => {
    setIdeas(!ideas);
  };

  //
  const [showButton1Content, setShowButton1Content] = useState(true);
  const [showButton2Content, setShowButton2Content] = useState(true);
  const [showButton3Content, setShowButton3Content] = useState(true);

  // Function to toggle the visibility of content for each button
  const toggleContent = (buttonNumber) => {
    switch (buttonNumber) {
      case 1:
        setShowButton1Content(!showButton1Content);
        break;
      case 2:
        setShowButton2Content(!showButton2Content);
        break;
      case 3:
        setShowButton3Content(!showButton3Content);
        break;
      default:
        break;
    }
  };

  //
  const handleBack = () => {
    setIdeas(!ideas);
  };

  // close
  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(!close);
  };
  return (
    <>
      <div
        style={{
          bottom: fromPosition.bottom,
          left: fromPosition.left,
          zIndex: '99999999 !important',
        }}
        className={` ${close ? 'hidden' : 'block'} rounded-[10px] bg-white fixed`}
        id="logoFacebook12"
      >
        <div className="w-[600px] h-[365px] relative bg-white rounded-[10px] shadow border border-white overflow-hidden">
          <div className="w-[600px] h-[365px] left-0 top-0 absolute bg-white rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] border border-slate-200 overflow-hidden" />
          {/* todo1 */}
          <div className={` w-[568px] h-[100px] left-[16px] top-[249px] absolute rounded-md border border-slate-200`}>
            <div className="left-[519px] top-[0px] absolute text-right text-slate-300 text-xs font-normal font-['Arial'] py-[10px] px-[2px] flex flex-col justify-between items-center h-[inherit] leading-none">
              <img className="w-5 h-5 relative" src={Send} />
              0/4000
            </div>
            <div className="w-5 h-5 left-[536px] top-[12px] absolute justify-center items-center inline-flex">
              <div className="w-5 h-5 relative"></div>
            </div>
            <div className="w-[457px] h-[86px] left-[42px] top-[5px] absolute text-gray-400 text-sm font-normal font-['Arial']">
              <textarea
                placeholder="Tell me what to write for you"
                className="p-2 textArea"
                style={{ width: 'inherit', height: 'inherit' }}
              />
            </div>
            <div className="w-6 h-6 left-[10px] top-[10px] absolute">
              {/* 
              <div className="w-6 h-6 left-0 top-0 absolute bg-white rounded-full shadow"></div>
              <div className="w-4 h-4 left-[4px] top-[4px] absolute"></div> */}
            </div>
            <div className="w-6 h-6 left-[10px] top-[10px] absolute rounded-full shadow flex justify-center items-center">
              {/* <div className="w-6 h-6 left-0 top-0 absolute bg-white rounded-full shadow" />
              <div className="w-4 h-4 left-[4px] top-[4px] absolute" /> */}
              <img className="" src={Mic} />
            </div>
          </div>
          <div className="w-[600px] h-12 px-4 py-3 left-0 top-0 absolute bg-white border-b border-slate-200 justify-center items-start gap-[353px] inline-flex">
            <div className="justify-start items-center gap-1 inline-flex">
              <div className="w-[81px] h-6 relative">
                <img className="w-6 h-6 rounded-full" src={Logo} />

                {/* <div className="w-6 h-6 left-0 top-0 absolute bg-blue-600 rounded-full" /> */}
                <div className="left-[32px] top-[4px] absolute text-zinc-500 text-sm font-semibold font-['Poppins'] leading-none">
                  Resala
                </div>
                <div className="w-6 h-6 left-0 top-0 absolute">
                  <div className="w-6 h-6 left-0 top-0 absolute">
                    <div className="w-[14.73px] h-[16.20px] left-[4.64px] top-[2.92px] absolute">
                      <div className="w-[2.44px] h-[1.62px] left-[6.79px] top-[9.47px] absolute"></div>
                      <div className="w-[6.32px] h-[10.70px] left-[-0px] top-[5.50px] absolute"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-1.5 py-0.5 rounded-xl border border-blue-600 justify-start items-center gap-2.5 flex">
                <div className="text-blue-600 text-[10px] font-medium font-['DM Sans']">Beta</div>
              </div>
            </div>
            <div className="justify-end items-center gap-2 inline-flex">
              <div className="w-6 h-6 relative " style={{ marginLeft: '-22px' }}>
                <div className="w-6 h-6 left-0 top-0 absolute bg-white rounded-full border border-slate-200" />
                <div className="w-[14.12px] h-[14.12px] left-[4.94px] top-[4.94px] absolute">
                  <div className="w-[11.09px] h-[11.76px] left-[1.51px] top-[1.18px] absolute">
                    <img className="" src={Setting} />
                  </div>
                </div>
              </div>
              <img className="w-6 h-6 rounded-full ms-4" src={Profile} />
              <div className="w-[22px] h-[0px] origin-top-left rotate-90 mb-[18px] border border-slate-200"></div>
              <div className="w-6 h-6 relative" onClick={handleClose}>
                <div className="w-6 h-6 left-0 top-0 absolute">
                  <img className="" src={Close} />
                </div>
              </div>
            </div>
          </div>
          <div className={`w-[568px] left-[16px] top-[127px] absolute justify-start items-start gap-2 inline-flex`}>
            <div
              className="p-2 bg-blue-50 rounded-md flex-col justify-start items-start gap-2.5 inline-flex hover:bg-[#D9EBFF] "
              onClick={() => toggleContent(1)}
            >
              {/* todo1 */}
              <div className={` justify-start items-start gap-2 inline-flex `}>
                <div className="text-white text-base font-medium font-['DM Sans']">👋</div>
                <div className="text-[#5F6582] text-sm font-medium font-['DM Sans']">Write a personal introduction</div>
              </div>
            </div>
            {!showButton1Content && (
              <div className={` w-[568px] h-[205px] relative`}>
                <div>
                  <div className="flex justify-start items-center gap-2" onClick={handleBack}>
                    <img className="w-6 h-6 rounded-full" src={Left} />
                    <div className="text-indigo-950 text-sm font-medium font-['DM Sans'] leading-none">Back</div>
                  </div>
                  <div className="w-[568px] h-[172px] left-0 top-[33px] absolute bg-white rounded-bl-md rounded-br-md border-l border-r border-b border-slate-200">
                    <div className="w-[508px] left-[14px] top-[14px] absolute text-gray-400 text-sm font-normal font-['DM Sans'] leading-[18px]">
                      What is your name?
                    </div>
                    <div className="w-[449px] left-[14px] top-[38px] absolute text-gray-400 text-sm font-normal font-['DM Sans'] leading-[18px]">
                      Consider including:
                    </div>
                    <div className="w-[449px] left-[14px] top-[62px] absolute text-gray-400 text-sm font-normal font-['DM Sans'] leading-[18px]">
                      Brief personal background
                    </div>
                    <div className="w-[449px] left-[14px] top-[86px] absolute text-gray-400 text-sm font-normal font-['DM Sans'] leading-[18px]">
                      hobbies and interest
                    </div>
                    <div className="left-[521px] top-[146px] absolute text-right text-slate-300 text-xs font-normal font-['Arial'] leading-none">
                      0/4000
                    </div>
                    <div className="w-5 h-5 left-[538px] top-[13px] absolute justify-center items-center inline-flex">
                      <div className="w-5 h-5 relative"></div>
                    </div>
                  </div>
                  <div className="h-[34px] p-2 left-0 top-0 absolute bg-blue-50 rounded-tl-md rounded-tr-md border border-slate-200 flex-col justify-start items-start gap-2.5 inline-flex">
                    <div className="justify-start items-start gap-2 inline-flex">
                      <div className="text-white text-base font-medium font-['DM Sans']">👋</div>
                      <div className="text-indigo-950 text-sm font-medium font-['DM Sans']">
                        Write a personal introduction
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 

<div className="justify-start items-start gap-2 inline-flex">
<div className="w-[90px] h-[30px] px-2.5 bg-blue-600 rounded border justify-center items-center gap-2 flex">
<div className="pl-[11.50px] pr-[10.50px] py-px justify-center items-center flex">
<div className="text-center text-white text-xs font-medium font-['DM Sans']">Insert</div>
</div>
</div>
<div className="w-[90px] h-[30px] px-2.5 bg-white rounded border border-slate-200 justify-center items-center gap-2 flex">
<div className="text-center text-gray-500 text-xs font-medium font-['DM Sans']">Copy</div>
</div>
<div className="w-[90px] h-[30px] px-2.5 bg-white rounded border border-slate-200 justify-center items-center gap-2 flex">
<div className="text-center text-gray-500 text-xs font-medium font-['DM Sans']">Regenerate</div>
</div>
</div>

*/}

            <div
              className="p-2 bg-blue-50 rounded-md flex-col justify-start items-start gap-2.5 inline-flex hover:bg-[#D9EBFF]"
              onClick={() => toggleContent(2)}
            >
              {/* todo1 */}
              <div className="justify-start items-start gap-2 inline-flex">
                <div className="text-white text-base font-medium font-['DM Sans']">💼</div>
                <div className="text-[#5F6582]text-sm font-medium font-['DM Sans']">Job posting</div>
              </div>
            </div>

            {/*  */}
            {showButton2Content && (
              <div className={` w-[568px] h-[205px] relative`}>
                <div>
                  <div className="flex justify-start items-center gap-2" onClick={handleBack}>
                    <img className="w-6 h-6 rounded-full" src={Left} />
                    <div className="text-indigo-950 text-sm font-medium font-['DM Sans'] leading-none">Back</div>
                  </div>
                  <div className="w-[568px] h-[172px] left-0 top-[33px] absolute bg-white rounded-bl-md rounded-br-md border-l border-r border-b border-slate-200">
                    {/* <div className="w-[508px] left-[14px] top-[14px] absolute text-gray-400 text-sm font-normal font-['DM Sans'] leading-[18px]">
                      What is your name?
                    </div>
                    <div className="w-[449px] left-[14px] top-[38px] absolute text-gray-400 text-sm font-normal font-['DM Sans'] leading-[18px]">
                      Consider including:
                    </div>
                    <div className="w-[449px] left-[14px] top-[62px] absolute text-gray-400 text-sm font-normal font-['DM Sans'] leading-[18px]">
                      Brief personal background
                    </div>
                    <div className="w-[449px] left-[14px] top-[86px] absolute text-gray-400 text-sm font-normal font-['DM Sans'] leading-[18px]">
                      hobbies and interest
                    </div>

                    
                    <div className="left-[521px] top-[146px] absolute text-right text-slate-300 text-xs font-normal font-['Arial'] leading-none">
                      0/4000
                    </div>  */}
                    <div
                      className={` w-[568px] h-[100px] left-[16px] top-[249px] absolute rounded-md border border-slate-200`}
                    >
                      <div className="left-[519px] top-[0px] absolute text-right text-slate-300 text-xs font-normal font-['Arial'] py-[10px] px-[2px] flex flex-col justify-between items-center h-[inherit] leading-none">
                        <img className="w-5 h-5 relative" src={Send} />
                        0/4000
                      </div>
                      <div className="w-5 h-5 left-[536px] top-[12px] absolute justify-center items-center inline-flex">
                        <div className="w-5 h-5 relative"></div>
                      </div>
                      <div className="w-[457px] h-[86px] left-[42px] top-[5px] absolute text-gray-400 text-sm font-normal font-['Arial']">
                        <textarea
                          placeholder="Tell me what to write for you"
                          className="p-2 textArea"
                          style={{ width: 'inherit', height: 'inherit' }}
                        />
                      </div>
                      <div className="w-6 h-6 left-[10px] top-[10px] absolute">
                        {/* 
              <div className="w-6 h-6 left-0 top-0 absolute bg-white rounded-full shadow"></div>
              <div className="w-4 h-4 left-[4px] top-[4px] absolute"></div> */}
                      </div>
                      <div className="w-6 h-6 left-[10px] top-[10px] absolute rounded-full shadow flex justify-center items-center">
                        {/* <div className="w-6 h-6 left-0 top-0 absolute bg-white rounded-full shadow" />
              <div className="w-4 h-4 left-[4px] top-[4px] absolute" /> */}
                        <img className="" src={Mic} />
                      </div>
                    </div>
                    <div className="w-5 h-5 left-[538px] top-[13px] absolute justify-center items-center inline-flex">
                      <div className="w-5 h-5 relative"></div>
                    </div>
                  </div>
                  <div className="h-[34px] p-2 left-0 top-0 absolute bg-blue-50 rounded-tl-md rounded-tr-md border border-slate-200 flex-col justify-start items-start gap-2.5 inline-flex">
                    <div className="justify-start items-start gap-2 inline-flex">
                      <div className="text-white text-base font-medium font-['DM Sans']">💼</div>
                      <div className="text-[#5F6582]text-sm font-medium font-['DM Sans']">Job posting</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div
              className="p-2 bg-blue-50 rounded-md flex-col justify-start items-start gap-2.5 inline-flex hover:bg-[#D9EBFF]"
              onClick={() => toggleContent(3)}
            >
              {/* todo1 */}
              <div className="justify-start items-start gap-2 inline-flex">
                <div className="text-white text-base font-medium font-['DM Sans']">📱</div>
                <div className="text-[#5F6582]text-sm font-medium font-['DM Sans']">Write a social media post</div>
              </div>
            </div>
            {showButton3Content && (
              <div className={` w-[568px] h-[205px] relative`}>
                <div>
                  <div className="flex justify-start items-center gap-2" onClick={handleBack}>
                    <img className="w-6 h-6 rounded-full" src={Left} />
                    <div className="text-indigo-950 text-sm font-medium font-['DM Sans'] leading-none">Back</div>
                  </div>
                  <div className="w-[568px] h-[172px] left-0 top-[33px] absolute bg-white rounded-bl-md rounded-br-md border-l border-r border-b border-slate-200">
                    <div className="w-[508px] left-[14px] top-[14px] absolute text-gray-400 text-sm font-normal font-['DM Sans'] leading-[18px]">
                      What is your name?
                    </div>
                    <div className="w-[449px] left-[14px] top-[38px] absolute text-gray-400 text-sm font-normal font-['DM Sans'] leading-[18px]">
                      Consider including:
                    </div>
                    <div className="w-[449px] left-[14px] top-[62px] absolute text-gray-400 text-sm font-normal font-['DM Sans'] leading-[18px]">
                      Brief personal background
                    </div>
                    <div className="w-[449px] left-[14px] top-[86px] absolute text-gray-400 text-sm font-normal font-['DM Sans'] leading-[18px]">
                      hobbies and interest
                    </div>
                    <div className="left-[521px] top-[146px] absolute text-right text-slate-300 text-xs font-normal font-['Arial'] leading-none">
                      0/4000
                    </div>
                    <div className="w-5 h-5 left-[538px] top-[13px] absolute justify-center items-center inline-flex">
                      <div className="w-5 h-5 relative"></div>
                    </div>
                  </div>
                  <div className="h-[34px] p-2 left-0 top-0 absolute bg-blue-50 rounded-tl-md rounded-tr-md border border-slate-200 flex-col justify-start items-start gap-2.5 inline-flex">
                    <div className="justify-start items-start gap-2 inline-flex">
                      <div className="text-white text-base font-medium font-['DM Sans']">📱</div>
                      <div className="text-[#5F6582]text-sm font-medium font-['DM Sans']">
                        Write a social media post
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className={`left-[16px] top-[108px] absolute text-[#8C90A5] text-xs font-bold font-['DM Sans'] uppercase" `}
          >
            Ideas for you
          </div>
          <div className="px-4 py-3 left-0 top-[48px] absolute bg-white shadow justify-start items-center gap-[317px] inline-flex">
            <div className="text-indigo-950 text-base font-medium font-['DM Sans']">Compose</div>
            <div className="justify-start items-start gap-2 flex">
              <div className="w-[70px] h-6 pl-2 pr-1 py-1 bg-white rounded-[14px] border border-blue-600 justify-start items-center gap-1 flex relative">
                <div className="text-indigo-950 text-xs font-medium font-['DM Sans'] " onClick={handleLanguage}>
                  <p className="text-[#5F6583]">English</p>
                </div>
                <div className="w-3.5 h-3.5 justify-center items-center flex">
                  <div className="w-3.5 h-3.5 relative">
                    <img className="" src={Arrow} />
                  </div>
                </div>
                {/* drop down */}
                <div
                  className={`${
                    language ? 'block' : 'hidden'
                  }   w-[121px] h-[182px] px-2 py-3 bg-white rounded-lg shadow border-4 border-white flex-col justify-start items-start gap-2 inline-flex absolute bottom-[-185px] right-0`}
                >
                  <div className="pl-2 py-1 bg-gray-100 rounded-md justify-center items-center gap-2 inline-flex hover:bg-[#F3F4F8]">
                    <div className="w-[97px] text-[#8C90A5] text-sm font-normal font-['DM Sans']">English</div>
                  </div>
                  <div className="pl-2 py-1 bg-white rounded-md justify-center items-center gap-2 inline-flex hover:bg-[#F3F4F8]">
                    <div className="w-[97px] text-[#8C90A5] text-sm font-normal font-['DM Sans']">Arabic</div>
                  </div>
                  <div className="pl-2 py-1 bg-white rounded-md justify-center items-center gap-2 inline-flex hover:bg-[#F3F4F8]">
                    <div className="w-[97px] text-[#8C90A5] text-sm font-normal font-['DM Sans']">Hindi</div>
                  </div>
                  <div className="pl-2 py-1 bg-white rounded-md justify-center items-center gap-2 inline-flex hover:bg-[#F3F4F8]">
                    <div className="w-[97px] text-[#8C90A5] text-sm font-normal font-['DM Sans']">Guajarati</div>
                  </div>
                  <div className="pl-2 py-1 bg-white rounded-md justify-center items-center gap-2 inline-flex hover:bg-[#F3F4F8]">
                    <div className="w-[97px] text-[#8C90A5] text-sm font-normal font-['DM Sans']">Thai</div>
                  </div>
                </div>
                {/* drop down */}
              </div>

              <div
                className="w-[99px] h-6 pl-2 pr-1 py-1 bg-white rounded-[14px] border border-blue-600 justify-start items-center gap-1 flex"
                onClick={handleprofession}
              >
                <div className=" text-xs font-medium font-['DM Sans']">
                  <p className="text-[#5F6583]">Professional</p>
                </div>
                <div className="w-3.5 h-3.5 justify-center items-center flex">
                  <div className="w-3.5 h-3.5 relative">
                    <img className="" src={Arrow} />
                  </div>
                </div>
                {/* drop down */}
                <div
                  className={`${
                    profession ? 'block' : 'hidden'
                  } w-[121px] h-[182px] px-2 py-2.5 bg-white rounded-lg shadow-md border-4 border-white flex-col justify-start items-start gap-2 inline-flex absolute bottom-[-185px] right-0`}
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
                </div>
                {/* drop down */}
              </div>
            </div>
          </div>
        </div>

        {/* compose part */}
        {/* <div className="grid grid-cols-4 text-[#19224C]">
          <div className="col-span-2">
            <p className=" text-[16px]">Compose</p>
          </div>
          <div className="col-span-2 grid place-items-end">
            <div className="border-[#1678F2] rounded-[14px] flex gap-2 relative">
              
              <p className="text-[#19224C] text-[12px]">English</p>
              <img src={Arrow} alt="" className="w-[24px]" />

              <div className=" w-[121px] h-[182px] rounded-[8px] shadow-md absolute bottom-0 right-0 gap-y-4 overflow-y-scroll scrollbarFace py-[10px] px-[8px]">
                <p className="text-[14px] text-[#8C90A5] rounded-md px-[8px] py-[4px] hover:text-[#19224C] hover:bg-[#F3F4F8] ">
                  English
                </p>
                <p className="text-[14px] text-[#8C90A5] rounded-md px-[8px] py-[4px] hover:text-[#19224C] hover:bg-[#F3F4F8] ">
                  Arabic
                </p>
                <p className="text-[14px] text-[#8C90A5] rounded-md px-[8px] py-[4px] hover:text-[#19224C] hover:bg-[#F3F4F8] ">
                  Hindi
                </p>
                <p className="text-[14px] text-[#8C90A5] rounded-md px-[8px] py-[4px] hover:text-[#19224C] hover:bg-[#F3F4F8] ">
                  Gujarati
                </p>
                <p className="text-[14px] text-[#8C90A5] rounded-md px-[8px] py-[4px] hover:text-[#19224C] hover:bg-[#F3F4F8] ">
                  Thai
                </p>
              </div>
            </div>

            <div className="border-[#1678F2] rounded-[14px]">
              <select>
                <option>
                  Professional
                  <img src={Arrow} alt="" className="w-[24px]" />
                </option>
                <option>
                  Developer
                  <img src={Arrow} alt="" className="w-[24px]" />
                </option>
              </select>
            </div>
          </div>
        </div> */}

        {/* chat area */}

        {/* <div>
          <div className={`${Ideas ? 'none' : 'block'}`}>
            <div>
              <p className="text-[12px] text-[#8C90A5]">IDEAS FOR YOU</p>
            </div>
            <div className="grid grid-cols-2 gap-4 gap-y-4">
              <div
                className="bg-[#EEF6FF] rounded-md "
                onClick={() => {
                  setIdeas(false);
                  setIntro(true);
                }}
              >
                <img src={Hand} alt="" className="w-[24px]" />
                <p className="text-[#5F6583] text-[14px]">Write a personal introduction</p>
              </div>

              <div
                className="bg-[#EEF6FF] rounded-md"
                onClick={() => {
                  setIdeas(false);
                  setMobile(true);
                }}
              >
                <img src={Mobile} alt="" className="w-[24px]" />
                <p className="text-[#5F6583] text-[14px]">Write a social media post</p>
              </div>

              <div
                className="bg-[#EEF6FF] rounded-md"
                onClick={() => {
                  setIdeas(false);
                  setBag(true);
                }}
              >
                <img src={Bag} alt="" className="w-[24px]" />
                <p className="text-[#5F6583] text-[14px]">Job posting</p>
              </div>
            </div>
          </div>

          {Intro1 ? (
            <>
            </>
          ) : Mobile1 ? (
            ''
          ) : (
            ''
          )}
        </div> */}

        {/* input area */}
        {/* <div className="border-[1px] border-[#DFE4EC] rounded-md h-[100px] overflow-y-scroll scrollbarFace ">
          <div className="w-[24px] h-[24px] rounded-full shadow-md flex justify-center items-center">
            <img src={Mic} alt="" className="w-[24px]" />
          </div>
          <textarea
            style={{ resize: 'none' }}
            id="requestedText"
            name="input_text"
            rows="6"
            maxLength="4000"
            placeholder="Tell me what to write for you"
            className="text-[14px] border-gray block w-full rounded-md border p-1.5 mb-[10px]"
            required={true}
          />
          <img src={Send} alt="" className="w-[20px]" />
        </div> */}
      </div>
    </>
  );
}

export default FacebookPopup;
