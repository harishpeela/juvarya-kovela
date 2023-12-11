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
  const [isChecked, setIsChecked] = useState(false);
  const {
    screenNames: { signin, otpScreen },
    paragraphs: { alreadyAccount },
    placeHolders: {
      fistNamePlace,
      lastNamePlace,
      emailPlace,
      confirmPasswordPlace,
      passwordPlace,
    },
    headings: {
      inputTitles: {
        phoneNo,
        email,
        username,
        Gender
      },
    },
  } = allTexts;

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
            </View>
          </View>
          <View style={styles.toggleContainer}>
            <View style={styles.toggleHead}>
              <Pressable onPress={() => setCurrentIndex(1)}>
                <View style={styles.separateContainer}>
                  <Text style={[styles.separateContainerText, currentIndex === 1 && styles.orangeColor]}>HighLights</Text>
                  <View style={[styles.border, currentIndex === 1 && styles.orangeColor]} />
                </View>
              </Pressable>
              <Pressable onPress={() => setCurrentIndex(2)}>
                <View style={styles.separateContainer}>
                  <Text style={[styles.separateContainerText, currentIndex === 2 && styles.orangeColor]}>Info</Text>
                  <View style={[styles.border, currentIndex === 2 && styles.orangeColor]} />
                </View>
              </Pressable>
              <Pressable onPress={() => setCurrentIndex(3)}>
                <View style={styles.separateContainer}>
                  <Text style={[styles.separateContainerText, currentIndex === 3 && styles.orangeColor]}>Contribute</Text>
                  <View style={[styles.border, currentIndex === 3 && styles.orangeColor]} />
                </View>
              </Pressable>
              <Pressable onPress={() => setCurrentIndex(4)}>
                <View style={styles.separateContainer}>
                  <Text style={[styles.separateContainerText, currentIndex === 4 && styles.orangeColor]}>Events</Text>
                  <View style={[styles.border, currentIndex === 4 && styles.orangeColor]} />
                </View>
              </Pressable>
            </View>
            <KeyboardAwareScrollView >
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
                      <Text style={styles.desData}>The build will continue, but you are strongly encouraged to update your project to
                        Lorem ipsum dolor sit amet consectetur. Enim sed commodo maecenas sed nisl ultrices. Mauris amet quisque placerat sit mi risus lorem. Tincidunt nam sit sit pharetra. Varius tincidunt mi elementum libero nisl condimentum nisi mauris. Erat sed vel lectus cras ut pellentesque sem. Nunc ut et sed ac et tristique nunc aenean varius. Phasellus sit parturient sed sed ut vitae. Porttitor facilisi dui mauris sit donec eget augue pretium. Id magna arcu sit tortor.
                      </Text>
                    </View>
                  </View>
                )}
                {currentIndex === 3 && (
                  <KeyboardAwareScrollView>
                    <View style={styles.formContainer}>
                      <View style={styles.registrationContainer}>
                        <Text style={styles.registrationText}>Registration Form</Text>
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
                                    <Text style={styles.subBtnText}>Submit</Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainer}></View>
                                <TouchableOpacity
                                  style={styles.alreadyAcc}
                                  onPress={() => {
                                    navigation.navigate(signin);
                                  }}>
                                </TouchableOpacity>
                              </View>
                            );
                          }}
                        </Formik>
                      </View>
                    </View>
                  </KeyboardAwareScrollView>
                )}
                {currentIndex === 4 && (
                  <Text>Maps displaying 4</Text>
                )}
              </View>
            )}
            {currentIndex === 4 && <Text>Maps displaying 4</Text>}

          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Interested</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventDetails;
