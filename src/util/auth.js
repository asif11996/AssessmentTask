// import axios from 'axios';

// export default async function createUser(email, password) {
//   console.log('****************************************');

//   const API_KEY = 'AIzaSyABfL-Zvi8GALKv74qyYMhCZySiEb2xSTs';

//   alert('test');
//   console.log('email and password in auth is ++ .........>', email, password);

//   const response = await axios.post(
//     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyABfL-Zvi8GALKv74qyYMhCZySiEb2xSTs',

//     {
//       email: email,
//       password: password,
//       returnSecureToken: true,
//     },
//   );
// }

import axios from 'axios';

const API_KEY = 'AIzaSyABfL-Zvi8GALKv74qyYMhCZySiEb2xSTs';
console.log('****************************************');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

export const signUp = async (email, password) => {
  console.log('****************************************00000', email, password);

  const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  try {
    const response = await axios.post(endpoint, authData);
    console.log('response is ..............', response);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const signIn = async (email, password) => {
  const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  try {
    const response = await axios.post(endpoint, authData);
    console.log('response is..............', response.data);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const signOut = async () => {
  console.log(
    '****************************************00000++++++++++++++++++',
  );

  const userData = await AsyncStorage.getItem('userData');
  const transformedData = JSON.parse(userData);
  //   const {token} = transformedData;

  const isAuth = useSelector(state => state.auth);

  console.log('toke is >>>>>>>>>>>>>>>>>>>>', isAuth);

  //   console.log('token is ', token);

  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signOut?key=${API_KEY}`,
    {},
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // },
  );

  try {
    //   const response = await axios.post(endpoint, authData);
    console.log('response is..............', response.data);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
