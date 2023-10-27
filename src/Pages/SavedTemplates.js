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
import NoDataFound from '../utils/SavedTemplates/img/nodatafound.svg';
import Header from '../Layout/Header';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
  const [skeleton, setSkeleton] = useState(true);

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
    navigate('/')
    // setIsOpen(false);
    // handleSidebar();
    // document.querySelectorAll('[style="margin-right: 500px;"]')[0].style = 'position: relative;';
  };

  const handleOuterClick = () => {
    if (dropDown) setDropDownBox(false);
  };

  const handleSelectTab = (data) => {
    setSkeleton(true);
    setSelectTab(data.id);
    setTemplateType(data.type);
    setSkeleton(false);
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
      setSkeleton(false);
      return;
    }

    if (res.payload.status === 200) {

      setSaveTemplates(res.payload?.Result);
      setSkeleton(false);
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
            <span className="cursor-pointer"
              onClick={() => {
                if (editTemplate) {
                  navigate('/savedtemplates');
                  setEditTemplate(false);
                } else {
                  navigate('/');
                }
              }}>Templates</span>
            {editTemplate && (
              <>
                <img src={ArrowRight} />
                <span>{selectedTemplate?.name.length >= 40 ? selectedTemplate?.name.substring(1, 40) + "..." : selectedTemplate?.name}</span>
              </>
            )}
          </div>
          {/* <div className="cursor-pointer" onClick={handleClose}>
            <img className="w-[14px] h-[14px]" src={Close} />
          </div> */}
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
                        ? 'w-max rounded-[100px] text-darkBlue shadow-sm text-[12px] font-[700] bg-graywhite px-[7px] py-[4px]'
                        : 'w-max text-[12px] font-[400] text-[#5F6583] px-[7px] py-[4px]'
                    }
                    key={id}
                    onClick={() => handleSelectTab(data)}
                  >
                    {data.type}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>

            {skeleton ? (
              <>
              {Array.from({ length: 12 }, (_, index) => (
                <div className="flex gap-[16px] items-center mb-[24px]">
                  <Skeleton height={40} width={40}  />
                  <div className='flex flex-col gap-[8px] item-center'>
                    <Skeleton height={20} width={404} />
                    <Skeleton height={20} width={200} />
                  </div>
                </div>
                ))}
              </>
            ) : (
              <>
                {saveTemplates.length === 0 || (saveTemplates.length && saveTemplates.filter((template) => selectTab === 0 || template.type.id === selectTab).length == 0) ? (

                  <div className="text-center pt-[132px] block items-center justify-center text-gray1">
                    <div className="text-center flex items-center justify-center">
                      <img src={NoDataFound} />
                    </div>
                    <div className="text-[24px] text-darkBlue font-bold mt-[30px]">Sorry!</div>
                    <div className="text-[16px] text-gray1 font-[400]  mt-[8px]">We haven’t found any document.</div>
                  </div>
                ) : (
                  saveTemplates
                    .filter((template) => selectTab === 0 || template.type.id === selectTab)
                    .map((template, index) => (
                      <div
                        className="p-[11px] savedTemplate border rounded-[6px] border-[#DFE4EC] mb-[15px] flex items-center justify-between"
                        key={index}
                      >
                        <div
                          className="flex items-center gap-2 cursor-pointer grow"
                          onClick={() => handleSelectTemplate(index, template)}
                        >
                          <div className="h-[40px] w-[40px] bg-lightgray flex items-center justify-center rounded-full">
                            <img src={TemplateDocIcon} />
                          </div>
                          <div className="flex flex-col gap-[4px]">
                            <div className="text-[16px] text-darkBlue font-medium">{template.name.length >= 40 ? template.name.substring(1, 40) + "..." : template.name}</div>
                            <div className="text-[12px] text-darkgray1">{template.type?.name}</div>
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
              </>
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
