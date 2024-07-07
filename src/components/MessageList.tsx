import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const MessageList: React.FC = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);

  return (
    <div className="message-list">
      {messages.map((message) => (
        <div key={message.id} className={`message ${message.senderType.toLowerCase()}`}>
          <p>{message.content}</p>
          <small>{new Date(message.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default MessageList;