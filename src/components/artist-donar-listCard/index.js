/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {colors} from '../../common';
import Ioniconss from 'react-native-vector-icons/Entypo';
export const Artist_Donar_List_Card = ({data, onPressArtist, onPressPlus}) => {
  // console.log('dara', data);
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          left: 30,
          top: -5,
          backgroundColor: 'white',
          fontWeight: 'bold',
          borderWidth: 0.3,
          borderColor: colors.gray2,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 5,
        }}>
        <Text
          style={{
            fontSize: 16,
          }}>
          {data?.year?.substring(6, 11)}{' '}
        </Text>
      </View>
      <View style={styles.viewCont}>
        {data?.donarDto ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={{
                uri: data?.artistDto?.artist?.customerProfileUrl
                  ? data?.artistDto?.artist?.customerProfileUrl
                  : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
              }}
              style={styles.img}
            />
            <View style={{alignItems: 'center', marginTop: '2%'}}>
              <Text style={styles.title}>Donar </Text>
              <Text style={styles.name}>{data?.donarDto?.name}</Text>
              {/* <Text> Year: {data?.year?.substring(6, 11)}</Text> */}
            </View>
          </View>
        ) : (
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={onPressPlus}
              style={{
                height: 70,
                width: 70,
                borderRadius: 100 / 2,
                borderWidth: 2,
                margin: 2,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: colors.orangeColor,
              }}>
              <Ioniconss name="plus" size={25} color={colors.orangeColor} />
            </TouchableOpacity>
            <Text style={{color: 'black'}}>Add Donar</Text>
          </View>
        )}
      </View>
      <View style={styles.viewCont}>
        {data?.artistDto ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={{
                uri: data?.donarDto?.donar?.customerProfileUrl
                  ? data?.donarDto?.donar?.customerProfileUrl
                  : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
              }}
              style={styles.img}
            />
            <View style={{alignItems: 'center', marginTop: '5%'}}>
              <Text style={styles.title}>Artist </Text>
              <Text style={styles.name}>
                {data?.artistDto
                  ? data?.artistDto?.artist?.fullName
                  : 'No Name'}{' '}
              </Text>
              {/* <Text> Year: {data?.year?.substring(6, 11)}</Text> */}
            </View>
          </View>
        ) : (
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={onPressArtist}
              style={{
                height: 50,
                width: 50,
                borderRadius: 100 / 2,
                borderWidth: 2,
                margin: 2,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: colors.orangeColor,
              }}>
              <Ioniconss name="plus" size={25} color={colors.orangeColor} />
            </TouchableOpacity>
            <Text style={{color: 'black'}}>Add Artist</Text>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '98%',
    // borderWidth: 0.5,
    margin: '1%',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: colors.gray2,
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.2,
    elevation: 0.01,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 100 / 2,
  },
  viewCont: {
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: colors.black,
  },
  name: {
    fontSize: 13,
    color: colors.black,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
