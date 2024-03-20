import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {colors} from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
export const ProfileTimingTabs = ({data, id}) => {

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
            // marginLeft: 20,
            // borderWidth: 0.3,
            // borderRadius: 5,
            // marginRight: 20,
          }}>
          {data?.templeClass === 'A' || 'B' || 'C' ? (
            <View style={styles.toptemp}>
              <Text
                style={{
                  padding: 4,
                  color: colors.white,
                  backgroundColor: colors.orangeColor,
                  height:20,
                  width: 20,
                  fontSize: 9,
                  // marginLeft:'-25%',
                  borderRadius:3,
                  marginTop:'-1%',
                  textAlign:'center'
                
                }}>
                {data?.templeClass}
              </Text>
              <Text style={{color: colors.black,marginLeft:'3%'}}>
                
                Top Temple
              </Text>
            </View>
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.time}>
        <AntDesign name="clockcircleo" size={15} color={'gray'} />
        <Text style={{color: '#228C08', fontSize: 12, fontWeight: 'bold'}}>
          {' '}
          Open {data?.openingTime ? data?.openingTime : '09:00'} AM
        </Text>
        <Text style={{color: colors.red1, fontWeight: 'bold', fontSize: 12}}>
          {' '}
          • Closes {data?.closingTime ? data?.closingTime : '08:00'} PM
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignItems: 'center',
    // padding: 4,
    borderRadius: 5,
    justifyContent: 'space-between',
    marginTop:'2%'
    
  },
  toptemp: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:4,
    paddingRight:4,
    borderRadius: 5,
    // justifyContent: 'center',
    width: 108,
    height: 30,
    // marginRight:'64%',
    borderRadius:5,
    borderWidth:0.3
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.3,
    padding: 4,
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20,
    // width: '58%',
    height: 30,
    padding:4,
    marginRight:'0.5%'
  },
});

