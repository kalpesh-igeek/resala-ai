import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../utils/Header/ResalaLogo.svg";
import WhatsAppIcon from "../../utils/Account/Icons/WhatsAppIcon.svg";
import WhatsAppIconWhite from "../../utils/Account/Icons/WhatsAppIconWhite.svg";
import 'react-phone-number-input/style.css'
// import CountryFlag from "../../Components/CountryFlag";
import PhoneInput from 'react-phone-number-input'
import Dropdown from 'react-dropdown';
import ArrowDown from '../../utils/PopupBox/Icons/ArrowDown.svg'

// import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCountries } from 'use-react-countries'
import InputField from "../../Components/InputField";


const CountryList = () => {
    const { countries } = useCountries();
    const [countriesList, setCountryList] = useState([]);
    const myCountriesList = [];

    useEffect(() => {
        countries.map(country => {
            // myCountriesList.push(country.emoji + ' ' + country.name + ' ' + country.countryCallingCode);
            myCountriesList.push(country.emoji);
        });
        setCountryList(myCountriesList)
    }, [])

    const defaultOption = countriesList[1];

    return (
        <Dropdown
            className='rounded-md mb-[15px]'
            options={countriesList}
            // onChange={this._onSelect}
            value={defaultOption}
            arrowClosed={<img className='absolute top-[50%] -translate-y-[50%] right-[15px] w-[16px] h-[16px]' src={ArrowDown} />}
            arrowOpen={<img className='absolute top-[50%] -translate-y-[50%] right-[15px] w-[16px] h-[16px] rotate-180' src={ArrowDown} />}
        />
    );
};

const MobileVerification = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState();
    const [isVisibleWhatAppButton, setIsVisisbleWhatAppButton] = useState(true);
    const [whatsAppSwitch, setWhatsAppSwitch] = useState(false);

    // const [phone, setPhone] = useState("");

    useEffect(() => {
        document.getElementById("whatsappswitch").checked = whatsAppSwitch;
    }, [whatsAppSwitch])


    const handleSMSbutton = () => {
        if(whatsAppSwitch) { 
            navigate('/entercode');
        } else {
            setWhatsAppSwitch(true);
            setIsVisisbleWhatAppButton(false)
        }
    }

    const handleWhatAppButton = () => {
        navigate('/entercode');
    }

    const handleSwitchOnChange = () => {
        setWhatsAppSwitch(!whatsAppSwitch);
        setIsVisisbleWhatAppButton(!isVisibleWhatAppButton);
    }

    return (
        <>
            <div className="py-[90px] px-[75px] flex flex-col justify-center">
                <div className="flex items-center justify-center gap-2 mb-[50px]">
                    <img
                        src={Logo}
                        alt="logo"
                        className="cursor-pointer h-[32px] w-[32px]"
                    />
                    <div className="text-darkgray text-[18px]">
                        Resala.ai
                    </div>
                </div>
                <div className="text-[22px] flex justify-center mb-[40px] font-bold">
                    Verify your phone number
                </div>
                {/* <PhoneInput2
                    country={"us"}
                    className="marginBottom"
                    value={phone}
                    onChange={phone => setPhone(phone)}
                /> */}
                {/* <PhoneInput
                    international
                    defaultCountry="IN"
                    value={value}
                    onChange={setValue}
                /> */}
                <div className="flex gap-2 items-center contrycode relative">
                    <CountryList />
                    <InputField
                        className="block w-full rounded-md border border-gray px-[15px] py-[16px] mb-[12px] text-[14px] text-darkBlue placeholder:text-gray1"
                        name="phone"
                        label="Phone number"
                        type="text"
                        placeholder=""
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1 text-gray2 text-[14px]">
                        <span>Do you have</span>
                        <span><img src={WhatsAppIcon} /></span>
                        <span>WhatsApp?</span>
                    </div>
                    <div>
                        <label class="flex items-center relative w-max cursor-pointer select-none switch2">
                            <input id="whatsappswitch" type="checkbox" class="appearance-none transition-colors cursor-pointer w-[92px] h-[30px] rounded-[5px] bg-lightblue1" onChange={() => handleSwitchOnChange()} />
                            <span class="option w-[45px] h-[30px] right-[48px] absolute transform transition-transform bg-lightblue2" />
                            <span class="off absolute font-bold text-[11px] uppercase right-[15px] text-gray2"> No </span>
                            <span class="on absolute font-bold text-[11px] uppercase right-[60px] text-gray2"> Yes </span>
                        </label>
                    </div>
                </div>
                <div className="col-span-full mt-[40px] mb-[15px]">
                    <div className="flex flex-col gap-2 items-center">
                        {isVisibleWhatAppButton &&
                            <button
                                className="w-full rounded-md bg-primaryBlue px-1 py-[16px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
                                   onClick={() => handleWhatAppButton()}
                            >
                                <div className="inline-flex items-center gap-1">
                                    <span>Send code via</span>
                                    <span><img src={WhatsAppIconWhite} /></span>
                                    <span>WhatsApp</span>
                                </div>
                            </button>
                        }
                        <button
                            className={`${!isVisibleWhatAppButton ? 'bg-primaryBlue text-white' : 'bg-transparent text-primaryBlue'} w-full rounded-md px-1 py-[16px] text-[12px] font-medium hover:opacity-90 disabled:cursor-none disabled:opacity-50`}
                            onClick={() => handleSMSbutton()}
                        >
                            Send via SMS instead
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MobileVerification