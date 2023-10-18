const TOKEN_KEY = 'userAccessToken';
const RefreshToken = 'userRefreshToken';

 const fetchToken = () => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(["userAccessToken"], function (items) {
        const token = items?.userAccessToken;
        resolve(token);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getToken =  async () => {
   const token = await fetchToken();
  if (!token) {
    localStorage.removeItem(TOKEN_KEY);
    return false;
  }
  return token;
 
  // chrome.storage.local.get('loginToken', function (result) {
  //   // console.log({result});
  //   // const token = localStorage.getItem(TOKEN_KEY);
  //   const token = result.loginToken;
  //   if (!token) {
  //     chrome.storage.local.clear();
  //     localStorage.removeItem(TOKEN_KEY);
  //     return false;
  //   }
  // console.log({token});
  // return token;
  // });

  chrome.storage.sync.get(["userAccessToken"], function (items) {
    console.log("From kfkunctions : ",items);
    const token = items?.userAccessToken;
    if (!token) {
      //chrome.storage.sync.clear();
      localStorage.removeItem(TOKEN_KEY);
      return false;
    }
  return token;

  });
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
