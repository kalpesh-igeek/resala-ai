import React, { useState, useEffect } from 'react';
import ArrowDown from '../../utils/PopupBox/Icons/ArrowDown.svg';
import ArrowUp from '../../utils/PopupBox/Icons/arrow-up.svg';
import AddCircle from '../../utils/Preferences/Icons/AddCircle.svg';
import CloseCircle from '../../utils/Preferences/Icons/CloseCircle.svg';
import TickCircle from '../../utils/Preferences/Icons/TickCircle.svg';
import DeleteIcon from '../../utils/Preferences/Icons/DeleteIcon.svg';
import DcDial from '../../utils/Preferences/img/DcDial.svg';
import Dribble from '../../utils/Preferences/img/Dribble.svg';

const sites = [
  {
    name: 'DcDial Prod',
    url: 'https://www.dcdial.com/app/dcdial/view_users.php',
    icon: DcDial,
  },
];

const PauseExtensionSettings = () => {
  const [dropDown, setDropDown] = useState(false);
  const [addNewSite, setAddNewSite] = useState(false);
  const [selectedSites, setSelectedSites] = useState(sites);
  const [currentSite, setCurrentSite] = useState();

  const handleToggle = () => {
    setDropDown(!dropDown);
  };

  const handleOpenAddNewSite = () => {
    setAddNewSite(true);
  };

  useEffect(() => {
    const siteTitle = document.getElementsByTagName('title')[0].innerText;
    let siteLogo = '';
    if (document.querySelector('[type="image/x-icon"]')) {
      siteLogo = document.querySelector('[type="image/x-icon"]').href;
    }
    const newItem = {
      name: siteTitle,
      url: window.location.href,
      icon: siteLogo,
    };
    selectedSites.map((item) => {
      if (item.name !== siteTitle) {
        setCurrentSite(newItem);
      } else {
        setCurrentSite();
      }
    });
  }, [selectedSites]);

  const handleAddNewSite = () => {
    let tempArr = Array.from(selectedSites);
    tempArr.push(currentSite);
    setSelectedSites(tempArr);
  };

  const handleDelete = (index) => {
    let tempArr = Array.from(selectedSites);
    tempArr.splice(index, 1);
    setSelectedSites(tempArr);
  };

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <div className="w-full">
          <div className="flex gap-2">
            <div className="text-[16px] text-darkblue font-medium mb-[5px]">Pause Extension</div>
            <div
              className={`cursor-pointer `}
              //   style={{ transformOrigin: 'center', transform: `rotate(${dropDown ? '180' : '0'}deg)` }}
              onClick={handleToggle}
            >
              {dropDown ? (
                <img
                  className="w-[20px]"
                  src={ArrowUp}
                  // style={{ transform: `rotate(${dropDown ? '-180' : '0'}deg)` }}
                />
              ) : (
                <img
                  className="w-[20px]"
                  src={ArrowDown}
                  // style={{ transform: `rotate(${dropDown ? '-180' : '0'}deg)` }}
                />
              )}
            </div>
          </div>

          <div className="text-[14px] text-darkgray1">Pause Extension to work on certain websites</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="cursor-pointer" onClick={handleOpenAddNewSite}>
            <img className="w-[24px]" src={AddCircle} />
          </div>
        </div>
      </div>
      <div className={`${dropDown ? 'block' : 'hidden'}`}>
        <div className="mt-[15px]">
          {selectedSites.map((site, index) => (
            <div className="w-full justify-between flex items-center gap-2 mb-[20px]">
              <div className="flex gap-2 items-center">
                <div className="h-[32px] w-[32px]">
                  <img src={site.icon} />
                </div>
                <div>
                  <div className="w-full text-[10px] text-darkblue font-medium mb-[3px] text-ellipsis overflow-hidden whitespace-nowrap w-[260px]">
                    {site.name}
                  </div>
                  <div className="text-[8px] text-darkgray1 text-ellipsis overflow-hidden whitespace-nowrap w-[365px]">
                    {site.url}
                  </div>
                </div>
              </div>
              <div className="cursor-pointer" onClick={() => handleDelete(index)}>
                <img className="w-[16px]" src={DeleteIcon} />
              </div>
            </div>
          ))}

          {currentSite && (
            <div className="w-full flex justify-between items-center gap-2 mb-[20px]">
              <div className="flex gap-2 items-center">
                <div className="h-[32px] w-[32px]">
                  <img src={currentSite.icon} />
                </div>
                <div>
                  <div className="w-full text-[10px] text-darkblue font-medium mb-[3px] text-ellipsis overflow-hidden whitespace-nowrap w-[260px]">
                    {currentSite.name}{' '}
                    <span className="rounded-[2px] px-[6px] py-[3px] bg-green text-white">Current Tab</span>
                  </div>
                  <div className="text-[8px] text-darkgray1 text-ellipsis overflow-hidden whitespace-nowrap w-[365px]">
                    {currentSite.url}
                  </div>
                </div>
              </div>
              <div className="cursor-pointer" onClick={handleAddNewSite}>
                <img className="w-[16px]" src={AddCircle} />
              </div>
            </div>
          )}
        </div>
        <div className="mt-[20px]">
          {addNewSite ? (
            <>
              <label for="input" className="block text-[10px] font-medium leading-6 text-darkBlue">
                Add new
              </label>
              <div className="flex items-center gap-2">
                <div className="w-full">
                  <input
                    id="addwebsite"
                    name="addwebsite"
                    type="text"
                    placeholder=""
                    className="block w-full rounded-md border border-gray px-[15px] py-[11px] text-darkBlue placeholder:text-gray1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="cursor-pointer" onClick={() => setAddNewSite(false)}>
                    <img src={CloseCircle} />
                  </div>
                  <div className="cursor-pointer">
                    <img src={TickCircle} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                className="rounded-md bg-white px-[16px] py-[8px] text-[12px] font-medium text-primaryBlue border border-gray hover:!bg-lightblue1 hover:!border-lightblue disabled:cursor-none disabled:opacity-50"
                onClick={() => handleOpenAddNewSite()}
              >
                Add Website
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default PauseExtensionSettings;
