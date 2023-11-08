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
import {Loader, FollowersListCard} from '../../components';
import {colors} from '../../common';
import {styles} from './styles';
import {Ellipsis} from '../../components';

const FollowersMembership = ({route, navigation}) => {
  const [followersList, setFollowersList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchedText, setSearchedText] = useState();
  const [filteredData, setFilteredData] = useState(followersList);
  const {id} = route.params || {};
  const [followersFirstName, setFollowersFirstName] = useState([]);

  console.log('id', id);
  let TempleFolowers = async () => {
    try {
      let result = await TempleFollowersList(id);
      // console.log('res of followes', result?.data);
      if (result.status === 200) {
        setLoader(false);
        setFollowersList(result?.data?.data);
        setFollowersFirstName(result?.data?.data?.user?.firstName);
        console.log('FollowerList => ' + followersFirstName);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log('error in temple folowers', error);
    }
  };

  console.log('rs', followersList);
  useEffect(() => {
    TempleFolowers();
  }, [route]);

  const handleSearch = query => {
    console.log(query);
    console.log('followersFirstName => ' + followerFirstName);
    // const filtered = followersList.filter(item =>
    //   item.firstName.toLowerCase().includes(query.toLowerCase),
    // );
    // setFilteredData(filtered);
    console.log('filtered data => ' + filteredData);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View></View>
      <View style={styles.followersHeader}>
        <BackHeaderNew
          txt={`${followersList?.length} Followers`}
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
              onTextChange={e => {
                // setSearchedText(e);
                // // FilteredList(e);
                // SearchPopTemp(e);
                handleSearch(e);
              }}
              // loading={searchLoading}
              // onCrossPress={async () => {
              //   setSearchedText('');
              //   await PopularTemplesss(pageNo, 20);
              // }}
              // // onSubmit={FilteredList}
              placeHolder={'Search here'}
              style={styles.customSearch}
              showCrossPress={false}
              bgColor={colors.white}
              brColor={colors.gray2}
              brWidth={1}
              // srHeight={"100%"}
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
          {!followersList?.length > 0 ? (
            <Loader size={'large'} color={colors.orangeColor} />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <FlatList
                style={styles.list}
                data={followersList}
                contentContainerStyle={styles.flatListStyle}
                keyExtractor={({item, index}) => index}
                renderItem={({item, index}) => (
                  <FollowersListCard2
                    name={item?.user?.firstName}
                    img={item?.user?.url}
                    data={item?.user}
                    donation={item?.user?.donation}
                  />
                )}
              />
            </ScrollView>
          )}
        </View>
        <View>
          {filteredData.map((e, idx) => {
            <Text>{e.firstName}</Text>;
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default FollowersMembership;
