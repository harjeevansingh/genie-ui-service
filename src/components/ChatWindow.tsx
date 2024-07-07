import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Client } from '@stomp/stompjs';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { setCurrentConversation, addMessage, setMessages } from '../store/chatSlice';
import { RootState } from '../store/store';
import { Conversation, Message } from '../types';

const ChatWindow: React.FC = () => {
  const dispatch = useDispatch();
  const [client, setClient] = useState<Client | null>(null);
  const currentConversation = useSelector((state: RootState) => state.chat.currentConversation);

  useEffect(() => {
    const newClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {
        console.log('Connected to WebSocket');
        if (currentConversation) {
          newClient.subscribe(`/topic/messages/${currentConversation.id}`, (message) => {
            const receivedMessage: Message = JSON.parse(message.body);
            dispatch(addMessage(receivedMessage));
          });
        }
      },
    });

    newClient.activate();
    setClient(newClient);

    return () => {
      if (newClient.active) {
        newClient.deactivate();
      }
    };
  }, [dispatch, currentConversation]);

  const startNewConversation = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/chat/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 1, title: 'New Conversation' }),
      });
      const newConversation: Conversation = await response.json();
      dispatch(setCurrentConversation(newConversation));
      dispatch(setMessages([]));
    } catch (error) {
      console.error('Error starting new conversation:', error);
    }
  };

  const sendMessage = (content: string) => {
    if (client && client.active && currentConversation) {
      const message = {
        conversationId: currentConversation.id,
        senderType: 'USER',
        content,
      };
      client.publish({
        destination: '/app/chat',
        body: JSON.stringify(message),
      });
    }
  };

  return (
    <div className="chat-window">
      <h2>Chat</h2>
      {currentConversation ? (
        <>
          <h3>{currentConversation.title}</h3>
          <MessageList />
          <MessageInput sendMessage={sendMessage} />
        </>
      ) : (
        <button onClick={startNewConversation}>Start New Conversation</button>
      )}
    </div>
  );
};

export default ChatWindow;