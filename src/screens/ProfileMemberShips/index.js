import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {MemberShipCard, BackgroundImage, BackHeaderNew} from '../../components';
import {allTexts} from '../../common';
import {styles} from './styles';
import {MemberShipDetails} from '../../utils/api';
const ProfileMemberShips = ({navigation, route}) => {
  const {roleId} = route.params || {};
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
      let result = await MemberShipDetails(0, 20);
      console.log('res', result?.data?.data.length);
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
    // MembershipData();
  }, []);
  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <View style={styles.header}>
        <BackHeaderNew txt={'Members'} onPress={() => navigation.goBack()} />
        {roleId === 'ROLE_ITEM_ADMIN' && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(allTexts.screenNames.addMembershipDetails);
            }}>
            <Text style={styles.joinText}>Create</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginTop: '10%', marginHorizontal: '5%'}}>
        <MemberShipCard
          data={data}
          length={membership.length ? membership.length : '0'}
          txt={roleId === 'ROLE_ITEM_ADMIN' ? 'Invite' : 'Join Now'}
          onPress={() =>
            navigation.navigate(allTexts.screenNames.profilemembership)
          }
        />
      </View>
    </View>
  );
};

export default ProfileMemberShips;
