/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {TouchableOpacity, Text, View, ImageBackground} from 'react-native';
import {styles} from './styles';
import {allTexts} from '../../common';
import React, {useState} from 'react';
const templeData = {
  petalImage: 'https://www.linkpicture.com/q/hello.png',
};

const Menu = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const OnClick = () => {
    setCurrentIndex(3);
    if (currentIndex == 3) {
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
            <TouchableOpacity>
              <View style={styles.sidebarIcon}>
                <View style={[styles.bar, styles.shortestBar]} />
                <View style={[styles.bar, styles.mediumBar]} />
                <View style={[styles.bar, styles.longestBar]} />
              </View>
            </TouchableOpacity>
            <View style={{marginVertical: '10%'}}>
              <TouchableOpacity
                onPress={(() => setCurrentIndex(1), alert('2'))}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomWidth: currentIndex == 1 ? 2 : 0,
                    fontWeight: currentIndex == 1 ? 'bold' : '400',
                    width: 70,
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
              <TouchableOpacity onPress={(() => setCurrentIndex(3), OnClick())}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor: currentIndex == 3 ? 'red' : 'white',
                    borderBottomWidth: currentIndex == 3 ? 2 : 0,
                    fontWeight: currentIndex == 3 ? 'bold' : '400',
                    width: 110,
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
                    width: 140,
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
                    width: 190,
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
                    width: 90,
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
                    width: 120,
                  }}>
                  Accounts{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentIndex(8)}>
                <Text
                  style={{
                    ...styles.tabs,
                    borderBottomColor: currentIndex == 8 ? 'red' : 'white',
                    borderBottomWidth: currentIndex == 8 ? 2 : 0,
                    fontWeight: currentIndex == 8 ? 'bold' : '400',
                    width: 250,
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
