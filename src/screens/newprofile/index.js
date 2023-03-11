/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  StyleSheet,
  Pressable,
  Image,
  Text,
  Dimensions,
  View,
  ImageBackground,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../common';
import {textStyles, style} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useState, useEffect, useContext} from 'react';
import Snackbar from 'react-native-snackbar';
import ApplicationContext from '../../utils/context-api/Context';
import {
  followUnfollowTemple,
  getTempleDetails,
  getFeedList,
} from '../../utils/api';
import {allTexts} from '../../common';
const windowWidth = Dimensions.get('window').width;

const templeData = {
  name: 'Temple 123',
  rating: 4.8,
  followers: 181,
  city: 'Hudkeshwar',
  description:
    'Temple 123 is a wonderful temple situated in the heart of Nagpur. It was developed by...',
  images: [
    {
      uri: 'https://thumbs.dreamstime.com/b/indian-temple-3396438.jpg',
    },
    {
      uri: 'https://i.pinimg.com/736x/5b/a7/36/5ba736a47ea684c03ffc261c56d5da40.jpg',
    },
    {
      uri: 'https://i.pinimg.com/736x/70/10/c5/7010c580e3d009134fcddde0cc4afdd9.jpg',
    },
    {
      uri: 'https://w0.peakpx.com/wallpaper/133/250/HD-wallpaper-hindu-temple.jpg',
    },
  ],
};

