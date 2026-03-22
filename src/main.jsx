import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"
import store from './redux/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
 <Provider store={store}>
   <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <App />
   </GoogleOAuthProvider>
 </Provider>
  </BrowserRouter>
)
