import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../../../services/user.service';
const initialState = {
  language: [],
  status: 0,
  isLoading: false,
  error: null,
};

export const respondLanguage = createAsyncThunk('user/respondLanguage', async (payload) => {
  const { data, status } = await userService.respondLanguage(payload);
  data.status = status;
  return data;
});

export const updateLanguage = createAsyncThunk('user/updateLanguage', async (payload) => {
  const { data, status } = await userService.updateLanguage(payload);
  data.status = status;
  return data;
});

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // userDetails: (state, action) => {
    //   state.inputDetails = action.payload;
    // },
    // forgotPasswordDetails: (state, action) => {
    //   state.forgotPassInfo = action.payload;
    // },
    // clearDisptach: (state) => {
    //   state.user = {};
    //   state.status = 0;
    // },
    // saveError: (state, action) => {
    //   state.error = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(respondLanguage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(respondLanguage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.language = action.payload;
      state.prompt = action.payload;
    });
    builder.addCase(respondLanguage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateLanguage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateLanguage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.language = action.payload;
      state.prompt = action.payload;
    });
    builder.addCase(updateLanguage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
// export const { userDetails, clearDisptach, saveError, forgotPasswordDetails } = UserSlice.actions;
export default UserSlice.reducer;
