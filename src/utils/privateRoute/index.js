import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../localstorage';
const WithAuth = (Component) => (props) => {
  const navigate = useNavigate();
  const token = getToken();
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);
  return !token ? <Fragment></Fragment> : <Component {...props} />;
};
export default WithAuth;
