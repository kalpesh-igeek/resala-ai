import React, { useEffect, useState } from 'react';
import { MemoryRouter, Route, Routes, useLocation, useParams } from 'react-router-dom';
import MainScreen from './Pages/MainScreen';
import SavedTemplates from './Pages/SavedTemplates';
import Preferences from './Pages/Preferences/Preferences';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp/SignUp';
import MobileVerification from './Pages/SignUp/MobileVerification';
import EnterCode from './Pages/SignUp/EnterCode';
import RegisterDetails from './Pages/SignUp/RegisterDetails';
import Successful from './Pages/SignUp/Successful';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import OTPVerification from './Pages/ForgetPassword/OTPVerification';
import EnterNewPassword from './Pages/ForgetPassword/EnterNewPassword';
import PasswordChanged from './Pages/ForgetPassword/PasswordChanged';
import Billings from './Pages/Profile/Billings';
import ManageAccount from './Pages/Profile/ManageAccount';
import CloseDrawer from './Components/CloseDrawer/CloseDrawer';
import RightArrowIcon from './utils/whiteArrowRight.svg';
import ConfirmationPopup from './Components/ConfirmationPopup';
import DeletePopup from './Components/DeletePopup';
import PopupBox from './PopupBox';
import QuickButton from './QuickButton';

import SuccessIcon from './utils/Account/Icons/SuccessIcon.svg';
import { getToken } from './utils/localstorage';
import Template from './Pages/Templates/Template';
import { useDispatch, useSelector } from 'react-redux';
import { checkActivity } from './redux/reducers/authSlice/AuthSlice';
import YoutubeButton from './YoutubeButton';
import { generateYoutubeSummary } from './redux/reducers/YoutubeSummarySlice/YoutubeSummarySlice';
import { useSpeechSynthesis } from 'react-speech-kit';
import copy from 'copy-to-clipboard';
import WikipediaButton from './WikipediaButton';

const QUICKREPLY = 'quickreply';
const SELECTION = 'selection';
const CHAT = 'chat';
const SUMMARIZEVIDEO = 'summarize-video';

export const DrawerContext = React.createContext(null);

const sites = [
  {
    name: 'DcDial Prod',
    url: 'https://www.dcdial.com/app/dcdial/view_users.php',
  },
];

