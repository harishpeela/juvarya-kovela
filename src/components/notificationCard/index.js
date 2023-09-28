/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {colors} from '../../common';
export const NotificationCard = ({data}) => {
  return (
    <TouchableOpacity style={styles.contatainer}>
      <View style={styles.cardView}>
        <Image
          source={{
            uri: data?.jtNotificationDTO?.jtCustomer?.customerProfileUrl
              ? data?.jtNotificationDTO?.jtCustomer?.customerProfileUrl
              : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/16956203647841695620364843.jpg',
          }}
          style={styles.img}
        />
        <View>
          <Text style={{marginLeft: 10}}>
            <Text>
              <Text
                style={{
                  color: colors.black,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}>
                {data?.jtNotificationDTO?.jtCustomer?.firstName}
              </Text>
            </Text>{' '}
            following your temple{' '}
            <Text style={{color: colors.black}}>
              {data?.jtProfileDTO?.name}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  contatainer: {
    padding: 10,
    margin: 2,
    borderRadius: 10,
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
});
