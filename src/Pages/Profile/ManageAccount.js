import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../Layout/Header';
import ModificationPopup from '../../Components/Profile/ModificationPopup';
import DeleteAccountPopup from '../../Components/Profile/DeleteAccountPopup';

import ArrowLeft from '../../utils/SavedTemplates/Icons/ArrowLeft.svg';

import Close from '../../utils/MainScreen/Icons/Close.svg';
import InputField from '../../Components/InputField';
import SuccessIcon from '../../utils/Account/Icons/SuccessIcon.svg';

const NAME_TYPE = 'Name';
const PASSWORD_TYPE = 'Password';

const ManageAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedUser, setLoggedUser] = useState(location.state?.loggedUser);

  const [isModificationBox, setIsModificationBox] = useState(false);
  const [ifOpenDeleteBox, setIfOpenDeleteBox] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const [editModalType, setEditModalType] = useState();

  const handleEditField = (type) => {
    setEditModalType(type);
    setIsModificationBox(true);
  };

  return (
    <>
      {deleted ? (
        <div className="py-[90px] px-[75px] flex flex-col justify-center">
          <div className="flex items-center justify-center gap-2 mb-[50px]">
            <img src={SuccessIcon} alt="SuccessIcon" className="cursor-pointer h-[64px] w-[64px]" />
          </div>
          <div className="text-[22px] flex justify-center mb-[8px] font-bold">Congratulation!</div>
          <div className="flex justify-center px-[10px] text-center text-gray2 mb-[48px] flex-col text-[12px] gap-2">
            You’ve successfully delete your account.
          </div>
        </div>
      ) : (
        <>
          <Header>
            <div
              className="flex items-center px-[20px] py-[11px] justify-between"
              style={{ boxShadow: '0px 2px 8px 0px #0000000D' }}
            >
              <div className="gap-2 flex items-center text-[16px] text-darkBlue">
                <div className="cursor-pointer" onClick={() => navigate('/')}>
                  <img src={ArrowLeft} />
                </div>
                <span>Profile</span>
              </div>
              <div
                className="cursor-pointer"
                // onClick={() => handleClose()}
              >
                <img className="w-[14px] h-[14px]" src={Close} />
              </div>
            </div>
            <form>
            <div className="flex flex-col justify-center p-[20px]">
              <InputField
                isFixedLabel={true}
                className="block w-full rounded-md border bg-[#EEF6FF] border-gray px-[15px] py-[16px] text-[14px] mb-[20px] text-darkBlue placeholder:text-gray2 focus:bg-white"
                name="email"
                label="Email Address"
                type="text"
                placeholder=""
                value={loggedUser.email}
              />

              <div className="relative">
                <InputField
                  isFixedLabel={true}
                  className="w-full rounded-md border bg-[#EEF6FF] border-gray px-[15px] py-[16px] text-[14px] mb-[20px] text-darkBlue placeholder:text-gray2 focus:bg-white"
                  name="name"
                  label="Name"
                  type="text"
                  placeholder=""
                  value={loggedUser.name}
                />
                <div
                  className="absolute right-[20px] top-[15px] text-primaryBlue text-[14px] cursor-pointer"
                  onClick={() => handleEditField(NAME_TYPE)}
                >
                  Edit
                </div>
              </div>
              <div className="relative">
                <InputField
                  isFixedLabel={true}
                  className="block w-full rounded-md border bg-[#EEF6FF] border-gray px-[15px] py-[16px] text-[14px] mb-[20px] cursor-text text-gray2 empty:text-gray2 focus:bg-white"
                  name="password"
                  label="Password"
                  type="password"
                  isvisible={false}
                  placeholder=""
                  value={loggedUser.password}
                />
                <div
                  className="absolute right-[20px] top-[15px] text-primaryBlue text-[14px] cursor-pointer"
                  onClick={() => handleEditField(PASSWORD_TYPE)}
                >
                  Edit
                </div>
              </div>
              <div className="text-[14px] text-darkBlue mb-[16px] mt-[25px] font-medium">Account management</div>
              <div className="flex gap-2 items-center">
                <button
                  className="rounded-md border border-red bg-white px-[33px] py-[10px] text-[12px] font-medium text-red hover:opacity-50 disabled:cursor-none disabled:opacity-50"
                  onClick={() => setIfOpenDeleteBox(true)}
                >
                  Delete account
                </button>
              </div>
            </div>
            </form>
          </Header>
          <ModificationPopup
            isModificationBox={isModificationBox}
            setIsModificationBox={setIsModificationBox}
            setLoggedUser={setLoggedUser}
            editModalType={editModalType}
          />
          <DeleteAccountPopup
            deleted={deleted}
            setDeleted={setDeleted}
            setIfOpenDeleteBox={setIfOpenDeleteBox}
            ifOpenDeleteBox={ifOpenDeleteBox}
          />
        </>
      )}
    </>
  );
};
export default ManageAccount;
