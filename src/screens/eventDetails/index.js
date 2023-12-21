import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BackgroundImage,
  BackgroundImageAClass,
  EventCard3,
  InputField,
  PrimaryButton,
  TextInput2,
} from '../../components';
import {BackHeaderNew} from '../../components';
import {allTexts, colors} from '../../common';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import {BackgroundImage2} from '../../components/backgroundImage';
import Btn from '../../components/btn';
import { Formik, Field } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon3 from 'react-native-vector-icons/Entypo';
import {
  EventDetail,
  EventInterested,
  EventInterestedCount,
} from '../../utils/api';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import Snackbar from 'react-native-snackbar';

const EventDetails = ({ navigation, route }) => {
  const { data } = route.params || {};
  console.log('data =>>>>>> ' + data.id);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [eventPage, setEventPage] = useState(false);
  const [eventData, setEventData] = useState();
  const [eventLoader, setEventLoader] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [interested, setInterested] = useState(false);
  const [url, setUrl] = useState('');
  const [interestedCount, setInterestedCount] = useState(0)
  const {
    screenNames: {signin, otpScreen},
    paragraphs: {alreadyAccount},
    placeHolders: {
      fistNamePlace,
      lastNamePlace,
      emailPlace,
      confirmPasswordPlace,
      passwordPlace,
    },
    headings: {
      inputTitles: {phoneNo, email, username, Gender},
    },
  } = allTexts;
  const EventDetailSubmit = async () => {
    setEventLoader(true);
    console.log('id', data?.id)
    try {
      let result = await EventDetail(data.id);
      console.log('Eventsdata ========>', result?.data);
      setEventData(result?.data);
      // console.log('data  2 =====>>>>>>' + data)
      console.log(result.status);
      console.log('events list =>>>>>>>>>>>>> ' + eventData);
      if (result?.data?.mediaList[0].url) {
        setUrl(result?.data?.mediaList[0].url);
        console.log(
          '______________________________+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        );

        getCount()
      }
      if (result.status === 200) {
        setEventData(result?.data);
        console(
          'MediaList =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>' +
          eventData,
        )
        setEventLoader(false);
        console.log(formattedDate);
      } else {
        setEventLoader(false);
      }
    } catch (error) {
      console.log('Error ======>>>>>>>>>' + error);
    }
  };
  useEffect(() => {
    EventDetailSubmit();
    // getCount();
  }, []);

  const hitInterested = async () => {
    if (interested) {
      setInterested(false);
    } else {
      setInterested(true);
    }
    const payload = {
      eventId: data.id,
      interested: interested,
    };
    console.log(
      'eventInterested =>>>>>> ' + payload.eventId,
      payload.interested,
    );
    try {
      let result = await EventInterested(payload);
      console.log(result?.data);
      if (result) {
        if (interested) {
          Snackbar.show({
            text: 'removed from the Interest',
            backgroundColor: 'green',
            duration: 2000,
            action: {
              text: 'Ok',
              textColor: 'white',
              onPress: () => {
                <></>;
              },
            },
          });
        } else {
          Snackbar.show({
            text: 'Added to the Interest',
            backgroundColor: 'green',
            duration: 2000,
            action: {
              text: 'Ok',
              textColor: 'white',
              onPress: () => {
                <></>;
              },
            },
          });
        }
      } else {
        setMemberShip(0);
      }
    } catch (error) {
      console.log('It is in error block');
      Snackbar.show({
        text: 'Facing the Error',
        backgroundColor: 'red',
        duration: 2000,
        action: {
          text: 'Ok',
          textColor: 'white',
          onPress: () => {
            <></>;
          },
        },
      });
    }
  }



  const getCount = async () => {
    try {
      let result = await EventInterestedCount(data.id)
      console.log("result.statues ----->>>>>>> " + (result?.data))
      if (result.status === 200) {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + result?.data?.totalItems)
        setInterestedCount(result?.data?.totalItems)
      }
      if (result) {
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const dateObject = new Date(eventData?.creationTime);
    let modifyDate = dateObject.toLocaleString('default', {
      day: '2-digit',
      month: 'short',
    });
    setFormattedDate(modifyDate);
  }, [eventData?.creationTime]);

  useEffect(() => {
    console.log(formattedDate);
  }, [formattedDate]);

  const handlePress = () => {
    if (eventPage) {
      setEventPage(false);
      setCurrentIndex(1);
    } else {
      setEventPage(true);
      setCurrentIndex(2);
    }
  }


  console.log("EventsData ===>>>>>>>>>>> " + eventData)

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <BackgroundImage2
        templeImage={eventData?.mediaList[0]?.url}
      // uri={
      //   eventData?.mediaList[0]?.url
      //     ? eventData?.mediaList[0]?.url
      //     : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1702037767542durga.png'
      // }
      />
      <View style={styles.header}>
        <BackHeaderNew
          onPress={() => {
            if (eventPage && currentIndex === 2) {
              handlePress();
            } else {
              navigation.goBack();
            }
          }}
          txtColor={colors.black}
          isPlus={false}
          isArrow={true}
        />
        <TouchableOpacity style={styles.round2}>
          <Icon name="share" size={22} color={colors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.secondContainer}>
        <View style={styles.secondContainer2}>
          <View style={styles.eventNameContainer}>
            <Text style={[styles.festivalText]}>
              {eventData?.name ? eventData.name.charAt(0).toUpperCase() + eventData.name.slice(1) : ''}
            </Text>
            <View style={styles.favoriteContainer}>
              <Icon4 name="favorite" size={32} color={colors.orangeColor} />
              {interestedCount > 0 ? (<Text style={styles.interestedText}>{interestedCount}</Text>) : (<></>)}
            </View>
          </View>
          <View style={styles.dateAndLocation}>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <View style={styles.locationIcon}>
              <Icon3 name="location-pin" color={colors.red1} size={20} />
              <Text style={[(color = colors.gray), styles.locText]}>{eventData?.addressToEventDTO?.city}</Text>
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
            )}
            <Pressable onPress={() => setCurrentIndex(2)}>
              <View style={styles.separateContainer}>
                <Text
                  style={[
                    styles.separateContainerText,
                    currentIndex === 2 && styles.orangeColor,
                  ]}>
                  Info
                </Text>
                <View style={[currentIndex === 2 && styles.orangeColor]} />
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
                  Location
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
          <ScrollView>
            <View style={styles.toggleData}>
              {currentIndex === 1 && (
                <TouchableOpacity onPress={handlePress}>
                  <EventCard3 onPress={handlePress} />
                  <EventCard3 />
                  <EventCard3 />
                  <EventCard3 />
                  <EventCard3 />
                  <EventCard3 />
                </TouchableOpacity>
              )}
              {currentIndex === 2 && (
                <View style={styles.infoContainer}>
                  <View style={styles.btnContainer}>
                    <Btn />
                    <Btn />
                    <Btn />
                    <Btn />
                    <Btn />
                  </View>
                  <View style={styles.desContainer}>
                    <Text style={styles.des}>Description: </Text>
                    <Text style={styles.desData}>
                      The build will continue, but you are strongly encouraged
                      to update your project to Lorem ipsum dolor sit amet
                      consectetur. Enim sed commodo maecenas sed nisl ultrices.
                      Mauris amet quisque placerat sit mi risus lorem. Tincidunt
                      nam sit sit pharetra. Varius tincidunt mi elementum libero
                      nisl condimentum nisi mauris. Erat sed vel lectus cras ut
                      pellentesque sem. Nunc ut et sed ac et tristique nunc
                      aenean varius. Phasellus sit parturient sed sed ut vitae.
                      Porttitor facilisi dui mauris sit donec eget augue
                      pretium. Id magna arcu sit tortor.
                    </Text>
                  </View>
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
            <KeyboardAwareScrollView>
              <View style={styles.toggleData}>
                {currentIndex === 1 && (
                  <ScrollView>
                    <View style={styles.container1}>
                      <EventCard3 />
                      <EventCard3 />
                      <EventCard3 />
                      <EventCard3 />
                      <EventCard3 />
                      <EventCard3 />
                    </View>
                  </ScrollView>
                )}
                {currentIndex === 2 && (
                  <View style={styles.infoContainer}>
                    <View style={styles.btnContainer}>
                      <Btn />
                      <Btn />
                      <Btn />
                      <Btn />
                      <Btn />
                    </View>
                    <View style={styles.desContainer}>
                      <Text style={styles.des}>Description: </Text>
                      <Text style={styles.desData}>
                        The build will continue, but you are strongly encouraged
                        to update your project to Lorem ipsum dolor sit amet
                        consectetur. Enim sed commodo maecenas sed nisl
                        ultrices. Mauris amet quisque placerat sit mi risus
                        lorem. Tincidunt nam sit sit pharetra. Varius tincidunt
                        mi elementum libero nisl condimentum nisi mauris. Erat
                        sed vel lectus cras ut pellentesque sem. Nunc ut et sed
                        ac et tristique nunc aenean varius. Phasellus sit
                        parturient sed sed ut vitae. Porttitor facilisi dui
                        mauris sit donec eget augue pretium. Id magna arcu sit
                        tortor.
                      </Text>
                    </View>
                  </View>
                )}
                {currentIndex === 3 && (
                  <KeyboardAwareScrollView>
                    <View style={styles.formContainer}>
                      <View style={styles.registrationContainer}>
                        <Text style={styles.registrationText}>
                          Registration Form
                        </Text>
                      </View>
                      <View style={styles.formik}>
                        <Formik
                          onSubmit={(values, formikActions) => {
                            UserRegisterHandler(values, formikActions);
                            console.log('values', values);
                          }}
                          initialValues={{
                            phone: '',
                            email: '',
                            userName: '',
                            Gender: '',
                          }}>
                          {({
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            values,
                          }) => {
                            return (
                              <View style={styles.fieldContainer}>
                                <TextInput2
                                  title={'UserName'}
                                  placeholder={'Enter Your Name'}
                                  error={touched.userName && errors.userName}
                                  onBlur={handleBlur('userName')}
                                  setState={handleChange('userName')}
                                />
                                <TextInput2
                                  title={phoneNo}
                                  isFlag
                                  keyboardType={'numeric'}
                                  placeholder={'Enter Your Phone Number'}
                                  error={touched.phone && errors.phone}
                                  onBlur={handleBlur('phone')}
                                  setState={handleChange('phone')}
                                  maxLength={10}
                                />
                                <TextInput2
                                  title={email}
                                  placeholder={emailPlace}
                                  error={touched.email && errors.email}
                                  onBlur={handleBlur('email')}
                                  setState={handleChange('email')}
                                  autoCapitalize="none"
                                />
                                <View style={styles.inputAndBtnContainer}>
                                  <TextInput2
                                    title={'Gender'}
                                    placeholder={'Gender'}
                                    error={touched.email && errors.email}
                                    onBlur={handleBlur('email')}
                                    setState={handleChange('email')}
                                    autoCapitalize="none"
                                    width={'25%'}
                                  />
                                  <TouchableOpacity style={styles.subBtn}>
                                    <Text style={styles.subBtnText}>
                                      Submit
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainer} />
                                <TouchableOpacity
                                  style={styles.alreadyAcc}
                                  onPress={() => {
                                    navigation.navigate(signin);
                                  }}
                                />
                              </View>
                            );
                          }}
                        </Formik>
                      </View>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
              )}
              {/* {currentIndex === 4 && (
                  <View style={styles.locationContainer}>
                    <Text style={styles.locationText}>Event Location </Text>
                  </View>
                )} */}
              {currentIndex === 4 && (
                <Text style={styles.locationText}>Maps displaying 4</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
      {currentIndex !== 3 ? (
        <TouchableOpacity
          style={styles.intButton}
          onPress={() => hitInterested()}>
          {interested ? (
            <Text style={styles.intButtonText}>Interested</Text>
          ) : (
            <Text style={styles.intButtonText}>Interest</Text>
          )}
        </TouchableOpacity>
      ) : (
        <></>
      )}
      {/* </ScrollView> */}
    </View>
  );
};

export default EventDetails;
