/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import {colors} from '../../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BackgroundSmallFlowerRs} from '../../backgroundFlower';
export const Donation_Second_Tab = () => {
  const [activeIndex, setActiveIndex] = useState();
  let Data = [
    {id: 1, rs: '101'},
    {id: 2, rs: '201'},
    {id: 3, rs: '301'},
    {id: 4, rs: '401'},
    {id: 5, rs: '501'},
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.choose}>Choose amount</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={Data}
        keyExtractor={({item, index}) => index}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => setActiveIndex(index)}
            style={{
              ...styles.flatlist,
              backgroundColor: activeIndex === index ? '#CC4501' : colors.white,
            }}>
            <Image
              source={require('../../../../assets/images/smallflower.png')}
            />
            <Text
              style={{
                ...styles.text,
                color: activeIndex === index ? colors.white : '#CC4501',
              }}>
              {' '}
              ₹{item?.rs}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.inputView}>
        <BackgroundSmallFlowerRs />
        <TextInput placeholder="Other Amount" style={styles.input} />
      </View>
      <View style={styles.border} />
      <View style={styles.donationUser}>
        <Text style={{color: colors.black}}>
          Feature your profile on temple page just by donating an amount more
          than ₹201.
        </Text>
        <View style={styles.userDonView}>
          <ImageBackground
            source={require('../../../../assets/images/smallflower.png')}
            imageStyle={{height: 60, width: 60}}
            style={{alignItems: 'center', width: 50}}>
            <Image
              source={require('../../../../assets/images/hanuman.png')}
              style={styles.userimg}
            />
          </ImageBackground>
          <View style={{marginLeft: '4%'}}>
            <Text style={{color: colors.black, fontWeight: '500'}}>
              Top Donation by Savitha Devi
            </Text>
            <TouchableOpacity style={styles.userTouch}>
              <Text style={styles.usertext}>
                <AntDesign name="star" size={14} color={'#CC4501'} /> Featured
                Profile{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  choose: {margin: 10, fontSize: 18, fontWeight: 'bold', color: colors.black},
  flatlist: {
    borderWidth: 0.5,
    padding: 10,
    margin: 5,
    width: 100,
    flexDirection: 'row',
    borderRadius: 25,
    marginTop: 10,
  },
  text: {
    position: 'absolute',
    top: 13,
    left: 25,
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputView: {
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginHorizontal: 20,
    marginTop: '2%',
    backgroundColor: colors.white,
    borderRadius: 30,
  },
  input: {
    marginLeft: 40,
    fontSize: 20,
    fontWeight: '400',
  },
  border: {
    borderWidth: 0.3,
    borderColor: 'lightgray',
    marginTop: 30,
    marginHorizontal: 20,
  },
  donationUser: {
    margin: 20,
  },
  userimg: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginTop: 5,
    marginLeft: 5,
  },
  userDonView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  usertext: {
    fontSize: 12,
    color: '#CC4501',
  },
  userTouch: {
    borderWidth: 0.5,
    width: 120,
    padding: 3,
    borderRadius: 10,
    borderColor: '#CC4501',
    marginTop: 5,
  },
});
