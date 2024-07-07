import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../store/chatSlice';
import { RootState } from '../store/store';

interface Props {
  sendMessage: (content: string) => void;
}

const MessageInput: React.FC<Props> = ({ sendMessage }) => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const currentConversation = useSelector((state: RootState) => state.chat.currentConversation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && currentConversation) {
      const message = {
        id: Date.now(),
        conversationId: currentConversation.id,
        senderType: 'USER' as const,
        content: content.trim(),
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(message));
      sendMessage(content.trim());
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;