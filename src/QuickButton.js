import React from 'react';
import ResalaIcon from './utils/ResalaIcon.svg';

const QuickButton = ({ handleSidebar }) => {
  return (
    <div id="quickButton" className="hidden">
      <button
        className="flex items-center gap-2 rounded-full border border-primaryBlue bg-white px-[8px] py-[6px] text-[14px] font-medium text-darkBlue"
        onClick={() => handleSidebar('quickreply')}
      >
        <img className="w-[24px] h-[24px]" src={ResalaIcon} />
        Quick Reply
      </button>
    </div>
  );
};
export default QuickButton;
