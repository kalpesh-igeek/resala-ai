import React, { useEffect, useRef, useState } from 'react';
import { MemoryRouter, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
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

import { useNavigate } from 'react-router-dom';
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
import SocialButton from './SocialButton';

import { unset } from 'lodash';
import { FloatOptions } from './Components/FloatIcon/FloatOptions';
import { FloatBtn } from './Components/FloatIcon/FloatBtn';
import { handleToggle } from './redux/reducers/extension/extension-slice';
import { useLayoutEffect } from 'react';

import positive from './icons/positive.svg';
import humor from './icons/humor.svg';
import oppose from './icons/oppose.svg';
import inspire from './icons/inspire.svg';
import curious from './icons/curious.svg';

const QUICKREPLY = 'quickreply';
const SELECTION = 'selection';
const CHAT = 'chat';
const SUMMARIZEVIDEO = 'summarize-video';

export const DrawerContext = React.createContext(null);
// todo
export const LocalContext = React.createContext(null);

const sites = [
  {
    name: 'DcDial Prod',
    url: 'https://www.dcdial.com/app/dcdial/view_users.php',
  },
];

export default function Panel({ local }) {
  const chromeWidthRef = useRef();
  const { isExtensionOpen } = useSelector((state) => state.extension);

  const [TOKEN, setToken] = useState(null);

  chrome.storage.sync.get(['userAccessToken'], function (items) {
    setToken(items.userAccessToken);
  });
  const dispatch = useDispatch();
  const [isSideBarOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  // chrome.storage.local.set({ test: 'test' });

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
  const [isClickWikiPediaButton, setIsClickWikiPediaButton] = useState(false);
  const [positionY, setPoistionY] = useState(0);
  // console.log('positionY', positionY);
  const [isFloatIconClicked, setIsFloatIconClicked] = useState(false);
  const [isWikipediaButtonClicked, setIsWikipediaButtonClicked] = useState(false);
  const [backToInbox, setBackToInbox] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const { activity } = useSelector((state) => state.auth);
  const [isGmailActive, setIsGmailActive] = useState(false);

  const [mailId, setMailId] = useState(window.location.hash);

  const { speak, cancel, speaking } = useSpeechSynthesis();

  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  const [requestGreeting, setRequestGreeting] = useState();
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    setRequestGreeting(undefined);
    if (typeof request.greeting != 'undefined' && isExtensionOpen) {
      dispatch(handleToggle(false));
      setRequestGreeting(false);
    } else if (typeof request.greeting != 'undefined') {
      dispatch(handleToggle(true));
      setRequestGreeting(true);
    }
    sendResponse('我收到你的消息了：' + JSON.stringify('request'));
    // console.log(request.greeting);
  });

  // PREVENT BACKGROUND SCROLL IF MOUSE CURSOR INSIDE EXTNSION
  useEffect(() => {
    const body = document.getElementsByTagName('BODY')[0];
    const handleMouseMove = (event) => {
      if (chromeWidthRef.current && isExtensionOpen) {
        const rect = chromeWidthRef.current.getBoundingClientRect();
        const mouseX = event.clientX;
        if (rect.left < mouseX) {
          body.style.overflow = 'hidden';
        } else {
          body.style.overflow = 'auto';
        }
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      body.style.overflow = 'auto';
    };
  }, [isExtensionOpen]);

  useEffect(() => {
    const updateDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleSpeak = (msg) => {
    // console.log({ msg });
    // console.log({ speaking });
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
      const positionY = rect.top + window.scrollY + rect.height + 10;

      document.getElementById('selectmenu').style.display = 'block';
      setPoistionX(positionX);
      setPoistionY(positionY);
    } else {
      document.getElementById('selectmenu').style.display = 'none';
    }
  }

  const [fromPosition, setFromPosition] = useState({
    bottom: 0,
    top: 0,
    left: 0,
  });

  let isDragging = false;
  let isWikiDragging = false;
  let offsetWikiX, offsetWikiY;
  let offsetX, offsetY;

  const [fromBtnPosition, setFromBtnPosition] = useState({
    bottom: 0,
    top: 0,
    left: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const hostname = window.location.hostname;
    const floatIcon = document.getElementById('floatingIcon');

    if (floatIcon) {
      if (isFloatIconClicked) {
        // console.log('remove');
        window.removeEventListener('mousedown', (e) => {
          isDragging = true;
          offsetX = e.clientX - floatIcon.getBoundingClientRect().left;
          offsetY = e.clientY - floatIcon.getBoundingClientRect().top;
          floatIcon.style.cursor = 'grabbing';
        });
        window.removeEventListener('mousemove', (e) => {
          if (!isDragging) return;

          const x = e.clientX - offsetX;
          const y = e.clientY - offsetY;

          // floatIcon.style.left = x + 'px';
          if (y > 0 && y < height - 42) {
            floatIcon.style.top = y + 'px';
          }
        });
        window.removeEventListener('mouseup', () => {
          isDragging = false;
          floatIcon.style.cursor = 'grab';
        });
        window.removeEventListener('dragstart', (e) => {
          e.preventDefault();
        });

        return;
      }

      floatIcon.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - floatIcon.getBoundingClientRect().left;
        offsetY = e.clientY - floatIcon.getBoundingClientRect().top;
        floatIcon.style.cursor = 'grabbing';
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        // floatIcon.style.left = x + 'px';
        if (y > 0 && y < height - 42) {
          floatIcon.style.top = y + 'px';
        }
      });

      document.addEventListener('mouseup', () => {
        isDragging = false;
        floatIcon.style.cursor = 'grab';
      });

      floatIcon.addEventListener('dragstart', (e) => {
        e.preventDefault();
      });
    }

    if (hostname == 'www.youtube.com') {
      setTimeout(() => {
        const secondaryInner = document.getElementById('secondary-inner');
        if (secondaryInner) {
          const youtubeButton = document.getElementById('youtubeButton');
          const actionPopUpButton = document.getElementById('actionPopUpButton');
          const actionCloseButton = document.getElementById('actionCloseButton');
          actionCloseButton.addEventListener('click', () => {
            // console.log('actionCloseButton click');
            youtubeButton.classList.add('hidden');
          });
          youtubeButton.addEventListener('mouseover', () => {
            // console.log('mouseover');
            actionPopUpButton.classList.remove('hidden');
          });
          youtubeButton.addEventListener('mouseout', () => {
            // console.log('mouseout');
            actionPopUpButton.classList.add('hidden');
          });
          if (youtubeButton) {
            secondaryInner.prepend(youtubeButton);
            youtubeButton.classList.remove('hidden');
            const ContinueInChat = document.getElementById('ContinueInChat');
            ContinueInChat.addEventListener('click', () => {
              // console.log('ContinueInChat');
              handleSidebar('chat');
              setIsClickWikiPediaButton(true);
            });
          }
        }
      }, 3000);
    } else if (hostname == 'mail.google.com') {
      // console.log('mail is already');

      setInterval(() => {
        const cloneQuickReplyButtonforReplay = document.getElementById('cloneQuickReplybottom');
        if (cloneQuickReplyButtonforReplay) {
          cloneQuickReplyButtonforReplay.addEventListener('click', () => {
            dispatch(handleToggle(true));
            handleSidebar('quickreply');
          });
        }
      }, 1000);

      const myTimer3 = () => {
        let bottomClass = document.getElementsByClassName('btC');
        if (bottomClass && !document.getElementById('cloneQuickReplybottom')) {
          bottomClass = bottomClass[0];
          if (bottomClass && bottomClass.cells) {
            const quickReply = document.getElementById('quickButton');
            //added btn
            const cloneQuickReplyBottom = quickReply.cloneNode(true);
            cloneQuickReplyBottom.id = 'cloneQuickReplybottom';
            cloneQuickReplyBottom.classList = 'cloneQuickReplybottom';
            cloneQuickReplyBottom.style = 'margin-left: 8px !important';
            cloneQuickReplyBottom.style = 'z-index: 99999';
            cloneQuickReplyBottom.style = 'cursor: pointer !important;';
            let td = document.createElement('td');
            td.append(cloneQuickReplyBottom);
            myStopFunction(myInterval3);
            bottomClass.cells[5].after(td);
          }
        }
      };

      const myTimer2 = () => {
        let presentation = document.getElementsByClassName('amn')[0];
        if (presentation) {
          const oldQuickReply = document.getElementById('cloneQuickReply');
          if (oldQuickReply == undefined) {
            const quickReply = document.getElementById('quickButton');
            const cloneQuickReply = quickReply.cloneNode(true);
            cloneQuickReply.id = 'cloneQuickReply';
            cloneQuickReply.classList.add('hidden');
            cloneQuickReply.style = 'margin-left: 8px';
            cloneQuickReply.style = 'z-index: 99999';
            presentation.append(cloneQuickReply);
            myStopFunction(myInterval2);
            const cloneQuickReplyButton = document.getElementById('cloneQuickReply');
            cloneQuickReplyButton.addEventListener('click', () => {
              const gmailReplay = document.getElementById(':1r');
              gmailReplay.click();
              dispatch(handleToggle(true));
              handleSidebar('quickreply');
            });
          }
        }
      };

      function myStopFunction(interval) {
        clearInterval(interval);
      }

      // let myInterval1 = setInterval(myTimer1, 1000);
      let myInterval2 = setInterval(myTimer2, 1000);
      let myInterval3 = setInterval(myTimer3, 1000);

      // setTimeout(() => {
      //   // Get a reference to the scrollable element
      //   const scrollableContent = document.getElementsByClassName('a98')[0];
      //   // Add a scroll event listener to the scrollable element
      //   scrollableContent.addEventListener('wheel', (event) => {
      //     myFunction();
      //   });
      //   const oldQuickReply = document.getElementById('cloneQuickReply');
      //   if (oldQuickReply == undefined) {
      //     const quickReply = document.getElementById('quickButton');
      //     const cloneQuickReply = quickReply.cloneNode(true);
      //     cloneQuickReply.id = 'cloneQuickReply';
      //     cloneQuickReply.classList.add('hidden');
      //     const quickPosition = document.getElementsByClassName('hj')[0];
      //     if (quickPosition) {
      //       cloneQuickReply.classList.remove('hidden');
      //       quickPosition.childNodes[0].prepend(cloneQuickReply);
      //       const cloneQuickReplyButton = document.getElementById('cloneQuickReply');
      //       cloneQuickReplyButton.addEventListener('click', () => {
      //         handleSidebar('quickreply');
      //       });
      //     }
      //   }
      // }, 3000);

      // const quickPosition = document.querySelectorAll('[aria-label="Print all"]')[0];
      // if (quickPosition) {
      // quickReply.classList.remove('hidden');
      // quickPosition.style.position = 'fixed';
      // quickPosition.style.top = 100;
      // quickPosition.style.left = 100;
      // quickPosition.parentElement?.parentElemeznt?.prepend(quickReply);
      // quickReply.onclick = function () {
      //   handleSidebar(QUICKREPLY);
      //   setRequestedText('hello');
      // };
      // }
    } else if (hostname == 'en.wikipedia.org') {
      setTimeout(() => {
        const WikipediaButton = document.getElementById('WikipediaButton');
        if (WikipediaButton) {
          WikipediaButton.classList.remove('hidden');
          if (isWikipediaButtonClicked) {
            // console.log('remove');
            window.removeEventListener('mousedown', (e) => {
              isWikiDragging = true;
              offsetWikiX = e.clientX - WikipediaButton.getBoundingClientRect().left;
              offsetWikiY = e.clientY - WikipediaButton.getBoundingClientRect().top;
              WikipediaButton.style.cursor = 'grabbing';
            });
            window.removeEventListener('mousemove', (e) => {
              if (!isWikiDragging) return;

              const x = e.clientX - offsetWikiX;
              const y = e.clientY - offsetWikiY;

              if (y > 0 && y < height - 42) {
                WikipediaButton.style.left = x + 'px';
                WikipediaButton.style.top = y + 'px';
              }
            });
            window.removeEventListener('mouseup', () => {
              isWikiDragging = false;
              WikipediaButton.style.cursor = 'grab';
            });
            window.removeEventListener('dragstart', (e) => {
              e.preventDefault();
            });

            return;
          }

          WikipediaButton.addEventListener('mousedown', (e) => {
            isWikiDragging = true;
            offsetWikiX = e.clientX - WikipediaButton.getBoundingClientRect().left;
            offsetWikiY = e.clientY - WikipediaButton.getBoundingClientRect().top;
            WikipediaButton.style.cursor = 'grabbing';
          });

          document.addEventListener('mousemove', (e) => {
            if (!isWikiDragging) return;

            const x = e.clientX - offsetWikiX;
            const y = e.clientY - offsetWikiY;

            if (y > 0 && y < height - 42) {
              WikipediaButton.style.left = x + 'px';
              WikipediaButton.style.top = y + 'px';
            }
          });

          document.addEventListener('mouseup', () => {
            isWikiDragging = false;
            WikipediaButton.style.cursor = 'grab';
          });

          WikipediaButton.addEventListener('dragstart', (e) => {
            e.preventDefault();
          });
        }

        const wikiSummarize = document.getElementById('wikiSummarize');
        wikiSummarize.addEventListener('click', () => {
          // console.log('Fsdhkj');
          setIsClickWikiPediaButton(true);
        });
      }, 3000);
    } else if (hostname == 'www.linkedin.com') {
      const SocialButton = document.getElementById('SocialButton');
      function myTimer() {
        let textBox = document.getElementsByClassName('editor-content');
        if (textBox && textBox[0]) {
          textBox = textBox[0];
          setFromBtnPosition({
            top: 0,
            bottom: 0,
            left: 667,
          });
          SocialButton.classList.remove('hidden');
          textBox.append(SocialButton);
        }
      }

      function myStopFunction() {
        clearInterval(myInterval);
      }
      let myInterval = setInterval(myTimer, 1000);

      SocialButton.addEventListener('click', () => {
        chrome.storage.sync.get(['userAccessToken'], function (items) {
          if (items.userAccessToken) {
            const SocialPopup = document.getElementById('SocialPopup');
            // console.log(SocialPopup);
            // const SocialPopup = document.getElementById('SocialPopup');
            if (SocialPopup) {
              SocialPopup.classList.remove('hidden');
              let FormPosition = document.getElementsByClassName('share-box')[0];
              // console.log('FormPosition', FormPosition);
              if (FormPosition) {
                FormPosition = FormPosition.getBoundingClientRect();
                // console.log('FormPosition', FormPosition);
                setFromPosition({
                  bottom: FormPosition.bottom,
                  top: FormPosition.top + 105,
                  left: FormPosition.left + 360,
                });
                SocialButton.classList.add('hidden');
              }
            }
          } else {
            handleSidebar('chat');
            dispatch(handleToggle(true));
          }
        });
      });

      // setTimeout(() => {
      //   const postButton = document.getElementsByClassName('share-box-feed-entry__top-bar')[0];
      //   // console.log('postButton');
      //   if (postButton) {
      //     postButton.addEventListener('click', () => {
      //       setTimeout(() => {
      //         let BtnPosition = document.getElementById('share-to-linkedin-modal__header');
      //         console.log('BtnPosition', BtnPosition);
      //         if (BtnPosition) {
      //           BtnPosition = BtnPosition.getBoundingClientRect();
      //           // console.log('BtnPosition', BtnPosition);
      //           setFromBtnPosition({
      //             top: BtnPosition.top + 50,
      //             left: BtnPosition.left + 660,
      //           });
      //         }

      //         const SocialButton = document.getElementById('SocialButton');
      //         const SocialPopup = document.getElementById('SocialPopup');
      //         SocialButton.classList.remove('hidden');
      //         SocialButton.addEventListener('click', () => {
      //           chrome.storage.sync.get(['userAccessToken'], function (items) {
      //             if (items.userAccessToken) {
      //               const SocialPopup = document.getElementById('SocialPopup');
      //               // console.log(SocialPopup);
      //               // const SocialPopup = document.getElementById('SocialPopup');
      //               if (SocialPopup) {
      //                 SocialPopup.classList.remove('hidden');
      //                 let FormPosition = document.getElementsByClassName('share-box')[0];
      //                 // console.log('FormPosition', FormPosition);
      //                 if (FormPosition) {
      //                   FormPosition = FormPosition.getBoundingClientRect();
      //                   // console.log('FormPosition', FormPosition);
      //                   setFromPosition({
      //                     bottom: FormPosition.bottom,
      //                     top: FormPosition.top + 105,
      //                     left: FormPosition.left + 360,
      //                   });
      //                   SocialButton.classList.add('hidden');
      //                 }
      //               }
      //             } else {
      //               handleSidebar('chat');
      //               dispatch(handleToggle(true));
      //             }
      //           });
      //         });
      //         let closeSocialBtn = document.getElementById('closeSocialBtn');
      //         closeSocialBtn.addEventListener('click', () => {
      //           // console.log('SocialButton');
      //           const SocialButton = document.getElementById('SocialButton');
      //           if (
      //             typeof document.getElementById('share-to-linkedin-modal__header') != 'undefined' &&
      //             document.getElementById('share-to-linkedin-modal__header') != null
      //           ) {
      //             SocialButton.classList.remove('hidden');
      //           }
      //         });
      //         let Dismiss = document.querySelectorAll('[aria-label="Dismiss"]')[0];
      //         Dismiss.addEventListener('click', () => {
      //           // console.log('Dismiss');
      //           const SocialButton = document.getElementById('SocialButton');
      //           SocialButton.classList.add('hidden');
      //         });

      //         let socialMediaId = document.getElementById('socialMediaPreference');
      //         if (socialMediaId) {
      //           socialMediaId.addEventListener('click', () => {
      //             const SocialPopup = document.getElementById('SocialPopup');
      //             const SocialButton = document.getElementById('SocialButton');
      //             console.log('socialMediaId', socialMediaId);
      //             navigate('/preferences');
      //             handleSidebar('chat');
      //             // console.log('sdshdbjw');
      //             // console.log(SocialButton, 'SocialButton');
      //             // console.log(SocialPopup, 'SocialPopup');
      //             SocialButton.classList.add('hidden');
      //             SocialPopup.classList.add('hidden');
      //             // console.log('sdshdbjw');
      //           });
      //         }
      //       }, 3000);
      //     });
      //   }
      // }, 3000);
    } else if (hostname == 'www.facebook.com') {
      const SocialButton = document.getElementById('SocialButton');
      function myTimer() {
        let textBox = document.getElementsByClassName('x1afcbsf');
        if (textBox && textBox[0]) {
          textBox = textBox[0];
          let notranslate = document.getElementsByClassName('notranslate');
          if (notranslate && notranslate[0]) {
            let finalTextBox = notranslate[0].parentElement;
            if (finalTextBox) {
              setFromBtnPosition({
                top: 0,
                bottom: 0,
                left: 442,
              });

              finalTextBox.append(SocialButton);
              // myStopFunction();

              let Dismiss = document.querySelectorAll('[aria-label="Close"]');
              if (Dismiss && Dismiss[0]) {
                Dismiss[0].addEventListener('click', () => {
                  myInterval = setInterval(myTimer, 1000);
                });
              }
            }
          }
        }
      }

      function myStopFunction() {
        clearInterval(myInterval);
      }
      let myInterval = setInterval(myTimer, 1000);

      SocialButton.addEventListener('click', () => {
        chrome.storage.sync.get(['userAccessToken'], function (items) {
          if (items.userAccessToken) {
            const SocialPopup = document.getElementById('SocialPopup');
            // console.log(SocialPopup);
            if (SocialPopup) {
              SocialPopup.classList.remove('hidden');
              let FormPosition = document.getElementsByClassName('x1afcbsf')[0];
              // console.log('FormPosition', FormPosition);
              if (FormPosition) {
                FormPosition = FormPosition.getBoundingClientRect();
                // console.log('FormPosition', FormPosition);
                setFromPosition({
                  bottom: FormPosition.bottom + 78,
                  top: -FormPosition.bottom - 78,
                  left: FormPosition.left + 199,
                });
              }
            }
          } else {
            handleSidebar('chat');
            dispatch(handleToggle(true));
          }
        });
      });

      // setTimeout(() => {
      //   let postButton = document.querySelectorAll('[aria-label="Create a post"]')[0];
      //   // console.log('postButton');
      //   if (postButton) {
      //     postButton = postButton.children[0];
      //     // console.log(postButton);
      //     postButton.addEventListener('click', () => {
      //       // console.log('postButton click');
      //       setTimeout(() => {
      //         let BtnPosition = document.getElementsByClassName('x1afcbsf')[0];
      //         // console.log('BtnPosition', BtnPosition);
      //         if (BtnPosition) {
      //           BtnPosition = BtnPosition.getBoundingClientRect();
      //           // console.log('BtnPosition', BtnPosition);
      //           setFromBtnPosition({
      //             bottom: BtnPosition.bottom - 116,
      //             left: BtnPosition.left + 444,
      //           });
      //         }
      //         const SocialButton = document.getElementById('SocialButton');
      //         SocialButton.classList.remove('hidden');
      //         SocialButton.addEventListener('click', () => {
      //           chrome.storage.sync.get(['userAccessToken'], function (items) {
      //             if (items.userAccessToken) {
      //               const SocialPopup = document.getElementById('SocialPopup');
      //               // console.log(SocialPopup);
      //               if (SocialPopup) {
      //                 SocialPopup.classList.remove('hidden');
      //                 let FormPosition = document.getElementsByClassName('x1afcbsf')[0];
      //                 // console.log('FormPosition', FormPosition);
      //                 if (FormPosition) {
      //                   FormPosition = FormPosition.getBoundingClientRect();
      //                   // console.log('FormPosition', FormPosition);
      //                   setFromPosition({
      //                     bottom: FormPosition.bottom + 78,
      //                     top: -FormPosition.bottom - 78,
      //                     left: FormPosition.left + 199,
      //                   });
      //                   SocialButton.classList.add('hidden');
      //                 }
      //               }
      //             } else {
      //               handleSidebar('chat');
      //               dispatch(handleToggle(true));
      //             }
      //           });
      //         });
      //         let closeSocialBtn = document.getElementById('closeSocialBtn');
      //         closeSocialBtn.addEventListener('click', () => {
      //           // console.log('SocialButton');
      //           const SocialButton = document.getElementById('SocialButton');
      //           SocialButton.classList.remove('hidden');
      //         });
      //         let Dismiss = document.querySelectorAll('[aria-label="Close"]')[0];
      //         Dismiss.addEventListener('click', () => {
      //           // console.log('Dismiss');
      //           const SocialButton = document.getElementById('SocialButton');
      //           SocialButton.classList.add('hidden');
      //         });
      //       }, 1000);
      //     });
      //   }
      //   let socialMediaId = document.getElementById('socialMediaPreference');
      //   if (socialMediaId) {
      //     socialMediaId.addEventListener('click', () => {
      //       const SocialPopup = document.getElementById('SocialPopup');
      //       const SocialButton = document.getElementById('SocialButton');
      //       // console.log('socialMediaId', socialMediaId);
      //       navigate('/preferences');
      //       handleSidebar('chat');
      //       // console.log('sdshdbjw');
      //       // console.log(SocialButton, 'SocialButton');
      //       // console.log(SocialPopup, 'SocialPopup');
      //       SocialButton.classList.add('hidden');
      //       SocialPopup.classList.add('hidden');
      //       // console.log('sdshdbjw');
      //     });
      //   }
      // }, 1000);
    } else if (hostname == 'twitter.com') {
      setInterval(() => {
        let DraftEditorContainer = document.getElementsByClassName('DraftEditor-editorContainer')[0];
        if (DraftEditorContainer) {
          DraftEditorContainer.addEventListener('click', () => {
            setFromBtnPosition({
              top: 0,
              bottom: 0,
              left: 479,
            });
            const SocialButton = document.getElementById('SocialButton');
            DraftEditorContainer.append(SocialButton);

            SocialButton.addEventListener('click', () => {
              chrome.storage.sync.get(['userAccessToken'], function (items) {
                if (items.userAccessToken) {
                  const SocialPopup = document.getElementById('SocialPopup');
                  // console.log(SocialPopup);
                  if (SocialPopup) {
                    SocialPopup.classList.remove('hidden');
                    let FormPosition = document.querySelectorAll('[data-testid="toolBar"]')[0];
                    // console.log('FormPosition', FormPosition);
                    if (FormPosition && FormPosition.parentElement) {
                      FormPosition = FormPosition.parentElement.getBoundingClientRect();
                      let FormPosition1 = SocialPopup && SocialPopup.parentElement ? SocialPopup.parentElement.getBoundingClientRect() : FormPosition;
                      // console.log('FormPosition', FormPosition);
                      setFromPosition({
                        bottom: FormPosition.bottom + 601,
                        top: -(FormPosition1.top + -200),
                        left: FormPosition.left + 200,
                      });
                      SocialButton.classList.add('hidden');
                    }
                  }
                } else {
                  handleSidebar('chat');
                  dispatch(handleToggle(true));
                }
              });
            });
          });
        }
      }, 1000);

      // setTimeout(() => {
      //   let BtnPosition = document.querySelectorAll('[data-testid="toolBar"]')[0];
      //   // console.log('BtnPosition');
      //   if (BtnPosition) {
      //     BtnPosition = BtnPosition.parentElement;
      //     // console.log(BtnPosition);
      //     BtnPosition = BtnPosition.getBoundingClientRect();
      //     // console.log('BtnPosition', BtnPosition);
      //     setFromBtnPosition({
      //       top: BtnPosition.top - 48,
      //       bottom: BtnPosition.bottom + 595,
      //       left: BtnPosition.left + 471,
      //     });

      //     const SocialButton = document.getElementById('SocialButton');
      //     // SocialButton.classList.remove('hidden');
      //     // todo

      //     if (SocialButton) {
      //       SocialButton.classList.remove('hidden');
      //     }
      //     // Disable scrolling

      //     SocialButton.addEventListener('click', () => {
      //       chrome.storage.sync.get(['userAccessToken'], function (items) {
      //         if (items.userAccessToken) {
      //           const SocialPopup = document.getElementById('SocialPopup');
      //           // console.log(SocialPopup);
      //           if (SocialPopup) {
      //             SocialPopup.classList.remove('hidden');
      //             let FormPosition = document.querySelectorAll('[data-testid="toolBar"]')[0];
      //             // console.log('FormPosition', FormPosition);
      //             if (FormPosition) {
      //               FormPosition = FormPosition.parentElement.getBoundingClientRect();
      //               let FormPosition1 = SocialPopup.parentElement.getBoundingClientRect();
      //               // console.log('FormPosition', FormPosition);
      //               setFromPosition({
      //                 bottom: FormPosition.bottom + 601,
      //                 top: -(FormPosition1.top + -200),
      //                 left: FormPosition.left + 200,
      //               });
      //               SocialButton.classList.add('hidden');
      //             }
      //           }
      //         } else {
      //           handleSidebar('chat');
      //           dispatch(handleToggle(true));
      //         }
      //       });
      //     });

      //     let closeSocialBtn = document.getElementById('closeSocialBtn');
      //     closeSocialBtn.addEventListener('click', () => {
      //       // console.log('SocialButton');
      //       const SocialButton = document.getElementById('SocialButton');
      //       SocialButton.classList.remove('hidden');
      //     });
      //   }
      //   let socialMediaId = document.getElementById('socialMediaPreference');
      //   if (socialMediaId) {
      //     socialMediaId.addEventListener('click', () => {
      //       console.log('sdshdbjw');
      //       let BtnPosition = document.querySelectorAll('[data-testid="toolBar"]')[0];
      //       // console.log('BtnPosition');
      //       if (BtnPosition) {
      //         BtnPosition = BtnPosition.parentElement;
      //         // console.log(BtnPosition);
      //         BtnPosition = BtnPosition.getBoundingClientRect();
      //         console.log('BtnPosition', BtnPosition);
      //         setFromBtnPosition({
      //           top: BtnPosition.top - 48,
      //           bottom: BtnPosition.bottom + 595,
      //           left: BtnPosition.left + 471,
      //         });
      //       }
      //     });
      //   }
      // }, 3000);
    }
  }, [isFloatIconClicked, isGmailActive]);

  // todo
  // out side click functionality

  // useEffect(() => {
  //   const hostname = window.location.hostname;
  //   const modal1 = document.getElementById('SocialButton');
  //   const modal2 = document.getElementById('SocialPopup');
  //   if (hostname == 'www.linkedin.com') {
  //     const postButton = document.getElementsByClassName('share-box-feed-entry__top-bar')[0];

  //     let isModal2Open = false; // Initially, modal2 is not open

  //     if (postButton) {
  //       postButton.addEventListener('click', () => {
  //         setTimeout(() => {
  //           // When postButton is clicked, open modal2
  //           isModal2Open = true;
  //           modal1.addEventListener('click', () => {
  //             modal2.classList.remove('hidden');
  //           });
  //           console.log('hello linkedIn');

  //           const handleClickOutside = (event) => {
  //             if (isModal2Open && !modal2.contains(event.target)) {
  //               console.log('outside clicked successfully');
  //               modal2.classList.add('hidden');
  //               isModal2Open = false; // Set the flag to indicate modal2 is closed
  //             } else {
  //               console.log('inside click');
  //             }
  //           };

  //           document.addEventListener('click', handleClickOutside);

  //           return () => {
  //             document.removeEventListener('click', handleClickOutside);
  //           };
  //         }, 500);
  //       });
  //     }
  //   } else if (hostname == 'www.facebook.com') {
  //     console.log('hello');
  //   } else if (hostname == 'twitter.com') {
  //     console.log('hello from twitter');
  //   }
  // }, []);

  // useEffect(() => {
  //   const hostname = window.location.hostname;

  //   if (hostname == 'www.linkedin.com' || hostname == 'www.facebook.com' || hostname == 'twitter.com') {
  // const modal1 = document.getElementById('SocialButton');
  // const modal2 = document.getElementById('SocialPopup');

  // const handleClickOutside = (event) => {
  //   console.log('outside click');
  //   if (modal1 && !modal1.contains(event.target) && modal2 && !modal2.contains(event.target)) {
  //     if (modal1) {
  //       modal1.classList.add('hidden');
  //     }
  //     if (modal2) {
  //       modal2.classList.add('hidden');
  //     }
  //   }
  // };
  // document.addEventListener('click', handleClickOutside);

  // return () => {
  //   document.removeEventListener('click', handleClickOutside);
  // };
  //   }
  // }, []);

  // out side click functionality

  // console.log({fromPosition});
  // console.log({fromBtnPosition});
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

  document.getElementsByTagName('body')[0].onmouseup = (e) => {
    if (e.detail > 1) {
      e.preventDefault();
    } else {
      myFunction(e);
    }
  };
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    setIsGmailActive(false);
    if (request.greeting === true) {
      handleSidebar(CHAT);
    } else if (request.hasOwnProperty('gmailId')) {
      const isInsideMail = request.gmailId.split('#inbox/').length > 1;
      // console.log('--->', isInsideMail);
      setIsGmailActive(isInsideMail);
    } else {
      setIsOpen(false);
      setIfConfirmClose(true);
      setIfOpenConfirmBox(false);
      // document.querySelectorAll('[style="margin-right: 500px;"]')[0]
      //   ? (document.querySelectorAll('[style="margin-right: 500px;"]')[0].style = 'position: relative;')
      //   : '';
    }
    sendResponse('Request : ' + JSON.stringify('request'));
  });
  const [selectTab, setSelectTab] = useState(1);

  const handleSidebar = (tab, tool = undefined) => {
    console.log({ tab, tool });
    if (tool) {
      setSelectTab(1);
    }
    setActiveTab(tab);
    setIsOpen(true);
    setIsLoadedExtension(true);
    setSelectedAction({ name: tool });
    // setIsPopupVisible(false);
    setRequestedText(selectedText);
    // document.querySelectorAll('[style="position: relative;"]')[0]
    //   ? (document.querySelectorAll('[style="position: relative;"]')[0].style = 'margin-right: 500px')
    //   : '';
    dispatch(handleToggle(true));
  };

  // useEffect(() => {
  //   if (ifConfirmClose) setIsOpen(false);
  // }, [ifConfirmClose]);

  const handleClick = () => {
    console.log('dklsdjdskl');
    dispatch(handleToggle(false));
    console.log('remove extension width');
    document.getElementById('resala_style_right_space')
      ? document.getElementById('resala_style_right_space').remove()
      : '';

    // setIfOpenConfirmBox(true);
    // setIsLoadedExtension(false);
    // document.querySelectorAll('[style="margin-right: 500px;"]')[0] ? document.querySelectorAll('[style="margin-right: 500px;"]')[0].style = 'position: relative;' : '';
    // dispatch(checkActivity(false));

    // console.log("handleClick");
    // let BtnPosition = document.querySelectorAll('[data-testid="toolBar"]')[0];
    // if(BtnPosition){
    //   BtnPosition = BtnPosition.parentElement;
    //   BtnPosition = BtnPosition.getBoundingClientRect();
    //   console.log(BtnPosition);
    //   setFromBtnPosition({
    //     top: BtnPosition.top - 48,
    //     bottom: BtnPosition.bottom + 595,
    //     left: BtnPosition.left + 471,
    //   });
    // }
  };

  const handleCloseClick = () => {
    // setIfOpenConfirmBox(true);
    console.log('handleCloseClick');
    setIsOpen(false);
    setIsLoadedExtension(false);
    // document.querySelectorAll('[style="margin-right: 500px;"]')[0]
    //   ? (document.querySelectorAll('[style="margin-right: 500px;"]')[0].style = 'position: relative;')
    //   : '';
    dispatch(checkActivity(false));
    let BtnPosition = document.querySelectorAll('[data-testid="toolBar"]')[0];
    if (BtnPosition) {
      // console.log('BtnPosition');
      BtnPosition = BtnPosition.parentElement;
      // console.log(BtnPosition);
      BtnPosition = BtnPosition.getBoundingClientRect();
      setFromBtnPosition({
        top: BtnPosition.top - 48,
        bottom: BtnPosition.bottom + 595,
        left: BtnPosition.left + 471,
      });
    }
  };
  const [chatInput, setChatInput] = useState({
    chatText: '',
  });
  const [composeSelectedText, setComposeSelectedText] = useState({ input_text: requestedText });
  const [replyText, setReplyText] = useState({ original_text: '', reply: '' });
  const [editTemplateName, setEditTemplateName] = useState({
    templatename: '',
    input_text: '',
  });
  const [onConfirmClick, setOnConfirmClick] = useState(false);
  const [clickClose, setClickClose] = useState(false);
  const [isConfirmExit, setIsConfirmExit] = useState(false);

  // const isConfirmExit = (route) =>{
  //   setIfOpenConfirmBox(true)
  //   if()
  // }

  useEffect(() => {
    if (clickClose && onConfirmClick) {
      setIfOpenConfirmBox(false);
      dispatch(handleToggle(false));
      console.log('remove extension width');
      document.getElementById('resala_style_right_space')
        ? document.getElementById('resala_style_right_space').remove()
        : '';
      setChatInput({
        chatText: '',
      });
      setComposeSelectedText({ input_text: requestedText });
      setReplyText({ original_text: '', reply: '' });
      setEditTemplateName({
        templatename: '',
        input_text: '',
      });
      setClickClose(false);
      setOnConfirmClick(false);
    }
  }, [clickClose, onConfirmClick]);

  const handlePopUpCloseClick = () => {
    console.log('handlePopUpCloseClick');
    if (
      chatInput.chatText ||
      composeSelectedText.input_text ||
      replyText.reply ||
      editTemplateName.templatename ||
      editTemplateName.input_text
    ) {
      console.log('Abort');
      setClickClose(true);
      setIfOpenConfirmBox(true);
    } else {
      dispatch(handleToggle(false));
      console.log('remove extension width');
      document.getElementById('resala_style_right_space')
        ? document.getElementById('resala_style_right_space').remove()
        : '';
      setChatInput({
        chatText: '',
      });
      setComposeSelectedText({ input_text: requestedText });
      setReplyText({ original_text: '', reply: '' });
      setEditTemplateName({
        templatename: '',
        input_text: '',
      });
      setClickClose(false);
      setOnConfirmClick(false);
    }
  };

  // useEffect(() => {
  //   const body = document.getElementsByTagName('body')[0];
  //   const youTube = document.getElementsByTagName('ytd-app')[0];
  //   if (isSideBarOpen) {
  //     if (youTube) {
  //       youTube.style.width = `calc(100% - 500px)`;
  //     } else {
  //       // body.style.width = `calc(100% - 500px)`;
  //     }
  //   } else {
  //     if (youTube) {
  //       youTube.style.width = `calc(100%)`;
  //     } else {
  //       body.style.width = `calc(100%)`;
  //     }
  //   }
  //   if (TOKEN) {
  //     if (isSideBarOpen) {
  //       const extensionCloseIcon = document.querySelector('.extensionCloseIcon');
  //       extensionCloseIcon.addEventListener('click', handleClick);
  //     } else {
  //       const DrawerCloseIcon = document.querySelector('.DrawerCloseIcon');
  //       if (DrawerCloseIcon) {
  //         DrawerCloseIcon.addEventListener('click', handleClick);
  //       }
  //     }
  //   }
  // }, [isSideBarOpen, TOKEN]);

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

  useLayoutEffect(() => {
    if (typeof requestGreeting != 'undefined') {
      if (isExtensionOpen) {
        console.log('add extension width');
        // Creating a style element
        var styleElement = document.createElement('style');
        styleElement.id = 'resala_style_right_space';

        // Setting the CSS content
        var cssContent = `
            html {
              width: calc(100% - 500px) !important;
              position: relative !important;
              min-height: 100vh !important;
            }
        `;

        // Adding the CSS content to the style element
        if (styleElement.styleSheet) {
          // This is required for IE8 and below.
          styleElement.styleSheet.cssText = cssContent;
        } else {
          styleElement.appendChild(document.createTextNode(cssContent));
        }
        // Appending the style element to the document head
        document.head.appendChild(styleElement);
      } else {
        console.log('remove extension width');
        document.getElementById('resala_style_right_space')
          ? document.getElementById('resala_style_right_space').remove()
          : '';
        // remove extension width
      }
    }
  }, [isExtensionOpen, !isExtensionOpen]);

  // twitter code start
  function readChildElement(element) {
    var elements = [];
    for (element = element.firstChild; element; element = element.nextSibling) {
      if (element.nodeType == 3) elements.push(element);
      else elements = elements.concat(readChildElement(element));
    }
    return elements;
  }

  function postContentText() {
    let currentPopup = document.querySelector('[aria-labelledby="modal-header"]');

    if (currentPopup) {
      currentPopup =
        currentPopup.querySelector('[data-testid="tweetText"]') || currentPopup.querySelector('[data-testid="tweet"]');
    } else {
      currentPopup = document.querySelector('[data-testid="tweetText"]');
    }
    let popupText = null;

    if (currentPopup) {
      popupText = readChildElement(currentPopup);
    } else {
      const contentTextElements = document.querySelectorAll('[data-testid="tweetText"]');
      const contentText = Array.from(contentTextElements).filter((node) => {
        const styles = getComputedStyle(node);
        return parseInt(styles.fontSize) > 20;
      });
      if (contentText.length > 0) {
        popupText = readChildElement(contentText[0]);
      }
    }
    const finalPost = popupText
      ? popupText
          .map((node) => node.data)
          .join(' ')
          .trim()
      : '';
    return finalPost;
  }

  async function handleFetchedData(text, responseType, app_type, element = null) {
    console.log({ text, responseType, app_type, element });
    const input = document.querySelector('[data-testid="tweetTextarea_0"]');
    const response = text;
    if (response) {
      const data = new DataTransfer();
      data.setData('text/plain', response.replace(/(\r\n|\n|\r)/gm, ''));
      input.dispatchEvent(
        new ClipboardEvent('paste', {
          dataType: 'text/plain',
          data: response.replace(/(\r\n|\n|\r)/gm, ''),
          bubbles: true,
          clipboardData: data,
          cancelable: true,
        })
      );
      return true;
    }
  }

  // disabled all button when one button click
  function allBtnDisabled(btn_id, index_no = null, respond = null) {
    positiveButton = document.getElementById(index_no ? `positive_${index_no}` : 'positive');
    humorButton = document.getElementById(index_no ? `oppose_${index_no}` : 'oppose');
    empatheticButton = document.getElementById(index_no ? `humor_${index_no}` : 'humor');
    inspireButton = document.getElementById(index_no ? `inspire_${index_no}` : 'inspire');
    curiousButton = document.getElementById(index_no ? `curious_${index_no}` : 'curious');

    const btnIds = [positiveButton, humorButton, empatheticButton, inspireButton, curiousButton];

    if (respond) {
      if (document.querySelectorAll('.linkdinbtn')) {
        document.querySelectorAll('.linkdinbtn').forEach((e) => {
          let elemid = e.id;
          document.getElementById(elemid).classList.remove('disabled');
        });
      }
      btnIds.forEach((element) => {
        element.disabled = false;
        element.style.cursor = 'pointer';
        element.classList.remove('disabled');
      });
    } else {
      if (document.querySelectorAll('.linkdinbtn')) {
        document.querySelectorAll('.linkdinbtn').forEach((e) => {
          let elemid = e.id;
          document.getElementById(elemid).classList.add('disabled');
        });
      }
      btnIds.forEach((element) => {
        element.disabled = true;
        element.style.cursor = 'not-allowed';
        element.classList.add('disabled');
      });
      document.getElementById(btn_id).style.cursor = 'wait';
      document.getElementById(btn_id).classList.remove('disabled');
    }
  }

  //Create Twitter Button
  function createTwitterButton(buttonId, buttonTitle, responseType, icon) {
    buttonBox = document.getElementById('replyButtonsBox');
    const replybtn = document.createElement(responseType);
    replybtn.id = buttonId;
    replybtn.addClass = buttonId;
    replybtn.style =
      'align-items: center; display: flex; margin-right:5px; border-radius: 4px; border: 3px solid #F5FAFF; background: #F5FAFF; padding:5px; cursor:pointer';
    replybtn.innerHTML = `<span class="tooltip" style="color:#1678F2">${buttonTitle}</span>`;

    const btnimg = document.createElement('img');
    // btnimg.src = chrome.runtime.getURL(`src/icons/${buttonId}.svg`);
    btnimg.src = icon;
    btnimg.style = 'width: 20px; height: 20px; margin-right:5px;';
    replybtn.prepend(btnimg);
    if (buttonBox) {
      buttonBox.appendChild(replybtn);
    }

    replybtn.addEventListener('click', async (e) => {
      document.querySelectorAll(`#${buttonId} span`)[0].innerText = 'Thinking...';
      document.querySelectorAll(`#${buttonId} span`)[0].parentElement.classList.add('thinking');
      allBtnDisabled(buttonId);
      let postContent = postContentText();
      const respond = await handleFetchedData(postContent, buttonId, 'twitter');
      if (respond) {
        allBtnDisabled(buttonId, null, respond);
        document.querySelectorAll(`#${buttonId} span`)[0].innerText = buttonTitle;
        document.querySelectorAll(`#${buttonId} span`)[0].parentElement.classList.remove('thinking');
      }
    });
  }

  const tweetBTN = (replyInputBox) => {
    if (!postContentText()) return;
    buttonBox = document.getElementById('replyButtonsBox');
    const replyButtonsBox = document.createElement('div');
    replyButtonsBox.id = 'replyButtonsBox';
    replyButtonsBox.style = 'display : flex; padding: 10px; justify-content: end; padding-right: 0;';
    replyButtonsBox.classList.add('replyButtonsBox');

    if (replyInputBox && replyInputBox.parentNode) {
      replyInputBox.parentNode.append(replyButtonsBox);
    }

    createTwitterButton('positive', 'Positive', 'button', positive);
    createTwitterButton('humor', 'Humor', 'button', humor);
    createTwitterButton('oppose', 'Oppose', 'button', oppose);
    createTwitterButton('inspire', 'Inspire', 'button', inspire);
    createTwitterButton('curious', 'Curious', 'button', curious);

    var tweet_id = document.URL.split('/').slice(-1).pop();
    const homebuttons = document.querySelector('[aria-label="Home timeline"]');
    if (tweet_id == 'home') {
      if (homebuttons) {
        document
          .querySelector('[aria-label="Home timeline"]')
          .children[2].querySelector('.replyButtonsBox').style.display = 'none';
      }
    }
  };

  // Create TwitterButton Main Div
  function createTwitterButtonBox() {
    let currentPopup = document.querySelector('[aria-labelledby="modal-header"]');
    const isButtonsBox = document.getElementById('replyButtonsBox');
    let replyInputBox = document.querySelector('[data-testid="toolBar"]');
    if (currentPopup) {
      if (replyInputBox && replyInputBox.nextSibling && replyInputBox.nextSibling.id == 'replyButtonsBox') return;
      tweetBTN(replyInputBox);
    } else {
      if (!replyInputBox) return;
      if (isButtonsBox) return;
    }
  }

  if (document.location.origin == 'https://twitter.com') {
    window.setInterval(createTwitterButtonBox, 100);
  }

  return (
    <>
      {/* FloatIcon */}
      {/* todo */}
      <LocalContext.Provider value={{ ...local }}>
        <div
          id="floatingIcon"
          style={{
            borderRadius: '20px 20px 0px 20px',
            transition: 'unset',
            display: isSideBarOpen ? 'none' : 'flex',
          }}
          className={`fixed bottom-[20px] select-none ${
            !isFloatIconClicked && 'new-btn-without-scale'
          } group/icon right-[20px] cursor-pointer w-fit p-[5px] hover:pr-[8px] h-fit flex justify-center items-center !z-[99999999999] bg-lightblue1`}
        >
          <FloatBtn
            isClicked={isFloatIconClicked}
            onClick={() => {
              setIsFloatIconClicked(!isFloatIconClicked);
            }}
          />

          {/* OPTIONS MENU */}
          <div className={` ${isFloatIconClicked ? 'block' : 'hidden'} absolute bottom-[calc(100%+10px)] right-0`}>
            <FloatOptions />
          </div>
        </div>

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
        <YoutubeButton handleSidebar={handleSidebar} />
        <WikipediaButton
          handleSidebar={handleSidebar}
          onClick={() => {
            setIsWikipediaButtonClicked(!isWikipediaButtonClicked);
          }}
        />
        <SocialButton fromPosition={fromPosition} fromBtnPosition={fromBtnPosition} handleSidebar={handleSidebar} />
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
              display: isExtensionOpen ? 'block' : 'none',
              width: isExtensionOpen ? 500 : 0,
              // display: isSideBarOpen ? 'block' : 'none',
              // width: isSideBarOpen ? 500 : 0,
              boxShadow: '-10px 0px 20px 0px #3C42570D',
              zIndex: 999999,
            }}
            ref={chromeWidthRef}
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
                            handlePopUpCloseClick={handlePopUpCloseClick}
                            setIsLogout={setIsLogout}
                            activeTab={activeTab}
                            CHAT={CHAT}
                            SELECTION={SELECTION}
                            QUICKREPLY={QUICKREPLY}
                            selectedAction={selectedAction}
                            setSelectedAction={setSelectedAction}
                            windowSelectedText={selectedText}
                            isClickButton={isClickWikiPediaButton}
                            setIsClickButton={setIsClickWikiPediaButton}
                            local={local}
                            chatInput={chatInput}
                            setChatInput={setChatInput}
                            composeSelectedText={composeSelectedText}
                            setComposeSelectedText={setComposeSelectedText}
                            replyText={replyText}
                            setReplyText={setReplyText}
                            selectTab={selectTab}
                            setSelectTab={setSelectTab}
                            editTemplateName={editTemplateName}
                            setEditTemplateName={setEditTemplateName}
                            setIfOpenConfirmBox={setIfOpenConfirmBox}
                            onConfirmClick={onConfirmClick}
                            isConfirmExit={isConfirmExit}
                            setIsConfirmExit={setIsConfirmExit}
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
                      onConfirmClick={onConfirmClick}
                      setOnConfirmClick={setOnConfirmClick}
                      isConfirmExit={isConfirmExit}
                      setIsConfirmExit={setIsConfirmExit}
                    />
                    {/* <DeletePopup ifOpenDeleteBox={ifOpenDeleteBox} setIfOpenDeleteBox={setIfOpenDeleteBox} /> */}
                  </>
                )}
              </>
            )}
          </div>
        </DrawerContext.Provider>
      </LocalContext.Provider>
    </>
  );
}
