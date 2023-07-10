/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {
  BackgroundImage,
  PopularTemplesList,
  UpComingEvents,
} from '../../components';
import {styles} from './style';
import {allTexts} from '../../common';

const Search = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={{marginTop: '10%'}}>
        <PopularTemplesList pageNav={navigation} seeallnav={navigation} />
        {/* <UpComingEvents /> */}
      </View>
    </View>
  );
};
export default Search;
