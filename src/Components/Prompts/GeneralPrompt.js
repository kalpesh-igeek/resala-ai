import React from 'react';

const GeneralPrompt = ({ generalPromptList }) => {
  return (
    <>
      {generalPromptList.map((item) =>
        item.length === 0 ? (
          <div className="suggestion flex flex-col justify-end rounded-[6px] text-darkgray1 bg-lightblue1 p-[9px] text-[14px] cursor-pointer hover:bg-lightblue3">
            <div className="pb-[8px]">
              <img src={item.icon} />
            </div>
            <div className="flex items-center justify-between">No Prompt</div>
          </div>
        ) : (
          <div
            // onClick={(e) => {
            //   handleSendMessage(e, item?.prompt, 'auto');
            //   setIsViewPrompts(false);
            //   setIsTypewriterDone(true);
            // }}
            className="suggestion flex flex-col justify-end rounded-[6px] text-darkgray1 bg-lightblue1 p-[9px] text-[14px] cursor-pointer hover:bg-lightblue3"
          >
            <div className="pb-[8px]">
              <img src={item.icon} />
            </div>
            <div className="flex items-center justify-between">
              <span className="w-full text-[14px] font-medium">{item?.name}</span>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default GeneralPrompt;
