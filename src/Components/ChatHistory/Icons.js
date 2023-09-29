import React from 'react';
import AllChatIcon from '../../utils/Chat/Icons/History/AllChatIcon.svg';
import DeleteIcon from '../../utils/Chat/Icons/History/DeleteIcon.svg';
import ChatIcon from '../../utils/Chat/Icons/Types/ChatIcon.svg';
import DocChatIcon from '../../utils/Chat/Icons/Types/DocChatIcon.svg';
import WebSummeryIcon from '../../utils/Chat/Icons/Types/WebSummeryIcon.svg';
import YoutubeIcon from '../../utils/Chat/Icons/Types/YoutubeIcon.svg';

const Icons = ({ item }) => {
  return (
    <img
      src={
        item?.Type === 1
          ? ChatIcon
          : item?.Type === 2
          ? DocChatIcon
          : item?.Type === 3
          ? WebSummeryIcon
          : item?.Type === 4
          ? YoutubeIcon
          : ''
      }
    />
  );
};

export default Icons;
