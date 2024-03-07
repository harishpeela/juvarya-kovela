/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize } from '../../common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export const FavTempleListCard = ({ name, location, date, onPress, img, seasonal, onPressDelete, type }) => {
  return (
    <View style={styles.listItemContainer}>
      <TouchableOpacity onPress={onPress} style={styles.secondaryContainer}>
        <View>
          <Image
            source={{
              uri: img
                ? img
                : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
            }}
            style={{ height: 70, width: 70, borderRadius: 70 / 2 }}
          />
        </View>
        <View style={styles.listFirstItem}>
          <View>
            <Text style={styles.itemHeading}>{name}</Text>
            <Text style={styles.itemLocation}>{type}</Text>
          </View>
          {seasonal && (
            <MaterialCommunityIcons name='delete' size={24} onPress={onPressDelete} color={colors.orangeColor} style={{ marginLeft: '50%' }} />
          )}
        </View>
      </TouchableOpacity>
    </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemHeading: {
    color: colors.orangeColor,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.popinMedium,
  },
  itemLocation: {
    color: colors.gray1,
    fontSize: fontSize.tiny,
    fontFamily: fontFamily.popinMedium,
  },
});
