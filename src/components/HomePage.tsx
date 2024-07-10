import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchConversations, startNewConversation } from '../store/chatSlice';
import { RootState, AppDispatch } from '../store/store';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const conversations = useSelector((state: RootState) => state.chat.conversations);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  const handleNewChat = async () => {
    try {
      const resultAction = await dispatch(startNewConversation());
      if (startNewConversation.fulfilled.match(resultAction)) {
        navigate(`/chat/${resultAction.payload.id}`);
      } else {
        console.error('Failed to start new conversation:', resultAction.error);
      }
    } catch (error) {
      console.error('Error starting new conversation:', error);
    }
  };

  return (
    <div className="home-page">
      <h1>Chat Conversations</h1>
      <button onClick={handleNewChat}>Start New Chat</button>
      <ul className="conversation-list">
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <Link to={`/chat/${conversation.id}`}>
              {conversation.title || `Conversation ${conversation.id}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;