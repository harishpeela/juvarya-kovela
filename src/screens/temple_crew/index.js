/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import { CrewCard } from '../../components';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';
import {
  BackHeaderNew,
  FollowersListCard2,
  SearchBar,
  Sort,
} from '../../components';
import {MembersList} from '../../utils/api';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TempleFollowersList} from '../../utils/api';
import {Loader} from '../../components';
import {colors} from '../../common';
import {styles} from './styles';
import {Ellipsis} from '../../components';
import {TopBarcard} from '../../components';
import {NewTempleCrew} from '../../utils/api';
const TempleCrew = ({route, navigation}) => {
  const [followersList, setFollowersList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [filteredData, setFilteredData] = useState(followersList);
  const {id} = route.params || {};
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // const templeCrewDetails = async () => {
  //     let token = await getAuthTokenDetails()
  //     var myHeaders = new Headers();
  //     myHeaders.append("Authorization", token);
  //     var raw = "";

  //     var requestOptions = {
  //         method: 'GET',
  //         headers: myHeaders,
  //         body: raw,
  //         redirect: 'follow'
  //     };

  //     fetch("https://fanfun.in/membership/jtProfileMembership/profile/members?profileId=1&pageNo=0&pageSize=100", requestOptions)
  //         .then(response => response.json())
  //         .then(result => console.log(result))
  //         .catch(error => console.log('error', error));
  // }

  const templeCrewDetails = async () => {
    setLoader(true);
    let result = await NewTempleCrew(1);
    console.log('result.date', result.data);
    if(result){
        setData(result?.data);
        setLoader(false);
    } else{
        setData([]);
        setLoader(false);
    }
  };
  useEffect(() => {
    templeCrewDetails();
  }, []);
console.log('crew data====>', data);
  return (
    <View>
      <View style={{minHeight: 120, marginTop: '3%'}}>
        <TopBarcard
          txt={'Temple crew'}
          isBell={true}
          back={true}
          navigation={navigation}
          navBack={navigation}>
          <View style={{...styles.searchbarContainer, marginTop: '-5%'}}>
            <View>
              {/* <SearchBar
                                placeHolder={'search crew'}
                                onCrossPress={() => {
                                    setSeracherdText('');
                                    getTemples();
                                }}
                                onTextChange={e => {
                                    setSeracherdText(e);
                                    performFilter(e);
                                }}
                            /> */}
            </View>
          </View>
        </TopBarcard>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'small'} color={colors.orangeColor} />
          ) : (
            <>
              {searchedText === '' && (
                <FlatList
                  style={styles.list}
                  data={data}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.flatListStyle}
                  keyExtractor={(item, index) => item.id.toString()}
                  renderItem={({item}) => (
                    <CrewCard
                      data={item}
                    //   img={item.user.firstName}
                    //   data={item.roles}
                    //   donation={item.user.profileToCustomerId}
                    />
                  )}
                />
              )}

                        </>
          )}
        </View>
      </View>
    </View>
  );
};
export default TempleCrew;
