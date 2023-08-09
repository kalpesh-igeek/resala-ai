import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../utils/Header/ResalaLogo.svg';
import InputField from '../../Components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { registerCheck } from '../../utils/validation';
import { userDetails } from '../../redux/reducers/authSlice/AuthSlice';

const RegisterDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({ first_name: '', last_name: '', organization_name: '' });
  const [errors, setErrors] = useState({});
  const { state } = useLocation();
  const { payload } = state; // Read values passed on state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    if (errors[name])
      setErrors((error) => {
        let errorNew = { ...error };
        delete errorNew[name];
        return errorNew;
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = registerCheck(inputValue);
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    const res = await dispatch(
      userDetails({
        ...payload,
        first_name: inputValue.first_name,
        last_name: inputValue.last_name,
        organization_name: inputValue.organization_name,
      })
    );
    if (res.payload) {
      navigate('/mobileverification', { state: { register: res.payload } });
    }
  };
  return (
    <>
      <div className="py-[90px] px-[75px] flex flex-col justify-center">
        <div className="flex items-center justify-center gap-2 mb-[50px]">
          <img src={Logo} alt="logo" className="cursor-pointer h-[32px] w-[32px]" />
          <div className="text-darkgray text-[18px]">Resala.ai</div>
        </div>
        <div className="text-[22px] flex justify-center mb-[40px] font-bold">Tell us about you</div>
        <div className="w-full flex gap-2 items-center justify-center">
          <InputField
            className="w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray2"
            name="first_name"
            label="First name"
            type="text"
            placeholder="First name"
            handleChange={(e) => handleChange(e)}
          />
          {errors.first_name && <p className="text-red text-[12px]">{errors.first_name}</p>}
          <InputField
            className="w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray2"
            name="last_name"
            label="Last name"
            type="text"
            placeholder="Last name"
            handleChange={(e) => handleChange(e)}
          />
          {errors.last_name && <p className="text-red text-[12px]">{errors.last_name}</p>}
        </div>
        <InputField
          className="block w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[12px] text-darkBlue placeholder:text-gray2"
          name="organization_name"
          label="Organization name (optional)"
          type="text"
          placeholder="Organization name (optional)"
          handleChange={(e) => handleChange(e)}
        />
        <div className="flex gap-2 items-center">
          <button
            className="w-full rounded-md bg-primaryBlue px-1 py-[16px] text-[12px] font-medium text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50"
            onClick={(e) => handleSubmit(e)}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterDetails;
