import React, { useEffect, useState } from 'react';
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
      setTimeout(() => {
        // Get a reference to the scrollable element
        const scrollableContent = document.getElementsByClassName('a98')[0];
        // Add a scroll event listener to the scrollable element
        scrollableContent.addEventListener('wheel', (event) => {
          myFunction();
        });
        const oldQuickReply = document.getElementById('cloneQuickReply');
        if (oldQuickReply == undefined) {
          const quickReply = document.getElementById('quickButton');
          const cloneQuickReply = quickReply.cloneNode(true);
          cloneQuickReply.id = 'cloneQuickReply';
          cloneQuickReply.classList.add('hidden');
          const quickPosition = document.getElementsByClassName('hj')[0];
          if (quickPosition) {
            cloneQuickReply.classList.remove('hidden');
            quickPosition.childNodes[0].prepend(cloneQuickReply);
            const cloneQuickReplyButton = document.getElementById('cloneQuickReply');
            cloneQuickReplyButton.addEventListener('click', () => {
              handleSidebar('quickreply');
            });
          }
        }
      }, 3000);
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
      setTimeout(() => {
        const postButton = document.getElementsByClassName('share-box-feed-entry__top-bar')[0];
        // console.log('postButton');
        if (postButton) {
          postButton.addEventListener('click', () => {
            setTimeout(() => {
              let BtnPosition = document.getElementById('share-to-linkedin-modal__header');
              // console.log('BtnPosition', BtnPosition);
              if (BtnPosition) {
                BtnPosition = BtnPosition.getBoundingClientRect();
                // console.log('BtnPosition', BtnPosition);
                setFromBtnPosition({
                  top: BtnPosition.top + 50,
                  left: BtnPosition.left + 660,
                });
              }

              const SocialButton = document.getElementById('SocialButton');
              const SocialPopup = document.getElementById('SocialPopup');
              SocialButton.classList.remove('hidden');
              SocialButton.addEventListener('click', () => {
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
              });
              let closeSocialBtn = document.getElementById('closeSocialBtn');
              closeSocialBtn.addEventListener('click', () => {
                // console.log('SocialButton');
                const SocialButton = document.getElementById('SocialButton');
                SocialButton.classList.remove('hidden');
              });
              let Dismiss = document.querySelectorAll('[aria-label="Dismiss"]')[0];
              Dismiss.addEventListener('click', () => {
                // console.log('Dismiss');
                const SocialButton = document.getElementById('SocialButton');
                SocialButton.classList.add('hidden');
              });

              let socialMediaId = document.getElementById('socialMediaPreference');
              socialMediaId.addEventListener('click', () => {
                const SocialPopup = document.getElementById('SocialPopup');
                const SocialButton = document.getElementById('SocialButton');
                console.log('socialMediaId', socialMediaId);
                navigate('/preferences');
                handleSidebar('chat');
                // console.log('sdshdbjw');
                // console.log(SocialButton, 'SocialButton');
                // console.log(SocialPopup, 'SocialPopup');
                SocialButton.classList.add('hidden');
                SocialPopup.classList.add('hidden');
                // console.log('sdshdbjw');
              });
            }, 500);
          });
        }
      }, 500);
    } else if (hostname == 'www.facebook.com') {
      setTimeout(() => {
        let postButton = document.querySelectorAll('[aria-label="Create a post"]')[0];
        // console.log('postButton');
        if (postButton) {
          postButton = postButton.children[0];
          // console.log(postButton);
          postButton.addEventListener('click', () => {
            // console.log('postButton click');
            setTimeout(() => {
              let BtnPosition = document.getElementsByClassName('x1afcbsf')[0];
              // console.log('BtnPosition', BtnPosition);
              if (BtnPosition) {
                BtnPosition = BtnPosition.getBoundingClientRect();
                // console.log('BtnPosition', BtnPosition);
                setFromBtnPosition({
                  bottom: BtnPosition.bottom - 116,
                  left: BtnPosition.left + 444,
                });
              }
              const SocialButton = document.getElementById('SocialButton');
              SocialButton.classList.remove('hidden');
              SocialButton.addEventListener('click', () => {
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
                    SocialButton.classList.add('hidden');
                  }
                }
              });
              let closeSocialBtn = document.getElementById('closeSocialBtn');
              closeSocialBtn.addEventListener('click', () => {
                // console.log('SocialButton');
                const SocialButton = document.getElementById('SocialButton');
                SocialButton.classList.remove('hidden');
              });
              let Dismiss = document.querySelectorAll('[aria-label="Close"]')[0];
              Dismiss.addEventListener('click', () => {
                // console.log('Dismiss');
                const SocialButton = document.getElementById('SocialButton');
                SocialButton.classList.add('hidden');
              });
            }, 1000);
          });
        }
        let socialMediaId = document.getElementById('socialMediaPreference');
        socialMediaId.addEventListener('click', () => {
          const SocialPopup = document.getElementById('SocialPopup');
          const SocialButton = document.getElementById('SocialButton');
          // console.log('socialMediaId', socialMediaId);
          navigate('/preferences');
          handleSidebar('chat');
          // console.log('sdshdbjw');
          // console.log(SocialButton, 'SocialButton');
          // console.log(SocialPopup, 'SocialPopup');
          SocialButton.classList.add('hidden');
          SocialPopup.classList.add('hidden');
          // console.log('sdshdbjw');
        });
      }, 1000);
    } else if (hostname == 'twitter.com') {
      // function disableScroll() {
      //   document.body.style.overflow = 'hidden';
      // }

      // function enableScroll() {
      //   document.body.style.overflow = 'auto';
      // }

      setTimeout(() => {
        let BtnPosition = document.querySelectorAll('[data-testid="toolBar"]')[0];
        // console.log('BtnPosition');
        if (BtnPosition) {
          BtnPosition = BtnPosition.parentElement;
          // console.log(BtnPosition);
          BtnPosition = BtnPosition.getBoundingClientRect();
          // console.log('BtnPosition', BtnPosition);
          setFromBtnPosition({
            top: BtnPosition.top - 48,
            bottom: BtnPosition.bottom + 595,
            left: BtnPosition.left + 471,
          });

          const SocialButton = document.getElementById('SocialButton');
          // SocialButton.classList.remove('hidden');
          // todo

          if (SocialButton) {
            SocialButton.classList.remove('hidden');
          }
          // Disable scrolling

          SocialButton.addEventListener('click', () => {
            const SocialPopup = document.getElementById('SocialPopup');
            // console.log(SocialPopup);
            if (SocialPopup) {
              SocialPopup.classList.remove('hidden');
              let FormPosition = document.querySelectorAll('[data-testid="toolBar"]')[0];
              // console.log('FormPosition', FormPosition);
              if (FormPosition) {
                FormPosition = FormPosition.parentElement.getBoundingClientRect();
                // console.log('FormPosition', FormPosition);
                setFromPosition({
                  bottom: FormPosition.bottom + 601,
                  top: -FormPosition.bottom - 601,
                  left: FormPosition.left + 200,
                });
                SocialButton.classList.add('hidden');
              }
            }
          });

          let closeSocialBtn = document.getElementById('closeSocialBtn');
          closeSocialBtn.addEventListener('click', () => {
            // console.log('SocialButton');
            const SocialButton = document.getElementById('SocialButton');
            SocialButton.classList.remove('hidden');
          });
        }
        let socialMediaId = document.getElementById('socialMediaPreference');
        socialMediaId.addEventListener('click', () => {
          const SocialPopup = document.getElementById('SocialPopup');
          const SocialButton = document.getElementById('SocialButton');

          console.log('socialMediaId', socialMediaId);
          navigate('/preferences');
          handleSidebar('chat');
          console.log('sdshdbjw');
          console.log(SocialButton, 'SocialButton');
          console.log(SocialPopup, 'SocialPopup');
          SocialButton.classList.add('hidden');
          SocialPopup.classList.add('hidden');
          console.log('sdshdbjw');
        });
      }, 3000);
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

  document.getElementsByTagName('body')[0].onmouseup = (e) => myFunction(e);
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
      document.querySelectorAll('[style="margin-right: 500px;"]')[0].style = 'position: relative;';
    }
    sendResponse('Request : ' + JSON.stringify('request'));
  });

  const handleSidebar = (tab, tool = undefined) => {
    // console.log({ tab, tool });
    setActiveTab(tab);
    setIsOpen(true);
    setIsLoadedExtension(true);
    setSelectedAction({ name: tool });
    // setIsPopupVisible(false);
    setRequestedText(selectedText);
    document.querySelectorAll('[style="position: relative;"]')[0]
      ? (document.querySelectorAll('[style="position: relative;"]')[0].style = 'margin-right: 500px')
      : '';
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
    const body = document.getElementsByTagName('body')[0];
    const youTube = document.getElementsByTagName('ytd-app')[0];
    if (isSideBarOpen) {
      if (youTube) {
        youTube.style.width = `calc(100% - 500px)`;
      } else {
        body.style.width = `calc(100% - 500px)`;
      }
    } else {
      if (youTube) {
        youTube.style.width = `calc(100%)`;
      } else {
        body.style.width = `calc(100%)`;
      }
    }
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
              display: isSideBarOpen ? 'block' : 'none',
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
                            windowSelectedText={selectedText}
                            isClickButton={isClickWikiPediaButton}
                            setIsClickButton={setIsClickWikiPediaButton}
                            local={local}
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
      </LocalContext.Provider>
    </>
  );
}
