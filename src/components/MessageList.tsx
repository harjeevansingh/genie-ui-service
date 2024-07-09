// src/components/MessageList.tsx
import React, { useEffect, useRef } from 'react';
import { MessageDTO } from '../types';

interface MessageListProps {
  messages: MessageDTO[];
  onScrollTop: () => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, onScrollTop }) => {
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (messageListRef.current && messageListRef.current.scrollTop === 0) {
        onScrollTop();
      }
    };

    const currentMessageList = messageListRef.current;
    if (currentMessageList) {
      currentMessageList.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentMessageList) {
        currentMessageList.removeEventListener('scroll', handleScroll);
      }
    };
  }, [onScrollTop]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="message-list" ref={messageListRef}>
      {messages.map((message) => (
        <div key={message.id} className={`message ${message.senderType?.toLowerCase() || 'unknown'}`}>
          <p>{message.content}</p>
          <small>{message.timestamp ? new Date(message.timestamp).toLocaleString() : 'No timestamp'}</small>
        </div>
      ))}
    </div>
  );
};

export default MessageList;