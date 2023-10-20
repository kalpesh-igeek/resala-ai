import React, { useState } from 'react';
import Close from '../../utils/MainScreen/Icons/Close.svg'
import SuccessIcon from "../../utils/Account/Profile/SuccessIcon.svg";
import AddCircle from '../../utils/Chat/Icons/AddCircle.svg'
import { RadioGroup } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PlanSelection({ setSelectedPlan, plans, isPlansPopupBox, setIsPlanPopupBox, setIsCardsPopupBox, setNewPlanSelect, newPlanSelect }) {
    
    const [newPlans, setNewPlans] = useState(plans);

    const handleBuyPlan = () => {
        setSelectedPlan(newPlanSelect);
        setIsPlanPopupBox(false);
        setIsCardsPopupBox(true);
    }

    const handlePopupBox = () => {
        setIsPlanPopupBox(false);
    }

    return (
        <div className={`${isPlansPopupBox ? "block" : "hidden"}`}>
            <div className="fixed top-0 bottom-0 right-0 w-[500px] bg-black z-[60] opacity-40"></div>
            <div
                className='fixed rounded-[10px] bg-white p-[20px] right-[20px] top-[50%] -translate-y-2/4 z-[70] w-[460px]'
                style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
                // show={open}
            >
                <div className="pt-[8px] pb-[20px] text-[22px] font-medium text-darkBlue">
                    <div className='flex items-center justify-between'>
                        <div className='gap-2 flex items-center'>
                            <span className='text-darkBlue'>Select Plan</span>
                        </div>
                        <div className='cursor-pointer -mt-[30px]' onClick={() => handlePopupBox()}>
                            <img src={Close} />
                        </div>
                    </div>
                </div>
                <RadioGroup value={newPlanSelect} onChange={setNewPlanSelect}>
                    {newPlans.map((item) =>
                        <RadioGroup.Option
                            name="action"
                            key={item.number}
                            value={item}
                            // onClick={() => setNewPlanSelect(item)}
                            className={({ active, checked }) =>
                                classNames(
                                    'cursor-pointer',
                                    active || checked ? 'active bg-primaryBlue text-white' : 'bg-lightblue1 text-primaryBlue',
                                    'flex px-[25px] py-[20px] items-center justify-between gap-2 rounded-[6px] mb-[16px] hover:!bg-primaryBlue hover:!text-white'
                                )
                            }
                        >
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
                            </div>
                        </RadioGroup.Option>

                    )}
                </RadioGroup>
                <div className="flex gap-2 items-center">
                    <button
                        className="w-full rounded-md bg-primaryBlue px-1 py-[16px] text-[14px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                        onClick={() => handleBuyPlan()}
                    >
                        Buy plan
                    </button>
                </div>
            </div>
        </div>
    );
}