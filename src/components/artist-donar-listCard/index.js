import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors} from '../../common';
export const Artist_Donar_List_Card = ({data}) => {
  console.log('dara', data);
  return (
    <View style={styles.container}>
      <View style={styles.viewCont}>
        <Image
          source={{
            uri: data?.artistDto?.artist?.customerProfileUrl
              ? data?.artistDto?.artist?.customerProfileUrl
              : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
          }}
          style={styles.img}
        />
         <View style={{alignItems: 'center', marginTop: '5%'}}>
          <Text style={styles.title}>Donar </Text>
          <Text style={styles.name}>{data?.donarDto?.donar?.firstName} </Text>
          <Text> Year: {data?.year?.substring(6, 11)}</Text>
        </View>
       
      </View>
      <View style={styles.viewCont}>
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
            {data?.artistDto?.artist?.firstName
              ? data?.artistDto?.artist?.firstName
              : 'No Artist'}{' '}
          </Text>
          <Text> Year: {data?.year?.substring(6, 11)}</Text>
        </View>
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
