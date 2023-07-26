import React from 'react';
import {fontFamily, colors} from '../../common';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
export const Item = ({text, svg, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <View style={styles.iconContainer}>{svg}</View>
    <View style={styles.textContainer}>
      <Text style={styles.itemText}>{text}</Text>
    </View>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  iconContainer: {flex: 0.15},
  textContainer: {flex: 0.85},
  itemText: {
    fontSize: 18,
    fontFamily: fontFamily.popinMedium,
    color: colors.black,
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
