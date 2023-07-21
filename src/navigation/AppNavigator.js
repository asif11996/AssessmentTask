import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

import {Provider, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {retrieveAuthState} from '../redux/loginpersistance';

function AppNavigator() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const isAuth = useSelector(state => state?.auth?.user);

  useEffect(() => {
    // Check for persisted login state when the app starts
    const checkPersistedLoginState = async () => {
      const user = await retrieveAuthState();
      if (user == null) {
        setIsAuthenticating(false);
      } else {
        setIsAuthenticating(true);
      }
      console.log('is auth>>>>>>>>>>>>>>>00', user);

      if (user) {
        // If the user is logged in, restore the authentication state in Redux
        store.dispatch({type: 'LOGIN_SUCCESS', payload: user});
      }
    };

    checkPersistedLoginState();
  }, []);
  // alert(isAuthenticating);

  return (
    <NavigationContainer>
      {!isAuthenticating ? <AuthStack /> : <AppStack />}
      {/* { isAuth?.user ? <AppStack /> : <AuthStack />} */}
    </NavigationContainer>
  );
}

export default AppNavigator;
