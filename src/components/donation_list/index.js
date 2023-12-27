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
import {colors} from '../../common';
export const Donations_list_Card = ({data}) => {
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      keyExtractor={({item, index}) => index}
      renderItem={({item, index}) => (
        <TouchableOpacity style={styles.container}>
          <Image
            source={{
              uri: item?.url
                ? item?.url
                : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1688133109358jai hanuman.jpg',
            }}
            style={{height: 70, width: 70, borderRadius: 70 / 2}}
          />
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              {' '}
              {item?.email}
            </Text>
            {item?.description && (
              <Text style={{color: colors.orangeColor, fontSize: 14}}>
                {' '}
                for {item?.description}{' '}
              </Text>
            )}
          </View>
          <Text style={styles.rs}>₹ {item?.donation}</Text>
        </TouchableOpacity>
      )}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderColor: 'lightgray',
    alignItems: 'center',
    margin: '1%',
  },
  rs: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});
