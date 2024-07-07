import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ChatWindow from './components/ChatWindow';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <ChatWindow />
      </div>
    </Provider>
  );
};

export default App;