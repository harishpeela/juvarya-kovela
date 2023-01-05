import React, {useState} from 'react';
import {OccasionBackHeader} from '../../components';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  CheckBox
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {allTexts, colors} from '../../common';
import {styles} from './styles';
import {TextInput} from 'react-native-gesture-handler';
const Occasions = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <OccasionBackHeader
        onBackPress={() => navigation.goBack()}
        txt={allTexts.headings.accountItems.occasion}
        plusButton
        onPlusPress={() => {
          alert('hello');
        }}
      />
      <View style={styles.occView}>
        <InputTitle
          occationNmame={'Occasion Name'}
          descripton={'Description'}
          pickDate={'Pick a Date for Dharsan'}
        />
      </View>
    </SafeAreaView>
  );
};
const InputTitle = ({occationNmame, descripton, pickDate, data}) => {
  var radio_props = [
    {label: 'selected date', value: 0},
    {label: 'Selected Period', value: 1},
  ];
  const [isRegular, setIsRegular] = useState(data);
  const [imageUploaded, setimageUploaded] = useState(false);
  const [isSelected, setSelection] = useState(false);
  return (
    <View>
      <Text style={styles.occatsionText}>{occationNmame} </Text>
      <TextInput style={styles.input} />
      <Text style={styles.desc}> {descripton} </Text>
      <TextInput style={styles.input} />
      <Text style={styles.pickDate}>{pickDate} </Text>
      <View style={styles.radioContainer}>
        <RadioForm
          radio_props={radio_props}
          initial={isRegular}
          formHorizontal={true}
          labelHorizontal={true}
          buttonColor={colors.blue3}
          selectedButtonColor={colors.blue3}
          animation={false}
          buttonSize={8}
          buttonOuterSize={20}
          labelStyle={styles.radioLabelStyle}
          onPress={value => {
            setIsRegular(value);
          }}
        />
      </View>
    </View>
  );
};
export default Occasions;
