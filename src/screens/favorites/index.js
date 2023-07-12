/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {BackHeader, Loader, SearchBar, BackgroundImage} from '../../components';
import {allTexts, colors} from '../../common';
import {styles} from './style';
import {
  GetMyTemples,
  getTempledetailsWithId,
  GetProfilePicture,
} from '../../utils/api';
import {useIsFocused} from '@react-navigation/native';
import ApplicationContext from '../../utils/context-api/Context';
import { FavTempleListCard } from '../../components';
const Favorite = ({navigation}) => {
  const {userDetails} = useContext(ApplicationContext);
  const [templeList, setTempleList] = useState([]);
  const [filteredArray, setfilteredArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seracherdText, setSeracherdText] = useState('');

  let isFocused = useIsFocused();
  const getTemples = async () => {
    try {
      let response = await GetMyTemples(userDetails?.id);
      let data = response?.data?.data;
      data?.map(a => {
        TempleDetails(a);
      });
    } catch (error) {
      console.log('error in mytemplesapi', error);
    }
  };
  const TempleDetails = async d => {
    try {
      let result = await getTempledetailsWithId(d?.jtProfile);
      let responce = await GetProfilePicture(d?.jtProfile);
      if (result) {
        let templesArray = {...d, ...result?.data, ...responce?.data};
        setLoading(false);
        setTempleList(array => [...array, templesArray]);
        setfilteredArray(array => [...array, templesArray]);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('error in templedetails api is ==>', error);
    }
  };
  useEffect(() => {
    getTemples();
  }, [isFocused]);
  const performFilter = value => {
    setfilteredArray(
      templeList.filter(item =>
        item?.name?.toLowerCase().includes(value?.toLowerCase()),
      ),
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <BackgroundImage />
      <View style={styles.headerContainer}>
        <BackHeader
          onBackPress={() => {
            navigation.goBack();
          }}
          txt={'Following'}
        />
      </View>
      <Text style={{marginLeft: '5%', color: 'black', fontWeight: 'bold'}}>
        {filteredArray?.length} Following{' '}
      </Text>
      <View style={styles.searchbarContainer}>
        <View style={{width: '100%'}}>
          <SearchBar
            value={seracherdText}
            onCrossPress={() => {
              setSeracherdText('');
              getTemples();
            }}
            onTextChange={e => {
              // console.log(e);
              setSeracherdText(e);
              performFilter(e);
            }}
          />
        </View>
      </View>

      <View style={styles.cardContainer}>
        {loading === true ? (
          <View style={styles.loaderContainer}>
            <Loader color={colors.orangeColor} />
          </View>
        ) : (
          [
            filteredArray.length === 0 ? (
              <View style={styles.loaderContainer}>
                <Text style={styles.noAvailable}>{'No Temples Available'}</Text>
              </View>
            ) : (
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
                        img={item?.url}
                        onPress={() => {
                          navigation.navigate(
                            allTexts.screenNames.viewProfile,
                            {
                              data: item,
                            },
                          );
                        }}
                      />
                    );
                  }
                }}
              />
            ),
          ]
        )}
      </View>
    </SafeAreaView>
  );
};

export default Favorite;
