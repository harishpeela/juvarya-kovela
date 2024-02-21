/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import ApplicationContext from '../../utils/context-api/Context';
import { View, Text, FlatList, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { Loader, FollowersListCard4 } from '../../components';
import { colors, allTexts } from '../../common';
import { styles } from './styles';
import { TopBarCard2 } from '../../components/topBar1/topBarCard';
import {MemberShipList, MembersList } from '../../utils/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ioniconss from 'react-native-vector-icons/Entypo';
const TempleCrew = ({ route, navigation }) => {
  const {userDetails} = useContext(ApplicationContext);
  const [loader, setLoader] = useState(false);
  const [noTextLoader, setTextLoader] = useState(false);
  const { id } = route.params || {};
  const [data, setData] = useState([]);
  const [donationData, setDonationData] = useState();
  const [roleType, setRoleType] = useState();
  const [membershipId, setMemberShipId] = useState();


  const MembershipIdData = async () => {
    // console.log('membershipid', trfdata?.jtProfile);
    setLoader(true);
    setTextLoader(true);
    try {
      let result = await MemberShipList(id, 0, 100);
      console.log('res ==><><<>>', result?.data);
      let data = result?.data?.data;
      let ID = data?.filter(item => item)?.map(({id}) => ({id}));
      console.log('jknkjn.kjn.', ID)
      if(ID){
        setData(ID);
        setMemberShipId(ID);
        MembershipData(ID[0]?.id)
        setLoader(false)
        setTextLoader(true);
      } else{
        alert('SomeThing went wrong')
      }
    } catch (error) {
      console.log('error in membership details api', error);
      setLoader(false);
      setTextLoader(true);
    }
  };
  const MembershipData = async (memId) => {
    setTextLoader(true);
    console.log('data>id', memId);
    try {
      let result = await MembersList( memId ,0, 10);
      let responce = result?.data
      console.log('===========responce ====>>', responce?.data);
      if(responce){
        console.log('resssdd', responce)
        setDonationData(responce);
        setTextLoader(false)
      } else{
        console.log('res====>>', responce)
        setDonationData(undefined);
        setTextLoader(false)
      }
    } catch (error) {
      console.log('error in membership details api', error);
      setTextLoader(false)
      alert(error);
    }
  };
  const Type = () => {
    let ROLES = userDetails?.role;
    var roleAdmin = ROLES?.indexOf('ROLE_ADMIN') > -1;
    if (roleAdmin) {
      setRoleType(roleAdmin);
    } else{
      setRoleType(roleAdmin);
    }
  };
  useEffect(() => {
    MembershipIdData();
    Type();
  }, []); 

  const infoData = [
    {
      id: 1,
      donarName: '',
      artist: '',
      year: '2024',
      occation: 'dhussera',
      donarPic: '',
      artistPic: '',
    },
    {
      id: 2,
      donarName: 'Anil Adari',
      artist: 'Satya prasad',
      year: '2023',
      occation: 'dhussera',
      donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066993216111706699316489.jpg',
      artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067010593281706701053788.jpg',
    },
    {
      id: 3,
      donarName: 'Mahesh doddi',
      artist: 'Sivaji',
      year: '2022',
      occation: 'dhussera',
      donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066989814871706698976055.jpg',
      artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067007931111706700787938.jpg',
    },
    // {
    //   id: 4,
    //   donarName: 'siva kumar Dadi',
    //   artist: 'durga naidu',
    //   year: '2021',
    //   occation: 'dhussera',
    //   donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066993216111706699316489.jpg',
    //   artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067010593281706701053788.jpg',

    // },
    // {
    //   id: 5,
    //   donarName: 'Jagan sai Karri',
    //   artist: 'chiranjeevi',
    //   year: '2020',
    //   occation: 'dhussera',
    //   donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066989814871706698976055.jpg',
    //   artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067007931111706700787938.jpg',
    // },
    // {
    //   id: 6,
    //   donarName: 'vamsi chadaram',
    //   artist: 'Prasad',
    //   year: '2019',
    //   occation: 'dhussera',
    //   donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066993216111706699316489.jpg',
    //   artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067010593281706701053788.jpg',
    // },
    // {
    //   id: 7,
    //   donarName: 'Jagan sai Karri',
    //   artist: 'chiranjeevi',
    //   year: '2020',
    //   occation: 'dhussera',
    //   donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066989814871706698976055.jpg',
    //   artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067007931111706700787938.jpg',
    // },
    // {
    //   id: 8,
    //   donarName: 'vamsi chadaram',
    //   artist: 'Prasad',
    //   year: '2019',
    //   occation: 'dhussera',
    //   donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066993216111706699316489.jpg',
    //   artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067010593281706701053788.jpg',
    // },
    // {
    //   id: 9,
    //   donarName: 'Jagan sai Karri',
    //   artist: 'chiranjeevi',
    //   year: '2020',
    //   occation: 'dhussera',
    //   donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066989814871706698976055.jpg',
    //   artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067007931111706700787938.jpg',
    // },
    // {
    //   id: 10,
    //   donarName: 'vamsi chadaram',
    //   artist: 'Prasad',
    //   year: '2019',
    //   occation: 'dhussera',
    //   donarPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17066993216111706699316489.jpg',
    //   artistPic: 'https://fanfun.s3.ap-south-1.amazonaws.com/17067010593281706701053788.jpg',
    // },
  ]
console.log(donationData, 'jahsbxahbs');
  return (
    <View style={{ backgroundColor: 'white' }}>
       <View style={styles.headerContainer}>
            <TouchableOpacity  onPress={() => navigation.goBack()}>
              <Ionicons
                name="caret-back-circle"
                size={36}
                color={'#ffffff'}
                style={{ alignSelf: 'flex-start', justifyContent: 'center' }}
              />
            </TouchableOpacity>
            <View>
            <Text style={{color: colors.white, fontWeight: 'bold', fontSize: 20, marginLeft: '35%'}}> Members List</Text>
            </View>
                <TouchableOpacity style={{marginLeft: '10%'}} onPress={() => {
                  navigation.navigate(allTexts.screenNames.invitationScreen, {
                    roleId: membershipId[0]?.id,
                    id: id,
                  })
                }}>
                  <Text style={{ fontSize:20,fontWeight:'bold', color: colors.white}}>Invite</Text>
                </TouchableOpacity>
        </View>
      <View style={{ marginLeft: '5%', marginTop: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={{ height: 70, width: 70, borderRadius: 100 / 2, borderWidth: 2, margin: 2, alignItems: 'center', justifyContent: 'center', borderColor: colors.orangeColor }}>
              <Ioniconss name="plus" size={25} color={'#FFA001'} />
            </TouchableOpacity>
            <Text> {infoData[0]?.year}</Text>
          </View>

          <View style={{ alignItems: 'center'}}>
            <TouchableOpacity style={{ height: 70, width: 70, borderRadius: 100 / 2, borderWidth: 2, flexDirection: 'row', overflow: 'hidden', margin: 2, borderColor: colors.orangeColor }}>
              <Image source={{ uri: infoData[1]?.donarPic }} height={60} width={30} style={{ height: 65, width: 30, overflow: 'hidden', marginRight: 2 }} />
              <Image source={{ uri: infoData[1]?.artistPic }} height={60} width={30} style={{ height: 65, width: 30 }} />
            </TouchableOpacity>

            <Text> {infoData[1]?.year}</Text>
          </View>
          <View style={{ alignItems: 'center'}}>
            <TouchableOpacity style={{ height: 70, width: 70, borderRadius: 100 / 2, borderWidth: 2, flexDirection: 'row', overflow: 'hidden', margin: 2, borderColor: colors.orangeColor }}>
              <Image source={{ uri: infoData[2]?.donarPic }} height={60} width={30} style={{ height: 65, width: 30, overflow: 'hidden', marginRight: 2 }} />
              <Image source={{ uri: infoData[2]?.artistPic }} height={60} width={30} style={{ height: 65, width: 30 }} />
            </TouchableOpacity>
            <Text> {infoData[2]?.year}</Text>
          </View>
          <View>
          <TouchableOpacity style={{  alignItems: 'center', justifyContent: 'center', marginLeft: '30%' }}>
             <Text style={{fontWeight: 'bold', color: colors.orangeColor, fontSize: 16}}> See all</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{height: '80%'}}>
      {loader ? (
          <View>
            <Loader size={'small'} color={colors.orangeColor} />
          </View>
        ) : (
          <View style={{ marginTop: '10%' }}>
            {data?.length ? (
              <FlatList
              data={data}
                keyExtractor={({item, index}) => item?.id}
                renderItem={({item, index}) => (
                  <FollowersListCard4 data={item} navigation={navigation} />
            )}
              />
            ) : (
              ''
            )}
          </View>
        )}
        {noTextLoader ? (
           <View>
           <Loader size={'small'} color={colors.white} />
         </View>
        ) : 
        donationData?.data == undefined ? (
          <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '50%',
                }}>
                <Text style={{color: colors.orangeColor}}> no memberships for this temple</Text>
              </View>
        ): ''
        }
      </View>
    </View>
  );
};
export default TempleCrew;
//donationData?.data == undefined

{/* <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '50%',
                }}>
                <Text style={{color: colors.orangeColor}}> no memberships for this temple</Text>
              </View> */}