/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import {BackHeader, PrimaryButton} from '../../components';
import {allTexts, colors} from '../../common';
import {styles} from './styles';
import {Input} from '../../components';

const Poojari = ({navigation}) => {
  const [searchTemple, setSearchTemple] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pojariName, setPojariName] = useState('');
  const [poojariText, setPoojariText] = useState('');

  const PoojariDetails = () => {
    if (searchTemple == null) {
      !isVisible == false;
    } else if (pojariName == '') {
      alert('please fill poojari details');
    } else if (pojariName) {
      setIsVisible(!isVisible) && setPojariName(null);
    }
  };

  const {
    headings: {Addpoojari},
    paragraphs: {joining},
    placeHolders: {templeSearc, poojarimailid, poojariname},
    buttonTexts: {add},
  } = allTexts;

  const Item = ({text, svg, index}) => {
    function call() {
      setIsEnabled(false);
      return false;
    }
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{text}</Text>
        </View>
        <View style={styles.toogleContainer}>
          <Switch
            value={!searchTemple ? call() : isEnabled}
            onChange={() => setIsEnabled(!isEnabled)}
            disabled={!searchTemple}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <BackHeader txt={Addpoojari} onBackPress={() => navigation.goBack()} />
      <View style={styles.profileItemsContainer}>
        <Item text={joining} index={0} />
        <Input placeholder={templeSearc} oct={text => setSearchTemple(text)} />
      </View>
      {isEnabled ? (
        <View style={styles.addPoojariView}>
          <Text style={styles.addpujari}>Add Pujari </Text>
          <Input
            placeholder={poojarimailid}
            oct={text => setPoojariText(text)}
            value={poojariText}
          />
          <Input
            placeholder={poojariname}
            value={pojariName}
            oct={text => setPojariName(text)}
          />
          <View style={styles.buttonContainer}>
            <PrimaryButton
              bgColor={colors.blue3}
              onPress={() => PoojariDetails()}
              text={add}
              radius={8}
              fontsize={10}
              padding={8}
            />
          </View>
        </View>
      ) : (
        ''
      )}
      {isEnabled && isVisible ? (
        <View style={styles.addView}>
          <View style={styles.poojariDetails}>
            <Image source={require('../../../assets/images/dot.png')} />
            <Text style={styles.name}>{pojariName} </Text>
          </View>
          <Text style={styles.designation}>Designation - Pujari </Text>
        </View>
      ) : (
        ''
      )}
    </SafeAreaView>
  );
};
export default Poojari;
