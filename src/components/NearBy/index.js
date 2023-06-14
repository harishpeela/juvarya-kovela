/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconSearch from 'react-native-vector-icons/AntDesign';
import IconVoice from 'react-native-vector-icons/MaterialIcons';
import IconHeart from 'react-native-vector-icons/FontAwesome';
import IconDots from 'react-native-vector-icons/Entypo';
import {Loader} from '../loader';
import {getPopularTemples, upcomingOccasions} from '../../utils/api';
import {colors, fontFamily} from '../../common';
export const NearBy = ({data, myData}) => {
  const [templeList, setTempleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredArray, setfilteredArray] = useState([]);

  const PopularTemples = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XG4gIFwiaWRcIiA6IDEsXG4gIFwidXNlcm5hbWVcIiA6IFwidmFtc2lhZG1pbjEyNFwiLFxuICBcImVtYWlsXCIgOiBcInZhbXNpYWRtaW4xMjRAanV2YXJ5YS5jb21cIixcbiAgXCJwYXNzd29yZFwiIDogbnVsbCxcbiAgXCJmaXJzdE5hbWVcIiA6IG51bGwsXG4gIFwibGFzdE5hbWVcIiA6IG51bGwsXG4gIFwicm9sZXNcIiA6IFsgXCJST0xFX0FETUlOXCIgXSxcbiAgXCJwcm9maWxlVG9DdXN0b21lcklkXCIgOiBudWxsXG59Iiwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJpYXQiOjE2ODY3MTY3NzAsImV4cCI6MTY4NjgwMzE3MH0.zVbOOqHEiWvqExBkAS_EBq_Ru5tj1k_H7a7Lpkyd9wgF0ZNpcJ12f1yfTrhoN9bDTWgXWabLgr_IhhnlJTVChA',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://fanfundev.eastasia.cloudapp.azure.com:9096/jtprofile/popular?page=0&pageSize=20',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result) {
          setLoading(false);
          setfilteredArray(result?.data);
          console.log('jhasxjbasx', result?.data);
        }
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    PopularTemples();
  }, []);

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
                filteredArray.length === 0 ? (
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
                        // img={{
                        //   uri: item?.profilePicture?.url,
                        // }}
                        post={item}
                        name={item.name}
                        // location={item.line1}
                        date={item.creationTime}
                        data={Data1}
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

const TempleListCard = ({name, location, onPress, img, post, data}) => {
  const renderImage = post => {
    if (post?.profilePicture) {
      return (
        <View style={{}}>
          <Image
            source={{uri: post?.profilePicture?.url}}
            style={styles.imageContainer}
          />
        </View>
      );
    } else {
      return (
        <Image
          source={require('../../../assets/images/islamabad.jpg')}
          style={styles.imageContainer}
        />
      );
    }
  };
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View style={{marginLeft: 20}}>
      {/* {renderImage(post)} */}
      <ImageBackground
        source={require('../../../assets/images/tempimg1.jpg')}
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
          <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
            <Icon
              name={isLiked ? 'heart' : 'heart-o'}
              size={20}
              color={isLiked ? colors.red1 : 'black'}
              style={{marginRight: 20}}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export const Data1 = [
  {
    key: 1,
    day: 'Today',
    name: 'nookambica Temple',
    location: 'Anakapalli',
    fromTime: '6:00',
    toTime: '7:30',
    image1: require('../../../assets/images/tempimg1.jpg'),
    image2: require('../../../assets/images/tempimg2.jpg'),
    image3: require('../../../assets/images/tempimg3.webp'),
    image4: require('../../../assets/images/tempimg4.jpg'),
  },
  {
    key: 2,
    day: 'Tommarow',
    name: 'kanaka Durga Temple',
    location: 'vijayawada',
    fromTime: '6:00',
    toTime: '7:30',
    image1: require('../../../assets/images/tempimg2.jpg'),
    image2: require('../../../assets/images/tempimg1.jpg'),
    image3: require('../../../assets/images/tempimg3.webp'),
    image4: require('../../../assets/images/tempimg4.jpg'),
  },
  {
    key: 3,
    day: 'Today',
    name: 'Santhoshimata Temple',
    location: 'malkapuram',
    fromTime: '6:00',
    toTime: '7:30',
    image1: require('../../../assets/images/tempimg4.jpg'),
    image2: require('../../../assets/images/tempimg2.jpg'),
    image3: require('../../../assets/images/tempimg3.webp'),
    image4: require('../../../assets/images/tempimg1.jpg'),
  },
  {
    key: 4,
    day: 'Tommarow',
    name: 'mahakali Temple',
    location: 'gavarapallem',
    fromTime: '6:00',
    toTime: '7:30',
    image1: require('../../../assets/images/tempimg2.jpg'),
    image2: require('../../../assets/images/tempimg4.jpg'),
    image3: require('../../../assets/images/tempimg3.webp'),
    image4: require('../../../assets/images/tempimg1.jpg'),
  },
];
export const NearByMainTab = ({ProductsData}) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <View>
      <FlatList
        data={ProductsData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={({item, index}) => index}
        renderItem={({item, index}) => (
          <ImageBackground
            source={item.img}
            imageStyle={{borderRadius: 30}}
            style={styles.mainTabBgImg}>
            <View style={styles.mainTabCardView}>
              <Text style={styles.mainTabNameText}> {item.tempName}</Text>
              <Text style={styles.mainTabDistText}>{item.distance} </Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsLiked(!isLiked)}
              style={styles.mainTabHeartIcon}>
              <IconHeart
                name={isLiked ? 'heart' : 'heart-o'}
                color={isLiked ? 'red' : 'black'}
                size={20}
              />
            </TouchableOpacity>
          </ImageBackground>
        )}
      />
    </View>
  );
};

