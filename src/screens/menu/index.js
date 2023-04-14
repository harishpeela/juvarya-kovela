/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {TouchableOpacity, Text, View, ImageBackground} from 'react-native';
import {styles} from './styles';
import {allTexts} from '../../common';
import Feather from 'react-native-vector-icons/Feather';
import React, {useState, useEffect} from 'react';
import set from 'date-fns/esm/set/index';
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
  return (
    <View style={{flex: 1}}>
      <View style={styles.footerBackground}>
        <ImageBackground
          source={{uri: templeData.petalImage}}
          style={{height: 400}}>
          <View style={{margin: '10%'}}>
            {/* <TouchableOpacity>
              <View style={styles.sidebarIcon}>
                <View style={[styles.bar, styles.shortestBar]} />
                <View style={[styles.bar, styles.mediumBar]} />
                <View style={[styles.bar, styles.longestBar]} />
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
            </TouchableOpacity>
            <View style={{marginVertical: '10%'}}>
              <TouchableOpacity onPress={() => setCurrentIndex(1)}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomWidth: currentIndex == 1 ? 2 : 0,
                    fontWeight: currentIndex == 1 ? 'bold' : '400',
                    width: 60,
                    borderBottomColor: currentIndex == 1 ? 'red' : 'white',
                  }}>
                  Feed{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentIndex(2)}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor: currentIndex == 2 ? 'red' : 'white',
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
                    borderBottomColor: currentIndex == 3 ? 'red' : 'white',
                    borderBottomWidth: currentIndex == 3 ? 2 : 0,
                    fontWeight: currentIndex == 3 ? 'bold' : '400',
                    width: 90,
                  }}>
                  NearBy{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentIndex(4)}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor: currentIndex == 4 ? 'red' : 'white',
                    borderBottomWidth: currentIndex == 4 ? 2 : 0,
                    fontWeight: currentIndex == 4 ? 'bold' : '400',
                    width: 110,
                  }}>
                  Upcoming{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentIndex(5)}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor: currentIndex == 5 ? 'red' : 'white',
                    borderBottomWidth: currentIndex == 5 ? 2 : 0,
                    fontWeight: currentIndex == 5 ? 'bold' : '400',
                    width: 160,
                  }}>
                  Past Bookings{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentIndex(6)}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor: currentIndex == 6 ? 'red' : 'white',
                    borderBottomWidth: currentIndex == 6 ? 2 : 0,
                    fontWeight: currentIndex == 6 ? 'bold' : '400',
                    width: 70,
                  }}>
                  Music{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentIndex(7)}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor: currentIndex == 7 ? 'red' : 'white',
                    borderBottomWidth: currentIndex == 7 ? 2 : 0,
                    fontWeight: currentIndex == 7 ? 'bold' : '400',
                    width: 100,
                  }}>
                  Festivals{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentIndex(8)}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor: currentIndex == 8 ? 'red' : 'white',
                    borderBottomWidth: currentIndex == 8 ? 2 : 0,
                    fontWeight: currentIndex == 8 ? 'bold' : '400',
                    width: 110,
                  }}>
                  Accounts{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentIndex(9)}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor: currentIndex == 9 ? 'red' : 'white',
                    borderBottomWidth: currentIndex == 9 ? 2 : 0,
                    fontWeight: currentIndex == 9 ? 'bold' : '400',
                    width: 220,
                  }}>
                  Terms & Conditions{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Menu;
