/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import {BackgroundImage} from '../../components';
import React, {useContext, useState, useEffect} from 'react';
import {removeLoginSessionDetails} from '../../utils/preferences/localStorage';
import ApplicationContext from '../../utils/context-api/Context';
import {styles} from './style';
import {BackHeader, PrimaryButton, ProfileInfo} from '../../components';
import {AccountIcon1, AccountIcon2, AccountIcon4, Demo} from '../../utils/svgs';
import {allTexts, colors} from '../../common';
import {useTranslation} from 'react-i18next';
import i18next, {resources} from '../../../languages/language';
import lan from '../../../languages/lan.json';
import Feather from 'react-native-vector-icons/Feather';

const Profile = ({navigation}) => {
  const {userDetails, setLoginDetails, loginDetails} =
    useContext(ApplicationContext);
  const {t} = useTranslation();
  const {
    headings: {
      accountItems: {temple},
    },
    tabNames: {home},
    constants: {role},
  } = allTexts;
  console.log('details', userDetails);
  const [roleType, setRoleType] = useState();
  const [isVisible, setIsVisible] = useState(false);
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
  };
  useEffect(() => {
    Type();
  }, []);
  const changelan = lang => {
    i18next.changeLanguage(lang);
    setIsVisible(false);
  };
  console.log('roletype', roleType);
  return (
    <SafeAreaView style={styles.wrapper}>
      <BackgroundImage />
      <Modal
        visible={isVisible}
        transparent={true}
        style={{position: 'absolute', left: 20}}
        onRequestClose={() => setIsVisible(false)}>
        <View
          style={{
            position: 'absolute',
            right: 50,
            top: 20,
            backgroundColor: colors.orangeColor,
            padding: 10,
            borderTopLeftRadius: 20,
          }}>
          <FlatList
            data={Object.keys(resources)}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => changelan(item)}>
                <Text style={{fontSize: 12, margin: 5}}>{lan[item]?.lan} </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
        </TouchableOpacity>
        <Text
          // numberOfLines={1}
          style={{
            fontSize: 16,
            fontWeight: '500',
            textTransform: 'capitalize',
            marginRight: '50%',
          }}>
          {t('account')}
        </Text>
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          style={{alignSelf: 'flex-end'}}>
          <Image
            source={require('../../../assets/images/lan.webp')}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
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
            text={t('myTemple')}
            onPress={() => {
              navigation.navigate(allTexts.screenNames.myTamples);
            }}
          />
        )}

        <Item
          svg={<AccountIcon1 />}
          text={t('updatepassword')}
          onPress={() => {
            navigation.navigate(allTexts.screenNames.updatePassword);
          }}
        />
        <Item
          svg={<AccountIcon1 />}
          text={t('posts')}
          onPress={() => {
            navigation.navigate(allTexts.screenNames.mySavedPosts);
          }}
        />
        {(roleType === role.admin || roleType === role.agent) && (
          <Item1
            svg={require('../../../assets/images/priest.webp')}
            text={t('poojari')}
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
