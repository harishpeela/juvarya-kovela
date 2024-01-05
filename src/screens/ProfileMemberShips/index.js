import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MemberShipCard, TopBarcard, BackgroundImage, BackHeaderNew } from '../../components';
import { allTexts } from '../../common';
import { styles } from './styles';
import { MemberShipList } from '../../utils/api';
const ProfileMemberShips = ({ navigation, route }) => {
  const { roleId, trfdata } = route.params || {};
  const [loader, setLoader] = useState();
  const [membership, setMemberShipData] = useState([]);
  const data = [
    {
      id: 1,
      name: 'harish',
      type: 'BASIC',
    },
  ];

  const MembershipData = async () => {
    setLoader(true);
    try {
      let result = await MemberShipList(0, 100);
      console.log('res', result?.data);
      if (result) {
        setLoader(false);
        setMemberShipData(result?.data?.data);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log('error in membership details api', error);
      setLoader(false);
      alert(error);
    }
  };
  useEffect(() => {
    MembershipData();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TopBarcard
          back={true}
          txt={'Memberships'}
          navigation={navigation}
        />
        {roleId === 'ROLE_ITEM_ADMIN' && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(allTexts.screenNames.addMembershipDetails, {
                roleId: roleId,
                jtProfileId: trfdata?.jtProfile,
              });
            }}>
            <Text style={styles.joinText}>Create</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginTop: '10%', marginHorizontal: '5%' }}>
        <MemberShipCard
          data={data}
          txt={
            roleId === 'ROLE_ITEM_ADMIN'
              ? `${membership?.length ? membership?.length : '0'} Memberships`
              : 'Join Now'
          }
          onPress={() =>
            navigation.navigate(allTexts.screenNames.profilemembership, {
              roleId: roleId,
            })
          }
        />
      </View>
    </View>
  );
};

export default ProfileMemberShips;
