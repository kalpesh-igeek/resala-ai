import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import PlanInfo from '../../Components/Profile/PlanInfo';
import BuyPlan from '../../Components/Profile/BuyPlan';
import CardsList from '../../Components/Profile/CardsList';
import PlanSelection from '../../Components/Profile/PlanSelection';

import ArrowLeft from '../../utils/SavedTemplates/Icons/ArrowLeft.svg';
import Close from '../../utils/MainScreen/Icons/Close.svg';
import AddCircle from '../../utils/Chat/Icons/AddCircle.svg';
import CrossArrow from '../../utils/Account/Profile/CrossArrow.svg';
import { RadioGroup } from '@headlessui/react';

const cards = [
  {
    number: 'XXXX XXXX XXXX 2345',
    expdate: 'July - 2023',
    cvv: '123',
    nameoncard: 'Vatsal Sonani',
    default: true,
  },
  {
    number: 'XXXX XXXX XXXX 5432',
    expdate: 'July - 2028',
    cvv: '123',
    nameoncard: 'Kiran Gadhiya',
    default: false,
  },
];

const durations = [{ name: 'Monthly' }, { name: 'Yearly' }];

const monthlyPlans = [
  {
    planTitle: 'Free Plan',
    planPrice: '00',
    planRenewal: 'mo',
    active: false,
  },
  {
    planTitle: 'Basic Plan',
    planPrice: '10',
    planRenewal: 'mo',
    active: false,
  },
  {
    planTitle: 'Standard Plan',
    planPrice: '20',
    planRenewal: 'mo',
    active: false,
  },
  {
    planTitle: 'Premium Plan',
    planPrice: '40',
    planRenewal: 'mo',
    active: true,
  },
];
const yearlyPlans = [
  {
    planTitle: 'Free Plan',
    planPrice: '00',
    planRenewal: 'yr',
    active: false,
  },
  {
    planTitle: 'Basic Plan',
    planPrice: '100',
    planRenewal: 'yr',
    active: false,
  },
  {
    planTitle: 'Standard Plan',
    planPrice: '200',
    planRenewal: 'yr',
    active: false,
  },
  {
    planTitle: 'Premium Plan',
    planPrice: '400',
    planRenewal: 'yr',
    active: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Billings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedUser, setLoggedUser] = useState(location.state?.loggedUser);

  const handleClose = () => {
    // setIsOpen(false);
    // handleSidebar();
  };

  const [cardList, setCardList] = useState(cards);
  const [isPaymentPopupBox, setIsPaymentPopupBox] = useState(false);
  const [isCardsPopupBox, setIsCardsPopupBox] = useState(false);
  const [isPlansPopupBox, setIsPlanPopupBox] = useState(false);
  const [plans, setPlans] = useState(monthlyPlans);
  const [currentRenewal, setCurrentRenewal] = useState(durations[0]);
  const [selectedPlan, setSelectedPlan] = useState(monthlyPlans[0]);
  const [newPlanSelect, setNewPlanSelect] = useState(selectedPlan);
  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [isAddCard, setAddCard] = useState(false);
  const [isUpgrad, setIsUpgrad] = useState();
  // const [isBuying, setIsBuying] = useState();

  const handleRenewalChoice = (item) => {
    if (item === 'Monthly') {
      setPlans(monthlyPlans);
      // setSelectedPlan(monthlyPlans[0])
    } else {
      setPlans(yearlyPlans);
      // setSelectedPlan(yearlyPlans[0])
    }
  };

  const handleUpgradePlan = () => {
    // setIsUpgrad(true);
    // setAddCard(false);
    setIsPlanPopupBox(true);
  };

  const handleAddCard = () => {
    setIsCardsPopupBox(true);
    // setAddCard(true);
    // setIsUpgrad(false);
  };

  return (
    <>
      <div className="">
        <div className="flex items-center px-[20px] py-[11px] justify-between  border-b-gray border-b-[1px] border-l-gray border-l-[1px]">
          <div className="gap-2 flex items-center text-[16px] text-darkBlue">
            <div className="cursor-pointer" onClick={() => navigate('/')}>
              <img src={ArrowLeft} />
            </div>
            <span>Billings</span>
          </div>
          <div className="cursor-pointer" onClick={() => handleClose()}>
            <img className=" w-[14px] h-[14px]" src={Close} />
          </div>
        </div>
      </div>
      <div className="py-[12px] px-[20px]">
        <label for="input" className="block text-[10px] font-bold leading-6 text-gray1 uppercase">
          Current Plan
        </label>
        <div className="border border-gray pt-[14px] rounded-[6px]">
          {selectedPlan ? (
            <div className="flex flex-col px-[10px]">
              <div className="flex items-center justify-between mb-[12px]">
                <div className="flex items-center gap-2">
                  <span>{selectedPlan.planTitle}</span>
                  <div className="flex px-[8px] py-[4px] text-[12px] font-medium items-center border border-primaryBlue gap-2 rounded-full">
                    <span className="h-[6px] w-[6px] bg-primaryBlue rounded-full"></span>
                    Active
                  </div>
                </div>
                <div className="flex items-center text-primaryBlue">
                  <span className="text-[16px] font-medium -mt-[10px]">$</span>
                  <span className="text-[24px] font-medium">{selectedPlan.planPrice}</span>
                  <span className="text-[16px] font-medium -mb-[10px]">/{selectedPlan.planRenewal}</span>
                </div>
              </div>
              <div className="flex flex-col text-[10px] mb-[10px]">
                <span className="text-darkgray1">Expire Plan on</span>
                <span className="text-darkBlue">5th July - 2023</span>
              </div>
              <div className="flex items-center justify-end px-[10px] border-t border-gray py-[10px]">
                <button
                  className="flex justify-between items-center gap-2 rounded-md bg-white p-[10px] text-[11px] font-medium text-primaryBlue border border-primaryBlue hover:!bg-lightblue1 hover:!border-lightblue"
                  onClick={() => handleUpgradePlan()}
                >
                  Upgrade Plan
                  <img src={CrossArrow} />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-[16px] text-darkBlue px-[20px] pb-[14px]">No plans selected</div>
          )}
        </div>
      </div>
      {selectedCard && (
        <div className="py-[12px] px-[20px]">
          <div className="flex justify-between">
            <label for="input" className="text-[10px] font-bold leading-6 text-gray1 uppercase">
              Payment method
            </label>
            <button
              className="flex gap-1 items-center rounded-md bg-white text-[12px] font-medium text-primaryBlue"
              onClick={() => handleAddCard()}
            >
              <img src={AddCircle} />
              <span className="text-primaryBlue">Add card</span>
            </button>
          </div>

          <div className="border border-gray pt-[14px] rounded-[6px] px-[10px]">
            <div className="mb-[16px]">{selectedCard.nameoncard}</div>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col text-[10px] mb-[10px]">
                <span className="text-darkgray1">Expire Plan on</span>
                <span className="text-darkBlue">{selectedCard.expdate}</span>
              </div>
              <div className="flex flex-col text-[10px] mb-[10px]">
                <span className="text-darkgray1">Card Number</span>
                <span className="text-darkBlue">{selectedCard.number}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="py-[12px] px-[20px]">
        <div className="mb-[16px]">
          <label for="input" className="block text-[10px] font-bold leading-6 text-gray1 uppercase mb-[10px]">
            Reisala.ai Pro plan
          </label>
          <RadioGroup value={currentRenewal} onChange={setCurrentRenewal}>
            <div className="inline-flex gap-2 items-center">
              {durations.map((item, index) => (
                <>
                  <RadioGroup.Option
                    name="action"
                    key={item.name}
                    value={item}
                    onClick={() => handleRenewalChoice(item.name)}
                    className={({ active, checked }) =>
                      classNames(
                        'cursor-pointer text-darkBlue',
                        active || checked ? 'active' : '',
                        'w-[20px] h-[20px] group relative flex items-center justify-center rounded-full border border-primaryBlue text-[12px] font-medium hover:border-lightblue hover:bg-lightblue1'
                      )
                    }
                  >
                    <RadioGroup.Label as="span">
                      <div className="dot bg-primaryBlue h-[12px] w-[12px] rounded-full"></div>
                    </RadioGroup.Label>
                  </RadioGroup.Option>
                  <span>{item.name}</span>
                </>
              ))}
            </div>
          </RadioGroup>
        </div>
        {plans.map((item) => (
          <PlanInfo
            selectedCard={selectedCard}
            setAddCard={setAddCard}
            setSelectedPlan={setSelectedPlan}
            setIsPaymentPopupBox={setIsPaymentPopupBox}
            item={item}
          />
        ))}
      </div>
      <BuyPlan
        cardList={cardList}
        selectedPlan={selectedPlan}
        isPaymentPopupBox={isPaymentPopupBox}
        setIsPaymentPopupBox={setIsPaymentPopupBox}
      />
      <CardsList
        plans={plans}
        isUpgrad={isUpgrad}
        setIsUpgrad={setIsUpgrad}
        isAddCard={isAddCard}
        setAddCard={setAddCard}
        cardList={cardList}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        setCardList={setCardList}
        setSelectedCard={setSelectedCard}
        selectedCard={selectedCard}
        isCardsPopupBox={isCardsPopupBox}
        setIsCardsPopupBox={setIsCardsPopupBox}
      />
      <PlanSelection
        plans={plans}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        setNewPlanSelect={setNewPlanSelect}
        newPlanSelect={newPlanSelect}
        isPlansPopupBox={isPlansPopupBox}
        setIsPlanPopupBox={setIsPlanPopupBox}
        setIsCardsPopupBox={setIsCardsPopupBox}
      />
    </>
  );
};

export default Billings;