export default function Panel() {
  const TOKEN = getToken();
  const dispatch = useDispatch();
  const [isSideBarOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const [ifConfirmClose, setIfConfirmClose] = useState(false);
  const [ifOpenConfirmBox, setIfOpenConfirmBox] = useState(false);
  const [ifOpenDeleteBox, setIfOpenDeleteBox] = useState(false);

  const [isLoadedExtension, setIsLoadedExtension] = useState(false);
  const [selectedSites, setSelectedSites] = useState(sites);

  // const [isLogin, setIsLogin] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const [selectedText, setSelectedText] = useState('');
  const [requestedText, setRequestedText] = useState('');
  const [positionX, setPoistionX] = useState(0);
  // console.log('positionX', positionX);
  const [selectedAction, setSelectedAction] = useState();
  const [positionY, setPoistionY] = useState(0);
  const [backToInbox, setBackToInbox] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const { activity } = useSelector((state) => state.auth);
  // console.log('activity', activity);

  const [mailId, setMailId] = useState(window.location.hash);

  const { speak, cancel, speaking } = useSpeechSynthesis();

  useEffect(()=>{
    speak({ text: "dsjkdjgvkljsdkgvjasklgvjsaklgvjasklgvjklkl" });
  },[])
  const handleSpeak = (msg) => {
    console.log({msg});
    console.log({speaking});
    if (speaking) {
      cancel();
    } else {
      speak({ text: msg });
    }
  };
  // function myFunction(e) {
  //   const selected = window.getSelection();
  //   if (selected.toString() !== '') {
  //     setSelectedText(selected.toString());
  //     setPoistionX(e.clientX);
  //     setPoistionY(e.clientY);
  //   }
  // }
  // function myFunction(e) {
  //   const selected = window.getSelection();
  //   if (selected.toString()) {
  //     setSelectedText(selected.toString());

  //     const rect = selected.getRangeAt(0).getBoundingClientRect();
  //     const positionX = rect.left + window.scrollX + rect.width / 2;
  //     const positionY = rect.top + window.scrollY + rect.height;

  //     // add the current scroll position to the calculated position
  //     setPoistionX(positionX + window.scrollX);
  //     setPoistionY(positionY + window.scrollY);
  //   }
  // }

  function myFunction(e) {
    const selected = window.getSelection();
    if (selected.toString()) {
      setSelectedText(selected.toString());

      const rect = selected.getRangeAt(0).getBoundingClientRect();
      const positionX = rect.left + window.scrollX + rect.width / 2;
      // Add the height of the element to position it below the selected text
      const positionY = rect.top + window.scrollY + rect.height + 20;

      document.getElementById('selectmenu').style.display = 'block';
      setPoistionX(positionX + window.scrollX);
      setPoistionY(positionY + window.scrollY);
    } else {
      document.getElementById('selectmenu').style.display = 'none';
    }
  }

  useEffect(() => {
    // window.onhashchange = function () {
    //   setBackToInbox(window.location.hash.split('#inbox/')[1]);
    // };
    const hostname = window.location.hostname;
    console.log({hostname});

    if(hostname == 'www.youtube.com'){
      setTimeout(() => {
        const secondaryInner = document.getElementById('secondary-inner');
        if(secondaryInner){
          const youtubeButton = document.getElementById('youtubeButton');
          if(youtubeButton){
            secondaryInner.prepend(youtubeButton);
            youtubeButton.classList.remove("hidden");
          }
        }
      }, 3000);

    }else if(hostname == 'mail.google.com'){
      setTimeout(() => {
        const quickReply = document.getElementById('quickButton');
        const quickPosition = document.querySelectorAll('[aria-label="Print all"]')[0];
        if (quickPosition) {
          quickPosition.parentElement?.parentElement?.prepend(quickReply);
          quickReply.onclick = function () {
            handleSidebar(QUICKREPLY);
            setRequestedText('hello');
          };
        }
      }, 3000);
      
    }else if(hostname == "en.wikipedia.org"){
      setTimeout(() => {
        const WikipediaButton = document.getElementById('WikipediaButton');
        if(WikipediaButton){
          WikipediaButton.classList.remove("hidden");
        }
      }, 3000);
      
    }
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const quickReply = document.getElementById('quickButton');
  //     // console.log('quickReply', quickReply);
  //     const toolbar = document.getElementsByClassName('pYTkkf-JX-I pYTkkf-JX-I-ql-ay5-ays bHI'); // replace with actual id
  //     console.log('toolbar', toolbar);
  //     if (toolbar) {
  //       const printButton = Array.from(toolbar.children).find(
  //         (child) => child.getAttribute('data-tooltip-id') === 'ucc-0'
  //       );
  //       console.log('printButton', printButton);
  //       if (printButton) {
  //         printButton.parentElement?.parentElement?.prepend(quickReply);
  //         quickReply.onclick = function () {
  //           handleSidebar(QUICKREPLY);
  //           setRequestedText('hello');
  //         };
  //       }
  //     }
  //   }, 2000);
  // }, []);
  // useEffect(() => {
  //   const checkUrlChange = () => {
  //     const currentMailId = window.location.hash;
  //     if (currentMailId !== mailId) {
  //       setMailId(currentMailId);
  //     } else {
  //       setMailId(currentMailId);
  //     }
  //   };

  //   // Check for URL changes every second
  //   const intervalId = setInterval(checkUrlChange, 1000);

  //   return () => clearInterval(intervalId); // Clean up on unmount
  // }, []);

  // useEffect(() => {
  //   // Your code here
  //   // setTimeout(() => {
  //   const quickReply = document.getElementById('quickButton');
  //   // console.log('quickReply', quickReply);
  //   const quickPosition = document.getElementsByClassName('T-I J-J5-Ji T-I-JN L3')[0];
  //   // console.log('quickPosition', quickPosition);
  //   if (quickPosition) {
  //     quickPosition.parentElement?.parentElement?.prepend(quickReply);
  //     quickReply.onclick = function () {
  //       handleSidebar(QUICKREPLY);
  //       setRequestedText('hello');
  //     };
  //   }
  //   // }, 2000); // Wait 2 seconds before running the code
  // }, [mailId]); // Run this useEffect when mailId changes
  // useEffect(() => {
  //   // Your code here
  //   setTimeout(() => {
  //     const quickReply = document.getElementById('quickButton');
  //     const quickPosition = document.querySelectorAll('[data-tooltip="Print all"]')[0];
  //     if (quickPosition) {
  //       quickPosition.parentElement?.parentElement?.prepend(quickReply);
  //       quickReply.onclick = function () {
  //         handleSidebar(QUICKREPLY);
  //         setRequestedText('hello');
  //       };
  //     }
  //   }, 2000);
  // }, [mailId]); // Run this useEffect when mailId changes

  document.getElementsByTagName('body')[0].onmouseup = (e) => myFunction(e);
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting === true) {
      handleSidebar(CHAT);
    } else {
      setIsOpen(false);
      setIfConfirmClose(true);
      setIfOpenConfirmBox(false);
      document.querySelectorAll('[style="margin-right: 500px;"]')[0].style = 'position: relative;';
    }
    sendResponse('Request : ' + JSON.stringify('request'));
  });

  const handleSidebar = (tab, tool = undefined) => {
    console.log({ tab, tool });
    setActiveTab(tab);
    setIsOpen(true);
    setIsLoadedExtension(true);
    setSelectedAction({ name: tool });
    // setIsPopupVisible(false);
    console.log({selectedText});
    setRequestedText(selectedText);
    document.querySelectorAll('[style="position: relative;"]')[0] ? document.querySelectorAll('[style="position: relative;"]')[0].style = 'margin-right: 500px' : '';
  };

  useEffect(() => {
    if (ifConfirmClose) setIsOpen(false);
  }, [ifConfirmClose]);

  const handleClick = () => {
    setIfOpenConfirmBox(true);
    setIsLoadedExtension(false);
    document.querySelectorAll('[style="margin-right: 500px;"]')[0].style = 'position: relative;';
    dispatch(checkActivity(false));
  };

  const handleCloseClick = () => {
    // setIfOpenConfirmBox(true);
    setIsOpen(false);
    setIsLoadedExtension(false);
    document.querySelectorAll('[style="margin-right: 500px;"]')[0].style = 'position: relative;';
    dispatch(checkActivity(false));
  };

  useEffect(() => {
    if (TOKEN) {
      if (isSideBarOpen) {
        const extensionCloseIcon = document.querySelector('.extensionCloseIcon');
        extensionCloseIcon.addEventListener('click', handleClick);
      } else {
        const DrawerCloseIcon = document.querySelector('.DrawerCloseIcon');
        if (DrawerCloseIcon) {
          DrawerCloseIcon.addEventListener('click', handleClick);
        }
      }
    }
  }, [isSideBarOpen, TOKEN]);

  // useEffect(() => {
  //   const handleClick = () => {
  //     setIsLoadedExtension((prevState) => !prevState);
  //     // setIsOpen((prevState) => !prevState);
  //   };
  //   const extensionIcon = document.getElementById('ExtensionIcon');
  //   extensionIcon.addEventListener('click', handleClick);
  //   return () => {
  //     extensionIcon.removeEventListener('click', handleClick);
  //   };
  // }, []);
  // useEffect(() => {
  //   const handleScroll = (e) => {
  //     const extensionElement = document.getElementById('extension');
  //     const isCursorOnExtension = extensionElement.contains(e.target);

  //     if (isCursorOnExtension) {
  //       e.preventDefault();
  //     } else {
  //       const isCursorOnOtherSiteElement = document.getElementById('other-site-element').contains(e.target);

  //       if (isCursorOnOtherSiteElement) {
  //         e.preventDefault();
  //       }
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <>
      <PopupBox
        SELECTION={SELECTION}
        handleSidebar={handleSidebar}
        selectedText={selectedText}
        setSelectedText={setSelectedText}
        requestedText={requestedText}
        positionX={positionX}
        positionY={positionY}
      />
      <QuickButton handleSidebar={handleSidebar} />
      <YoutubeButton />
      <WikipediaButton handleSidebar={handleSidebar}/>
      {/* <div
        style={{
          boxShadow: '0px 9px 10px rgba(22, 120, 242, 0.25)',
          zIndex: 9999999,
          display: 'flex',
        }}
        className={`DrawerArrow fixed duration-300 ${isLoadedExtension ? 'right-[446px]' : 'right-[0]'
          } cursor-pointer top-[20px] w-[32px] h-[32px] rounded-[50%] bg-primaryBlue text-white flex justify-center items-center`}
        onClick={(e) => handleSidebar(e)}
      >
        {isSideBarOpen ? <img src={RightArrowIcon} alt=">" /> : <img className="rotate-180" src={RightArrowIcon} alt="<" />}
      </div> */}

      <DrawerContext.Provider value={{ isSideBarOpen }}>
        <div
          style={{
            display: 'block',
            width: isSideBarOpen ? 500 : 0,
            boxShadow: '-10px 0px 20px 0px #3C42570D',
            zIndex: 999999,
          }}
          className={`MAINBODY fixed top-0 right-0 bottom-0 bg-white ease-in-out overflow-y-auto`}
          id="resala-extension"
        >
          <div
            style={{
              width: isSideBarOpen ? 500 : 0,
              boxShadow: '0px 0px 5px #0000009e',
              zIndex: 50,
            }}
            className="OVERLAY hidden fixed top-0 right-0 bottom-0"
          />

          {!isSideBarOpen ? (
            <CloseDrawer />
          ) : (
            <>
              {isLogout ? (
                <div className="py-[90px] px-[75px] flex flex-col justify-center">
                  <div className="flex items-center justify-center gap-2 mb-[50px]">
                    <img src={SuccessIcon} alt="SuccessIcon" className="cursor-pointer h-[64px] w-[64px]" />
                  </div>
                  <div className="text-[22px] flex justify-center mb-[8px] font-bold">Logout!</div>
                  <div className="flex justify-center px-[10px] text-center text-gray2 mb-[48px] flex-col text-[12px] gap-2">
                    You’ve successfully Logout your account.
                  </div>
                </div>
              ) : (
                <>
                  {/* <MemoryRouter> */}
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <MainScreen
                          // isLogin={isLogin}
                          setIsOpen={setIsOpen}
                          handleSidebar={handleSidebar}
                          // setIsLogin={setIsLogin}
                          requestedText={requestedText}
                          setRequestedText={setRequestedText}
                          handleClick={handleClick}
                          handleCloseClick={handleCloseClick}
                          setIsLogout={setIsLogout}
                          activeTab={activeTab}
                          CHAT={CHAT}
                          SELECTION={SELECTION}
                          QUICKREPLY={QUICKREPLY}
                          selectedAction={selectedAction}
                          setSelectedAction={setSelectedAction}
                        />
                      }
                    />
                    <Route
                      path="/savedtemplates"
                      element={
                        <SavedTemplates
                          handleSidebar={handleSidebar}
                          setIsOpen={setIsOpen}
                          ifOpenDeleteBox={ifOpenDeleteBox}
                          setActiveTab={setActiveTab}
                          setIfOpenDeleteBox={setIfOpenDeleteBox}
                          handleClick={handleClick}
                          setIsLogout={setIsLogout}
                        />
                      }
                    />
                    {/* <Route path="/template" element={<Template />} /> */}
                    <Route path="/preferences" element={<Preferences />} />
                    <Route
                      path="/login"
                      element={
                        <Login
                          setActiveTab={setActiveTab}
                          // isLogin={isLogin}
                          // setIsLogin={setIsLogin}
                        />
                      }
                    />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/registerdetails" element={<RegisterDetails />} />
                    <Route path="/mobileverification" element={<MobileVerification />} />
                    <Route path="/entercode" element={<EnterCode />} />
                    <Route path="/successful" element={<Successful />} />
                    <Route path="/forgetpassword" element={<ForgetPassword />} />
                    <Route path="/otpverification" element={<OTPVerification />} />
                    <Route path="/enternewpassword" element={<EnterNewPassword />} />
                    <Route path="/passwordchanged" element={<PasswordChanged />} />
                    <Route path="/billings" element={<Billings />} />
                    <Route path="/manageAccount" element={<ManageAccount />} />
                  </Routes>
                  {/* </MemoryRouter> */}
                  <ConfirmationPopup
                    setIsOpen={setIsOpen}
                    ifOpenConfirmBox={ifOpenConfirmBox}
                    setIfOpenConfirmBox={setIfOpenConfirmBox}
                    ifConfirmClose={ifConfirmClose}
                    setIfConfirmClose={setIfConfirmClose}
                  />
                  {/* <DeletePopup ifOpenDeleteBox={ifOpenDeleteBox} setIfOpenDeleteBox={setIfOpenDeleteBox} /> */}
                </>
              )}
            </>
          )}
        </div>
      </DrawerContext.Provider>
    </>
  );
}
