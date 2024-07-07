import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, Conversation } from '../types';
import { RootState } from './store';

interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
}

const initialState: ChatState = {
  conversations: [],
  currentConversation: null,
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    setCurrentConversation: (state, action: PayloadAction<Conversation>) => {
      state.currentConversation = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { setConversations, setCurrentConversation, addMessage, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
export const selectMessages = (state: RootState) => state.chat.messages;