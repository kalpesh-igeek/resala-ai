import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TypeWriterEffect from 'react-typewriter-effect';
import SaveTemplatePopup from '../../../Components/SaveTemplatePopup/SaveTemplatePopup';

import SaveTemplate from '../../../utils/SavedTemplates/Icons/SaveTemplate.svg';
import ArrowDown from '../../../utils/MainScreen/Icons/ArrowDown.svg';
import RequestIcon from '../../../utils/MainScreen/Tab/RequestIcon.svg';
import AcknowledgeIcon from '../../../utils/MainScreen/Tab/AcknowledgeIcon.svg';
import DeclineIcon from '../../../utils/MainScreen/Tab/DeclineIcon.svg';

import Dropdown from 'react-dropdown';

const ideasList = [
  {
    icon: RequestIcon,
    type: 'Request',
    desc: 'Can you please clarify this email to me as what you are actually requesting for me to do with this?',
  },
  {
    icon: AcknowledgeIcon,
    type: 'Acknowledge',
    desc: 'Can you please clarify this email to me as what you are actually requesting for me to do with this?',
  },
  {
    icon: DeclineIcon,
    type: 'Decline',
    desc: 'Can you please clarify this email to me as what you are actually requesting for me to do with this?',
  },
];

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'straight', label: 'Straight' },
  { value: 'confident', label: 'Confident' },
  { value: 'friendly', label: 'Friendly' },
];

