/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import {colors} from '../../common';
import {BackgroundImage, BackHeaderNew, Loader} from '../../components';

const SeeAll = ({route, navigation}) => {
  const {data} = route.params || {};
  console.log('data in see all', data);
  useEffect(() => {}, [route]);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={{margin: '5%', marginTop: '10%', marginLeft: '10%'}}>
        <BackHeaderNew
          txt={'Popural Tempels'}
          onPress={() => navigation.goBack()}
        />
      </View>
      {!data?.length > 0 ? (
        <View style={styles.loaderContainer}>
          <Loader color={colors.orangeColor} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal: '5%'}}>
          <FlatList
            data={data}
            keyExtractor={({item, index}) => index}
            renderItem={({item, index}) => (
              <TouchableOpacity style={styles.card}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{uri: item.url}}
                    style={{height: 70, width: 70, borderRadius: 70 / 2}}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text>{item.name}</Text>
                    <Text numberOfLines={2} style={{maxWidth: '95%'}}>
                      {item.desciption}{' '}
                    </Text>
                    {/* <Text>Class : {item.templeClass} </Text> */}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      )}
    </View>
  );
};
export default SeeAll;
