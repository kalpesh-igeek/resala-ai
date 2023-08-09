import React from 'react';
import { useNavigate } from 'react-router-dom';
import MoreIcon from '../../utils/SavedTemplates/Icons/MoreIcon.svg';
import EditTemplateIcon from '../../utils/SavedTemplates/Icons/EditTemplateIcon.svg';
import DeleteTemplateIcon from '../../utils/SavedTemplates/Icons/DeleteTemplateIcon.svg';

const DropDownBox = ({ template, shouldOpen, clickHandler, index, ifOpenDeleteBox, setIfOpenDeleteBox }) => {
  const navigate = useNavigate();

  const handleDeleteTmplate = () => {
    setIfOpenDeleteBox(true);
  };

  return (
    <div className="relative">
      <div className="cursor-pointer py-[10px]" onClick={() => clickHandler(index)}>
        <img src={MoreIcon} />
      </div>
      <div
        className={`absolute z-20 right-0 top-100 w-44 bg-white px-5 py-4 rounded-lg ${
          shouldOpen ? 'block' : 'hidden'
        }`}
        style={{
          boxShadow: '0px 2px 20px 0px #00000026',
        }}
      >
        <div
          className="text-[14px] font-medium mb-[8px] gap-2 flex items-center cursor-pointer"
          onClick={() =>
            navigate('/', {
              state: {
                template: template,
              },
            })
          }
        >
          <img src={EditTemplateIcon} />
          <span>Edit Template</span>
        </div>
        <div
          className="text-[14px] font-medium flex gap-2 items-center cursor-pointer"
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
