import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {colors} from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
export const ProfileTimingTabs = ({data, id}) => {
  const [templeClass, setTempleClass] = useState(' ');
  const navigation = useNavigation();
  console.log('id-------->', data?.id);
  console.log('templeclass========>', data?.templeClass);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('TempleClass', {
            id: data?.id,
            templeclass: data?.templeClass,
          })
        }>
        <View
          style={{
            marginLeft: 20,
            borderWidth: 0.5,
            borderRadius: 5,
            marginRight: 20,
          }}>
          {data?.templeClass === 'A' || 'B' || 'C' ? (
            <View style={styles.toptemp}>
              <Text
                style={{
                  padding: 5,
                  textAlign: 'center',
                  marginLeft: 5,
                  color: colors.white,
                  backgroundColor: colors.orangeColor,
                }}>
                {data?.templeClass}
              </Text>
              <Text style={{color: colors.black, left: 3, marginRight: 10}}>
                {' '}
                Top Temple
              </Text>
            </View>
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.time}>
        <AntDesign name="clockcircleo" size={20} />
        <Text style={{color: '#228C08', fontSize: 12, fontWeight: 'bold'}}>
          {' '}
          Open {data?.openingTime ? data?.openingTime : '9'} Am
        </Text>
        <Text style={{color: colors.red1, fontWeight: 'bold', fontSize: 12}}>
          {' '}
          • Closes {data?.closingTime ? data?.closingTime : '8'} Pm
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderRadius: 5,
    justifyContent: 'center',
  },
  toptemp: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    borderRadius: 5,
    justifyContent: 'center',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    padding: 4,
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20,
  },
});
