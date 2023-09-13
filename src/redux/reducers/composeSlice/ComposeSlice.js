import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { composeService } from '../../../services/compose.service';

const initialState = {
  draft: [],
  status: 0,
  Loading: false,
  error: null,
};

export const generateDraft = createAsyncThunk('compose/generateDraft', async (payload) => {
  const { data, status } = await composeService.generateDraft(payload);
  data.status = status;
  return data;
});

export const generateReply = createAsyncThunk('template/generateReply', async (payload) => {
  const { data, status } = await composeService.generateReply(payload);
  data.status = status;
  return data;
});

export const composeDraft = createAsyncThunk('compose/composeDraft', async (payload) => {
  const { data, status } = await composeService.composeDraft(payload);
  data.status = status;
  return data;
});

export const translateText = createAsyncThunk('compose/translateText', async (payload) => {
  const { data, status } = await composeService.translateText(payload);
  data.status = status;
  return data;
});

export const ComposeSlice = createSlice({
  name: 'compose',
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
    builder.addCase(generateDraft.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(generateDraft.fulfilled, (state, action) => {
      state.Loading = false;
      state.draft = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(generateDraft.rejected, (state, action) => {
      state.Loading = false;
      state.error = action.error.message;
    });
    builder.addCase(generateReply.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(generateReply.fulfilled, (state, action) => {
      state.Loading = false;
      state.draft = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(generateReply.rejected, (state, action) => {
      state.Loading = false;
      state.error = action.error.message;
    });
    builder.addCase(composeDraft.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(composeDraft.fulfilled, (state, action) => {
      state.Loading = false;
      state.user = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(composeDraft.rejected, (state, action) => {
      state.Loading = false;
      state.error = action.error.message;
    });
    builder.addCase(translateText.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(translateText.fulfilled, (state, action) => {
      state.Loading = false;
      state.user = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(translateText.rejected, (state, action) => {
      state.Loading = false;
      state.error = action.error.message;
    });
  },
});
// export const { userDetails, clearDisptach, saveError, forgotPasswordDetails } = ComposeSlice.actions;
export default ComposeSlice.reducer;
