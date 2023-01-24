import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {useContext} from 'react';
import ApplicationContext from '../../utils/context-api/Context';
import {BackHeader} from '../../components';
import {styles} from './styles';
import {AccountIcon1, Demo} from '../../utils/svgs';
import {allTexts} from '../../common';

const Manage = ({navigation, route}) => {
  const {userDetails} = useContext(ApplicationContext);
  const {
    constants: {role},
  } = allTexts;
  const {
    params: {id, title, name},
  } = route || {};
  console.log('id', id);
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <BackHeader
          onBackPress={() => {
            navigation.goBack();
          }}
          txt={'Manage'}
        />
      </View>
      <View style={styles.borderView} />
      <View style={styles.profileItemsContainer}>
        <Item svg={<Demo />} text={'Temple Employee'} />
        <Item
          svg={<AccountIcon1 />}
          text={'Services'}
          onPress={() => {
            navigation.navigate(allTexts.screenNames.service, {
              id: id,
              title: title,
              name: name,
            });
          }}
        />
        <Item1
          svg={require('../../../assets/images/calander.png')}
          text={'Calander'}
          onPress={() => navigation.navigate(allTexts.screenNames.calender)}
        />
        {(userDetails?.role == role.admin ||
          userDetails?.role == role.agent) && (
          <Item1
            svg={require('../../../assets/images/poojari.png')}
            text={'Events'}
            onPress={() => {
              navigation.navigate(allTexts.screenNames.events, {idparam: id});
            }}
          />
        )}
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
    <Image source={svg} style={{height: 25, width: 25}} />
    <View style={styles.textContainer}>
      <Text style={styles.itemText1}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default Manage;
