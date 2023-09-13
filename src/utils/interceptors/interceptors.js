import axios from 'axios';
import { useDispatch } from 'react-redux';
import { baseUrl } from '../../constant/constant';
import { saveError } from '../../redux/reducers/authSlice/AuthSlice';
import { authService } from '../../services/auth.service';
import Toast from '../toast';

const server = axios.create({
  baseURL: `${baseUrl}`,
});

let refresh = false;

server.interceptors.response.use(
  (resp) => {
    return resp;
  },
  async (error) => {
    if (error.response?.status === 400) {
      Toast('error', error.response.data.Message);
      // console.log('error', error.response.data.Message);
    }
    if (error.response.status === 409) {
      // Toast('error', error.response.data.message);
      Toast('error', error.response.data.Message);
    }
    // if (error.response.status === 401 && !refresh) {
    //   refresh = true;
    //   const refreshToken = localStorage.getItem('userRefreshToken');
    //   const response = await authService.RefreshToken({ refreshToken });
    //   if (!response) {
    //     return;
    //   }
    //   if (response.status === 200) {
    //     const accessToken = response.data.accessToken;
    //     const refreshToken = response.data.refreshToken;
    //     localStorage.setItem('userRefreshToken', refreshToken);
    //     localStorage.setItem('userAccess', `Bearer ${accessToken}`);
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken['token']}`;
    //     return axios(error.config);
    //   }
    // }
    // refresh = false;
    return error;
  }
);

export default server;
