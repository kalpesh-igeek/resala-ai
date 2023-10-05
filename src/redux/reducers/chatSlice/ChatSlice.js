import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { chatService } from '../../../services/chat.service';
const initialState = {
  chat: [],
  docHis: [],
  chatId: '',
  historyId: '',
  isLoading: false,
  error: null,
};

export const newChat = createAsyncThunk('chat/newChat', async () => {
  const { data, status } = await chatService.newChat();
  sessionStorage.setItem('chatId', data?.Result);
  data.status = status;
  return data;
});

export const userChatHistory = createAsyncThunk('chat/userChatHistory', async (payload) => {
  const { data, status } = await chatService.userChatHistory(payload);
  data.status = status;
  return data;
});

export const userChatList = createAsyncThunk('chat/userChatList', async (payload) => {
  const { data, status } = await chatService.userChatList(payload);
  data.status = status;
  return data;
});

export const userChat = createAsyncThunk('chat/userChat', async (payload) => {
  const { data, status } = await chatService.userChat(payload);
  data.status = status;
  return data;
});

export const generalPromptChat = createAsyncThunk('chat/generalPromptChat', async (payload) => {
  const { data, status } = await chatService.generalPromptChat(payload);
  data.status = status;
  return data;
});

export const userChatNew = createAsyncThunk('chat/userChatNew', async (payload) => {
  const { data, status } = await chatService.userChatNew(payload);
  data.status = status;
  return data;
});

export const regenerateChat = createAsyncThunk('chat/regenerateChat', async (payload) => {
  const { data, status } = await chatService.regenerateChat(payload);
  data.status = status;
  return data;
});

export const updatePrompt = createAsyncThunk('chat/updatePrompt', async (payload) => {
  const { data, status } = await chatService.updatePrompt(payload);
  data.status = status;
  return data;
});

export const deleteChatHistory = createAsyncThunk('chat/deleteChatHistory', async (payload) => {
  const { data, status } = await chatService.deleteChatHistory(payload);
  data.status = status;
  return data;
});

export const docHistory = createAsyncThunk('chat/docHistory', async (payload) => {
  const { data, status } = await chatService.docHistory(payload);
  data.status = status;
  return data;
});

export const ChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectChat: (state, action) => {
      state.historyId = action.payload;
    },
    // forgotPasswordDetails: (state, action) => {
    //   state.forgotPassInfo = action.payload;
    // },
    // clearDisptach: (state) => {
    //   state.chat = {};
    //   state.status = 0;
    // },
    // saveError: (state, action) => {
    //   state.error = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(newChat.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(newChat.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chat = action.payload;
      state.chatId = sessionStorage.setItem('chatId', action.payload.Result);
      state.hasPassword = true;
    });
    builder.addCase(newChat.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.hasPassword = false;
    });
    builder.addCase(userChatHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userChatHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chat = action.payload;
      state.hasPassword = true;
    });
    builder.addCase(userChatHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.hasPassword = false;
    });
    builder.addCase(userChatList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userChatList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chat = action.payload;
      state.hasPassword = true;
    });
    builder.addCase(userChatList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.hasPassword = false;
    });
    builder.addCase(userChat.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userChat.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chat = action.payload;
      state.chatId = action.payload.Result;
      state.hasPassword = true;
    });
    builder.addCase(userChat.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.hasPassword = false;
    });

    builder.addCase(generalPromptChat.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(generalPromptChat.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chat = action.payload;
      state.chatId = action.payload.Result;
      state.hasPassword = true;
    });
    builder.addCase(generalPromptChat.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.hasPassword = false;
    });

    builder.addCase(userChatNew.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userChatNew.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chat = action.payload;
      state.chatId = action.payload.Result;
      state.hasPassword = true;
    });
    builder.addCase(userChatNew.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.hasPassword = false;
    });
    builder.addCase(regenerateChat.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(regenerateChat.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chat = action.payload;
      state.chatId = action.payload.Result;
      state.hasPassword = true;
    });
    builder.addCase(regenerateChat.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.hasPassword = false;
    });
    builder.addCase(updatePrompt.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePrompt.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chat = action.payload;
    });
    builder.addCase(updatePrompt.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteChatHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteChatHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chat = action.payload;
    });
    builder.addCase(deleteChatHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(docHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(docHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.docHis = action.payload;
    });
    builder.addCase(docHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
export const { selectChat } = ChatSlice.actions;
export default ChatSlice.reducer;
