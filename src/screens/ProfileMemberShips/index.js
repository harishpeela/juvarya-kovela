import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {MemberShipCard, TopBarcard} from '../../components';
import {allTexts, colors} from '../../common';
import {styles} from './styles';
import {MemberShipList} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
import { Loader } from '../../components';
const ProfileMemberShips = ({navigation, route}) => {
  const {userDetails} = useContext(ApplicationContext);
  const {roleId, trfdata} = route.params || {};
  console.log('profileid', trfdata?.jtProfile)
  const [loader, setLoader] = useState();
  const [membership, setMemberShipData] = useState([]);
  const [roleType, setRoleType] = useState();
  const data = [
    {
      id: 1,
      name: 'harish',
      type: 'BASIC',
    },
  ];
  const Type = () => {
    let ROLES = userDetails?.role;
    var roleAdmin = ROLES?.indexOf('ROLE_ADMIN') > -1;
    if (roleAdmin) {
      setRoleType('ROLE_ADMIN');
    }
  };
  const MembershipData = async () => {
    console.log('membershipid', trfdata?.jtProfile)
    setLoader(true);
    try {
      let result = await MemberShipList(trfdata?.jtProfile, 0, 100);
      console.log('res ==><><<>>', result?.data);
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
    Type();
  }, []);
  console.log('roleType roletype', roleId);
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TopBarcard
          back={true}
          txt={'Memberships'}
          navigation={navigation}
          roleId={roleId}
          roleType={roleType}
          navCreate={() => {
            navigation.navigate(allTexts.screenNames.addMembershipDetails, {
              roleId: roleId,
              jtProfileId: trfdata?.jtProfile,
            });
          }}
        />
      </View>
      <View style={{ marginTop: '2%', marginHorizontal: '2%' }}>
        {loader ? (
          <Loader size={'small'} color={colors.orangeColor} />
        ) : (
          membership?.length ? (
            <MemberShipCard
            data={membership}
            roleId={roleId}
            txt={
              roleId === 'ROLE_ITEM_ADMIN' || roleType === 'ROLE_ADMIN'
                ?  'Membership'
                : 'Join Now'
            }
            nav={navigation}
          />
          ) : (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 20, color: colors.orangeColor, fontWeight: 'bold', marginTop: '70%'}}> No Memberships available</Text>
              </View>
          )
        )}
        
      </View>
    </View>
  );
};

export default ProfileMemberShips;
