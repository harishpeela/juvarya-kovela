/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {TouchableOpacity, Text, View, ImageBackground} from 'react-native';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import Feather from 'react-native-vector-icons/Feather';
import {BackgroundImage} from '../../components';
import React, {useState} from 'react';
const templeData = {
  petalImage: 'https://www.linkpicture.com/q/hello.png',
};

const Menu = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const NearBy = () => {
    setCurrentIndex(3);
    if (currentIndex == 3) {
      navigation.navigate(allTexts.screenNames.nearByServices);
    } else {
      navigation.navigate(allTexts.screenNames.nearByServices);
    }
  };
  const Feed = () => {
    setCurrentIndex(1);
    if (currentIndex === 1) {
      navigation.navigate(allTexts.screenNames.feed);
    } else {
      navigation.navigate(allTexts.screenNames.feed);
    }
  };
  const Reels = () => {
    setCurrentIndex(2);
    if (currentIndex === 2) {
      alert('reels under development');
    } else {
      alert('reels under development');
    }
  };
  const UpcomingEvents = () => {
    setCurrentIndex(4);
    if (currentIndex === 4) {
      alert(' UpcomingEvents under development');
    } else {
      alert('UpcomingEvents under development');
    }
  };
  const PastBookings = () => {
    setCurrentIndex(5);
    if (currentIndex === 5) {
      alert('PastBookings under development');
    } else {
      alert('PastBookings under development');
    }
  };
  const Music = () => {
    setCurrentIndex(6);
    if (currentIndex === 6) {
      alert('Music under development');
    } else {
      alert('Music under development');
    }
  };
  const Festivals = () => {
    setCurrentIndex(7);
    if (currentIndex === 7) {
      alert('Festivals under development');
    } else {
      alert('Festivals under development');
    }
  };
  const Accounts = () => {
    setCurrentIndex(8);
    if (currentIndex === 8) {
      navigation.navigate(allTexts.screenNames.profile);
    } else {
      navigation.navigate(allTexts.screenNames.profile);
    }
  };
  const TC = () => {
    setCurrentIndex(9);
    if (currentIndex === 9) {
      alert('T & C under development');
    } else {
      alert('T & C under development');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.footerBackground}>
        <BackgroundImage />
        <View style={{margin: '5%', marginTop: '10%'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
          </TouchableOpacity>
          <View style={{marginVertical: '10%'}}>
            <TouchableOpacity onPress={() => Feed()}>
              <Text
                style={{
                  ...styles.tabs,
                  textDecorationLine: currentIndex === 1 ? 'underline' : 'none',
                  color: currentIndex === 1 ? colors.orangeColor : 'gray',
                  // borderBottomWidth: currentIndex == 1 ? 2 : 0,
                  fontWeight: currentIndex == 1 ? 'bold' : '400',
                  // width: 60,
                  // borderBottomColor:
                  //   currentIndex == 1 ? colors.orangeColor : 'white',
                }}>
                Feed{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Reels()}>
              <Text
                style={{
                  ...styles.tabs,
                  color: currentIndex === 2 ? colors.orangeColor : 'gray',
                  textDecorationLine: currentIndex === 2 ? 'underline' : 'none',

                  // borderBottomColor:
                  //   currentIndex == 2 ? colors.orangeColor : 'white',
                  // borderBottomWidth: currentIndex == 2 ? 2 : 0,
                  fontWeight: currentIndex == 2 ? 'bold' : '400',
                  // width: 70,
                }}>
                Reels
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => NearBy()}>
              <Text
                style={{
                  ...styles.tabs,
                  color: currentIndex === 3 ? colors.orangeColor : 'gray',
                  textDecorationLine: currentIndex === 3 ? 'underline' : 'none',
                  // borderBottomColor:
                  //   currentIndex == 3 ? colors.orangeColor : 'white',
                  // borderBottomWidth: currentIndex == 3 ? 2 : 0,
                  fontWeight: currentIndex == 3 ? 'bold' : '400',
                  // width: 90,
                }}>
                NearBy{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => UpcomingEvents()}>
              <Text
                style={{
                  ...styles.tabs,
                  color: currentIndex === 4 ? colors.orangeColor : 'gray',
                  textDecorationLine: currentIndex === 4 ? 'underline' : 'none',
                  // borderBottomColor:
                  //   currentIndex == 4 ? colors.orangeColor : 'white',
                  // borderBottomWidth: currentIndex == 4 ? 2 : 0,
                  fontWeight: currentIndex == 4 ? 'bold' : '400',
                  // width: 200,
                }}>
                Upcoming Events{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => PastBookings()}>
              <Text
                style={{
                  ...styles.tabs,
                  color: currentIndex === 5 ? colors.orangeColor : 'gray',
                  textDecorationLine: currentIndex === 5 ? 'underline' : 'none',
                  // borderBottomColor:
                  //   currentIndex == 5 ? colors.orangeColor : 'white',
                  // borderBottomWidth: currentIndex == 5 ? 2 : 0,
                  fontWeight: currentIndex === 5 ? 'bold' : '400',
                  // width: 180,
                }}>
                Past Bookings{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Music()}>
              <Text
                style={{
                  ...styles.tabs,
                  color: currentIndex === 6 ? colors.orangeColor : 'gray',
                  textDecorationLine: currentIndex === 6 ? 'underline' : 'none',
                  // borderBottomColor:
                  //   currentIndex == 6 ? colors.orangeColor : 'white',
                  // borderBottomWidth: currentIndex == 6 ? 2 : 0,
                  fontWeight: currentIndex == 6 ? 'bold' : '400',
                  // width: 80,
                }}>
                Music{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Festivals()}>
              <Text
                style={{
                  ...styles.tabs,
                  color: currentIndex === 7 ? colors.orangeColor : 'gray',
                  textDecorationLine: currentIndex === 7 ? 'underline' : 'none',
                  // borderBottomColor:
                  //   currentIndex == 7 ? colors.orangeColor : 'white',
                  // borderBottomWidth: currentIndex == 7 ? 2 : 0,
                  fontWeight: currentIndex == 7 ? 'bold' : '400',
                  // width: 110,
                }}>
                Festivals{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Accounts()}>
              <Text
                style={{
                  ...styles.tabs,
                  color: currentIndex === 8 ? colors.orangeColor : 'gray',
                  textDecorationLine: currentIndex === 8 ? 'underline' : 'none',
                  // borderBottomColor:
                  //   currentIndex == 8 ? colors.orangeColor : 'white',
                  // borderBottomWidth: currentIndex == 8 ? 2 : 0,
                  fontWeight: currentIndex == 8 ? 'bold' : '400',
                  // width: 115,
                }}>
                Accounts{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => TC()}>
              <Text
                style={{
                  ...styles.tabs,
                  color: currentIndex === 9 ? colors.orangeColor : 'gray',
                  // borderBottomColor:
                  //   currentIndex == 9 ? colors.orangeColor : 'gray',
                  textDecorationLine: currentIndex === 9 ? 'underline' : 'none',
                  // borderBottomWidth: currentIndex == 9 ? 2 : 0,
                  fontWeight: currentIndex == 9 ? 'bold' : '400',
                  // width: 260,
                }}>
                Terms & Conditions{' '}
              </Text>
            </TouchableOpacity>
            <View style={{marginVertical: '10%'}}>
              <TouchableOpacity onPress={() => Feed()}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomWidth: currentIndex == 1 ? 2 : 0,
                    fontWeight: currentIndex == 1 ? 'bold' : '400',
                    width: 60,
                    borderBottomColor:
                      currentIndex == 1 ? colors.orangeColor : 'white',
                  }}>
                  Feed{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Reels()}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor:
                      currentIndex == 2 ? colors.orangeColor : 'white',
                    borderBottomWidth: currentIndex == 2 ? 2 : 0,
                    fontWeight: currentIndex == 2 ? 'bold' : '400',
                    width: 70,
                  }}>
                  Reels
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => NearBy()}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor:
                      currentIndex == 3 ? colors.orangeColor : 'white',
                    borderBottomWidth: currentIndex == 3 ? 2 : 0,
                    fontWeight: currentIndex == 3 ? 'bold' : '400',
                    width: 90,
                  }}>
                  NearBy{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => UpcomingEvents()}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor:
                      currentIndex == 4 ? colors.orangeColor : 'white',
                    borderBottomWidth: currentIndex == 4 ? 2 : 0,
                    fontWeight: currentIndex == 4 ? 'bold' : '400',
                    width: 190,
                  }}>
                  Upcoming Events{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => PastBookings()}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor:
                      currentIndex == 5 ? colors.orangeColor : 'white',
                    borderBottomWidth: currentIndex == 5 ? 2 : 0,
                    fontWeight: currentIndex == 5 ? 'bold' : '400',
                    width: 160,
                  }}>
                  Past Bookings{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Music()}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor:
                      currentIndex == 6 ? colors.orangeColor : 'white',
                    borderBottomWidth: currentIndex == 6 ? 2 : 0,
                    fontWeight: currentIndex == 6 ? 'bold' : '400',
                    width: 70,
                  }}>
                  Music{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Festivals()}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor:
                      currentIndex == 7 ? colors.orangeColor : 'white',
                    borderBottomWidth: currentIndex == 7 ? 2 : 0,
                    fontWeight: currentIndex == 7 ? 'bold' : '400',
                    width: 100,
                  }}>
                  Festivals{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Accounts()}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor:
                      currentIndex == 8 ? colors.orangeColor : 'white',
                    borderBottomWidth: currentIndex == 8 ? 2 : 0,
                    fontWeight: currentIndex == 8 ? 'bold' : '400',
                    width: 110,
                  }}>
                  Account{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => TC()}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor:
                      currentIndex == 9 ? colors.orangeColor : 'white',
                    borderBottomWidth: currentIndex == 9 ? 2 : 0,
                    fontWeight: currentIndex == 9 ? 'bold' : '400',
                    width: 220,
                  }}>
                  Terms & Conditions{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Menu;
