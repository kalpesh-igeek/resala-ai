import { postRequest } from '..';
import Toast from '../../utils/toast';
// import 'react-toastify/dist/ReactToastify.css';
// import Toast from '../../utils/toast';

const generateYoutubeSummary = async (payload) => {
  try {
    const generatePath = `/youtube/youtube_summary`;
    return await postRequest(generatePath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

export const YoutubeSummaryService = {
  generateYoutubeSummary,
};
