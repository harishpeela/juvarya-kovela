/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  Image,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import React, {useState, useEffect, useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ApplicationContext from '../../utils/context-api/Context';

const templeData = {
  name: 'Temple 123',
  rating: 4.8,
  followers: '2.2m',
  city: 'Hudkeshwar',
  description:
    'Temple 123 is a wonderful temple situated in the heart of Nagpur. It was developed by...',
  posts: 100,
  products: 25,
  points: [
    'Temple 123 is a wonderful temple',
    'It is situated in the heart of Nagpur.',
    'It was developed under the guidance of Adishakti',
    'Visit us and feel the cosmic energy.',
  ],
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
  petalImage: 'https://www.linkpicture.com/q/hello.png',
};

const ViewProfile = ({route, navigation}) => {
  const {userDetails} = useContext(ApplicationContext);
  const {id, title, profileImg} = route.params || {};
  const [isFollow, setisFollow] = useState('');
  const [currentIndex, setCurrentIndex] = useState(1);
  //   // console.log('id', id, title, profileImg);
  const follow = () => {
    if (id.itemDetails?.following) {
      setisFollow('unFollow');
    } else {
      setisFollow('Follow');
    }
  };
  useEffect(() => {
    follow();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.footerBackground}>
        <ImageBackground
          source={{uri: templeData.petalImage}}
          style={{height: 400}}>
          <View style={styles.footerContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
              </TouchableOpacity>
              <Text
                style={{fontSize: 24, fontWeight: '500', marginHorizontal: 10}}>
                Profile
              </Text>
            </View>

            <View style={styles.infoContainer}>
              <Image
                source={{uri: profileImg}}
                style={{
                  width: 80,
                  height: 80,
                  borderColor: '#FFA001',
                  borderWidth: 2,
                  borderRadius: 40,
                }}
              />

              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: '600', fontSize: 16}}>
                  {templeData.posts}
                </Text>
                <Text style={{fontSize: 12, color: '#585858', lineHeight: 18}}>
                  Posts
                </Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: '600', fontSize: 16}}>
                  {templeData.followers}
                </Text>
                <Text style={{fontSize: 12, color: '#585858', lineHeight: 18}}>
                  Followers
                </Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: '600', fontSize: 16}}>
                  {templeData.products}
                </Text>
                <Text style={{fontSize: 12, color: '#585858', lineHeight: 18}}>
                  Products
                </Text>
              </View>
            </View>

            <View style={styles.footerHead}>
              <Text>
                <Text style={styles.boldText}>{title} &nbsp;&nbsp;</Text>
                <Text style={styles.ratingText}>
                  <AntDesign name={'star'} color={'#FFA001'} size={20} />{' '}
                  {templeData.rating}
                </Text>
              </Text>
            </View>

            <View style={styles.subFooterHead}>
              <Text style={{color: 'grey', color: '#FFA001', fontSize: 18}}>
                {templeData.city}
              </Text>
            </View>

            <View style={styles.footerBody}>
              {templeData.points.map((item, index) => {
                return (
                  <Text key={index} style={{fontSize: 14, lineHeight: 18}}>
                    • {item}
                  </Text>
                );
              })}
            </View>

            <View style={styles.footerAction}>
              <Pressable style={styles.button}>
                <Text style={styles.button.text}>Follow</Text>
              </Pressable>

              <Pressable style={styles.voidButton}>
                <Text style={styles.voidButton.text}>Message</Text>
              </Pressable>

              <Pressable style={styles.voidButton}>
                <Text style={styles.voidButton.text}>Directions</Text>
              </Pressable>
              {userDetails.role === 'ROLE_ADMIN' && (
                <TouchableOpacity onPress={() => alert('under development')}>
                  <AntDesign name="pluscircleo" size={30} color={'#FFA001'} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.controlPanel}>
              <Pressable
                style={styles.controlPanel.item}
                onPress={() => setCurrentIndex(1)}>
                <Feather
                  name="grid"
                  color={currentIndex == 1 ? '#FFA001' : '#585858'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.controlPanel.item.text,
                    color: currentIndex == 1 ? '#FFA001' : '#585858',
                  }}>
                  Posts
                </Text>
              </Pressable>

              <Pressable
                style={{...styles.controlPanel.item}}
                onPress={() => setCurrentIndex(2)}>
                <MaterialCommunityIcons
                  name="movie-open-outline"
                  color={currentIndex == 2 ? '#FFA001' : '#585858'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.controlPanel.item.text,
                    color: currentIndex == 2 ? '#FFA001' : '#585858',
                  }}>
                  Reels
                </Text>
              </Pressable>

              <Pressable
                style={styles.controlPanel.item}
                onPress={() => setCurrentIndex(3)}>
                <Entypo
                  name="shop"
                  color={currentIndex == 3 ? '#FFA001' : '#585858'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.controlPanel.item.selectedText,
                    color: currentIndex == 3 ? '#FFA001' : '#585858',
                  }}>
                  Services
                </Text>
              </Pressable>

              <Pressable
                style={styles.controlPanel.item}
                onPress={() => setCurrentIndex(4)}>
                <FontAwesome
                  name="calendar-plus-o"
                  color={currentIndex == 4 ? '#FFA001' : '#585858'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.controlPanel.item.text,
                    color: currentIndex == 4 ? '#FFA001' : '#585858',
                  }}>
                  Events
                </Text>
              </Pressable>

              <Pressable
                style={styles.controlPanel.item}
                onPress={() => setCurrentIndex(5)}>
                <FontAwesome5
                  name="hand-holding-heart"
                  color={currentIndex == 5 ? '#FFA001' : '#585858'}
                  size={24}
                />
                <Text
                  style={{
                    ...styles.controlPanel.item.text,
                    color: currentIndex == 5 ? '#FFA001' : '#585858',
                  }}>
                  Donate
                </Text>
              </Pressable>
            </View>
            {currentIndex === 1 && (
              <View style={styles.contentDisplay}>
                <View style={styles.contentDisplay.row}>
                  <Text style={{fontSize: 20}}>Posts</Text>
                  <Text style={{color: '#FFA001', fontSize: 14}}>See all</Text>
                </View>
                <View style={styles.contentDisplay.row}>
                  <View>
                    <View style={styles.contentDisplay.row.col} />
                    <Text style={{fontSize: 12, lineHeight: 22, marginLeft: 4}}>
                      Incense Sticks
                    </Text>
                    <Text
                      style={{fontSize: 12, marginLeft: 4, color: '#FFA001'}}>
                      $ 250
                    </Text>
                  </View>
                  <View>
                    <View style={styles.contentDisplay.row.col} />
                    <Text style={{fontSize: 12, lineHeight: 22, marginLeft: 4}}>
                      Incense Sticks
                    </Text>
                    <Text
                      style={{fontSize: 12, marginLeft: 4, color: '#FFA001'}}>
                      $ 250
                    </Text>
                  </View>
                  <View>
                    <View style={styles.contentDisplay.row.col} />
                    <Text style={{fontSize: 12, lineHeight: 22, marginLeft: 4}}>
                      Incense Sticks
                    </Text>
                    <Text
                      style={{fontSize: 12, marginLeft: 4, color: '#FFA001'}}>
                      $ 250
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {currentIndex === 3 && (
              <>
                <View style={styles.contentDisplay}>
                  <View style={styles.contentDisplay.row}>
                    <Text style={{fontSize: 20}}>Products</Text>
                    <Text style={{color: '#FFA001', fontSize: 14}}>
                      See all
                    </Text>
                  </View>
                  <View style={styles.contentDisplay.row}>
                    <View>
                      <View style={styles.contentDisplay.row.col} />
                      <Text
                        style={{fontSize: 12, lineHeight: 22, marginLeft: 4}}>
                        Incense Sticks
                      </Text>
                      <Text
                        style={{fontSize: 12, marginLeft: 4, color: '#FFA001'}}>
                        $ 250
                      </Text>
                    </View>
                    <View>
                      <View style={styles.contentDisplay.row.col} />
                      <Text
                        style={{fontSize: 12, lineHeight: 22, marginLeft: 4}}>
                        Incense Sticks
                      </Text>
                      <Text
                        style={{fontSize: 12, marginLeft: 4, color: '#FFA001'}}>
                        $ 250
                      </Text>
                    </View>
                    <View>
                      <View style={styles.contentDisplay.row.col} />
                      <Text
                        style={{fontSize: 12, lineHeight: 22, marginLeft: 4}}>
                        Incense Sticks
                      </Text>
                      <Text
                        style={{fontSize: 12, marginLeft: 4, color: '#FFA001'}}>
                        $ 250
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.contentDisplay}>
                  <View style={styles.contentDisplay.row}>
                    <Text style={{fontSize: 20}}>Services</Text>
                    <Text style={{color: '#FFA001', fontSize: 14}}>
                      See all
                    </Text>
                  </View>
                  <View style={styles.contentDisplay.row}>
                    <View>
                      <View style={styles.contentDisplay.row.col} />
                      <Text
                        style={{fontSize: 12, lineHeight: 22, marginLeft: 4}}>
                        Incense Sticks
                      </Text>
                      <Text
                        style={{fontSize: 12, marginLeft: 4, color: '#FFA001'}}>
                        $ 250
                      </Text>
                    </View>
                    <View>
                      <View style={styles.contentDisplay.row.col} />
                      <Text
                        style={{fontSize: 12, lineHeight: 22, marginLeft: 4}}>
                        Incense Sticks
                      </Text>
                      <Text
                        style={{fontSize: 12, marginLeft: 4, color: '#FFA001'}}>
                        $ 250
                      </Text>
                    </View>
                    <View>
                      <View style={styles.contentDisplay.row.col} />
                      <Text
                        style={{fontSize: 12, lineHeight: 22, marginLeft: 4}}>
                        Incense Sticks
                      </Text>
                      <Text
                        style={{fontSize: 12, marginLeft: 4, color: '#FFA001'}}>
                        $ 250
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};
export default ViewProfile;
