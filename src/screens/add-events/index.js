/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, View} from 'react-native';
import {AddEvent, BackgroundImage, BackHeaderNew, Create_Event} from '../../components';
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
      <BackgroundImage />
      <View style={styles.header}>
        <BackHeaderNew
          txt={'Add Events'}
          isArrow={true}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Create_Event data={data} navigation={navigation} />
    </SafeAreaView>
  );
};
export default AddEvents;