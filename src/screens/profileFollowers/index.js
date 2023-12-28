/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import {
  BackHeaderNew,
  FollowersListCard2,
  SearchBar,
  Sort,
} from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TempleFollowersList } from '../../utils/api';
import { Loader } from '../../components';
import { colors } from '../../common';
import { styles } from './styles';
import { Ellipsis } from '../../components';

const FollowersMembership = ({ route, navigation }) => {
  const [followersList, setFollowersList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchedText, setSearchedText] = useState('');
  const [filteredData, setFilteredData] = useState(followersList);
  const { id } = route.params || {};
  const [loading, setLoading] = useState(false);

  let TempleFolowers = async () => {
    try {
      let result = await TempleFollowersList(id);
      if (result.status === 200) {
        console.log('data of temple followers', result?.data);
        setLoader(false);
        // if(result?.data?.data)
        if (result?.data?.data !== undefined) {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.followersHeader}>
        <BackHeaderNew
          txt={
            followersList.length > 0
              ? `Followers`
              : null // or any fallback value you want when followersList is not greater than 0
          }
          onPress={() => navigation.goBack()}
          txtColor={colors.black}
        />
        {/* <Ellipsis txtColor={colors.black} /> */}
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
              txtColor={colors.orangeColor}
              srWidth={'100%'}
            // srHeight={"100%"}
            />
          </View>
        </View>
        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'large'} color={colors.orangeColor} />
          ) : (
            <>
              {/* <ScrollView showsVerticalScrollIndicator={false}> */}
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
              {/* </ScrollView> */}

              {/* <ScrollView style={{height: searchedText ? '85%' : 0}}> */}
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
              ) : (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>No Followers to Display</Text>
                </View>
              )}
              {/* </ScrollView> */}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default FollowersMembership;
