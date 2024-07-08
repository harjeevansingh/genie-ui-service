// src/store/chatSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { fetchConversationsAPI, fetchMessagesAPI, sendMessageAPI, startNewConversationAPI } from '../api';
import { ConversationDTO, MessageDTO } from '../types';
import { fetchConversationsAPI, fetchMessagesAPI, sendMessageAPI, startNewConversationAPI } from '../api/api';
import { RootState } from './store';
import { DUMMY_USER_ID } from '../constants/CommonConstants';

export const fetchConversations = createAsyncThunk(
  'chat/fetchConversations',
  async () => {
    const response = await fetchConversationsAPI();
    return response.data;
  }
);

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (conversationId: number) => {
    const response = await fetchMessagesAPI(conversationId);
    return response.data;
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ conversationId, content }: { conversationId: number; content: string }) => {
    const response = await sendMessageAPI(conversationId, content);
    return response.data;
  }
);

export const startNewConversation = createAsyncThunk(
  'chat/startNewConversation',
  async (_, { getState }) => {
    const userId = DUMMY_USER_ID;
    const title = `New Conversation ${new Date().toLocaleString()}`;
    const response = await startNewConversationAPI(userId, title);
    return response.data;
  }
);

export const loadMoreMessages = createAsyncThunk(
  'chat/loadMoreMessages',
  async (conversationId: number, { getState }) => {
    const state = getState() as RootState;
    const oldestMessageId = state.chat.messages[0]?.id;
    const response = await fetchMessagesAPI(conversationId, oldestMessageId);
    return response.data;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    conversations: [] as ConversationDTO[],
    messages: [] as MessageDTO[],
    currentConversationId: null as number | null,
  },
  reducers: {
    addMessage: (state, action: PayloadAction<MessageDTO>) => {
      state.messages.push(action.payload);
    } 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.fulfilled, (state, action: PayloadAction<ConversationDTO[]>) => {
        state.conversations = action.payload;
      })
      .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<MessageDTO[]>) => {
        state.messages = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action: PayloadAction<MessageDTO>) => {
        state.messages.push(action.payload);
      })
      .addCase(startNewConversation.fulfilled, (state, action: PayloadAction<ConversationDTO>) => {
        state.conversations.unshift(action.payload);
        state.currentConversationId = action.payload.id;
      })
      .addCase(loadMoreMessages.fulfilled, (state, action: PayloadAction<MessageDTO[]>) => {
        state.messages = [...action.payload, ...state.messages];
      });
  },
});

export default chatSlice.reducer;
export const { addMessage } = chatSlice.actions;