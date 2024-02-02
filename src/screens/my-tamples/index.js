/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, SafeAreaView, FlatList, Text, searchedText} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackHeader, Loader, SearchBar, BackgroundImage} from '../../components';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import {getTempledetailsWithId, AdminTemples} from '../../utils/api';
import {FavTempleListCard} from '../../components';
import {TopBarcard} from '../../components';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const MyTamples = ({navigation}) => {
  const [templeList, setTempleList] = useState([]);
  const [filteredArray, setfilteredArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seracherdText, setSeracherdText] = useState('');

  const TempleDetails = async d => {
    setLoading(true);
    try {
      let result = await getTempledetailsWithId(d?.id);
      if (result) {
        let templesArray = {...d, ...result?.data};
        console?.log('res', templesArray);
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
      let adminData = result?.data;
      adminData.map(e => {
        TempleDetails(e);
      });
    } catch (error) {
      console.log('error in admin temples', error);
    }
  };
  const onSelect = data => {
    // setIsLiked(data?.selected);
  };
  useEffect(() => {
    AdminTempleDetails();
  }, []);
  const performFilter = value => {
    setfilteredArray(
      templeList.filter(item =>
        item?.name?.toLowerCase().includes(value?.toLowerCase()),
      ),
    );
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      {/* <View style={styles.headerContainer}>
        <BackHeader
          onBackPress={() => {
            navigation.goBack();
          }}
          txt={'My Temples'}
        />
      </View> */}
      <View style={{minHeight: 160, marginTop: '3%'}}>
        <TopBarCard2 txt={'My Temples'} back={true} navigation={navigation}>
          <View style={{...styles.searchContainer, marginTop: '-5%'}}>
            <SearchBar
              value={searchedText}
              onTextChange={e => {
                setSeracherdText(e);
                SearchPopTemp(e);
              }}
              loading={false}
              onCrossPress={async () => {
                setSearchedText('');
                await PopularTemplesss(pageNo, 20);
              }}
              bgColor={colors.gray4}
              placeHolder={'Search'}
            />
          </View>
        </TopBarCard2>
      </View>
      <View style={styles.searchbarContainer}>
        <View style={{width: '100%'}}>
          {/* <SearchBar
            value={seracherdText}
            onCrossPress={() => {
              setSeracherdText('');
              filteredArray.length ? getTemples() : '';
            }}
            onTextChange={e => {
              setSeracherdText(e);
              performFilter(e);
            }}
          /> */}
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
                <FontAwesome5
                  name="gopuram"
                  size={50}
                  color={'orange'}
                 
                />
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
            ),
          ]
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyTamples;
