/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, Image, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {colors} from '../../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
let url = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fpainting-mountain-lake-with-mountain-background_188544-9126.jpg&tbnid=ASMDFNsL7Vw1YM&vet=12ahUKEwjJ7uTazqyDAxUGSmwGHR8RD4gQMygAegQIARBz..i&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fbackground&docid=bKJ3gdlWTtaNoM&w=626&h=358&q=images&ved=2ahUKEwjJ7uTazqyDAxUGSmwGHR8RD4gQMygAegQIARBz'
const MemberShipDetails = ({navigation, route}) => {
  const {data} = route.params || {};
  console.log('data ==><', data?.loggedInUser);
  useEffect(() => {}, [data]);
  const [index, setIndex] = useState(1);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Image
        source={{
          uri: data?.loggedInUser?.customerProfileUrl
            ? data?.loggedInUser?.customerProfileUrl
            : url
            // 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1688133109358jai hanuman.jpg',
        }}
        style={styles.img}
      />
      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}>
          <Fontisto name="arrow-left" color={'black'} size={17} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.round2} onPress={() => alert('under development')}>
          <Icon name="share" size={22} color={colors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.container}>
          <Text style={styles.type}>{data?.membershipDto?.type}</Text>
          <Text style={styles.id}>{data?.loggedInUser?.firstName} </Text>
          <Text style={styles.id}>MemberShip Id: {data?.membershipId} </Text>
        </View>
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setIndex(1)}>
            <Text
              style={{
                ...styles.tabText,
                fontSize: index === 1 ? 20 : 16,
                color: index === 1 ? colors.orangeColor : 'gray',
              }}>
              Info{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIndex(2)}>
            <Text
              style={{
                ...styles.tabText,
                fontSize: index === 2 ? 20 : 16,
                color: index === 2 ? colors.orangeColor : 'gray',
              }}>
              Highlights{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{borderWidth: 1, marginTop: 5}} />
        {index === 1 && (
          <View style={styles.data}>
            <Text>page Info under Development </Text>
          </View>
        )}
        {index === 2 && (
          <View style={styles.data}>
            <Text>page Highlights under Development </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default MemberShipDetails;
