import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import {Artist_Donar_List_Card} from '../../components';
const Artist_Donar_details_list = ({route, navigation}) => {
  const {data} = route?.params || {};
  console.log('data ===', data);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: '15%'}}>
        <TopBarCard2
          txt={'Artist & Donar'}
          back={true}
          navigation={navigation}
          navBack={() => navigation.goBack()}
        />
      </View>
      <View style={{marginHorizontal: '5%'}}>
        <FlatList
          data={data}
          keyExtractor={({item, index}) => item?.year}
          style={{}}
          renderItem={({item, index}) => <Artist_Donar_List_Card data={item} />}
        />
      </View>
    </View>
  );
};
export default Artist_Donar_details_list;
