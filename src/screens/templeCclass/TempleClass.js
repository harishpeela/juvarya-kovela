import {SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getTempleClassDetails} from '../../utils/api';
import {Loader} from '../../components';
import {TopBarCard2, TopBarcard} from '../../components/topBar1/topBarCard';
import {FlatList} from 'react-native-gesture-handler';
import {allTexts, colors} from '../../common';
import {statusBarHeight} from '../../utils/config/config'
import { useLazyGetTempleClassQuery } from '../../redux/services/templeProfileService';

const TempleClass = ({route, navigation}) => {
  const [templeClassDetails, setTempleClassDetails] = useState([]);
  const {id, templeclass} = route.params || {};
  const [loader, setLoader] = useState(false);

  const[ getTempleClass] = useLazyGetTempleClassQuery();

  const TopTempleClass = async (pageNo, pageSize, templeclass) => {
    setLoader(true);
    let data = {
      templeclass: templeclass,
      pageNo: pageNo,
      pageSize: pageSize,
    }
    getTempleClass(data)
      .unwrap()
      .then(response => {
        setTempleClassDetails(response.data);
        setLoader(false);
      }
      )
      .catch(error => {
        setLoader(false);
      })
  };

  const onSelect = data => {
    // setIsLiked(data?.selected);
  };

  useEffect(() => {
    TopTempleClass(0, 200, templeclass);
  }, []);

  return (
    <View style={{flex: 1,backgroundColor:'white'}}>
      <View style={{height: 60, marginTop: statusBarHeight}}>
        <TopBarCard2
          back={true}
          txt={'Temple Class'}
          navBack={() => navigation.goBack()}
          navigation={navigation}
        />
      </View>
      <View style={{flex: 1}}>
        {loader ? (
          <View style={{marginTop: '-30%'}}>
            <Loader size={'large'} color={colors.orangeColor} />
          </View>
        ) : templeClassDetails?.length ? (
          <FlatList
            data={templeClassDetails}
            keyExtractor={({item, index}) => index}
            renderItem={({item}) => (
             
              <TouchableOpacity
                onPress={() => {navigation.navigate(allTexts.screenNames.viewtempleprofile, {
                  data: item,
                  onSelect: onSelect,
                })}}
                style={{
                  borderWidth: 0.3,
                  display: 'flex',
                  flexDirection: 'row',
                  padding: 10,
                  marginHorizontal: 10,
                  borderRadius: 10,
                  marginVertical: 10,
                }}>
                <Image
                  source={{
                    uri: item?.logo
                      ? item?.logo
                      : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png',
                  }}
                  style={{height: 72, width: 72, borderRadius: 70 / 2}}
                />
                <Text numberOfLines={2} style={{marginLeft: 20, marginTop: 20, color: 'black',fontSize:17, maxWidth: '80%'}}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '60%',
            }}>
            <Text
              style={{
                color: colors.orangeColor,
                fontWeight: 'normal',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              No Items To Display
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TempleClass;

