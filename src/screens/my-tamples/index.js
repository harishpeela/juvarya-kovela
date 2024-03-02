import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Loader, SearchBar} from '../../components';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import {getTempledetailsWithId, AdminTemples} from '../../utils/api';
import {FavTempleListCard} from '../../components';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
// import CreateCommunityTempleScreen from './CreateCommunityTempleScreen'; // Assuming you have a screen for creating community temples

const MyTemples = ({navigation}) => {
  const [templeList, setTempleList] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedText, setSearchedText] = useState('');

  const TempleDetails = async d => {
    try {
      let result = await getTempledetailsWithId(d?.id);
      console.log('result?.res', result?.data)
      if (result) {
        let templesArray = {...d, ...result?.data};
        console?.log('res ====><', templesArray);
        setTempleList(array => [...array, templesArray]);
        setFilteredArray(array => [...array, templesArray]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('error in templedetails api is ==>', error);
    }
  };

  const AdminTempleDetails = async () => {
    setLoading(true);
    try {
      let result = await AdminTemples();
      console.log('admin', result?.data)
      let adminData = result?.data;
      adminData.map(e => {
        TempleDetails(e);
      });
    } catch (error) {
      setLoading(false);
      console.log('error in admin temples', error);
    }
  };
  useEffect(() => {
    AdminTempleDetails();
  }, []);

  const onSelect = data => {};
  const performFilter = value => {
    setFilteredArray(
      templeList.filter(item =>
        item?.name?.toLowerCase().includes(value?.toLowerCase()),
      ),
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{minHeight: 120, marginTop: '3%'}}>
        <TopBarCard2
          isPlus={true}
          txt={'Communities'}
          marginLeft={'15%'}
          back={true}
          navigation={navigation}
        />
      </View>

      <View style={styles.cardContainer}>
        {loading === true ? (
          <View style={styles.loaderContainer}>
            <Loader color={colors.orangeColor} />
          </View>
        ) : (
          [
            filteredArray?.length ? (
              <FlatList
                data={filteredArray}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListStyle}
                keyboardShouldPersistTaps="handled"
                keyExtractor={(item, index) => item?.id}
                renderItem={({item, index}) => {
                  if (item?.name) {
                    return (
                      <FavTempleListCard
                        name={item.name}
                        location={item.line1}
                        date={item.creationTime}
                        img={item?.logo}
                        onPress={() => {
                          navigation.navigate(
                            allTexts.screenNames.viewtempleprofile,
                            {
                              data: item,
                              onSelect: onSelect,
                            },
                          );
                        }}
                      />
                    );
                  }
                }}
              />
            ) : (
              <View style={styles.loaderContainer}>
                <FontAwesome5 name="gopuram" size={50} color={'orange'} />
                <Text
                  style={styles.noAvailable}
                  onPress={() =>
                    navigation.navigate(allTexts.screenNames.communityTemple)
                  }>
                  {'Create Your Community Temple'}
                </Text>
              </View>
            ),
          ]
        )}
        {searchedText && !filteredArray?.length ? (
          <Text
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              fontSize: 16,
              color: colors.orangeColor,
              marginTop: '3%',
            }}>
            No Temples To Display
          </Text>
        ) : (
          ''
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyTemples;
