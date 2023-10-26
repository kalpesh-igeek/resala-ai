import { getRequest, postRequest, patchRequest, deleteRequest } from '..';
import Toast from '../../utils/toast';
// import 'react-toastify/dist/ReactToastify.css';
// import Toast from '../../utils/toast';
const CHAT_URL = '/chat';

const newChat = async () => {
  try {
    const newChatPath = `${CHAT_URL}/new_chat`;
    return await postRequest(newChatPath);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const userChat = async (payload) => {
  try {
    const userChatPath = `${CHAT_URL}/stream_chat`;
    return await postRequest(userChatPath, payload);
  } catch (error) {
    // console.log('error', error);
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const generalPromptChat = async (payload) => {
  try {
    const userChatPath = `${CHAT_URL}/general_prompt_response`;
    return await postRequest(userChatPath, payload);
  } catch (error) {
    // console.log('error', error);
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const userChatNew = async (payload) => {
  try {
    const userChatPath = `${CHAT_URL}/chat_test`;
    return await postRequest(userChatPath, payload);
  } catch (error) {
    // console.log('error', error);
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const regenerateChat = async (payload) => {
  try {
    const regenerateChatPath = `${CHAT_URL}/regenerate_response`;
    return await patchRequest(regenerateChatPath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const userChatHistory = async (id) => {
  try {
    const userChatHisPath = `${CHAT_URL}/user_chat_history/${id}`;
    return await getRequest(userChatHisPath);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const userChatList = async (queryParams) => {
  try {
    const { history_type, page_number, page_record, query } = queryParams;
    const userChatHisList = `${CHAT_URL}/user_chat_history?history_type=${history_type}&page_number=${page_number}&page_record=${page_record}&query=${query}`;
    return await getRequest(userChatHisList);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

// const deleteChatHistory = async (queryParams) => {
//   try {
//     const { search, pageRecord, pageNo, sortBy, order, blogCategorySlug } = queryParams;
//     const Path = `${BLOG_URL}/admin?search=${search}&pageRecord=${pageRecord}&pageNo=${pageNo}&sortBy=${sortBy}&order=${order}&blogCategorySlug=${
//       blogCategorySlug ? blogCategorySlug : ''
//     }`;
//     return await getRequest(Path);
//   } catch (error) {
//     Toast('error', error?.response?.data?.message);
//   }
// };

const deleteChatHistory = async (id) => {
  try {
    const deleteChatHisPath = `${CHAT_URL}/delete_history/${id}`;
    return await deleteRequest(deleteChatHisPath);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const clearChatHistory = async () => {
  try {
    const deleteChatHisPath = `${CHAT_URL}/clear_chat_history`;
    return await deleteRequest(deleteChatHisPath);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};
const lastChatHistory = async () => {
  try {
    const lastChatHisPath = `${CHAT_URL}/last_chat_history`;
    return await getRequest(lastChatHisPath);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};



const respondeLanguage = async () => {
  try {
    const respondeLanguagePath = `${CHAT_URL}/respond_language_list`;
    return await getRequest(respondeLanguagePath);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

export const chatService = {
  newChat,
  userChat,
  generalPromptChat,
  userChatNew,
  regenerateChat,
  userChatHistory,
  userChatList,
  deleteChatHistory,
  clearChatHistory,
  lastChatHistory,
  respondeLanguage,
};
