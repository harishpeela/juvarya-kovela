/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {colors} from '../../common';
import {PopularTemples} from '../../utils/api';
import {BackgroundImage, BackHeaderNew, Loader} from '../../components';

const SeeAll = ({route, navigation}) => {
  const {data} = route.params || {};
  const [popTemples, setPopTemples] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiPageNo, setApiPageNo] = useState(0);
  const PopularSeeAllTemples = async (pgNo, pgToNo) => {
    setIsLoading(true);
    try {
      let result = await PopularTemples(pgNo, pgToNo);
      if (result.status === 200) {
        let PopData = result?.data?.data;
        setPopTemples([...popTemples, ...PopData]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error in see all popular temples api', error);
    }
  };
  const renderLoder = () => {
    return isLoading ? (
      <Text style={{alignSelf: 'center'}}>no temples to watch</Text>
    ) : (
      <View style={{marginTop: 10}}>
        <ActivityIndicator size={'large'} color={colors.orangeColor} />
      </View>
    );
  };
  const loadMoreItems = () => {
    setApiPageNo(apiPageNo + 1);
    setIsLoading(false);
  };
  useEffect(() => {
    if (apiPageNo >= 0) {
      PopularSeeAllTemples(apiPageNo, 20);
      console.log('pageno: ', apiPageNo);
    }
  }, [data, apiPageNo]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={{margin: '5%', marginTop: '10%', marginLeft: '10%'}}>
        <BackHeaderNew
          txt={'Popural Tempels'}
          onPress={() => navigation.goBack()}
        />
      </View>
      {!popTemples?.length > 0 ? (
        <View style={styles.loaderContainer}>
          <Loader color={colors.orangeColor} />
        </View>
      ) : popTemples?.length >= 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal: '5%'}}>
          <FlatList
            data={popTemples}
            keyExtractor={({item, index}) => index}
            renderItem={({item, index}) => (
              <TouchableOpacity style={styles.card}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{uri: item.logo}}
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
            ListFooterComponent={renderLoder}
            onEndReached={() => loadMoreItems()}
            onEndReachedThreshold={0.5}
          />
        </ScrollView>
      ) : popTemples?.length > 0 ? (
        <View style={styles.nodataView}>
          <Text style={styles.nodatatext}>no items to display</Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <Loader color={colors.orangeColor} size={30} />
        </View>
      )}
    </View>
  );
};
export default SeeAll;
