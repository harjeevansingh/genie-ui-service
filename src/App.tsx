import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import HomePage from './components/HomePage';
import ChatWindow from './components/ChatWindow';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat/:conversationId" element={<ChatWindow />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;