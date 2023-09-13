import { postRequest } from '..';
import Toast from '../../utils/toast';
// import 'react-toastify/dist/ReactToastify.css';
// import Toast from '../../utils/toast';
const COMPOSE_URL = '/compose';

const generateDraft = async (payload) => {
  try {
    const generatePath = `${COMPOSE_URL}/generate_draft`;
    return await postRequest(generatePath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const generateReply = async (payload) => {
  try {
    const templatePath = `${COMPOSE_URL}/generate_reply`;
    return await postRequest(templatePath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const composeDraft = async (payload) => {
  try {
    const composePath = `${COMPOSE_URL}/compose_text`;
    return await postRequest(composePath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const translateText = async (payload) => {
  try {
    const translateTextPath = `${COMPOSE_URL}/translate_text`;
    return await patchRequest(translateTextPath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

export const composeService = {
  generateDraft,
  generateReply,
  composeDraft,
  translateText,
};
