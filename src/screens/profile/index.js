/* eslint-disable react-native/no-inline-styles */
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {BackgroundImage} from '../../components';
import React, {useContext, useState, useEffect} from 'react';
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
      accountItems: {temple},
    },
    tabNames: {home},
    constants: {role},
  } = allTexts;
  console.log('details', userDetails);
  const [roleType, setRoleType] = useState();
  const Type = () => {
    let ROLES = userDetails?.role;
    var roleAdmin = ROLES?.indexOf('ROLE_ADMIN') > -1;
    var roleAgent = ROLES?.indexOf('ROLE_AGENT') > -1;
    console.log('role', roleAdmin, roleAgent);
    if (roleAdmin) {
      setRoleType('ROLE_ADMIN');
    } else if (roleAgent) {
      setRoleType('ROLE_AGENT');
    }
    // var value = ROLES;
    // console.log('value', value);
    // setRoleType(ROLES);
    // let val = ROLES?.find(str => str === value);
    // console.log('val', val);
    // if (val === 'ROLE_AGENT') {
    //   setRoleType(val);
    // } else if (val === 'ROLE_ADMIN') {
    //   setRoleType(val);
    // } else {
    //   setRoleType('ROLE_USER');
    // }
  };
  useEffect(() => {
    Type();
  }, []);
  console.log('roletype', roleType);
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
        {(roleType === role.admin || roleType === role.agent) && (
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
        <Item
          svg={<AccountIcon1 />}
          text={'Saved Posts'}
          onPress={() => {
            navigation.navigate(allTexts.screenNames.mySavedPosts);
          }}
        />
        {(roleType === role.admin || roleType === role.agent) && (
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
          bgColor={colors.orangeColor}
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
    <View
      style={{
        borderWidth: 2,
        borderRadius: 20,
        padding: 2,
        borderColor: colors.orangeColor,
      }}>
      <Image
        source={svg}
        style={{height: 20, width: 20, tintColor: colors.orangeColor}}
      />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.itemText1}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default Profile;
