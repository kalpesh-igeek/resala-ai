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

const QUICKREPLY = 'quickreply';
const SELECTION = 'selection';
const CHAT = 'chat';

export const DrawerContext = React.createContext(null);

const sites = [
  {
    name: 'DcDial Prod',
    url: 'https://www.dcdial.com/app/dcdial/view_users.php',
  },
];

export default function Panel() {
  const [isSideBarOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(QUICKREPLY);

  const [ifConfirmClose, setIfConfirmClose] = useState(false);
  const [ifOpenConfirmBox, setIfOpenConfirmBox] = useState(false);
  const [ifOpenDeleteBox, setIfOpenDeleteBox] = useState(false);

  const [isLoadedExtension, setIsLoadedExtension] = useState(false);
  const [selectedSites, setSelectedSites] = useState(sites);

  const [isLogin, setIsLogin] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const [selectedText, setSelectedText] = useState('');
  const [requestedText, setRequestedText] = useState('');
  const [positionX, setPoistionX] = useState(0);
  const [positionY, setPoistionY] = useState(0);
  const [backToInbox, setBackToInbox] = useState('');

  // function myFunction(e) {
  //   const selected = window.getSelection();
  //   if (selected.toString() !== '') {
  //     setSelectedText(selected.toString());
  //     setPoistionX(e.clientX);
  //     setPoistionY(e.clientY);
  //   }
  // }
  function myFunction(e) {
    const selected = window.getSelection();
    if (selected.toString() !== '') {
      setSelectedText(selected.toString());

      const rect = selected.getRangeAt(0).getBoundingClientRect();
      const positionX = rect.left + window.scrollX + rect.width / 2;
      const positionY = rect.top + window.scrollY + rect.height;

      const offsetX = 0; // Adjust this value based on your design
      const offsetY = 20; // Adjust this value based on your design

      setPoistionX(positionX - offsetX);
      setPoistionY(positionY + offsetY);
    }
  }

  useEffect(() => {
    // window.onhashchange = function () {
    //   setBackToInbox(window.location.hash.split('#inbox/')[1]);
    // };
    setTimeout(() => {
      const quickReply = document.getElementById('quickButton');
      const quickPosition = document.querySelectorAll('[data-tooltip="Print all"]')[0];
      if (quickPosition) {
        quickPosition.parentElement?.parentElement?.prepend(quickReply);
        quickReply.onclick = function () {
          handleSidebar(QUICKREPLY);
          setRequestedText('hello');
        };
      }
    }, 4000);
  }, []);

  document.getElementsByTagName('body')[0].onmouseup = (e) => myFunction(e);
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
     if (request.greeting === true) {
      handleSidebar(QUICKREPLY);
    } else {
      setIsOpen(false);
      setIfConfirmClose(true);
      setIfOpenConfirmBox(false);
      document.querySelectorAll('[style="margin-right: 500px;"]')[0].style = 'position: relative;';
    }
    sendResponse('Request : ' + JSON.stringify('request'));
  });

  const handleSidebar = (tab) => {
    setActiveTab(tab);
    setIsOpen(true);
    setIsLoadedExtension(true);
    setRequestedText(selectedText);
    document.querySelectorAll('[style="position: relative;"]')[0].style = 'margin-right: 500px';
  };

  useEffect(() => {
    if (ifConfirmClose) setIsOpen(false);
  }, [ifConfirmClose]);

  const handleClick = () => {
    setIfOpenConfirmBox(true);
    setIsLoadedExtension(false);
    document.querySelectorAll('[style="margin-right: 500px;"]')[0].style = 'position: relative;';
  };

  useEffect(() => {
    if (isLogin) {
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
  }, [isSideBarOpen, isLogin]);

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

  return (
    <>
      <PopupBox
        SELECTION={SELECTION}
        handleSidebar={handleSidebar}
        selectedText={selectedText}
        setSelectedText={setSelectedText}
        positionX={positionX}
        positionY={positionY}
      />
      <QuickButton handleSidebar={handleSidebar} />
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
                          isLogin={isLogin}
                          setIsOpen={setIsOpen}
                          setIsLogin={setIsLogin}
                          requestedText={requestedText}
                          setRequestedText={setRequestedText}
                          handleClick={handleClick}
                          setIsLogout={setIsLogout}
                          activeTab={activeTab}
                          CHAT={CHAT}
                          SELECTION={SELECTION}
                          QUICKREPLY={QUICKREPLY}
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
                          setIfOpenDeleteBox={setIfOpenDeleteBox}
                        />
                      }
                    />
                    <Route path="/preferences" element={<Preferences />} />
                    <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />} />
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
                  <DeletePopup ifOpenDeleteBox={ifOpenDeleteBox} setIfOpenDeleteBox={setIfOpenDeleteBox} />
                </>
              )}
            </>
          )}
        </div>
      </DrawerContext.Provider>
    </>
  );
}
