import React from 'react';
import closeCircleSvg from '../../utils/Account/Icons/close-circle.svg';
import tickSvg from '../../utils/Account/Icons/tick.svg';

const PasswordRequirements = ({ require }) => {
  return (
    <div className="mt-[16px] bg-lightgray px-[16px] py-[16px]  rounded-md">
      <div className="mb-[12px] text-[16px] text-darkBlue">With Password Requirements</div>
      <div className="text-gray1 text-[14px]">
        <div className="flex gap-2 p-[4px]">
          <img className="w-[16px] h-[16px]" src={require.minLength ? tickSvg : closeCircleSvg} alt="Not matched" />
          <p>Minimum 8 characters long.</p>
        </div>
        <div className="flex gap-2 p-[4px]">
          <img className="w-[16px] h-[16px]" src={require.uppercase ? tickSvg : closeCircleSvg} alt="Not matched" />
          <p>At least one uppercase letter (A-Z).</p>
        </div>
        <div className="flex gap-2 p-[4px]">
          <img className="w-[16px] h-[16px]" src={require.lowercase ? tickSvg : closeCircleSvg} alt="Not matched" />
          <p>At least one lowercase letter (a-z).</p>
        </div>
        <div className="flex gap-2 p-[4px]">
          <img className="w-[16px] h-[16px]" src={require.number ? tickSvg : closeCircleSvg} alt="Not matched" />
          <p>At least one numerical digit (0-9).</p>
        </div>
        <div className="flex gap-2 p-[4px]">
          <img className="w-[16px] h-[16px]" src={require.specialChar ? tickSvg : closeCircleSvg} alt="Not matched" />
          <p>At least one special character (e.g., !, @, #, $, etc.)</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordRequirements;
