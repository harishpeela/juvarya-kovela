/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {TouchableOpacity, Text, View} from 'react-native';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import Feather from 'react-native-vector-icons/Feather';
import {
  BackHeaderNew,
  BackgroundImage,
  Terms_And_Conditions,
} from '../../components';
import React, {useState} from 'react';
const Menu = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isModal, setIsModal] = useState();
  const UpcomingEvents = () => {
    setCurrentIndex(4);
    if (currentIndex === 4) {
      alert(' UpcomingEvents under development');
    } else {
      alert('UpcomingEvents under development');
    }
  };
  const Festivals = () => {
    setCurrentIndex(7);
    navigation.navigate(allTexts.screenNames.eventsScreen);

    // if (currentIndex === 7) {
    //   navigation.navigate(allTexts.screenNames.eventsScreen)
    // } else {
    //   alert('Festivals under development');
    // }
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
      setIsModal(true);
    } else {
      setIsModal(true);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.footerBackground}>
        <BackgroundImage />
        <View style={{margin: '5%', marginTop: '10%'}}>
          <BackHeaderNew
            onPress={() => navigation.goBack()}
            txtColor={colors.black}
            isPlus={false}
            isArrrow={true}
          />
          <View style={{marginVertical: '10%'}}>
            <TouchableOpacity onPress={() => UpcomingEvents()}>
              <Text
                style={{
                  ...styles.tabs,
                  color: currentIndex === 4 ? colors.orangeColor : 'gray',
                  textDecorationLine: currentIndex === 4 ? 'underline' : 'none',
                  fontWeight: currentIndex == 4 ? 'bold' : '400',
                }}>
                Upcoming Events{' '}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => Festivals()}>
              <Text
                style={{
                  ...styles.tabs,
                  color: currentIndex === 7 ? colors.orangeColor : 'gray',
                  textDecorationLine: currentIndex === 7 ? 'underline' : 'none',
                  fontWeight: currentIndex == 7 ? 'bold' : '400',
                }}>
                Festivals{' '}
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => Accounts()}>
              <Text
                style={{
                  ...styles.tabs,
                  color: currentIndex === 8 ? colors.orangeColor : 'gray',
                  textDecorationLine: currentIndex === 8 ? 'underline' : 'none',
                  fontWeight: currentIndex == 8 ? 'bold' : '400',
                }}>
                Account{' '}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => TC()}>
              <Text
                style={{
                  ...styles.tabs,
                  color: currentIndex === 9 ? colors.orangeColor : 'gray',
                  textDecorationLine: currentIndex === 9 ? 'underline' : 'none',
                  fontWeight: currentIndex == 9 ? 'bold' : '400',
                }}>
                Terms & Conditions{' '}
              </Text>
            </TouchableOpacity>
            {isModal && (
              <Terms_And_Conditions
                isModal={isModal}
                onPress={() => setIsModal(false)}
              />
            )} */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Menu;
