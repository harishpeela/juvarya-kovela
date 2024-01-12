/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { CrewCard } from '../../components';
import ApplicationContext from '../../utils/context-api/Context';
import { getAuthTokenDetails } from '../../utils/preferences/localStorage';
import {
  BackHeaderNew,
  FollowersListCard2,
  SearchBar,
  Sort,
} from '../../components';
import { MembersList } from '../../utils/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TempleFollowersList } from '../../utils/api';
import { Loader } from '../../components';
import { colors } from '../../common';
import { styles } from './styles';
import { Ellipsis } from '../../components';
import { TopBarcard } from '../../components';
import { NewTempleCrew } from '../../utils/api';
const TempleCrew = ({ route, navigation }) => {

  const [followersList, setFollowersList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [filteredData, setFilteredData] = useState(followersList);
  const { id } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const templeCrewDetails = async () => {
    console.log('id in temple crew', id);
    setLoader(true);
    try {
      let result = await NewTempleCrew(id, 0, 20);
      console.log('result.date in temple crew', result?.data);
      if (result) {
        setData(result?.data?.customerRoles);
        setLoader(false);
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
  console.log('crew data====>', data);
  return (
    <View>
      <View style={{ minHeight: 120, marginTop: '3%' }}>
        <TopBarcard
          txt={'Temple crew'}
          isBell={true}
          back={true}
          navigation={navigation}
          navBack={navigation}>
          <View style={{ ...styles.searchbarContainer, marginTop: '-5%' }}>
          </View>
        </TopBarcard>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.followersContainer}>
          {loader ? (
            <Loader size={'small'} color={colors.orangeColor} />
          ) : (
            data?.length ? (
              <FlatList
                style={styles.list}
                data={data}
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
