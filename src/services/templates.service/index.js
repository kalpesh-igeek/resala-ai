import { postRequest, getRequest, patchRequest, deleteRequest } from '..';
import Toast from '../../utils/toast';
// import 'react-toastify/dist/ReactToastify.css';
// import Toast from '../../utils/toast';
const COMPOSE_URL = '/compose';

const addTemplate = async (payload) => {
  try {
    const templatePath = `${COMPOSE_URL}/add_template`;
    return await postRequest(templatePath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const getTemplateList = async (queryParams) => {
  try {
    const { template_type, offset, limit } = queryParams;
    const templatePath = `${COMPOSE_URL}/template_list?template_type=${template_type}&offset=${offset}&limit=${limit}`;
    return await getRequest(templatePath);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const getTemplate = async (id) => {
  try {
    const templatePath = `${COMPOSE_URL}/single_template/${id}`;
    return await getRequest(templatePath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const getTemplateType = async () => {
  try {
    const templatePath = `${COMPOSE_URL}/compose_template_type`;
    return await getRequest(templatePath);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const updateTemplate = async (payload, id) => {
  console.log('payload123', payload);
  console.log('id', id);
  try {
    const templatePath = `${COMPOSE_URL}/edit_template/${id}`;
    return await patchRequest(templatePath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const deleteTemplate = async (id) => {
  try {
    const templatePath = `${COMPOSE_URL}/delete_template/${id}`;
    return await deleteRequest(templatePath);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

export const templateService = {
  addTemplate,
  getTemplateList,
  getTemplate,
  getTemplateType,
  updateTemplate,
  deleteTemplate,
};
