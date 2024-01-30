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
import { TopBarcard } from '../../components';

const FollowersMembership = ({ route, navigation }) => {
  const [followersList, setFollowersList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchedText, setSearchedText] = useState('');
  const [filteredData, setFilteredData] = useState(followersList);
  const { id } = route.params || {};
  const [loading, setLoading] = useState(false);
console.log('id ===> ', id);
  let TempleFolowers = async () => {
    try {
      let result = await TempleFollowersList(id);
      if (result.status === 200) {
        console.log('data of temple followers', result?.data);
        setLoader(false);
        // if(result?.data?.data)
        if (result?.data?.data !== undefined ) {
          setFollowersList(result?.data?.data);
        } 
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log('error in temple folowers', error);
    }
  };

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
    <View>
      <View style={{ minHeight: 160, marginTop: '3%' }}>
        <TopBarcard txt={'Followers'} isBell={true} back={true}  navigation={navigation} navBack={navigation} >
          <View style={{...styles.searchbarContainer, marginTop: '-5%'}}>
            <View>
              <SearchBar
                placeHolder={'Search followers'}
                onCrossPress={() => {
                  setSearchedText('');
                  getTemples();
                }}
                onTextChange={e => {
                  setSearchedText(e);
                  handleSearch(e);
                }}
              />
            </View>
          </View>
        </TopBarcard>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'large'} color={colors.orangeColor} />
          ) : (
            <>
              {followersList.length === 0 && searchedText === '' ? (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>No followers yet</Text>
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
                    <View style={styles.noDataContainer}>
                      <Text style={styles.noDataText}>No followers found</Text>
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
