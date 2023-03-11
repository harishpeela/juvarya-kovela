/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sparse-arrays */
/* eslint-disable react/react-in-jsx-scope */
import {Pressable, Image, Text, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {styles} from './styles';

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
    ,
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
};

const ViewProfile = ({navigation}) => {
  return (
    <View>
      <View style={styles.footerBackground}>
        <View style={styles.footerContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.header}
              onPress={() => navigation.goBack()}>
              <Feather name="arrow-left-circle" color={'#FFA001'} size={28} />
            </TouchableOpacity>
            <Text
              style={{fontSize: 24, fontWeight: '500', marginHorizontal: 10}}>
              Profile
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Image
              source={{uri: templeData.images[0].uri}}
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
              <Text style={styles.boldText}>
                {templeData.name} &nbsp;&nbsp;
              </Text>
              <Text style={styles.ratingText}>
                <AntDesign name={'star'} color={'#FFA001'} size={20} />{' '}
                {templeData.rating}
              </Text>
            </Text>
          </View>
          <View style={styles.subFooterHead}>
            <Text style={{color: 'grey', fontSize: 18}}>{templeData.city}</Text>
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
              <Text style={styles.voidButton.text}>Contact</Text>
            </Pressable>
            <Pressable style={styles.voidButton}>
              <Text style={styles.voidButton.text}>Directions</Text>
            </Pressable>
          </View>
          <View style={styles.controlPanel}>
            <Pressable style={styles.controlPanel.item}>
              <Feather name="grid" color={'#FFA001'} size={24} />
              <Text style={styles.controlPanel.item.selectedText}>Posts</Text>
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
          <View style={styles.contentDisplay}>
            <View style={styles.contentDisplay.row}>
              <View style={styles.contentDisplay.row.col} />
              <View style={styles.contentDisplay.row.col} />
            </View>
            <View style={styles.contentDisplay.row}>
              <View style={styles.contentDisplay.row.col} />
              <View style={styles.contentDisplay.row.col} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ViewProfile;
