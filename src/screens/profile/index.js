/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {BackgroundImage} from '../../components';
import React, {useContext} from 'react';
import {removeLoginSessionDetails} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';
import {styles} from './style';
import {BackHeader, PrimaryButton, ProfileInfo} from '../../components';
import {AccountIcon1, AccountIcon2, AccountIcon4, Demo} from '../../utils/svgs';
import {allTexts, colors} from '../../common';

const Profile = ({navigation}) => {
  const {userDetails, setLoginDetails, loginDetails} =
    useContext(ApplicationContext);
  const {
    headings: {
      accountItems: {bookings, donations, temple},
    },
    tabNames: {home},
    constants: {role},
  } = allTexts;
  console.log('details', userDetails);
  return (
    <SafeAreaView style={styles.wrapper}>
      <BackgroundImage />
      <View style={styles.headerContainer}>
        <BackHeader
          onBackPress={() => {
            navigation.navigate(home);
          }}
          txt={'Account'}
        />
      </View>
      <View style={styles.profileContainer}>
        <ProfileInfo
          name={userDetails?.username}
          email={userDetails?.email}
          // img={require('../../utils/assets/images/avatar.png')}
        />
      </View>
      <View style={styles.profileItemsContainer}>
        {/* <Item svg={<Demo />} text={bookings} />
        <Item svg={<AccountIcon2 />} text={donations} /> */}
        {(userDetails?.role == role.admin ||
          userDetails?.role == role.agent) && (
          <Item
            svg={<AccountIcon4 />}
            text={temple}
            onPress={() => {
              navigation.navigate(allTexts.screenNames.myTamples);
            }}
          />
        )}

        <Item
          svg={<AccountIcon1 />}
          text={'Update Password'}
          onPress={() => {
            navigation.navigate(allTexts.screenNames.updatePassword);
          }}
        />
        {(userDetails?.role == role.admin ||
          userDetails?.role == role.agent) && (
          <Item1
            svg={require('../../../assets/images/priest.webp')}
            text={'Poojari'}
            onPress={() => {
              navigation.navigate(allTexts.screenNames.poojari);
            }}
          />
        )}
      </View>
      <View style={styles.logoutbtnContainer}>
        <PrimaryButton
          onPress={async () => {
            await removeLoginSessionDetails();
            setLoginDetails(null);
            console.log('logindetails', loginDetails);
          }}
          bgColor={colors.blue3}
          radius={25}
          text={'Log Out'}
        />
      </View>
    </SafeAreaView>
  );
};
const Item = ({text, svg, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <View style={styles.iconContainer}>{svg}</View>
    <View style={styles.textContainer}>
      <Text style={styles.itemText}>{text}</Text>
    </View>
  </TouchableOpacity>
);
const Item1 = ({text, svg, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <View style={{borderWidth: 2, borderRadius: 20, padding: 2}}>
      <Image source={svg} style={{height: 20, width: 20, tintColor: 'black'}} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.itemText1}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default Profile;
