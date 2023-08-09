/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';

export const FollowersListCard = ({name, location, date, onPress, img}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItemContainer}>
      <View style={styles.secondaryContainer}>
        <View>
          <Image
            source={{
              uri: img
                ? img
                : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1688133109358jai hanuman.jpg',
            }}
            style={{height: 70, width: 70, borderRadius: 70 / 2}}
          />
        </View>
        <View style={styles.listFirstItem}>
          <View style={styles.bulletConatianer}>
            <View style={styles.bullet} />
          </View>
          <Text style={styles.itemHeading}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  listItemContainer: {
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
    alignItems: 'center',
  },
  bulletConatianer: {
    marginRight: 10,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.black,
  },
  itemHeading: {
    color: colors.black,
    fontSize: fontSize.large,
    fontFamily: fontFamily.popinMedium,
  },
  itemAdmin: {
    color: colors.green2,
    fontSize: fontSize.tiny,
    fontFamily: fontFamily.popinMedium,
  },
  itemLocation: {
    color: colors.green2,
    fontSize: fontSize.tiny,
    fontFamily: fontFamily.popinMedium,
  },
});
