import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import axios from "axios";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
/* axios에 withCredentials를 true로 설정해줘야 refreshToken cookie를 주고받을 수 있다 */
axios.defaults.baseURL = "https://www.abc.com";
axios.defaults.withCredentials = true;

root.render(
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>
);

reportWebVitals();
