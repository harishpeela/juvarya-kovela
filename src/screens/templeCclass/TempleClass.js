import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getTempleClassDetails} from '../../utils/api';
import { Loader } from '../../components';
import {TopBarCard2, TopBarcard} from '../../components/topBar1/topBarCard';
import {FlatList} from 'react-native-gesture-handler';
import {colors} from '../../common';

const TempleClass = ({route, navigation}) => {
  const [templeClassDetails, setTempleClassDetails] = useState([]);
  const {id, templeclass} = route.params || {};
  const [loader, setLoader] = useState(false);
  const TopTempleClass = async (profileId, templeClass) => {
    setLoader(true);
    let result = await getTempleClassDetails(profileId, templeClass);
    if(result?.status === 200){
      setTempleClassDetails(result?.data?.data);
      setLoader(false);
    } else{
      setLoader(false);
    }
  };

  useEffect(() => {
    TopTempleClass(id, templeclass);
  }, []);
  // console.log(templeClassDetails);

  return (
    <View style={{flex: 1,backgroundColor:'white'}}>
      <View style={{height: '15%'}}>
        <TopBarCard2
          back={true}
          txt={'Temple Class'}
          marginLeft={'18%'}
          navBack={() => navigation.goBack()}
          navigation={navigation}
        />
      </View>
      <View>
        {loader ? (
          <Loader size={'large'} color={colors.orangeColor} />
        ) : (
          templeClassDetails?.length ? (
            <FlatList
              data={templeClassDetails}
              keyExtractor={({item, index}) => index}
              renderItem={({item}) => (
                <View
                  style={{
                    borderWidth: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    padding: 10,
                    marginHorizontal: 10,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={{uri: item?.fromProfile?.logo ? item?.fromProfile?.logo : 'https://fanfun.s3.ap-south-1.amazonaws.com/1707819684948noimg.png'}}
                    style={{height: 60, width: 60, borderRadius: 70 / 2}}
                  />
                  <Text style={{marginLeft: 20, marginTop: 20}}>
                    {item?.fromProfile?.name}
                  </Text>
                </View>
              )}
            />
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '60%',
              }}>
              <Text style={{color: colors.orangeColor, fontWeight: 'bold'}}>
              No Items To Display
              </Text>
            </View>
          )
        )}
        
      </View>
    </View>
  );
};

export default TempleClass;
