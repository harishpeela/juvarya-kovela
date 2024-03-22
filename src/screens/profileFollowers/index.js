/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import {
  BackHeaderNew,
  FollowersListCard2,
  SearchBar,
  Sort
} from '../../components';
import { TempleFollowersList } from '../../utils/api';
import { Loader } from '../../components';
import { colors } from '../../common';
import { styles } from './styles';
import { Ellipsis } from '../../components';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { TopBarCard2, TopBarcard } from '../../components/topBar1/topBarCard';
import { statusBarHeight } from '../../utils/config/config';
import { useLazyGetTempleFollowersListQuery } from '../../redux/services/templeProfileService';

const FollowersMembership = ({ route, navigation }) => {
  const [followersList, setFollowersList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchedText, setSearchedText] = useState('');
  const [filteredData, setFilteredData] = useState(followersList);
  const { id } = route.params || {};
  const [loading, setLoading] = useState(false);

  const [templeFollowersList]=useLazyGetTempleFollowersListQuery()

  let TempleFolowers = async () => {
    setLoader(true)
      let data = {
        pageNo: 0,
        pageSize: 100,
        profileId: id
      };
      templeFollowersList(data)
        .unwrap()
        .then(response => {
          if (response) {
            setLoader(false);
            setFollowersList(response.data)
          } else {
            setLoader(false);
          }
        })
        .catch(error => {
          console.log('error--->', error);
          setLoader(false);
      });
    }
  useEffect(() => {
    TempleFolowers();
  }, [route]);

  const handleSearch = query => {
    setLoading(true);
    const filteredUserData = followersList.filter(item =>
      item.user.firstName.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(filteredUserData);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{ height: 60, marginTop: statusBarHeight,backgroundColor:'white'}}>
      <TopBarCard2  back={true}  navigation={navigation} navMenu={navigation} >
          <View>
              <SearchBar
                placeHolder={'Search Followers'}
                showCrossPress={true}
                onCrossPress={() => {
                  setSearchedText('');
                  TempleFolowers();
                }}
                onTextChange={e => {
                  setSearchedText(e);
                  handleSearch(e);
                }}
                value={searchedText}
                loading={false}
              />
          </View>
        </TopBarCard2>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.followersContainer}>
          {loader ? (
             <View style={{marginTop: '-32%'}}>
             <Loader size={'large'} color={colors.orangeColor} />
           </View>
          ) : (
            <>
              {followersList.length === 0 && searchedText === '' ? (
                <View style={styles.noDataContainer}>
                  <SimpleLineIcons
                    name="user-unfollow"
                    color={'orange'}
                    size={30}
                    style={{ marginBottom: '3%' }}
                  />
                  <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'orange'}}>No Followers Yet</Text>
                </View>
              ) : (
                <>
                  {searchedText === '' && (
                    <FlatList
                      style={styles.list}
                      data={followersList}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={styles.flatListStyle}
                      keyExtractor={(item, index) => item.user.id.toString()}
                      renderItem={({ item }) => (
                        <FollowersListCard2
                          name={item.user.firstName}
                          img={item.user.url}
                          data={item.user}
                          donation={item.user.donation}
                        />
                      )}
                    />
                  )}
                  {searchedText && filteredData.length > 0 ? (
                    <FlatList
                      style={styles.list}
                      data={filteredData}
                      contentContainerStyle={styles.flatListStyle}
                      keyExtractor={item => item.user.id.toString()}
                      renderItem={({ item }) => (
                        <FollowersListCard2
                          name={item.user.firstName}
                          img={item.user.url}
                          data={item.user}
                          donation={item.user.donation}
                        />
                      )}
                    />
                  ) : searchedText && filteredData.length === 0 ? (
                    <View>
                      <View style={styles.noDataContainer}>
                        <SimpleLineIcons

                          name="user-unfollow"
                          color={'orange'}
                          size={30}
                          style={{ marginBottom: '5%' }}
                        />
                        <Text style={{fontFamily:'Poppins-Medium',fontSize:15,color:'orange'}}>No Followers Found</Text>
                      </View>
                    </View>
                  ) : null}
                </>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default FollowersMembership;
