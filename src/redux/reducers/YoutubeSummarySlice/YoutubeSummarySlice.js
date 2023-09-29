import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { YoutubeSummaryService } from '../../../services/youtubeSummary.service';
const initialState = {
  youtubeSummary: [],
  ideas: [],
  status: 0,
  Loading: false,
  error: null,
};

export const generateYoutubeSummary = createAsyncThunk('youtubeSummary/generateYoutubeSummary', async (payload) => {
  const { data, status } = await YoutubeSummaryService.generateYoutubeSummary(payload);
  data.status = status;
  return data;
});

export const YoutubeSummarySlice = createSlice({
  name: 'youtubeSummary',
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
    builder.addCase(generateYoutubeSummary.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(generateYoutubeSummary.fulfilled, (state, action) => {
      state.Loading = false;
      state.youtubeSummary = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(generateYoutubeSummary.rejected, (state, action) => {
      state.Loading = false;
      state.error = action.error.message;
    });
  },
});
// export const { userDetails, clearDisptach, saveError, forgotPasswordDetails } = YoutubeSummarySlice.actions;
export default YoutubeSummarySlice.reducer;
