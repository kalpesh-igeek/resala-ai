import React, { useState, useEffect, useRef } from 'react';

//icons
import PolishIcon from './utils/PopupBox/Icons/PolishIcon.svg';
import ImproveIcon from './utils/PopupBox/Icons/ImproveIcon.svg';
import SimplifyIcon from './utils/PopupBox/Icons/SimplifyIcon.svg';
import ParaphraseIcon from './utils/PopupBox/Icons/ParaphraseIcon.svg';
import SummarizeIcon from './utils/PopupBox/Icons/SummarizeIcon.svg';
import ExplainIcon from './utils/PopupBox/Icons/ExplainIcon.svg';
import TranslateIcon from './utils/PopupBox/Icons/TranslateIcon.svg';
import TemplateIcon from './utils/PopupBox/Icons/TemplateIcon.svg';
import ArrowDown from './utils/PopupBox/Icons/ArrowDown.svg';
import ResalaIcon from './utils/ResalaIcon.svg';
import PinIcon from './utils/PopupBox/Icons/PinIcon.svg';
import PinnedIcon from './utils/PopupBox/Icons/PinnedIcon.svg';
import { useNavigate } from 'react-router-dom';

export default function PopupBox({ SELECTION, handleSidebar, selectedText, positionX, positionY, requestedText }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [areItemsPinned, setItemsPinned] = useState(0);
  const historyRef = useRef(null);
  const [pinnedItems, setPinnedItems] = useState([
    {
      pinned: false,
      icon: PolishIcon,
      name: 'Polish',
    },
    {
      pinned: false,
      icon: ImproveIcon,
      name: 'Improve',
    },
    {
      pinned: false,
      icon: SimplifyIcon,
      name: 'Simplify',
    },
    {
      pinned: false,
      icon: ParaphraseIcon,
      name: 'Paraphrase',
    },
    {
      pinned: false,
      icon: SummarizeIcon,
      name: 'Summarize',
    },
    {
      pinned: false,
      icon: ExplainIcon,
      name: 'Explain',
    },
    {
      pinned: false,
      icon: TranslateIcon,
      name: 'Translate',
    },
    {
      pinned: false,
      icon: TemplateIcon,
      name: 'Template',
    },
  ]);

  useEffect(() => {
    let localPinnedItems =  localStorage.getItem('pinnedItems')
    let localAreItemsPinned =  localStorage.getItem('areItemsPinned')
    if(localPinnedItems){
      localPinnedItems = JSON.parse(localPinnedItems);
      setPinnedItems(localPinnedItems)
      setItemsPinned(localAreItemsPinned);
    }
  }, []);

  const [menuClasses, setMenuClasses] = useState(
    'absolute top-full right-0 z-50 w-44 bg-white px-5 py-4 rounded-lg hidden'
  );

  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleAddPinnedItem = (e, icon, title, index) => {
    e.preventDefault();
    let tempArr = Array.from(pinnedItems);
    let newItem;
    if (tempArr[index].pinned) {
      newItem = {
        pinned: false,
        icon: icon,
        name: title,
      };
      let newAreItemsPinned = parseInt(areItemsPinned) - 1;
      localStorage.setItem('areItemsPinned',newAreItemsPinned);
      setItemsPinned(newAreItemsPinned);
    } else {
      newItem = {
        pinned: true,
        icon: icon,
        name: title,
      };
      let newAreItemsPinned = parseInt(areItemsPinned) + 1;
      localStorage.setItem('areItemsPinned',newAreItemsPinned);
      setItemsPinned(newAreItemsPinned);
    }
    
    tempArr[index] = newItem;
    localStorage.setItem('pinnedItems',JSON.stringify(tempArr));
    setPinnedItems(tempArr);
  };

  useEffect(() => {
    if (menu) {
      setMenuClasses(`absolute ${positionY > 665 ? 'bottom-[100%]' : 'top-full'}  right-0 z-50 w-44 bg-white px-5 py-4 rounded-lg block`);
      // setMenuClasses('absolute top-full right-0 z-50 w-44 bg-white px-5 py-4 rounded-lg block');
    } else {
      setMenuClasses('absolute top-full right-0 z-50 w-44 bg-white px-5 py-4 rounded-lg hidden');
    }
  }, [menu]);

  useEffect(() => {
    if (!selectedText) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }, [selectedText]);
  const styles = {
    position: 'absolute',
    top: positionY,
    left: positionX,
    // transform: 'translate(-50%, 0)',
  };

  return (
    <div className="popup-container" style={styles}>
      <div
        id="selectmenu"
        className={status ? 'absolute z-10 block' : 'absolute z-10 hidden'}
        // style={{ transform: `translate(${positionX}px, ${positionY + 20}px)` }}
      >
        <div className="inline-flex relative" onMouseEnter={handleMenu} onMouseLeave={handleMenu}>
          <div className="flex bg-white items-center gap-2 p-1 pr-1.5 border border-solid border-slate-300 rounded-full">
            <div className="flex items-center gap-2">
              <div className="rounded-full w-8 h-5 flex items-center justify-center text-xs text-white cursor-pointer">
              <img className="ml-[8px] w-[24px] min-w-[24px] h-[24px] mr-[16px]" src={ResalaIcon} />
              </div>
              <div className={`text-xs inline-flex justify-center items-center gap-2 ${pinnedItems.some(item => !item.pinned) ? 'min-w-[12px]': ''}`}>
                {pinnedItems.map((pin, index) => (
                  <React.Fragment key={index}>
                    {pin.pinned ? (
                      <>
                        <div
                          key={index}
                          className="flex justify-center items-center gap-2 cursor-pointer"
                          onClick={() => handleSidebar(SELECTION,pin.name)}
                        >
                          <img src={pin.icon} className='min-w-[12px] min-h-[12px]' />
                          { areItemsPinned < 3 ? <span>{pin.name}</span> : ''}
                        </div>
                        {pinnedItems?.length - 1 !== index ? <div className="bg-slate-300 w-px h-3 mx-0.5"></div> : ''}
                      </>
                    ) : null}
                  </React.Fragment>
                ))}
                {areItemsPinned == 0 ? <div className="cursor-pointer flex mr-[8px]">Select <img className='ml-[4px]' src={ArrowDown} /> </div> : <img className='ml-[4px]' src={ArrowDown} />}
              </div>
            </div>
            <div className="arrow cursor-pointer">
              <img src={ArrowDown} />
            </div>
          </div>
          <div
            className={menuClasses}
            style={{
              boxShadow: '0px 2px 20px 0px #00000026',
              zIndex:'99999999999 !important'
            }}
          >
            <div className="menu-inner">
              <div id="pinItems"></div>
              <div className="boxMenu">
                {pinnedItems.map((pin, index) => (
                  <>
                  {pin.name == "Summarize" || pin.name == "Template" ? <div className="bg-slate-300 h-px my-0.5"></div> : ""}
                  <div
                    className="py-1 font-dmsans text-xs flex justify-between items-center gap-2 selectText hover:bg-gray rounded-lg px-[2px] cursor-pointer"
                    key={index}
                  >
                    <div
                      className="flex justify-start items-center gap-2 cursor-pointer w-full"
                      onClick={() => handleSidebar(SELECTION,pin.name)}
                    >
                      <img src={pin.icon} />
                      <span>{pin.name}</span>
                    </div>
                    <span className={pin.pinned ? '' : 'selectIcon'}>
                      <img
                        className="cursor-pointer"
                        src={pin.pinned ? PinnedIcon : PinIcon}
                        onClick={(e) => handleAddPinnedItem(e, pin.icon, pin.name, index)}
                      />
                    </span>
                  </div>
                  </>
                ))}
                {/* <div
                  className="py-1 font-dmsans text-xs flex items-center gap-2 cursor-pointer"
                  onClick={() => handleSidebar(SELECTION)}
                >
                  <img src={ParaphraseIcon} />
                  <span>Paraphrase</span>
                </div>
                <div className="bg-slate-300 h-px my-0.5"></div>
                <div
                  className="py-1 font-dmsans text-xs flex items-center gap-2 cursor-pointer"
                  onClick={() => handleSidebar(SELECTION,'Summarize')}
                >
                  <img src={SummarizeIcon} />
                  <span>Summarize</span>
                </div>
                <div
                  className="py-1 font-dmsans text-xs flex items-center gap-2 cursor-pointer"
                  onClick={() => handleSidebar(SELECTION,'Explain')}
                >
                  <img src={ExplainIcon} />
                  <span>Explain</span>
                </div>
                <div
                  className="py-1 font-dmsans text-xs flex items-center gap-2 cursor-pointer"
                  onClick={() => handleSidebar(SELECTION)}
                >
                  <img src={TranslateIcon} />
                  <span>Translate</span>
                </div>
                <div className="bg-slate-300 h-px my-0.5"></div>
                <div
                  className="py-1 font-dmsans text-xs flex items-center gap-2 cursor-pointer"
                  onClick={() => navigate('/savedtemplates')}
                >
                  <img src={TemplateIcon} />
                  <span>Template</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
