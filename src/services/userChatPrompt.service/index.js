import { getRequest, postRequest, patchRequest, deleteRequest } from '..';
import { getToken } from '../../utils/localstorage';
// import 'react-toastify/dist/ReactToastify.css';
// import Toast from '../../utils/toast';
const PROMPT_URL = '/prompt';

const addPrompt = async (payload) => {
  try {
    const addPromptPath = `${PROMPT_URL}/add_prompt`;
    return await postRequest(addPromptPath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const getPrompt = async (id) => {
  try {
    const promptPath = `${PROMPT_URL}/get_prompt${id}`;
    return await getRequest(promptPath);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
  }
};

const getPromptList = async (queryParams) => {
  try {
    const promptPath = `${PROMPT_URL}/prompt_list`;
    return await getRequest(promptPath);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const getDefauPromptList = async (queryParams) => {
  let token = await getToken();
  if (token) {
    try {
      const { search } = queryParams;
      const promptPath = `${PROMPT_URL}/get_default_prompt_list?search=${search}`;
      return await getRequest(promptPath);
    } catch (error) {
      // Toast('error', error?.response?.data?.message);
      // console.log('error', error?.response?.data?.message);
      Toast('error', error.response.data.Message);
    }
  }
};

const searchPrompt = async (queryParams) => {
  try {
    const { prompt } = queryParams;
    const promptSerachPath = `${PROMPT_URL}/prompt_search/?prompt=${prompt}`;
    return await getRequest(promptSerachPath);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const updatePrompt = async (id, payload) => {
  // console.log('payload', payload, id);
  try {
    const updatePromptPath = `${PROMPT_URL}/edit_prompt/${id}`;
    return await patchRequest(updatePromptPath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const deletePrompt = async (id) => {
  try {
    const deletePromptPath = `${PROMPT_URL}/delete_prompt/${id}`;
    return await deleteRequest(deletePromptPath);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

export const userPromptService = {
  addPrompt,
  getPrompt,
  getPromptList,
  searchPrompt,
  updatePrompt,
  deletePrompt,
  getDefauPromptList,
};
