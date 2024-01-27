import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import ResetPasswordScreen from './screens/ResetPasswordScreen.jsx';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.jsx';
import UpdatePasswordScreen from './screens/UpdatePassword.jsx';
import VerifyEmailScreen from './screens/VerifyEmailScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

import store from './store';
import { Provider } from 'react-redux'; 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/reset-password' element={<ResetPasswordScreen />} />
      <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
      <Route path='/verify-email' element={<VerifyEmailScreen />} />
      <Route path='/update-password' element={<UpdatePasswordScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    </Provider>
);
