import React, { useEffect, useState } from 'react';
import ResalaIconWithText from './utils/Youtube/ResalaIconWithText.svg';
import Copy from './utils/Youtube/copy.svg';
import MaterialSymbolsRefresh from './utils/Youtube/material-symbols_refresh.svg';
import volumeHigh from './utils/Youtube/volumehigh.svg';
import Message from './utils/Youtube/message.svg';
import ArrowDown from './utils/PopupBox/Icons/ArrowDown.svg';
import Educare from './utils/Youtube/educare.svg';
import Setting from './utils/Wikipedia/Setting.svg';
import Close from './utils/Wikipedia/Close.svg';
import { useDispatch } from 'react-redux';
import { generateYoutubeSummary } from './redux/reducers/YoutubeSummarySlice/YoutubeSummarySlice';
import { useSpeechSynthesis } from 'react-speech-kit';
import copy from 'copy-to-clipboard';
import { getToken } from './utils/localstorage';
import { useNavigate } from 'react-router-dom';

const YoutubeButton = ({handleSidebar}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { speak, cancel, speaking } = useSpeechSynthesis();
  const handleSpeak = (msg) => {
    // console.log({msg});
    // console.log({speaking});
    if (speaking) {
      cancel();
    } else {
      speak({ text: msg });
    }
  };

  useEffect(() => {
    // console.log("dgvskdgjkl");
    const youtubeButtonSetting = document.getElementById('youtubeButtonSetting');
    if(youtubeButtonSetting){
      youtubeButtonSetting.onclick = function () {
        // console.log("preferences");
        navigate('/preferences')
        handleSidebar('chat')
      };
    }
  }, [])

  const [summaryData, setSummaryData] = useState([]);
  
  function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  const fetchYoutubeSummary = async () => { 
    setSummaryData([])
    setSummaryData((prevMessages) => [...prevMessages, { msg: 'Loading...', type: 'loading' }]);

    const response = await fetch('https://api-qa.resala.ai/youtube/youtube_summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        Authorization: await getToken(),
      },
      body: JSON.stringify({
        url: window.location.href,
        chat_id: generateRandomString(45),
      }),
      signal: AbortController.signal, // Associate the AbortController with the request
    });

    // const response = await dispatch(userChatNew(payload));
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    const reader = response.body.getReader();
    let accumulatedMessage = '';

    // Continuously read and append the streaming response
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = new TextDecoder().decode(value);
      // Process and display the received message
      const lines = chunk.split('\n');
      for (const line of lines) {
        // console.log('chunk', line);
        // if (line.startsWith('data: ')) {
        // const data = line.substring(6).trim(); // Remove "data: " prefix and trim spaces
        // Replace <br><br> with a newline
        data = line.replace(/#@#/g, '\n');
        if (line.includes('connection closed')) {
          // Set the typewriter state to false when "connection closed" is encountered
        } else {
          // Exclude lines containing "connection closed" and append the word
          accumulatedMessage += data + '';
        }
        // }
      }
      // Update the chat data with the accumulated message, without the "Loading..." message
      setSummaryData((prevMessages) => [
        ...prevMessages.slice(0, -1), // Remove the last (Loading...) message
        { msg: accumulatedMessage?.trim(), type: 'ai' }, // Update the chat data
      ]);
    }
  };

  useEffect(async() => {
    const summarizeVideoId = document.getElementById('summarizeVideo');
    if(summarizeVideoId){
      summarizeVideoId.onclick = function () {
          fetchYoutubeSummary()
          document.querySelectorAll('.summarizeVideo').forEach(function(element) {
            // console.log(element.id);
            element.classList.remove("hidden");
          });
        };

        const volumeHigh = document.getElementById('volumeHigh');
        volumeHigh.onclick = () => {
          const summarizeVideoResponse = document.getElementById('summarizeVideoResponse');
          // console.log("sdfjksdhfjk");
          handleSpeak(summarizeVideoResponse.innerText)
        }

        const Copy = document.getElementById('Copy');
        Copy.onclick = () => {
          const summarizeVideoResponse = document.getElementById('summarizeVideoResponse');
          copy(summarizeVideoResponse.innerText);
        }
        
        const MaterialSymbolsRefresh = document.getElementById('MaterialSymbolsRefresh');
        MaterialSymbolsRefresh.onclick = () => {
          const summarizeVideoResponse = document.getElementById('summarizeVideoResponse');
          summarizeVideoResponse.innerText = "";
          fetchYoutubeSummary()
        }
        
        const highlightsArrowDown = document.getElementById('highlightsArrowDown');
        highlightsArrowDown.onclick = ()=> {
          const highlightsData = document.getElementById('highlightsData');
          if(highlightsData){
            highlightsData.classList.toggle("hidden");
          }
          highlightsArrowDown.classList.toggle("rotate-180");
        }

        const clickToExpandClass = document.getElementsByClassName('clickToExpand');
        Array.from(clickToExpandClass).forEach(function(element) {
          element.addEventListener('click', () => {
            dataId = element.getAttribute('data-id')
              let clickToExpandData = document.getElementById('clickToExpandData_'+ dataId);
              clickToExpandData.classList.toggle("hidden");
              let clickToExpand = document.getElementById('clickToExpand_'+ dataId);
              clickToExpand.classList.toggle("rotate-180");
          });
        });
    }
  }, [])


  // console.log(summaryData);
  return (
    <div id="youtubeButton" style={{ marginBottom: '28px', position:'relative'}} className='hidden'>
      <div id="actionPopUpButton" className='hidden top-[6px] absolute w-[52px] h-[28px] flex justify-around items-center rounded-[6px]' style={{border: '1px solid #DFE4EC', boxShadow: '0px 2px 10px 0px rgba(62, 62, 62, 0.10)', background: '#F3F4F8', top: '-18px', right: '12px'}}>
        <div>
          <img className='w-[12px] h-[12px] cursor-pointer' id='youtubeButtonSetting' src={Setting} />
        </div>
        <div>
          <img className='w-[12px] h-[12px] cursor-pointer' id='actionCloseButton' src={Close} />
        </div>
      </div>
      <div className='w-[100%] min-h[60px] !bg-white rounded-[6px]' style={{ boxShadow: '0px 2px 20px rgba(60, 66, 87, 0.10)' }}>
        <div className='flex justify-between'>
          <div className='flex justify-center items-center ml-[16px]'>
            <img className="w-[100%] h-[24px]" src={ResalaIconWithText} />
          </div>
          <div id="actionButton" className='hidden summarizeVideo flex justify-center items-center mr-[-68px]'>
            <img className="w-[16px] h-[16px] cursor-pointer" id='Copy' src={Copy} />
            <img className="w-[16px] h-[16px] mr-[8px] ml-[8px] cursor-pointer" id='MaterialSymbolsRefresh' src={MaterialSymbolsRefresh} />
            <img className="w-[16px] h-[16px] cursor-pointer" id='volumeHigh' src={volumeHigh} />
          </div>
          <div id='summarizeVideo' className='w-[112px] text-white !font-dmsans text-[12px] font-[500] w-[112px] h-[28px] p-[6px] bg-[#1678F2] rounded-[4px] m-[16px] justify-center flex items-center cursor-pointer' style={{ wordWrap:'break-word' }} >Summarize Video</div>
        </div>
        <div id="summarizeVideoData" className='hidden summarizeVideo p-[16px] pt-[6px] text-[#5F6583] text-[14px] !font-dmsans font-[400]' style={{ wordWrap: 'break-word' }}>
          <div id='summarizeVideoResponse'>{summaryData[0] && summaryData[0].msg}</div>
          <div className='pt-[16px]'>
            <div className='pl-[8px] pr-[8px] pt-[6px] pb-[6px] rounded-[14.40px] justify-flex-start items-center gap-[4px] inline-flex cursor-pointer' style={{ border: '1px #1678F2 solid'}} id='ContinueInChat'>
                <div>
                  <img className="w-[18px] h-[18px]" src={Message} />
                </div>
                <div className='text-[#19224C] text-[11px] !font-dmsans font-[400]' style={{wordWrap: 'break-word'}}>Continue in Chat</div>
            </div>
          </div>
        </div>
        <div className='hidden summarizeVideo' style={{border: '1px #DFE4EC solid'}}></div>
        <div className='hidden summarizeVideo mb-[28px] p-[16px] text-[#5F6583] text-[12px] !font-dmsans font-[400]' style={{wordWrap: 'break-word'}}>
          <div className='text-[#19224c] text-[14px] !font-dmsans font-[500] flex justify-between h-[16px]' style={{ wordWrap: 'break-word' }}>
            <div>
              Highlights
            </div>
            <div className='flex'>
              <img className="w-[16px] h-[16px]" src={Copy} style={{marginLeft: '8px'}} />
              <img className="w-[16px] h-[16px] cursor-pointer" id='highlightsArrowDown' src={ArrowDown} style={{marginLeft: '8px'}} />
            </div>
          </div>
          <div className='hidden' id='highlightsData' >
            {/* set loop for Highlights */}
            <div className='flex pt-[16px]'>
              <div className='w-[17px] min-w-[17px]'>
                <img className="w-[16px] h-[16px]" src={Educare} />
              </div>
              <div className='ml-[4px]'>
                <div>
                  Lorem ipsum dolor sit amet consectetur. Cursus ut elementum netus tristique pulvinar.
                </div>
                <div className='flex mt-[8px]'>
                  <div className='text-[#B1BED2] !font-Poppins text-[12px] font-[400] h-[16px]'>Click to expand</div>
                  {/* change data-id and id */}
                  <img className="w-[16px] h-[16px] cursor-pointer clickToExpand" id='clickToExpand_1' data-id='1' src={ArrowDown} style={{marginLeft: '8px'}} />
                </div>
                {/* change id */}
                <div className='hidden ml-[31px] text-[#5F6583] text-[12px] font-[400] !font-dmsans' id='clickToExpandData_1'>
                  <ul>
                    <li className='list-disc mt-[8px]'>
                      This story has 6 creators. It was a nice story & I have watched it 2 times. I ofter watch your stories as it give me more clarity towards learning this.
                    </li>
                    <li className='list-disc mt-[8px]'>
                      This story has 6 creators. It was a nice story & I have watched it 2 times.
                    </li>
                    <li className='list-disc mt-[8px]'>
                      This story has 6 creators. It was a nice story & I have watched it 2 times. I ofter watch your stories.
                    </li>
                  </ul>
                </div>
              </div>
              <div className='text-white !font-dmsans text-[12px] font-[500] w-[44px] h-[24px] p-[4px] bg-[#1678F2] rounded-[4px]  justify-center flex items-center'>00:05</div>
            </div>
            <div className='flex pt-[16px]'>
              <div className='w-[17px] min-w-[17px]'>
                <img className="w-[16px] h-[16px]" src={Educare} />
              </div>
              <div className='ml-[4px]'>
                <div>
                  Lorem ipsum dolor sit amet consectetur. Cursus ut elementum netus tristique pulvinar.
                </div>
                <div className='flex mt-[8px]'>
                  <div className='text-[#B1BED2] !font-Poppins text-[12px] font-[400] h-[16px]'>Click to expand</div>
                  {/* change data-id and id */}
                  <img className="w-[16px] h-[16px] cursor-pointer clickToExpand" id='clickToExpand_2' data-id='2' src={ArrowDown} style={{marginLeft: '8px'}} />
                </div>
                {/* change id */}
                <div className='hidden ml-[31px] text-[#5F6583] text-[12px] font-[400] !font-dmsans' id='clickToExpandData_2'>
                  <ul>
                    <li className='list-disc mt-[8px]'>
                      This story has 6 creators. It was a nice story & I have watched it 2 times. I ofter watch your stories as it give me more clarity towards learning this.
                    </li>
                    <li className='list-disc mt-[8px]'>
                      This story has 6 creators. It was a nice story & I have watched it 2 times.
                    </li>
                    <li className='list-disc mt-[8px]'>
                      This story has 6 creators. It was a nice story & I have watched it 2 times. I ofter watch your stories.
                    </li>
                  </ul>
                </div>
              </div>
              <div className='text-white !font-dmsans text-[12px] font-[500] w-[44px] h-[24px] p-[4px] bg-[#1678F2] rounded-[4px]  justify-center flex items-center'>00:05</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default YoutubeButton;
