import { baseUrl } from '../constant/constant';
import server from '../utils/interceptors/interceptors';
import { getToken } from '../utils/localstorage';

// Handling GET request
// const USER_TOKEN = getToken();

const getRequest = async (path) => {
  const AXIOS_CONFIG = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: getToken(),
    },
  };
  console.log('Ssajksjkvhkjscjkaschjkashnkj');
  console.log(getToken());
  const API_ENDPOINT = `${baseUrl}${path}`;
  return await server.get(API_ENDPOINT, AXIOS_CONFIG);
};

const getReqWithoutToken = async (path) => {
  const AXIOS_CONFIG = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
  const API_ENDPOINT = `${baseUrl}${path}`;
  return await server.get(API_ENDPOINT, AXIOS_CONFIG);
};

// Handling POST request
const postRequest = async (path, payload) => {
  const AXIOS_CONFIG = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: getToken(),
    },
  };
  const API_ENDPOINT = `${baseUrl}${path}`;
  return await server.post(API_ENDPOINT, payload, AXIOS_CONFIG);
};

const postReqWithFormData = async (path, formData) => {
  const AXIOS_CONFIG = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: getToken(),
    },
  };
  const API_ENDPOINT = `${baseUrl}${path}`;
  return await server.post(API_ENDPOINT, formData, AXIOS_CONFIG);
};

const postReqWithoutToken = async (path, payload) => {
  const AXIOS_CONFIG = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
  const API_ENDPOINT = `${baseUrl}${path}`;
  return await server.post(API_ENDPOINT, payload, AXIOS_CONFIG);
};

// Handling PUT request
const putRequest = async (path, payload) => {
  const AXIOS_CONFIG = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: getToken(),
    },
  };
  const API_ENDPOINT = `${baseUrl}${path}`;
  return await server.put(API_ENDPOINT, payload, AXIOS_CONFIG);
};

const putReqWithFormData = async (path, formData) => {
  const AXIOS_CONFIG = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: getToken(),
    },
  };
  const API_ENDPOINT = `${baseUrl}${path}`;
  return await server.put(API_ENDPOINT, formData, AXIOS_CONFIG);
};

// Handling PATCH request
const patchRequest = async (path, payload) => {
  const AXIOS_CONFIG = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: getToken(),
    },
  };
  const API_ENDPOINT = `${baseUrl}${path}`;
  return await server.patch(API_ENDPOINT, payload, AXIOS_CONFIG);
};

const patchReqWithoutToken = async (path, payload) => {
  const AXIOS_CONFIG = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: getToken(),
    },
  };
  const API_ENDPOINT = `${baseUrl}${path}`;
  return await server.patch(API_ENDPOINT, payload, AXIOS_CONFIG);
};

// Handling DELETE request
const deleteRequest = async (path) => {
  const AXIOS_CONFIG = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: getToken(),
    },
  };
  const API_ENDPOINT = `${baseUrl}${path}`;
  return await server.delete(API_ENDPOINT, AXIOS_CONFIG);
};

export {
  getRequest,
  getReqWithoutToken,
  postRequest,
  postReqWithFormData,
  postReqWithoutToken,
  putRequest,
  putReqWithFormData,
  patchReqWithoutToken,
  patchRequest,
  deleteRequest,
};
