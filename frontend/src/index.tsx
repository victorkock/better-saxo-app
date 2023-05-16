import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux'
import store from './redux/store'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import App from './App';
import Login from './components/login/Login';
import User from './components/user/User';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login/>,
        children: [],
      },
      {
        path: "/user",
        element: <User/>,
        children: [],
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);