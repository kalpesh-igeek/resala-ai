import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './reducers/authSlice/AuthSlice';
import ChatSlice from './reducers/chatSlice/ChatSlice';
import ComposeSlice from './reducers/composeSlice/ComposeSlice';
import QuickReplySlice from './reducers/QuickReplySlice/QuickReplySlice';
import TemplateSlice from './reducers/templateSlice/TemplateSlice';
import UserPromptSlice from './reducers/userPromptSlice/UserPromptSlice';
import UserSlice from './reducers/userSlice/UserSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    prompt: UserPromptSlice,
    chat: ChatSlice,
    compose: ComposeSlice,
    template: TemplateSlice,
    quickReply: QuickReplySlice,
    user: UserSlice,
  },
});

export default store;
