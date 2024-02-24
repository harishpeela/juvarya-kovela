import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
export const Artist_Donar_List_Card = ({data}) => {
    console.log('dara', data);
  return (
    <View style={styles.container}>
      <View style={styles.viewCont}>
        <Image
          source={{uri: data?.artistDto?.artist?.customerProfileUrl}}
          style={styles.img}
        />
        <Text>{data?.artistDto?.artist?.firstName} </Text>
      </View>
      <View style={styles.viewCont}>
        <Image
          source={{uri: data?.donarDto?.donar?.customerProfileUrl}}
          style={styles.img}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '98%',
    borderWidth: 0.5,
    margin: '1%',
    flexDirection: 'row',
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 100 / 2,
  },
  viewCont: {
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
