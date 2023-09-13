import React, { useState } from 'react';
import Close from '../../utils/MainScreen/Icons/Close.svg';
import SuccessIcon from '../../utils/Account/Profile/SuccessIcon.svg';
import InputField from '../InputField';

export default function AddCardPopup({ selectedPlan, isPaymentPopupBox, setIsPaymentPopupBox }) {
  const [isPaymentSuccess, setPaymentSucess] = useState(false);

  const handlePayOption = () => {
    setIsPaymentPopupBox(false);
    setPaymentSucess(false);
  };

  const handleSubmit = () => {
    setPaymentSucess(true);
  };

  return (
    <div className={`${isPaymentPopupBox ? 'block' : 'hidden'}`}>
      <div className="fixed top-0 bottom-0 right-0 w-[500px] bg-black z-[60] opacity-40"></div>
      <div
        className="fixed rounded-[10px] bg-white p-[20px] right-[20px] top-[50%] -translate-y-2/4 z-[70] w-[460px]"
        style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
        // show={open}
      >
        {isPaymentSuccess ? (
          <>
            <div className="pt-[8px] pb-[20px] text-[22px] font-medium text-darkBlue">
              <div className="flex items-center justify-end">
                <div className="cursor-pointer -mb-[30px]" onClick={() => handlePayOption(false)}>
                  <img src={Close} />
                </div>
              </div>
            </div>
            <div className="py-[10px] px-[20px] flex flex-col justify-center">
              <div className="flex items-center justify-center gap-2 mb-[50px]">
                <img src={SuccessIcon} alt="SuccessIcon" className="cursor-pointer h-[64px] w-[64px]" />
              </div>
              <div className="text-[22px] flex justify-center mb-[8px] font-bold">Payment Successful !</div>
              <div className="flex justify-center px-[10px] text-center text-gray2 flex-col text-[12px] gap-2">
                Congratulation! you’ve successfully activated premium plan.
              </div>
            </div>
          </>
        ) : (
          <>
            {selectedPlan && (
              <>
                <div className="pt-[8px] pb-[20px] text-[22px] font-medium text-darkBlue">
                  <div className="flex items-center justify-between mb-[21px]">
                    <div className="gap-2 flex items-center">
                      <span className="text-darkblue">{selectedPlan.planTitle}</span>
                    </div>
                    <div className="cursor-pointer -mt-[30px]" onClick={() => handlePayOption(false)}>
                      <img src={Close} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="gap-2 flex items-center text-[16px] text-darkBlue">
                      <span className="text-darkblue">Total: </span>
                    </div>
                    <div className="flex text-primaryBlue items-center">
                      <span className="text-[14px] font-medium -mt-[10px]">$</span>
                      <span className="text-[24px] font-medium">{selectedPlan.planPrice}</span>
                      <span className="text-[14px] font-medium -mb-[10px]">/{selectedPlan.planRenewal}</span>
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
                  <div className="flex items-center mb-[24px]">
                    <input
                      id="savecard"
                      name="savecard"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="savecard" className="ml-3 min-w-0 flex-1 text-[14px] text-gray1">
                      Save Card details for next payment
                    </label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      className="w-full rounded-md bg-primaryBlue px-1 py-[16px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                      onClick={() => handleSubmit()}
                    >
                      Pay ${selectedPlan.planPrice}
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