const QuickReply = ({
  TemplatesIcon,
  requestedText,
  handleInputChange,
  handleAudioInput,
  MicrophoneIcon,
  speechText,
  handleSpeechInput,
  handleSendMessage,
  speechLength,
  SendIcon,
  setSaveTemplateBox,
  saveTemplateBox,
  resultText,
  myRef,
  outputlanguages,
  defaultLanguage,
  selectedTone,
  setSelectionTone,
}) => {
  const navigate = useNavigate();

  const [isReplies, setIsReplies] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState();

  const handlePlanInfo = () => {
    setIsReplies(!isReplies);
  };

  console.log(selectedTone);

  const defaultTone = tones[0];

  const TypeWriter = () => {
    return (
      <TypeWriterEffect startDelay={100} cursorColor="black" text={resultText} typeSpeed={20} scrollArea={myRef} />
    );
  };

  // console.log(selectedIdea);

  return (
    <>
      <div className="px-[20px] py-[12px] relative">
        <div className="flex gap-2 right-[20px] -top-[31px] absolute z-30">
          <Dropdown
            className="language flex gap-1 items-center justify-center rounded-full border border-primaryBlue px-[6px] py-[3px] bg-white text-[9px] font-medium text-primaryBlue cursor-pointer"
            options={outputlanguages}
            value={defaultLanguage}
            arrowClosed={<img className="w-[10px] h-[10px]" src={ArrowDown} />}
            arrowOpen={<img className="w-[10px] h-[10px] rotate-180" src={ArrowDown} />}
          />
          <Dropdown
            className="language flex gap-1 items-center justify-center rounded-full border border-primaryBlue px-[6px] py-[3px] bg-white text-[9px] font-medium text-primaryBlue cursor-pointer"
            options={tones}
            value={defaultTone}
            arrowClosed={<img className="w-[10px] h-[10px]" src={ArrowDown} />}
            arrowOpen={<img className="w-[10px] h-[10px] rotate-180" src={ArrowDown} />}
          />

          <button
            className="flex gap-1 items-center w-full rounded-md bg-white text-[12px] font-medium text-primaryBlue"
            onClick={() => {
              navigate('/savedtemplates');
            }}
          >
            <img src={TemplatesIcon} />
            <span className="text-primaryBlue text-[14px]">Templates</span>
          </button>
        </div>
        <div className="col-span-full mb-[11px]">
          <label for="input" className="block text-[10px] font-bold leading-6 text-gray1">
            SENDER'S INTENT
          </label>
          <div className="mt-2">
            <textarea
              id="requestedText"
              name="requestedText"
              rows="7"
              value={requestedText}
              onChange={(e) => handleInputChange(e)}
              placeholder="Lorem ipsum dolor sit amet consectetur."
              className="text-[10px] border-gray block w-full rounded-md border p-1.5"
            />
          </div>
        </div>
        <div className="mb-[20px]">
          <div className="flex px-[10px] py-[12px] bg-lightblue1 items-center justify-between gap-2">
            <div className="cursor-pointer w-full" onClick={handlePlanInfo}>
              IDEAS FOR REPLY
            </div>
            <img src={ArrowDown} onClick={handlePlanInfo} />
          </div>
          {isReplies && (
            <div className="flex flex-col gap-2 border-t border-white py-[10px]">
              {ideasList.map((idea) => (
                <div
                  className="flex text-[14px] p-[15px] bg-lightblue1 items-start gap-2 rounded-[6px] cursor-pointer"
                  onClick={() => setSelectedIdea(idea)}
                >
                  <img src={idea.icon} />
                  <div className="block">
                    <span className="font-bold mr-[5px]">{idea.type}</span>
                    {idea.desc}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex relative items-top gap-4 border border-gray p-[10px] mt-[10px] mb-[20px]">
          <div
            className="flex items-center justify-center w-[24px] h-[24px] rounded-full cursor-pointer"
            onClick={() => handleAudioInput()}
            style={{
              boxShadow: '0px 0px 10px 0px #00000026',
            }}
          >
            <img src={MicrophoneIcon} />
          </div>
          <textarea
            id="chatText"
            name="chatText"
            rows="1"
            value={speechText}
            placeholder="Tell me what to write for you"
            className="text-[12px] pt-[5px] block w-full rounded-0 focus:outline-0"
            onChange={(e) => handleSpeechInput(e)}
          />
          <button
            className="absolute top-[12px] right-[12px] w-[20px] h-[20px] cursor-pointer focus:outline-0"
            onClick={(e) => handleSendMessage(e, speechText)}
            type="submit"
          >
            <img src={SendIcon} />
          </button>
        </div>
        <div className="pb-[20px]">
          <div className="flex justify-between item-center">
            <label for="input" className="block text-[10px] font-bold leading-6 text-gray1 whitespace-nowrap">
              REPLY PREVIEW
            </label>
            <div>
              <button
                className="flex gap-1 items-center w-full rounded-md bg-white text-[12px] font-medium text-primaryBlue"
                onClick={() => setSaveTemplateBox(true)}
              >
                <span className="text-primaryBlue">Save Template</span>
                <img src={SaveTemplate} />
              </button>
              <SaveTemplatePopup setSaveTemplateBox={setSaveTemplateBox} saveTemplateBox={saveTemplateBox} />
            </div>
          </div>
          {selectedIdea && (
            <div className="flex text-[14px] p-[15px] bg-lightblue1 items-start gap-2 rounded-t-[6px] cursor-pointer">
              <img src={selectedIdea.icon} />
              <div className="block">
                <span className="font-bold mr-[5px]">{selectedIdea.type}</span>
                {selectedIdea.desc}
              </div>
            </div>
          )}
          <div
            contentEditable="true"
            id="draftPreview"
            name="draftPreview"
            rows="22"
            placeholder="Lorem ipsum dolor sit amet consectetur."
            className={`text-[10px] border-gray block h-[306px] w-full ${
              selectedIdea ? 'rounded-b-[6px]' : 'rounded-md'
            } border p-1.5 focus:outline-0`}
          >
            <TypeWriter />
          </div>
        </div>
        <div className="mt-1">
          <div className="flex gap-2 items-center">
            <button
              className="w-full rounded-md bg-white px-1 py-[10px] text-[12px] font-medium text-darkBlue border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
              disabled={resultText !== '' ? '' : 'disabled'}
            >
              Regenerate
            </button>
            <button
              className="w-full rounded-md bg-white px-1 py-[10px] text-[12px] font-medium text-darkBlue border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
              disabled={resultText !== '' ? '' : 'disabled'}
            >
              Copy
            </button>
            <button
              className="w-full rounded-md bg-primaryBlue px-1 py-[10px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
              disabled={resultText !== '' ? '' : 'disabled'}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuickReply;
