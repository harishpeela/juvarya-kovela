/* eslint-disable react-native/no-inline-styles */
import {View, useColorScheme} from 'react-native';
import React from 'react';
import {PopularTemplesList} from '../../components';

const Search = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={{flex: 1, backgroundColor: isDarkMode ? 'white' : 'white'}}>
      <View style={{}}>
        <PopularTemplesList pageNav={navigation} seeallnav={navigation} navigation={navigation} />
      </View>
    </View>
  );
};
export default Search;
