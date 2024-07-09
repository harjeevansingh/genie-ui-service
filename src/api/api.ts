// src/api.ts
import axios from 'axios';
import { MessageDTO, ConversationDTO } from '../types';
import { DUMMY_USER_ID } from '../constants/CommonConstants';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchConversationsAPI = () => 
  axios.get<ConversationDTO[]>(`${API_BASE_URL}/chat/conversations/` + DUMMY_USER_ID);

export const fetchMessagesAPI = (conversationId: number, beforeMessageId?: number | null) =>
    axios.get<MessageDTO[]>(`${API_BASE_URL}/chat/conversations/${conversationId}/messages`, {
      params: { beforeMessageId },
    });
  
export const sendMessageAPI = (conversationId: number, content: string) =>
  axios.post<MessageDTO>(`${API_BASE_URL}/chat/messages`, { conversationId, content });

export const startNewConversationAPI = (userId: number, title?: string) =>
    axios.post<ConversationDTO>(`${API_BASE_URL}/chat/conversations`, { userId, title });