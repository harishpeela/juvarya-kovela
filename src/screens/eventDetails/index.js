/* eslint-disable no-undef */
import {Text, View, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BackHeaderNew} from '../../components';
import {colors} from '../../common';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import {BackgroundImage2} from '../../components/backgroundImage';
const EventDetails = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  return (
    <View style={styles.footerContainer}>
      <BackgroundImage2 />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.round}
          onPress={() => {
            navigation.goBack();
          }}>
          <BackHeaderNew
            // txt={`${followersList?.length} Followers`}
            onPress={() => navigation.goBack()}
            txtColor={colors.black}
            isPlus={false}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.round2}>
          <Icon name="share" size={22} color={colors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.secondContainer}>
        <View style={styles.secondContainer2}>
          <Text style={[styles.festivalText]}>Ganesh festival</Text>

          <View style={styles.dateAndLocation}>
            <Text style={styles.dateText}>07 July</Text>
            <View style={styles.locationIcon}>
              <Icon2 name="location" color={colors.red1} size={24} />
              <Text style={{...styles.locText, color: colors.gray}}>Vizag</Text>
            </View>
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.toggleHead}>
            <Pressable onPress={() => setCurrentIndex(1)}>
              <View style={styles.separateContainer}>
                <Text
                  style={[
                    styles.separateContainerText,
                    currentIndex === 1 && styles.orangeColor,
                  ]}>
                  HighLights
                </Text>
                <View
                  style={[
                    styles.border,
                    currentIndex === 1 && styles.orangeColor,
                  ]}
                />
              </View>
            </Pressable>
            <Pressable onPress={() => setCurrentIndex(2)}>
              <View style={styles.separateContainer}>
                <Text
                  style={[
                    styles.separateContainerText,
                    currentIndex === 2 && styles.orangeColor,
                  ]}>
                  Info
                </Text>
                <View
                  style={[
                    styles.border,
                    currentIndex === 2 && styles.orangeColor,
                  ]}
                />
              </View>
            </Pressable>
            <Pressable onPress={() => setCurrentIndex(3)}>
              <View style={styles.separateContainer}>
                <Text
                  style={[
                    styles.separateContainerText,
                    currentIndex === 3 && styles.orangeColor,
                  ]}>
                  Contribute
                </Text>
                <View
                  style={[
                    styles.border,
                    currentIndex === 3 && styles.orangeColor,
                  ]}
                />
              </View>
            </Pressable>
            <Pressable onPress={() => setCurrentIndex(4)}>
              <View style={styles.separateContainer}>
                <Text
                  style={[
                    styles.separateContainerText,
                    currentIndex === 4 && styles.orangeColor,
                  ]}>
                  Events
                </Text>
                <View
                  style={[
                    styles.border,
                    currentIndex === 4 && styles.orangeColor,
                  ]}
                />
              </View>
            </Pressable>
          </View>

          <View style={styles.toggleData}>
            {currentIndex === 1 && (
              <Text>List displaying </Text>
              // <View
              //   showsVerticalScrollIndicator={false}
              //   style={styles.contentDisplay}>
              //   {!postImages?.length > 0 ? (
              //     <View>
              //       {loader ? (
              //         <Loader size={'small'} color={colors.orangeColor} />
              //       ) : (
              //         <View>
              //           <Feather
              //             name="camera-off"
              //             size={40}
              //             style={styles.noPosts}
              //           />
              //           <Text style={styles.noPosts.text}>No Posts Yet</Text>
              //         </View>
              //       )}
              //     </View>
              //   ) : (
              //     <FlatList
              //       numColumns={3}
              //       data={postImages}
              //       keyExtractor={({item, index}) => index}
              //       style={styles.ImagesContainer}
              //       renderItem={({item, index}) => (
              //         <TempleProfile_PostsCard nav={navigation} item={item} />
              //       )}
              //     />
              //   )}
              // </View>
            )}
            {currentIndex === 2 && (
              <View>
                <Text>It is displaying 2</Text>
              </View>
            )}
            {currentIndex === 3 && (
              <View>
                <Text>It is displaying 3</Text>
              </View>
            )}
            {currentIndex === 4 && <Text>Maps displaying 4</Text>}
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Interested</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventDetails;
