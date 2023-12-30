import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Pressable, Image, Button, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BackgroundImage, BackgroundImageAClass, EventCard3, InputField, PrimaryButton, TextInput2 } from '../../components';
import {
  BackHeaderNew,
} from '../../components';
import { allTexts, colors, Car } from '../../common';
import Icon2 from 'react-native-vector-icons/EvilIcons'
import { BackgroundImage2 } from '../../components/backgroundImage';
import Btn from '../../components/btn';
import { Formik, Field } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PasswordField } from '../../components/inputfield';
import { Picker } from '@react-native-picker/picker';
import { styles } from './styles';
import { AntDesign } from '@expo/vector-icons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import FontisoIcon from 'react-native-vector-icons/Fontisto';
import FontAwsIcon from 'react-native-vector-icons/FontAwesome';
import Card from '../../common/Card';
const EventDetails = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
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

  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
const renderHighlight = () => {
  return (
    <Card style={styles.highLightCard}>
<AntDesignIcon style={{position: 'absolute', right: 10, top: 10}} name="heart" size={15} color="red" />
  <View style={{ flexDirection: 'row' }}>
  <Image 
source={require('../../../assets/images/tempimg1.jpg')}
style={{height: 80, width: 80, borderRadius: 20}}
/>
<View style={{marginLeft: 10}}>
  <Text style={{fontSize: 18, fontWeight: '700'}}>Ganga Dursheera</Text>
  <Text numberOfLines={2} ellipsizeMode='tail' style={{width: 250}}>
Lorem ipsum dolor sit amet consectetur. Enim sed commodo maecenas sed nisl ultrices. Mauris amet quisque placerat sit mi risus lorem.
 Tincidunt nam sit sit pharetra. Varius tincidunt mi elementum libero nisl condimentum nisi mauris. Erat sed vel lectus cras ut pellentesque sem. Nunc ut et sed ac et tristique nunc aenean varius. Phasellus sit parturient sed sed ut vitae. Porttitor facilisi dui mauris sit donec eget augue pretium. Id magna arcu sit tortor.
</Text>
</View>
  </View>
<View style={{flexDirection: 'row', position: 'absolute', bottom: 5, right: 20, alignItems: 'center'}}>
<FontisoIcon style={{backgroundColor: 'white', padding: 5,borderRadius: 10}} name="date" size={10} color={colors.orangeColor} />
<Text style={{fontSize: 10, color:'black', marginLeft: 10}}>10-21-2023, November</Text>
</View>
  </Card>
  )
};

const renderInfo = () => {
  return (
    <Card>
      <Text style={{fontSize: 16, fontWeight: '700', color: 'black'}}>makar sankranthi</Text>
      <Text>
      Lorem ipsum dolor sit amet consectetur. Enim sed commodo maecenas sed nisl ultrices. Mauris amet quisque placerat sit mi risus lorem.
 Tincidunt nam sit sit pharetra. Varius tincidunt mi elementum libero nisl condimentum nisi mauris. Erat sed vel lectus cras ut pellentesque sem. Nunc ut et sed ac et tristique nunc aenean varius. Phasellus sit parturient sed sed ut vitae. Porttitor facilisi dui mauris sit donec eget augue pretium. Id magna arcu sit tortor.
      </Text>
    </Card>
  )
};

