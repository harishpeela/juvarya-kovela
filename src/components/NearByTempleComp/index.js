import {View, Text} from 'react-native';
import React from 'react';
import {PrimaryButton1} from '../profilecomp';
import NearByTemplesSeeAll from '../../screens/NearByTemplesSeeAll';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { allTexts } from '../../common';
import { useNavigation } from '@react-navigation/native';

const NearByTempleComp = () => {
    const navigation = useNavigation()
  return (
    <View style={{marginTop: 5}}>
      <PrimaryButton1
        bgColor={'#FFA001'}
        radius={10}
        padding={7}
        fontsize={10} 
        text={'Near By Temples'}
        onPress={() => navigation.navigate(allTexts.screenNames.nearByTempleSeeAll)}
        
      />
    </View>
    
  );
};

export default NearByTempleComp;
