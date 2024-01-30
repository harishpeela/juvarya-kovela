import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './style';

export const ProfileInfo = ({name, email, dob}) => {
  console?.log('name===', name, email);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.nameText}>
        {/* {name?.length < 14 ? `${name}` : `${name?.subString(0, 10)}...`} */}
        {name}
      </Text>
      <Text style={styles.emailText}>{email}</Text>
      {dob && (
        <Text style={styles.noDobText}>Please update Date Of Birth </Text>
      )}
    </View>
  );
};
