import { postRequest, getRequest } from '..';
import Toast from '../../utils/toast';
// import 'react-toastify/dist/ReactToastify.css';
// import Toast from '../../utils/toast';
const QUICK_REPLY_URL = '/quick_reply';

const generateMail = async (payload) => {
  try {
    const generatePath = `${QUICK_REPLY_URL}/generate_email`;
    return await postRequest(generatePath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const getIdeasReply = async (payload) => {
  try {
    const templatePath = `${QUICK_REPLY_URL}/idea_of_reply`;
    return await getRequest(templatePath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

export const quicReplyService = {
  generateMail,
  getIdeasReply,
};
