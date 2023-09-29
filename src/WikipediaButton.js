import React, { useEffect, useState } from 'react';
import Close from './utils/Wikipedia/Close.svg';
import Setting from './utils/Wikipedia/Setting.svg';
import ResalaIconWithText from './utils/Wikipedia/ResalaIconWithText.svg';
import { useNavigate } from 'react-router-dom';

const WikipediaButton = ({handleSidebar}) => {
  const navigate = useNavigate();
  const [fromPosition, setFromPosition] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const setting = document.getElementById('setting');
    if(setting){
      setting.onclick = function () {
        console.log("preferences");
        navigate('/preferences')
        handleSidebar('chat')
      };
    }
    const wikiSummarize = document.getElementById('wikiSummarize');
    if(wikiSummarize){
      wikiSummarize.onclick = function () {
        console.log("wikiSummarize");
        handleSidebar('chat')
      };
    }
  }, [])
  
  return (
    <div id="WikipediaButton" className='hidden fixed' style={{
      top: '45px',
      left: '1020px',
      zIndex: '99999999 !important',
    }}>
      <div className="w-[277px] h-[60px] relative">
          <div className="w-[277px] h-[60px] left-0 top-0 absolute bg-white rounded-md shadow" />
          <div className="w-6 h-6 left-[245px] top-[18px] absolute">
              <div className="w-6 h-6 left-0 top-0 absolute" />
              <div className="w-[14.12px] h-[14.12px] left-[4.53px] top-[4.94px] absolute" >
                <img className="w-[100%] h-[14px] cursor-pointer" id='setting' src={Setting} />
              </div>
          </div>
          <div className="w-[76px] h-7 p-1.5 left-[133px] top-[16px] absolute bg-blue-600 rounded flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="justify-start items-center gap-1 inline-flex">
                  <div className="text-white text-xs font-medium font-['DM Sans'] cursor-pointer" id='wikiSummarize'>Summarize</div>
              </div>
          </div>
          <div className="w-[98px] h-6 left-[8px] top-[18px] absolute">
              {/* <div className="w-6 h-6 left-0 top-0 absolute bg-blue-600 rounded-full" />
              <div className="left-[32px] top-[4px] absolute text-zinc-500 text-sm font-semibold font-['Poppins'] leading-none">Resala.ai</div> */}
              <img height={24} width={98} src={ResalaIconWithText} />
              <div className="w-6 h-6 left-0 top-0 absolute">
                  <div className="w-6 h-6 left-0 top-0 absolute">
                      <div className="w-[14.73px] h-[16.20px] left-[4.64px] top-[2.92px] absolute">
                          <div className="w-[2.44px] h-[1.62px] left-[6.79px] top-[9.47px] absolute">
                          </div>
                          <div className="w-[6.32px] h-[10.70px] left-[-0px] top-[5.50px] absolute">
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="w-5 h-5 p-[3px] left-[217px] top-[20px] absolute justify-end items-start gap-2.5 inline-flex">
              <div className="w-3.5 h-3.5 relative" >
                <img className="w-[100%] h-[14px] cursor-pointer" src={Close} />
              </div>
          </div>
      </div>
    </div>
  );
};
export default WikipediaButton;
