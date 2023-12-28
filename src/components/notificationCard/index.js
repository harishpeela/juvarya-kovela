/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../common';
export const NotificationCard = ({ data, name }) => {
  return (
    <TouchableOpacity style={styles.contatainer}>
      <View style={styles.cardView}>
        <View style={styles.imgView}>
          <Image
            source={{
              uri: data?.jtCustomer?.customerProfileUrl
                ? data?.jtCustomer?.customerProfileUrl
                : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/16956203647841695620364843.jpg',
            }}
            style={styles.img}
          />
        </View>
        <View style={{ width: '90%', marginLeft: '5%' }}>
          <Text style={{
            color: colors.black,
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}>{data?.jtCustomer?.firstName} </Text>
          <Text style={styles.description}>{data?.jtProfileDTO?.desciption} </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={styles.typeView}>
          <Text
            style={styles.type}>
            {data?.type}
          </Text>
          </View>
          <Text style={styles.date}>
            {data?.jtProfileDTO?.creationTime.slice('0', '10')}
          </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  contatainer: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderBottomWidth: 0.5,
    borderColor: colors.gray2,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgView: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    borderWidth: 1,
    borderColor: colors.orangeColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  type: { 
    color: colors.orangeColor, 
    textTransform: 'capitalize',
    color: 'white'
  },
  typeView: {
    width: 60,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.orangeColor,
    borderRadius: 10
  },
  description: {
    fontSize: 16,
    marginVertical: 5
  },
  date: {
    color: 'black',
    fontWeight: 'bold',
    marginRight: '8%'
  }
});
