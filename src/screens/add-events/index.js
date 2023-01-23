import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {allTexts} from '../../common';
import {AddEvent, EventHeader} from '../../components';
import {styles} from './styles';
const AddEvents = ({navigation}) => {
  const [data, setdata] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <EventHeader txt={'Add Events'} onBackPress={() => navigation.goBack()} />
      <AddEvent
        data={data}
        // navigation={() => navigation.navigate(allTexts.screenNames.events)}
      />
    </SafeAreaView>
  );
};
export default AddEvents;
