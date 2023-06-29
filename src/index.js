import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { makeServer } from "./server";
import Routing from './routes/Routing';
import AuthState from './context/auth/AuthState';
import PostState from './context/post/PostState';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Call make Server 
makeServer();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthState>
      <PostState>
        <Routing />
        <ToastContainer />
      </PostState>
    </AuthState>
  </React.StrictMode>
);
