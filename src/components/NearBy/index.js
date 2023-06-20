/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconSearch from 'react-native-vector-icons/AntDesign';
import IconVoice from 'react-native-vector-icons/MaterialIcons';
import {Loader} from '../loader';
import {colors, allTexts} from '../../common';
import {
  PopularTemples,
  GetProfilePicture,
  FollowUnFollow,
} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
export const NearBy = () => {
  const [loading, setLoading] = useState(true);
  const [filteredArray, setfilteredArray] = useState([]);

  const [isLiked, setIsLiked] = useState(false);
  const PopularTemplesss = async () => {
    try {
      let result = await PopularTemples(0, 20);
      console.log('iuhkmnSzmn =>', result?.data);
      if (result) {
        const dty = result?.data?.data || [];
        setLoading(false);
        dty?.map(d => {
          profilePicture(d);
          // pop(d);
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const profilePicture = async d => {
    try {
      let result = await GetProfilePicture(d?.id);
      const obj = {...result?.data, ...d};
      setfilteredArray(hg => [...hg, obj]);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    PopularTemplesss();
  }, []);
  console.log('kength ===> ', filteredArray?.length);
  return (
    <View>
      <View style={styles.searchTab}>
        <IconSearch name="search1" size={25} style={styles.iconsearch} />
        <TextInput placeholder="Search Here" style={styles.searchTextInput} />
        <TouchableOpacity style={styles.touchable}>
          <IconVoice name="keyboard-voice" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.upComingTextTab}>
        <Text style={styles.popularTextContainer}>Popular Temple</Text>
        <Text style={{color: colors.orangeColor, fontSize: 18}}>See all</Text>
      </View>
      <View>
        <ScrollView>
          <View>
            {loading === true ? (
              <View style={styles.loaderContainer}>
                <Loader color={colors.orangeColor} />
              </View>
            ) : (
              [
                filteredArray?.length === 0 ? (
                  <View style={styles.loaderContainer}>
                    <Text style={styles.noAvailable}>
                      {'No Temples Available'}
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    data={filteredArray}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyExtractor={({item, index}) => item?.id}
                    renderItem={({item, index}) => (
                      <TempleListCard
                        post={item}
                        name={item.name}
                        templeId={item.id}
                        date={item.creationTime}
                      />
                    )}
                  />
                ),
              ]
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const TempleListCard = ({
  name,
  location,
  onPress,
  img,
  post,
  data,
  pageNav,
  templeId,
  likePress,
}) => {
  const {userDetails} = useContext(ApplicationContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollow, setisFollow] = useState();

  const followTemples = async d => {
    console.log(d, '===========?>>');
    const payload = {
      jtCustomer: userDetails?.id,
      type: 'ITEM',
      jtProfile: d,
      following: !isFollow,
    };
    console.log('fole', payload);
    try {
      let results = await FollowUnFollow(payload);
      console.log('result of follow un follow =========>', results?.data);
      if (results && results.status === 200) {
        setisFollow(!isFollow);
        setIsLiked(!isLiked);
        ToastAndroid.show(
          `Successfully you are${
            !isFollow ? ' following' : ' unFollowing'
          } temple!`,
          ToastAndroid.SHORT,
        );
      } else {
        if (results === undefined) {
          ToastAndroid.show(
            'you are not a valid user to follow this temple',
            ToastAndroid.SHORT,
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity
      style={{marginLeft: 20}}
      onPress={() => {
        pageNav?.navigate(allTexts.screenNames.homeDetails, {
          id: templeId,
          title: name,
        });
      }}>
      <ImageBackground
        source={{uri: post?.url}}
        style={{height: 200, width: 200, borderRadius: 60}}
        imageStyle={{borderRadius: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '80%',
          }}>
          <Text style={styles.textCard} numberOfLines={1}>
            {name.length < 10 ? `${name}` : `${name.substring(0, 10)}...`}
          </Text>
          <TouchableOpacity onPress={() => followTemples(templeId)}>
            <Icon
              name={isLiked ? 'heart' : 'heart-o'}
              size={20}
              color={isLiked ? colors.red1 : 'black'}
              style={{marginRight: 20}}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
