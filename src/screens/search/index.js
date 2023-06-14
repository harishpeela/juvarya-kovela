/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {BackgroundImage, NearBy, UpComingEvents} from '../../components';
import {styles} from './style';

const Search = ({navigation}) => {

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={{marginTop: '10%'}}>
        <NearBy />
        {/* <UpComingEvents /> */}
      </View>
    </View>
  );
};
export default Search;
