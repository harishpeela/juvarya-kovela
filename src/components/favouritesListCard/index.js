/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';
export const FavTempleListCard = ({name, location, date, onPress, img}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItemContainer}>
      <View style={styles.secondaryContainer}>
        <View>
          <Image
            source={{uri: img ? img : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1686296312205image.jpg'}}
            style={{height: 70, width: 70, borderRadius: 70 / 2}}
          />
        </View>
        <View style={styles.listFirstItem}>
          <View style={styles.bulletConatianer}>
            {/* <View style={styles.bullet} /> */}
          </View>
          <View>
            <Text style={styles.itemHeading}>{name}</Text>
            <Text numberOfLines={1} style={styles.itemAdmin}>
              Temple
            </Text>
            <Text style={styles.itemLocation}>{`location-${location}`}</Text>
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
    backgroundColor: colors.black,
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
