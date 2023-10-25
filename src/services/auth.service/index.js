import { getRequest, postRequest, postReqWithoutToken, patchReqWithoutToken } from '..';
import Toast from '../../utils/toast';
// import 'react-toastify/dist/ReactToastify.css';
// import Toast from '../../utils/toast';
const AUTH_URL = '/auth';

const checkMail = async (payload) => {
  try {
    const checkMailPath = `${AUTH_URL}/check_email`;
    return await postReqWithoutToken(checkMailPath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // Toast('error', error.response.data.Message);
    return error;
    // console.log('error', error?.response?.data?.message);
  }
};

const sendOtpSMS = async (payload) => {
  try {
    const sendOtpPath = `${AUTH_URL}/send_otp`;
    return await postReqWithoutToken(sendOtpPath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const signUp = async (payload) => {
  try {
    const signUpPath = `${AUTH_URL}/singup`;
    return await postReqWithoutToken(signUpPath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const emailChecking = async (payload) => {
  try {
    const emailCheckPath = `${AUTH_URL}/email_check`;
    return await postReqWithoutToken(emailCheckPath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    // Toast('error', error.response.data.Message);
    return error;
  }
};

const sendOtpMail = async (payload) => {
  try {
    const sendOtpMailPath = `${AUTH_URL}/send_otp_email`;
    return await postReqWithoutToken(sendOtpMailPath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    return error;
  }
};

const otpVerification = async (payload) => {
  try {
    const otpPath = `${AUTH_URL}/otp_verification`;
    return await postReqWithoutToken(otpPath, payload);
  } catch (error) {
    return error;
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    // Toast('error', error.response.data.Message);
  }
};

const login = async (payload) => {
  try {
    const loginPath = `${AUTH_URL}/login`;
    return await postReqWithoutToken(loginPath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    // Toast('error', error.response.data.Message);
    return error;
  }
};

const forgotPassword = async (payload) => {
  try {
    const forgotPassPath = `${AUTH_URL}/forgot_password`;
    return await patchReqWithoutToken(forgotPassPath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);/
    Toast('error', error.response.data.Message);
  }
};

const signUpWithGoogle = async (payload) => {
  try {
    const signUpGooglePath = `${AUTH_URL}/singup_with_google`;
    return await postReqWithoutToken(signUpGooglePath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const signUpWithMicrosoft = async (payload) => {
  try {
    const signUpMicrosoftPath = `${AUTH_URL}/singup_with_microsoft`;
    return await postReqWithoutToken(signUpMicrosoftPath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

const signUpWithApple = async (payload) => {
  try {
    const signUpApplePath = `${AUTH_URL}/singup_with_apple`;
    return await postReqWithoutToken(signUpApplePath, payload);
  } catch (error) {
    // Toast('error', error?.response?.data?.message);
    // console.log('error', error?.response?.data?.message);
    Toast('error', error.response.data.Message);
  }
};

export const authService = {
  checkMail,
  sendOtpSMS,
  signUp,
  emailChecking,
  sendOtpMail,
  otpVerification,
  login,
  forgotPassword,
  signUpWithGoogle,
  signUpWithMicrosoft,
  signUpWithApple,
};
