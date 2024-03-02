/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import {Loader} from '../../components';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Community_Events_Seeall = ({navigation, route}) => {
  const {data} = route?.params || {};
  const isDarkMode = useColorScheme() === 'dark';

  const onSelect = data => {
     };
  return (
    <View style={{flex: 1, backgroundColor: isDarkMode ? 'white' : 'white'}}>
      <View style={{minHeight: '15%'}}>
        <TopBarCard2 marginLeft={'16%'} back={true} txt={'Community temples'} navigation={navigation} />
      </View>
      {!data?.length > 0 ? (
        <View style={styles.loaderContainer}>
          {/* <Loader color={colors.orangeColor} /> */}
          <FontAwesome5
                  name="gopuram"
                  size={50}
                  color={'orange'}
                  style={{marginBottom:'5%'}}
                 
                />
                <Text style={{fontFamily:'Poppins-Medium',color:'orange',fontSize:15}}>{'No Temples Available'}</Text>
        </View>
      ) : data?.length ? (
        <ScrollView showsVerticalScrollIndicator={false} style={{margin: '5%'}}>
          <FlatList
            data={data}
            keyExtractor={({item, index}) => index}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.card}
                onPress={
                  () => 
                  navigation.navigate(allTexts.screenNames.viewtempleprofile, {
                    data: item,
                    onSelect: onSelect
                  })
                }>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{
                      uri: item?.logo
                        ? item?.logo
                        : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
                    }}
                    
                    style={{height: 60, width: 60, borderRadius: 70 / 2}}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text style={{color: isDarkMode ? 'black' : 'orange',marginTop:'10%'}}>
                      {item?.name}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{
                        maxWidth: '90%',
                        color: isDarkMode ? 'black' : 'orange',
                      }}>
                      {/* {item.description}{' '} */}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            // ListFooterComponent={renderLoder}
            // onEndReached={loadMoreItems}
            onEndReachedThreshold={0.5}
          />
        </ScrollView>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={{color: colors.orangeColor, fontWeight: 'bold'}}>
            {' '}
            No items to displayy
          </Text>
        </View>
      )}
    </View>
  );
};
export default Community_Events_Seeall;