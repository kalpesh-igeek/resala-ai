import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../utils/Header/ResLogo.svg';
import WhatsAppIcon from '../../utils/Account/Icons/WhatsAppIcon.svg';
import WhatsAppIconWhite from '../../utils/Account/Icons/WhatsAppIconWhite.svg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import the CSS for styling
// import PhoneInput from 'react-phone-number-input';
// import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css';
import { useDispatch } from 'react-redux';
import { sendOtpSMS, userDetails } from '../../redux/reducers/authSlice/AuthSlice';
import SelectMobileNumber from '../../Components/PhoneNumberInput/SelectMobileNumber';

const MobileVerification = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { register } = state; // Read values passed on state
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState();

  const [isVisibleWhatAppButton, setIsVisisbleWhatAppButton] = useState(true);
  const [whatsAppSwitch, setWhatsAppSwitch] = useState(false);
  const [errors, setErrors] = useState('');
  const [validationError, setValidationError] = useState('');
  const [inputValue, setInputValue] = useState({
    country_code: '',
    phone_number: '',
    // is_whatapp: !whatsAppSwitch,
    is_whatapp: false,
  });
  const [countries, setcountries] = useState();
  console.log('countries', countries);
  const [country, setCountry] = useState('US');

  useEffect(() => {
    document.getElementById('whatsappswitch').checked = whatsAppSwitch;
  }, [whatsAppSwitch]);

  const handleSMSbutton = async (e) => {
    e.preventDefault();
    if (inputValue) {
      const res = await dispatch(sendOtpSMS(inputValue));
      if (res.payload?.status === 200) {
        const res = await dispatch(
          userDetails({
            ...register,
            phone_number: inputValue.phone_number,
            country_code: inputValue.country_code,
            is_whatapp: false,
          })
        );
        navigate('/entercode', { state: { phone: res.payload, register } });
      }
    }
    // else {
    //   setWhatsAppSwitch(true);
    //   setIsVisisbleWhatAppButton(false);
    // }
  };

  const handleWhatAppButton = async (e) => {
    e.preventDefault();
    if (inputValue) {
      const res = await dispatch(sendOtpSMS(inputValue));
      if (res.payload?.status === 200) {
        const res = await dispatch(
          userDetails({
            ...register,
            phone_number: inputValue.phone_number,
            country_code: inputValue.country_code,
            is_whatapp: true,
          })
        );
        navigate('/entercode', { state: { phone: res.payload } });
      }
    }
  };
  const handleSwitchOnChange = () => {
    setWhatsAppSwitch(!whatsAppSwitch);
    setInputValue({ ...inputValue, is_whatapp: whatsAppSwitch });
    setIsVisisbleWhatAppButton(!isVisibleWhatAppButton);
  };
  const handleOnChange = (value, country) => {
    setPhoneNumber(value);
    setInputValue({
      is_whatapp: inputValue.is_whatapp,
      phone_number: value.slice(country.dialCode?.length),
      country_code: `+${country.dialCode}`,
    });
  };

  return (
    <>
      <div className="py-[90px] px-[75px] flex flex-col justify-center">
        <div className="flex items-center justify-center gap-2 mb-[50px]">
          <img src={Logo} alt="logo" className="cursor-pointer h-[32px] w-[32px]" />
          <div className="text-darkgray text-[18px]">Resala</div>
        </div>
        <div className="text-[22px] flex justify-center mb-[40px] font-bold">Verify your phone number</div>

        <div className="">
          {/* <PhoneInput
            country={'us'}
            value={phoneNumber}
            onChange={handleOnChange}
            dropdownStyle={{
              fontSize: '12px',
              color: '#6D77A0',
            }}
            dropdownClass="my-dropdown-class"
            inputClass="my-input-class" // Add this line
          /> */}
          <SelectMobileNumber />
        </div>
        <div className="flex items-center justify-between mt-[10px]">
          <div className="inline-flex items-center gap-1 text-gray2 text-[14px]">
            <span>Do you have</span>
            <span>
              <img src={WhatsAppIcon} />
            </span>
            <span>WhatsApp?</span>
          </div>
          <div>
            <label class="flex items-center relative w-max cursor-pointer select-none switch2">
              <input
                id="whatsappswitch"
                type="checkbox"
                class="appearance-none transition-colors cursor-pointer w-[92px] h-[30px] rounded-[5px] bg-lightblue1"
                onChange={() => handleSwitchOnChange()}
              />
              <span class="option w-[45px] h-[30px] right-[48px] absolute transform transition-transform bg-lightblue2" />
              <span class="off absolute font-bold text-[11px] uppercase right-[15px] text-gray2"> No </span>
              <span class="on absolute font-bold text-[11px] uppercase right-[60px] text-gray2"> Yes </span>
            </label>
          </div>
        </div>
        <div className="col-span-full mt-[40px] mb-[15px]">
          <div className="flex flex-col gap-2 items-center">
            {isVisibleWhatAppButton && (
              <button
                className="w-full rounded-md bg-primaryBlue px-1 py-[16px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                // onClick={(e) => handleWhatAppButton(e)}
              >
                <div className="inline-flex items-center gap-1">
                  <span>Send code via</span>
                  <span>
                    <img src={WhatsAppIconWhite} />
                  </span>
                  <span>WhatsApp</span>
                </div>
              </button>
            )}
            <button
              className={`${
                !isVisibleWhatAppButton ? 'bg-primaryBlue text-white' : 'bg-transparent text-primaryBlue'
              } w-full rounded-md px-1 py-[16px] text-[12px] font-medium hover:opacity-90 disabled:cursor-none disabled:opacity-50`}
              onClick={(e) => handleSMSbutton(e)}
            >
              Send via SMS instead
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default MobileVerification;
