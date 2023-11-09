import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../common';
import {styles} from './style';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Sort = ({srWidth,srHeight, txtColor, brColor}) => {
  console.log(srWidth)
  return (
    <TouchableOpacity>
      <Pressable>
        <View
          style={[
            styles.sortContainer, 
            {width: srWidth ? srWidth : "100%"},
            {height: srHeight ? srHeight : 50},
    {borderColor: brColor ? brColor : colors.black}
          ]}>
          <Icon
          style={styles.sortIcon}
            name="sort"
            size={32}
            color={txtColor === undefined ? colors.black : txtColor}
          />
        </View>
      </Pressable>
    </TouchableOpacity>
  );
};

export default Sort;
