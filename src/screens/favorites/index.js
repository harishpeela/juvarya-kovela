/* eslint-disable react/jsx-no-duplicate-props */
import {View, Text, TouchableOpacity, FlatList, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {styles} from './style';
import {BackHeader, ImageLoader, Loader, SearchBar} from '../../components';
import {allTexts, colors} from '../../common';
import ApplicationContext from '../../utils/context-api/Context';
import {getFavoritesList, getFollowSearchList} from '../../utils/api';
import {useIsFocused} from '@react-navigation/native';

const Favorite = ({navigation}) => {
  const {favoriteList} = useContext(ApplicationContext);
  const [favoriteTemplesList, setfavoriteTemplesList] = useState(favoriteList);
  const [filterFavTemple, setfilterFavTemple] = useState(favoriteList);
  const [searchedText, setSearchedText] = useState('');
  const [loading, setloading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const getFollowedTempleList = async () => {
    try {
      let response = await getFavoritesList(0, 100);
      // console.log('responce of favourate list', response);
      if (response && response.status === 200) {
        const {
          data: {followingObjects},
        } = response;
        setloading(false);
        if (followingObjects.length > 0) {
          setfavoriteTemplesList(followingObjects);
          setfilterFavTemple(followingObjects);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  let isFocused = useIsFocused();
  useEffect(() => {
    setloading(true);
    getFollowedTempleList();
  }, [isFocused]);

  const performFilter = async () => {
    try {
      setSearchLoading(true);
      let result = await getFollowSearchList(searchedText);
      if (result && result.status === 200) {
        const {
          data: {followingObjects},
        } = result;
        setSearchLoading(false);
        // console.log('Searched List TEXT', followingObjects);
        setfavoriteTemplesList(followingObjects);
        setfilterFavTemple(followingObjects);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.wrapper}>
      <BackHeader
        onBackPress={() => {
          navigation.navigate(allTexts.tabNames.home);
        }}
        isOption
        txt={'Following'}
      />
      <View style={styles.fontTxtCont}>
        <Text style={styles.followingText}>
          {`${favoriteTemplesList?.length} Following `}
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchedText}
          onTextChange={e => {
            setSearchedText(e);
          }}
          loading={searchLoading}
          onCrossPress={() => {
            setSearchedText('');
            setloading(true);
            getFollowedTempleList();
          }}
          onSubmit={performFilter}
          bgColor={colors.green4}
          placeHolder={'Search'}
        />
      </View>
      <View style={styles.followCardContainer}>
        {loading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <Loader color={colors.green2} />
          </View>
        ) : filterFavTemple.length !== 0 ? (
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={filterFavTemple}
            showsHorizontalScrollIndicator={false}
            style={{}}
            contentContainerStyle={{
              paddingBottom: 200,
            }}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => (
              <FollowCard
                url={item?.jtItem?.profilePicture?.url}
                name={item?.jtItem?.name}
                isFollow={item?.jtItem?.following}
                onPress={() => {
                  navigation.navigate(allTexts.screenNames.homeDetails, {
                    id: item?.jtItem?.id,
                    title: item?.jtItem?.name,
                  });
                }}
              />
            )}
          />
        ) : (
          <View style={styles.notAvailable}>
            <Text style={styles.name}>{'No Temple Available'}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const FollowCard = ({name, url, isFollow, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.containerWrapper}>
      <View style={styles.imgContainer}>
        <ImageLoader
          resizeMode={'contain'}
          imageStyle={{
            height: undefined,
            width: undefined,
            flex: 1,
            borderRadius: 25,
          }}
          url={url}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
      </View>
      <TouchableOpacity>
        <View
          style={[
            styles.followBtnContainer,
            {
              backgroundColor: isFollow ? colors.blue : null,
              borderWidth: isFollow ? 0 : 1,
              paddingHorizontal: isFollow ? 15 : 8,
            },
          ]}>
          <Text
            style={[
              styles.followBtnText,
              {color: isFollow ? colors.white : colors.black},
            ]}>
            {!isFollow ? 'Following' : 'follow'}
          </Text>
        </View>
      </TouchableOpacity>
      {/* <View style={styles.optionContainer}>
        <SimpleLineIcons
          name="options-vertical"
          color={colors.black}
          size={20}
        />
      </View> */}
    </Pressable>
  );
};

export default Favorite;
