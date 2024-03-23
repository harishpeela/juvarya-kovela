/* eslint-disable no-new */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation from './src/navigation/rootNavigation';

const App = () => {
 
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
            <NavigationContainer>
              <RootNavigation/>
            </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;