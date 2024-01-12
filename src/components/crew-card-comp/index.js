/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';
export const CrewCard = ({data, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItemContainer}>
      <View style={styles.secondaryContainer}>
        <View style={styles.listFirstItem}>
          <View style={styles.bulletConatianer}>
            <View style={styles.bullet} />
          </View>
          <View>
            <Text style={styles.itemHeading}>{data?.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  listItemContainer: {
    // backgroundColor: '#f7dbc1',
    borderRadius: 10,
    padding: 12,
    margin: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  secondaryContainer: {
    borderColor: 'blue',
    marginRight: 2,

    flexDirection: 'row',
  },
  listFirstItem: {
    flexDirection: 'row',
    flex: 0.7,
    marginLeft: '10%',
  },
  bulletConatianer: {
    marginRight: 10,
  },
  bullet: {
    marginTop: 10,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.orangeColor,
  },
  itemHeading: {
    color: colors.orangeColor,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.popinMedium,
  },
  itemAdmin: {
    color: colors.black,
    fontSize: fontSize.tiny,
    fontFamily: fontFamily.popinMedium,
  },
  itemLocation: {
    color: colors.black,
    fontSize: fontSize.tiny,
    fontFamily: fontFamily.popinMedium,
  },
});
