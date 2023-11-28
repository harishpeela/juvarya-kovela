/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {AddEvent, EventHeader} from '../../components';
import {styles} from './styles';
import ApplicationContext from '../../utils/context-api/Context';


const AddEvents = ({navigation, route}) => {
  const [data, setdata] = useState('');
  const {
    params: {id},
  } = route || {};
  const {setId} = useContext(ApplicationContext);
  useEffect(() => {
    if (id) {
      setId(id);
    }
  }, [id]);
  return (
    <SafeAreaView style={styles.container}>
      <EventHeader txt={'Add Events'} onBackPress={() => navigation.goBack()} />
      <AddEvent data={data} navigation={navigation} />
    </SafeAreaView>
  );
};
export default AddEvents;
