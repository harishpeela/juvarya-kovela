/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
// import DatePicker from 'react-native-modern-datepicker';
import {View} from 'react-native';
import {allTexts, colors} from '../../common';
import {BackHeader} from '../../components';
const Calender = ({navigation}) => {
  // const [selectedDate, setSelectedDate] = useState('');

  return (
    <View style={{margin: 15}}>
      <BackHeader
        txt={allTexts.screenNames.calender}
        onBackPress={() => navigation.goBack()}
      />
      <View
        style={{
          alignItems: 'center',
          marginTop: '20%',
        }}>
        {/* <DatePicker onSelectedChange={date => setSelectedDate(date)} /> */}
        {/* <DatePicker
          options={{
            backgroundColor: colors.green2,
            textHeaderColor: colors.white,
            textDefaultColor: 'black',
            selectedTextColor: '#fff',
            mainColor: '#F4722B',
            textSecondaryColor: '#D6C7A1',
            borderColor: 'rgba(122, 146, 165, 0.1)',
          }}
          current="2023-01-02"
          selected="2023-01-02"
          mode="calendar"
          minuteInterval={30}
          style={{borderRadius: 10}}
        /> */}
      </View>
    </View>
  );
};
export default Calender;
