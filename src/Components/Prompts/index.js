import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDefauPromptList, getPromptList } from '../../redux/reducers/userPromptSlice/UserPromptSlice';
import SearchIcon from '../../utils/Chat/Icons/SearchIcon.svg';
import SuggestionCloseIcon from '../../utils/Chat/Icons/SuggestionCloseIcon.svg';

import useDebounce from '../../utils/debounceSearch/useDebounce';
import { getToken } from '../../utils/localstorage';
import GeneralPrompt from './GeneralPrompt';
import UserPrompt from './UserPrompt';
// /';
const promptTab = [
  { id: 1, name: 'General' },
  { id: 2, name: 'My' },
];

const Prompts = ({ setIsViewPrompts }) => {
  const TOKEN = getToken();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  const [generalPromptList, setGeneralPromptList] = useState([]);
  const [promptList, setPromptList] = useState([]);
  const debouncedSearch = useDebounce(search, 1000);
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const fetchGeneralPrompts = async () => {
    const res = await dispatch(
      getDefauPromptList({
        search: search,
      })
    );

    if (!res.payload) {
      return;
    }

    if (res.payload.status === 200) {
      setGeneralPromptList(res.payload?.Result);
      // setTotalData(res.payload?.totalCount);
      // setIsLoading(false);
    }
  };
  const fetchprompts = async () => {
    const res = await dispatch(getPromptList());

    if (!res.payload) {
      return;
    }

    if (res.payload.status === 200) {
      setPromptList(res.payload?.Result);
      // setTotalData(res.payload?.totalCount);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (TOKEN) {
      fetchprompts();
    }
  }, [TOKEN]);

  useEffect(() => {
    if (TOKEN) {
      fetchGeneralPrompts();
    }
  }, [TOKEN, debouncedSearch]);

  const handleCloseSettingPrompt = () => {
    // Add your logic here
  };

  const handleSendMessage = (e, prompt, type) => {
    // Add your logic here
  };

  const handleUsePrompt = (item) => {
    // Add your logic here
  };
  var isViewPrompts = true;
  return (
    <div className="px-[20px] py-[12px] relative bg-white mt-[6px]">
      {!isViewPrompts ? (
        <div className="bg-lightblue1 px-[66px] py-[16px] flex flex-col text-center rounded-[6px] relative z-50">
          <div className="text-[14px] mb-[16px]">Find useful prompts from our prompts community.</div>
          <div className="text-[14px] font-bold text-primaryBlue cursor-pointer" onClick={() => setIsViewPrompts(true)}>
            View Prompts
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray p-[8] rounded-[6px] relative z-50">
          <div className="flex gap-2 items-center">
            <div className="border border-gray inline-flex rounded-[4px] h-[32px]">
              {promptTab.map((tab, index) => (
                <div
                  key={tab.id}
                  className={`flex-1 whitespace-nowrap border p-[7px] -m-[1px] text-[12px] font-medium focus:outline-0 cursor-pointer ${
                    activeTab === index
                      ? 'border-primaryBlue text-black rounded-l-[4px]'
                      : 'border-transparent text-gray1'
                  }`}
                  onClick={() => handleTabChange(index)}
                >
                  {tab.name}
                </div>
              ))}
            </div>
            <div className="border border-gray items-center flex w-full rounded-md px-[9px]">
              <img src={SearchIcon} alt="Search Icon" />
              <input
                className="block w-full rounded-md border-0 px-[9px] py-[7px] text-[12px] text-darkBlue placeholder:text-gray1 focus:outline-0"
                name="search"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="absolute -top-[10] -right-[10px] cursor-pointer" onClick={() => setIsViewPrompts(false)}>
              <img src={SuggestionCloseIcon} alt="Close Icon" />
            </div>
          </div>
          <div className="grid">
            {activeTab === 0 && (
              <div className="grid grid-cols-3 gap-2 pt-[8px]">
                <GeneralPrompt generalPromptList={generalPromptList} />
              </div>
            )}
            {activeTab === 1 && (
              <div className="grid grid-cols-3 gap-2 pt-[8px]">
                <UserPrompt promptList={promptList} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Prompts;
