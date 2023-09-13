const TOKEN_KEY = 'userAccessToken';
const RefreshToken = 'userRefreshToken';

const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    localStorage.removeItem(TOKEN_KEY);
    return false;
  }
  return token;
};
// export const getToken = () => {
//   return new Promise((resolve, reject) => {
//     try {
//       const token = localStorage.getItem(TOKEN_KEY);
//       resolve(token);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

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
