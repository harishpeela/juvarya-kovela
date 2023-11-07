/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import {
  BackgroundImage,
  BackHeaderNew,
  FollowersListCard2,
  SearchBar,
  SearchCard,
  Sort,
} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TempleFollowersList} from '../../utils/api';
import {Loader} from '../../components';
import {colors} from '../../common';
import {styles} from './styles';
import {Ellipsis} from '../../components';

const FollowersMembership = ({route, navigation}) => {
  const [followersList, setFollowersList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchedText, setSearchedText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const {id} = route.params || {};
  const [searchLoading, setSearchLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [loading, setLoading] = useState(false);

  console.log('id', id);

  let TempleFollowers = async () => {
    try {
      let result = await TempleFollowersList(id);
      console.log('res of followers', result?.data?.data);
      if (result.status === 200) {
        setLoader(false);
        setFollowersList(result?.data?.data);
        console.log('FollowerList => ', result?.data?.data?.user);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log('error in temple followers', error);
    }
  };

  useEffect(() => {
    TempleFollowers();
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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.followersHeader}>
        <BackHeaderNew
          txt={`${followersList.length} Followers`}
          onPress={() => navigation.goBack()}
          txtColor={colors.black}
        />
        <Ellipsis txtColor={colors.black} />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.searchAndFilter}>
          <View style={styles.searchContainer}>
            <SearchBar
              value={searchedText}
              onTextChange={text => {
                setSearchedText(text);
                handleSearch(text);
              }}
              loading={loading}
              onCrossPress={() => {
                setSearchedText('');
                setFilteredData([]);
              }}
              placeHolder={'Search here'}
              style={styles.customSearch}
              showCrossPress={true}
              bgColor={colors.white}
              brColor={colors.gray2}
              brWidth={1}
            />
          </View>
          <View style={styles.sortContainer}>
            <Sort
              style={styles.sort}
              brColor={colors.gray2}
              txtColor={colors.orangeColor2}
              srWidth={'100%'}
            />
          </View>
        </View>
        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'large'} color={colors.orangeColor} />
          ) : (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                {searchedText === '' && (
                  <FlatList
                    style={styles.list}
                    data={followersList}
                    contentContainerStyle={styles.flatListStyle}
                    keyExtractor={(item, index) => item.user.id.toString()}
                    renderItem={({item}) => (
                      <FollowersListCard2
                        name={item.user.firstName}
                        img={item.user.url}
                        data={item.user}
                        donation={item.user.donation}
                      />
                    )}
                  />
                )}
              </ScrollView>

              <ScrollView style={{height: searchedText ? '85%' : 0}}>
                {searchedText && filteredData.length > 0 ? (
                  <FlatList
                    style={styles.list}
                    data={filteredData}
                    contentContainerStyle={styles.flatListStyle}
                    keyExtractor={item => item.user.id.toString()}
                    renderItem={({item}) => (
                      <FollowersListCard2
                        name={item.user.firstName}
                        img={item.user.url}
                        data={item.user}
                        donation={item.user.donation}
                      />
                    )}
                  />
                ) : (
                  <View style={styles.noData}>
                    <Text style={styles.noDataText}>
                      No Followers to Display
                    </Text>
                  </View>
                )}
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FollowersMembership;
