import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../localstorage';
const WithAuth = (Component) => (props) => {
  const navigate = useNavigate();
  const token = getToken();
  const { userToken } = useSelector((state) => state.auth);

  console.log('userToken', userToken);
  useEffect(() => {
    if (!userToken) {
      navigate('/login');
    }
  }, [userToken]);
  return !userToken ? <Fragment></Fragment> : <Component {...props} />;
};
export default WithAuth;
