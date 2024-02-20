/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { CrewCard } from '../../components';
import { Loader } from '../../components';
import { colors } from '../../common';
import { styles } from './styles';
import { TopBarCard2 } from '../../components/topBar1/topBarCard';
import { NewTempleCrew,GetProfilePic,getUserInfoNew } from '../../utils/api';
import Ionicons from 'react-native-vector-icons/Entypo';
const TempleCrew = ({ route, navigation }) => {
  const [loader, setLoader] = useState(false);
  const { id } = route.params || {};
  const [data, setData] = useState([]);
  const [donationData, setDonationData] = useState([]);




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


  const customerProfilePic = async (e) => {
    console?.log('=====><', e)
    try {
      let result = await getUserInfoNew(e?.customerId);
      console.log('profilepic', result?.data);
      if (result?.status === 200) {
        let responce = { ...e, ...result?.data };
        console.log('responce===><', [responce]);
        if (responce) {
          setDonationData([responce])
        }
      } else {
        setDonationData(e)
      }
    } catch (error) {
      setDonationData(e)
      console.log('error in profile pic api in donations', error);
    }
  };

  const templeCrewDetails = async () => {
    console.log('id in temple crew', id);
    setLoader(true);
    try {
      let result = await NewTempleCrew(id, 0, 20);
      console.log('result.date in temple crew', result?.data);
      if (result) {
        setData(result?.data?.customerRoles);
        setLoader(false);
        let response = result?.data?.customerRoles;
        response?.map(e => {
          customerProfilePic(e)
        })
      } else {
        setData([]);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log('error in crew', error)
    }
  };
  useEffect(() => {
    templeCrewDetails();
  }, []);
  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={{ minHeight: 120, marginTop: '3%' }}>
        <TopBarCard2
          txt={'Temple crew'}
          isBell={true}
          back={true}
          navigation={navigation}
          navBack={navigation}>
          <View style={{ ...styles.searchbarContainer, marginTop: '-5%' }}>
          </View>
        </TopBarCard2>
      </View>
      <View style={{ marginLeft: '5%' }}>
        {/* <FlatList
         horizontal
         showsHorizontalScrollIndicator={false}
         data={infoData}
         keyExtractor={({item}) => item?.id}
        renderItem={({item}) => (
            <View style={{alignItems: 'center'}}>
              {item?.artistPic ? (
                <TouchableOpacity style={{height: 70, width: 70, borderRadius: 100 /2, borderWidth: 2, flexDirection: 'row', overflow: 'hidden', margin: 2, borderColor: colors.orangeColor}}>
                <Image source={{uri: item?.donarPic}} height={60} width={30} style={{height: 65, width: 30, overflow: 'hidden', marginRight: 2}} />
                <Image source={{uri: item?.artistPic}} height={60} width={30} style={{height: 65, width: 30}} />
              </TouchableOpacity>
              ): (
               
                <TouchableOpacity style={{height: 70, width: 70, borderRadius: 100 /2, borderWidth: 2, margin: 2, alignItems: 'center', justifyContent: 'center', borderColor: colors.orangeColor}}>
                   <Ionicons name="plus" size={25} color={'#FFA001'} />
                   </TouchableOpacity>
              )}
              <Text> {item?.year}</Text>
            </View>
        )}
        
        /> */}

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={{ height: 70, width: 70, borderRadius: 100 / 2, borderWidth: 2, margin: 2, alignItems: 'center', justifyContent: 'center', borderColor: colors.orangeColor }}>
              <Ionicons name="plus" size={25} color={'#FFA001'} />
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
      <View style={styles.bodyContainer}>
        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'small'} color={colors.orangeColor} />
          ) : (
            donationData?.length ? (
              <FlatList
                style={styles.list}
                data={donationData}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListStyle}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => (
                  <CrewCard
                    data={item}
                  />
                )}
              />
            ) : (
              <View style={styles.noText}>
                <Text style={styles.noText.ntext}> No Data To display</Text>
              </View>
            )
          )}
        </View>
      </View>
    </View>
  );
};
export default TempleCrew;
