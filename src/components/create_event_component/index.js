/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Platform, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import {InputField, Loader, PrimaryButton} from '../../components';
import {allTexts, colors} from '../../common';
import {styles} from './styles';
import {TextInput, TouchableOpacity} from 'react-native';
import CalenderIcon from 'react-native-vector-icons/AntDesign';
import RadioForm from 'react-native-simple-radio-button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';

export const Create_Event = ({data, navigation}) => {
  const {
    headings: {
      inputTitles: {pickadate},
    },
  } = allTexts;

  const [isRegular, setIsRegular] = useState(data.type);
  const [image, setImage] = useState(null);
  const [date, setDate] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [imageUploaded, setimageUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isCross, setIsCross] = useState(true);
  const [description, setDescription] = useState('');
  const [titleName, setTitleName] = useState('');
  const [city, setCity] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const ShowDatePicker = () => {
    setDatePickerVisible(true);
  };
  const HideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const HandleCnfrm = datedata => {
    setDate(datedata);
    setFromDate(datedata);
    setToDate(datedata);

    HideDatePicker();
  };
  const GetDate = () => {
    let TempDate = date.toString().split('');
    return date !== ''
      ? ` ${TempDate[3]} ${TempDate[4]} ${TempDate[5]} ${TempDate[6]} ${TempDate[7]} ${TempDate[8]} ${TempDate[9]} ${TempDate[10]} ${TempDate[11]} ${TempDate[12]} ${TempDate[13]} ${TempDate[14]}`
      : '';
  };
  const GetFromDate = () => {
    let TempDate = fromDate.toString().split('');
    return date !== ''
      ? ` ${TempDate[3]} ${TempDate[4]} ${TempDate[5]} ${TempDate[6]} ${TempDate[7]} ${TempDate[8]} ${TempDate[9]} ${TempDate[10]} ${TempDate[11]} ${TempDate[12]} ${TempDate[13]} ${TempDate[14]}`
      : '';
  };
  const GetToDate = () => {
    let ToDate = toDate.toString().split('');
    return date !== ''
      ? ` ${ToDate[3]} ${ToDate[4]} ${ToDate[5]} ${ToDate[6]} ${ToDate[7]} ${ToDate[8]} ${ToDate[9]} ${ToDate[10]} ${ToDate[11]} ${ToDate[12]} ${ToDate[13]} ${ToDate[14]}`
      : '';
  };
  var radio_prop = [
    {label: 'Single day', value: 0},
    {label: 'more days', value: 1},
  ];
  const CreateEvent = async () => {
    let Token = await getAuthTokenDetails();
    console.log(Token, 'token');
    let img = getImageObj(image);
    try {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', Token);

      var formdata = new FormData();
      formdata.append('name', titleName);
      formdata.append('profileId', '1');
      formdata.append('files', img);
      formdata.append('eventType', 'EVENT');
      formdata.append('description', description);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch('https://kovela.app/events/jtevent/save', requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('result', result?.status, result);
          if (result) {
            Alert.alert('Success', result?.message, [
              {
                text: 'Ok',
                // onPress: () =>
                //   navigation.navigate(allTexts.screenNames.profilemembership, {
                //     roleId: roleId,
                //   }),
              },
            ]);
          } else {
            console.log('1');
          }
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhoto = () => {
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
    <View style={styles.wrapper}>
      <View style={styles.uploadContainer}>
        {image !== null ? (
          <View style={styles.preViewImageContainer}>
            <View style={styles.crossIconContainer}>
              <Icon
                onPress={() => {
                  setImage(null);
                }}
                name="closecircle"
                color={colors.orangeColor}
                size={25}
              />
            </View>
            <Image
              resizeMode="cover"
              style={styles.preViewImage}
              source={{uri: image?.uri}}
            />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.uploadPic}
            onPress={() => {
              uploadPhoto();
            }}>
            <View style={styles.profileImage}>
              <Icon name="camera" size={70} color={colors.orangeColor} />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginHorizontal: '5%'}}>
        <InputField
          value={titleName}
          title={'Name'}
          titleColor={colors.orangeColor}
          placeholder={'feed name'}
          setState={e => setTitleName(e)}
        />
        <InputField
          value={description}
          title={'description'}
          titleColor={colors.orangeColor}
          placeholder={'description'}
          setState={e => setDescription(e)}
        />
      </View>
      <View style={{alignSelf: 'center', marginTop: '5%'}}>
        <RadioForm
          radio_props={radio_prop}
          initial={isRegular}
          formHorizontal={true}
          labelHorizontal={true}
          buttonColor={colors.orangeColor}
          selectedButtonColor={colors.orangeColor}
          animation={false}
          buttonSize={8}
          buttonOuterSize={20}
          labelStyle={styles.radioLabelStyle}
          onPress={value => {
            setIsRegular(value);
          }}
        />
      </View>
      {!isRegular ? (
        <View style={{marginHorizontal: '5%'}}>
          <View style={{height: 20}} />
          <Text style={styles.pickDateTxt}>{pickadate} </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <InputField1
              value={data.date || GetDate()}
              titleColor={colors.orangeColor}
              placeholder="yyyy/mm/dd"
            />
            <TouchableOpacity style={styles.icon}>
              <CalenderIcon
                name="calendar"
                color={colors.white}
                size={22}
                onPress={() => ShowDatePicker()}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={datePickerVisible}
              mode={date}
              onConfirm={HandleCnfrm}
              onCancel={HideDatePicker}
            />
          </View>
        </View>
      ) : (
        <View style={{marginHorizontal: '5%'}}>
          <View style={{height: 20}} />
          <Text style={styles.pickDateTxt}>{'select dates for dharsan'}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <InputField1
              value={fromDate || GetFromDate()}
              titleColor={colors.green2}
              placeholder="from-Date - yyyy/mm/dd"
            />
            <TouchableOpacity style={styles.icon}>
              <CalenderIcon
                name="calendar"
                color={colors.white}
                size={22}
                onPress={() => ShowDatePicker()}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={datePickerVisible}
              mode={fromDate}
              onConfirm={HandleCnfrm}
              onCancel={HideDatePicker}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <InputField1
              value={toDate || GetToDate()}
              titleColor={colors.orangeColor}
              placeholder="to-Date - yyyy/mm/dd"
            />
            <TouchableOpacity style={styles.icon}>
              <CalenderIcon
                name="calendar"
                color={colors.white}
                size={22}
                onPress={() => ShowDatePicker()}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={datePickerVisible}
              mode={toDate}
              onConfirm={HandleCnfrm}
              onCancel={HideDatePicker}
            />
          </View>
        </View>
      )}
      <TouchableOpacity
        onPress={() => setIsChecked(!isChecked)}
        style={styles.checkView}>
        <Ionicons
          name={isChecked ? 'checkbox' : 'square-outline'}
          style={styles.checkIcon}
        />
        <Text style={styles.rememberMeText}>Add this Event to the Feed</Text>
      </TouchableOpacity>
      <View style={{marginHorizontal: 90, marginTop: 40}}>
        <PrimaryButton
          text={'submit'}
          bgColor={colors.orangeColor}
          // loading={loading}
          onPress={() => CreateEvent()}
        />
      </View>
    </View>
  );
};

const InputField1 = ({
  title,
  placeholder,
  setState,
  isFlag,
  error,
  titleColor,
  value,
  ...props
}) => {
  return (
    <>
      <View style={styles.wrapper1}>
        <Text
          style={[
            styles.title,
            {color: titleColor ? titleColor : colors.darkBrown},
          ]}>
          {title}
        </Text>
        <View style={styles.fieldContainer1}>
          <TextInput
            value={value}
            placeholderTextColor={colors.orangeColor}
            onChangeText={val => setState(val)}
            style={styles.inputText}
            placeholder={placeholder}
            {...props}
          />
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};
