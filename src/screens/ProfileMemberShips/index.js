import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {MemberShipCard, BackgroundImage, BackHeaderNew} from '../../components';
import {allTexts} from '../../common';
import {styles} from './styles';
import {MemberShipDetails} from '../../utils/api';
const ProfileMemberShips = ({navigation, route}) => {
  const {roleId, trfdata} = route.params || {};
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
      let result = await MemberShipDetails(0, 100);
      console.log('ressssssssssssssssssss', result?.data);
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
      <BackgroundImage />
      <View style={styles.header}>
        <BackHeaderNew
          txt={'MemberShips'}
          isArrow={true}
          onPress={() => navigation.goBack()}
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
      <View style={{marginTop: '10%', marginHorizontal: '5%'}}>
        <MemberShipCard
          data={data}
          txt={
            roleId === 'ROLE_ITEM_ADMIN'
              ? `${membership?.length} Memberships`
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
