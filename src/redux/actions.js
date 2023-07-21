// actions.js
// import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  storeAuthState,
  retrieveAuthState,
  removeAuthState,
} from './loginpersistance';

const API_KEY = 'AIzaSyABfL-Zvi8GALKv74qyYMhCZySiEb2xSTs';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

export const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupFailure = error => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const signupUser = (email, password) => {
  return async dispatch => {
    dispatch(signupRequest());

    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(endpoint, authData);

      const user = response.data;

      storeAuthState(user);
      dispatch(signupSuccess(user));
    } catch (error) {
      dispatch(signupFailure(error.response.data.error));
    }
  };
};

export const loginUser = (email, password) => {
  //   console.log('userData is:!...', userData);

  return async dispatch => {
    dispatch(loginRequest());

    try {
      const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
      const authData = {
        email,
        password,
        returnSecureToken: true,
      };
      const response = await axios.post(endpoint, authData);
      const user = response.data;

      console.log('response is..............33', user);

      dispatch(loginSuccess(user));
      storeAuthState(user);
    } catch (error) {
      dispatch(loginFailure(error.response.data.error));
    }
  };
};

// export const logoutUser = async () => {
//   try {
//     // Send a POST request to the Firebase Auth REST API's signOut endpoint
//     const userData = await AsyncStorage.getItem('userData');
//     const transformedData = JSON.parse(userData);
//     const {token} = transformedData;

//     const response = await axios.post(
//       `https://identitytoolkit.googleapis.com/v1/accounts:signOut?key=${API_KEY}`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );

//     console.log('User logged out successfully');
//   } catch (error) {
//     console.error('Error logging out: ', error.response.data);
//   }
// };

// Asynchronous action to handle user logout using Firebase Auth

export const logoutUser = async (email, password) => {
  const userData = await retrieveAuthState();
  const token = userData?.idToken;
  console.log('data', token);

  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signOut?key=${API_KEY}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log('response is .........', response);
};

export const logoutUser1 = () => {
  alert('mm');
  return async dispatch => {
    try {
      const userData = await retrieveAuthState();

      console.log('token is ', userData);

      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signOut?key=${API_KEY}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch(logout());
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };
};

const saveDataToStorage = (name, email, idToken) => {
  console.log('____________________________', name, email, idToken);
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      name: name,
      email: email,
      token: idToken,
    }),
  );
};

console.log('tag', '');
