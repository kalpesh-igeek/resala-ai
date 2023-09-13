import React from 'react';
import { useNavigate } from 'react-router-dom';
import MoreIcon from '../../utils/SavedTemplates/Icons/MoreIcon.svg';
import EditTemplateIcon from '../../utils/SavedTemplates/Icons/EditTemplateIcon.svg';
import DeleteTemplateIcon from '../../utils/SavedTemplates/Icons/trash.svg';
import { useDispatch } from 'react-redux';
import { deleteTemplate } from '../../redux/reducers/templateSlice/TemplateSlice';

const DropDownBox = ({
  template,
  shouldOpen,
  clickHandler,
  index,
  ifOpenDeleteBox,
  setIfOpenDeleteBox,
  templateObject,
  setActiveTab,
}) => {
  const navigate = useNavigate();
  const handleDeleteTmplate = async () => {
    setIfOpenDeleteBox(true);
  };

  return (
    <div className="relative">
      <div className="cursor-pointer py-[10px]" onClick={() => clickHandler(index)}>
        <img src={MoreIcon} />
      </div>
      <div
        className={`absolute z-20 right-0 top-100 w-44 bg-white px-[20px] py-[16px] rounded-lg ${
          shouldOpen ? 'block' : 'hidden'
        }`}
        style={{
          boxShadow: '0px 2px 20px 0px #00000026',
        }}
      >
        <div
          className="text-[14px] text-red font-medium flex gap-2 items-center cursor-pointer"
          onClick={() => handleDeleteTmplate()}
        >
          <img src={DeleteTemplateIcon} />
          <span>Delete</span>
        </div>
      </div>
    </div>
  );
};
export default DropDownBox;
