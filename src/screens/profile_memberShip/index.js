/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BackgroundImage, BackHeaderNew, Loader} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MemberShipDetails} from '../../utils/api';
import {styles} from './styles';
import {colors, allTexts} from '../../common';
import {FlatList} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ProfileMembership = ({route, navigation}) => {
  const {id} = route.params || {};
  const [data, setData] = useState([]);
  const [loader, setaLoader] = useState(false);
  console.log('id ===>', id);
  const MembershipData = async () => {
    setaLoader(true);
    try {
      let result = await MemberShipDetails(id);
      console.log('res', result?.data?.memberships);
      if (result) {
        setaLoader(false);
        setData(result?.data?.memberships);
      }
    } catch (error) {
      console.log('error in membership details api', error);
    }
  };

  useEffect(() => {
    MembershipData();
  }, [id]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <View style={{marginHorizontal: '5%', marginVertical: 10}}>
        <BackHeaderNew
          txt={'Membership'}
          onPress={() => navigation.goBack()}
          isPlus
          onPlusPress={() =>
            navigation.navigate(allTexts.screenNames.addMembershipDetails)
          }
        />
        <View>
          {loader ? (
            <View>
              <Loader size={'small'} color={colors.orangeColor} />
            </View>
          ) : data?.length > 0 ? (
            <FlatList
              data={data}
              keyExtractor={({item, index}) => index}
              renderItem={({item, index}) => (
                <TouchableOpacity style={styles.card}>
                  <MaterialCommunityIcons
                    name="wallet-membership"
                    size={22}
                    color={colors.orangeColor}
                  />
                  <Text style={styles.type}>{item?.name} </Text>
                  <Text style={{...styles.type, color: colors.orangeColor}}>
                    {' '}
                    $ 250{' '}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.nomemship}>
              {' '}
              No Membership available for this Temple
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ProfileMembership;
