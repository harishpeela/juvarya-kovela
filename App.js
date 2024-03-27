/* eslint-disable no-new */
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation from './src/navigation/rootNavigation';


const App = () => {
 
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <SafeAreaProvider>
            <StatusBar
              backgroundColor="white"
              barStyle="dark-content"
              translucent={true}
            />
            <NavigationContainer>
              <RootNavigation/>
            </NavigationContainer>
          </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;