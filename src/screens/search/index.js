/* eslint-disable react-native/no-inline-styles */
import {View, useColorScheme} from 'react-native';
import React from 'react';
import {BackgroundImage, PopularTemplesList} from '../../components';

const Search = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{flex: 1, backgroundColor: isDarkMode ? 'white' : 'white'}}>
      <BackgroundImage />
      <View style={{marginTop: 80}}>
        <PopularTemplesList pageNav={navigation} seeallnav={navigation} />
      </View>
    </View>
  );
};
export default Search;
