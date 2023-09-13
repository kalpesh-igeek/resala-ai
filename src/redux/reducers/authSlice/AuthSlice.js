import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../../../services/auth.service';

const initialState = {
  user: {},
  token: '',
  isUserEmail: '',
  inputDetails: {},
  forgotPassInfo: {},
  activity: false,
  languages: [],
  hasPassword: false,
  status: 0,
  isLoading: false,
  error: null,
  errorMessage: '',
};

export const checkMail = createAsyncThunk('auth/checkMail', async (payload) => {
  const { data, status } = await authService.checkMail(payload);
  data.status = status;
  return data;
});

export const emailChecking = createAsyncThunk('auth/emailChecking', async (payload) => {
  const { data, status } = await authService.emailChecking(payload);
  data.status = status;
  return data;
});

export const sendOtpSMS = createAsyncThunk('auth/sendOtpSMS', async (payload) => {
  const { data, status } = await authService.sendOtpSMS(payload);
  data.status = status;
  return data;
});

export const otpVerification = createAsyncThunk('auth/otpVerification', async (payload) => {
  const { data, status } = await authService.otpVerification(payload);
  data.status = status;
  return data;
});

export const signUp = createAsyncThunk('auth/signUp', async (payload) => {
  const { data, status } = await authService.signUp(payload);
  data.status = status;
  return data;
});

export const login = createAsyncThunk('auth/login', async (payload) => {
  const { data, status } = await authService.login(payload);
  data.status = status;
  return data;
});

export const sendOtpMail = createAsyncThunk('auth/sendOtpMail', async (payload) => {
  const { data, status } = await authService.sendOtpMail(payload);
  data.status = status;
  return data;
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (payload) => {
  const { data, status } = await authService.forgotPassword(payload);
  data.status = status;
  return data;
});

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userDetails: (state, action) => {
      state.inputDetails = action.payload;
    },
    forgotPasswordDetails: (state, action) => {
      state.forgotPassInfo = action.payload;
    },
    clearDisptach: (state) => {
      state.user = {};
      state.status = 0;
    },
    saveError: (state, action) => {
      state.error = action.payload;
    },
    checkActivity: (state, action) => {
      state.activity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkMail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkMail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.status = action.payload.status;
      state.hasPassword = true;
    });
    builder.addCase(checkMail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.hasPassword = false;
    });
    builder.addCase(emailChecking.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(emailChecking.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.status = action.payload.status;
      state.hasPassword = true;
    });
    builder.addCase(emailChecking.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.hasPassword = false;
    });
    builder.addCase(sendOtpSMS.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendOtpSMS.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.status = action.payload.status;
      state.hasPassword = true;
    });
    builder.addCase(sendOtpSMS.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.hasPassword = false;
    });
    builder.addCase(otpVerification.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(otpVerification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.status = action.payload.status;
      state.hasPassword = true;
    });
    builder.addCase(otpVerification.rejected, (state, action) => {
      state.isLoading = false;
      state.user = action;
      state.error = action;
      state.hasPassword = false;
    });
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      let userPreferences = {
        Responed_language: action.payload.Result?.Responed_language,
        preference_language: action.payload.Result?.preference_language,
        responed_tone: action.payload.Result?.responed_tone,
      };
      localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
      state.status = action.payload.status;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action;
    });
    builder.addCase(sendOtpMail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendOtpMail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(sendOtpMail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
export const { userDetails, clearDisptach, saveError, forgotPasswordDetails, checkActivity } = AuthSlice.actions;
export default AuthSlice.reducer;
