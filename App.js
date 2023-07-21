import React from 'react';

import store from './src/redux/store';
import {Provider, useSelector} from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  // const isAuth = useSelector(state => state.auth);

  // console.log('is auth>>>>>>>>>>>>>>>', isAuth);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
