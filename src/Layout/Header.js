import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../utils/Header/ResalaLogo.svg";
import Avatar from "../utils/Header/ResalaLogo.svg";
import Close from "../utils/Header/Close.svg";
import SettingsIcon from "../utils/Header/SettingsIcon.svg";
import Profile from "../Pages/Profile";

const loggedUser = {
  avatar: Avatar,
  name: "Vatsal Sonani",
  email: "example@gmail.com",
  password: "admin123"
}

const Header = ({ children, handleClick, setIsLogout, setIsLogin }) => {
  const navigate = useNavigate();

  const [isProfile, setIsProfile] = useState(false);

  console.log(isProfile);

  return (
    <div className="h-[100%] font-dmsans">
      <div className="flex items-center justify-between px-[20px] py-[11px] border-b-gray border-b-[1px] border-l-gray border-l-[1px] bg-white relative z-[70]">
        <div className="flex items-center gap-2">
          <img
            src={Logo}
            alt="logo"
            className="cursor-pointer h-[24px] w-[24px]"
            onClick={() => navigate("/")}
          />
          <div className="text-darkgray text-[14px] font-Poppins font-medium">
            Resala.ai
          </div>
        </div>

        <div className="flex items-center">
          <div className="mr-[10px] h-[34px] w-[34px] border-slate-300 rounded-full border flex justify-center items-center cursor-pointer">
            <img
              className="h-[20px] w-[20px]" src={SettingsIcon}
              onClick={() => navigate("/preferences")}
            />
          </div>
          <div className='mr-[10px] relative'>
            <div className="cursor-pointer" onClick={() => setIsProfile(!isProfile)}>
              <img className="h-[34px] w-[34px]" src={Avatar} />
            </div>
            {isProfile &&
              <Profile loggedUser={loggedUser} setIsLogout={setIsLogout} setIsLogin={setIsLogin} />
            }
          </div>
          <div className='mr-[10px] bg-slate-300 w-px h-[28px] mx-0.5'></div>
          <div>
            <img className="extensionCloseIcon cursor-pointer h-[28px] w-[28px]" src={Close} alt="Close" onClick={() => handleClick()} />
          </div>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default Header;
