import React, { useState, useEffect, Fragment } from 'react';
import Close from '../../utils/MainScreen/Icons/Close.svg';
import ArrowDown from '../../utils/PopupBox/Icons/ArrowDown.svg';
import SearchIcon from '../../utils/Chat/Icons/SearchIcon.svg';
import AllChatIcon from '../../utils/Chat/Icons/History/AllChatIcon.svg';
import DeleteIcon from '../../utils/Chat/Icons/History/DeleteIcon.svg';
import ChatIcon from '../../utils/Chat/Icons/Types/ChatIcon.svg';
import DocChatIcon from '../../utils/Chat/Icons/Types/DocChatIcon.svg';
import WebSummeryIcon from '../../utils/Chat/Icons/Types/WebSummeryIcon.svg';
import YoutubeIcon from '../../utils/Chat/Icons/Types/YoutubeIcon.svg';
import FileIcon from '../../utils/Chat/Icons/FileIcon.svg';
import Dropdown from 'react-dropdown';
import { Tab } from '@headlessui/react';
import DeletePopup from './DeletePopup';
import InputField from '../InputField';
import AllHistory from '../../utils/Chat/Icons/History/AllChatHistory.svg';
import AllHistory from '../../utils/Chat/Icons/History/AllChatHistory.svg';
import CustomDropdown from './CustomDropDown';
import Select from 'react-select';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const chatTypes = [
  { title: 'All chat history', icon: AllChatIcon },
  { title: 'Web summary', icon: WebSummeryIcon },
  { title: 'Youtube summary', icon: YoutubeIcon },
  { title: 'Doc chat', icon: DocChatIcon },
  { title: 'Chat', icon: ChatIcon },
];

