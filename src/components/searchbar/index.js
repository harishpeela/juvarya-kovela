/* eslint-disable react-native/no-inline-styles */
import {View, TextInput, useColorScheme} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../common';
import {styles} from './style';
import {Loader} from '..';
 
export const SearchBar = ({
  value,
  onTextChange,
  onSubmit,
  bgColor,
  placeHolder,
  loading,
  onCrossPress,
  showCrossPress,
  brColor,
  brWidth,
  srHeight,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={{marginTop:-13,width:100}}>
      {/* <View
        // eslint-disable-next-line no-sparse-arrays
        style={[
          styles.searchContainer,
          {backgroundColor: bgColor ? bgColor : colors.blue},
          {borderWidth: brWidth ? brWidth : 0},
          {borderColor: brColor ? brColor : colors.white},
          {height: srHeight ? srHeight :20}, */}
        {/* ]}> */}
        <View style={styles.iconContainer}>
          {/* <Icon name="search1" size={16} color={colors.gray} style={{left:30,top:7}}/> */}
<<<<<<< HEAD
          <View style={{flexDirection:'row',width:'100%'}}> 
=======
          <View style={{flexDirection:'row',width:'100%'}}>
>>>>>>> caf945c0fdc8aaaf9474233d6af96946d9d6fad6
          <TextInput
            onChangeText={onTextChange}
            placeholderTextColor={colors.gray}
            placeholder={placeHolder || 'Search temples'}
<<<<<<< HEAD
            
            style={{
              ...styles.field,
              color: colors.gray,
              
=======
           
            style={{
              ...styles.field,
              color: colors.gray,
             
>>>>>>> caf945c0fdc8aaaf9474233d6af96946d9d6fad6
            }}
            value={value}
            onSubmitEditing={onSubmit}
            autoCapitalize={false}
          />
         
          </View>
          {loading && <Loader size={25} color={colors.green2} />}
          {showCrossPress === true ? (
            <>
              {value !== '' && !loading && (
                <Feather
                  onPress={onCrossPress}
                  name="x-circle"
                  color={colors.orangeColor}
                  size={15}
                  style={{marginLeft: '55%',marginTop:'6%'}}
                />
              )}
            </>
          ) : (
            <></>
          )}
         
        </View>
      {/* </View> */}
    </View>
  );
};
 