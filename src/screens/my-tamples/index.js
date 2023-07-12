/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, SafeAreaView, FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackHeader, Loader, SearchBar, BackgroundImage} from '../../components';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import {
  getTempledetailsWithId,
  GetProfilePicture,
  AdminTemples,
} from '../../utils/api';
import {useIsFocused} from '@react-navigation/native';
import {FavTempleListCard} from '../../components';

const MyTamples = ({navigation}) => {
  const [templeList, setTempleList] = useState([]);
  const [filteredArray, setfilteredArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seracherdText, setSeracherdText] = useState('');

  let isFocused = useIsFocused();
  const TempleDetails = async d => {
    try {
      let result = await getTempledetailsWithId(d?.id);
      let responce = await GetProfilePicture(d?.id);
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
  const AdminTempleDetails = async () => {
    try {
      let result = await AdminTemples();
      console.log('res of admin', result?.data);
      let adminData = result?.data;
      adminData.map(e => {
        TempleDetails(e);
      });
    } catch (error) {
      console.log('error in admin temples', error);
    }
  };
  useEffect(() => {
    AdminTempleDetails();
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
          txt={'My Temples'}
        />
      </View>
      <View style={styles.searchbarContainer}>
        <View style={{width: '100%'}}>
          <SearchBar
            value={seracherdText}
            onCrossPress={() => {
              setSeracherdText('');
              getTemples();
            }}
            onTextChange={e => {
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

export default MyTamples;