export const UpComingEvents = ({}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventsArray, setEventsArry] = useState();

  const UpcomingEvents = async () => {
    try {
      let currentDate = new Date();

      let year = new Date(currentDate).getFullYear();
      let month = new Date(currentDate).getMonth() + 1;
      let day = new Date(currentDate).getDay();
      let date = `${year}-${month}-${day}`;

      // let response = await upcomingOccasions(0, 1000);
      // console.log('occgvdfnv', response?.data);
      // console.log('occasions', response?.data?.occasion[9].mediaList);
      const {
        status,
        data: {occasion},
      } = response || {};
      // console.log('occ1', occasion);

      if (response && status === 200) {
        // console.log('occ', occasion);
        setEvents(occasion);
        setEventsArry(occasion);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log('events', eventsArray);

  useEffect(() => {
    // UpcomingEvents();
  }, []);

  return (
    <View>
      <View style={styles.upComingTextTab}>
        <Text style={styles.popularTextContainer}>Upcoming Events</Text>
        <TouchableOpacity>
          <Text style={{fontSize: 18, color: colors.orangeColor}}>See all</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={eventsArray}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyExtractor={({item, index}) => item?.index}
          renderItem={({item, index}) => (
            <View>
              <View>
                <View style={styles.currentPlanView}>
                  <Text style={styles.currentPlanText}>Today</Text>
                </View>
                <View style={styles.planCardView}>
                  <View style={styles.upComingCardTextView}>
                    <Text style={styles.upComingCardTextName} numberOfLines={1}>
                      {item.name.length < 10
                        ? `${item.name}`
                        : `${item.name.substring(0, 10)}...`}
                    </Text>
                    <TouchableOpacity style={styles.followContainer}>
                      <IconDots
                        name="dots-three-vertical"
                        size={25}
                        color={'gray'}
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text
                      style={{
                        textTransform: 'capitalize',
                        fontSize: 18,
                        color: 'black',
                      }}>
                      {item.description}{' '}
                    </Text>
                    {/* <Text
                      style={{
                        fontSize: 16,
                        color: '#DD1E0C',
                        fontFamily: fontFamily.raleway,
                      }}>
                      {moment(item.fromDate).format('hh:mm')} AM to{' '}
                      {moment(item.toDate).format('hh:mm')} PM
                    </Text> */}
                    <EventListCard data={item?.mediaList} />
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const EventListCard = ({data}) => {
  return (
    <View>
      <FlatList
        data={data}
        // horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={({item, index}) => item?.key}
        renderItem={({item, index}) => (
          <View>
            <Image source={item?.image1} style={styles.eventImage} />
            <Image source={item?.image2} style={styles.eventImage} />
            {/* <Image source={item?.image3} style={styles.eventImage} />
            <Image source={item?.image4} style={styles.eventImage} /> */}
          </View>
        )}
      />
    </View>
  );
};

export const NearByProducts = ({productsData, onPress}) => {
  return (
    <View>
      <View
        style={{
          margin: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 24, color: 'black', fontWeight: '700'}}>
          NearBy Products{' '}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{fontSize: 18, color: 'black'}}>see all </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginRight: 10, width: '100%'}}>
        <FlatList
          data={productsData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={({item, index}) => index}
          renderItem={({item, index}) => (
            <View>
              <View style={styles.planCardView1}>
                {/* <Text> {item.name}</Text> */}
              </View>
              <View style={{marginLeft: '10%', marginTop: 10}}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 16,
                    color: 'black',
                  }}>
                  inSence Sticks
                </Text>
                <Text style={{color: 'orange', fontSize: 16}}>$ {'250'} </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export const NearByServices = ({servicesData, onPress}) => {
  return (
    <View>
      <View
        style={{
          margin: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 24, color: 'black', fontWeight: '700'}}>
          NearBy Services{' '}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{fontSize: 18, color: 'black'}}>see all </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginRight: 10, width: '100%'}}>
        <FlatList
          data={servicesData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={({item, index}) => index}
          renderItem={({item, index}) => (
            <View>
              <View style={styles.planCardView1}>
                {/* <Text> {item.name}</Text> */}
              </View>
              <View style={{marginLeft: '10%', marginTop: 10}}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 16,
                    color: 'black',
                  }}>
                  Services
                </Text>
                <Text style={{color: 'orange', fontSize: 16}}>$ {'250'} </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