const historyData = [
  {
    icon: WebSummeryIcon,
    type: 'Web summary',
    messages: [
      {
        msg: 'Chat from history Request Can you please clarify this email to me as what you’re actually requesting',
        type: 'user',
      },
      {
        msg: 'Chat from history Lorem ipsum dolor sit amet consectetur. Morbi elementum pellentesque pulvinar sagittis consectetur. Mauris a amet bibendum nibh.',
        type: 'system',
      },
      {
        msg: 'Chat from history Decline Can you pleaase clarify this email to me as what you’re actually requesting for me to do with this?',
        type: 'user',
      },
      {
        msg: 'Chat from history Lorem ipsum dolor sit amet consectetur. Tellus hendrerit vitae nibh luctus mi id dignissim pharetra convallis. Rhoncus diam risus neque elementum viverra erat lacus in non. Sed rutrum diam aenean hendrerit aliquam ultrices. Posuere in vivamus non vestibulum consectetur tortor vel urna.',
        type: 'system',
      },
    ],
    description: 'Lorem ipsum dolor sit amet consectetur.',
    datetime: '10:51 am',
  },
  {
    icon: YoutubeIcon,
    type: 'Youtube summary',
    messages: [
      {
        msg: 'Chat from history Request Can you please clarify this email to me as what you’re actually requesting',
        type: 'user',
      },
      {
        msg: 'Chat from history Lorem ipsum dolor sit amet consectetur. Morbi elementum pellentesque pulvinar sagittis consectetur. Mauris a amet bibendum nibh.',
        type: 'system',
      },
      {
        msg: 'Chat from history Decline Can you pleaase clarify this email to me as what you’re actually requesting for me to do with this?',
        type: 'user',
      },
      {
        msg: 'Chat from history Lorem ipsum dolor sit amet consectetur. Tellus hendrerit vitae nibh luctus mi id dignissim pharetra convallis. Rhoncus diam risus neque elementum viverra erat lacus in non. Sed rutrum diam aenean hendrerit aliquam ultrices. Posuere in vivamus non vestibulum consectetur tortor vel urna.',
        type: 'system',
      },
    ],
    description: 'Lorem ipsum dolor sit amet consectetur. Et rutrum auctor neque vel amet sit quis.',
    datetime: '3 days ago',
  },
  {
    icon: DocChatIcon,
    type: 'Doc chat',
    messages: [
      {
        msg: 'Chat from history Request Can you please clarify this email to me as what you’re actually requesting',
        type: 'user',
      },
      {
        msg: 'Chat from history Lorem ipsum dolor sit amet consectetur. Morbi elementum pellentesque pulvinar sagittis consectetur. Mauris a amet bibendum nibh.',
        type: 'system',
      },
      {
        msg: 'Chat from history Decline Can you pleaase clarify this email to me as what you’re actually requesting for me to do with this?',
        type: 'user',
      },
      {
        msg: 'Chat from history Lorem ipsum dolor sit amet consectetur. Tellus hendrerit vitae nibh luctus mi id dignissim pharetra convallis. Rhoncus diam risus neque elementum viverra erat lacus in non. Sed rutrum diam aenean hendrerit aliquam ultrices. Posuere in vivamus non vestibulum consectetur tortor vel urna.',
        type: 'system',
      },
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur. Elementum vulputate pharetra morbi magna eget at massa nulla.',
    datetime: '5 days ago',
  },
  {
    icon: ChatIcon,
    type: 'Chat',
    messages: [
      {
        msg: 'Chat from history Request Can you please clarify this email to me as what you’re actually requesting',
        type: 'user',
      },
      {
        msg: 'Chat from history Lorem ipsum dolor sit amet consectetur. Morbi elementum pellentesque pulvinar sagittis consectetur. Mauris a amet bibendum nibh.',
        type: 'system',
      },
      {
        msg: 'Chat from history Decline Can you pleaase clarify this email to me as what you’re actually requesting for me to do with this?',
        type: 'user',
      },
      {
        msg: 'Chat from history Lorem ipsum dolor sit amet consectetur. Tellus hendrerit vitae nibh luctus mi id dignissim pharetra convallis. Rhoncus diam risus neque elementum viverra erat lacus in non. Sed rutrum diam aenean hendrerit aliquam ultrices. Posuere in vivamus non vestibulum consectetur tortor vel urna.',
        type: 'system',
      },
    ],
    description: 'Lorem ipsum dolor sit amet consectetur. Velit cras sit sit dignissim.',
    datetime: '8 days ago',
  },
];

const filesListData = [
  {
    icon: DocChatIcon,
    title: 'Doc name',
    filename: 'File Name1323655_445545.pdf',
    datetime: '10:51 am',
  },
  {
    icon: DocChatIcon,
    title: 'Doc name',
    filename: 'File Name1323655_445545.pdf',
    datetime: '5 Days ago',
  },
  {
    icon: DocChatIcon,
    title: 'Doc name',
    filename: 'File Name1323655_445545.pdf',
    datetime: '10 Days ago',
  },
  {
    icon: DocChatIcon,
    title: 'Doc name',
    filename: 'File Name1323655_445545.pdf',
    datetime: '15 Days ago',
  },
];

const ChatHistory = ({ setChatData, isChatHistory, setIsChatHistory }) => {
  const [chatsHistory, setChatsHistroy] = useState(historyData);
  const [filesList, setFileList] = useState(filesListData);
  const [isDocChat, setIsDocChat] = useState(false);
  const [selectedChatType, setSelectedChatType] = useState('All chat history');
  const [showOptions, setShowOptions] = useState(true);

  const [ifOpenDeleteBox, setIfOpenDeleteBox] = useState(false);
  const [isDeleteChatConfirm, setIsDeleteChatConfirm] = useState(false);
  const [deleteChatIndex, setDeleteChatIndex] = useState();

  const [isDeleteFileConfirm, setIsDeleteFileConfirm] = useState(false);
  const [deleteFileIndex, setDeleteFileIndex] = useState();

  const [deleteContent, setDeleteContent] = useState('');

  useEffect(() => {
    setChatsHistroy(historyData);
  }, []);

  // const handleChatTypeChange = (option) => {
  //   if (option.value === 'Doc chat') {
  //     setIsDocChat(true);
  //   } else {
  //     setIsDocChat(false);
  //   }
  //   let tempArr = Array.from(historyData);
  //   let newArray = tempArr.filter((item) => item.type === option.value);
  //   if (option.value === 'All chat history') {
  //     setChatsHistroy(historyData);
  //   } else {
  //     setChatsHistroy(newArray);
  //   }
  // };

  const handleChatTypeChange = (option) => {
    if (option.value === 'Doc chat') {
      setIsDocChat(true);
      setShowOptions(false); // Hide options when 'Doc chat' is selected
    } else {
      setIsDocChat(false);
      setShowOptions(true); // Show options for other chat types
    }

    setSelectedChatType(option.value);

    let tempArr = Array.from(historyData);
    let newArray = tempArr.filter((item) => item.type === option.value);
    if (option.value === 'All chat history') {
      setChatsHistroy(historyData);
    } else {
      setChatsHistroy(newArray);
    }
  };

  const handleChatSelection = (chat) => {
    setChatData(chat);
    setIsChatHistory(false);
  };

  useEffect(() => {
    if (isDeleteChatConfirm) {
      let tempArr = Array.from(chatsHistory);
      tempArr.splice(deleteChatIndex, 1);
      setChatsHistroy(tempArr);
      setIsDeleteChatConfirm(false);
    }
  }, [isDeleteChatConfirm]);

  useEffect(() => {
    if (isDeleteFileConfirm) {
      let tempArr = Array.from(filesList);
      tempArr.splice(deleteFileIndex, 1);
      setFileList(tempArr);
      setIsDeleteFileConfirm(false);
    }
  }, [isDeleteFileConfirm]);

  const handleDeleteChat = (index) => {
    setDeleteChatIndex(index);
    setIfOpenDeleteBox(true);
    setDeleteContent('chat');
  };

  const handleDeleteFile = (index) => {
    setDeleteFileIndex(index);
    setIfOpenDeleteBox(true);
    setDeleteContent('file');
  };

  return (
    <>
      <div className={`${isChatHistory ? 'block' : 'hidden'}`}>
        <div className="fixed top-0 bottom-0 right-0 w-[500px] bg-black z-[60] opacity-40"></div>
        <div
          className="absolute rounded-t-[10px] bg-white py-[20px] right-0 bottom-0 z-[70] w-[500px] min-h-[644px]"
          style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
          // show={open}
        >
          <div className="pt-[8px] px-[20px] pb-[20px] text-[22px] font-medium text-darkBlue">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="gap-2 flex items-center">
                  <span>Chat History</span>
                </div>
                <div className="cursor-pointer chat-history bg-lightblue1 relative flex text-[12px] w-[165px] items-center gap-2 rounded-full px-[8px] py-[6px]">
                  <img
                    src={selectedChatType === 'All chat history' ? AllChatIcon : chatsHistory.map((chat) => chat.icon)}
                  />
                  <Dropdown
                    className="w-full"
                    options={chatTypes.map((chatType) => ({
                      value: chatType.title,
                      label: (
                        <div className="flex items-center gap-2">
                          <img src={chatType.icon} alt={chatType.title} />
                          <span className="">{chatType.title}</span>
                        </div>
                      ),
                    }))}
                    placeholder="All chat history"
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
                    onChange={(option) => handleChatTypeChange(option)}
                  />
                </div>
              </div>
              <div className="cursor-pointer -mt-[30px]" onClick={() => setIsChatHistory(false)}>
                <img src={Close} />
              </div>
            </div>
          </div>
          {isDocChat ? (
            <Tab.Group as="div" defaultIndex={0}>
              <Tab.List
                className="px-[20px]"
                style={{
                  boxShadow: '0px 2px 8px 0px #0000000D',
                }}
              >
                <Tab
                  key="docchats"
                  className={({ selected }) =>
                    classNames(
                      selected ? 'border-primaryBlue text-black' : 'border-transparent text-gray1',
                      'flex-1 whitespace-nowrap border-b-2 py-[12px] text-[14px] font-medium mr-[30px] focus:outline-0'
                    )
                  }
                >
                  Doc chat
                </Tab>
                <Tab
                  key="uploadchat"
                  data-headlessui-state="selected"
                  className={({ selected }) =>
                    classNames(
                      selected ? 'border-primaryBlue text-black' : 'border-transparent text-gray1',
                      'flex-1 whitespace-nowrap border-b-2 py-[12px] text-[14px] font-medium mr-[30px] focus:outline-0'
                    )
                  }
                >
                  Uploaded Doc
                </Tab>
              </Tab.List>
              <div className="mx-[20px] my-[10px] border border-gray items-center flex rounded-md px-[9px]">
                <img src={SearchIcon} />
                <InputField
                  className="block w-full rounded-md border-0 px-[9px] py-[7px] text-[12px] text-darkBlue placeholder:text-gray1 focus:outline-0"
                  name="search"
                  label=""
                  type="text"
                  placeholder="Search"
                />
              </div>
              <Tab.Panels as={Fragment}>
                <Tab.Panel className="px-[20px]" key="docchats">
                  {chatsHistory.map(
                    (item, index) =>
                      item.type === 'Doc chat' && (
                        <div className="border-b border-gray py-[8px]">
                          <div className="flex items-center justify-between mb-[8px]">
                            <div className="flex items-center gap-2">
                              <div className="icon">
                                <img src={item.icon} />
                              </div>
                              <div
                                className="text-[14px] font-medium cursor-pointer"
                                onClick={() => handleChatSelection(item.messages)}
                              >
                                {item.type}
                              </div>
                            </div>
                            <div className="text-gray1">{item.datetime}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-gray1">{item.description}</div>
                            <div
                              className="h-[30px] w-[30px] flex items-center justify-end cursor-pointer"
                              onClick={() => handleDeleteChat(index)}
                            >
                              <img src={DeleteIcon} />
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </Tab.Panel>
                <Tab.Panel className="px-[20px]" key="uploadchat">
                  {filesList.map((item, index) => (
                    <div className="border-b border-gray py-[8px]">
                      <div className="flex items-center justify-between mb-[8px]">
                        <div className="flex items-center gap-2">
                          <div className="icon">
                            <img src={item.icon} />
                          </div>
                          <div
                            className="text-[14px] font-medium cursor-pointer"
                            onClick={() => handleChatSelection(item.messages)}
                          >
                            {item.title}
                          </div>
                        </div>
                        <div className="text-gray1">{item.datetime}</div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="flex items-center gap-2 bg-lightblue1 px-[8px] py-[12px] rounded-[6px]">
                          <div>
                            <img src={FileIcon} />
                          </div>
                          <div className="text-primaryBlue">{item.filename}</div>
                        </div>
                        <div
                          className="h-[30px] w-[30px] flex items-end justify-end cursor-pointer"
                          onClick={() => handleDeleteFile(index)}
                        >
                          <img src={DeleteIcon} />
                        </div>
                      </div>
                    </div>
                  ))}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          ) : (
            <>
              <div className="mx-[20px] border border-gray items-center flex rounded-md px-[9px]">
                <img src={SearchIcon} />
                <InputField
                  className="block w-full rounded-md border-0 px-[9px] py-[7px] text-[12px] text-darkBlue placeholder:text-gray1 focus:outline-0"
                  name="search"
                  label=""
                  type="text"
                  placeholder="Search"
                />
              </div>
              <div className="mt-[12px] px-[20px]">
                {chatsHistory.map((item, index) => (
                  <div className="border-b border-gray py-[8px]">
                    <div className="flex items-center justify-between mb-[8px]">
                      <div className="flex items-center gap-2">
                        <div className="icon">
                          <img src={item.icon} />
                        </div>
                        <div
                          className="text-[14px] font-medium cursor-pointer"
                          onClick={() => handleChatSelection(item.messages)}
                        >
                          {item.type}
                        </div>
                      </div>
                      <div className="text-gray1">{item.datetime}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray1">{item.description}</div>
                      <div
                        className="h-[30px] w-[30px] flex items-center justify-end cursor-pointer"
                        onClick={() => handleDeleteChat(index)}
                      >
                        <img src={DeleteIcon} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <DeletePopup
        deleteContent={deleteContent}
        setIsDeleteChatConfirm={setIsDeleteChatConfirm}
        setIsDeleteFileConfirm={setIsDeleteFileConfirm}
        ifOpenDeleteBox={ifOpenDeleteBox}
        setIfOpenDeleteBox={setIfOpenDeleteBox}
      />
    </>
  );
};
export default ChatHistory;
