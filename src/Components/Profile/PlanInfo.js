import React, { useState, useEffect } from "react";
import ArrowDown from '../../utils/Account/Profile/ArrowDown.svg';
import ArrowDownWhite from '../../utils/Account/Profile/ArrowDownWhite.svg'
import TickCircleIcon from '../../utils/Account/Profile/TickCircleIcon.svg'

const PlanInfo = ({ setSelectedPlan, setIsPaymentPopupBox, item }) => {

    const [isInfo, setIsInfo] = useState(item.active);

    const handlePlanInfo = () => {
        setIsInfo(!isInfo);
    }

    const handleBuying = () => {
        setSelectedPlan(item)
        setIsPaymentPopupBox(true);
        // console.log(selectedCard)
    }

    return (
        // selectedCard &&
        <div className={`mb-[16px] cursor-pointer ${isInfo ? "bg-primaryBlue text-white" : "plan text-primaryBlue "} rounded-[6px]`}>
            <div className="flex px-[25px] py-[20px] items-center justify-between gap-2 items-center">
                <div className="text-[16px]">{item.planTitle}</div>
                <div className="flex gap-2 items-center">
                    <div className="flex  items-center">
                        <span className="text-[16px] font-medium -mt-[10px]">
                            $
                        </span>
                        <span className="text-[24px] font-medium">
                            {item.planPrice}
                        </span>
                        <span className="text-[16px] font-medium -mb-[10px]">
                            /{item.planRenewal}
                        </span>
                    </div>
                    <div
                        className="cursor-pointer"
                        onClick={handlePlanInfo}
                    >
                        {isInfo ?
                            <img className="rotate-180" src={ArrowDownWhite} />
                            :
                            <img src={ArrowDown} />
                        }
                    </div>
                </div>
            </div>
            {isInfo &&
                <div className="border-t border-white px-[25px] py-[20px]">
                    <div className="text-white mb-[24px]">
                        <div className="flex text-[14px] font-medium items-center gap-2 rounded-full mb-[16px]">
                            <span className="h-[8px] w-[8px] bg-white rounded-full"></span>
                            Title Name
                        </div>
                        <div className="flex text-[12px] font-[500] items-center gap-2 rounded-full mb-[16px]">
                            <img src={TickCircleIcon} />
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        <div className="flex text-[12px] font-[500] items-start gap-2 rounded-full mb-[16px]">
                            <img src={TickCircleIcon} />
                            Lorem ipsum dolor sit amet consectetur. Etiam arcu est tortor consectetur sed sed magna.
                        </div>
                    </div>
                    <div className="text-white mb-[24px]">
                        <div className="flex text-[14px] font-medium items-center gap-2 rounded-full mb-[16px]">
                            <span className="h-[8px] w-[8px] bg-white rounded-full"></span>
                            Title Name
                        </div>
                        <div className="flex text-[12px] font-[500] items-center gap-2 rounded-full mb-[16px]">
                            <img src={TickCircleIcon} />
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        <div className="flex text-[12px] font-[500] items-start gap-2 rounded-full mb-[16px]">
                            <img src={TickCircleIcon} />
                            Lorem ipsum dolor sit amet consectetur. Etiam arcu est tortor consectetur sed sed magna.
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-white px-3 py-2 text-primaryBlue text-[16px] leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => handleBuying()}
                    >
                        Buy it
                    </button>
                </div>
            }
        </div>

    );
}
export default PlanInfo