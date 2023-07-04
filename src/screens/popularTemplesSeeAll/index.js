/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {BackgroundImage, BackHeaderNew} from '../../components';

const SeeAll = ({route, navigation}) => {
  const {data} = route.params || {};
  console.log('data in see all', data);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={{margin: '5%', marginTop: '10%', marginLeft: '10%'}}>
        <BackHeaderNew onPress={() => navigation.goBack()} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: '5%'}}>
        <FlatList
          data={data}
          keyExtractor={({item, index}) => index}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                margin: 5,
                padding: 5,
                borderWidth: 1,
                borderColor: 'lightgray',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: item.url}}
                  style={{height: 100, width: 100, borderRadius: 100 / 2}}
                />
                <View style={{marginLeft: 10}}>
                  <Text>{item.name}</Text>
                  <Text>{item.desciption} </Text>
                  {/* <Text>Class : {item.templeClass} </Text> */}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};
export default SeeAll;
