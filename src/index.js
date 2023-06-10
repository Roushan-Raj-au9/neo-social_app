import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { makeServer } from "./server";

// Call make Server 
makeServer();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <div>Hi</div>
  </React.StrictMode>
);
