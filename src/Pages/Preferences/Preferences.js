import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeft from '../../utils/SavedTemplates/Icons/ArrowLeft.svg';
import TripleToggleSwitch from "../../Components/TripleToggleSwitch/TripleToggleSwitch";
import QuickReplySettings from "./QuickReplySettings";
import PauseExtensionSettings from "./PauseExtensionSettings";

const labels = {
    left: {
        title: "Floating",
        value: "floating"
    },
    right: {
        title: "Side",
        value: "side"
    },
    center: {
        title: "Hidden",
        value: "hidden"
    }
};

const Preferences = ({selectedItems,setSelectedItems}) => {
    const navigate = useNavigate();

    const onChange = (value) => console.log("value", value);

    const handleInputTone = (e, index, tone) => {
        let tempArr = Array.from(selectedItems)
        tempArr[2].name = tone.name
        setSelectedItems(tempArr)
    }

    const handleInputLanguage = (e, index, language) => {
        let tempArr = Array.from(selectedItems)
        tempArr[3].name = language.name
        setSelectedItems(tempArr)
    }

    return (
        <>
            <div className="flex items-center px-[20px] py-[11px] justify-between  border-b-gray border-b-[1px] border-l-gray border-l-[1px]">
                <div className="gap-2 flex items-center text-[14px]">
                    <div className="cursor-pointer" onClick={() => navigate("/")}><img src={ArrowLeft} /></div>
                    <span>Preferences</span>
                </div>
            </div>
            <div className="px-[20px] ">
                <div className="control py-[24px] border-b border-gray flex justify-between items-center">
                    <div>
                        <div className="text-[16px] text-darkblue font-medium mb-[5px]">Dark Mode</div>
                        <div className="text-[14px] text-darkgray1">Apply Dak mode Theme to Chrome Extension</div>
                    </div>
                    <div>
                        <label class="flex items-center relative w-max cursor-pointer select-none">
                            <input type="checkbox" class="appearance-none transition-colors cursor-pointer w-[54px] h-[24px] rounded-full bg-lightgray1" />
                            <span class="off absolute font-bold text-[11px] uppercase right-[5px]"> OFF </span>
                            <span class="on absolute font-bold text-[11px] uppercase right-[32px]"> ON </span>
                            <span class="w-[18px] h-[18px] right-[32px] absolute rounded-full transform transition-transform bg-white" />
                        </label>
                    </div>
                </div>
                <div className="control py-[24px] border-b border-gray flex justify-between items-center">
                    <div>
                        <div className="text-[16px] text-darkblue font-medium mb-[5px]">Extension Sidebar</div>
                    </div>
                    <div>
                        <label class="flex items-center relative w-max cursor-pointer select-none">
                            <input type="checkbox" class="appearance-none transition-colors cursor-pointer w-[85px] h-7 rounded-full bg-lightgray1" />
                            <span class="pointer w-[37px] h-[23px] right-[45px] absolute rounded-full transform transition-transform bg-white" />
                            <span class="right absolute font-bold text-[11px] right-[8px]"> Right </span>
                            <span class="left absolute font-bold text-[11px] right-[53px]"> Left </span>
                        </label>
                    </div>
                </div>
                <div className="control py-[24px] border-b border-gray flex justify-between items-center">
                    <div>
                        <div className="text-[16px] text-darkblue font-medium mb-[5px]">Extension Icon</div>
                    </div>
                    <div>
                        <TripleToggleSwitch labels={labels} onChange={onChange} />
                    </div>
                </div>
                <div className="control py-[24px] border-b border-gray flex justify-between items-center">
                    <div>
                        <div className="text-[16px] text-darkblue font-medium mb-[5px]">Quick Action Button</div>
                        <div className="text-[14px] text-darkgray1">Display when text is selected</div>
                    </div>
                    <div>
                        <label class="flex items-center relative w-max cursor-pointer select-none">
                            <input type="checkbox" class="appearance-none transition-colors cursor-pointer w-[54px] h-[24px] rounded-full bg-lightgray1" />
                            <span class="off absolute font-bold text-[11px] uppercase right-[5px]"> OFF </span>
                            <span class="on absolute font-bold text-[11px] uppercase right-[32px]"> ON </span>
                            <span class="w-[18px] h-[18px] right-[32px] absolute rounded-full transform transition-transform bg-white" />
                        </label>
                    </div>
                </div>
                <div className="control py-[24px] border-b border-gray">
                    <QuickReplySettings />
                </div>
                <div className="control py-[24px] border-b border-gray flex justify-between items-center">
                    <div>
                        <div className="text-[16px] text-darkblue font-medium mb-[5px]">Youtube Summary</div>
                        <div className="text-[14px] text-darkgray1">Display “YouTube Summary” panel alongside YouTube videos.</div>
                    </div>
                    <div>
                        <label class="flex items-center relative w-max cursor-pointer select-none">
                            <input type="checkbox" class="appearance-none transition-colors cursor-pointer w-[54px] h-[24px] rounded-full bg-lightgray1" />
                            <span class="off absolute font-bold text-[11px] uppercase right-[5px]"> OFF </span>
                            <span class="on absolute font-bold text-[11px] uppercase right-[32px]"> ON </span>
                            <span class="w-[18px] h-[18px] right-[32px] absolute rounded-full transform transition-transform bg-white" />
                        </label>
                    </div>
                </div>
                <div className="control py-[24px] border-b border-gray flex justify-between items-center">
                    <div>
                        <div className="text-[16px] text-darkblue font-medium mb-[5px]">Reading Summary</div>
                        <div className="text-[14px] text-darkgray1">Display “Resala Summary Button” alongside article website pages.</div>
                    </div>
                    <div>
                        <label class="flex items-center relative w-max cursor-pointer select-none">
                            <input type="checkbox" class="appearance-none transition-colors cursor-pointer w-[54px] h-[24px] rounded-full bg-lightgray1" />
                            <span class="off absolute font-bold text-[11px] uppercase right-[5px]"> OFF </span>
                            <span class="on absolute font-bold text-[11px] uppercase right-[32px]"> ON </span>
                            <span class="w-[18px] h-[18px] right-[32px] absolute rounded-full transform transition-transform bg-white" />
                        </label>
                    </div>
                </div>
                <div className="control py-[24px] border-b border-gray flex justify-between items-center">
                    <div>
                        <div className="text-[16px] text-darkblue font-medium mb-[5px]">Social Media</div>
                        <div className="text-[14px] text-darkgray1">This feature helps you get ai powered responses on social media platforms.</div>
                    </div>
                    <div>
                        <label class="flex items-center relative w-max cursor-pointer select-none">
                            <input type="checkbox" class="appearance-none transition-colors cursor-pointer w-[54px] h-[24px] rounded-full bg-lightgray1" />
                            <span class="off absolute font-bold text-[11px] uppercase right-[5px]"> OFF </span>
                            <span class="on absolute font-bold text-[11px] uppercase right-[32px]"> ON </span>
                            <span class="w-[18px] h-[18px] right-[32px] absolute rounded-full transform transition-transform bg-white" />
                        </label>
                    </div>
                </div>
                <div className="control py-[24px] border-b border-gray">
                    <PauseExtensionSettings />
                </div>
            </div>
        </>
    );
}

export default Preferences