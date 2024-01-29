/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../common';
export const ProfileDonationsCard = ({ data, navigation, onPressDel}) => {  
  return (
        <TouchableOpacity style={styles.container}>
          {/* <EntypoIcon name="cross" size={20} onPress={onPressDel} style={{position:'absolute' , top:5, right:5}}/> */}
          <Image
            source={{
              uri: data?.url
                ? data?.url
                : 'https://s3.ap-south-1.amazonaws.com/kovela.app/17055723004711705572300104.jpg',
            }}
            style={{ height: 70, width: 70, borderRadius: 70 / 2 }}
          />
          <View style={{ width: '80%', marginLeft: '3%', marginTop: '2%' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black, textTransform: 'capitalize' }}>
              {' '}
              {data?.name}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {data?.description && (
                <Text style={{ color: colors.black, fontSize: 14 }}>
                  {' '}
                  {data?.description}{' '}
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
              <Text style={styles.rs}>₹{data?.donation}</Text>
            </View>
          </View>
        </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
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
