import React, { useState, useEffect } from 'react';
import Close from '../utils/MainScreen/Icons/Close.svg';
import { RadioGroup } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { respondeLanguage } from '../redux/reducers/chatSlice/ChatSlice';

const outputlanguages = [
  { title: 'English', active: true },
  { title: 'Arabic', active: false },
  { title: 'French', active: false },
  { title: 'Spanish', active: false },
  { title: 'Thai', active: false },
  { title: 'Hindi', active: false },
  { title: 'German', active: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const UsingPromptInputBox = ({
  handleSendMessage,
  isUsePrompt,
  setIsTypewriterDone,
  setIsViewPrompts,
  setIsUsePrompt,
  SuggestionCloseIcon,
  selectedPrompt,
  SendIcon,
}) => {
  // console.log('selectedPrompt', selectedPrompt);
  // const dispatch = useDispatch();
  const [activeLanguage, setAciveLanguage] = useState(outputlanguages);
  const [popupBox, setPopupBox] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState(outputlanguages[0]);
  const [newPrompt, setNewPrompt] = useState(selectedPrompt?.prompt || '');
  // const [outputLanguages, setOutputLanguage] = useState([]);
  var arr = selectedPrompt.prompt?.replace(/\[.*?\]/g, '');

  // useEffect(() => {
  //     setAciveLanguage();
  // }, [activeLanguage])
  // const fetchOuputLanguage = async () => {
  //   const res = await dispatch(respondeLanguage());

  //   if (!res.payload) {
  //     return;
  //   }

  //   if (res.payload.status === 200) {
  //     setOutputLanguage(res.payload?.Result);
  //     // setTotalData(res.payload?.totalCount);
  //     // setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchOuputLanguage();
  // }, []);

  const handleActiveLanguage = (title, index) => {
    let tempArr = Array.from(activeLanguage);
    tempArr[index].active = true;
    setAciveLanguage(tempArr);
    // setAciveLanguage([...activeLanguage, lang]);
    setPopupBox(false);
  };

  // const handleInputLanguage = (e, index, item) => {
  //     let tempArr = Array.from(selectedItems)
  //     tempArr[2].title = item.title
  //     setNewPrompt(tempArr)
  // }

  const handlePromptInput = (e) => {
    setNewPrompt(e.target.value);
  };

  return (
    <div className={`${isUsePrompt ? 'block' : 'hidden'}`}>
      <div
        className="absolute rounded-[10px] bg-white p-[20px] right-0 bottom-0 z-10 w-[500px]"
        style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
        // show={open}
      >
        <div className="pt-[8px] text-[22px] font-medium text-darkBlue">
          <div className="flex items-center justify-between">
            <div className="gap-2 flex items-center">
              <span>{selectedPrompt.name}</span>
            </div>
            <div className="cursor-pointer -mt-[30px]" onClick={() => setIsUsePrompt(false)}>
              <img src={Close} />
            </div>
          </div>
        </div>
        <div className="col-span-full mb-[12px]">
          <div className="text-[14px] text-gray1 mb-[8px]">{selectedPrompt.description}</div>
        </div>
        <div className="mb-[8px]">
          <div className="text-[12px] text-gray1 font-medium mb-[8px]">OUTPUT LANGUAGE</div>
          <div className="promptLanguage flex gap-2 items-center">
            <RadioGroup value={selectedLanguage} onChange={setSelectedLanguage} className="flex items-center gap-2">
              <RadioGroup.Option
                name="language"
                key="Auto"
                value="Auto"
                // onClick={() => handleInputLanguage(0, "Auto")}
                className={({ active, checked }) =>
                  classNames(
                    'cursor-pointer text-darkBlue',
                    active || checked ? 'border-lightblue bg-lightblue1' : '',
                    'w-[87px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                  )
                }
              >
                <RadioGroup.Label as="span">Auto</RadioGroup.Label>
              </RadioGroup.Option>
              {activeLanguage.map(
                (item, index) =>
                  item.active && (
                    <RadioGroup.Option
                      name="language"
                      key={item.title}
                      value={item}
                      // onClick={(e) => handleInputLanguage(e, index, item)}
                      className={({ active, checked }) =>
                        classNames(
                          'cursor-pointer text-darkBlue',
                          active || checked ? 'border-lightblue bg-lightblue1' : '',
                          'w-[87px] h-[32px] group relative flex items-center justify-center rounded-md border border-gray px-1 py-2 text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                        )
                      }
                    >
                      <RadioGroup.Label as="span" className="text-[12px]">
                        {item.title}
                      </RadioGroup.Label>
                      <span className="absolute -right-[7px] -top-[8px] h-[14px] w-[14px]">
                        <img src={SuggestionCloseIcon} />
                      </span>
                    </RadioGroup.Option>
                  )
              )}
            </RadioGroup>
            <div className="relative">
              <div
                className="cursor-pointer w-[80px] flex justify-center rounded-md bg-white px-1 py-2 text-[12px] font-medium text-primaryBlue border border-gray hover:!bg-lightblue1 hover:!border-lightblue"
                onClick={() => setPopupBox(!popupBox)}
              >
                Add...
              </div>
              <div
                className={`w-[160] absolute bottom-[100%] bg-white p-[8px] rounded-[8px] ${
                  popupBox ? 'block' : 'hidden'
                }`}
                style={{
                  boxShadow: '0px 2px 20px 0px #00000026',
                }}
              >
                {outputlanguages.map((data, index) => (
                  <div
                    className="p-[8px] text-[10px] rounded-[4px] cursor-pointer hover:bg-lightgray1"
                    onClick={() => handleActiveLanguage(data.title, index)}
                  >
                    {data.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <textarea
            id="promptText"
            name="promptText"
            rows="6"
            value={newPrompt}
            placeholder="Topic or Keyword"
            className="text-[12px] border-gray block w-full rounded-lg border p-[12px]"
            onChange={(e) => handlePromptInput(e)}
            style={{ padding: '10px 35px 10px 10px', resize: 'none' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e, newPrompt ? newPrompt : selectedPrompt.prompt, selectedLanguage.title);
                setNewPrompt('');
                setIsViewPrompts(false);
                setIsTypewriterDone(true);
              }
            }}
          />
          <div
            className="absolute top-[12px] right-[12px] w-[20px] h-[20px] cursor-pointer"
            onClick={(e) => {
              handleSendMessage(e, newPrompt ? newPrompt : selectedPrompt.prompt, selectedLanguage.title);
              setNewPrompt('');
              setIsViewPrompts(false);
              setIsTypewriterDone(true);
            }}
          >
            <img src={SendIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsingPromptInputBox;
