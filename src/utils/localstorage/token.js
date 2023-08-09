const TOKEN_KEY = 'userAccess';
const RefreshToken = 'userRefreshToken';

const getToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      localStorage.removeItem(TOKEN_KEY);
      return false;
    }
    return token;
  }
};

const setToken = (tokenValue) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, tokenValue);
    return true;
  }
};

const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(RefreshToken);
    localStorage.clear();
    return true;
  }
};
const setRefreshToken = (tokenValue) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(RefreshToken, tokenValue);
    return true;
  }
};
const getRefreshToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(RefreshToken);
    if (!token) {
      localStorage.removeItem(RefreshToken);
      return false;
    }
    return token;
  }
};

export { getToken, getuserToken, setToken, removeToken, setRefreshToken, getRefreshToken };
