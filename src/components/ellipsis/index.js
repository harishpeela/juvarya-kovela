import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../common';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Ellipsis = ({txtColor}) => {
  console.log('klo..');
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity>
          {/* <Icon name="ellipsis-v" size={24} color={txtColor === undefined ? (colors.black2):txtColor} /> */}
          <Icon name="ellipsis-vertical" size={24} color={txtColor === undefined ? (colors.black2):txtColor} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Ellipsis;
