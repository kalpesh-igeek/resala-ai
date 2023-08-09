import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../../../services/auth.service';

const initialState = {
  user: {},
  token: '',
  inputDetails: {},
  hasPassword: false,
  status: 0,
  isLoading: false,
  error: null,
};

export const checkMail = createAsyncThunk('auth/checkMail', async (payload) => {
  const { data, status } = await authService.checkMail(payload);
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
  },
});
export const { userDetails } = AuthSlice.actions;
export default AuthSlice.reducer;
