/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import Donation_Button from '../Donate_Button';
import {styles} from './style';
import { Loader } from '../loader';
import { GetProfilePic } from '../../utils/api';
export const Danation_Add_Card = ({onPress, roleId, text, id}) => {
  const [pic, setPic] = useState('');
  const [loader, setLoader] = useState(false);
  console.log('jahjas', id);
const profilePic = async () => {
  setLoader(true);
  let responce = await GetProfilePic(id);
  console.log('responce of profile', responce?.data);
  if(responce){
    setPic(responce?.data)
    setLoader(false);
  } else{
    setPic('');
    setLoader(false);
  }
}
useEffect(() => {
  profilePic()
},[id]);
  return (
    <View style={styles.container}>
      <View style={styles.second}>
       {loader ? (
        <Loader size={'small'} color={'orange'} />
       ) : (
        <Image
        source={{uri: pic?.url ? pic?.url : 'https://fanfun.s3.ap-south-1.amazonaws.com/17066989814871706698976055.jpg'}}
        style={{height: 30, wight: 30, borderRadius: 40 / 2}}
        height={40}
        width={40}
      /> 
       )}
        <View style={styles.textContainer}>
          <Text style={styles.secondText}>{text}</Text>
        </View>
      </View>
      {roleId ? (
        <Donation_Button buttonWidth={'30%'} onPress={onPress} />
      ) : (
        <Text style={styles.rs}>₹201</Text>
      )}
    </View>
  );
};
