/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
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
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import {
  GetMyTemples,
  getTempledetailsWithId,
  GetProfilePicture,
} from '../../utils/api';
import {useIsFocused} from '@react-navigation/native';
import ApplicationContext from '../../utils/context-api/Context';

const MyTamples = ({navigation, route}) => {
  const {userDetails} = useContext(ApplicationContext);
  // console.log('userdetails', userDetails);
  const {
    screenNames: {addTample, addtemplenew},
  } = allTexts;
  const [templeList, setTempleList] = useState([]);
  const [filteredArray, setfilteredArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seracherdText, setSeracherdText] = useState('');

  let isFocused = useIsFocused();
  const getTemples = async () => {
    try {
      let response = await GetMyTemples(userDetails?.id);
      // console.log('get temp list', response?.data);
      let data = response?.data?.data;
      data?.map(a => {
        TempleDetails(a);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const TempleDetails = async d => {
    try {
      let result = await getTempledetailsWithId(d?.jtProfile);
      let responce = await GetProfilePicture(d?.jtProfile);
      // console.log('res', responce?.data);
      // console.log(result?.data, '------>');
      if (result) {
        let templesArray = {...d, ...result?.data, ...responce?.data};
        console.log('templesArray', templesArray);
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
    // console.log(value, '==>');
    setfilteredArray(
      templeList.filter(item =>
        item?.name?.toLowerCase().includes(value?.toLowerCase()),
      ),
    );
  };
  // console.log('filter', filteredArray);

  return (
    <SafeAreaView style={styles.wrapper}>
      <BackgroundImage />
      <View style={styles.headerContainer}>
        <BackHeader
          onBackPress={() => {
            navigation.goBack();
          }}
          txt={'My Temples'}
          // plusButton
          // onPlusPress={() => {
          //   navigation.navigate(addTample);
          // }}
        />
      </View>
      <View style={styles.searchbarContainer}>
        <View style={{width: '100%'}}>
          <SearchBar
            value={seracherdText}
            onCrossPress={() => {
              // console.log('1');
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
                      <TempleListCard
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

const TempleListCard = ({name, location, date, onPress, img}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItemContainer}>
      <View style={styles.secondaryContainer}>
        <View>
          <Image
            source={{uri: img}}
            style={{height: 70, width: 70, borderRadius: 70 / 2}}
          />
        </View>

        <View style={styles.listFirstItem}>
          <View style={styles.bulletConatianer}>
            <View style={styles.bullet} />
          </View>
          <View>
            <Text style={styles.itemHeading}>{name}</Text>
            <Text numberOfLines={1} style={styles.itemAdmin}>
              Admin
            </Text>
            <Text style={styles.itemLocation}>{`location-${location}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyTamples;
