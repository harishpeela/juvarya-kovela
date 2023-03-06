/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import {styles} from './styles';
import IconSearch from 'react-native-vector-icons/AntDesign';
import IconVoice from 'react-native-vector-icons/MaterialIcons';
import IconHeart from 'react-native-vector-icons/FontAwesome';
import IconDots from 'react-native-vector-icons/Entypo';
export const NearBy = ({data, myData}) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <View style={styles.searchTab}>
      <IconSearch name="search1" size={25} style={{marginHorizontal: 10}} />
      <TextInput placeholder="SearchHere" style={styles.searchTextInput} />
      <TouchableOpacity style={{marginLeft: '90%', position: 'absolute'}}>
        <IconVoice name="keyboard-voice" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export const data = [
  {
    key: 1,
    tempName: 'Temple1',
    img: require('../../../assets/images/tempimg4.jpg'),
    distance: '1.02km',
  },
  {
    key: 2,
    tempName: 'Temple2',
    img: require('../../../assets/images/tempimg3.webp'),
    distance: '1.02km',
  },
  {
    key: 3,
    tempName: 'Temple3',
    img: require('../../../assets/images/tempimg2.jpg'),
    distance: '1.02km',
  },
  {
    key: 4,
    tempName: 'Temple4',
    img: require('../../../assets/images/tempimg1.jpg'),
    distance: '1.02km',
  },
];

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
export const UpComingEvents = ({upcomingData}) => {
  return (
    <View>
      <View style={styles.upComingTextTab}>
        <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black'}}>
          Upcoming Events
        </Text>
        <TouchableOpacity>
          <Text style={{fontSize: 18}}>see all</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={upcomingData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={({item, index}) => index}
          renderItem={({item, index}) => (
            <View>
              <View>
                <View style={styles.currentPlanView}>
                  <Text style={styles.currentPlanText}>{item.day}</Text>
                </View>
                <View style={styles.planCardView}>
                  <View style={styles.upComingCardTextView}>
                    <Text style={styles.upComingCardTextName}>{item.name}</Text>
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
                      {item.location}{' '}
                    </Text>
                    <Text style={{fontSize: 16, color: 'black'}}>
                      {item.fromTime} Pm to {item.toTime} Am
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 20,
                    }}>
                    <Image
                      source={item.image1}
                      style={{height: 50, width: 50, borderRadius: 20}}
                    />
                    <Image
                      source={item.image2}
                      style={{height: 50, width: 50, borderRadius: 20}}
                    />
                    <Image
                      source={item.image3}
                      style={{height: 50, width: 50, borderRadius: 20}}
                    />
                    <Image
                      source={item.image4}
                      style={{height: 50, width: 50, borderRadius: 20}}
                    />
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