const renderContribute = () => {
  return (
    <Card style={styles.contributeCard}>
      <Text style={{backgroundColor: colors.orangeColor, paddingHorizontal: 10, paddingVertical: 5,
         position: 'absolute', left: 10, top: 10, borderRadius: 10}}>Temple</Text>
          <AntDesignIcon style={{position: 'absolute', right: 10, top: 10}} name="heart" size={20} color="red" />
          <View style={{marginTop: 30}}>
            <Image 
            style={{height: 120, width: 120, borderRadius: 60}} 
            source={require('../../../assets/images/tempimg1.jpg')}/>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '600', color: 'black', marginVertical: 5}}>Holi Festival</Text>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
            <AntDesignIcon  name="heart" size={15} color={colors.orangeColor} />
            <Text style={{fontSize: 14, fontWeight: '400', color: 'black', marginLeft: 10}}>Shiva prasad</Text>
            </View>
          </View>
        </Card>
  )
}
  const actionsArr = [
    {
      id: 1,
      label: 'Highlights',
      component: renderHighlight,
      activeTab: false, 
    },
    {
      id: 2,
      label: 'Info',
      component: renderInfo,
      activeTab: false, 
    },
    {
      id: 3,
      label: 'Contribute',
      component: renderContribute,
      activeTab: false, 
    }
  ];

  const scroolImagesArray = [
    {
      id: 1,
      img: require('../../../assets/images/tempimg1.jpg')
    },
    {
      id: 2,
      img: require('../../../assets/images/tempimg2.jpg')
    }
  ]

  return (
    <View style={styles.container}>
      <ScrollView style={{borderWidth: 0}} >
        {/* <BackgroundImage2 /> */}
        <View style={styles.HeaderImage}>
          {/* <TouchableOpacity
            style={styles.round}
            onPress={() => {
              navigation.goBack();
            }}>
            <BackHeaderNew
              onPress={() => navigation.goBack()}
              txtColor={colors.black}
              isPlus={false}
            />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.round2} onPress={() => {
            navigation.goBack();
          }} >
            <Icon
              onPress={() => navigation.goBack()}
              color={colors.orangeColor}
              size={22}
              isPlus={false}
              name="step-backward"
            />
          </TouchableOpacity>
          <View style={styles.eventTextContainer}>
            <Text style={styles.eventText}>Event Details</Text>
          </View>
          <TouchableOpacity style={styles.round2}>
            <FeatherIcon style={styles.notificationIcon} name="bell" size={20} color="white" />

          </TouchableOpacity>
        </View>
        <ImageBackground 
        source={scroolImagesArray[activeImgIndex]?.img} 
        style={{ height: 250, marginHorizontal: 20, marginTop: 20}}
        imageStyle={{ borderRadius: 20}}
        >
          <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <AntDesignIcon name="left" size={50} color="white" disabled={activeImgIndex===0}  onPress={()=> setActiveImgIndex((imgIndex)=> imgIndex - 1)}/>
          <AntDesignIcon name="right" size={50} color="white" disabled={activeImgIndex=== (scroolImagesArray?.length - 1)} onPress={()=> setActiveImgIndex((imgIndex)=> imgIndex + 1)}/>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 15}}>
           {
            scroolImagesArray?.map((img, index)=> {
              return (
                <TouchableOpacity 
                style={{ borderWidth: 2,borderRadius: 10, borderColor: 'white', marginHorizontal: 5}} 
                onPress={()=> setActiveImgIndex(index)} 
                key={img?.id?.toString()}>
                <Image source={img.img}
                style={{height: 50, width: 50, borderRadius: 10}}
                />
                </TouchableOpacity>
              )
            })
           }
          </View>
        </ImageBackground>
        <View>
          <View style={{flexDirection: 'row', margin: 20, alignItems:'center'}}>
             <F5Icon style={{ backgroundColor: 'white'}} name="archway" size={30} color={colors.orangeColor} /> 
             <Text style={{fontSize: 24, fontWeight: '700', color: 'black', marginLeft: 10}}>Holi Festival</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
           <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
               <FontisoIcon style={{color:colors.orangeColor, backgroundColor: 'white', padding: 5,borderRadius: 10}} name="date" size={20} color="white" />
                <Text style={{fontSize: 14, color:'black', marginLeft: 10}}>10-21-2023, November</Text>
               </View>
               <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
               <FontAwsIcon style={{color:colors.orangeColor, backgroundColor: 'white', padding: 5, borderRadius: 10}} name="location-arrow" size={20} color="white" />
               <Text style={{color: colors.blue, fontSize: 14, marginLeft: 10, borderBottomWidth: 1, borderBottomColor: colors.blue}}>Anakapalle</Text>
               </View>
        </View>
        <View style={{
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderColor: colors.gray,
    marginVertical: 10,
  }}>
</View>
<View style={{flexDirection: 'row'}}>
  {
    actionsArr.map((action, index)=> {
      return(
        <TouchableOpacity
        key={action?.id?.toString()}
        onPress={()=> setActiveTabIndex(index)}
        style={{backgroundColor: activeTabIndex === index ? colors.orangeColor : '#dddddd', borderRadius: 30, paddingHorizontal: 15,paddingVertical: 5, marginHorizontal: 10}}>
        <Text style={{color: activeTabIndex === index ? 'white' : 'grey', fontWeight: '400'}}>{action.label}</Text>
        </TouchableOpacity>
      )
    })
  }
</View>
<View style={{margin:10}}>
{actionsArr[activeTabIndex].component()}
</View>
        {/* <View style={styles.festivaldetails}>
          <View style={styles.festivalContainer}>
            <Icon2 name='location' style={{ color: colors.red1 }} size={25} />
            <Text style={[styles.festivalText]} >Ganesh festival</Text>
          </View>
          <View style={styles.festlocation}>
            <View style={styles.dateAndLocation}>
              <Icon2 name='location' style={{ color: colors.red1 }} size={15} />
              <Text style={styles.dateText}>07 December 2023</Text>
            </View>
            <View style={styles.locationPincode}>
              <Icon2 name='location' style={{color:colors.red1, marginRight:10}} size={15} />
              <Text style={styles.pincode}>
                Gavarapalem,531001,Anakapalli
              </Text>
            </View>
          </View>
        </View> */}
        {/* <View style={styles.secondContainer}>


          <View style={styles.toggleContainer}>
           
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
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
                    {/* <View style={styles.btnContainer}>
                      <Btn />
                      <Btn />
                      <Btn />
                      <Btn />
                      <Btn />
                    </View> *

                    <View style={styles.desContainer}>
                      <View style={styles.HeadingAndIcon}>
                      <Text style={styles.des}>Description</Text>
                      <Icon2 name='editOutlined' style={{color:colors.red1, marginTop:15}} size={20} />
                      </View>
                     
                      <Text style={styles.desData}>The build will continue, but you are strongly encouraged to update your project to
                        Lorem ipsum dolor sit amet consectetur. Enim sed commodo maecenas sed nisl ultrices. Mauris amet quisque placerat sit mi risus lorem. Tincidunt nam sit sit pharetra. Varius tincidunt mi elementum libero nisl condimentum nisi mauris. Erat sed vel lectus cras ut pellentesque sem. Nunc ut et sed ac et tristique nunc aenean varius. Phasellus sit parturient sed sed ut vitae. Porttitor facilisi dui mauris sit donec eget augue pretium. Id magna arcu sit tortor.
                      </Text>
                    </View>
                  </View>
                )}
                {/* {currentIndex === 3 && (
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
                )} *
                {currentIndex === 4 && (
                  <Text>Maps displaying 4</Text>
                )}
              </View>
            </KeyboardAwareScrollView>

          </View>
        </View> */}
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