const TempleProfile = ({route, navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loader, setloader] = useState(true);
  const [isFollow, setisFollow] = useState(false);
  const [followBtnDisable, setFollowBtnDisable] = useState(false);
  const [feedListData, setFeedListData] = useState([]);
  const [nameData, setNameData] = useState();
  const [details, setDetails] = useState({
    discription: '',
  });
  const {id, title, profileImg, data} = route.params || {};
  console.log('data', id, title, profileImg);
  const getData = async () => {
    try {
      let result = await getTempleDetails(data?.itemDetails?.id);
      // console.log('res', result?.data);
      let feedList = await getFeedList(0, 20, data?.itemDetails?.id);
      // console.log('feedlist', feedList?.data);
      if (result && result.status === 200 && feedList.status === 200) {
        setloader(false);
        const {
          data: {discription},
        } = result || {};
        setFeedListData(feedList?.data);
        setNameData(result.data);
        setisFollow(data?.itemDetails?.following);
        setDetails({
          discription: discription,
          image: data?.itemDetails?.profilePicture?.url,
          id: data?.itemDetails?.id,
        });
      } else {
        console.log('errors');
        // Snackbar.show({
        //   text: allTexts.constants.noInternet,
        //   duration: Snackbar.LENGTH_INDEFINITE,
        //   action: {
        //     text: 'Try again',
        //     textColor: 'green',
        //     onPress: () => {
        //       getData();
        //     },
        //   },
        // });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const followTemples = async () => {
    const payload = {
      itemId: data?.itemDetails?.id,
      itemType: 'ITEM',
      follow: !isFollow,
    };
    console.log('pay', payload);
    try {
      setFollowBtnDisable(true);
      let results = await followUnfollowTemple(payload);
      // console.log('results', results?.data);
      if (results && results.status === 200) {
        setisFollow(!isFollow);
        // console.log('results', results.json());
        if (results && results.status === 200) {
          setFollowBtnDisable(false);

          ToastAndroid.show(
            `Successfully you are${
              !isFollow ? ' following' : ' unFollowing'
            } temple!`,
            ToastAndroid.SHORT,
          );
        }
      } else {
        console.log('err');
        // Snackbar.show({
        //   text: allTexts.constants.noInternet,
        //   duration: Snackbar.LENGTH_INDEFINITE,
        //   action: {
        //     text: 'Try again',
        //     textColor: 'green',
        //     onPress: () => {
        //       followTemples();
        //     },
        //   },
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {userDetails} = useContext(ApplicationContext);
  console.log('role', userDetails);
  useEffect(() => {
    // getData();
  }, [route]);
  return (
    <ImageBackground
      source={{uri: templeData.images[currentIndex].uri}}
      style={styles.backgroundImage}>
      <View style={styles.container} />
      <View style={styles.container} />

      <View style={styles.container}>
        <View style={styles.imagePanel}>
          {templeData.images.map((image, index) => {
            return (
              <Pressable
                style={styles.imagePanel.item}
                onPress={() => setCurrentIndex(index)}>
                <Image
                  source={{uri: image.uri}}
                  style={{
                    width: 50,
                    height: 50,
                    borderColor:
                      index == currentIndex ? '#FFA001' : 'transparent',
                    borderWidth: 2,
                    borderRadius: 10,
                  }}
                />
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.footerBackground}>
        <View style={styles.sliderTooltip} />

        <View style={styles.footerContainer}>
          <View style={styles.footerHead}>
            <Text>
              <Text style={styles.boldText}>{title} &nbsp;&nbsp;</Text>
              <Text style={styles.ratingText}>
                <AntDesign name={'star'} color={'#FFA001'} size={14} />
                <Text> {templeData.rating}</Text>
              </Text>
            </Text>

            <TouchableOpacity
              style={styles.circularButton}
              onPress={() =>
                navigation.navigate(allTexts.screenNames.viewProfile, {
                  id: id,
                  title: title,
                  profileImg: profileImg,
                })
              }>
              <Text style={styles.circularButton.text}>View Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.subFooterHead}>
            <Text style={{fontWeight: '600'}}>
              {templeData.followers} &nbsp;
            </Text>
            <Text style={{color: '#FFA001', fontSize: 12}}>
              Followers &nbsp;
            </Text>
            <Text>
              <Feather name="map-pin" color={'#FFA001'} size={14} />

              <Text style={{color: 'grey'}}>&nbsp;{templeData.city}</Text>
            </Text>
          </View>

          <View style={styles.footerBody}>
            <Text>
              {data?.description} &nbsp;&nbsp;
              {/* <Text style={{color: '#FFA001'}}>Read more</Text> */}
            </Text>
          </View>

          <View style={styles.footerAction}>
            {/* <Pressable style={styles.button} onPress={() => followTemples()}>
              <Text style={styles.button.text}>
                {isFollow ? 'follow     ' : 'following'}
              </Text>
            </Pressable> */}
            {/* {followingData()} */}

            <PrimaryButton1
              bgColor={'#FFA001'}
              disabled={followBtnDisable}
              radius={10}
              padding={7}
              onPress={followTemples}
              text={
                isFollow
                  ? allTexts.buttonTexts.unFollow
                  : allTexts.buttonTexts.follow
              }
            />

            <Pressable style={styles.voidButton}>
              <Text style={styles.voidButton.text}>Contact</Text>
            </Pressable>

            <Pressable style={styles.voidButton}>
              <Text style={styles.voidButton.text}>Directions</Text>
            </Pressable>
            {userDetails.role === 'ROLE_AGENT' && (
              <TouchableOpacity onPress={() => alert('under development')}>
                <AntDesign name="pluscircleo" size={30} color={'#FFA001'} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.controlPanel}>
            <Pressable style={styles.controlPanel.item}>
              <Feather name="grid" color={'#585858'} size={24} />
              <Text style={styles.controlPanel.item.text}>Posts</Text>
            </Pressable>

            <Pressable style={styles.controlPanel.item}>
              <MaterialCommunityIcons
                name="movie-open-outline"
                color={'#585858'}
                size={24}
              />
              <Text style={styles.controlPanel.item.text}>Reels</Text>
            </Pressable>

            <Pressable style={styles.controlPanel.item}>
              <Entypo name="shop" color={'#585858'} size={24} />
              <Text style={styles.controlPanel.item.text}>Services</Text>
            </Pressable>

            <Pressable style={styles.controlPanel.item}>
              <MaterialCommunityIcons
                name="movie-open-outline"
                color={'#585858'}
                size={24}
              />
              <Text style={styles.controlPanel.item.text}>Events</Text>
            </Pressable>

            <Pressable style={styles.controlPanel.item}>
              <MaterialCommunityIcons
                name="movie-open-outline"
                color={'#585858'}
                size={24}
              />
              <Text style={styles.controlPanel.item.text}>Donate</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
  },
  imagePanel: {
    backgroundColor: 'rgba(88, 88, 88, 0.8)',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    item: {
      marginHorizontal: 4,
    },
  },
  boldText: {
    fontSize: 16,
    fontWeight: '600',
  },
  ratingText: {
    fontSize: 14,
  },
  footerBackground: {
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  footerContainer: {
    padding: 30,
  },
  sliderTooltip: {
    borderColor: '#FFA001',
    borderWidth: 8 * StyleSheet.hairlineWidth,
    borderRadius: 10 * StyleSheet.hairlineWidth,
    marginHorizontal: 0.43 * windowWidth,
    marginVertical: 17,
  },
  circularButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#FFA001',
    text: {
      fontSize: 13,
      fontWeight: '400',
      color: 'white',
    },
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#FFA001',
    marginRight: 7,
    text: {
      fontSize: 13,
      fontWeight: '600',
      color: 'white',
    },
  },
  voidButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderColor: '#585858',
    borderWidth: 1,
    marginRight: 7,
    text: {
      fontSize: 13,
      fontWeight: '600',
      color: '#000',
    },
  },
  footerHead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerBody: {
    paddingTop: 20,
  },
  subFooterHead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  footerAction: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 20,
  },
  controlPanel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    borderBottomColor: '#585858',
    borderBottomWidth: 0.5,
    item: {
      alignItems: 'center',
      text: {
        paddingVertical: 5,
        color: '#585858',
      },
    },
  },
});
export default TempleProfile;

const PrimaryButton1 = ({
  bgColor,
  textColor,
  radius,
  text,
  onPress,
  loading,
  padding,
  fontsize,
  width,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style(bgColor, radius, padding, width).wrapper}
      {...props}>
      <Text style={textStyles(textColor, fontsize).textTitle}>
        {loading == true ? (
          <ActivityIndicator size={'small'} color={colors.white} />
        ) : (
          text
        )}
      </Text>
    </TouchableOpacity>
  );
};
