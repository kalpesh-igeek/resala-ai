import React, { useState, useEffect, Fragment, useRef } from 'react';
import Close from '../../utils/MainScreen/Icons/Close.svg';
import ArrowDown from '../../utils/PopupBox/Icons/ArrowDown.svg';
import SearchIcon from '../../utils/Chat/Icons/SearchIcon.svg';
import AllChatIcon from '../../utils/Chat/Icons/History/AllChatIcon.svg';
import DeleteIcon from '../../utils/Chat/Icons/History/trash.svg';
// import AllHistoryClear from '../../utils/Chat/Icons/History/ClearAllHistory.png';
import AllHistoryClear from '../../utils/Chat/Icons/History/ClearAllHistory1.svg';


import ChatIcon from '../../utils/Chat/Icons/Types/ChatIcon.svg';
import ChatIconA from '../../utils/Chat/Icons/Types/ChatIcon-active.svg';
import DocChatIcon from '../../utils/Chat/Icons/Types/DocChatIcon.svg';
import DocChatIconA from '../../utils/Chat/Icons/Types/DocChatIcon-active.svg';
import WebSummeryIcon from '../../utils/Chat/Icons/Types/WebSummeryIcon.svg';
import WebSummeryIconA from '../../utils/Chat/Icons/Types/WebSummeryIcon-active.svg';
import YoutubeIcon from '../../utils/Chat/Icons/Types/YoutubeIcon.svg';
import YoutubeIconA from '../../utils/Chat/Icons/Types/YoutubeIcon-active.svg';
import FileIcon from '../../utils/Chat/Icons/FileIcon.svg';
import Dropdown from 'react-dropdown';
import { Tab } from '@headlessui/react';
import DeletePopup from './DeletePopup';
import InputField from '../InputField';
import AllHistory from '../../utils/Chat/Icons/History/AllChatHistory.svg';
import AllHistory from '../../utils/Chat/Icons/History/AllChatHistory.svg';
import CustomDropdown from './CustomDropDown';
import Select from 'react-select';
import { selectChat, userChatList } from '../../redux/reducers/chatSlice/ChatSlice';
import { useDispatch } from 'react-redux';
import { getDefauPromptList } from '../../redux/reducers/userPromptSlice/UserPromptSlice';
import Icons from './Icons';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Select, { components } from 'react-select';
import { formatDistanceToNow } from 'date-fns';
import { utcToZonedTime, format } from 'date-fns-tz';
import { getDateDisplay } from '../../Helpers/dateFormater';
import CustomTooltip from '../CustomTooltip/Tooltip';
import NoDataFound from '../../utils/SavedTemplates/img/nodatafound.svg';
import { set } from 'lodash';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// -active
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const chatTypes = [
  { title: 'All chat history', icon: AllChatIcon, active: AllChatIcon },
  { title: 'Chat', icon: ChatIcon, active: ChatIconA },
  { title: 'Doc chat', icon: DocChatIcon, active: DocChatIconA },
  { title: 'Web summary', icon: WebSummeryIcon, active: WebSummeryIconA },
  { title: 'Youtube summary', icon: YoutubeIcon, active: YoutubeIconA },
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

const CustomOption = ({ data, ...props }) => (
  <components.Option {...props}>
    <div className="flex items-center gap-2">
      <img src={data.icon} alt={data.label} />
      <span>{data.label}</span>
    </div>
  </components.Option>
);

const SingleValue = ({ data, ...props }) => (
  <components.SingleValue {...props}>
    <div className="flex items-center gap-2 text-[#1678F2]">
      <img src={data.active} alt={data.label} />
      <span>{data.label}</span>
    </div>
  </components.SingleValue>
);

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <img
          className={`absolute w-[16px] h-[16px]`}
          style={{
            right: props.selectProps.menuIsOpen ? '-10px' : '10px',
            top: props.selectProps.menuIsOpen ? ' 0px' : '22%',
            transform: props.selectProps.menuIsOpen && 'rotate(180deg)',
          }}
          src={ArrowDown}
        // style={{ transform: props.selectProps.menuIsOpen && 'rotate(180deg)' }}
        />
      </components.DropdownIndicator>
    )
  );
};

