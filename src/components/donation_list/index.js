/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo} from 'react';
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
import { GetProfilePic } from '../../utils/api';
export const Donations_list_Card = ({ data, navigation, onPressDel}) => {
const [donData, setDonData] = useState({});
  const customerProfilePic = async (e) => {
    try {
      let result = await GetProfilePic(e?.email);
      console.log('profilepic', result?.data);
      if (result?.status === 200) {
        let responce = { ...e, url: result?.data?.url };
        // console.log('responce', responce);
        if (responce) {
           setDonData(responce)
        }
      } else {
        setDonData(e)
      }
    } catch (error) {
      setDonData(e)
      console.log('error in profile pic api in donations', error);
    }
  };

  useMemo(()=> {
    if(data) customerProfilePic(data)
  }, [data])
  return (
        <TouchableOpacity style={styles.container}>
          <EntypoIcon name="cross" size={20} onPress={onPressDel} style={{position:'absolute' , top:5, right:5}} color={'black'}/>
          <Image
            source={{
              uri: donData?.url
                ? donData?.url
                : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
            }}
            style={{ height: 70, width: 70, borderRadius: 70 / 2 }}
          />
          <View style={{ width: '80%', marginLeft: '3%', marginTop: '2%' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black, textTransform: 'capitalize' }}>
              {' '}
              {donData?.donorName ? donData?.donorName : donData?.name}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {donData?.description && (
                <Text style={{ color: colors.black, fontSize: 14 }}>
                  {' '}
                  {donData?.description}{' '}
                </Text>
              )}
            </View>
            <View style={styles.donText}>
              <Text style={styles.rs}>₹{donData?.donation}</Text>
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
  donText: {
    padding: 8,
    elevation:3,
    width: 90,
    alignSelf: 'flex-end',
    alignItems: 'center',
    shadowOpacity: 3,
    shadowColor: 'gray',
    borderWidth: 1,
    borderColor: 'white'
  },
});
