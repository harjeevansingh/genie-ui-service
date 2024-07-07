import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface Props {
  onScrollTop: () => void;
}

const MessageList: React.FC<Props> = ({ onScrollTop }) => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (messageListRef.current && messageListRef.current.scrollTop === 0) {
        onScrollTop();
      }
    };

    messageListRef.current?.addEventListener('scroll', handleScroll);
    return () => messageListRef.current?.removeEventListener('scroll', handleScroll);
  }, [onScrollTop]);

  return (
    <div className="message-list" ref={messageListRef}>
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