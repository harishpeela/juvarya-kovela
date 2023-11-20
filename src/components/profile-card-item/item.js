/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React from 'react';
import {fontFamily, colors} from '../../common';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
} from 'react-native';

export const Item = ({text, svg, onPress}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <View style={styles.iconContainer}>{svg}</View>
      <View style={styles.textContainer}>
        <Text
          style={{...styles.itemText, color: isDarkMode ? 'black' : 'black'}}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderColor:'yellow',
    alignItems:'center',
    justifyContent:"space-between",
  },
  iconContainer: {
  minWidth:'auto',
  // borderWidth:2
  },
  textContainer: {
  width:'80%',
  // borderWidth:2
  },
  itemText: {
    fontSize: 18,
    fontFamily: fontFamily.popinMedium,
    textTransform: 'capitalize',
  },
  item1Contaimer: {
    borderWidth: 2,
    borderRadius: 20,
    padding: 2,
    borderColor: colors.orangeColor,
  },
  svg: {height: 20, width: 20, tintColor: colors.orangeColor},
  itemText1: {
    fontSize: 18,
    fontFamily: fontFamily.popinMedium,
    color: colors.black,
    textTransform: 'capitalize',
    marginLeft: '10%',
  },
});
export const Item1 = ({text, svg, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <View style={styles.item1Contaimer}>
      <Image source={svg} style={styles.svg} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.itemText1}>{text}</Text>
    </View>
  </TouchableOpacity>
);
