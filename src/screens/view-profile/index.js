/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sparse-arrays */
/* eslint-disable react/react-in-jsx-scope */
// import React, {useState, useEffect, useContext} from 'react';
// import {Pressable, Image, Text, View, TouchableOpacity} from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {styles} from './styles';
// import ApplicationContext from '../../utils/context-api/Context';

// const templeData = {
//   name: 'Temple 123',
//   rating: 4.8,
//   followers: '2.2m',
//   city: 'Hudkeshwar',
//   description:
//     'Temple 123 is a wonderful temple situated in the heart of Nagpur. It was developed by...',
//   posts: 100,
//   products: 25,
//   points: [
//     'Temple 123 is a wonderful temple',
//     'It is situated in the heart of Nagpur.',
//     'It was developed under the guidance of Adishakti',
//     'Visit us and feel the cosmic energy.',
//     ,
//   ],
//   images: [
//     {
//       uri: 'https://thumbs.dreamstime.com/b/indian-temple-3396438.jpg',
//     },
//     {
//       uri: 'https://i.pinimg.com/736x/5b/a7/36/5ba736a47ea684c03ffc261c56d5da40.jpg',
//     },
//     {
//       uri: 'https://i.pinimg.com/736x/70/10/c5/7010c580e3d009134fcddde0cc4afdd9.jpg',
//     },
//     {
//       uri: 'https://w0.peakpx.com/wallpaper/133/250/HD-wallpaper-hindu-temple.jpg',
//     },
//   ],
// };

// const ViewProfile = ({navigation, route}) => {
//   const {userDetails} = useContext(ApplicationContext);
//   const {id, title, profileImg} = route.params || {};
//   const [isFollow, setisFollow] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   // console.log('id', id, title, profileImg);
//   const follow = () => {
//     if (id.itemDetails?.following) {
//       setisFollow('unFollow');
//     } else {
//       setisFollow('Follow');
//     }
//   };
//   useEffect(() => {
//     follow();
//   }, []);
//   return (
//     <View>
//       <View style={styles.footerBackground}>
//         <View style={styles.footerContainer}>
//           <View style={styles.header}>
//             <TouchableOpacity
//               style={styles.header}
//               onPress={() => navigation.goBack()}>
//               <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
//             </TouchableOpacity>
//             <Text
//               style={{fontSize: 24, fontWeight: '500', marginHorizontal: 10}}>
//               Profile
//             </Text>
//           </View>
//           <View style={styles.infoContainer}>
//             <Image
//               source={{uri: profileImg}}
//               style={{
//                 width: 80,
//                 height: 80,
//                 borderColor: '#FFA001',
//                 borderWidth: 2,
//                 borderRadius: 40,
//               }}
//             />

//             <View style={{alignItems: 'center'}}>
//               <Text style={{fontWeight: '600', fontSize: 16}}>
//                 {templeData.posts}
//               </Text>
//               <Text style={{fontSize: 12, color: '#585858', lineHeight: 18}}>
//                 Posts
//               </Text>
//             </View>

//             <View style={{alignItems: 'center'}}>
//               <Text style={{fontWeight: '600', fontSize: 16}}>
//                 {templeData.followers}
//               </Text>
//               <Text style={{fontSize: 12, color: '#585858', lineHeight: 18}}>
//                 Followers
//               </Text>
//             </View>

//             <View style={{alignItems: 'center'}}>
//               <Text style={{fontWeight: '600', fontSize: 16}}>
//                 {templeData.products}
//               </Text>
//               <Text style={{fontSize: 12, color: '#585858', lineHeight: 18}}>
//                 Products
//               </Text>
//             </View>
//           </View>
//           <View style={styles.footerHead}>
//             <Text>
//               <Text style={styles.boldText}>{title} &nbsp;&nbsp;</Text>
//               <Text style={styles.ratingText}>
//                 <AntDesign name={'star'} color={'#FFA001'} size={20} />{' '}
//                 {templeData.rating}
//               </Text>
//             </Text>
//           </View>
//           <View style={styles.subFooterHead}>
//             <Text style={{color: 'grey', fontSize: 18}}>{id.description}</Text>
//           </View>
//           <View style={styles.footerBody}>
//             {templeData.points.map((item, index) => {
//               return (
//                 <Text key={index} style={{fontSize: 14, lineHeight: 18}}>
//                   • {item}
//                 </Text>
//               );
//             })}
//           </View>
//           <View style={styles.footerAction}>
//             <Pressable style={styles.button}>
//               <Text style={styles.button.text}>{isFollow}</Text>
//             </Pressable>
//             <Pressable style={styles.voidButton}>
//               <Text style={styles.voidButton.text}>Contact</Text>
//             </Pressable>
//             <Pressable style={styles.voidButton}>
//               <Text style={styles.voidButton.text}>Directions</Text>
//             </Pressable>
//             {userDetails.role === 'ROLE_ADMIN' && (
//               <TouchableOpacity onPress={() => alert('under development')}>
//                 <AntDesign name="pluscircleo" size={30} color={'#FFA001'} />
//               </TouchableOpacity>
//             )}
//           </View>
//           <View style={styles.controlPanel}>
//             <Pressable
//               style={styles.controlPanel.item}
//               onPress={() => setCurrentIndex()}>
//               <Feather name="grid" color={'#FFA001'} size={24} />
//               <Text style={styles.controlPanel.item.selectedText}>Posts</Text>
//             </Pressable>
//             <Pressable style={styles.controlPanel.item}>
//               <MaterialCommunityIcons
//                 name="movie-open-outline"
//                 color={'#585858'}
//                 size={24}
//               />
//               <Text style={styles.controlPanel.item.text}>Reels</Text>
//             </Pressable>
//             <Pressable style={styles.controlPanel.item}>
//               <Entypo name="shop" color={'#585858'} size={24} />
//               <Text style={styles.controlPanel.item.text}>Services</Text>
//             </Pressable>
//             <Pressable style={styles.controlPanel.item}>
//               <MaterialCommunityIcons
//                 name="movie-open-outline"
//                 color={'#585858'}
//                 size={24}
//               />
//               <Text style={styles.controlPanel.item.text}>Events</Text>
//             </Pressable>
//             <Pressable style={styles.controlPanel.item}>
//               <MaterialCommunityIcons
//                 name="movie-open-outline"
//                 color={'#585858'}
//                 size={24}
//               />
//               <Text style={styles.controlPanel.item.text}>Donate</Text>
//             </Pressable>
//           </View>
//           <View style={styles.contentDisplay}>
//             <View style={styles.contentDisplay.row}>
//               <View style={styles.contentDisplay.row.col} />
//               <View style={styles.contentDisplay.row.col} />
//             </View>
//             <View style={styles.contentDisplay.row}>
//               <View style={styles.contentDisplay.row.col} />
//               <View style={styles.contentDisplay.row.col} />
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };
// export default ViewProfile;

import {
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  Dimensions,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ApplicationContext from '../../utils/context-api/Context';
const windowWidth = Dimensions.get('window').width;

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

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
    fontSize: 24,
    fontWeight: '600',
  },
  ratingText: {
    fontSize: 20,
  },
  footerBackground: {
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  footerContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  contentDisplay: {
    paddingVertical: 10,
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 5,
      col: {
        width: 100,
        height: 100,
        backgroundColor: 'rgba(88, 88, 88, 0.2)',
        borderRadius: 20,
      },
    },
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
    marginTop: 10,
  },
  footerBody: {
    paddingTop: 20,
  },
  subFooterHead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
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
      },
      selectedText: {
        paddingVertical: 5,
      },
    },
  },
});
export default ViewProfile;
