/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useCallback } from 'react';
import useFocusEffect from '@react-navigation/native';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import {
  BackgroundImage,
  BackHeaderNew,
  FollowersListCard3,
  Loader,
  MemberShipCard,
} from '../../components';

import { MemberShipDetails } from '../../utils/api';
import { styles } from './styles';
import { colors, allTexts } from '../../common';
const ProfileMembership = ({ route, navigation }) => {
  const { id } = route.params || {};
  const [data, setData] = useState([]);
  const [loader, setaLoader] = useState(false);
  // const [loader, setLoader] = useState(true);
  const [searchedText, setSearchedText] = useState('');
  const [followersList, setFollowersList] = useState([]);
  const [filteredData, setFilteredData] = useState(followersList);

  // const MembershipData = async () => {
  //   setaLoader(true);
  //   try {
  //     let result = await MemberShipDetails(id);
  //     console.log('res', result?.data);
  //     if (result) {
  //       setaLoader(false);
  //       setData(result?.data?.memberships);
  //     } else {
  //       setaLoader(false);
  //     }
  //   } catch (error) {
  //     console.log('error in membership details api', error);
  //     setaLoader(false);
  //     alert(error);
  //   }
  // };
  // useEffect(() => {
  //   MembershipData();
  // }, []);
  // useFocusEffect(
  //   useCallback(() => {
  //     MembershipData();
  //     return () => {};
  //   }, []),
  // );
  return (
    <SafeAreaView>
      <BackgroundImage />
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <BackHeaderNew
            txt={'Members'}
            onPress={() => navigation.goBack()}
          // onPlusPress={() =>
          //   navigation.navigate(allTexts.screenNames.addMembershipDetails)
          // }
          />
          <Text>Join</Text>

        </View>
        {loader ? (
          <View>
            <Loader size={'small'} color={colors.orangeColor} />
          </View>
        ) : (
          <View style={{ marginTop: '10%' }}>
            {data?.length ? (
              <MemberShipCard
                onPress={() => alert('under development')}
                data={data}
              />
            ) : (
              <View style={styles.followersContainer}>
                {loader ? (
                  <Loader size={'large'} color={colors.orangeColor} />
                ) : (
                  <>
                    <FollowersListCard3 />
                  </>

                  // <>
                  //   {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                  //   {searchedText === '' && (
                  //     <FlatList
                  //       style={styles.list}
                  //       data={followersList}
                  //       contentContainerStyle={styles.flatListStyle}
                  //       keyExtractor={(item, index) => item.user.id.toString()}
                  //       renderItem={({ item }) => (
                  //         <FollowersListCard2
                  //           name={item.user.firstName}
                  //           img={item.user.url}
                  //           data={item.user}
                  //           donation={item.user.donation}
                  //         />
                  //       )}
                  //     />
                  //   )}
                  //   {/* </ScrollView> */}

                  //   {/* <ScrollView style={{height: searchedText ? '85%' : 0}}> */}
                  //   {searchedText && filteredData.length > 0 ? (
                  //     <FlatList
                  //       style={styles.list}
                  //       data={filteredData}
                  //       contentContainerStyle={styles.flatListStyle}
                  //       keyExtractor={item => item.user.id.toString()}
                  //       renderItem={({ item }) => (
                  //         <FollowersListCard2
                  //           name={item.user.firstName}
                  //           img={item.user.url}
                  //           data={item.user}
                  //           donation={item.user.donation}
                  //         />
                  //       )}
                  //     />
                  //   ) : (
                  //     <View style={styles.noDataContainer}>
                  //       <Text style={styles.noDataText}>No Followers to Display</Text>
                  //     </View>
                  //   )}
                  //   {/* </ScrollView> */}
                  // </>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default ProfileMembership;
