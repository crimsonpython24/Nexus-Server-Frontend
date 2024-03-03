import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import { UserProvider } from './libraries/userContext.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';

const rootElement = document.getElementById('root');
if (rootElement === null) {
  throw new Error('Failed to find the root element');
}
const root = ReactDOM.createRoot(rootElement);

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login/', element: <Login /> },
  { path: '/signup/', element: <Signup /> },
  { path: '/reset-password/', element: <h1>u bum</h1> },
]);

root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
