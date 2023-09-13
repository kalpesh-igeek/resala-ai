import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { quicReplyService } from '../../../services/quickReply.service';
const initialState = {
  quickReply: [],
  ideas: [],
  status: 0,
  Loading: false,
  error: null,
};

export const generateMail = createAsyncThunk('quickReply/generateMail', async (payload) => {
  const { data, status } = await quicReplyService.generateMail(payload);
  data.status = status;
  return data;
});

export const getIdeasReply = createAsyncThunk('quickReply/getIdeasReply', async (payload) => {
  const { data, status } = await quicReplyService.getIdeasReply(payload);
  data.status = status;
  return data;
});

export const QuickReplySlice = createSlice({
  name: 'quickReply',
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
    builder.addCase(generateMail.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(generateMail.fulfilled, (state, action) => {
      state.Loading = false;
      state.quickReply = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(generateMail.rejected, (state, action) => {
      state.Loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getIdeasReply.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(getIdeasReply.fulfilled, (state, action) => {
      state.Loading = false;
      state.ideas = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(getIdeasReply.rejected, (state, action) => {
      state.Loading = false;
      state.error = action.error.message;
    });
  },
});
// export const { userDetails, clearDisptach, saveError, forgotPasswordDetails } = QuickReplySlice.actions;
export default QuickReplySlice.reducer;
