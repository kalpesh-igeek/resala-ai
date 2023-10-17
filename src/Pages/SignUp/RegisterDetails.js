import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../utils/Header/ResLogo.svg';
import InputField from '../../Components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { registerCheck } from '../../utils/validation';
import { userDetails } from '../../redux/reducers/authSlice/AuthSlice';
import Header from '../../Layout/Header';
import SubHeader from '../../Layout/SubHeader';
const RegisterDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({ first_name: '', last_name: '', organization_name: '' });
  const { isLoading } = useSelector((state) => state.auth);
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
    if (Object.keys(errors)?.length) {
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
    <SubHeader></SubHeader>
      <div className="py-[90px] px-[75px] flex flex-col justify-center">
        {/* <div className="flex items-center justify-center gap-2 mb-[50px]">
          <img src={Logo} alt="logo" className="cursor-pointer h-[32px] w-[32px]" />
          <div className="text-darkgray text-[18px]">Resala</div>
        </div> */}
        <div className="text-[22px] flex justify-center mb-[40px] font-bold">Tell us about you</div>
        <form>
          <div className="w-full flex gap-2 justify-center">
            <div className="flex-col w-full">
              <InputField
                className="w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[9px] text-[#6D77A0] placeholder:text-[#6D77A0]"
                name="first_name"
                label="First name"
                type="text"
                placeholder="First name"
                handleChange={(e) => handleChange(e)}
                value={inputValue?.first_name}
              />
              {errors.first_name && <p className="text-red text-[12px]">{errors.first_name}</p>}
            </div>
            <div className="flex-col w-full">
              <InputField
                className="w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[9px] text-[#6D77A0] placeholder:text-[#6D77A0]"
                name="last_name"
                label="Last name"
                type="text"
                placeholder="Last name"
                handleChange={(e) => handleChange(e)}
                value={inputValue?.last_name}
              />
              {errors.last_name && <p className="text-red text-[12px]">{errors.last_name}</p>}
            </div>
          </div>

          <InputField
            className="block w-full rounded-md border border-gray px-[15px] py-[16px] text-[14px] mb-[12px] text-[#6D77A0] placeholder:text-[#6D77A0]"
            name="organization_name"
            // label="Organization name (optional)"
            type="text"
            placeholder="Organization name (optional)"
            handleChange={(e) => handleChange(e)}
          />
          <div className="flex gap-2 items-center">
            <button
              className={`w-full rounded-md focus:outline-none bg-[#1678F2] px-1 py-[16px] text-[16px] font-[700] text-white hover:opacity-90 disabled:cursor-none disabled:opacity-50 ${
                !inputValue.first_name || !inputValue.last_name ? 'opacity-50 cursor-not-allowed' : ''
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={(e) => handleSubmit(e)}
              disabled={isLoading || !inputValue.first_name || !inputValue.last_name}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterDetails;
