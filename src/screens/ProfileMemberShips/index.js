import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {MemberShipCard, TopBarcard} from '../../components';
import {allTexts} from '../../common';
import {styles} from './styles';
import {MemberShipList} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
const ProfileMemberShips = ({navigation, route}) => {
  const {userDetails} = useContext(ApplicationContext);
  const {roleId, trfdata} = route.params || {};
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
    Type();
  }, []);
  console.log('roleType roletype', roleType, roleId);
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
      <View style={{ marginTop: '10%', marginHorizontal: '5%' }}>
        {membership?.length  ? (
          <MemberShipCard
          data={data}
          txt={
            roleId === 'ROLE_ITEM_ADMIN' || roleType === 'ROLE_ADMIN'
              ? `${membership?.length ? membership?.length : '0'} Membership`
              : 'Join Now'
          }
          onPress={() =>
            navigation.navigate(allTexts.screenNames.profilemembership, {
              roleId: roleId,
            })
          }
        />
        ) : (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text> No data to display</Text>
            </View>
        )}
      </View>
    </View>
  );
};

export default ProfileMemberShips;
