import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MemberShipCard} from '../../components';

const ProfileMemberShips = () => {
  const data = [
    {
      id: 1,
      name: 'harish',
      type: 'BASIC',
    },
  ];;

  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: '10%'}}>
        <MemberShipCard data={data} />
      </View>
    </View>
  );
};

export default ProfileMemberShips;
