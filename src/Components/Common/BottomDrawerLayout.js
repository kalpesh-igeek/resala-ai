import React, { useEffect, useRef } from 'react';
import Close from '../../utils/MainScreen/Icons/Close.svg';

export const BottomDrawerLayout = ({ children, setClose, title = '' }) => {
  const ref = useRef();

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       setClose(false);
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [ref]);

  return (
    <>
      <div
        onClick={() => {
          setClose(false);
        }}
        className="fixed top-0 bottom-0 right-0 w-[500px] bg-black z-[60] opacity-40"
      ></div>
      <div
        // ref={ref}
        className="fixed rounded-t-[10px] bg-white py-[20px] right-0 bottom-0 z-[70] w-[500px] min-h-[644px]"
        style={{ boxShadow: '0px 10px 30px 0px #3C425726' }}
      >
        <div className="flex items-center justify-between px-[20px] pt-[13px] pb-[8px]">
          <div className="flex items-center gap-2">
            <div className="gap-2 flex items-center">
              <span className="text-[20px] font-medium text-darkBlue">{title}</span>
            </div>
          </div>
          <div className="cursor-pointer -mt-[30px]" onClick={() => setClose(false)}>
            <img src={Close} alt={title} />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};
