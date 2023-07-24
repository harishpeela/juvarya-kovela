/* eslint-disable react-native/no-inline-styles */
import {View, Text, useColorScheme} from 'react-native';
import React from 'react';
import {BackgroundImage} from '../../components';
const TicketConfirmation = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDarkMode ? 'white' : 'white',
      }}>
      <BackgroundImage />
      <Text style={{color: 'black'}}>
        Ticket Confirmation is Coming soon ...!
      </Text>
    </View>
  );
};

export default TicketConfirmation;
