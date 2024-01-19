/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../common';
export const Donations_list_Card = ({ data }) => {
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      keyExtractor={({ item, index }) => index}
      renderItem={({ item, index }) => (
        <TouchableOpacity style={styles.container}>
          <Image
            source={{
              uri: item?.url
                ? item?.url
                : 'https://s3.ap-south-1.amazonaws.com/kovela.app/17055723004711705572300104.jpg',
            }}
            style={{ height: 70, width: 70, borderRadius: 70 / 2 }}
          />
          <View style={{ width: '80%', marginLeft: '3%', marginTop: '2%' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black, textTransform: 'capitalize' }}>
              {' '}
              {item?.name}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {item?.description && (
                <Text style={{ color: colors.black, fontSize: 14 }}>
                  {' '}
                  {item?.description}{' '}
                </Text>
              )}
            </View>
            <View style={{
              padding: 8,
              elevation:3,
              width: 90,
              alignSelf: 'flex-end',
              alignItems: 'center',
              shadowOpacity: 3,
              shadowColor: 'gray',
              borderWidth: 1,
              borderColor: 'white'
            }}>
              <Text style={styles.rs}>₹{item?.donation}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: 'black',
    marginVertical: '1%',
    width: '100%'

  },
  rs: {
    fontSize: 16,
    color: colors.orangeColor,
    fontWeight: 'bold',

  },
});
