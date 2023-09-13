import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { templateService } from '../../../services/templates.service';
const initialState = {
  template: [],
  status: 0,
  reply: {},
  isLoading: false,
  error: null,
};

export const addTemplate = createAsyncThunk('template/addTemplate', async (payload) => {
  const { data, status } = await templateService.addTemplate(payload);
  data.status = status;
  return data;
});

export const getTemplateList = createAsyncThunk('template/getTemplateList', async (payload) => {
  const { data, status } = await templateService.getTemplateList(payload);
  data.status = status;
  return data;
});

export const getTemplate = createAsyncThunk('template/getTemplate', async (payload) => {
  const { data, status } = await templateService.getTemplate(payload);
  data.status = status;
  return data;
});

export const getTemplateType = createAsyncThunk('template/getTemplateType', async (payload) => {
  const { data, status } = await templateService.getTemplateType(payload);
  data.status = status;
  return data;
});

export const updateTemplate = createAsyncThunk('template/updateTemplate', async (payload) => {
  console.log('payload0', payload);
  const { data, status } = await templateService.updateTemplate(payload.payload, payload?.id);
  data.status = status;
  return data;
});
export const deleteTemplate = createAsyncThunk('template/deleteTemplate', async (payload) => {
  const { data, status } = await templateService.deleteTemplate(payload);
  data.status = status;
  return data;
});

export const TemplateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    // userDetails: (state, action) => {
    //   state.inputDetails = action.payload;
    // },
    // forgotPasswordDetails: (state, action) => {
    //   state.forgotPassInfo = action.payload;
    // },
    // clearDisptach: (state) => {
    //   state.template = {};
    //   state.status = 0;
    // },
    // saveError: (state, action) => {
    //   state.error = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(addTemplate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTemplate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.template = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(addTemplate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(getTemplateList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTemplateList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.template = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(getTemplateList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTemplate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTemplate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.template = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(getTemplate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(getTemplateType.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTemplateType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.template = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(getTemplateType.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateTemplate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTemplate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.template = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(updateTemplate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteTemplate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTemplate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.template = action.payload;
      state.status = action.payload.status;
    });
    builder.addCase(deleteTemplate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
// export const { userDetails, clearDisptach, saveError, forgotPasswordDetails } = TemplateSlice.actions;
export default TemplateSlice.reducer;
