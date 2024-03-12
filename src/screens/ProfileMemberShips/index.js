import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {MemberShipCard, TopBarcard} from '../../components';
import {allTexts, colors} from '../../common';
import {styles} from './styles';
import {MemberShipList} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
import {Loader} from '../../components';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
const ProfileMemberShips = ({navigation, route}) => {
  const {userDetails} = useContext(ApplicationContext);
  const {roleId, trfdata} = route.params || {};
  const [loader, setLoader] = useState();
  const [membership, setMemberShipData] = useState([]);
  const [roleType, setRoleType] = useState();

  const Type = () => {
    let ROLES = userDetails?.role;
    var roleAdmin = ROLES?.indexOf('ROLE_ADMIN') > -1;
    if (roleAdmin) {
      setRoleType('ROLE_ADMIN');
    }
  };
  const MembershipData = async () => {
    // console.log('membershipid', trfdata?.jtProfile);
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
  return (
    <View style={{flex: 1,backgroundColor:'white'}}>
      <View style={styles.header}>
        <TopBarCard2
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
      <View
        style={{marginTop: '2%' , flex:1}}>
        {loader ? (
          <View style={{marginTop: '-30%'}}>
            <Loader size={'large'} color={colors.orangeColor} />
          </View>
        ) : membership?.length ? (
          <MemberShipCard
            data={membership}
            roleId={roleId}
            txt={
              roleId === 'ROLE_ITEM_ADMIN' || roleType === 'ROLE_ADMIN'
                ? 'Membership'
                : 'Join Now'
            }
            nav={navigation}
            // onPress={() =>
            //   navigation.navigate(allTexts.screenNames.profilemembership, {
            //     roleId: roleId,
            //   })
            // }
          />
        ) : (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 16,
                color: colors.orangeColor,

                marginTop: '50%',
                fontFamily: 'Poppins-Medium',
              }}>
              {' '}
              No Memberships Available
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileMemberShips;
