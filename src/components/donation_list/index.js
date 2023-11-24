/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {colors} from '../../common';
export const Donations_list_Card = ({data}) => {
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      keyExtractor={({item, index}) => index}
      renderItem={({item, index}) => (
        <View style={styles.container}>
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
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    padding: 15,
    marginHorizontal: '5%',
    margin: '1%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderColor: 'lightgray',
    alignItems: 'center',
  },
  rs: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});
