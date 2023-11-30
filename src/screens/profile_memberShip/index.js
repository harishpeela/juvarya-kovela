/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {
  BackgroundImage,
  BackHeaderNew,
  Loader,
  MemberShipCard,
} from '../../components';
import {MemberShipDetails} from '../../utils/api';
import {styles} from './styles';
import {colors, allTexts} from '../../common';
const ProfileMembership = ({route, navigation}) => {
  const {id} = route.params || {};
  const [data, setData] = useState([]);
  const [loader, setaLoader] = useState(false);

  const MembershipData = async () => {
    setaLoader(true);
    try {
      let result = await MemberShipDetails(id);
      console.log('res', result?.data);
      if (result) {
        setaLoader(false);
        setData(result?.data?.memberships);
      } else {
        setaLoader(false);
      }
    } catch (error) {
      console.log('error in membership details api', error);
      setaLoader(false);
      alert(error);
    }
  };
  useEffect(() => {
    MembershipData();
  }, []);
  return (
    <SafeAreaView>
      <BackgroundImage />
      <View style={styles.mainContainer}>
        <BackHeaderNew
          txt={'Membership'}
          onPress={() => navigation.goBack()}
          isPlus
          // txtColor={'white'}
          onPlusPress={() =>
            navigation.navigate(allTexts.screenNames.addMembershipDetails)
          }
        />
        {loader ? (
          <View>
            <Loader size={'small'} color={colors.orangeColor} />
          </View>
        ) : (
          <View style={{marginTop: '10%'}}>
            {!data?.length ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '50%',
                }}>
                <Text> no memberships for this temple</Text>
              </View>
            ) : (
              <MemberShipCard
                onPress={() => alert('under development')}
                data={data}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default ProfileMembership;
