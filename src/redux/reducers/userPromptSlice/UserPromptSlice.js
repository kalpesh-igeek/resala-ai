import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userPromptService } from '../../../services/userChatPrompt.service';

const initialState = {
  prompt: [],
  isLoading: false,
  error: null,
};

export const addPrompt = createAsyncThunk('prompt/addPrompt', async (payload) => {
  const { data, status } = await userPromptService.addPrompt(payload);
  data.status = status;
  return data;
});

export const getPrompt = createAsyncThunk('prompt/getPrompt', async (payload) => {
  const { data, status } = await userPromptService.getPrompt(payload);
  data.status = status;
  return data;
});

export const getPromptList = createAsyncThunk('prompt/getPromptList', async (payload) => {
  const { data, status } = await userPromptService.getPromptList(payload);
  data.status = status;
  return data;
});

export const getDefauPromptList = createAsyncThunk('prompt/getDefauPromptList', async (payload) => {
  const { data, status } = await userPromptService.getDefauPromptList(payload);
  data.status = status;
  return data;
});

export const searchPrompt = createAsyncThunk('prompt/searchPrompt', async (payload) => {
  const { data, status } = await userPromptService.searchPrompt(payload);
  data.status = status;
  return data;
});

export const updatePrompt = createAsyncThunk('prompt/updatePrompt', async (payload) => {
  const { data, status } = await userPromptService.updatePrompt(payload.id, {
    name: payload?.name,
    prompt: payload?.prompt,
  });
  data.status = status;
  return data;
});

export const deletePrompt = createAsyncThunk('prompt/deletePrompt', async (payload) => {
  const { data, status } = await userPromptService.deletePrompt(payload);
  data.status = status;
  return data;
});

export const UserPromptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    // userDetails: (state, action) => {
    //   state.inputDetails = action.payload;
    // },
    // forgotPasswordDetails: (state, action) => {
    //   state.forgotPassInfo = action.payload;
    // },
    // clearDisptach: (state) => {
    //   state.prompt = {};
    //   state.status = 0;
    // },
    // saveError: (state, action) => {
    //   state.error = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(addPrompt.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addPrompt.fulfilled, (state, action) => {
      state.isLoading = false;
      state.prompt = action.payload;
      state.hasPassword = true;
    });
    builder.addCase(addPrompt.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.hasPassword = false;
    });
    builder.addCase(getPrompt.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPrompt.fulfilled, (state, action) => {
      state.isLoading = false;
      state.prompt = action.payload;
      state.hasPassword = true;
    });
    builder.addCase(getPrompt.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.hasPassword = false;
    });
    builder.addCase(getPromptList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPromptList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.prompt = action.payload;
      state.hasPassword = true;
    });
    builder.addCase(getPromptList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.hasPassword = false;
    });
    builder.addCase(getDefauPromptList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDefauPromptList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.prompt = action.payload;
      state.hasPassword = true;
    });
    builder.addCase(getDefauPromptList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.hasPassword = false;
    });
    builder.addCase(searchPrompt.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchPrompt.fulfilled, (state, action) => {
      state.isLoading = false;
      state.prompt = action.payload;
      state.hasPassword = true;
    });
    builder.addCase(searchPrompt.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.hasPassword = false;
    });
    builder.addCase(updatePrompt.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePrompt.fulfilled, (state, action) => {
      state.isLoading = false;
      state.prompt = action.payload;
    });
    builder.addCase(updatePrompt.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deletePrompt.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePrompt.fulfilled, (state, action) => {
      state.isLoading = false;
      state.prompt = action.payload;
    });
    builder.addCase(deletePrompt.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
// export const { userDetails, clearDisptach, saveError, forgotPasswordDetails } = AuthSlice.actions;
export default UserPromptSlice.reducer;
