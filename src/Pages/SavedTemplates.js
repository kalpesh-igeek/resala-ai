import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowLeft from '../utils/SavedTemplates/Icons/ArrowLeft.svg';
import Close from '../utils/MainScreen/Icons/Close.svg';
import TemplateDocIcon from '../utils/SavedTemplates/Icons/TemplateDocIcon.svg';
import DropDownBox from '../Components/SaveTemplatePopup/DropdownBox';
import { Tab } from '@headlessui/react';
import { getTemplateList } from '../redux/reducers/templateSlice/TemplateSlice';
import { useDispatch } from 'react-redux';
import DeletePopup from '../Components/DeletePopup';
import Template from './Templates/Template';
import ArrowRight from '../utils/SavedTemplates/Icons/arrow-right.svg';
import Header from '../Layout/Header';

const Tabs = [
  {
    id: 0,
    type: 'All',
  },
  {
    id: 1,
    type: 'General',
  },
  {
    id: 2,
    type: 'Email',
  },
  {
    id: 3,
    type: 'Social Media',
  },
  {
    id: 4,
    type: 'SMS',
  },
];

const SavedTemplates = ({
  handleSidebar,
  setIsOpen,
  ifOpenDeleteBox,
  setIfOpenDeleteBox,
  setActiveTab,
  handleClick,
  setIsLogout,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [saveTemplates, setSaveTemplates] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [dropDown, setDropDownBox] = useState(false);
  const [selectTab, setSelectTab] = useState(0);
  const [template, setTemplate] = useState({});
  const [templateType, setTemplateType] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editTemplate, setEditTemplate] = useState(false);

  // const handleItemOpen = (index, template) => {
  //   console.log('template', template);
  //   setOpenIndex(index);
  //   setDropDownBox(!dropDown);
  // };

  const handleItemOpen = (index, template) => {
    setOpenIndex(index);
    setDropDownBox(!dropDown);
    setSelectedTemplate(template); // Set the selected template
  };

  const handleSelectTemplate = (index, template) => {
    setEditTemplate(true);
    setSelectedTemplate(template);
  };

  const handleClose = () => {
    setIsOpen(false);
    // handleSidebar();
    document.querySelectorAll('[style="margin-right: 500px;"]')[0].style = 'position: relative;';
  };

  const handleOuterClick = () => {
    if (dropDown) setDropDownBox(false);
  };

  const handleSelectTab = (data) => {
    setSelectTab(data.id);
    setTemplateType(data.type);
  };

  const fetchTemplateList = async () => {
    const templateTypeId = Tabs.find((tab) => tab.id === selectTab).id;

    const res = await dispatch(
      getTemplateList({
        template_type: templateTypeId,
        offset: 1,
        limit: 20,
      })
    );

    if (!res.payload) {
      return;
    }

    if (res.payload.status === 200) {
      setSaveTemplates(res.payload?.Result);
      // setTotalData(res.payload?.totalCount);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplateList();
  }, [setSelectTab]);

  return (
    <Header
      handleClick={handleClick}
      setIsLogout={setIsLogout}
      // setIsLogin={setIsLogin}
    >
      <div className="" onClick={() => handleOuterClick()}>
        <div className="flex items-center px-[20px] py-[11px] justify-between  border-b-gray border-b-[1px] border-l-gray border-l-[1px]">
          <div className="gap-2 flex items-center text-[16px] text-darkBlue">
            <div
              className="cursor-pointer"
              onClick={() => {
                if (editTemplate) {
                  navigate('/savedtemplates');
                  setEditTemplate(false);
                } else {
                  navigate('/');
                }
              }}
            >
              <img src={ArrowLeft} />
            </div>
            <span>Templates</span>
            {editTemplate && (
              <>
                <img src={ArrowRight} />
                <span>{selectedTemplate?.name}</span>
              </>
            )}
          </div>
          <div className="cursor-pointer" onClick={handleClose}>
            <img className="w-[14px] h-[14px]" src={Close} />
          </div>
        </div>

        {editTemplate ? (
          <Template selectedTemplate={selectedTemplate} setActiveTab={setActiveTab} />
        ) : (
          <div className="py-[12px] px-[20px]">
            <Tab.Group
              as="div"
              className="w-max bg-gray3 mb-[15px] flex items-center justify-between px-[3px] py-[4px] rounded-full"
            >
              <Tab.List className="flex gap-4">
                {Tabs.map((data, id) => (
                  <Tab
                    className={
                      selectTab === data.id
                        ? 'w-max rounded-[100px] shadow-sm gap-[8px] text-[11px] font-bold bg-graywhite px-[7px] py-[4px]  transition-all duration-200 ease-linear'
                        : 'w-max text-[11px] text-lightgray2 px-[7px] py-[4px]  transition-all duration-200 ease-linear'
                    }
                    key={id}
                    onClick={() => handleSelectTab(data)}
                  >
                    {data.type}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>

            {saveTemplates.length === 0 ? (
              <div className="text-center text-gray1">No data found</div>
            ) : (
              saveTemplates
                .filter((template) => selectTab === 0 || template.type.id === selectTab)
                .map((template, index) => (
                  <div
                    className="p-[11px] bg-white border rounded-[6px] border-gray mb-[15px] flex items-center justify-between"
                    key={index}
                  >
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => handleSelectTemplate(index, template)}
                    >
                      <div className="h-[40px] w-[40px] bg-lightgray flex items-center justify-center rounded-full">
                        <img src={TemplateDocIcon} />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <div className="text-[16px] text-darkblue">{template.name}</div>
                        <div className="text-sm text-darkgray1">{template.type?.name}</div>
                      </div>
                    </div>

                    <DropDownBox
                      template={template}
                      templateObject={selectedTemplate}
                      dropDown={dropDown}
                      shouldOpen={index == openIndex && dropDown ? true : false}
                      clickHandler={() => {
                        handleItemOpen(index, template);
                      }}
                      setActiveTab={setActiveTab}
                      index={openIndex}
                      ifOpenDeleteBox={ifOpenDeleteBox}
                      setIfOpenDeleteBox={setIfOpenDeleteBox}
                    />
                  </div>
                ))
            )}
          </div>
        )}
        <DeletePopup
          // openIndex={openIndex}
          templateObject={selectedTemplate}
          fetchTemplateList={fetchTemplateList}
          ifOpenDeleteBox={ifOpenDeleteBox}
          setIfOpenDeleteBox={setIfOpenDeleteBox}
        />
      </div>
    </Header>
  );
};

export default SavedTemplates;
