import React, { useState } from 'react';
import Close from '../../utils/MainScreen/Icons/Close.svg'
import SuccessIcon from "../../utils/Account/Profile/SuccessIcon.svg";
import AddCircle from '../../utils/Chat/Icons/AddCircle.svg'
import { RadioGroup } from '@headlessui/react'
import InputField from '../InputField';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CardsList({ setIsUpgrad, isAddCard, setAddCard, cardList, setSelectedCard, isCardsPopupBox, setIsCardsPopupBox }) {

    const [isAddCardSuccess, setAddCardSuccess] = useState(false);
    const [newCardSelect, setNewCardSelect] = useState(cardList[0]);


    const handleCardPopup = () => {
        setIsCardsPopupBox(false);
        setAddCardSuccess(false);
        setAddCard(false);
    }

    const handleAddOption = () => {
        setAddCardSuccess(true);
        setIsUpgrad(false);
    }

    const handleNewCard = () => {
        setAddCard(true);
    }

    const handleCardSelection = () => {
        setSelectedCard(newCardSelect);
        setIsUpgrad(true);
        setIsCardsPopupBox(false);
    }

    return (
        <div className={`${isCardsPopupBox ? "block" : "hidden"}`}>
            <div className="fixed top-0 bottom-0 right-0 w-[500px] bg-black z-[60] opacity-40"></div>
            <div
                className='fixed rounded-[10px] bg-white p-[20px] right-[20px] top-[50%] -translate-y-2/4 z-[70] w-[460px]'
                style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
                // show={open}
            >
                {isAddCardSuccess ?
                    <>
                        <div className="pt-[8px] pb-[20px] text-[22px] font-medium text-darkBlue">
                            <div className='flex items-center justify-end'>
                                <div className='cursor-pointer -mb-[30px]' onClick={() => handleCardPopup(false)}>
                                    <img src={Close} />
                                </div>
                            </div>
                        </div>
                        <div className="py-[10px] px-[20px] flex flex-col justify-center">
                            <div className="flex items-center justify-center gap-2 mb-[50px]">
                                <img
                                    src={SuccessIcon}
                                    alt="SuccessIcon"
                                    className="cursor-pointer h-[64px] w-[64px]"
                                />
                            </div>
                            <div className="text-[22px] flex justify-center mb-[8px] font-bold">
                                Card added successfully !
                            </div>
                            <div className="flex justify-center px-[10px] text-center text-gray2 flex-col text-[12px] gap-2">
                                Congratulation! you’ve successfully addded a new card.
                            </div>
                        </div>
                    </>
                    :
                    <>
                        {
                            cardList &&
                            !isAddCard &&
                            <>
                                <div className="pt-[8px] pb-[20px] text-[22px] font-medium text-darkBlue">
                                    <div className='flex items-center justify-between'>
                                        <div className='gap-2 flex items-center'>
                                            <span className='text-darkblue'>Select card</span>
                                        </div>
                                        <div className='cursor-pointer -mt-[30px]' onClick={() => handleCardPopup(false)}>
                                            <img src={Close} />
                                        </div>
                                    </div>
                                </div>
                                <RadioGroup value={newCardSelect} onChange={setNewCardSelect}>
                                    <div className='flex flex-col gap-4'>
                                        {cardList.map((card) => (
                                            <>
                                                <div className="flex items-center justify-between border border-gray pt-[12px] rounded-[6px] px-[15px]">
                                                    <div className="flex flex-col text-[14px] gap-3">
                                                        <div className="text-darkBlue">{card.nameoncard}</div>
                                                        <div className="flex">
                                                            <span className="text-gray1">{card.expdate}</span>
                                                        </div>
                                                        <div className="flex mb-[16px]">
                                                            <span className="text-gray1">{card.number}</span>
                                                        </div>
                                                    </div>
                                                    <RadioGroup.Option
                                                        name="action"
                                                        key={card.number}
                                                        value={card}
                                                        // onClick={() => handleRenewalChoice(card.name)}
                                                        className={({ active, checked }) =>
                                                            classNames(
                                                                'cursor-pointer text-darkBlue',
                                                                active || checked ? 'active' : '',
                                                                'w-[20px] h-[20px] group relative flex items-center justify-center rounded-full border border-primaryBlue text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                                                            )
                                                        }
                                                    >
                                                        <RadioGroup.Label as="span">
                                                            <div className='dot bg-primaryBlue h-[12px] w-[12px] rounded-full'></div>
                                                        </RadioGroup.Label>
                                                    </RadioGroup.Option>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </RadioGroup>
                                <div className="flex justify-end">
                                    <button
                                        className="flex gap-1 items-center rounded-md bg-white text-[12px] font-medium text-primaryBlue py-[16px]"
                                        onClick={() => handleNewCard()}
                                    >
                                        <img src={AddCircle} />
                                        <span className="text-primaryBlue">New card</span>
                                    </button>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <button
                                        className="w-full rounded-md bg-primaryBlue px-1 py-[16px] text-[14px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                                        onClick={() => handleCardSelection()}
                                    >
                                        Select
                                    </button>
                                </div>
                            </>
                        }
                        {
                            isAddCard &&
                            <>
                                <div className="pt-[8px] pb-[20px] text-[22px] font-medium text-darkBlue">
                                    <div className='flex items-center justify-between'>
                                        <div className='gap-2 flex items-center'>
                                            <span className='text-darkblue'>Card Details</span>
                                        </div>
                                        <div className='cursor-pointer -mt-[30px]' onClick={() => handleCardPopup(false)}>
                                            <img src={Close} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <InputField
                                        className="block w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray2"
                                        name="cardnumber"
                                        label="Card number"
                                        type="text"
                                        placeholder=""
                                    />
                                    <div className="w-full flex gap-2 items-center justify-center">
                                        <InputField
                                            className="w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray2"
                                            name="expdate"
                                            label="Exp. MM/YYYY"
                                            type="text"
                                            placeholder=""
                                        />
                                        <InputField
                                            className="w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray2"
                                            name="cvv"
                                            label="CVV"
                                            type="text"
                                            placeholder=""
                                        />
                                    </div>
                                    <InputField
                                        className="block w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[12px] cursor-text text-gray2 empty:text-gray2"
                                        name="holdername"
                                        label="Cardholder’s name"
                                        type="text"
                                        placeholder=""
                                    />
                                    <div className="flex gap-2 items-center">
                                        <button
                                            className="w-full rounded-md bg-primaryBlue px-1 py-[16px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                                            onClick={() => handleAddOption()}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </>
                        }
                    </>
                }
            </div>
        </div>
    );

}