const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: 'transparent',
    padding: 0,
    border: 'none',
    boxShadow: state.isFocused ? 0 : 0,
    '&:hover': {
      border: 'none',
    },
    color: '#1678F2',
    height: '26px',
    minHeight: '26px',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
    boxShadow: '0px 2px 20px 0px #00000026',
    width: '182px',
    minWidth: '182px',
    right: '2px',
    top: '38px',
    // right: '-1px',
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // const color = chroma(data.color);
    // console.log({ data, isDisabled, isFocused, isSelected });
    return {
      ...styles,
      backgroundColor: isFocused ? '#F3F4F8' : null,
      color: !isFocused ? '#8C90A5' : '#19224C',
      fontWeight: 400,
      cursor: 'pointer',
      margin: '8px',
      width: 'auto',
      borderRadius: '4px',
      height: '26px',
      lineHeight: '7px',
      padding: '5px 8px',

      // minWidth: '143px',
    };
  },
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
    width: '14px',
    height: '14px',
    // right: '5px',
  }),
};

const ChatHistory = ({
  setChatData,
  isChatHistory,
  setIsChatHistory,
  setIsViewPrompts,
  setChatsHistroy,
  chatsHistory,
  fetchChatHistoryList,
  setHistoryType,
  setSearchChatHis,
  lastSelectedChat,
  setlastSelectedChat,
  isSkeleton,
  setIsSkeleton
}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [isClearAllChat, setisClearAllChat] = useState(false);

  //Shubham

  const chatHisRef = useRef(null);
  const deleteRef = useRef();

  // useEffect(() => {
  //   setChatsHistroy(historyData);
  // }, []);

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

  // const handleChatTypeChange = (option) => {
  //   if (option.value === 'Doc chat') {
  //     setIsDocChat(true);
  //     setShowOptions(false); // Hide options when 'Doc chat' is selected
  //   } else {
  //     setIsDocChat(false);
  //     setShowOptions(true); // Show options for other chat types
  //   }

  //   setSelectedChatType(option.value);

  //   let tempArr = Array.from(historyData);
  //   let newArray = tempArr.filter((item) => item.type === option.value);
  //   if (option.value === 'All chat history') {
  //     setChatsHistroy(historyData);
  //   } else {
  //     setChatsHistroy(newArray);
  //   }
  // };

  const handleChatSelection = async (chat) => {
    setlastSelectedChat(chat?.chat_id);
    // setChatData(chat);
    await dispatch(selectChat(chat?.id));
    setIsChatHistory(false);
    setIsViewPrompts(false);
    // navigate('/');
  };

  // useEffect(() => {
  //   if (isDeleteChatConfirm) {
  //     let tempArr = Array.from(chatsHistory);
  //     tempArr.splice(deleteChatIndex, 1);
  //     setChatsHistroy(tempArr);
  //     setIsDeleteChatConfirm(false);
  //   }
  // }, [isDeleteChatConfirm]);

  useEffect(() => {
    if (isDeleteFileConfirm) {
      let tempArr = Array.from(filesList);
      tempArr.splice(deleteFileIndex, 1);
      setFileList(tempArr);
      setIsDeleteFileConfirm(false);
    }
  }, [isDeleteFileConfirm]);

  const handleDeleteChat = (id, type) => {
    // const res = dispatch(deleteChatHistory(id));
    // if (!res.payload) {
    //   return;
    // }
    // if (res.payload?.status === 200) {
    //   fetchChatHistory();
    // }
    setDeleteChatIndex(id);
    setIfOpenDeleteBox(true);
    setDeleteContent(type);
  };

  const handleDeleteFile = (index) => {
    setDeleteFileIndex(index);
    setIfOpenDeleteBox(true);
    setDeleteContent('file');
  };

  //Chat
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        chatHisRef.current &&
        !chatHisRef.current.contains(event.target) &&
        !deleteRef.current.contains(event.target) &&
        !ifOpenDeleteBox
      ) {
        setIsChatHistory(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [chatHisRef, setIsChatHistory, ifOpenDeleteBox]);
  //deletepopup
  useEffect(() => {
    function handleClickOutside(event) {
      if (deleteRef.current && !deleteRef.current.contains(event.target)) {
        setIfOpenDeleteBox(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [deleteRef, setIfOpenDeleteBox]);

  const handleChatTypeChange = (selectedOption) => {
    // Find the selected option's index in the chatTypes array
    const selectedIndex = chatTypes.findIndex((chatType) => chatType.title === selectedOption.value);

    // If the selected option exists in chatTypes, set the corresponding historyType
    if (selectedIndex !== -1) {
      setHistoryType(selectedIndex);
    }
  };

  // todo
  const [clearHistory, setClearHistory] = useState(false);

  const onClearChatHistory = () => {
    if (chatsHistory.length !== 0) {
      setClearHistory(true);
      setisClearAllChat(true);
      setIfOpenDeleteBox(true);
    }
  }

  const handleYesClearHistory = () => {
    setChatsHistroy([]);
    setClearHistory(!clearHistory);
  };
  return (
    <>
      <div className={`${isChatHistory ? 'block' : 'hidden'}`}>
        <div className="fixed top-0 bottom-0 right-0 w-[500px] bg-black z-[60] opacity-40"></div>
        <div
          ref={chatHisRef}
          className="absolute rounded-t-[10px] bg-white py-[20px] right-0 bottom-0 z-[70] w-[500px]"
          style={{ boxShadow: '0px 10px 30px 0px #3C425726', height:'calc(100vh - 30%)' }}
        // show={open}
        >
          <div className="pt-[8px] px-[20px] pb-[20px] text-[22px] font-medium text-darkBlue">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="gap-2 flex items-center">
                  <span>Chat History</span>
                </div>

                <div className="cursor-pointer chat-history bg-lightblue1 relative flex text-[12px] w-[165px] items-center gap-2 rounded-full py-[6px]">
                  <Select
                    id="history"
                    className="w-full"
                    components={{ Option: CustomOption, SingleValue, DropdownIndicator }}
                    options={chatTypes.map((chatType) => ({
                      value: chatType.title,
                      label: chatType.title,
                      icon: chatType.icon,
                      active: chatType.active,
                    }))}
                    defaultValue={{
                      value: chatTypes[0].title,
                      label: chatTypes[0].title,
                      icon: chatTypes[0].icon,
                      active: chatTypes[0].active,
                    }}
                    styles={customStyles}
                    onChange={handleChatTypeChange}
                  // menuIsOpen={true}
                  // onChange={handleChatTypeChange}
                  isSearchable={false}
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

              {/* todo */}
              {/* <button id="chatHistoryDelete" className="h-[30px] w-[30px] flex items-center justify-end cursor-pointer">
                <img src={DeleteIcon} />
              </button> */}
              <Tab.Panels as={Fragment}>
                <Tab.Panel className="px-[20px]" key="docchats">
                  {chatsHistory.map(
                    (item, index) =>
                      item.type === 'Doc chat' && (
                        <div className="border-b border-gray py-[8px]" onClick={() => handleChatSelection(item.messages)}>
                          <div className="flex items-center justify-between mb-[8px]">
                            <div className="flex items-center gap-2">
                              <div className="icon">
                                <img src={item.icon} />
                              </div>
                              <div className="text-[14px] font-medium cursor-pointer">
                                {item.type}
                              </div>
                            </div>
                            <div className="text-gray1">{item.datetime}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-gray1">{item.description}</div>
                            <CustomTooltip
                              maxWidth="430px"
                              place="top"
                              id="chatHistoryDelete"
                              content={`<div class="capitalize font-normal text-[12px] leading-[18px]" > Delete </div>`}
                            >
                              <button
                                id="chatHistoryDelete"
                                className="h-[30px] w-[30px] flex items-center justify-end cursor-pointer"
                                onClick={() => handleDeleteChat(index)}
                              >
                                <img src={DeleteIcon} />
                              </button>
                            </CustomTooltip>
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
              {/* todo */}
              <div className="flex justify-between items-center pr-[22px]">
                <div className="mx-[20px] border border-gray items-center flex rounded-md px-[9px] mr-[8px] py-[4px] flex-grow">
                  <img src={SearchIcon} />
                  {/* <InputField
                  className="block w-full rounded-md border-0 px-[9px] py-[7px] text-[12px] text-darkBlue placeholder:text-gray1 focus:outline-0"
                  name="search"
                  label=""
                  type="text"
                  placeholder="Search"
                  handleChange={setSearchChatHis}
                /> */}
                  <input
                    className="block w-full  rounded-md border-0 px-[9px] py-[7px] text-[14px] text-darkBlue placeholder:text-[#8C90A5] focus:outline-0"
                    name="search"
                    label=""
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearchChatHis(e.target.value)}
                  />
                </div>
                {/* todo */}
                <CustomTooltip
                  maxWidth="430px"
                  place="top"
                  id='clearAllHistory'
                  content={`<div class="capitalize font-normal text-[12px] leading-[18px]"> Clear all conversations </div>`}
                >

                  <div id='clearAllHistory' className={`relative ${chatsHistory.length ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => onClearChatHistory()}>
                    <img src={AllHistoryClear} />
                  </div>
                </CustomTooltip>
              </div>

              <div className="mt-[12px] px-[12px] max-h-[480px] overflow-y-auto">
                { isSkeleton ? ( <>
                  {Array.from({ length: 12 }, (_, index) => (
                    <div className="flex gap-[16px] px-[8px] items-center mb-[24px]">
                      <Skeleton height={40} width={40}  />
                      <div className='flex flex-col gap-[8px] item-center'>
                        <Skeleton height={20} width={404} />
                        <Skeleton height={20} width={200} />
                      </div>
                    </div>
                    ))}
                  </>) : ( <>
                {chatsHistory.length === 0 ? (

                  // <div className="text-gray1 text-center py-4">No data found</div>
                  <div className="text-center pt-[100px] block items-center justify-cente">
                    <div className="text-center flex items-center justify-center">
                      <img src={NoDataFound} />
                    </div>
                    <div className="text-[24px] text-darkBlue font-bold mt-[30px]">Sorry!</div>
                    <div className="text-[16px] text-gray1 font-[400]  mt-[8px]">We haven’t found any data.</div>
                  </div>
                ) : (
                  chatsHistory.map((item, index) => (
                    <>
                      <div className='px-[8px] hover:bg-[#F3F4F8] hover:rounded-[7px]'>
                        <div className="border-b border-gray py-[8px] selectText cursor-pointer" key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChatSelection(item);
                          }}>
                          <div className="flex items-center justify-between mb-[8px]">
                            <div className="flex items-center gap-2">
                              <div
                                className={
                                  lastSelectedChat && item.chat_id == lastSelectedChat
                                    ? 'block w-[41px] h-[18px] relative'
                                    : 'hidden'
                                }
                              >
                                <div
                                  className="w-[41px] h-[18px] left-0 top-0 absolute bg-indigo-950 rounded"
                                  style={{ background: '#19224C' }}
                                />
                                <div className="left-[6px] top-[3px] absolute text-white text-[10px] font-normal font-['DM Sans'] leading-3">
                                  Active
                                </div>
                              </div>
                              <div className="icon">
                                <Icons item={item} />
                              </div>
                              <div className="text-[14px] font-medium cursor-pointer max-h-[30px] max-w-[380px] overflow-hidden whitespace-nowrap text-ellipsis">
                                {item?.Type === 1 && item.chat_dict?.human_question}
                                {item?.Type === 2 && item.document_name}
                                {item?.Type === 3 && 'Web summary'}
                                {item?.Type === 4 && 'Youtube summary'}
                              </div>
                            </div>
                            <div className="text-[#8C90A5] text-[12px] lowercase whitespace-nowrap">
                              {getDateDisplay(new Date(item?.created_at))}
                              {/* {formatDistanceToNow(new Date(item?.created_at), { addSuffix: true, timeZone: 'Etc/UTC' })} */}
                              {/* {formatDistanceToNow(utcToZonedTime(new Date(item?.created_at), 'Asia/Kolkata'), {
                            addSuffix: true,
                          })} */}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div
                              className="text-gray1 max-h-[30px] max-w-[380px] overflow-hidden whitespace-nowrap text-ellipsis"
                            // onClick={() => handleChatSelection(item)}
                            >
                              {item.chat_dict?.ai_answer}
                            </div>
                            {lastSelectedChat && item.chat_id != lastSelectedChat && 
                            <CustomTooltip
                              maxWidth="430px"
                              place="top"
                              id={'chatHistoryDelete' + item?.id}
                              content={`<div class="font-normal text-[12px] leading-[18px]" > Delete conversations </div>`}
                            >
                              <button
                                id={'chatHistoryDelete' + item?.id}
                                className="h-[30px] w-[30px] flex items-center justify-end cursor-pointer"
                                onClick={(er) => {
                                  er.stopPropagation();
                                  handleDeleteChat(item?.id, item?.Type);
                                }}
                              >
                                <img src={DeleteIcon} />
                              </button>
                            </CustomTooltip>
                            }
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                )}
                </>) }

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
        setisClearAllChat={setisClearAllChat}
        setClearHistory={setClearHistory}
        deleteChatIndex={deleteChatIndex}
        fetchChatHistory={fetchChatHistoryList}
        deleteRef={deleteRef}
        isClearAllChat={isClearAllChat}
        alertMSG="Are you sure you want to delete all conversation?"
      />
    </>
  );
};
export default ChatHistory;
