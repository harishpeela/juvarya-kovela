import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  useColorScheme,
  Text,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {format} from 'date-fns';
import {EventInput, PrimaryButton, Loader} from '../../components';
import {allTexts, colors} from '../../common';
import {uploadTempleProfilePic} from '../../utils/api';
import {styles} from './styles'; // Update this import based on your project structure
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {EventInput2} from '../../components/eventCreateInput';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import {CreateCommunityTemple} from '../../utils/api';
import {launchImageLibrary} from 'react-native-image-picker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const CommunityTemple = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [eventError, setEventError] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState('');
  const [descripton, setDescription] = useState('');
  const [DescriptionError, setDescriptionError] = useState(false);
  const [DateError, setDateError] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUploaded, setimageUploaded] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [custDetails, setCustDetails] = useState(null);
  const [isCross, setIsCross] = useState(true);
  const [imgErr, setImgErr] = useState(false);

  const HandleCnfrm = datedata => {
    if (datedata) {
      setToDate(datedata);
      HideDatePicker();
    }
  };
  const ShowDatePicker = () => {
    setDatePickerVisible(true);
  };
  const HideDatePicker = () => {
    setDatePickerVisible(false);
    setDatePickerVisible(false);
  };

  const CommunityTempleData = async () => {
    var date = new Date(toDate);
    var formattedDate = format(date, 'dd-MM-yyyy');
    let payload = {
      name: name,
      desciption: descripton,
      establishedOn: formattedDate,
    };
    setLoader(true);
    if (image === null || image === undefined) {
      setImgErr(true);
    }
    if (name === '') {
      setEventError(true);
      console.log('name', name);
    }
    if (descripton === '') {
      setDescriptionError(true);
      console.log('description', descripton);
    } else if (date === '') {
      setDateError(true);
      console.log('date', date);
    } else if (name && date && descripton && image) {
      let result = await CreateCommunityTemple(payload);
      console.log('result.date ====kkk>', result?.data);
      console.log('status ===>', result?.status);
      if (result?.status === 200) {
        let data = result?.data;
        let img = getImageObj(image);
        let formdata = new FormData();
        formdata.append('profilePicture', img);
        let responce = await uploadTempleProfilePic(formdata, data?.id);
        console.log('img res', responce?.data);
        console.log('res ==> commity', responce?.data);
        if (responce?.status === 200) {
          Alert.alert('Success', 'Community Temple Was Created', [
            {
              text: 'Ok',
              onPress: () => navigation.navigate(allTexts.tabNames.profile),
            },
          ]);
        } else {
          Alert.alert('Error', result?.data?.message, [
            {
              text: 'Ok',
              onPress: () => navigation.navigate(allTexts.tabNames.profile),
            },
          ]);
        }
      }
    }
  };

  const uploadPhoto = () => {
    setImage(image);
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
          saveToPhotos: true,
          includeBase64: true,
          // maxHeight: 1080,
          // maxWidth: 1080,
        },
        res => {
          if (!res?.didCancel && !res?.errorCode) {
            setImage(res?.assets[0]);
            setimageUploaded(false);
            setIsModal(true);
            setImgErr(false);
          } else {
            console.log(res?.errorMessage);
          }
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getImageObj = img => {
    let newUri =
      Platform.OS === 'ios' ? img?.uri : img?.uri?.replace('file://', 'file:');
    let imageObj = {
      uri: newUri,
      name: `${Date.now()}.jpg`,
      type: 'image/jpeg',
    };
    return imageObj;
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: '15%'}}>
        <TopBarCard2
          txt={'Create Temple'}
          back={true}
          marginLeft={'15%'}
          navigation={navigation}
        />
      </View>
      <View style={styles.profileContainer}>
        {image !== null ? (
          <View style={styles.preViewImageContainer}>
            {isCross && (
              <View style={styles.crossIconContainer}>
                <EvilIcons
                  onPress={() => {
                    setImage(null);
                    uploadPhoto();
                  }}
                  name="pencil"
                  color={colors.orangeColor}
                  size={25}
                />
              </View>
            )}
            <Image
              resizeMode="cover"
              style={styles.preViewImage}
              source={{uri: image?.uri}}
            />
          </View>
        ) : isLoading ? (
          <View style={styles.loader}>
            <Loader size={'small'} color={colors.orangeColor} />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.uploadPic}
            onPress={() => {
              uploadPhoto();
            }}>
            {custDetails?.media ? (
              <Image
                source={{uri: custDetails?.media?.url}}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImage}>
                <FontAwesome
                  name="camera"
                  size={60}
                  color={colors.orangeColor}
                />
                {/* <Image
                    source={{
                      uri: 'https://fanfun.s3.ap-south-1.amazonaws.com/1707633657171Trinetra.jpg',
                    }}
                    style={styles.profileImage}
                  /> */}
              </View>
            )}
          </TouchableOpacity>
        )}
        {imgErr && (
          <View>
            <Text
              style={{fontSize: 12, color: colors.orangeColor, marginTop: 10}}>
              {' '}
              Upload Image
            </Text>
          </View>
        )}
      </View>
      <View style={{}}>
        <EventInput
          lable={'Name'}
          placeholder={'Enter Temple Name'}
          height={50}
          onChangeText={e => {
            setName(e);
            setEventError(false);
          }}
        />
        {eventError && (
          <Text
            style={{
              color: colors.orangeColor,
              alignSelf: 'flex-start',
              marginTop: '2%',
              marginLeft: '8%',
            }}>
            please enter Name
          </Text>
        )}
        <EventInput
          lable={'Description'}
          placeholder={'About Temple'}
          height={150}
          onChangeText={e => {
            setDescription(e);
            setDescriptionError(false);
          }}
        />
        {DescriptionError && (
          <Text
            style={{
              color: colors.orangeColor,
              alignSelf: 'flex-start',
              marginTop: '2%',
              marginLeft: '8%',
            }}>
            please enter Description
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            marginLeft: '4%',
          }}>
          <View style={{width: '60%', marginTop: 5}}>
            <View style={{width: '205%', marginLeft: -40}}>
              <EventInput2
                lable={'     Date of Establishment'}
                height={50}
                value1={toDate ? format(toDate, 'dd-MM-yyyy') : ''}
                calendar={true}
                onPressCalendar={() => ShowDatePicker()}
              />
              {DateError && (
                <Text
                  style={{
                    color: colors.orangeColor,
                    alignSelf: 'flex-start',
                    marginTop: '2%',
                    marginLeft: '12%',
                  }}>
                  please Select Date
                </Text>
              )}
            </View>
            <DateTimePickerModal
              isVisible={datePickerVisible}
              mode={date}
              onConfirm={HandleCnfrm}
              onCancel={HideDatePicker}
            />
          </View>
        </View>
        <View style={{width: '80%', alignSelf: 'center', marginTop: '10%'}}>
          <PrimaryButton
            text={'Submit'}
            bgColor={colors.orangeColor}
            onPress={() => CommunityTempleData()}
          />
        </View>
      </View>
    </View>
  );
};

export default CommunityTemple;
