import { useDispatch } from 'react-redux';
import { saveToken } from '../../redux/reducers/authSlice/AuthSlice';

const TOKEN_KEY = 'userAccessToken';
const RefreshToken = 'userRefreshToken';

const fetchToken = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get('userAccessToken', (data) => {
      let token = null;
      if (data.userAccessToken) {
        token = data.userAccessToken;
      }
      return resolve(token);
    });
  });
};
const getToken = async () => {
  // let getToken = localStorage.getItem('token');
  let getToken = await fetchToken();
  // console.log('here in middle?', getToken);
  return getToken;
};

const setToken = (tokenValue) => {
  localStorage.setItem(TOKEN_KEY, `Bearer ${tokenValue}`);
  return true;
};

// export const setToken = (token) => {
//   return new Promise((resolve, reject) => {
//     try {
//       localStorage.setItem(TOKEN_KEY, token);
//       resolve(true);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  // localStorage.removeItem(RefreshToken);
  // localStorage.clear();
  return true;
};
const setRefreshToken = (tokenValue) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(RefreshToken, tokenValue);
  }
};
const getRefreshToken = () => {
  const token = localStorage.getItem(RefreshToken);
  if (!token) {
    localStorage.removeItem(RefreshToken);
    return false;
  }
  return token;
};

export { getToken, setToken, removeToken, setRefreshToken, getRefreshToken };
