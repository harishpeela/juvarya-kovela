import {StyleSheet, Text, View, Alert} from 'react-native';
import React from 'react';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import {EventInput, PrimaryButton} from '../../components';
import {colors} from '../../common';
import {useState} from 'react';
import {profileToDoList} from '../../utils/api';

export default function TempleProfileToDoList({navigation}) {
  const [templeName, setTempleName] = useState(' ');
  const [description, setDescription] = useState(' ');

  const getToDo = async () => {
    console.log('kkkkkkkkkkkkkkkkkkkkkkk', payload);
    const payload = {description: description};

    const result = await profileToDoList(payload);
    if (result.status === 200) {
      Alert.alert('Submitted Successfully !!!!!');
    } else {
      console.log('something went wrong');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: '15%'}}>
        <TopBarCard2
          back={true}
          txt={'Add ToDoList'}
          navigation={navigation}
          marginLeft={'16%'}
        />
      </View>

      <EventInput
        lable={'Description'}
        placeholder={'List Of Things To Be Done'}
        height={550}
        onChangeText={text => setDescription(text)}
      />
      <View style={{width: '80%', alignSelf: 'center', marginTop: '10%'}}>
        <PrimaryButton
          text={'Submit'}
          bgColor={colors.orangeColor}
          onPress={() => getToDo()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
