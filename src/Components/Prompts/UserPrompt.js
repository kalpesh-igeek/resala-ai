import React from 'react';
import PagePrevIcon from '../../utils/Chat/Icons/Pagination/PagePrevIcon.svg';
import PageNextIcon from '../../utils/Chat/Icons/Pagination/PageNextIcon.svg';

const UserPrompt = ({ promptList }) => {
  return (
    <React.Fragment>
      <>
        {promptList.map((item) => (
          <React.Fragment key={item.id}>
            <div
              className="suggestion flex flex-col justify-end rounded-[6px] text-darkgray1 bg-lightblue1 p-[9px] text-[14px] cursor-pointer hover:bg-lightblue3"
              // onClick={() => {
              //   handleUsePrompt(item);
              //   setIsViewPrompts(false);
              // }}
            >
              <span className="max-w-[130px] text-[14px] font-medium overflow-hidden whitespace-nowrap text-ellipsis">
                {item?.name}
              </span>
            </div>
          </React.Fragment>
        ))}
      </>
      <div className="absolute bottom-0 right-0 gap-2 flex items-center">
        <span className="cursor-pointer">
          <img src={PagePrevIcon} />
        </span>
        <div className="">1 of 20</div>
        <span className="cursor-pointer">
          <img src={PageNextIcon} />
        </span>
      </div>
    </React.Fragment>
  );
};

export default UserPrompt;
