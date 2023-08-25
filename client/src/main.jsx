// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "normalize.css";
import "./index.css"
import { AlertProvider } from './contexts/alertContext';
import { AuthProvider } from './contexts/auth-context';
import { UserProvider } from './contexts/user-context';
import { PostProvider } from './contexts/post-context';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AlertProvider>
    <AuthProvider>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <PostProvider>
            <App />
          </PostProvider>
        </QueryClientProvider>
      </UserProvider>
    </AuthProvider>
  </AlertProvider>
  // </React.StrictMode>,
)