/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import {colors, fontFamily} from '../../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BackgroundSmallFlowerRs} from '../../backgroundFlower';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const Donation_Second_Tab = ({
  VALUE,
  Data,
  onChange,
  dropData,
  onSelect,
  valueRs,
  onChangeEmail,
  valueEmail,
  onChangeName,
  valueName,
  onPressCheck,
  isChecked,
  donationText,
  donurl,
}) => {
  const [activeIndex, setActiveIndex] = useState();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.choose}>Choose Amount</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={Data}
        keyExtractor={({item, index}) => index}
        style={{alignSelf: 'center'}}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              setActiveIndex(index);
              VALUE(item?.rs);
            }}
            style={{
              ...styles.flatlist,
              backgroundColor: activeIndex === index ? '#CC4501' : colors.white,
            }}>
            <Image
              source={require('../../../../assets/images/smallflower.png')}
              style={{marginLeft: 5}}
            />
            <Text
              style={{
                ...styles.text,
                color: activeIndex === index ? colors.white : '#CC4501',
              }}>
              {' '}
              ₹{item?.rs}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <SelectDropdown
          data={dropData}
          buttonTextStyle={styles.DTextStyle}
          onSelect={onSelect}
          buttonStyle={styles.DbuttonStyle}
          defaultButtonText="Donation Type"
          renderDropdownIcon={() => (
            <View>
              <Icon color={colors.white} size={20} name="down" />
            </View>
          )}
        />
      </View>
      <View style={styles.inputView}>
        <BackgroundSmallFlowerRs />
        <TextInput
          placeholder="Other Amount"
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={onChange}
          value={valueRs}
          maxLength={30}
          placeholderTextColor={colors.gray}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={onChangeEmail}
          value={valueEmail}
          placeholderTextColor={colors.gray}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={onChangeName}
          value={valueName}
          placeholderTextColor={colors.gray}
        />
      </View>
      <View style={styles.checkView}>
        <Ionicons
          onPress={onPressCheck}
          name={isChecked ? 'checkbox' : 'square-outline'}
          style={styles.checkIcon}
        />
        <Text style={styles.rememberMeText}>
          Do you want to show this donation in the list
        </Text>
      </View>
      <View style={styles.border} />
      <View style={styles.donationUser}>
        <Text style={{color: colors.black, fontSize: 12}}>
          {/* Feature your profile on temple page just by donating an amount more
          than ₹201. */}
        </Text>
        <View style={styles.userDonView}>
          <ImageBackground
            source={require('../../../../assets/images/smallflower.png')}
            imageStyle={{height: 60, width: 60}}
            style={{alignItems: 'center', width: 50}}>
            <Image
              source={{
                uri: donurl
                  ? donurl
                  : 'https://s3.ap-south-1.amazonaws.com/kovela.app/17048660306221704866026953.jpg',
              }}
              style={styles.userimg}
            />
          </ImageBackground>
          <View style={{marginLeft: '4%'}}>
            <Text
              style={{color: colors.black, fontWeight: '500', fontSize: 12}}>
              {donationText}
            </Text>
            <TouchableOpacity style={styles.userTouch}>
              <Text style={styles.usertext}>
                <AntDesign name="star" size={12} color={'#CC4501'} /> Featured
                Profile{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  choose: {margin: 10, fontSize: 18, fontWeight: 'bold', color: colors.black},
  flatlist: {
    padding: 5,
    margin: 5,
    width: 100,
    flexDirection: 'row',
    borderRadius: 25,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  text: {
    position: 'absolute',
    top: 10,
    left: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: '2%',
    backgroundColor: colors.white,
    borderRadius: 30,
  },
  input: {
    marginLeft: 40,
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
    width: '100%',
  },
  border: {
    borderWidth: 0.3,
    borderColor: 'lightgray',
    marginTop: 20,
    marginHorizontal: 10,
  },
  donationUser: {
    margin: 10,
  },
  userimg: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginTop: 5,
    marginLeft: 5,
  },
  userDonView: {
    flexDirection: 'row',
    marginTop: -10,
    alignItems: 'center',
  },
  usertext: {
    fontSize: 12,
    color: '#CC4501',
  },
  userTouch: {
    borderWidth: 0.5,
    width: 120,
    padding: 3,
    borderRadius: 10,
    borderColor: '#CC4501',
    marginTop: 5,
  },
  DTextStyle: {
    fontFamily: fontFamily.popinRegular,
    fontSize: 18,
    color: colors.white,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  DbuttonStyle: {
    height: 45,
    width: '90%',
    borderRadius: 30,
    backgroundColor: colors.orangeColor,
    margin: 10,
    marginHorizontal: 20,
  },
  checkView: {
    alignSelf: 'center',
    flexDirection: 'row',
    // marginBottom: 10,
    marginTop: 10,
  },
  rememberMeText: {
    color: 'black',
    fontSize: 12,
    textTransform:'capitalize'
  },
  checkIcon: {
    color: colors.orangeColor,
    fontSize: 16,
    marginRight: 5,
  },
});
