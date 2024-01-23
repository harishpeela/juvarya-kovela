import {View, Text,TouchableOpacity} from 'react-native';
import React from 'react';
import {PrimaryButton1} from '../profilecomp';
import NearByTemplesSeeAll from '../../screens/NearByTemplesSeeAll';
import { allTexts } from '../../common';
import { useNavigation } from '@react-navigation/native';
import {styles} from './styles';

const NearByTempleComp = ({onPress}) => {
    
    return (
      <TouchableOpacity
        style={[styles.voidButton1, styles.button]}
        onPress={onPress}>
        {/* <BackgroundSmallFlowerUser /> */}
        <Text style={styles.voidButton1Text}>
          Near By Temples
        </Text>
      </TouchableOpacity>
    );
};

export default NearByTempleComp;


