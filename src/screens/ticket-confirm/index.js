import {View, Text} from 'react-native';
import React from 'react';
import { BackgroundImage } from '../../components';
const TicketConfirmation = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <BackgroundImage />
      <Text style={{color: 'black'}}>Ticket Confirmation is Coming soon!</Text>
    </View>
  );
};

export default TicketConfirmation;
