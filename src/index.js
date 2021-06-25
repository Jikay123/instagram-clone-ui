import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PostListContextProvider from './Context';

ReactDOM.render(
  <PostListContextProvider >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PostListContextProvider>,
  document.getElementById('root')
);

reportWebVitals();
