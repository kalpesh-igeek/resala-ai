import { getRequest, patchRequest } from '..';
import Toast from '../../utils/toast';
// import 'react-toastify/dist/ReactToastify.css';
// import Toast from '../../utils/toast';
const USER_URL = '/user';

const respondLanguage = async () => {
  try {
    const respondLangPath = `${USER_URL}/language_list`;
    return await getRequest(respondLangPath);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const updateLanguage = async (payload) => {
  try {
    const respondLangPath = `${USER_URL}/update_respond_language`;
    return await patchRequest(respondLangPath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

export const userService = {
  respondLanguage,
  updateLanguage,
};
