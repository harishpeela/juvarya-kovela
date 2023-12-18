/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, Image, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {colors} from '../../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const MemberShipDetails = ({navigation, route}) => {
  const {data} = route.params || {};
  console.log('data route', data);
  useEffect(() => {}, [data]);
  const [index, setIndex] = useState(0);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Image
        source={{
          uri: data?.loggedInUser?.customerProfileUrl
            ? data?.loggedInUser?.customerProfileUrl
            : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1688133109358jai hanuman.jpg',
        }}
        style={styles.img}
      />
      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}>
          <Fontisto name="arrow-left" color={'white'} size={17} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.round2}>
          <Icon name="share" size={22} color={colors.white} />
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
