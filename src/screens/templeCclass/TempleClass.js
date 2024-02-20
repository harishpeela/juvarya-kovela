import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getTempleClassDetails} from '../../utils/api';
import {TopBarCard2, TopBarcard} from '../../components/topBar1/topBarCard';
import {FlatList} from 'react-native-gesture-handler';
import {colors} from '../../common';

const TempleClass = ({route, navigation}) => {
  const [templeClassDetails, setTempleClassDetails] = useState([]);
  const {id, templeclass} = route.params || {};
  const TopTempleClass = async (profileId, templeClass) => {
    let result = await getTempleClassDetails(profileId, templeClass);
    setTempleClassDetails(result?.data?.data);
  };

  useEffect(() => {
    TopTempleClass(id, templeclass);
  }, []);
  console.log(templeClassDetails);

  return (
    <View style={{flex: 1}}>
      <View style={{height: '15%'}}>
        <TopBarCard2
          back={true}
          txt={'Temple Class'}
          navBack={() => navigation.goBack()}
          navigation={navigation}
        />
      </View>
      <View>
        {templeClassDetails.length ? (
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
                  source={{uri: item?.fromProfile?.logo}}
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
              No items to displayy
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TempleClass;
