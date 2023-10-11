const TOKEN_KEY = 'userAccessToken';
const RefreshToken = 'userRefreshToken';

const setToken = (tokenValue, callback) => {
  const data = {};
  data[TOKEN_KEY] = `Bearer ${tokenValue}`;
  chrome.storage.local.set(data, () => {
    if (!chrome.runtime.lastError) {
      console.log('Token set successfully:set', data);

      callback(true);
    } else {
      callback(false);
    }
  });
};

const getToken = (callback) => {
  chrome.storage.local.get([TOKEN_KEY], (result) => {
    if (!chrome.runtime.lastError) {
      const token = result[TOKEN_KEY];
      console.log(token, 'token');
      if (!token) {
        console.log('Token set successfully:get', data);

        callback(false);
      } else {
        callback(token);
      }
    } else {
      console.error('Error retrieving token from Chrome Storage:', chrome.runtime.lastError);
      callback(false);
    }
  });
  console.log(token, 'token');
};

const removeToken = (callback) => {
  chrome.storage.local.remove(TOKEN_KEY, () => {
    if (!chrome.runtime.lastError) {
      console.log('Token set successfully:remove', data);

      callback(true);
    } else {
      callback(false);
    }
  });
};

const setRefreshToken = (tokenValue, callback) => {
  if (typeof window !== 'undefined') {
    const data = {};
    data[RefreshToken] = tokenValue;
    chrome.storage.local.set(data, () => {
      if (!chrome.runtime.lastError) {
        console.log('Token set successfully:refresh', data);
        callback(true);
      } else {
        callback(false);
      }
    });
  }
};

const getRefreshToken = (callback) => {
  chrome.storage.local.get([RefreshToken], (result) => {
    if (!chrome.runtime.lastError) {
      const token = result[RefreshToken];
      if (!token) {
        removeRefreshToken();
        callback(false);
      } else {
        callback(token);
      }
    }
  });
};

export { getToken, setToken, removeToken, setRefreshToken, getRefreshToken };
