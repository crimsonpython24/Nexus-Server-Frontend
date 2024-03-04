import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import { UserProvider } from './libraries/userContext.tsx';
import Login from './pages/auth/Login.tsx';
import ResetPassword from './pages/auth/ResetPassword.tsx';
import Signup from './pages/auth/Signup.tsx';
import NotFound from './pages/misc/404.tsx';
import PrivacyPolicy from './pages/misc/PrivacyPolicy.tsx';
import ToS from './pages/misc/ToS.tsx';

const rootElement = document.getElementById('root');
if (rootElement === null) {
  throw new Error('Failed to find the root element');
}
const root = ReactDOM.createRoot(rootElement);

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login/', element: <Login /> },
  { path: '/signup/', element: <Signup /> },
  { path: '/reset-password/', element: <ResetPassword /> },
  { path: '/privacy-policy/', element: <PrivacyPolicy /> },
  { path: '/terms-of-service/', element: <ToS /> },
  { path: '*', element: <NotFound /> },
]);

root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
