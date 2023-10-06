import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {colors} from '../../common';
export const ProfileTimingTabs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.toptemp}>
        <Image
          source={require('../../../assets/images/Vector.png')}
          style={{height: 20, width: 20}}
        />
        <Text style={{color: colors.black}}> Top Temple</Text>
      </View>
      <View style={styles.time}>
        <Image
          source={require('../../../assets/images/schedule.png')}
          style={{height: 25, width: 25}}
        />
        <Text style={{color: '#228C08'}}> Open Now</Text>
        <Text style={{color: colors.black, fontWeight: 'bold'}}>
          {' '}
          • Closes 8 Pm
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  toptemp: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '35%',
    borderWidth: 0.5,
    padding: 2,
    borderRadius: 5,
    justifyContent: 'center',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '55%',
    borderWidth: 0.5,
    padding: 2,
    borderRadius: 5,
    justifyContent: 'center',
  },
});
