/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackHeader, Loader, SearchBar} from '../../components';
import {styles} from './styles';
import {allTexts, colors} from '../../common';
import {getTempleList} from '../../utils/api';
import {useIsFocused} from '@react-navigation/native';

const MyTamples = ({navigation, route}) => {
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
      let response = await getTempleList(1, 100);
      // console.log('get temp list', response);
      const {
        status,
        data: {items},
      } = response || {};
      if (response && status === 200) {
        // console.log('My Temples 786', items?.length);
        setTempleList(items);
        setfilteredArray(items);
        // console.log('list of visible arrays', items);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTemples();
  }, [isFocused]);
  const performFilter = value => {
    setfilteredArray(
      templeList.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };
  // console.log('filter', filteredArray);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <BackHeader
          onBackPress={() => {
            navigation.goBack();
          }}
          txt={'My Temples'}
          plusButton
          onPlusPress={() => {
            navigation.navigate(addTample);
          }}
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
            <Loader color={colors.green2} />
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
                        onPress={() => {
                          navigation.navigate(
                            allTexts.screenNames.templeProfile,
                            {
                              id: item.id,
                              title: item.name,
                              profileImg: item?.profilePicture?.url,
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

const TempleListCard = ({name, location, date, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItemContainer}>
      <View style={styles.secondaryContainer}>
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
        <View style={styles.dateContainer}>
          <Text style={styles.itemDate}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyTamples;
