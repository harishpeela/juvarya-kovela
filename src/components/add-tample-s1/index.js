import {View, Image, TouchableOpacity, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {InputField, PrimaryButton} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {AddTampleSchema} from '../../common/schemas';
import {styles} from './styles';
import RadioForm from 'react-native-simple-radio-button';
import {UploadPhoto} from '../../utils/svgs';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';

export const AddTampleStep1 = ({onNextBtnPress, data, image, setImage}) => {
  const {
    buttonTexts: {next},
    placeHolders: {tampleNameP, descriptionP, communityP},
    headings: {
      inputTitles: {tName, tDescription, tCommunity},
    },
  } = allTexts;

  const uploadPhoto = () => {
    // setImageLoading(true);
    try {
      launchImageLibrary(
        {mediaType: 'photo', saveToPhotos: true, includeBase64: true},
        res => {
          if (!res.didCancel && !res.errorCode) {
            setImage(res.assets[0]);
            setimageUploaded(false);
          } else {
            console.log(res.errorMessage);
          }
          // setImageLoading(false);
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  var radio_props = [
    {label: 'Regular', value: 0},
    {label: 'Seasonal', value: 1},
  ];
  const [isRegular, setIsRegular] = useState(data.type);
  const [imageUploaded, setimageUploaded] = useState(false);

  return (
    <View style={styles.wrapper}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.keyBoardStyle}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.uploadContainer}>
          {image !== null ? (
            <View style={styles.preViewImageContainer}>
              <View style={styles.crossIconContainer}>
                <Icon
                  onPress={() => {
                    setImage(null);
                  }}
                  name="closecircle"
                  color={colors.red2}
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
              <UploadPhoto />
              {imageUploaded && (
                <Text style={styles.noimageText}>
                  {'Please upload a photo'}
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
        <Formik
          onSubmit={(values, formikActions) => {
            if (image === null) {
              setimageUploaded(true);
              return;
            }
            onNextBtnPress(values, isRegular);
            console.log('commite', values.community);
          }}
          validationSchema={AddTampleSchema}
          initialValues={{
            tampleName: data.tampleName,
            description: data.description,
            community: data.community,
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
                  value={values.tampleName}
                  title={tName}
                  titleColor={colors.green2}
                  placeholder={tampleNameP}
                  error={touched.tampleName && errors.tampleName}
                  onBlur={handleBlur('tampleName')}
                  setState={handleChange('tampleName')}
                />
                <View style={{height: 20}} />
                <InputField
                  value={values.description}
                  title={tDescription}
                  titleColor={colors.green2}
                  placeholder={descriptionP}
                  error={touched.description && errors.description}
                  onBlur={handleBlur('description')}
                  setState={handleChange('description')}
                />
                <View style={{height: 20}} />
                <InputField
                  value={values.community}
                  title={tCommunity}
                  titleColor={colors.green2}
                  placeholder={communityP}
                  error={touched.community && errors.community}
                  onBlur={handleBlur('community')}
                  setState={handleChange('community')}
                />
                <View style={styles.radioContainer}>
                  <RadioForm
                    radio_props={radio_props}
                    initial={isRegular}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={colors.blue3}
                    selectedButtonColor={colors.blue3}
                    animation={false}
                    buttonSize={8}
                    buttonOuterSize={20}
                    labelStyle={styles.radioLabelStyle}
                    onPress={value => {
                      setIsRegular(value);
                    }}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    bgColor={colors.blue3}
                    onPress={handleSubmit}
                    text={next}
                    radius={8}
                    fontsize={10}
                    padding={8}
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
