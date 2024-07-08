import React, { useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchMessages, loadMoreMessages, addMessage } from '../store/chatSlice';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Client } from '@stomp/stompjs';
import { MessageDTO } from '../types';

const ChatWindow: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const clientRef = useRef<Client | null>(null);
  
  const messages = useAppSelector((state) => state.chat.messages);
  const conversations = useAppSelector((state) => state.chat.conversations);
  const currentConversation = conversations.find(conv => conv.id === Number(conversationId));

  useEffect(() => {
    if (conversationId) {
      dispatch(fetchMessages(parseInt(conversationId, 10)));
    }
  }, [dispatch, conversationId]);

  useEffect(() => {
    if (conversationId) {
      const client = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        onConnect: () => {
          console.log('Connected to WebSocket');
          client.subscribe(`/topic/messages/${conversationId}`, (message) => {
            const receivedMessage: MessageDTO = JSON.parse(message.body);
            dispatch(addMessage(receivedMessage));
          });
        },
      });

      client.activate();
      clientRef.current = client;

      return () => {
        if (client.active) {
          client.deactivate();
        }
      };
    }
  }, [dispatch, conversationId]);

  const handleScrollTop = useCallback(() => {
    if (conversationId) {
      dispatch(loadMoreMessages(parseInt(conversationId, 10)));
    }
  }, [dispatch, conversationId]);

  const handleSendMessage = (content: string) => {
    if (clientRef.current && clientRef.current.active && conversationId) {
      const message: MessageDTO = {
        id: Date.now(),
        conversationId: parseInt(conversationId),
        content: content.trim(),
        senderType: 'USER' as const,
        timestamp: new Date().toISOString(),
      };
      clientRef.current.publish({
        destination: '/app/chat',
        body: JSON.stringify(message),
      });
      dispatch(addMessage(message));
    }
  };

  if (!currentConversation) {
    return <div>Conversation not found</div>;
  }

  return (
    <div className="chat-window">
      <h2>{currentConversation.title || `Conversation ${currentConversation.id}`}</h2>
      <button onClick={() => navigate('/')}>Back to Conversations</button>
      <MessageList messages={messages} onScrollTop={handleScrollTop} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;