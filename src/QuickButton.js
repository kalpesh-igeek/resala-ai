import React from "react";
import ResalaIcon from './utils/ResalaIcon.svg'

const QuickButton = ({handleSidebar}) => {
    return (
        <div 
            id="quickButton"
            className="hidden"
        >
            <button
                className="flex items-center gap-2 rounded-full border border-primaryBlue bg-white px-[10px] py-[10px] text-[12px] font-medium text-primaryBlue hover:opacity-50"
                onClick={handleSidebar}
            >
                <img src={ResalaIcon} />
                Quick reply
            </button>
        </div>
    );
}
export default QuickButton