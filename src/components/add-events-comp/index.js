/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Platform, Image} from 'react-native';
import React, {useState, useContext} from 'react';
import {InputField, PrimaryEventButton, Loader} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {AddEventSchema} from '../../common/schemas';
import {styles} from './styles';
import {TextInput, TouchableOpacity} from 'react-native';
import CalenderIcon from 'react-native-vector-icons/AntDesign';
import RadioForm from 'react-native-simple-radio-button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ApplicationContext from '../../utils/context-api/Context';
import { getAuthTokenDetails } from '../../utils/preferences/localStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';

export const AddEvent = ({ data, navigation }) => {
  const { id } = useContext(ApplicationContext);
  const {
    buttonTexts: { addevents },
    placeHolders: { tampleNameP, descriptionP },
    headings: {
      inputTitles: { eventname, tDescription, pickadate },
    },
  } = allTexts;

  const [isRegular, setIsRegular] = useState(data.type);
  const [occasionData, setOccasionData] = useState();
  const [image, setImage] = useState();
  const [date, setDate] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [imageUploaded, setimageUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isCross, setIsCross] = useState(true);

  const ShowDatePicker = () => {
    setDatePickerVisible(true);
  };
  const HideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const HandleCnfrm = datedata => {
    setDate(datedata);
    HideDatePicker();
  };
  const GetDate = () => {
    let TempDate = date.toString().split('');
    return date !== ''
      ? ` ${TempDate[3]} ${TempDate[4]} ${TempDate[5]} ${TempDate[6]} ${TempDate[7]} ${TempDate[8]} ${TempDate[9]} ${TempDate[10]} ${TempDate[11]} ${TempDate[12]} ${TempDate[13]} ${TempDate[14]}`
      : '';
  };
  var radio_prop = [
    { label: 'Single day', value: 0 },
    { label: 'more days', value: 1 },
  ];
  const CreateEvent = async () => {
    let Token = await getAuthTokenDetails();
    console.log(Token, 'token');
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

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.keyBoardStyle}
        contentContainerStyle={styles.scrollContainer}>
        <Formik
          onSubmit={(values, formikActions) => {
            setOccasionData(values);
            CreateEvent();
            if (values === '') {
              setOccasionData(null);
            } else if (values) {
              setOccasionData(values);
              CreateEvent();
            }
          }}
          validationSchema={AddEventSchema}
          initialValues={{
            eventName: data.eventName,
            description: data.description,
            date: data.date,
            fromDate: data.fromDate,
            toDate: data.toDate,
          }}>
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
          }) => {
            return (
              <View style={styles.fieldContainer}>
                <InputField
                  value={values.eventName}
                  title={eventname}
                  titleColor={colors.orangeColor}
                  placeholder={tampleNameP}
                  error={touched.eventName && errors.eventName}
                  onBlur={handleBlur('eventName')}
                  setState={handleChange('eventName')}
                />
                <View style={{ height: 20 }} />
                <InputField
                  value={values.description}
                  title={tDescription}
                  titleColor={colors.orangeColor}
                  placeholder={descriptionP}
                  error={touched.description && errors.description}
                  onBlur={handleBlur('description')}
                  setState={handleChange('description')}
                />
                <View style={{ alignSelf: 'center', marginTop: '5%' }}>
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
                  <View>
                    <View style={{ height: 20 }} />
                    <Text style={styles.pickDateTxt}>{pickadate} </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <InputField1
                        value={data.date || GetDate()}
                        titleColor={colors.orangeColor}
                        placeholder="yyyy/mm/dd"
                        error={touched.date && errors.date}
                        onBlur={handleBlur('date')}
                        setState={handleChange('date')}
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
                  <View>
                    <View style={{ height: 20 }} />
                    <Text style={styles.pickDateTxt}>
                      {'select dates for dharsan'}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <InputField1
                        value={values.fromDate}
                        titleColor={colors.green2}
                        placeholder="from-Date - yyyy/mm/dd"
                        error={touched.fromDate && errors.fromDate}
                        onBlur={handleBlur('fromDate')}
                        setState={handleChange('fromDate')}
                      />
                      <TouchableOpacity style={styles.icon}>
                        <CalenderIcon
                          name="calendar"
                          color={colors.white}
                          size={22}
                          onPress={() => alert('coming soon')}
                        />
                      </TouchableOpacity>
                      <DateTimePickerModal
                        isVisible={datePickerVisible}
                        mode={date}
                        onConfirm={HandleCnfrm}
                        onCancel={HideDatePicker}
                      />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <InputField1
                        value={values.toDate}
                        titleColor={colors.orangeColor}
                        placeholder="to-Date - yyyy/mm/dd"
                        error={touched.toDate && errors.toDate}
                        onBlur={handleBlur('toDate')}
                        setState={handleChange('toDate')}
                      />
                      <TouchableOpacity style={styles.icon}>
                        <CalenderIcon
                          name="calendar"
                          color={colors.white}
                          size={22}
                          onPress={() => alert('coming soon')}
                        />
                      </TouchableOpacity>
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
                  <Text style={styles.rememberMeText}>
                    Add this Event to the Feed
                  </Text>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                  <PrimaryEventButton
                    bgColor={colors.orangeColor}
                    onPress={handleSubmit}
                    text={addevents}
                    radius={8}
                    fontsize={14}
                    padding={16}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
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
            { color: titleColor ? titleColor : colors.darkBrown },
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
