import React from 'react';
import ResalaIcon from './utils/ResalaIcon.svg';

const QuickButton = ({ handleSidebar }) => {
  return (
    <div id="quickButton" className="hidden" style={{zIndex:'9999999'}}>
      <div className="flex items-center gap-2 rounded-full border border-primaryBlue bg-white px-[8px] py-[6px] text-[14px] font-medium text-darkBlue cursor-pointer"
        onClick={() => handleSidebar('quickreply')}>
          <div>
            <img className="w-[24px] h-[24px]" src={ResalaIcon} />
          </div>
          <div>
            Quick Reply
          </div>
      </div>
    </div>
  );
};
export default QuickButton;
